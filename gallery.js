'use strict';

const galleryFilms=[
 {name:'Launch Trailer',ko:'출시 트레일러',image:'dragon',src:'assets/films/launch-content.mp4'},
 {name:'Story Trailer',ko:'스토리 트레일러',image:'godwyn',src:'assets/films/story-content.mp4'},
 {name:'Gameplay Trailer',ko:'게임플레이 트레일러',image:'sentinel',src:'assets/films/gameplay-content.mp4'},
 {name:'Warrior',ko:'검사 전투 영상',image:'torrent',clip:'warrior'},
 {name:'Confessor',ko:'밀사 전투 영상',image:'torch',clip:'confessor'},
 {name:'Prophet',ko:'예언자 전투 영상',image:'erdtree',clip:'prophet'},
 {name:'Samurai',ko:'무사 전투 영상',image:'shattering',clip:'samurai'},
 {name:'Hero',ko:'용사 전투 영상',image:'knight-study',clip:'hero'},
 {name:'Astrologer',ko:'점성술사 전투 영상',image:'rootfield',clip:'astrologer'}
];
// The eight opening prints fan out before the illustrated field appears below.
const openingPrints=[
 {i:9,wide:[-2, 47, 226],rise:[-0.5, 37, 202],stack:[1,0,3],fan:[2,10,108],open:[0,25,195],spread:[-35,-28,-18]},
 {i:10,wide:[33, 35, 19],rise:[37, 21, 4],stack:[-.6,.1,5],fan:[2,-9,-5],open:[1,-24,14],spread:[34,-25,24]},
 {i:11,wide:[-33, 38, -24],rise:[-33, 26, -8],stack:[-.4,.4,-15],fan:[-7,10,-22],open:[-14,23,-9],spread:[-32,31,-20]},
 {i:12,wide:[-35, -26, 100],rise:[-34, -55, 109],stack:[.5,0,-22],fan:[9,7,2],open:[17,24,-2],spread:[24,68,14]},
 {i:13,wide:[35, -42, -15],rise:[41, -65, -23],stack:[.3,-.4,-8],fan:[8,-5,-18],open:[18,-24,-19],spread:[32,35,11]},
 {i:14,wide:[-7, -12, 10],rise:[-8, -31, -6],stack:[-1,-.4,-28],fan:[-7,-5,-40],open:[-19,-19,-47],spread:[-23,63,-19]},
 {i:16,wide:[24, 0, 117],rise:[27, -12, 124],stack:[0,0,-24],fan:[-2,-1,-21],open:[-4,-10,-10],spread:[-3,6,-9]},
 {i:17,wide:[3, -44, 103],rise:[4, -68, 99],stack:[.3,.3,-16],fan:[3,-2,13],open:[4,-8,10],spread:[18,78,-18]},
];
// Positions are viewport percentages from the centre of the pinned scene.
// depth sets each print's travel speed and size: below 1 sits further back, above 1 passes closer.
const scatteredPrints=[
 {title:'Starlight',ko:'별빛 속에 솟은 금빛 나무',x:-35,y:-25,angle:-17,depth:.7},
 {title:'The Wanderer',ko:'바람에 흩날리는 망토',x:35,y:-22,angle:24,depth:1.25},
 {title:'Queen Marika',ko:'금빛 고리 아래 두 팔을 펼친 마리카',x:-24,y:47,angle:-26,depth:.85},
 {title:'Fire Giant',ko:'붉은 머리의 거인',x:35,y:51,angle:13,depth:1.3},
 {title:'Radagon',ko:'금빛 균열이 빛나는 라다곤',x:-3,y:88,angle:19,depth:1.1},
 {title:'Knight',ko:'불빛을 받은 기사의 투구',x:0,y:4,angle:-7,depth:.8},
 {title:'Trial by Fire',ko:'불길 가운데 맞붙은 두 전사',x:27,y:110,angle:10,depth:1.35},
 {title:'The Queen',ko:'금관을 쓴 여왕의 옆얼굴',x:-36,y:130,angle:-23,depth:1.15},
 {title:'Malenia',ko:'붉은 머리의 말레니아',x:16,y:185,angle:-9,quote:'upper'},
 {title:'Scarlet Aeonia',ko:'붉은 꽃과 말레니아',x:-17,y:234,angle:11,quote:'lower'},
 {title:'The Black Blade',ko:'검은 검과 은빛 갈기',x:32,y:164,angle:-12,depth:1.2},
 {title:'Ranni',ko:'별빛 아래 모자를 쓴 라니',x:-33,y:165,angle:18,depth:1.05}
];
const scatterIndex=i=>plates.length-scatteredPrints.length+i;
function fieldPose(f,p){
 const stops=[[0,f.stack],[.085,f.fan],[.17,f.open],[.265,f.wide],[.335,f.rise],[.52,f.spread]];
 for(let i=1;i<stops.length;i++)if(p<=stops[i][0]){
  const a=stops[i-1],b=stops[i],t=ramp(a[0],b[0],p);
  return a[1].map((v,k)=>mix(v,b[1][k],t));
 }
 return f.spread;
}
function placeFragment(node,x,y,angle,scale,alpha,mono){
 node.style.left=(50+x)+'%';node.style.top=(50+y)+'%';
 node.style.opacity=alpha;
 node.style.setProperty('--rot',angle+'deg');
 node.style.setProperty('--size',scale);
 node.style.setProperty('--mono',mono);
 node.inert=alpha<=.25||Math.abs(y)>60;
}
let galleryController;
const clamp01=n=>Math.max(0,Math.min(1,n));
function ramp(a,b,p){
 const x=clamp01((p-a)/(b-a));
 return x*x*(3-2*x);
}
const mix=(a,b,t)=>a+(b-a)*t;
function galleryFragment(index,layer){
 const p=plates[index];
 return '<button class="field-fragment" data-plate="'+index+'" style="z-index:'+layer+'" aria-label="'+p.title+' 이미지 확대"><span class="fragment-face">'+img(p.art,p.ko,'draggable="false"')+'</span><span class="fragment-caption">'+p.title+'</span></button>';
}
function filmCard(f,i){
 return '<button class="film-satellite sat-'+i+'" data-select-film="'+i+'" aria-label="'+f.name+' 중앙에서 재생" aria-pressed="false"><img alt="" src="'+(i===3?'assets/gallery/movie-1.webp':'assets/folio/satellite-'+i+'.png')+'"><i class="satellite-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 4 21 12 7 20Z" fill="currentColor"/></svg></i><span>'+f.name+'</span></button>';
}
function inlineCinema(){
 return '<section class="archive-cinema" id="cinema" aria-label="Movie 영상 갤러리"><div class="cinema-paint"></div><h2 class="movie-base">MOVIE</h2><div class="film-orbit">'+galleryFilms.map(filmCard).join('')+'</div><div class="central-screen"><div class="central-media"></div><span class="movie-negative" aria-hidden="true">MOVIE</span><button class="movie-toggle" aria-label="중앙 영상 재생"></button></div><span class="visually-hidden film-credit" aria-live="polite"></span></section>';
}
function illuminatedFooter(){
 const line='<span>THE PURSUIT <em>OF KNOWLEDGE</em> &nbsp; </span>';
 return '<footer class="illuminated-footer"><div class="slim-credits"><span>©2022 Bandai Namco Entertainment Inc. / ©2022 FromSoftware, Inc.</span><span>02.25.2022</span><a href="#product" aria-label="지원 플랫폼 및 제품 정보"><img src="assets/folio/platforms.png" alt="Xbox One, Xbox Series X|S, PS5, PS4, Steam"></a></div><div class="running-foil" aria-label="The pursuit of knowledge"><div aria-hidden="true">'+line.repeat(4)+'</div></div></footer>';
}
function galleryFooter(){
 const phrase='The pursuit of knowledge is without end';
 const tile='<img src="assets/gallery/layout/marquee.png" width="2048" height="117" alt="">';
 return '<footer class="gallery-finish"><div class="gallery-credit-band"><div class="gallery-credits"><img src="assets/gallery/layout/credits.png" width="1978" height="34" alt="©2022 Bandai Namco Entertainment Inc. / ©2022 FromSoftware, Inc. · 02.25.2022 · Xbox One, Xbox Series X|S, PS5, PS4, Steam"><a href="#product" aria-label="지원 플랫폼 및 제품 정보"></a></div></div><div class="gallery-roll"><span class="visually-hidden">'+phrase+'</span><div class="gallery-roll-track" aria-hidden="true">'+tile+tile+'</div></div></footer>';
}
function galleryWordmark(){
 // The cuts fall in the transparent gaps between the letters of the original PNG.
 const edges=[0,107,389,615,860,1052];
 return edges.slice(0,-1).map((left,i)=>'<span aria-hidden="true" style="--cut-left:'+100*left/1052+'%;--cut-right:'+100*(1052-edges[i+1])/1052+'%"></span>').join('');
}
function gallery(){
 const verse='<p>My flesh was<br><i>dull gold...</i></p><p>and my blood,<br><i>rotted.</i></p>';
 return '<section class="plate-sequence" aria-label="스크롤 이미지 갤러리"><div class="plate-stage">'+
 '<div class="gallery-backdrop" aria-hidden="true"><div class="gallery-backdrop-strips">'+Array.from({length:15},(_,i)=>'<img src="assets/gallery/background-hd/'+String(i+1).padStart(2,'0')+'.png" width="2400" height="'+[966,980,965,980,966,980,965,980,966,980,965,980,966,980,965][i]+'" alt="" decoding="async">').join('')+'</div></div>'+
 '<div class="gallery-frame">'+chapterFrame('gallery')+'</div><div class="plate-title"><h1 aria-label="Image">'+galleryWordmark()+'</h1></div>'+
 '<div class="gallery-story"><h2><img src="assets/gallery/layout/introduction.png" width="1582" height="1087" alt="About this game. Elden Ring is an open-world ARPG developed by FromSoftware and published by Bandai Namco Entertainment."></h2></div>'+
 '<div class="plate-constellation opening-deck">'+openingPrints.map((f,i)=>galleryFragment(f.i,20-i)).join('')+'</div><div class="plate-constellation scattered-deck" hidden>'+scatteredPrints.map((f,i)=>galleryFragment(scatterIndex(i),f.depth?Math.round(f.depth*14):15-i)).join('')+'</div><div class="malenia-phrase">'+verse+'</div>'+
 '<svg class="svg-defs" aria-hidden="true"><defs><clipPath id="quote-plates" clipPathUnits="objectBoundingBox"><polygon data-quote="upper"></polygon><polygon data-quote="lower"></polygon></clipPath></defs></svg><div aria-hidden="true" class="verse-mask"><div class="malenia-phrase verse-line">'+verse+'</div></div></div></section>'+inlineCinema()+galleryFooter();
}
function cardOutline(node,stage,scale,degrees,x,y){
 const w=node.offsetWidth*scale/2,h=node.offsetHeight*scale/2,a=degrees*Math.PI/180;
 return [[-w,-h],[w,-h],[w,h],[-w,h]].map(([u,v])=>[(50+x)/100+(u*Math.cos(a)-v*Math.sin(a))/stage.clientWidth,(50+y)/100+(u*Math.sin(a)+v*Math.cos(a))/stage.clientHeight].join(',')).join(' ');
}
// Sample the supplied 337 × 2048 panorama in the order of its illustrated scenes.
// Coordinates are vertical centres in source pixels, paired with scroll progress.
const galleryScenes=[[.24,84],[.39,259],[.48,273],[.57,466],[.67,876],[.78,1209],[.92,1615],[1,1660]];
function positionGalleryBackdrop(backdrop,stage,p){
 let centre=galleryScenes[0][1];
 for(let i=1;i<galleryScenes.length;i++){
  const [start,from]=galleryScenes[i-1], [stop,to]=galleryScenes[i];
  centre=mix(from,to,ramp(start,stop,p));
  if(p<=stop)break;
 }
 const scale=Math.max(stage.clientWidth/337,stage.clientHeight/174);
 const strips=backdrop.firstElementChild;
 strips.style.width=(337*scale)+'px';
 strips.style.transform='translate3d(-50%,'+Math.min(0,stage.clientHeight/2-centre*scale)+'px,0)';
}
function mountGallery(){
 galleryController?.abort();
 galleryController=new AbortController();
 const signal=galleryController.signal;
 const sequence=main.querySelector('.plate-sequence'),stage=sequence.firstElementChild;
 const opening=stage.querySelector('.opening-deck'),field=stage.querySelector('.scattered-deck');
 const fragments=[...stage.querySelectorAll('.field-fragment')],backdrop=stage.querySelector('.gallery-backdrop');
 const title=stage.querySelector('.plate-title'),story=stage.querySelector('.gallery-story'),quote=stage.querySelector('.malenia-phrase');
 const cinema=main.querySelector('.archive-cinema'),screen=cinema.querySelector('.central-media'),credit=cinema.querySelector('.film-credit');
 const outline=stage.querySelector('.verse-line'),toggle=cinema.querySelector('.movie-toggle');
 let raf=0,lastP=-1,selectedFilm=0,filmOpen=false;
 function progress(){
  const top=sequence.getBoundingClientRect().top;
  const inset=stage.getBoundingClientRect().height?parseFloat(getComputedStyle(stage).top)||0:0;
  return clamp01((inset-top)/Math.max(1,sequence.offsetHeight-stage.offsetHeight));
 }
 function paint(){
  raf=0;
  const p=progress();if(Math.abs(lastP-p)<.0001)return;lastP=p;
  const reduced=reduceMotion();
  const crossfade=ramp(.375,.455,p),ending=ramp(.80,.99,p);
  const introOpacity=1-ramp(.335,.408,p),storyOpacity=ramp(.395,.465,p)*(1-ramp(.50,.575,p));
  title.style.opacity=introOpacity;title.style.zIndex=p>.235?'5':'1';
  title.querySelectorAll('h1 span').forEach((el,i)=>{const lift=ramp(.266+i*.004,.403+i*.003,p);el.style.transform='translateY('+(-lift*(1.9+(i%2)*.5)*stage.clientHeight)+'px)';});
  story.style.opacity=storyOpacity;story.style.transform='translateY('+mix(24,-28,ramp(.14,.38,p))+'px)';
  quote.style.opacity=outline.style.opacity=ramp(.83,.95,p);
  const frameLayer=stage.querySelector('.gallery-frame');frameLayer.style.opacity=1-ramp(.35,.42,p);frameLayer.inert=p>.42;
  positionGalleryBackdrop(backdrop,stage,p);
  backdrop.style.opacity=1-ramp(.95,1,p);
  opening.hidden=crossfade===1;field.hidden=crossfade===0;
  if(!opening.hidden)openingPrints.forEach((f,i)=>{
   const [x,y,angle]=fieldPose(f,p);
   placeFragment(opening.children[i],x,y,reduced?0:angle,1,(1-crossfade)*(1-.86*storyOpacity),0);
  });
  if(!field.hidden){
   const travel=205*clamp01((p-.56)/.35);
   scatteredPrints.forEach((f,i)=>{
    const node=field.children[i],drift=travel/205,depth=f.depth||1;
    let x=f.x+(i%2?4:-4)*drift*depth,y=f.y-travel*depth+12*(1-crossfade);
    let angle=f.angle+(i%2?-8:6)*drift;
    const alpha=crossfade*(1-.86*storyOpacity)*(f.quote?1:1-ramp(.84,.98,p));
    const scale=.73*(.7+.3*depth)+(f.quote ? .17*ending : 0);
    if(f.quote){
     const upper=f.quote==='upper';
     x=mix(x,upper?12:-13,ending);y=mix(y,upper?-18:24,ending);angle=mix(angle,upper?3:10,ending);
     stage.querySelector('[data-quote="'+f.quote+'"]').setAttribute('points',cardOutline(node,stage,scale,reduced?0:angle,x,y));
    }
    placeFragment(node,x,y,reduced?0:angle,scale,alpha,f.quote?1-ending:1);
   });
  }

 }
 function queue(){if(!raf)raf=requestAnimationFrame(paint);}
 window.addEventListener('scroll',queue,{signal,passive:true});
 window.addEventListener('resize',()=>{lastP=-1;queue();},{signal});
 function poster(){
  screen.replaceChildren();filmOpen=false;maskAmbience('gallery',false);
  toggle.setAttribute('aria-label','중앙 영상 재생');
  cinema.querySelectorAll('.film-satellite').forEach(b=>b.setAttribute('aria-pressed','false'));
 }
 function play(index){
  selectedFilm=index;
  const film=galleryFilms[index],video=document.createElement('video');
  video.playsInline=true;video.preload='auto';video.setAttribute('aria-label',film.ko);video.poster='assets/gallery/movie-1.webp';
  video.src=film.src||'assets/origins/'+film.clip+'.webm';
  screen.replaceChildren(video);filmOpen=true;
  const state=()=>{if(video.isConnected){maskAmbience('gallery',!video.paused);toggle.setAttribute('aria-label',film.ko+(video.paused?' 재생':' 일시 정지'));}};
  video.addEventListener('play',state);video.addEventListener('pause',state);video.addEventListener('ended',state);
  let ready=false;
  function revealAndPlay(){
   if(ready||!video.isConnected||signal.aborted)return;
   ready=true;video.classList.add('film-ready');
   video.play().catch(()=>{if(!video.isConnected)return;video.muted=true;video.play().catch(state);});
  }
  video.addEventListener('loadeddata',revealAndPlay,{once:true,signal});
  video.addEventListener('canplay',revealAndPlay,{once:true,signal});
  video.addEventListener('error',()=>{if(video.isConnected){credit.textContent=film.name+' — 다시 선택해 주세요';state();}},{once:true,signal});
  video.load();
  credit.textContent=film.name;
  cinema.querySelectorAll('.film-satellite').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.selectFilm)===index));
 }
 cinema.addEventListener('click',e=>{
  const b=e.target.closest('[data-select-film]');
  if(b){play(Number(b.dataset.selectFilm));return;}
  if(!e.target.closest('.movie-toggle'))return;
  const video=screen.querySelector('video');
  if(!video){play(selectedFilm);return;}
  if(video.paused)video.play().catch(()=>{});else video.pause();
 },{signal});
 const observer=new IntersectionObserver(entries=>{
  cinema.classList.toggle('cinema-visible',entries[0].isIntersecting);
  if(!entries[0].isIntersecting&&filmOpen){poster();cinema.classList.remove('is-playing');}
 },{threshold:0});
 observer.observe(cinema);
 function onHidden(){if(document.hidden&&filmOpen){poster();cinema.classList.remove('is-playing');}}
 document.addEventListener('visibilitychange',onHidden,{signal});
 signal.addEventListener('abort',()=>{cancelAnimationFrame(raf);observer.disconnect();maskAmbience('gallery',false);screen.replaceChildren();},{once:true});
 // A tap reveals the print's colour, a second tap opens that print.
 stage.addEventListener('click',e=>{
  const card=e.target.closest('.field-fragment');
  if(!card||card.closest('.opening-deck')||!matchMedia('(hover:none)').matches||card.classList.contains('touch-lit'))return;
  e.preventDefault();e.stopPropagation();
  fragments.forEach(n=>n.classList.toggle('touch-lit',n===card));
 },{signal});
 paint();renderSound();
}
