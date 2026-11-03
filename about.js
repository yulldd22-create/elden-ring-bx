'use strict';

const originRecords = [
 {id:'warrior',name:'Warrior',ko:'검사',line:'Twin blades of the wandering tribes.',skill:'Dexterity',kit:'쌍곡검 · 소형 방패',desc:'두 자루의 곡검을 든 유목민 전사. 민첩한 발놀림으로 상대의 측면을 파고들어, 끊임없는 연격으로 전투의 흐름을 가져옵니다.'},
 {id:'confessor',name:'Confessor',ko:'밀사',line:'A blade in service of the faith.',skill:'Faith',kit:'직검 · 성인',desc:'은밀한 임무를 수행하는 교회의 밀사. 방패와 직검으로 적을 상대하고, 틈이 생기면 기도를 사용합니다.'},
 {id:'prophet',name:'Prophet',ko:'예언자',line:'Faith endures beyond exile.',skill:'Faith',kit:'창 · 성인',desc:'불길한 예언으로 추방당한 순례자. 창으로 거리를 유지하고, 회복과 불꽃의 기도로 싸움을 이어갑니다.'},
 {id:'vagabond',name:'Vagabond',ko:'방랑기사',line:'An exiled knight, bound to wander.',skill:'Vigor',kit:'직검 · 할버드',desc:'고향을 떠나 방랑하는 기사. 튼튼한 갑옷과 방패로 공격을 받아내고, 검과 긴 자루 무기로 반격합니다.'},
 {id:'hero',name:'Hero',ko:'용사',line:'A battle axe and a warrior’s blood.',skill:'Strength',kit:'전투 도끼 · 방패',desc:'황야에서 자란 힘센 전사. 묵직한 도끼를 휘둘러 적의 자세를 무너뜨리는 근접전에 능합니다.'},
 {id:'bandit',name:'Bandit',ko:'도적',line:'From a distance, a single arrow.',skill:'Arcane',kit:'단검 · 단궁',desc:'단검과 짧은 활을 다루는 도적. 멀리서 상대를 유인하거나, 그림자 속에서 기회를 노릴 수 있습니다.'},
 {id:'astrologer',name:'Astrologer',ko:'점성술사',line:'The stars reveal a path.',skill:'Intelligence',kit:'지팡이 · 숏소드',desc:'별을 읽고 휘석 마술을 익힌 학도. 거리를 두고 마술을 날리며, 가까이 다가오는 적에게는 짧은 검을 꺼냅니다.'},
 {id:'samurai',name:'Samurai',ko:'무사',line:'Steel and bow from distant reeds.',skill:'Dexterity',kit:'타도 · 장궁',desc:'갈대의 땅에서 건너온 무인. 장궁으로 먼 적을 견제하고, 가까이에서는 타도의 날카로운 베기로 승부합니다.'},
 {id:'prisoner',name:'Prisoner',ko:'죄수',line:'A scholar behind an iron mask.',skill:'Intelligence',kit:'에스토크 · 지팡이',desc:'철가면을 쓴 죄수. 섬세한 찌르기와 휘석 마술을 조합해, 적과의 거리에 따라 전투 방식을 바꿉니다.'},
 {id:'wretch',name:'Wretch',ko:'빈털터리',line:'Nothing but a club and a beginning.',skill:'Adaptability',kit:'곤봉',desc:'곤봉 하나만 쥐고 여정을 시작하는 빛바랜 자. 무엇을 발견하고 어떤 능력을 기를지, 첫걸음부터 스스로 정합니다.'}
];
const fieldStops=['World','Open world','Build','Armament','Origin','Conflict','Combat','Battle','Encounters','Sorcery','Battlefield','Tarnished','Footer'];
const fieldFolio=name=>'assets/folio/'+name+'.webp';
const aboutGround=name=>'assets/folio/backgrounds/'+name+'.webp';
function fieldArt(id,x,y,w,h,alt){
 return '<figure class="folio-art" style="--x:'+x+'%;--y:'+y+'%;--w:'+w+'%;--h:'+h+'%"><img src="'+fieldFolio(id)+'" alt="'+alt+'" loading="lazy"></figure>';
}
function fieldNote(x,y,w,head,body){
 return '<div class="folio-note" style="--x:'+x+'%;--y:'+y+'%;--w:'+w+'%">'+(head?'<h3>'+head+'</h3>':'')+'<p>'+body+'</p></div>';
}
function printedPanel(name,kind,paint,content){
 const ground='<div class="print-ground" style="background-image:url('+aboutGround(paint)+')"></div>';
 return '<article class="field-panel field-print '+kind+'" aria-label="'+name+'">'+ground+'<div class="field-layout">'+content+'</div></article>';
}
function openWorld(){
 return printedPanel('Open world','open-country','open-world','<h2 class="open-heading"><span class="about-live-type">Open<br>Worlde</span><img src="assets/folio/open-world-title.svg" width="277" height="88" alt="" draggable="false"></h2>'+fieldArt('open-road',53.58,9.73,42.71,40.79,'바람 부는 능선을 건너는 영마')+fieldNote(31.1,62.3,21.4,'A VAST WORLD FULL OF<br>EXCITEMENT','A vast world where open fields with a variety of situations and huge dungeons with complex and three-dimensional designs are seamlessly connected.')+fieldNote(56.55,62.3,21.4,'BECOME AN ELDEN LORD IN<br>THE LANDS BETWEEN.','As you explore, the joy of discovery unknown and overwhelming threats await you, leading to a high sense of accomplishment.'));
}
function buildPanel(){
 const glints=['hilt','blade','tip'].map(part=>'<image class="sword-light light-'+part+'" href="assets/folio/sword-light-'+part+'.webp" x="104" y="27" width="258.4" height="504.64"/>').join('');
 // ViewBox coordinates align the three supplied flares with the grip and cutting edge.
 const sword='<svg class="build-sword" viewBox="65 0 335 525" role="img" aria-label="스크롤에 따라 빛나는 Inseparable Sword">'+
 '<image class="build-backlight" href="assets/folio/sword-backlight.webp" x="-58" y="20" width="594" height="520"/>'+
 '<image href="assets/origins/armament/sword.webp" width="1024" height="1024" transform="matrix(.3064 -.1349 .1349 .3064 40.4 155.2)"/>'+glints+
 '<g class="blade-caption" text-anchor="end"><text x="341" y="451">Great Swords</text><text x="341" y="467">INSEPARABLE SWORD</text></g></svg>';
 const copy='<h2 class="build-heading"><img src="assets/folio/build-type.png" width="1182" height="652" alt="Elden Ring has a variety of characteristics. Capabilities and additional effects vary depending on what attributes are given, and even the same weapon can produce different performance." draggable="false"></h2>';
 return printedPanel('Build','build-path','build',sword+copy);
}
// Crop coordinates are in the supplied 2048 × 76 About board. The rail has one continuous landscape after Origin.
const panoramaLeft=852,panoramaWidth=2048-panoramaLeft;
// Coordinates follow the printed board. Height comes from the original artwork.
const panoramaArt=[
 ['scene-01.webp',994,12,37,'황금빛 망치를 들어 올린 인물'],
 ['scene-02.webp',1066.4,33.45,63,'붉은 갈기와 금빛 갑옷의 전사'],
 ['scene-03.webp',1145,9,33,'푸른 밤, 검은 후드를 쓴 인물'],
 ['scene-04.webp',1155,58.8,53,'촛불에 둘러싸인 거대한 인물'],
 ['scene-05.webp',1208,9.1,60.7,'붉은 하늘을 배경으로 싸우는 전사들'],
 ['scene-06.webp',1303.4,7.65,96,'황금빛 갑옷의 전사와 등 뒤의 사자'],
 ['scene-07.webp',1471,13.7,22,'칼을 든 흰 후드의 인물'],
 ['scene-08.webp',1504.2,35,53,'불빛 앞에 앉아 있는 푸른 인물'],
 ['scene-09.webp',1572,-1,52,'흰 꽃이 핀 나무 아래의 말레니아'],
 ['fairy.png',1585,49.2,4.8,'파란 요정'],
 ['malenia-portrait.webp',1639,23.7,30.6,'붉은 머리칼과 금빛 견갑이 보이는 말레니아의 초상'],
 ['scene-10.webp',1668,56,27,'말레니아의 갑옷과 의수, 칼의 설정화'],
 ['scene-11.webp',1729.4,11,82.55,'거대한 흰 뿌리 앞에 선 인물']
];
// Editorial copy stays selectable at every scale. The plates are artwork only.
const panoramaCaptions=[
 {x:1016,y:31,w:34,lines:[
  "This is the final version of the keyframe and","VFX for the blacksmith's body crack at the end",
  "of the trailer. It's also the first concept that I","came up with when I participated in the","Elden Ring project."]},
 {x:1098,y:26.5,w:44,style:'radahn',title:'Starscourge Radahn',lines:['Caleid and general of the Knights of the Red Lion.']},
 {x:1247,y:49,w:27,lines:['be drawn to a niche land darker','than darkness and hotter than fire','To be king of the Elder.']},
 {x:1403,y:7.4,w:44,lines:["...It's been a long while. Morgott.","Long and hard didst thou fight. Tarnished Warrior.",
  "Spurned by the grace of gold.","Be assured, the Elden Ring resteth close at hand.",
  "Alas, I am returned. To be granted audience once more.","Upon my name as Godfrey, The first Elden Lord!"]},
 {x:1418,y:41.5,w:23,style:'epithet',lines:['First Elden Lord']},
 {x:1566.5,y:49.6,w:34,style:'spirit',title:'Snow Witch<br>Renna',lines:['Renna will give you the ability to summon','spirits at a specific point in the game.']},
 {x:1673,y:32,w:48,lines:['I dreamt for so long.','My flesh was dull gold...and my blood, rotted.',
  'Corpse after Corpse, left in my wake... As I waited...his return.','...Heed my words.',
  'I am Malenia. Blade of Miquella.','And I have never known defeat.']},
 {x:1806,y:22.4,w:8,style:'vertical',lines:['Art &amp; Design']}
];
// Fine gold leaders tie the two colored captions to their paintings.
function panoramaLeader(x,y,width,viewBox,path,ringX,ringY,endX,endY){
 return '<svg class="panorama-leader" aria-hidden="true" viewBox="'+viewBox+'" style="'+panoramaBox(x,y,x+width)+'"><path d="'+path+'"/><circle cx="'+ringX+'" cy="'+ringY+'" r="8"/><circle cx="'+ringX+'" cy="'+ringY+'" r=".85" fill="currentColor"/><circle cx="'+endX+'" cy="'+endY+'" r="1.2" fill="currentColor"/></svg>';
}
function panoramaBox(x,y,r,b){
 return 'left:'+((x-panoramaLeft)/panoramaWidth*100)+'%;top:'+(y/76*100)+'%;width:'+((r-x)/panoramaWidth*100)+'%;'+(b===undefined?'':'height:'+((b-y)/76*100)+'%;');
}
function combatFolios(){
 const base='assets/folio/panorama/';
 const images=panoramaArt.map(([file,x,y,width,alt])=>'<img class="reference-piece'+(file==='malenia-portrait.webp'?' malenia-portrait':'')+'" src="'+base+file+'" alt="'+alt+'" draggable="false" style="'+panoramaBox(x,y,x+width)+'">').join('');
 const captions=panoramaCaptions.map(({x,y,w,title,lines,style})=>
  '<aside lang="en" class="panorama-caption'+(style?' caption-'+style:'')+'" style="'+panoramaBox(x,y,x+w)+'">'+
  (title?'<h3>'+title+'</h3>':'')+'<p>'+lines.join('<br>')+'</p></aside>').join('');
 const leaders=panoramaLeader(1084,27.6,12.7,'0 0 83 70','M9 59 Q22 21 45 17 C59 14 65 24 56 28 C47 32 39 23 45 15 Q55 2 79 2',9,59,79,2)+
  panoramaLeader(1547,44.9,20.2,'0 0 129 74','M10 61 Q24 27 53 12 C72 2 92 13 77 27 C62 42 55 17 76 7 Q99 -8 125 15',10,61,125,15);
 const middle=[[1,974,1169],[2,1167,1362],[3,1356,1551],[4,1545,1740]].map(([id,x,right])=>
  '<div class="panorama-backdrop" aria-hidden="true" style="'+panoramaBox(x,0,right)+'background-image:url(assets/folio/backgrounds/panorama-backdrop-'+id+'.png)"></div>').join('');
 // Coordinates are measured on About(3).jpg. The outlined names sit behind the character paintings.
 const names=[['radahn-outline',991,-11,188],['godfrey-outline',1320,44,206],['malenia-outline',1618,-5,193]].map(([name,x,y,w])=>'<img class="boss-outline" src="'+base+name+'.png" alt="" aria-hidden="true" style="'+panoramaBox(x,y,x+w)+'">').join('');
 const landscape='<div class="origin-fantasy-paint" aria-hidden="true"><img class="panorama-sky" src="'+base+'opening-sky.webp" alt="" draggable="false"></div>';
 const opening='<div class="fantasy-opening" style="'+panoramaBox(panoramaLeft,0,966,76)+'">'+
 '<img class="fantasy-title" src="'+base+'fantasy-title.png" width="696" height="322" alt="Fantasy, Action and Danger. The Soul Series, Bloodborne, Sekiro: Shadow Die Twice developer Hidetaka Miyazaki, and George R. R. Martin, the author of “The Song of Ice and Fire,” participated in the creation of the worldview." draggable="false"></div>';
 const ending='<section class="reference-ending" aria-label="Rise, Tarnished"><img class="ending-eye" src="'+base+'scene-12.webp" alt="쓰러진 인물 앞에 떠 있는 황금빛 눈">'+
 '<div class="ending-note" lang="en"><img src="'+base+'goldmask.png" alt="" width="117" height="109"><blockquote>“God with a human heart is unnecessary be nothing more than a flaw in discipline.”</blockquote>'+
 '<p>In addition to multiplayer, where you can directly connect with other players and play together, the game supports a unique asynchronous online element that allows you to feel the presence of others.</p><button class="about-return" type="button" lang="en" data-ready="false" aria-hidden="true" tabindex="-1"><span aria-hidden="true">←</span> Back to Start</button></div>'+
 '<h2 class="ending-title"><img src="'+base+'rise-tarnished.png" width="2048" height="206" alt="Rise, Tarnished" draggable="false"></h2></section>';
 const marqueeTile='<span class="about-marquee-type">THE PURSUIT <strong>OF KNOWLEDGE</strong> IS WITHOUT <strong>END</strong>&nbsp;</span>';
 const footer='<footer class="about-finish-strip"><div class="about-finish-rotated">'+
 '<div class="about-finish-credits"><img src="assets/gallery/layout/credits.png" width="1978" height="34" alt="©2022 Bandai Namco Entertainment Inc. / ©2022 FromSoftware, Inc. · 02.25.2022 · Xbox One, Xbox Series X|S, PS5, PS4, Steam"></div>'+
 '<a class="gallery-roll" href="#gallery" aria-label="The pursuit of knowledge is without end · 갤러리로 이동"><div class="gallery-roll-track" aria-hidden="true">'+marqueeTile+marqueeTile+'</div></a></div></footer>';
 return '<section class="reference-panorama" aria-label="직업 다음 연속 가로 파노라마"><div class="panorama-plane"><div class="reference-canvas">'+middle+landscape+names+opening+images+leaders+captions+'</div>'+ending+footer+'</div></section>';
}
function mountFantasyOpening(rail,signal){
 const opening=rail.querySelector('.fantasy-opening'),title=opening.querySelector('.fantasy-title');
 const sight=new IntersectionObserver(entries=>{
  for(const entry of entries){
   if(!entry.isIntersecting)opening.classList.remove('in-view');
   else if(entry.intersectionRatio>=.28)opening.classList.add('in-view');
  }
 },{root:rail,threshold:[0,.28]});
 sight.observe(title);
 signal.addEventListener('abort',()=>sight.disconnect(),{once:true});
}
let aboutController, aboutIndex=0, rosterStart=0, selectedOrigin=0, originOpener;
const originDialog=document.querySelector('#origin-dialog');
const assetOrigin=(id,suffix)=>'assets/origins/'+id+'-'+suffix+'.webp';
const originImage=(o,suffix,cls='',alt='')=>'<img class="'+cls+'" src="'+assetOrigin(o.id,suffix)+'" alt="'+alt+'" draggable="false">';
const eyeIcon='<svg viewBox="0 0 44 29" fill="none" aria-hidden="true"><path d="M2 14.5Q22 -6 42 14.5Q22 35 2 14.5Z" stroke="currentColor" stroke-width="1.6"/><circle cx="22" cy="14.5" r="7.5" stroke="currentColor" stroke-width="1.4"/><circle cx="22" cy="14.5" r="3" fill="currentColor"/></svg>';
const chapterMark=(n,name)=>'<span class="folio-label"><i></i>Field notes &nbsp; / &nbsp; '+n+' &nbsp; · &nbsp; '+name+'</span>';

