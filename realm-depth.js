'use strict';

// The images are registered to the same 3840 × 2160 world as the flat artwork.
function mountRealmDepth(stage, signal){
 const canMove=matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
 const world=stage.querySelector('.depth-world');
 let loaded=false,loading=false,visible=false,raf=0,previous=0;
 let x=0,y=0,tx=0,ty=0;
 function load(){
  if(loaded||loading||!canMove.matches||!visible)return;
  loading=true;
  const names=['landscape','dragon','rider'];
  const images=names.map(name=>{
   const image=new Image();
   image.className='scene-'+name;image.alt='';image.draggable=false;
   image.src='assets/realm/'+name+'.webp';
   return image;
  });
  Promise.all(images.map(image=>image.decode())).then(()=>{
   if(signal.aborted)return;
   world.replaceChildren(...images);loaded=true;
   stage.classList.toggle('depth-on',canMove.matches);
   request();
  }).catch(()=>{}).finally(()=>{loading=false;});
 }
 function paint(){
  world.style.setProperty('--dragon-x',(x*5.5).toFixed(2)+'px');
  world.style.setProperty('--dragon-y',(y*3.3).toFixed(2)+'px');
  world.style.setProperty('--dragon-angle',(x*.11).toFixed(3)+'deg');
  world.style.setProperty('--rider-x',(x*12).toFixed(2)+'px');
  world.style.setProperty('--rider-y',(y*7).toFixed(2)+'px');
  world.style.setProperty('--rider-angle',(x*.21).toFixed(3)+'deg');
 }
 function tick(now){
  raf=0;
  const dt=Math.min(50,now-(previous||now-16));previous=now;
  const amount=1-Math.exp(-dt/85);
  x+=(tx-x)*amount;y+=(ty-y)*amount;
  if(Math.abs(tx-x)+Math.abs(ty-y)<.001){x=tx;y=ty;}
  paint();
  if(x!==tx||y!==ty)request();else previous=0;
 }
 function request(){if(!raf&&loaded&&visible&&canMove.matches&&!document.hidden)raf=requestAnimationFrame(tick);}
 function rest(){
  tx=0;ty=0;
  if(visible&&canMove.matches&&!document.hidden)request();
  else {cancelAnimationFrame(raf);raf=0;previous=0;x=0;y=0;paint();}
 }
 stage.addEventListener('pointermove',e=>{
  if(e.pointerType==='touch'||!canMove.matches||!visible)return;
  const r=stage.getBoundingClientRect();
  tx=Math.max(-1,Math.min(1,2*(e.clientX-r.left)/r.width-1));
  ty=Math.max(-1,Math.min(1,2*(e.clientY-r.top)/r.height-1));
  request();
 },{signal,passive:true});
 stage.addEventListener('pointerleave',rest,{signal});
 stage.addEventListener('pointercancel',rest,{signal});
 window.addEventListener('blur',rest,{signal});
 document.addEventListener('visibilitychange',rest,{signal});
 canMove.addEventListener('change',()=>{rest();load();stage.classList.toggle('depth-on',loaded&&canMove.matches);},{signal});
 signal.addEventListener('abort',()=>cancelAnimationFrame(raf),{once:true});
 return inView=>{
  if(visible===inView)return;
  visible=inView;
  if(visible)load();else rest();
 };
}
