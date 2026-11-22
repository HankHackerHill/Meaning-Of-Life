# Meaning-Of-Life
A full mind expanding lab that has AI and humans pushing each other to lifes most meaningful and thought provoking thoughts, questions and theories.

## DeepDialogue Lab

[Open the live master prompt library](https://hackytacky.github.io/Meaning-Of-Life/)

DeepDialogue Lab is a master prompt library and conversation commons. Browse 40 complete prompts, copy one into your preferred AI, remix it in the workshop, or open an in-site model conversation. The guided studio and private journal are available separately.

### Master prompts and community

The home page opens the master prompt collection. Four featured original scripts use a translation hearing, future archaeology, a telescope-time hearing and a pair of counterfactual letters. Another 36 scripts develop the earlier conversations into multi-turn investigations. Each includes an opening scene, a method, competing interpretations, questions the human can ask back and a concrete artifact to create together.

Open **Prompt workshop** to write a new master or change an existing one. Preview and copy the entire result. Workshop drafts and API rooms live in the current tab. Copy a draft you want to keep before refreshing.

In **Conversation commons**, contributors can publish an excerpt, share a complete remix, propose a discovery question or recruit collaborators. Open a thread to read replies, reply on GitHub, or build a related contribution. Remixes can retain a source prompt and parent issue number. The public feed reads matching open GitHub Issues in this repository. Writing and replying use the contributor’s own GitHub account. Moderators can close or lock issues on GitHub. Public reads are subject to GitHub rate limits and search indexing delays.

The app opens a public post for review only after you select the content and approve the preview. Long posts use a copy-and-paste handoff to the GitHub editor. Nothing enters the public feed until a contributor publishes on GitHub. The private journal and the API room both support sharing selected turns.

### AI connections

**Browser API chat.** Open a master prompt, select **Talk here**, and connect your own OpenRouter account. Authorization uses S256 PKCE in a separate tab. Keep the initiating tab open. The returned key stays in memory and can be disconnected in the app or revoked at OpenRouter. The default model is `openrouter/free`; entering another model ID can consume credit. Each deliberate send includes the master prompt and up to 12 recent messages. Provider availability, routing and data handling depend on the account and model. Use an HTTPS site or localhost.

**MCP.** Clients supporting MCP prompts over stdio can use this dependency-free Node.js 18+ server. Configure the absolute path to your checkout. Client configuration layouts vary.

```json
{
  "mcpServers": {
    "deepdialogue": {
      "command": "node",
      "args": ["/absolute/path/to/Meaning-Of-Life/mcp.cjs"]
    }
  }
}
```

Use the client’s prompt picker, or call `prompts/list` and `prompts/get` with a name such as `last-translator`. The server exposes the same 40 public prompt texts as the website. Your MCP client supplies inference. The prompt server does not access accounts, journals or the network.

**Local inference.** The Python server also supports the existing loopback model in the guided journey studio. See the local model section below.

### Run

From the extracted project folder, start the included Python 3.10+ standard-library server:

```sh
python3 server.py
```

Open **http://127.0.0.1:8765/#frontiers** for the casebook, or the root URL for master prompts. Use **Journey studio** for guided sessions. Stop the server with Ctrl+C. A static host can serve `index.html` with the adjacent `app/` directory. Use HTTPS for the optional encrypted vault on a remote host.

### Conversation prompts

Open **Prompt library** in the app, or [read the complete prompt collection](CONVERSATIONS.md). The library includes 36 original guided conversations across 12 topics and the 12 earlier starters. Each guided conversation has an opening, three follow-ups and a question for the participant to put to an AI or a human partner. In a dialogue, expand **Turn the question around** to find it. With a local model enabled you can insert it into the composer, edit it and send it.

The topics include human and AI psychology, purpose, psychedelics, altered perception, cosmology, patterns, identity, mental health and work, riddles, time, conspiracy theories, and ethics. Psychedelic research exercises use fictional examples and link to background reading. The riddle solutions unfold after the participant has had a chance to answer.

### Frontier casebook

The edition reviewed on **2026-11-22** contains 27 cross-indexed cases. Record a judgment and its probability before revealing the working answer, sources, rival explanation and discriminating check. Add a reassessment or watch the question for its specified evidence trigger. The watchlist is a personal reading list. It performs no background subscriptions or polling.

Each case includes two prompts that differ by one belief cue. To examine framing, collect replies in fresh contexts with identical source packets, model versions and settings. Paste the pair and randomize presentation before rating the reasoning. Knowing the answers, running a single pair or reusing one model limits the interpretation. The pair is processed in memory. The separate dialogue flow supports an explicitly enabled local model.

The V3R1T4S problem bank and research protocol inform the case design. The lunar case adapts the upstream challenge into a two-explanation reasoning exercise. Its source is pinned to [5db3547d](https://github.com/elder-plinius/V3R1T4S/tree/5db3547dd45ca38eb4a50c5c30f8dadcb50f6cbd). Credit: elder-plinius and V3R1T4S contributors. Adapted and paraphrased under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Upstream code and checkers are not bundled. Scientific records link to the original publications. The Riemann case links to the upstream frozen mirror, independent statement, comparator configuration and verification material; it does not redistribute or execute the proof.

### SeggySaid prompt studies

Open **Journey studio → Explore the examples**, or visit [the local collection](http://127.0.0.1:8765/#frontiers/seggysaid). Six studies draw on four SeggySaid Shorts and two essays from *The Human Prompt*. Each study links to the original, summarizes the published exchange, and opens a new guided exercise with three follow-up questions. The exercises work offline after loading. Source links open only when selected.

| Source example | Original DeepDialogue exercise |
| --- | --- |
| Comparing the present with 1453 | Make two historical analogies predict different outcomes for a school adopting AI. |
| External signals and personal judgment | Decide whether a recommendation changes your mind because of information or approval. |
| Reframing prayer as an integrity check | Compare two invitations to the same quiet practice and identify what each name leaves out. |
| Compressing prayer to one word | Shorten a definition of trust, then test whether it settles a disagreement about a spare key. |
| Achievement and identity | Build two accounts of why a musician practices and ask what could distinguish them. |
| A risk analyst for everyday life | Interpret a volunteer’s decision from two roles and flag assumptions that each role introduces. |

The video summaries use English auto-captions and link to approximate start times. The prayer Short and the word-compression essay are distinct works grouped under the same entry in the supplied archive. The studies attribute model responses to the exchange in which they appear. The exercises and interpretations are written for DeepDialogue Lab.

### Local model

Provide a local OpenAI-compatible inference endpoint exposing `GET /v1/models` and `POST /v1/chat/completions`. Set `DDL_MODEL` to the exact advertised model ID and restart the app server. `DDL_LLM_BASE_URL` defaults to `http://127.0.0.1:11434/v1` and accepts only a literal loopback IP using HTTP and a /v1 path. `DDL_LLM_API_KEY` is an optional server-side credential. `DDL_PORT` changes the app port. The browser offers the model on HTTP localhost or 127.0.0.1 after opt-in per session.

The facilitator, safety review and relevance review use the same configured model. Correlated errors remain possible. A blocked or failed review suppresses the candidate reply. No real model quality or clinical outcome is certified.

### Storage and privacy

Without a vault, entries stay in the current tab until refresh or close. The optional vault encrypts journal entries, evidence imports, research notes and watchlist events in browser storage using AES-256-GCM and PBKDF2-SHA256 (600,000 iterations). Web Crypto, Web Locks and a secure browser context are required. A lost passphrase cannot be recovered. A compromised device or an extension with page access can read an unlocked session. Common identifier formats are masked, including emails and formatted US SSNs. The local inference provider has its own logging settings. Reading an external source opens a third-party website.

### Verification

```sh
python3 -B -m unittest discover -s tests
node --test tests/*.test.cjs
```

Backend tests use synthetic data and a mock inference endpoint. The casebook suite checks references, experiment controls, research record handling, and vault compatibility. Session counters and confidence ratings describe user activity and judgments. They have no validated psychological interpretation.
