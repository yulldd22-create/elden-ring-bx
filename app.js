'use strict';

const main = document.querySelector('main');
const viewer = document.querySelector('#viewer');
const body = document.querySelector('#dialog-body');
const icon = (name, className = '') => '<svg aria-hidden="true" class="' + className + '"><use href="#' + name + '"/></svg>';
const art = name => 'assets/' + (name === 'dragon' ? 'dragon-4k' : name) + '.webp';
const img = (name, alt, attrs = '') => '<img src="' + art(name) + '" alt="' + alt + '" ' + attrs + '>';
const corners = () => ['tl','tr','br','bl'].map(side => icon('corner', 'corner ' + side)).join('');
const framePieces=['corner-tl','corner-tr','corner-bl','corner-br','top-left','top-right','bottom-left','bottom-right','left','right-upper','right-lower'];
const frame = () => '<div aria-hidden="true" class="frame supplied-frame">' + framePieces.map(piece=>'<img class="gilt-'+piece+'" src="assets/realm/frame-'+piece+'.png" alt="" draggable="false">').join('') + '</div>';
const label = (text) => '<div class="kicker"><span></span>' + text + '</div>';
const chapters = [
 {id:'prologue',name:'Prologue',roman:'I',line:'The Shattering',ko:'엘든 링이 부서진 밤, 틈새의 땅의 역사가 바뀌었다.',image:'godwyn',x:28,y:31},
 {id:'about',name:'About',roman:'II',line:'The Lands Between',ko:'황금 나무 아래 펼쳐진 세계와, 그곳을 걷는 빛바랜 자들.',image:'erdtree',x:19,y:64},
 {id:'gallery',name:'Gallery',roman:'III',line:'Fragments of Grace',ko:'틈새의 땅에서 마주친 장면들을 한 장씩 들여다보세요.',image:'malenia',x:72,y:40},
 {id:'product',name:'Product',roman:'IV',line:'Begin the Journey',ko:'여정의 첫 장을 열 에디션을 살펴보세요.',image:'edition',x:53,y:73}
];
const plates = [
 {art:'erdtree',title:'The Erdtree',ko:'황금 나무 아래',category:'Landscapes'},
 {art:'malenia',title:'Malenia',ko:'붉은 머리의 검사',category:'Figures'},
 {art:'sentinel',title:'The Tree Sentinel',ko:'황금빛의 파수꾼',category:'Figures'},
 {art:'torrent',title:'Into the Mist',ko:'영마와 함께',category:'Landscapes'},
 {art:'torch',title:'A Flame in the Dark',ko:'어둠을 밝히는 등불',category:'Figures'},
 {art:'dragon',title:'Agheel Lake',ko:'용이 내려앉은 호수',category:'Landscapes'},
 {art:'rootfield',title:'Tangled Roots',ko:'뒤엉킨 뿌리',category:'Landscapes'},
 {art:'dungeon',title:'Beneath the Surface',ko:'지하의 불빛',category:'Landscapes'},
 {art:'knight-study',title:'Knight',ko:'투구를 쓴 기사',category:'Figures'},
 {art:'gallery/deck/card-01',title:'The Black Blade',ko:'검은 검의 전사',category:'Figures'},
 {art:'gallery/deck/card-02',title:'The Golden Path',ko:'황금빛으로 물든 길',category:'Landscapes'},
 {art:'gallery/deck/card-03',title:'The Burning Sky',ko:'붉은 노을과 요새',category:'Landscapes'},
 {art:'gallery/deck/card-04',title:'The Golden Seal',ko:'금빛 천구의',category:'Figures'},
 {art:'gallery/deck/card-05',title:'Moonlit Stone',ko:'거대한 얼굴 앞에 선 전사',category:'Landscapes'},
 {art:'gallery/deck/card-06',title:'Night Hunter',ko:'별빛 아래의 기사',category:'Figures'},
 {art:'folio/bloom',title:'Scarlet Aeonia',ko:'붉은 꽃',category:'Figures'},
 {art:'gallery/deck/card-07',title:'Fractured Gold',ko:'금빛 균열이 비치는 인물',category:'Figures'},
 {art:'gallery/deck/card-08',title:'A Burst of Flame',ko:'불꽃을 두른 인물',category:'Figures'},
 ...scatteredPrints.map((f,i)=>({art:'gallery/scattered/scard-'+String(i+1).padStart(2,'0'),title:f.title,ko:f.ko,category:i===0?'Landscapes':'Figures'}))
];
function chapterCompass(current){
 const links=[['home','Home'],...chapters.map(c=>[c.id,c.name])];
 return '<nav class="chapter-compass" aria-label="챕터 바로가기">'+links.map(([id,name])=>'<a href="#'+id+'" '+(id===current?'aria-current="page"':'')+'><span>'+name+'</span><i></i></a>').join('')+'</nav>';
}
function chapterFrame(id){
 const chapter=chapters.find(c=>c.id===id);
 return '<div class="chapter-frame-ui">'+frame()+
 '<a class="frame-logo" href="#home" aria-label="ELDEN RING 홈">'+img('wordmark','Elden Ring')+'</a>'+
 '<div class="frame-tools"><button class="diamond-button" data-journey-menu aria-label="챕터 메뉴 열기"><span>☰</span></button><button class="diamond-button" data-journey-sound aria-label="사운드 켜기"><span>'+speakerGlyph+'</span></button></div>'+
 '<span class="frame-chapter">'+chapter.roman+'. '+chapter.name+'</span>'+chapterCompass(id)+
 '<a class="frame-return" href="#atlas" aria-label="챕터 지도로 돌아가기"><span>Back</span><svg viewBox="0 0 26 26" fill="none" aria-hidden="true"><g stroke="currentColor" stroke-linecap="round"><path d="m3 2 19 20m1-20L4 22"/><path d="m19 20 3-3m-2 2 4 5M4 17l3 3m-1-1-4 5" opacity=".75"/></g></svg></a></div>';
}
const editions = [
 {name:'SHADOW OF THE ERDTREE EDITION',ko:'섀도우 오브 디 에르드트리 에디션',price:'9,020',image:'assets/product/erdtree-edition.jpg',items:['「ELDEN RING」 게임 본편','DLC 「SHADOW OF THE ERDTREE」 코드 전단지']},
 {name:"COLLECTOR’S EDITION",ko:'컬렉터즈 에디션',price:'39,160',image:'assets/product/collectors-edition.jpg',items:['DLC 「SHADOW OF THE ERDTREE」 코드 전단지','메스메르 스태츄 (전고 약 46cm)','「SHADOW OF THE ERDTREE」 아트북 (하드커버 / 40P)','「SHADOW OF THE ERDTREE」 디지털 사운드트랙 (앱)']}
];
const official = 'https://en.bandainamcoent.eu/elden-ring/elden-ring';
const ext = ' target="_blank" rel="noopener noreferrer"';
let railObserver,lightboxChoices=[];
let route = '', activeFilter = 'All', plateIndex = 0, viewerType = '';
const num = i => String(i + 1).padStart(2,'0');
const inlineLink = (href, text) => '<a class="text-link" href="'+href+'">'+text+icon('arrow')+'</a>';
const particles = () => '<div class="embers" aria-hidden="true">'+Array.from({length:24},(_,i)=>'<i style="--x:'+((i*37+5)%100)+'%;--y:'+((i*13+14)%90)+'%;--dur:'+(8+i%5)+'s;--delay:-'+(i%9+1)+'s;--size:'+(1+i%3)+'px"></i>').join('')+'</div>';

