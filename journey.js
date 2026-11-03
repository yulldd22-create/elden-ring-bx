'use strict';
const journeyStops=['Enter','Grace','Home','Chapters'];
let journeyController,journeyIndex=0,journeyTransitionUntil=0;
const journeyLink=(i,caption)=>'<button class="journey-cue" data-journey="'+i+'" aria-label="'+caption+'"><span>'+caption+'</span><i></i></button>';
function mainJourney(){
 const positions=[[23.3,21],[16.4,68],[69.4,37.5],[33,76]];
 return '<div class="journey"><div class="journey-port" tabindex="0" aria-label="메인 세로 탐색 · 휠, 스와이프 또는 위아래 방향키로 장면 이동">'+
 '<div class="intro-run"><div class="intro-backplane"><div class="intro-still"></div><video class="intro-preview" aria-hidden="true" tabindex="-1" disablepictureinpicture disableremoteplayback muted loop playsinline preload="none" poster="assets/films/first-light.webp"></video></div><div class="intro-pages"><section class="journey-entry journey-panel" aria-label="인트로"><div class="aurora"></div>'+particles()+'<div class="journey-entry-center"><h1>'+img('wordmark','Elden Ring','fetchpriority="high"')+'</h1><button class="key-button" data-journey="1">Enter</button></div><div class="entry-credits"><span>PS5 | PS4 &nbsp; · &nbsp; XBOX SERIES X|S &nbsp; · &nbsp; XBOX ONE</span><small>ELDEN RING™ &amp; ©Bandai Namco Entertainment Inc. / ©FromSoftware, Inc.</small></div></section>'+
 '<section class="journey-vision journey-panel" aria-label="축복의 인도"><video class="vision-footage" aria-hidden="true" muted loop playsinline disablepictureinpicture disableremoteplayback preload="none" poster="assets/films/guidance.webp"></video><h2><span>Be guided by grace</span><span>to brandish the power</span><span>of the Elden Ring</span><span>and become the Elden Lord.</span></h2>'+journeyLink(2,'Continue')+'</section></div></div>'+
 '<div class="realm-run"><div class="realm-stop stop-home"></div><div class="realm-stop stop-chapters"></div><section class="realm-stage" aria-label="메인과 챕터 지도"><div class="realm-land" aria-hidden="true"><div class="depth-world"></div></div><div class="realm-shade"></div>'+heroEffects()+particles()+frame()+
 '<h2 class="realm-title">'+img('wordmark','Elden Ring')+'</h2><div class="realm-markers">'+chapters.map((c,i)=>'<a class="realm-mark" href="#'+c.id+'" style="--px:'+positions[i][0]+'%;--py:'+positions[i][1]+'%"><span class="realm-seal"><img class="default-seal" alt="" src="assets/realm/mark-idle.png"><img class="hover-seal" alt="" src="assets/realm/mark-lit.png"></span><span class="mark-name">'+c.name+'</span></a>').join('')+'</div>'+
 '<div class="realm-toolbar"><button class="diamond-button" data-journey-menu aria-label="챕터 메뉴 열기"><span>☰</span></button><button class="diamond-button" data-journey-sound aria-pressed="false" aria-label="앰비언트 사운드 켜기"><span>'+speakerGlyph+'</span></button></div><div class="realm-cue">'+journeyLink(3,'Scroll down')+'</div></section></div></div>'+
 '<div class="intro-film-tools"><button class="intro-film-toggle" type="button" aria-pressed="false">Play film</button><a href="'+launchTrailerUrl+'" target="_blank" rel="noopener noreferrer">YouTube ↗</a></div>'+chapterCompass('home')+'</div>';
}
function journeyGo(i,instant=false){
 if(!instant&&performance.now()<journeyTransitionUntil)return;
 if(i===4){location.hash='prologue';return;}
 const port=main.querySelector('.journey-port');if(!port)return;
 const target=Math.max(0,Math.min(3,i));
 if(instant||reduceMotion()){scrollTweens.get(port)?.();port.scrollTop=target*port.clientHeight;}
 else{journeyTransitionUntil=performance.now()+1200;slowScrollTo(port,target*port.clientHeight,'top',1200,journeyController?.signal);}
}
function mountJourney(initial){
 journeyController?.abort();journeyController=new AbortController();
 const signal=journeyController.signal;journeyTransitionUntil=0;
 const port=main.querySelector('.journey-port'),deck=main.querySelector('.journey'),stage=main.querySelector('.realm-stage'),markers=main.querySelector('.realm-markers');
 const updateFilm=mountIntroTrailer(deck,signal);
 const updateDepth=mountRealmDepth(stage,signal);
 let raf=0,syncedHash=location.hash;
 function sync(){
  raf=0;const pos=port.scrollTop/port.clientHeight;
  const index=Math.max(0,Math.min(3,Math.round(pos))),progress=Math.max(0,Math.min(1,pos-2));
  journeyIndex=index;deck.dataset.step=index;stage.style.setProperty('--p',progress.toFixed(4));
  const logo=stage.querySelector('.realm-title');
  const gilding=stage.querySelector('.supplied-frame');
  const frameTop=gilding.offsetTop+gilding.querySelector('.gilt-corner-tl').offsetHeight*23/64;
  logo.style.top=((.5*(1-progress))*stage.clientHeight+progress*frameTop)+'px';
  logo.style.transform='translate(-50%,-50%) scale('+(1-.70*progress)+')';
  markers.inert=pos<2.7;markers.style.opacity=Math.max(0,(progress-.20)/.8);
  const cue=stage.querySelector('.realm-cue .journey-cue');
  cue.dataset.journey=index===3?'4':'3';
  cue.setAttribute('aria-label',index===3?'Scroll down · 프롤로그로 이동':'Scroll down · 챕터 지도로 이동');
  stage.querySelector('.realm-cue').inert=pos<1.55;
  deck.querySelector('.journey-entry').inert=index!==0;
  deck.querySelector('.journey-vision').inert=index!==1;
  stage.querySelector('.realm-toolbar').inert=pos<1.6;
  deck.querySelector('.chapter-compass').inert=index<2;
  updateFilm(!document.hidden&&pos<1.85&&!chapterMenu.open?(pos<.5?'entry':'vision'):'');
  updateDepth(pos>1.4&&!document.hidden);
  deck.querySelector('.intro-film-tools').inert=index>1;
 }
 function queue(){if(!raf)raf=requestAnimationFrame(sync);}
 let lastWheel=0,wheelUsed=false,wheelTravel=0;
 port.addEventListener('wheel',e=>{
  if(e.ctrlKey||e.metaKey||document.querySelector('dialog[open]')||Math.abs(e.deltaX)>Math.abs(e.deltaY)||!e.deltaY)return;
  e.preventDefault();const now=performance.now(),gap=now-lastWheel;lastWheel=now;
  if(gap>200){wheelUsed=false;wheelTravel=0;}
  if(now<journeyTransitionUntil||wheelUsed){wheelUsed=true;return;}
  wheelTravel+=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?port.clientHeight:1);
  if(Math.abs(wheelTravel)<14)return;
  wheelUsed=true;journeyGo(Math.max(0,Math.min(3,journeyIndex+Math.sign(wheelTravel))));
 },{signal,passive:false});
 port.addEventListener('scroll',queue,{passive:true,signal});
 document.addEventListener('visibilitychange',sync,{signal});
 chapterMenu.addEventListener('toggle',sync,{signal});
 window.addEventListener('resize',()=>{journeyGo(journeyIndex,true);sync();},{signal});
 document.addEventListener('keydown',e=>{
  if(document.querySelector('dialog[open]')||e.altKey||e.ctrlKey||e.metaKey)return;
  const steps={ArrowDown:1,PageDown:1,ArrowUp:-1,PageUp:-1};
  if(e.key in steps){e.preventDefault();journeyGo(journeyIndex+steps[e.key]);}
  if(e.key==='Home'||e.key==='End'){e.preventDefault();journeyGo(e.key==='Home'?0:3);}
 },{signal});
 // Keep a usable history location after a visitor leaves the chapter map.
 port.addEventListener('scrollend',()=>{if(location.hash!==syncedHash||!port.isConnected)return;const hashes=['intro','vision','home','atlas'];const target=hashes[journeyIndex];syncedHash='#'+target;if(location.hash!==syncedHash)history.replaceState(null,'',syncedHash);document.title='ELDEN RING — '+['The Call of Grace','Be Guided by Grace','The Lands Between','Chapter Atlas'][journeyIndex];},{signal});
 signal.addEventListener('abort',()=>{cancelAnimationFrame(raf);},{once:true});
 journeyGo(initial,true);sync();renderSound();
}
