'use strict';
const scrollTweens=new WeakMap();
function slowScrollTo(element,value,axis='top',duration=1150,signal){
 scrollTweens.get(element)?.();
 const scene=element.classList.contains('journey-port');if(scene)element.classList.add('is-scene-gliding');
 const prop=axis==='left'?'scrollLeft':'scrollTop',from=element[prop],start=performance.now();let frame=0;
 const cancel=()=>{cancelAnimationFrame(frame);if(scene)element.classList.remove('is-scene-gliding');scrollTweens.delete(element);signal?.removeEventListener('abort',cancel);};
 scrollTweens.set(element,cancel);signal?.addEventListener('abort',cancel,{once:true});
 if(reduceMotion()){element[prop]=value;cancel();return cancel;}
 function step(now){if(!element.isConnected){cancel();return;}const p=Math.min(1,(now-start)/duration),ease=p*p*p*(p*(p*6-15)+10);element[prop]=from+(value-from)*ease;if(p<1)frame=requestAnimationFrame(step);else cancel();}
 frame=requestAnimationFrame(step);return cancel;
}
// glide: easing time constant in ms (longer = softer, more continuous travel); gain scales each wheel step.
function mountScrollEase(signal,{glide=190,gain=1}={}){
 if(reduceMotion())return;
 let frame=0,target=0,scroller=null,previous=0;
 const stop=()=>{cancelAnimationFrame(frame);frame=0;previous=0;scroller=null;};
 function tick(now){
  const max=scroller.scrollHeight-scroller.clientHeight;target=Math.max(0,Math.min(max,target));
  const delta=target-scroller.scrollTop,dt=Math.min(40,now-(previous||now-16));previous=now;
  if(Math.abs(delta)<.6){scroller.scrollTop=target;stop();return;}
  scroller.scrollTop+=delta*(1-Math.exp(-dt/glide));frame=requestAnimationFrame(tick);
 }
 document.addEventListener('wheel',e=>{
  if(e.ctrlKey||e.metaKey||e.defaultPrevented||document.querySelector('dialog[open]')||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;
  if(e.target.closest('.journey-port,.field-rail,.plate-rail,textarea,input,select,[contenteditable]'))return;
  const port=e.target.closest('.journey-port'),next=port||document.scrollingElement;
  if(next.scrollHeight<=next.clientHeight)return;
  // Leave independently scrolling controls to their native behavior.
  for(let n=e.target;n instanceof Element&&n!==next&&n!==document.body;n=n.parentElement){if(n!==port&&/auto|scroll/.test(getComputedStyle(n).overflowY)&&n.scrollHeight>n.clientHeight+1)return;}
  e.preventDefault();scrollTweens.get(next)?.();
  if(scroller!==next){stop();scroller=next;target=next.scrollTop;}
  const unit=e.deltaMode===1?16:e.deltaMode===2?next.clientHeight:1;
  target=Math.max(0,Math.min(next.scrollHeight-next.clientHeight,target+e.deltaY*unit*gain));
  if(!frame)frame=requestAnimationFrame(tick);
 },{signal,passive:false});
 document.addEventListener('pointerdown',()=>{stop();scrollTweens.get(document.scrollingElement)?.();const port=document.querySelector('.journey-port');if(port)scrollTweens.get(port)?.();},{signal,passive:true});
 document.addEventListener('keydown',stop,{signal});
 signal.addEventListener('abort',stop,{once:true});
}