function footer(next) {
 return '<footer>'+
 '<div class="footer-main"><a href="#home" class="footer-logo">'+img('wordmark','ELDEN RING')+'</a><p>Unofficial fan-made BX concept.<br>Game imagery and trademarks belong to their respective owners.</p><a href="#atlas" class="atlas-link">Chapter atlas '+icon('arrow')+'</a></div></footer>';
}
function chapterTop(id, title, sub, bg) {
 const c=chapters.find(i=>i.id===id);
 return '<section class="chapter-top '+id+'-top"><div class="chapter-top-art" style="background-image:url('+(id==='product'?'assets/product-hero-hd.jpg':art(bg))+')"></div><div class="chapter-top-content">'+label('Chapter '+c.roman+' &nbsp; / &nbsp; '+c.name)+'<h1>'+title+'</h1><p class="kr">'+sub+'</p></div>'+chapterFrame(id)+'</section>';
}
function plateCards() {
 return plates.map((p,i)=>activeFilter==='All'||p.category===activeFilter?'<button class="plate" data-plate="'+i+'"><div class="plate-photo">'+img(p.art,p.ko,'loading="lazy" draggable="false"')+'<span class="enlarge">↗</span></div><div class="plate-info"><small>Plate '+num(i)+'</small><b>'+p.title+'</b></div></button>':'').join('');
}
function editionDetail(i) {
 const e=editions[i];
 const purchase=i?'':'<a class="package-purchase" href="'+official+'"'+ext+'>구입은 이쪽 <span aria-hidden="true">↗</span></a><details class="package-upgrade"><summary>차세대 가정용 게임기로의 업그레이드 대응에 대해서 <span aria-hidden="true">＋</span></summary><p>업그레이드 지원 범위와 이용 방법은 <a href="'+official+'"'+ext+'>공식 제품 안내 ↗</a>에서 확인해 주세요.</p></details><p class="package-fineprint">※ 패키지판은 PlayStation®5판, PlayStation®4판만 판매됩니다.<br>※ DLC 「SHADOW OF THE ERDTREE」를 시작하려면 「ELDEN RING」 본편을 진행해야 합니다.</p>';
 return '<article class="package-edition" aria-labelledby="package-title-'+i+'"><button class="package-art" data-edition-info="'+i+'" aria-label="'+e.ko+' 구성 이미지 확대"><img src="'+e.image+'" width="1034" height="582" alt="'+e.ko+' 패키지 구성" loading="lazy"><span class="package-zoom" aria-hidden="true">＋</span></button><div class="package-copy"><h2 id="package-title-'+i+'">'+e.name+(i?' <span>(DLC 코드판)</span>':'')+'</h2><p class="package-price">희망 소매 가격: '+e.price+'엔 <span>(부가세 포함)</span></p><h3>【동봉 내용】</h3><ul>'+e.items.map(t=>'<li>'+t+'</li>').join('')+'</ul>'+purchase+'</div></article>';
}
function product() {
 return chapterTop('product','Begin the <i>Journey.</i>','틈새의 땅으로 향하는 첫걸음.','sentinel')+
 '<section class="package-guide" aria-label="에디션 안내">'+editions.map((e,i)=>editionDetail(i)).join('')+'</section>'+footer('prologue');
}

