'use strict';
const launchTrailerId='5GEhrq2dH0k';
const launchTrailerUrl='https://www.youtube.com/watch?v='+launchTrailerId;
function mountIntroTrailer(deck,signal){
 const entry=deck.querySelector('.intro-preview'),vision=deck.querySelector('.vision-footage'),button=deck.querySelector('.intro-film-toggle');
 const films={entry,vision},sources={entry:'assets/films/first-light.webm',vision:'assets/films/guidance.webm'};
 let current='',wanted=!reduceMotion();
 function status(){
  const film=films[current],playing=!!film&&!film.paused;
  button.textContent=playing?'Pause film':'Play film';
  button.setAttribute('aria-pressed',String(playing));
  button.setAttribute('aria-label',playing?'인트로 영상 일시 정지':'인트로 영상 재생');
  maskAmbience('intro',playing&&!film.muted);
 }
 function apply(){
  Object.entries(films).forEach(([name,film])=>{
   film.defaultMuted=true;film.muted=true;
   if(name!==current||!wanted){film.pause();return;}
   if(!film.hasAttribute('src'))film.src=sources[name];
   film.play().catch(status);
  });
  status();
 }
 button.addEventListener('click',()=>{wanted=films[current]?.paused!==false;apply();},{signal});
 for(const film of Object.values(films)){
  film.addEventListener('playing',()=>{if(film===entry)deck.classList.add('preview-playing');status();},{signal});
  film.addEventListener('pause',status,{signal});
 }
 signal.addEventListener('abort',()=>{for(const film of Object.values(films)){film.pause();film.removeAttribute('src');film.load();}maskAmbience('intro',false);},{once:true});
 status();
 return next=>{if(next!==current){current=next;apply();}};
}
