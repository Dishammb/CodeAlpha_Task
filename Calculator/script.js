const disp = document.getElementById('display');
const expr = document.getElementById('expr');
let cur='0',prev='',op=null,fresh=false,justEvaled=false;
function fmt(n){let s=parseFloat(n).toString();if(s.length>12)s=parseFloat(n).toPrecision(9);return s;}
function update(val){disp.textContent=val.length>12?val.slice(0,12):val;}
function flash(){disp.classList.add('flash');setTimeout(()=>disp.classList.remove('flash'),120);}
function setExpr(str){expr.textContent=str;}
function handleNum(v){
  if(justEvaled){cur='0';justEvaled=false;setExpr('');}
  if(fresh){cur='0';fresh=false;}
  if(cur==='0'&&v!=='.') cur=v;
  else if(v==='.'&&cur.includes('.')) return;
  else cur+=v;
  update(cur);
}
function handleOp(o){
  justEvaled=false;
  if(op&&!fresh){const res=calc(parseFloat(prev),parseFloat(cur),op);prev=fmt(res);cur=fmt(res);update(prev);}
  else{prev=cur;}
  op=o;fresh=true;setExpr(prev+' '+o);
}
function calc(a,b,o){
  if(o==='+') return a+b;
  if(o==='−') return a-b;
  if(o==='×') return a*b;
  if(o==='÷') return b===0?'Error':a/b;
  return b;
}
function equals(){
  if(!op) return;
  const a=parseFloat(prev),b=parseFloat(cur);
  const res=calc(a,b,op);
  setExpr(prev+' '+op+' '+cur+' =');
  cur=res==='Error'?'Error':fmt(res);
  update(cur);flash();op=null;prev='';fresh=false;justEvaled=true;
}
function clear(){cur='0';prev='';op=null;fresh=false;justEvaled=false;update('0');setExpr('');}
function sign(){if(cur!=='0'&&cur!=='Error'){cur=fmt(-parseFloat(cur));update(cur);}}
function percent(){if(cur!=='Error'){cur=fmt(parseFloat(cur)/100);update(cur);}}

document.querySelectorAll('.btn').forEach(b=>{
  b.addEventListener('click',()=>{
    const a=b.dataset.action,v=b.dataset.val;
    if(a==='num') handleNum(v);
    else if(a==='op') handleOp(v);
    else if(a==='equals') equals();
    else if(a==='clear') clear();
    else if(a==='sign') sign();
    else if(a==='percent') percent();
    else if(a==='decimal') handleNum('.');
  });
});
document.addEventListener('keydown',e=>{
  if('0123456789'.includes(e.key)) handleNum(e.key);
  else if(e.key==='.') handleNum('.');
  else if(e.key==='+') handleOp('+');
  else if(e.key==='-') handleOp('−');
  else if(e.key==='*') handleOp('×');
  else if(e.key==='/'){e.preventDefault();handleOp('÷');}
  else if(e.key==='Enter'||e.key==='=') equals();
  else if(e.key==='Backspace'){if(cur.length>1&&!fresh&&!justEvaled){cur=cur.slice(0,-1);update(cur);}else{cur='0';update('0');}}
  else if(e.key==='Escape') clear();
  else if(e.key==='%') percent();
});