const filmData = {
 story:{id:'D8YkCHkWRyk',name:'Story trailer'}, gameplay:{id:'MUV5dqaumHE',name:'Gameplay trailer'}
};
function showModal(type) {
 viewerType=type;maskAmbience('viewer',['film','record'].includes(type));
 if(!viewer.open) viewer.showModal();
 document.body.classList.add('modal-open');
}
function showPlate(index,choices) {
 if(choices)lightboxChoices=choices;
 plateIndex=index; const plate=plates[index];
 const original=plate.art==='dragon'?'<a class="text-link" href="https://media.fromsoftware.jp/eldenring/resources/images/movieandimages/screenshot/4k/21.jpg"'+ext+'>FromSoftware · 4K 원본 '+icon('arrowup')+'</a>':'';
 body.innerHTML='<button class="modal-x" data-close aria-label="닫기">×</button><div class="lightbox">'+img(plate.art,plate.ko)+'<div class="lightbox-note"><div><small>Plate '+num(index)+' &nbsp; / &nbsp; Visual archive</small><h2>'+plate.title+'</h2><p>'+plate.ko+'</p>'+original+'</div><div class="viewer-controls"><button class="circle-btn prev" data-shift="-1" aria-label="이전 이미지">'+icon('arrow')+'</button><button class="circle-btn" data-shift="1" aria-label="다음 이미지">'+icon('arrow')+'</button></div></div></div>';
 showModal('plate');
}
function shiftPlate(shift) {
 const choices=lightboxChoices;
 if(!choices.length)return;
 showPlate(choices[(choices.indexOf(plateIndex)+shift+choices.length)%choices.length]);
 body.querySelector('[data-shift="'+shift+'"]')?.focus({preventScroll:true});
}
function showFilm(key) {
 const f=filmData[key];
 body.innerHTML='<button class="modal-x" data-close aria-label="닫기">×</button><div class="film-view"><video controls playsinline autoplay src="assets/films/'+key+'.webm#t='+(key==='story'?18:8)+'"></video><div class="lightbox-note"><div><small>Bandai Namco</small><h2>'+f.name+'</h2></div><a class="text-link" href="https://www.youtube.com/watch?v='+f.id+'"'+ext+'>YouTube ↗</a></div></div>';
 showModal('film');
}
function showYouTube(id,name,credit){
 body.innerHTML='<button class="modal-x" data-close aria-label="닫기">×</button><div class="film-view"><iframe src="https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="'+name+'"></iframe><div class="lightbox-note"><div><small>'+credit+'</small><h2>'+name+'</h2></div><a class="text-link" href="https://www.youtube.com/watch?v='+id+'"'+ext+'>YouTube에서 보기 '+icon('arrowup')+'</a></div></div>';
 showModal('film');
}
viewer.addEventListener('click',e=>{if(e.target===viewer||e.target.closest('[data-close]'))viewer.close(); const b=e.target.closest('[data-shift]');if(b)shiftPlate(Number(b.dataset.shift));});
viewer.addEventListener('close',()=>{maskAmbience('viewer',false);body.replaceChildren();viewerType='';if(!originDialog.open)document.body.classList.remove('modal-open');});
document.addEventListener('keydown',e=>{if(viewer.open&&viewerType==='plate'&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();shiftPlate(e.key==='ArrowLeft'?-1:1);}if(e.key==='Escape'&&!viewer.open)setMenu(false);});

