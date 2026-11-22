'use strict';
// Local stdio prompt server. The catalogue is public and needs no account or network.
const {catalogue, find, render}=require('./app/masters.js');
const supported=['2025-11-25','2025-06-18','2025-03-26','2024-11-05'];
const error=(id,code,message)=>({jsonrpc:'2.0',id,error:{code,message}});
const result=(id,value)=>({jsonrpc:'2.0',id,result:value});
function session(){
  let initialized=false;
  return function handle(req){
    if(!req||Array.isArray(req)||typeof req!=='object'||req.jsonrpc!=='2.0'||typeof req.method!=='string')return error(null,-32600,'Invalid request');
    if(!Object.hasOwn(req,'id'))return null;
    const {id,method,params={}}=req;
    if(!(typeof id==='string'||Number.isSafeInteger(id)))return error(null,-32600,'Invalid request id');
    if(!params||Array.isArray(params)||typeof params!=='object')return error(id,-32602,'Invalid parameters');
    if(method==='initialize'){
      if(initialized)return error(id,-32600,'Already initialized');
      if(typeof params.protocolVersion!=='string')return error(id,-32602,'A protocol version is required');
      initialized=true;
      return result(id,{protocolVersion:supported.includes(params.protocolVersion)?params.protocolVersion:supported[0],capabilities:{prompts:{}},serverInfo:{name:'deepdialogue-prompts',version:'1.0.0'}});
    }
    if(method==='ping')return result(id,{});
    if(!initialized)return error(id,-32002,'Initialize the session first');
    if(method==='prompts/list')return result(id,{prompts:catalogue.map(p=>({name:p.id,title:p.title,description:p.topic+' · '+p.method}))});
    if(method==='prompts/get'){
      const p=find(params.name);
      if(!p)return error(id,-32602,'Unknown prompt');
      return result(id,{description:p.title,messages:[{role:'user',content:{type:'text',text:render(p)}}]});
    }
    return error(id,-32601,'Method not found');
  };
}
if(require.main===module){
  const handle=session();
  let partial='',overflow=false;
  const write=x=>{if(x)process.stdout.write(JSON.stringify(x)+'\n');};
  process.stdin.setEncoding('utf8');
  process.stdin.on('data',chunk=>{
    let offset=0;
    while(offset<chunk.length){
      const end=chunk.indexOf('\n',offset),piece=chunk.slice(offset,end<0?chunk.length:end);
      if(!overflow&&partial.length+piece.length<=65536)partial+=piece;else{overflow=true;partial='';}
      if(end<0)break;
      if(overflow)write(error(null,-32700,'Message too large'));
      else if(partial.trim()){try{write(handle(JSON.parse(partial)));}catch{write(error(null,-32700,'Invalid JSON'));}}
      partial='';overflow=false;offset=end+1;
    }
  });
}
module.exports={session};
