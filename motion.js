'use strict';
const reduceMotion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const chapterMenu=document.querySelector('#chapter-menu');
let motionController, motionObserver;

const menuScenes=['assets/menu/prologue.jpg','assets/menu/about.jpg','assets/menu/gallery-full.jpg','assets/menu/product.jpg'];
let menuPreview=-1,menuRevision=0,menuCloseAnimation,menuOpener;
let currentViewTransition;
function startSceneTransition(update,kind='chapter'){
 currentViewTransition?.skipTransition();
 document.documentElement.dataset.sceneTransition=kind;
 const transition=document.startViewTransition(update);currentViewTransition=transition;
 transition.finished.catch(()=>{}).finally(()=>{
  if(currentViewTransition===transition){currentViewTransition=null;delete document.documentElement.dataset.sceneTransition;}
 });
 return transition;
}
let chapterLoadController;
function cancelChapterLoading(){chapterLoadController?.abort();chapterLoadController=null;}
async function loadChapter(next){
 cancelChapterLoading();currentViewTransition?.skipTransition();
 const controller=new AbortController(),{signal}=controller;chapterLoadController=controller;
 let screen=document.querySelector('#chapter-loading');
 if(!screen){screen=document.createElement('dialog');screen.id='chapter-loading';screen.setAttribute('aria-label','Loading chapter');screen.addEventListener('cancel',e=>e.preventDefault());document.body.append(screen);}
 const chapter=chapters.find(c=>c.id===next),name=chapter?.name||'The Lands Between';
 screen.innerHTML='<div class="chapter-loader-content" role="status" aria-live="polite"><div class="loader-sigil" aria-hidden="true"><img src="assets/prologue/ring-small.webp" width="215" height="206" alt=""></div><p class="loader-overline">FOLLOWING GRACE</p><p class="loader-chapter">'+name+'</p><span class="loader-thread" aria-hidden="true"></span></div>';
 setMenu(false,true);screen.style.opacity='0';screen.dataset.phase='entering';screen.showModal();main.setAttribute('aria-busy','true');
 const wait=ms=>new Promise(resolve=>{const id=setTimeout(resolve,ms);signal.addEventListener('abort',()=>{clearTimeout(id);resolve();},{once:true});});
 const animate=(frames,options)=>{const a=screen.animate(frames,options);signal.addEventListener('abort',()=>a.cancel(),{once:true});return a.finished.catch(()=>{});};
 signal.addEventListener('abort',()=>{screen.close();delete screen.dataset.phase;screen.style.opacity='';main.removeAttribute('aria-busy');},{once:true});
 const backgrounds={prologue:'assets/prologue/portal-bg.webp',about:'assets/folio/backgrounds/world.webp',gallery:'assets/gallery/layout/background.jpg',product:'assets/product-hero-hd.jpg'};
 const asset=new Image();asset.src=backgrounds[next]||'assets/dragon-4k.webp';
 try{
  await Promise.all([animate([{opacity:0},{opacity:1}],{duration:240,easing:'ease-out',fill:'forwards'}).then(()=>{if(!signal.aborted)screen.dataset.phase='covered';}),Promise.race([asset.decode().catch(()=>{}),wait(1100)]),wait(760)]);
  if(signal.aborted)return;
  renderPage();
  await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  if(signal.aborted)return;
  screen.dataset.phase='leaving';
  await animate([{opacity:1},{opacity:0}],{duration:380,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'});
 }finally{
  if(chapterLoadController===controller){screen.close();delete screen.dataset.phase;screen.getAnimations().forEach(a=>a.cancel());screen.style.opacity='';main.removeAttribute('aria-busy');chapterLoadController=null;main.focus({preventScroll:true});}
 }
}

async function menuArtwork(index){
 if(index===menuPreview||!chapterMenu.open)return;
 menuPreview=index;const revision=++menuRevision,chapter=chapters[index];
 chapterMenu.querySelectorAll('[data-menu-index]').forEach((link,i)=>link.classList.toggle('is-previewed',i===index));
 const scene=new Image();scene.className='nav-scene';scene.alt='';scene.dataset.previewRevision=String(revision);scene.src=menuScenes[index];
 try{await scene.decode();}catch{}
 if(revision!==menuRevision||!chapterMenu.open)return;
 const visual=chapterMenu.querySelector('.nav-visual');
 visual.querySelectorAll('img').forEach(el=>el.classList.remove('is-current'));
 visual.append(scene);requestAnimationFrame(()=>requestAnimationFrame(()=>{
  if(revision!==menuRevision||!chapterMenu.open){scene.remove();return;}
  visual.querySelectorAll('img').forEach(el=>{if(el!==scene)el.classList.remove('is-current');});
  scene.classList.add('is-current');
 }));
 setTimeout(()=>{if(scene.isConnected)visual.querySelectorAll('img:not(.is-current)').forEach(el=>{if(Number(el.dataset.previewRevision)<revision)el.remove();});},750);
}
function syncMenuButtons(open){
 document.querySelectorAll('[data-journey-menu]').forEach(btn=>{
  btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Close chapter index':'Open chapter index');
 });
}
function setMenu(open,immediate=false){
 menuCloseAnimation?.cancel();menuCloseAnimation=null;
 if(open){
  if(chapterMenu.open)return;
  menuOpener=document.activeElement;menuPreview=-1;
  chapterMenu.innerHTML='<section class="chapter-index" aria-label="The chapter index"><div class="nav-visual" aria-hidden="true"></div><div class="nav-atmosphere" aria-hidden="true"></div><header class="nav-header"><a href="#home" class="nav-brand" aria-label="Elden Ring Home">'+img('wordmark','Elden Ring')+'</a><button type="button" class="nav-close" aria-label="Close chapter index"><span>CLOSE</span><i aria-hidden="true"><svg viewBox="0 0 20 20" fill="none"><path d="m6 6 8 8m0-8-8 8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg></i></button></header><div class="nav-left"><nav class="nav-chapters" aria-label="Chapters">'+chapters.map((c,i)=>'<a data-menu-index="'+i+'" href="#'+c.id+'"'+(c.id===route?' aria-current="page"':'')+' style="--order:'+i+'"><span class="nav-number">0'+(i+1)+'</span><span class="nav-link-name">'+c.name+'</span><span class="nav-link-arrow" aria-hidden="true">↗</span></a>').join('')+'</nav></div></section>';
  chapterMenu.showModal();syncMenuButtons(true);
  menuArtwork(Math.max(0,chapters.findIndex(c=>c.id===route)));
 }else{
  syncMenuButtons(false);++menuRevision;menuPreview=-1;
  if(!chapterMenu.open)return;
  if(immediate||reduceMotion()){chapterMenu.close();return;}
  menuCloseAnimation=chapterMenu.animate([{opacity:1},{opacity:0}],{duration:220,easing:'ease-in',fill:'forwards'});
  const closing=menuCloseAnimation;
  closing.finished.then(()=>{if(menuCloseAnimation===closing){chapterMenu.close();closing.cancel();menuCloseAnimation=null;}}).catch(()=>{});
 }
}
chapterMenu.addEventListener('click',e=>{
 if(e.target===chapterMenu||e.target.closest('.nav-close')){setMenu(false);return;}
 const link=e.target.closest('a[href^="#"]');if(!link)return;
 e.preventDefault();const next=link.getAttribute('href');
 if(next===location.hash)setMenu(false);else location.hash=next;
});
['pointerover','focusin'].forEach(type=>chapterMenu.addEventListener(type,e=>{const a=e.target.closest('[data-menu-index]');if(a)menuArtwork(Number(a.dataset.menuIndex));}));
chapterMenu.addEventListener('cancel',e=>{e.preventDefault();setMenu(false);});
chapterMenu.addEventListener('keydown',e=>{
 const keys={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1};if(!(e.key in keys))return;
 e.preventDefault();const links=[...chapterMenu.querySelectorAll('[data-menu-index]')];
 const focused=links.indexOf(document.activeElement),next=focused<0?(keys[e.key]>0?0:links.length-1):(focused+keys[e.key]+links.length)%links.length;links[next].focus();
});
chapterMenu.addEventListener('close',()=>{syncMenuButtons(false);++menuRevision;if(menuOpener?.isConnected)menuOpener.focus({preventScroll:true});});
function showEdition(index){
 const e=editions[index];
 body.innerHTML='<button class="modal-x" data-close aria-label="에디션 이미지 닫기">×</button><figure class="package-lightbox"><img src="'+e.image+'" width="1034" height="582" alt="'+e.ko+' 전체 구성"><figcaption>'+e.name+'</figcaption></figure>';
 showModal('edition');
}

const loreChapters=[
 ['Golden Age','godwyn','황금의 시대','마리카의 황금률 아래 틈새의 땅에 번영이 찾아왔습니다. 검은 칼날의 밤, 고드윈의 죽음이 그 질서를 흔들었습니다.'],
 ['The Shattering','shattering','파쇄전쟁','거대한 룬을 차지한 데미갓들이 끝없는 전쟁을 벌였습니다. 불타는 전장을 지나도 새로운 왕은 나타나지 않았습니다.'],
 ['The Tarnished','grace','빛바랜 자','잃어버린 축복이 다시 빛을 발합니다. 황금 나무를 향한 길 위에, 오래전에 추방된 빛바랜 자가 돌아옵니다.']
];
function loreCards(){
 return '<section class="lore-library"><div>'+label('Chronicle fragments')+'<h2>Leaves of <i>History.</i></h2></div><div class="lore-cards">'+loreChapters.map((l,i)=>'<button data-lore="'+i+'">'+img(l[1],l[2],'loading="lazy"')+'<span><small>Fragment '+num(i)+'</small><b>'+l[0]+'</b></span></button>').join('')+'</div></section>';
}
function showLore(i){
 const l=loreChapters[i];
 body.innerHTML='<button class="modal-x" data-close aria-label="기록 닫기">×</button><article class="lore-record">'+img(l[1],l[2])+'<div>'+label('Chronicle fragment &nbsp; / &nbsp; '+num(i))+'<h2>'+l[0]+'</h2><p class="kr">'+l[3]+'</p></div></article>';
 showModal('lore');
}
function endMotion(){
 motionController?.abort();motionObserver?.disconnect();
}
function mountMotion(){
 motionController=new AbortController();
 const signal=motionController.signal;
 // The prologue and gallery read as one long scroll, so the wheel glides there instead of stepping.
 mountScrollEase(signal,['prologue','gallery'].includes(route)?{glide:420,gain:1.25}:undefined);
 if(['prologue','gallery','product'].includes(route)){
  const topButton=document.createElement('button');
  topButton.className='page-top';topButton.type='button';topButton.innerHTML='<span aria-hidden="true">↑</span><small>TOP</small>';
  topButton.setAttribute('aria-label','Back to top');main.append(topButton);
  const updateTop=()=>{
   const visible=window.scrollY>window.innerHeight*.6;
   topButton.dataset.visible=String(visible);topButton.tabIndex=visible?0:-1;
   topButton.setAttribute('aria-hidden',String(!visible));
   topButton.style.setProperty('--page-progress',(window.scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)*100).toFixed(2)+'%');
  };
  topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduceMotion()?'instant':'smooth'}),{signal});
  window.addEventListener('scroll',updateTop,{signal,passive:true});updateTop();
 }
 if(reduceMotion())return;
 const softObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>entry.target.classList.toggle('soft-visible',entry.isIntersecting));
 },{threshold:.035});
 main.querySelectorAll('.living-title,.fallen-copy,.ember-portal,.chronicle-piece,.field-world-copy h1,.world-strap,.folio-art,.folio-note,.build-heading,.build-sword,.reference-piece,.panorama-caption,.ending-eye,.ending-note>img,.ending-note>blockquote,.ending-note>p,.about-return,.ending-title,.gallery-cover-title,.gallery-intro,.cinema-heading,.central-cinema,.film-satellite,.story-row,.package-edition').forEach(el=>{
  if(el.closest('.crown')||el.classList.contains('chronicle-sigil'))return;el.classList.add('soft-reveal');softObserver.observe(el);
 });
 signal.addEventListener('abort',()=>softObserver.disconnect(),{once:true});
 const revealed=main.querySelectorAll('.story-row,.summons>div,.gallery-intro,.film-strip,.product-section,.lore-library,.index-title,.index-list');
 motionObserver=new IntersectionObserver(items=>items.forEach(x=>{if(x.isIntersecting){x.target.classList.add('revealed');motionObserver.unobserve(x.target);}}),{threshold:.08});
 revealed.forEach(n=>{n.classList.add('will-reveal');motionObserver.observe(n);});
 let frame=0;
 const scene=main.querySelector('.hero,.gallery-cover,.chapter-top');
 function paint(){
  frame=0;if(!scene)return;
  const box=scene.getBoundingClientRect();if(box.bottom<0)return;
  scene.style.setProperty('--travel',Math.min(1,Math.max(0,(varHead()-box.top)/box.height)).toFixed(3));
 }
 const varHead=()=>0;
 if(scene){
  paint();window.addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(paint);},{signal,passive:true});
  if(matchMedia('(hover:hover) and (pointer:fine)').matches){
   scene.addEventListener('pointermove',e=>{
    const b=scene.getBoundingClientRect();
    scene.style.setProperty('--mx',((e.clientX-b.left)/b.width-.5).toFixed(3));
    scene.style.setProperty('--my',((e.clientY-b.top)/b.height-.5).toFixed(3));
   },{signal,passive:true});
  }
 }
 signal.addEventListener('abort',()=>cancelAnimationFrame(frame),{once:true});
 main.addEventListener('pointermove',e=>{
  const card=e.target.closest('.card-frame,.plate-photo');
  if(!card||e.pointerType==='touch')return;
  const r=card.getBoundingClientRect();
  card.style.setProperty('--cx',(100*(e.clientX-r.left)/r.width).toFixed(1)+'%');
  card.style.setProperty('--cy',(100*(e.clientY-r.top)/r.height).toFixed(1)+'%');
 },{signal,passive:true});
}
function runeOverlay(){
 return '<div class="prologue-rune" aria-hidden="true">'+icon('sigil')+'<i></i></div>';
}
function heroEffects(){
 return '<div class="aurora"></div><div class="leaves" aria-hidden="true">'+Array.from({length:15},(_,i)=>'<i style="--x:'+((i*31+9)%100)+'%;--t:'+(11+i%5)+'s;--lag:-'+(i*2)+'s"></i>').join('')+'</div>';
}