function attachRail() {
 const rail=main.querySelector('.plate-rail');
 if(!rail)return;
 let start=null,origin=0,dragged=false;
 rail.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;start=e.clientX;origin=rail.scrollLeft;dragged=false;});
 rail.addEventListener('pointermove',e=>{if(start===null)return;const delta=e.clientX-start;
  if(Math.abs(delta)>5&&!dragged){dragged=true;rail.setPointerCapture(e.pointerId);rail.classList.add('dragging');}
  if(dragged)rail.scrollLeft=origin-delta;
 });
 const stop=()=>{start=null;rail.classList.remove('dragging');};
 rail.addEventListener('pointerup',stop);rail.addEventListener('pointercancel',stop);
 rail.addEventListener('pointerleave',()=>{if(!dragged)start=null;});
 rail.addEventListener('click',e=>{if(dragged){e.preventDefault();e.stopPropagation();dragged=false;}},true);
 const sync=()=>{const prev=main.querySelector('[data-rail="-1"]'),next=main.querySelector('[data-rail="1"]');if(prev&&next){prev.disabled=rail.scrollLeft<=3;next.disabled=rail.scrollLeft+rail.clientWidth>=rail.scrollWidth-3;}};
 rail.addEventListener('scroll',sync,{passive:true});railObserver=new ResizeObserver(sync);railObserver.observe(rail);requestAnimationFrame(sync);
}
renderSound();
main.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 const d=b.dataset;
 if('weapon' in d)selectWeapon(Number(d.weapon),b);
 if('character' in d)openCharacter(Number(d.character),b);
 if('roster' in d)nextRoster();
 if('journey' in d)journeyGo(Number(d.journey));
 if('journeyMenu' in d)setMenu(true);
 if('journeySound' in d)toggleSiteSound();
 if('editionInfo' in d)showEdition(Number(d.editionInfo));
 if('lore' in d)showLore(Number(d.lore));
 if('filter' in d){activeFilter=d.filter;main.querySelectorAll('[data-filter]').forEach(o=>o.setAttribute('aria-pressed',o===b));const rail=main.querySelector('.plate-rail');rail.innerHTML=plateCards();rail.scrollLeft=0;rail.dispatchEvent(new Event('scroll'));}
 if('plate' in d){
  const group=b.closest('.plate-constellation');
  const choices=group?[...group.children].map(card=>Number(card.dataset.plate)):plates.flatMap((p,i)=>activeFilter==='All'||p.category===activeFilter?[i]:[]);
  showPlate(Number(d.plate),choices);
 }
 if('film' in d)showFilm(d.film);
 if('rail' in d){const rail=main.querySelector('.plate-rail'),size=rail.querySelector('.plate').getBoundingClientRect().width+22;rail.scrollBy({left:Number(d.rail)*size,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
});
const routes={intro:mainJourney,vision:mainJourney,home:mainJourney,atlas:mainJourney,prologue,about,gallery,product};
function renderPage() {
 const [page,rawField]=location.hash.slice(1).split('/');
 const field=rawField==='open-world'?'open world':rawField;
 let key=page||'intro';
 if(key==='main'){main.focus();return;}
 if(!Object.hasOwn(routes,key))key='home';
 setMenu(false,true);
 const focusMain=!!route;
 endMotion();chronicleController?.abort();aboutController?.abort();journeyController?.abort();galleryController?.abort();
 railObserver?.disconnect();
 route=key;
 if(originDialog.open)originDialog.close();
 if(key==='about')restartRoster();
 if(viewer.open)viewer.close();
 if(route==='gallery')activeFilter='All';
 main.innerHTML=routes[key]();
 document.body.dataset.route=key;
 const title=key==='intro'?'The Call of Grace':key==='vision'?'Be Guided by Grace':key==='home'?'The Lands Between':key==='atlas'?'Chapter Atlas':chapters.find(c=>c.id===key).name;
 document.title='ELDEN RING — '+title;
 if(focusMain)main.focus({preventScroll:true});
 window.scrollTo(0,0);
 if(routes[key]===mainJourney)mountJourney(['intro','vision','home','atlas'].indexOf(key));
 if(key==='gallery'){
  mountGallery();
  if(field==='movie')window.scrollTo({top:window.scrollY+main.querySelector('.archive-cinema').getBoundingClientRect().top,behavior:'instant'});
 }
 if(key==='prologue')mountPrologue();
 if(key==='about')mountAbout(Math.max(0,fieldStops.findIndex(n=>n.toLowerCase()===(field==='grace'?'tarnished':field))));
 mountMotion();renderSound();
}
document.querySelector('.skip').addEventListener('click',e=>{e.preventDefault();main.focus();});
function render(){
 const next=location.hash.slice(1).split('/')[0]||'intro';
 if(!route||next==='main'||next===route||reduceMotion()){cancelChapterLoading();renderPage();return;}
 loadChapter(next).catch(()=>{cancelChapterLoading();renderPage();});
}
window.addEventListener('hashchange',render);
render();