function rosterCards(){
 return originRecords.slice(rosterStart,rosterStart+3).map((o,j)=>{
  const i=rosterStart+j;
  return '<button class="origin-card" data-character="'+i+'" aria-haspopup="dialog" aria-label="'+o.name+' 캐릭터 상세"><span class="card-frame">'+originImage(o,'portrait','card-render',o.ko)+corners()+'<span class="card-light"></span><span class="card-eye">'+eyeIcon+'</span></span><img class="card-flourish" src="assets/origins/name-leaves.png" width="74" height="18" alt="" draggable="false"><span class="card-name">'+o.name+'</span></button>';
 }).join('');
}
const weapons=[
 {id:'sword',name:'Sword',title:'Inseparable Sword',physical:98,holy:98,width:399,height:429,notes:[
  "A sword intertwined with silver and oil a holy sword that hunts the dead It has divine attack power. The inseparable twins served the golden rule. Because that's the only thing didn't call them a curse.",
  "Kang India's damage is observed, and the attack power of Amwol's large sword and the powerful combat technology of the death knuckles boast a majesty that was certainly hard to see in small units.",
  "Sword forged by compounding silver and gold. A sacred weapon to hunt Those Who Live in Death. Deals holy damage. The inseparable twins found solace in the Golden Order, the only institution not to revile them as accursed beings."
 ]},
 {id:'hammer',name:'Hammer',title:'Greathorn Hammer',physical:134,holy:0,width:401,height:404,notes:[
  "Huge thick horn carved with tree ring-like markings adapted into a bludgeoning weapon. Wielded by ancestral follower warriors. The ancient horn is imbued with the power of ancestral spirits.",
  "A small amount of HP is restored upon defeating an enemy. Greathorn Hammer is a Great Hammer (Warhammer) in Elden Ring.",
  "The Greathorn Hammer scales primarily with Strength and Dexterity and is a good Weapon for high strength players who can hold this weapon's weight. The weight is worth the ability to crush enemy armor, sometimes along with the enemy itself."
 ]},
 {id:'bow',name:'Bow',title:'Albinauric Bow',physical:82,holy:0,width:406,height:407,notes:[
  "Albinauric Bow is a Bow in Elden Ring. The Albinauric bow scales primarily with Strength and Dexterity and is a good Weapon for long ranged combat. This bow requires dexterity over strength to master.",
  "At least four Albinauric archers can be found south-southwest of the Ordina, Liturgical Town sight of grace. One can be found riding a wolf; three can be found seated near each other.",
  "Longbow featuring delicate silverwork. Wielded by Albinauric wolfback archers. They can also drop from the stationary rooftop archers inside the Ordina. Evergaol. This weapon can be infused with Ashes of War"
 ]},
 {id:'staff',name:'Staff',title:'Dragon Halberd',physical:24,holy:0,width:404,height:428,notes:[
  "Dropped by the Dragonkin Soldier boss in Siofra River. This Dragonkin Soldier can be accessed by a portal directly south on the map of the Worshipper's Woods on ruins being led up to by a collapsed pillar with an archer sitting atop.",
  "The Dragon Halberd scales primarily with Strength and Dexterity and it is a good Weapon for those users with high Dexterity builds who can use the Dragon Halberd to Slash Enemies while spinning.",
  "Spinning Slash on this weapon functions similarly to the standard version, but has an unstated additional effect of imbuing the weapon with additional lightning damage and frostbite build-up on hit for the next 20 seconds."
 ]}
];
function weaponStudy(index){
 const w=weapons[index],stats=[w.physical,0,0,0,w.holy,100],types=['Physical','Magic','Fire','Lightning','Holy','Critical'];
 const artwork='<img class="weapon-art" src="assets/origins/armament/'+w.id+'.webp" alt="" draggable="false">';
 const copy='<div class="spec-prose"><img src="assets/origins/weapon-copy/'+w.id+'.png" width="'+w.width+'" height="'+w.height+'" alt=""><div class="visually-hidden" lang="en"><h2>'+w.title+'</h2>'+w.notes.map(t=>'<p>'+t+'</p>').join('')+'</div></div>';
 return '<button type="button" class="weapon-display" data-inspect="'+w.id+'" aria-label="'+w.title+' 확대" aria-pressed="false"><span class="weapon-artboard">'+artwork+'</span><span class="weapon-lens" aria-hidden="true"><span class="lens-glass"><span class="lens-scene weapon-artboard">'+artwork+'</span></span></span></button><div class="weapon-spec">'+corners()+copy+'<div class="arm-attack"><small>⚔ Attack</small><div>'+stats.map((v,i)=>'<span aria-label="'+types[i]+' '+v+'" title="'+types[i]+'"><img src="assets/origins/attack/'+types[i].toLowerCase()+'.png" alt=""><b>'+v+'</b></span>').join('')+'</div></div></div>';
}
function armamentPanel(){
 const buttons=weapons.map((w,i)=>'<button type="button" class="weapon-option" data-weapon="'+i+'" aria-label="'+w.name+' · '+w.title+'" aria-pressed="'+(i===0)+'"><img src="assets/origins/weapon-menu/'+w.id+'.png" alt="" draggable="false"><small>'+w.title+'</small></button>').join('');
 return '<article class="field-panel field-arm armory" aria-label="Armament"><div class="field-layout"><div class="armory-list" aria-label="무기 도감">'+buttons+'</div><div class="weapon-study" aria-live="polite">'+weaponStudy(0)+'</div></div></article>';
}
function mountWeaponInspection(rail,signal){
 const opts={signal},study=rail.querySelector('.weapon-study');
 let active=null,pinned=false;
 function hide(){
  if(active){active.classList.remove('is-inspecting');active.setAttribute('aria-pressed','false');}
  active=null;pinned=false;
 }
 function show(button,clientX,clientY){
  if(active!==button)hide();
  const box=button.getBoundingClientRect();
  const x=clientX-box.left,y=clientY-box.top;
  button.style.setProperty('--sample-x',x+'px');
  button.style.setProperty('--sample-y',y+'px');
  button.style.setProperty('--scene-w',box.width+'px');
  button.style.setProperty('--scene-h',box.height+'px');
  active=button;button.classList.add('is-inspecting');button.setAttribute('aria-pressed','true');
 }
 study.addEventListener('pointermove',e=>{
  if(e.pointerType==='touch'||e.buttons||pinned)return;
  const button=e.target.closest('.weapon-display');
  if(button&&e.target.matches('.weapon-artboard > .weapon-art'))show(button,e.clientX,e.clientY);
  else hide();
 },{signal,passive:true});
 study.addEventListener('pointerout',e=>{
  if(active&&!pinned&&!active.contains(e.relatedTarget))hide();
 },opts);
 study.addEventListener('click',e=>{
  const button=e.target.closest('.weapon-display');
  if(!button)return;
  if(pinned){hide();return;}
  const r=button.getBoundingClientRect();
  const x=e.detail?e.clientX:r.left+r.width/2,y=e.detail?e.clientY:r.top+r.height/2;
  show(button,x,y);
  // A tap or keyboard activation keeps the detail in view until the next activation.
  pinned=e.detail===0||e.pointerType==='touch'||matchMedia('(hover:none)').matches;
 },opts);
 study.addEventListener('focusout',e=>{if(active&&!active.contains(e.relatedTarget))hide();},opts);
 study.addEventListener('keydown',e=>{if(e.key==='Escape')hide();},opts);
 rail.addEventListener('click',e=>{if(e.target.closest('[data-weapon]'))hide();},opts);
 rail.addEventListener('scroll',hide,{signal,passive:true});
 window.addEventListener('resize',hide,opts);
 signal.addEventListener('abort',hide,{once:true});
}
let weaponRevision=0;
async function selectWeapon(i,button,instant=false){
 const study=main.querySelector('.weapon-study');if(!study||!button)return;
 if(button.getAttribute('aria-pressed')==='true'&&!instant)return;
 const revision=++weaponRevision;
 main.querySelectorAll('[data-weapon]').forEach(b=>b.setAttribute('aria-pressed',b===button));
 if(!instant&&!reduceMotion())await study.animate([{opacity:1},{opacity:0}],{duration:140,easing:'ease-in',fill:'forwards'}).finished.catch(()=>{});
 if(revision!==weaponRevision||!study.isConnected)return;
 study.innerHTML=weaponStudy(i);study.getAnimations().forEach(a=>a.cancel());
 if(!instant&&!reduceMotion())study.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:460,easing:'cubic-bezier(.22,1,.36,1)'});
}

