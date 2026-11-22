"""Regression coverage for the local-only request and model trust boundaries."""

import http.client
import json
import tempfile
import threading
import unittest
from pathlib import Path
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from unittest.mock import patch

from server import LocalModel, PAUSE, Server, ServiceError, checked_asset, checked_base, parse_payload


def request_payload(**overrides):
    payload = {
        "turns": [{"role": "user", "text": "What would count as a counterexample?"}],
        "consent": True,
    }
    payload.update(overrides)
    return payload


class InputTests(unittest.TestCase):
    def test_only_literal_loopback_models_are_supported(self):
        self.assertEqual(checked_base("http://[::1]:9100/v1/"), ("::1", 9100))
        self.assertEqual(checked_base("http://127.0.0.1:11434/v1"), ("127.0.0.1", 11434))
        for base in (
            "http://localhost:8080/v1", "https://127.0.0.1/v1", "http://127.0.0.1:0/v1",
            "http://user:secret@127.0.0.1/v1", "http://192.168.1.2/v1",
            "http://127.0.0.1/v1?token=abc", "http://127.0.0.1/proxy/v1",
        ):
            with self.subTest(base=base), self.assertRaises(ValueError):
                checked_base(base)

    def test_assets_do_not_expose_source_or_symlinks(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "app").mkdir()
            (root / "app" / "view.js").touch()
            (root / "index.html").touch()
            (root / "server.py").touch()
            (root / "app" / "hidden.js").symlink_to(root / "server.py")
            self.assertEqual(checked_asset("/", root), root / "index.html")
            self.assertEqual(checked_asset("/app/view.js?rev=1", root), root / "app" / "view.js")
            for path in ("/server.py", "/.git/config", "/app/%2e%2e/server.py", "/app/hidden.js", "/app/.secrets.js"):
                with self.subTest(path=path):
                    self.assertIsNone(checked_asset(path, root))

    def test_common_identifiers_masked_before_model_calls(self):
        clean = parse_payload(request_payload(turns=[{
            "role": "user", "text": "Write to person@example.invalid or call (555) 555-0123.",
        }]))
        self.assertEqual(clean["turns"][0]["text"], "Write to [email] or call [phone].")

    def test_consent_role_and_length_rules(self):
        self.assertEqual(parse_payload(request_payload(topic="A belief"))["question"], "A belief")
        for overrides in (
            {"consent": "true"}, {"consent": 1}, {"turns": []}, {"title": "a" * 501}, {"nextQuestion": "a" * 501},
            {"turns": [{"role": "system", "text": "hello"}]},
            {"turns": [{"role": "assistant", "text": "hello"}]},
            {"turns": [{"role": "user", "text": "a" * 1601}]},
            {"turns": [{"role": "user", "text": "x"}] * 13},
        ):
            with self.subTest(overrides=overrides), self.assertRaises(ServiceError):
                parse_payload(request_payload(**overrides))


class ReviewerTests(unittest.TestCase):
    def setUp(self):
        self.model = LocalModel("http://127.0.0.1:8000/v1", "example")
        self.payload = parse_payload(request_payload())

    def test_rejected_or_ambiguous_review_never_releases_candidate(self):
        cases = [
            (["candidate", {"safe": 1}], "supervisor-pause"),
            (["candidate", {"safe": False}], "supervisor-pause"),
            (["candidate", {"safe": True, "override": True}], "supervisor-pause"),
            (["candidate", {"safe": True}, {"relevant": True, "repetitive": True}], "quality-pause"),
            (["candidate", {"safe": True}, {"relevant": True}], "quality-pause"),
        ]
        for responses, signal in cases:
            with self.subTest(signal=signal), patch.object(self.model, "complete", side_effect=responses):
                self.assertEqual(self.model.dialogue(self.payload), {"reply": PAUSE, "signals": [signal]})

    def test_approved_candidate_is_returned(self):
        with patch.object(self.model, "complete", side_effect=[
            "What did you observe?", {"safe": True}, {"relevant": True, "repetitive": False},
        ]):
            self.assertEqual(self.model.dialogue(self.payload), {"reply": "What did you observe?", "signals": []})

    def test_unavailable_reviewer_returns_error_and_releases_capacity(self):
        with patch.object(self.model, "complete", side_effect=["rejected draft", ServiceError(503, "unavailable")]):
            with self.assertRaises(ServiceError):
                self.model.dialogue(self.payload)
        self.assertTrue(self.model.slot.acquire(blocking=False))
        self.model.slot.release()

    def test_duplicate_verdict_field_fails_closed(self):
        candidate = {"choices": [{"message": {"content": "First draft."}}]}
        ambiguous = {"choices": [{"message": {"content": '{"safe":false,"safe":true}'}}]}
        with patch.object(self.model, "request", side_effect=[candidate, ambiguous]):
            with self.assertRaises(ServiceError):
                self.model.dialogue(self.payload)


class HTTPTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        model = LocalModel("http://127.0.0.1:8000/v1", "")
        cls.server = Server(0, model)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.host = "127.0.0.1:" + str(cls.server.server_port)

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join(timeout=2)

    def call(self, verb, path, body=None, headers=None):
        conn = http.client.HTTPConnection("127.0.0.1", self.server.server_port, timeout=2)
        try:
            conn.request(verb, path, body=body, headers=headers or {})
            response = conn.getresponse()
            return response.status, response.getheaders(), response.read()
        finally:
            conn.close()

    def test_static_and_status(self):
        status, headers, _ = self.call("GET", "/")
        self.assertEqual(status, 200)
        self.assertEqual(dict(headers)["Referrer-Policy"], "no-referrer")
        status, _, response = self.call("GET", "/api/status")
        self.assertEqual(status, 200)
        self.assertFalse(json.loads(response)["available"])

    def test_foreign_host_origin_and_direct_file_access(self):
        for verb, path, headers, expected in (
            ("GET", "/api/status", {"Host": "other.example"}, 403),
            ("GET", "/api/status", {"Sec-Fetch-Site": "cross-site"}, 403),
            ("GET", "/server.py", {}, 404),
            ("POST", "/api/dialogue", {"Origin": "http://other.example"}, 403),
            ("POST", "/api/dialogue", {}, 403),
        ):
            with self.subTest(verb=verb, path=path, headers=headers):
                self.assertEqual(self.call(verb, path, headers=headers)[0], expected)

    def test_forced_consent_and_absent_model(self):
        headers = {"Origin": "http://" + self.host, "Content-Type": "application/json"}
        status, _, _ = self.call("POST", "/api/dialogue", json.dumps(request_payload(consent=False)), headers)
        self.assertEqual(status, 400)
        status, _, body = self.call("POST", "/api/dialogue", json.dumps(request_payload()), headers)
        self.assertEqual(status, 503)
        self.assertNotIn("counterexample", body.decode())

    def test_full_wire_protocol_with_synthetic_model(self):
        calls = []
        review_answers = iter(["What evidence did you see?", '{"safe":true}', '{"relevant":true,"repetitive":false}'])

        class MockProvider(BaseHTTPRequestHandler):
            def log_message(self, *args):
                pass

            def send_json(self, payload):
                content = json.dumps(payload).encode()
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Length", str(len(content)))
                self.end_headers()
                self.wfile.write(content)

            def do_GET(self):
                calls.append((self.path, None))
                self.send_json({"data": [{"id": "synthetic"}]})

            def do_POST(self):
                data = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
                calls.append((self.path, data))
                self.send_json({"choices": [{"message": {"content": next(review_answers)}}]})

        provider = ThreadingHTTPServer(("127.0.0.1", 0), MockProvider)
        thread = threading.Thread(target=provider.serve_forever, daemon=True)
        thread.start()
        try:
            model = LocalModel(f"http://127.0.0.1:{provider.server_port}/v1", "synthetic")
            with patch.object(self.server, "model", model):
                status, _, body = self.call("GET", "/api/status")
                self.assertEqual(status, 200)
                self.assertTrue(json.loads(body)["available"])
                headers = {"Origin": "http://" + self.host, "Content-Type": "application/json"}
                form = request_payload(nextQuestion="What observation could distinguish them?", turns=[{"role": "user", "text": "A note from learner@example.invalid."}])
                status, _, body = self.call("POST", "/api/dialogue", json.dumps(form), headers)
                self.assertEqual(status, 200)
                self.assertEqual(json.loads(body), {"reply": "What evidence did you see?", "signals": []})
                self.assertEqual([path for path, _ in calls], ["/v1/models"] + ["/v1/chat/completions"] * 3)
                self.assertNotIn("learner@example.invalid", json.dumps(calls))
                self.assertIn("[email]", json.dumps(calls))
                self.assertIn("What observation could distinguish them?", calls[1][1]["messages"][1]["content"])
                self.assertEqual(len({data["messages"][0]["content"] for _, data in calls[1:]}), 3)
        finally:
            provider.shutdown()
            provider.server_close()
            thread.join(timeout=2)


if __name__ == "__main__":
    unittest.main()
