'use strict';
const prologueArt=name=>'assets/prologue/'+name+'.webp';
function prologuePortal(){
 return '<section class="story-portal" aria-label="Prologue">'+chapterFrame('prologue')+'<h1 class="living-title"><span class="visually-hidden">The Children of the Blood of the Golden Tree</span><span class="title-cut" aria-hidden="true"><video muted playsinline loop disablepictureinpicture poster="assets/prologue/card-03.webp" preload="metadata" src="assets/folio/title-film.webm"></video></span></h1><button class="ember-portal" data-film="story" aria-haspopup="dialog" aria-label="스토리 트레일러 재생"><i class="ember-wick" aria-hidden="true"></i><span class="portal-film-still" aria-hidden="true"></span><span class="portal-watch">Click to watch<br>the video</span></button><div class="fallen-copy"><p>The fallen leaves speak.</p><p>The source of the golden tree in the narrow space where the eternal queen marika, the demigods, with the great runes of the elden Ring, went mad, warped, and abandoned by great will.</p></div></section>';
}
// Layout coordinates follow the positions of the separate plates on the supplied scroll.
const plateAt=(x,y,w)=>'style="--px:'+x+'%;--py:'+y+'%;--pw:'+w+'%"';
function chronicleArt(file,alt,x,y,w,width,height){
 return '<figure class="chronicle-piece chronicle-art" '+plateAt(x,y,w)+'><img src="'+prologueArt(file)+'" width="'+width+'" height="'+height+'" alt="'+alt+'" loading="lazy"></figure>';
}
function chronicleText(kind,html,x,y,w){
 return '<div class="chronicle-piece '+kind+'" '+plateAt(x,y,w)+'>'+html+'</div>';
}
function chronicleHeading(file,title,x,y,w){
 return '<h2 class="chronicle-piece chronicle-heading" '+plateAt(x,y,w)+'><img src="'+prologueArt(file)+'" alt="'+title+'" loading="lazy"></h2>';
}
function prologue(){
 return prologuePortal()+'<div class="chronicle">'+
 '<section class="story-spread age" aria-label="The Golden Age">'+
 chronicleArt('card-01','쓰러진 고드윈',4,7,63,1210,693)+chronicleArt('card-02','고드윈의 눈',12,28,25,477,335)+
 chronicleHeading('golden-age','The Golden Age',53.5,22,36)+
 chronicleText('chronicle-age-sigil chronicle-sigil','<img src="assets/prologue/ring-small.webp" width="215" height="206" alt="Elden Ring">',75,22.2,8.5)+
 chronicleHeading('conspiracy','and the night of conspiracy',26.2,46,51.8)+
 chronicleArt('card-03','황금 나무의 빛 아래 선 전사',58,62,32,624,893)+
 chronicleText('chronicle-note age-history-first','<img class="history-leaf" src="assets/prologue/leaf.webp" alt=""><p>A long time ago, the land of the niche was the age of dinosaurs and beasts dominated by the Dragon King Flakidusax, the king of the Elder, and his companion, the goddess. One day, for unknown reasons, God disappears and Flakydoux continues to wait for God’s return</p>',9,74,17.5)+
 chronicleText('chronicle-note age-history-second','<p>in the cracks of time. After that, the civilization of dinosaurs and beasts falls.<br>Thus the Dragon Age is over, and the Night Snow Queen appears. The Night Snow Queen had the power of fate to kill God. She led the apostles of God’s skin.</p>',35.8,74,17.5)+
 chronicleArt('card-04','안개가 깔린 숲',22,91,21,382,207)+'</section>'+
 '<section class="story-spread blessing" aria-label="The distant past">'+
 chronicleText('chronicle-rise-caption','<p>Rise now tarnished</p>',22,1.5,21)+
 chronicleArt('ring-large','황금률의 문양',-18,-12.5,48.75,936,896).replace('chronicle-art','chronicle-art chronicle-sigil chronicle-blessing-sigil')+
 chronicleText('chronicle-note blessing-history','<p>The great will sent Elde’s beast<br>down to the land of the niche through<br>the golden meteor, which<br>becomes the golden rule. Numen Marika,</p>',27,12,23)+
 chronicleArt('card-05','두 팔을 펼친 마리카',27,22,64,1217,733)+
 chronicleHeading('blessing','Those who have not died yet. Blessings lost in the distant past call us',10,53,51.5)+
 chronicleText('chronicle-note blessing-continuation','<p>who crossed the sea of fog and came to the land of the niche, became a bowl of golden rules and fostered the power to build the discipline of the golden tree that began to grow on this land. At first, not all the forces in the niche land were friendly to the golden tree.</p>',68.3,63,19)+
 chronicleText('chronicle-launch','<img class="launch-leaf" src="assets/prologue/leaf.webp" alt=""><h3>Launch</h3><p>Learn the history of the world of ELDEN RING, as crafted<br>by Hidetaka Miyazaki and George R. R. Martin.</p>',12.5,84,31)+
 chronicleArt('card-06','성 아래의 전장',58,82,26,515,310)+'</section>'+
 '<section class="story-spread war" aria-label="The Shattering">'+
 chronicleArt('card-07','그늘 아래 드리운 팔',48,4,41,785,281)+
 chronicleHeading('shattering','The Shattering',30,16,36)+
 chronicleText('chronicle-war-sigil chronicle-sigil','<img src="assets/prologue/ring-large.webp" width="936" height="896" alt="Elden Ring">',68,17,20)+
 chronicleArt('card-08','황금빛 아치 아래의 인물',6,23,27,515,311).replace('</figure>','<figcaption>War and civil war<br>in the Eldon Ring.</figcaption></figure>')+
 chronicleText('chronicle-note war-history','<p>After the war, which ended without a winner, the land in the gap was woefully damaged and other forces were rushing around in disorder.</p>',52,30,15)+
 chronicleArt('card-09','전투에 지친 거인의 얼굴',69,36,30,736,452)+
 chronicleArt('card-10','스칼렛 에오니아의 꽃',23,51,29,553,337)+
 chronicleArt('card-11','붉은 부패에 물든 전장',6.5,63,53,1008,614)+
 chronicleText('chronicle-note war-aftermath','<img class="history-leaf" src="assets/prologue/leaf.webp" alt=""><p>The Demi-gats, the descendants of Marika, had to compete with other Demi-gats to achieve this and restore the Golden Rule, and quickly turned into enemies, with the power of the &quot;Great Run&quot; to drive the holders crazy.</p><p>The Demi-gats, the descendants of Marika, had to compete with other Demi-gats to achieve this and restore the Golden Rule, and quickly turned into enemies, with the power of the &quot;Great Run&quot; to drive the holders crazy.</p>',65,69,23)+'</section>'+
 '<section class="story-spread crown" aria-label="Take the crown">'+
 chronicleArt('card-12','별빛 아래 라니',17,16,67,1278,653)+
 chronicleHeading('crown','“thou shouldst take the crown”',6,37,31.72)+
 '<button data-film="story" class="chronicle-piece crown-film" '+plateAt(77,33,14)+' aria-label="스토리 트레일러 재생"><svg class="crown-play-ring" viewBox="0 0 100 100" aria-hidden="true"><circle class="ring-base" cx="50" cy="50" r="48"/><circle class="ring-draw" cx="50" cy="50" r="48" pathLength="100"/></svg><span class="crown-play-label"><b aria-hidden="true">▶</b><span>PLAY</span></span></button></section></div>'+galleryFooter();
}
let chronicleController;
function mountPrologue(){
 const signal=(chronicleController=new AbortController()).signal,portal=main.querySelector('.story-portal'),film=portal.querySelector('video');
 let inView=false;
 function sync(){if(inView&&!document.hidden&&!viewer.open&&!reduceMotion())film.play().catch(()=>{});else film.pause();}
 const filmObserver=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();});
 filmObserver.observe(portal);document.addEventListener('visibilitychange',sync,{signal});viewer.addEventListener('toggle',sync,{signal});
 const observer=new IntersectionObserver(entries=>{
  const entering=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
  entering.forEach((e,i)=>{e.target.style.setProperty('--wait',Math.min(i,3)*145+'ms');e.target.classList.add('risen');observer.unobserve(e.target);});
 },{rootMargin:'0px 0px -6% 0px',threshold:.035});
 main.querySelectorAll('.chronicle-piece').forEach(el=>{if(el.closest('.crown')||el.classList.contains('chronicle-sigil'))return;el.classList.add('await-rise');observer.observe(el);});
 const crown=main.querySelector('.crown');crown.classList.add('crown-sequence');
 const crownObserver=new IntersectionObserver(entries=>{entries.forEach(e=>crown.classList.toggle('crown-visible',e.isIntersecting));},{threshold:.2});crownObserver.observe(crown);
 // The gold sigil has its own materialisation, independent of the copy reveal.
 const sigils=main.querySelectorAll('.chronicle-sigil');
 const sigilObserver=new IntersectionObserver(entries=>{entries.forEach(e=>e.target.classList.toggle('sigil-lit',e.isIntersecting));},{threshold:.3});sigils.forEach(sigil=>{sigil.style.setProperty('--sigil-art','url('+sigil.querySelector('img').getAttribute('src')+')');sigilObserver.observe(sigil);});
 const portalButton=portal.querySelector('.ember-portal');
 let portalFrame=0,px=0,py=0,targetX=0,targetY=0,portalBounds;
 function driftPortal(){
  portalFrame=0;px+=(targetX-px)*.13;py+=(targetY-py)*.13;
  if(Math.abs(targetX-px)+Math.abs(targetY-py)<.02){px=targetX;py=targetY;}
  portalButton.style.setProperty('--portal-x',px.toFixed(3)+'px');portalButton.style.setProperty('--portal-y',py.toFixed(3)+'px');
  portalButton.style.setProperty('--portal-art-x',(-px*.7).toFixed(3)+'px');portalButton.style.setProperty('--portal-art-y',(-py*.7).toFixed(3)+'px');
  if(px!==targetX||py!==targetY)portalFrame=requestAnimationFrame(driftPortal);
 }
 function steerPortal(e){
  if(e.pointerType!=='mouse'||reduceMotion())return;
  portalBounds=portalBounds||portalButton.getBoundingClientRect();
  const range=Math.min(9,portalBounds.width*.04);
  targetX=Math.max(-1,Math.min(1,(e.clientX-portalBounds.left)/portalBounds.width*2-1))*range;
  targetY=Math.max(-1,Math.min(1,(e.clientY-portalBounds.top)/portalBounds.height*2-1))*range;
  if(!portalFrame)portalFrame=requestAnimationFrame(driftPortal);
 }
 function releasePortal(){portalBounds=null;targetX=targetY=0;if(!portalFrame)portalFrame=requestAnimationFrame(driftPortal);}
 portalButton.addEventListener('pointerenter',steerPortal,{signal});portalButton.addEventListener('pointermove',steerPortal,{signal});portalButton.addEventListener('pointerleave',releasePortal,{signal});portalButton.addEventListener('pointercancel',releasePortal,{signal});
 window.addEventListener('blur',releasePortal,{signal});window.addEventListener('resize',releasePortal,{signal});
 signal.addEventListener('abort',()=>{filmObserver.disconnect();observer.disconnect();crownObserver.disconnect();sigilObserver.disconnect();cancelAnimationFrame(portalFrame);film.pause();},{once:true});
}