function about(){
 return '<section class="field-book" aria-label="About 가로 탐색"><div class="field-rail" tabindex="0" aria-label="가로 스크롤. 방향키로 장면 이동">'+
 '<article class="field-panel field-world" aria-label="World"><div class="field-paint" style="background-image:url('+aboutGround('world')+')"></div><div class="field-layout"><div class="field-world-copy"><h1 class="world-heading-uniform"><span>A VAST WORLD FULL</span><span>OF EXCITEMENT</span><span>RISE, TARNISHED</span></h1><p class="world-strap"><span class="about-live-type">The New Fantasy Action RPG</span><img src="assets/folio/world-subtitle.svg" width="202" height="21" alt="" draggable="false"></p></div></div>'+chapterFrame('about')+'</article>'+
 openWorld()+buildPanel()+armamentPanel()+
 '<article class="field-panel field-origin" aria-label="Origin"><div class="field-layout"><div class="roster-caption"><span class="ghost-word" aria-hidden="true">Origin</span>'+chapterMark('03','Character study')+'<h2><img src="assets/origins/origin-heading.png" width="314" height="85" alt="Origin" draggable="false"></h2><p>There are 10 origins in Elden Ring that serve as the base for player characters.</p><span class="roster-help">Select a character &nbsp; ⟡</span></div><div class="roster-group"><div class="origin-cards">'+rosterCards()+'</div><div class="group-note">I &nbsp; / &nbsp; IV</div></div><button class="roster-more" data-roster aria-label="다음 직업 카드 보기"><span>View<br>more</span></button></div></article>'+
 combatFolios()+'</div><button class="about-index-toggle diamond-button" type="button" data-journey-menu aria-label="Open chapter index"><span aria-hidden="true">☰</span></button><nav class="about-wayfinder" aria-label="About scene navigation"><button type="button" data-scene-step="-1" aria-label="Previous scene">←</button><span class="scene-position">01 / 13</span><span class="scene-track" aria-hidden="true"><i></i></span><span class="scene-name">World</span><button type="button" data-scene-step="1" aria-label="Next scene">→</button></nav></section>';
}
let targetField=0, navigateField;
function fieldGo(index,instant=false){navigateField?.(index,instant);}
function mountAbout(initial){
 aboutController?.abort();
 aboutController=new AbortController();
 const signal=aboutController.signal,opts={signal};
 const rail=main.querySelector('.field-rail'),panels=[...rail.querySelectorAll(':scope > .field-panel')],panorama=rail.querySelector('.reference-panorama');
 // Any device without the local face displays the lettering taken from the supplied design.
 for(const [face,ready] of [['About Optima','optima-ready'],['About Canto','canto-ready']]){
  document.fonts.load('16px "'+face+'"').then(matches=>{
   if(matches.length&&!signal.aborted)rail.classList.add(ready);
  }).catch(()=>{});
 }
 const returnButton=panorama.querySelector('.about-return');
 const build=rail.querySelector('.build-path'),buildIndex=panels.indexOf(build);
 const wayfinder=main.querySelector('.about-wayfinder');
 wayfinder.addEventListener('click',e=>{const button=e.target.closest('[data-scene-step]');if(button)fieldGo(aboutIndex+Number(button.dataset.sceneStep));},opts);
 mountWeaponInspection(rail,signal);
 mountFantasyOpening(rail,signal);
 const last=fieldStops.length-1,origin=fieldStops.indexOf('Origin');
 // Landmarks align the first visible artwork to the five panoramic reference views.
 const landmarks=[852,983,1174,1341,1496,1610.5,1848];
 const reveal=new IntersectionObserver(entries=>{for(const item of entries)if(item.isIntersecting){item.target.classList.add('arrived');reveal.unobserve(item.target);}}, {root:rail,threshold:.04});
 panorama.querySelectorAll('.reference-piece').forEach(el=>reveal.observe(el));
 // One set of measured landmarks drives layout, navigation, parallax and pointer input.
 const canvas=panorama.querySelector('.reference-canvas');
 function stops(){
  const unit=canvas.offsetWidth/panoramaWidth;
  const end=rail.scrollWidth-rail.clientWidth;
  return [...panels.map(p=>p.offsetLeft),...landmarks.map(x=>Math.min(end,panorama.offsetLeft+(x-panoramaLeft)*unit)),end];
 }
 let chapterX=stops();
 const compact=()=>rail.clientWidth<panels[0].offsetWidth*.82;
 const boundary=()=>compact()?0:chapterX[origin];
 const nearest=x=>chapterX.reduce((best,start,i)=>Math.abs(x-start)<Math.abs(x-chapterX[best])?i:best,0);
 let raf=0,glide=0,goal=0,previous=0,gestureUsed=false,travel=0,wheelTime=0,direction=0,drag=null,blockClick=false;
 function free(on){rail.classList.toggle('flowing',on||compact());}
 function stopGlide(){scrollTweens.get(rail)?.();cancelAnimationFrame(glide);glide=0;previous=0;goal=rail.scrollLeft;}
 function tick(time){
  const difference=goal-rail.scrollLeft,dt=Math.min(42,time-(previous||time-16));previous=time;
  if(Math.abs(difference)<1.3){rail.scrollLeft=goal;glide=0;previous=0;return;}
  const next=rail.scrollLeft+difference*(1-Math.exp(-dt/200));
  rail.scrollLeft=difference>0?Math.ceil(next):Math.floor(next);
  glide=requestAnimationFrame(tick);
 }
 function glideTo(x){
  scrollTweens.get(rail)?.();
  free(true);
  goal=Math.max(boundary(),Math.min(rail.scrollWidth-rail.clientWidth,x));
  if(reduceMotion()){rail.scrollLeft=goal;return;}
  if(!glide)glide=requestAnimationFrame(tick);
 }
 let swordTransitioning=false;
 async function swordHandoff(index){
  if(swordTransitioning)return;
  swordTransitioning=true;stopGlide();rail.setAttribute('aria-busy','true');
  const armory=panels[buildIndex+1],forward=index===buildIndex+1;
  if(forward&&armory.querySelector('.weapon-display')?.dataset.inspect!=='sword'){
   selectWeapon(0,armory.querySelector('[data-weapon="0"]'),true);
  }
  const source=forward?build.querySelector('.build-sword'):armory.querySelector('.weapon-display');
  const destination=forward?armory.querySelector('.weapon-display'):build.querySelector('.build-sword');
  let transition;
  const cleanup=()=>{
   source.style.viewTransitionName='';destination.style.viewTransitionName='';
   source.classList.remove('blade-is-bridging');destination.classList.remove('blade-is-bridging');
   rail.removeAttribute('aria-busy');swordTransitioning=false;
  };
  const abort=()=>{transition?.skipTransition();cleanup();};signal.addEventListener('abort',abort,{once:true});
  try{
   const art=destination.querySelector('img');if(art&&!art.complete)await art.decode().catch(()=>{});
   if(signal.aborted)return;
   if(document.startViewTransition){
    source.classList.add('blade-is-bridging');source.style.viewTransitionName='shared-armament';
    transition=startSceneTransition(()=>{
     source.style.viewTransitionName='none';navigateField(index,true);sync();
     destination.classList.add('blade-is-bridging');destination.style.viewTransitionName='shared-armament';
    },'armament');
    await transition.finished;
   }else{
    await rail.animate([{opacity:1},{opacity:.12}],{duration:180,fill:'forwards'}).finished;
    navigateField(index,true);sync();
    await rail.animate([{opacity:.12},{opacity:1}],{duration:500,fill:'forwards'}).finished;
   }
  }catch{if(!signal.aborted){navigateField(index,true);sync();}}
  finally{signal.removeEventListener('abort',abort);cleanup();}
 }
 navigateField=(index,instant)=>{
  if(swordTransitioning&&!instant)return;
  if(!instant&&!reduceMotion()&&((index===buildIndex+1&&nearest(rail.scrollLeft)===buildIndex)||(index===buildIndex&&nearest(rail.scrollLeft)===buildIndex+1&&rail.querySelector('.weapon-display')?.dataset.inspect==='sword'))){swordHandoff(index);return;}
  stopGlide();
  targetField=Math.max(0,Math.min(last,index));
  free(targetField>origin);
  const location=chapterX[targetField];
  free(true);
  if(instant||reduceMotion())rail.scrollLeft=location;else slowScrollTo(rail,location,'left',1200,signal);
 };
 function sync(){
  raf=0;
  const x=rail.scrollLeft;
  const returnReady=true;
  returnButton.dataset.ready=String(returnReady);
  returnButton.setAttribute('aria-hidden',String(!returnReady));
  returnButton.tabIndex=returnReady?0:-1;
  const offset=(x-chapterX[buildIndex])/build.offsetWidth;
  if(Math.abs(offset)<1){
   // Keep the glints tied to travel; they settle where the reader stops.
   for(const [part,phase] of [['hilt',.37],['blade',.18],['tip',.025]]){
    const wave=(1+Math.cos(2*Math.PI*(offset+phase)))/2;
    build.style.setProperty('--light-'+part,(.10+.77*wave**3).toFixed(3));
   }
  }
  aboutIndex=nearest(x);
  wayfinder.querySelector('.scene-position').textContent=String(aboutIndex+1).padStart(2,'0')+' / '+fieldStops.length;
  wayfinder.querySelector('.scene-name').textContent=fieldStops[aboutIndex];
  wayfinder.style.setProperty('--scene-progress',((aboutIndex+1)/fieldStops.length*100)+'%');
  wayfinder.querySelector('[data-scene-step="-1"]').disabled=aboutIndex===0;
  wayfinder.querySelector('[data-scene-step="1"]').disabled=aboutIndex===last;
  panels.forEach((panel,i)=>{
   const width=panel.offsetWidth,offset=(x-chapterX[i])/width;
   const visible=Math.min(x+rail.clientWidth,chapterX[i]+width)-Math.max(x,chapterX[i]);
   panel.inert=visible<=0;
   panel.style.setProperty('--drift',Math.max(-1,Math.min(1,offset)).toFixed(3));
   panel.classList.toggle('field-in-view',visible>Math.min(width,rail.clientWidth)*.15);
  });
 }
 returnButton.addEventListener('click',()=>{
  history.replaceState(history.state,'','#about');
  fieldGo(0,true);
  sync();
  rail.focus({preventScroll:true});
 },opts);
 rail.addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(sync);},{signal,passive:true});
 rail.addEventListener('scrollend',()=>{if(!drag&&!glide)targetField=nearest(rail.scrollLeft);},opts);
 function canFlow(dir){return compact()||rail.scrollLeft>boundary()+2||(dir>0&&rail.scrollLeft>=boundary()-2);}
 rail.addEventListener('wheel',e=>{
  if(e.ctrlKey||e.metaKey)return;
  if(swordTransitioning){e.preventDefault();return;}
  const raw=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;
  if(!raw)return;
  e.preventDefault();
  const unit=e.deltaMode===1?16:e.deltaMode===2?rail.clientWidth:1;
  const dir=Math.sign(raw),now=performance.now();
  if(dir!==direction||now-wheelTime>180){gestureUsed=false;travel=0;}
  direction=dir;wheelTime=now;
  if(dir>0&&nearest(rail.scrollLeft)===buildIndex&&Math.abs(rail.scrollLeft-chapterX[buildIndex])<rail.clientWidth*.1){if(!gestureUsed){gestureUsed=true;fieldGo(buildIndex+1);}return;}
  if(canFlow(dir)){
   if(gestureUsed)return;
   glideTo((glide?goal:rail.scrollLeft)+raw*unit);return;
  }
  travel+=Math.abs(raw)*unit;
  if(!gestureUsed&&travel>=20){gestureUsed=true;fieldGo(targetField+dir);}
 },{signal,passive:false});
 rail.addEventListener('pointerdown',e=>{
  if(swordTransitioning||!e.isPrimary||e.button!==0)return;
  stopGlide();blockClick=false;
  if(e.pointerType==='mouse'&&e.target.closest('.panorama-caption'))return;
  drag={id:e.pointerId,x:e.clientX,y:e.clientY,start:rail.scrollLeft,index:aboutIndex,free:false,moved:false,delta:0,time:performance.now(),speed:0};
 },opts);
 rail.addEventListener('pointermove',e=>{
  if(!drag||drag.id!==e.pointerId)return;
  const dx=drag.x-e.clientX,dy=drag.y-e.clientY,delta=e.pointerType==='touch'&&Math.abs(dy)>Math.abs(dx)?dy:dx;
  if(!drag.moved&&Math.abs(delta)>7){
   drag.moved=true;drag.free=canFlow(Math.sign(delta));free(drag.free);
   rail.setPointerCapture(e.pointerId);rail.classList.add('is-dragging');
  }
  if(!drag.moved)return;
  e.preventDefault();
  const now=performance.now();
  drag.speed=(delta-drag.delta)/Math.max(8,now-drag.time);drag.time=now;drag.delta=delta;
  rail.scrollLeft=drag.free?Math.max(boundary(),drag.start+delta):drag.start+delta;
 },opts);
 function release(e){
  if(!drag||e.pointerId!==drag.id)return;
  const old=drag;drag=null;rail.classList.remove('is-dragging');
  if(!old.moved)return;
  blockClick=true;
  if(old.index===buildIndex&&old.delta>Math.min(75,rail.clientWidth*.15)&&!reduceMotion()){rail.scrollLeft=chapterX[buildIndex];fieldGo(buildIndex+1);return;}
  if(old.free){
   const momentum=performance.now()-old.time<120&&e.type==='pointerup'?old.speed*120:0;
   glideTo(rail.scrollLeft+Math.max(-rail.clientWidth/2,Math.min(rail.clientWidth/2,momentum)));
  }else{
   const threshold=Math.min(75,rail.clientWidth*.15);
   fieldGo(old.index+(Math.abs(old.delta)>threshold?Math.sign(old.delta):0));
  }
 }
 rail.addEventListener('pointerup',release,opts);rail.addEventListener('pointercancel',release,opts);
 rail.addEventListener('pointerleave',()=>{if(drag&&!drag.moved)drag=null;},opts);
 rail.addEventListener('click',e=>{if(blockClick){blockClick=false;e.preventDefault();e.stopImmediatePropagation();}},{signal,capture:true});
 document.addEventListener('keydown',e=>{
  if(document.querySelector('dialog[open]')||e.altKey||e.metaKey||e.ctrlKey)return;
  if(swordTransitioning){if(['ArrowRight','ArrowLeft','ArrowUp','ArrowDown','PageUp','PageDown','Home','End'].includes(e.key))e.preventDefault();return;}
  if(e.key==='Home'||e.key==='End'){e.preventDefault();fieldGo(e.key==='Home'?0:last);return;}
  const keys={ArrowRight:1,ArrowDown:1,PageDown:1,ArrowLeft:-1,ArrowUp:-1,PageUp:-1};
  if(!(e.key in keys))return;
  e.preventDefault();
  const dir=keys[e.key];
  if(dir>0&&nearest(rail.scrollLeft)===buildIndex){if(!e.repeat)fieldGo(buildIndex+1);return;}
  if(canFlow(dir))glideTo((glide?goal:rail.scrollLeft)+dir*rail.clientWidth*(e.key.startsWith('Page')?.82:.19));
  else if(!e.repeat)fieldGo(targetField+dir);
 },opts);
 window.addEventListener('resize',()=>{
  const x=rail.scrollLeft,i=Math.max(0,chapterX.findLastIndex(left=>left<=x));
  const span=(chapterX[i+1]??chapterX[i]+rail.clientWidth)-chapterX[i];
  const fraction=(x-chapterX[i])/Math.max(1,span);
  stopGlide();chapterX=stops();free(i>=origin);
  rail.scrollLeft=chapterX[i]+fraction*((chapterX[i+1]??chapterX[i]+rail.clientWidth)-chapterX[i]);
  sync();
 },opts);
 signal.addEventListener('abort',()=>{cancelAnimationFrame(raf);stopGlide();reveal.disconnect();navigateField=null;},{once:true});
 fieldGo(initial,true);sync();
}
function restartRoster(){
 rosterStart=0;aboutIndex=0;
}
function nextRoster(){
 rosterStart=(rosterStart+3>=originRecords.length)?0:rosterStart+3;
 main.querySelector('.origin-cards').innerHTML=rosterCards();
 main.querySelector('.group-note').textContent=['I','II','III','IV'][rosterStart/3]+'   /   IV';
}
const suppliedDossiers={
 warrior:{quote:'A Twinblade wielding Warrior from a nomadic tribe.',body:'The Warrior starts at level 8 with two scimitars and a light shield. High Dexterity and balanced physical attributes make the Warrior a natural dual wielder. Starting equipment is only a beginning: as the journey unfolds, each Tarnished can develop their own way to fight.',guides:[['Blood Blade','C7BpQXdgx7M','8:31'],['Blood Dragon','aDd0tPxqClQ','11:25']]},
 confessor:{quote:'A church spy adept at covert operations.',body:'The Confessor starts at level 10 with a broadsword, a kite shield and a finger seal. Faith and a balanced physical foundation support both swordplay and incantations. A starting class defines the first steps of a journey, while its eventual path belongs to the player.',guides:[['Blackflame Apostle','_5SZl3BhvPw','10:25'],['Paladin','eTbo26tFmx8','8:07']]},
 prophet:{quote:'A seer ostracized for inauspicious prophecies.',body:'The Prophet starts at level 7 with a spear, a finger seal and a small shield. High Faith and Mind make this origin well suited to incantations. Catch Flame gives the Prophet an early close-range option, but managing FP matters in the first hours of the journey.',guides:[['Blackflame Apostle','_5SZl3BhvPw','10:25'],['Lightning Lancer','B4cJ3hj9aBw','14:31']]}
};
function illustratedDossier(o,d){
 return '<div class="origin-sheet reference-sheet"><div class="diagonal reference-portrait" style="background-image:url('+assetOrigin(o.id,'detail')+')"></div><button data-record class="study-eye '+(o.id==='warrior'?'warrior-eye':'')+'" aria-label="'+o.name+' 캐릭터 영상 보기">'+eyeIcon+'</button><div class="dossier-copy"><h2 id="character-name">'+originImage(o,'title','reference-title',o.name)+'</h2><p class="character-quote">“'+d.quote+'”</p><p class="character-bio" lang="en">'+d.body+'</p><div class="record-label">Trailers</div><div class="origin-films">'+d.guides.map((g,i)=>'<button data-guide="'+i+'" aria-label="'+g[0]+' 영상 보기"><span class="record-thumb">'+originImage(o,'guide'+i)+'</span><small><span>'+g[0]+'</span><span>'+g[2]+'</span></small></button>').join('')+'</div></div>'+dossierControls()+'</div>';
}
function dossierControls(){
 return '<button class="dossier-close" data-character-close aria-label="직업 상세 닫기">×</button><button class="dossier-prev" data-character-step="-1" aria-label="이전 직업">‹</button><button class="dossier-next" data-character-step="1" aria-label="다음 직업">›</button>';
}
function playGuide(index){
 const g=suppliedDossiers[originRecords[selectedOrigin].id].guides[index];
 showYouTube(g[1],g[0],'Build guide &nbsp; / &nbsp; Fextralife');
}
function dossierMarkup(index){
 const o=originRecords[index];
 const leadScene=index===0?'warrior-detail':o.id+'-scene';
 const classFilm=o.id!=='vagabond';
 return suppliedDossiers[o.id]?illustratedDossier(o,suppliedDossiers[o.id]):'<div class="origin-sheet"><div class="survey-grid"></div><div class="diagonal '+(index===0?'source-warrior':'')+'" style="background-image:url(assets/origins/'+leadScene+'.webp)">'+(index===0?'':originImage(o,'portrait','diagonal-figure'))+'</div><div class="dossier-copy"><div class="dossier-wordmark">Elden ring</div><h2 id="character-name">'+o.name+'</h2><div class="dossier-rule"></div><p class="character-quote">“'+o.line+'”</p><p class="character-bio">'+o.desc+'</p><div class="character-gear"><span>'+o.ko+' &nbsp; / &nbsp; '+o.skill+'</span><span>'+o.kit+'</span></div><div class="record-label">Field recordings</div><div class="origin-films"><button data-record><span class="record-thumb">'+originImage(o,'scene')+'<i>'+(classFilm?'▷':'↗')+'</i></span><small>'+(classFilm?'Class film':'Class still')+'</small></button><button data-origin-trailer><span class="record-thumb">'+img('sentinel','')+'<i>▷</i></span><small>Gameplay trailer</small></button></div></div><button class="dossier-close" data-character-close aria-label="직업 상세 닫기">×</button><button class="dossier-prev" data-character-step="-1" aria-label="이전 직업">‹</button><button class="dossier-next" data-character-step="1" aria-label="다음 직업">›</button><span class="dossier-count">'+num(index)+' &nbsp; / &nbsp; 10</span></div>';
 }
