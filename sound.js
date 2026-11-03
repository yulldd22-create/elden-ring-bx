'use strict';
const speakerGlyph='<svg class="speaker-glyph" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M4 12h5l8-7v22l-8-7H4z" fill="currentColor"/><path d="M5 14h3v4H5zm12-7v18" stroke="#705b2f" stroke-width=".9"/><g class="audible-waves" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M20.5 11q5 5 0 10M24 7q8 9 0 18"/></g><g class="muted-mark" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="m20.5 13 6 8m0-8-6 8"/></g></svg>';
let siteSoundOn=true,changingSound=false,bgmFade=0;
const playingMedia=new Set();
const ambience=new Audio('assets/elden-ring-bgm.mp3');
ambience.id='realm-ambience';ambience.hidden=true;ambience.loop=true;ambience.preload='metadata';ambience.volume=0;document.body.append(ambience);
const bgmVolume=.12;
function renderSound(){
 const text=siteSoundOn?'Sound on':'Sound off';
 document.querySelectorAll('.sound,[data-journey-sound]').forEach(button=>{
  button.setAttribute('aria-pressed',String(siteSoundOn));
  button.setAttribute('aria-label',siteSoundOn?'사운드 끄기':'사운드 켜기');
  button.title=siteSoundOn?'사운드 끄기':'사운드 켜기';
  const caption=button.querySelector('.sound-label');if(caption)caption.textContent=text;
 });
}
function fadeBgm(target,duration=350){
 cancelAnimationFrame(bgmFade);
 const from=ambience.volume,started=performance.now();
 function step(now){
  const p=Math.min(1,(now-started)/duration),ease=p*p*(3-2*p);
  ambience.volume=Math.max(0,Math.min(1,from+(target-from)*ease));
  if(p<1)bgmFade=requestAnimationFrame(step);
  else{bgmFade=0;if(target===0)ambience.pause();}
 }
 bgmFade=requestAnimationFrame(step);
}
function audioFailed(error){if(error?.name==='NotAllowedError'){renderSound();return;}siteSoundOn=false;renderSound();document.querySelectorAll('.sound,[data-journey-sound]').forEach(b=>b.title='음악을 재생하려면 다시 눌러 주세요.');}
function syncBgm(){
 if(document.hidden){cancelAnimationFrame(bgmFade);ambience.volume=0;ambience.pause();return;}
 if(siteSoundOn&&!playingMedia.size){ambience.play().then(()=>{if(siteSoundOn&&!document.hidden&&!playingMedia.size)fadeBgm(bgmVolume,450);}).catch(audioFailed);}
 else fadeBgm(0,220);
}
function maskAmbience(owner,active){if(active)playingMedia.add(owner);else playingMedia.delete(owner);syncBgm();}
async function toggleSiteSound(){
 if(changingSound)return;
 if(siteSoundOn){siteSoundOn=false;syncBgm();renderSound();window.dispatchEvent(new CustomEvent('site-audio-change',{detail:false}));return;}
 changingSound=true;siteSoundOn=true;renderSound();
 try{
  if(!document.hidden&&!playingMedia.size){await ambience.play();if(siteSoundOn)fadeBgm(bgmVolume,500);}
  window.dispatchEvent(new CustomEvent('site-audio-change',{detail:siteSoundOn}));
 }catch(error){audioFailed(error);}
 finally{changingSound=false;}
}
ambience.addEventListener('error',audioFailed);
document.addEventListener('visibilitychange',syncBgm);

// Try on entry; retry inside the first permitted user gesture if autoplay is blocked.
function unlockBgm(event){
 if(event.target instanceof Element&&event.target.closest('.sound,[data-journey-sound]'))return;
 if(siteSoundOn&&ambience.paused&&!playingMedia.size&&!document.hidden)syncBgm();
}
document.addEventListener('pointerdown',unlockBgm,{capture:true,passive:true});
document.addEventListener('keydown',unlockBgm,{capture:true});
syncBgm();