function openCharacter(index,opener){
 const o=originRecords[index];
 if(!o)return;
 const already=originDialog.open;
 selectedOrigin=index;
 if(!already)originOpener=opener;
 originDialog.innerHTML=dossierMarkup(index);
 if(!already){originDialog.showModal();originDialog.querySelector('[data-character-close]').focus({preventScroll:true});}
 document.body.classList.add('modal-open');
}
function changeCharacter(step){
 openCharacter((selectedOrigin+step+originRecords.length)%originRecords.length);
 originDialog.querySelector('[data-character-step="'+step+'"]').focus({preventScroll:true});
}
function showRecording(){
 const o=originRecords[selectedOrigin];
 const media=o.id==='vagabond'?originImage(o,'scene','record-still',o.ko):'<video controls autoplay playsinline poster="'+assetOrigin(o.id,'scene')+'" src="assets/origins/'+o.id+'.webm"></video>';
 body.innerHTML='<button class="modal-x" data-close aria-label="기록 닫기">×</button><div class="film-view">'+media+'<div class="lightbox-note"><div><small>Origin &nbsp; / &nbsp; Field recording</small><h2>'+o.name+'</h2></div><a class="text-link" href="https://en.bandainamcoent.eu/elden-ring/elden-ring/characters/'+o.id+'"'+ext+'>Official class guide '+icon('arrowup')+'</a></div></div>';
 showModal('record');
}
originDialog.addEventListener('click',e=>{
 if(e.target===originDialog||e.target.closest('[data-character-close]'))return originDialog.close();
 const step=e.target.closest('[data-character-step]');if(step)return changeCharacter(Number(step.dataset.characterStep));
 const guide=e.target.closest('[data-guide]');if(guide)return playGuide(Number(guide.dataset.guide));
 if(e.target.closest('[data-record]'))showRecording();
 if(e.target.closest('[data-origin-trailer]'))showFilm('gameplay');
});
originDialog.addEventListener('keydown',e=>{
 if(viewer.open)return;
 if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();changeCharacter(e.key==='ArrowRight'?1:-1);}
});
originDialog.addEventListener('close',()=>{
 originDialog.replaceChildren();
 if(!viewer.open)document.body.classList.remove('modal-open');
 if(originOpener?.isConnected)originOpener.focus({preventScroll:true});
});
