import {ACC,ROLES,CHAPTERS,WORDS,GHOSTS,CRED,PROJECTS} from './content.js';
import { inject } from '@vercel/analytics';

// Initialize Vercel Analytics
inject();

document.documentElement.style.setProperty('--ac',ACC);
const onScroll=f=>{let t=0;addEventListener('scroll',()=>{if(!t){t=1;requestAnimationFrame(()=>{t=0;f()})}},{passive:true})};
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* ---- helpers ---- */
const $=id=>document.getElementById(id),R=(a,b)=>a+Math.random()*(b-a);
let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
(function c(){cx+=(mx-cx)*.25;cy+=(my-cy)*.25;$('cur').style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(c)})();
const io=(el,fn)=>new IntersectionObserver((e,o)=>e.forEach(x=>{if(x.isIntersecting){fn(x.target);o.unobserve(x.target)}}),{threshold:.3}).observe(el);
function type(el,t,ms,cb){let i=0;(function s(){el.textContent=t.slice(0,i++);if(i<=t.length)setTimeout(s,ms);else cb&&cb()})()}
/* ---- hero typewriter + halftone ---- */
$('pt').querySelector('img').onerror=e=>e.target.remove();
addEventListener('mousemove',e=>{if(!calm)$('pt').style.transform=`translate(${(e.clientX/innerWidth-.5)*-14}px,${(e.clientY/innerHeight-.5)*-8}px)`});
onScroll(()=>{$('pb').style.transform=`scaleX(${scrollY/(document.documentElement.scrollHeight-innerHeight)||0})`});
(function(){const cv=$('hc'),x=cv.getContext('2d'),S=innerWidth<700?16:12;let w,h,t=0,px=-999,py=-999;
const rs=()=>{const d=Math.min(devicePixelRatio||1,2);w=cv.clientWidth;h=cv.clientHeight;cv.width=w*d;cv.height=h*d;x.setTransform(d,0,0,d,0,0)};rs();addEventListener('resize',rs);
addEventListener('mousemove',e=>{px=e.clientX;py=e.clientY});
(function L(){if(calm||scrollY>innerHeight*3.4||document.hidden){requestAnimationFrame(L);return}x.clearRect(0,0,w,h);t+=.012;
for(let y=S/2;y<h;y+=S)for(let a=S/2;a<w;a+=S){let v=(Math.sin(a*.011+t)+Math.sin(y*.015-t*.8)+Math.sin((a+y)*.008+t*.5)+Math.sin(Math.hypot(a-w/2,y-h/2)*.01-t))/8+.5;
const d=Math.hypot(a-px,y-py);if(d<150)v=Math.min(1,v+(1-d/150)*.4);
x.fillStyle='rgba('+ACC+','+(.25+v*.75)+')';
if(v<.35){const q=1+S*.3*v/.35;x.fillRect(a-q,y-.5,q*2,1);x.fillRect(a-.5,y-q,1,q*2)}
else if(v<.7){x.beginPath();x.arc(a,y,(v-.3)*S*.9,0,6.283);x.fill()}
else{const s=S*(.55+.4*v);x.fillRect(a-s/2,y-s/2,s,s)}}
requestAnimationFrame(L)})()})();
/* ---- intro card: scroll-grow + scramble (only "Hi!") ---- */
(function(){const sec=$('intro'),card=$('ci'),hi=$('hi'),CH='!<>-_\\/[]{}=+*^?#',F='Hi!';let busy=0;
function scr(){if(busy)return;busy=1;let n=0;const t=setInterval(()=>{hi.textContent=[...F].map((c,i)=>i<n/4?c:CH[Math.random()*CH.length|0]).join('');if(++n>F.length*4+2){clearInterval(t);hi.textContent=F;busy=0}},45)}
const grow=()=>{const r=sec.getBoundingClientRect(),p=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight))),e=p*p*(3-2*p),w=Math.min(640,innerWidth*.9),h0=w*.5625;
card.style.width=w+(innerWidth-w)*e+'px';card.style.height=h0+(innerHeight-h0)*e+'px';card.style.borderRadius=16*(1-e)+'px'};
onScroll(grow);addEventListener('resize',grow);grow();
io(card,scr);card.addEventListener('mouseenter',scr);setInterval(()=>{const r=card.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)scr()},5000)})();
/* ---- tick field ---- */
(function(){const cv=$('tc'),x=cv.getContext('2d'),G=90;let w,h,a=[];
const rs=()=>{w=cv.width=cv.clientWidth;h=cv.height=cv.clientHeight;a=new Array(Math.ceil(w/G)*Math.ceil(h/G)).fill(.8)};rs();addEventListener('resize',rs);
(function L(){const r=cv.getBoundingClientRect(),px=mx-r.left,py=my-r.top;if(calm||r.bottom<0||r.top>innerHeight){requestAnimationFrame(L);return}x.clearRect(0,0,w,h);x.strokeStyle='rgba('+ACC+',.6)';x.lineWidth=2;let i=0;
for(let y=G/2;y<h;y+=G)for(let c=G/2;c<w;c+=G,i++){const tg=Math.atan2(py-y,px-c),d=((tg-a[i]+Math.PI*3)%(Math.PI*2))-Math.PI;a[i]+=d*.1;
x.save();x.translate(c,y);x.rotate(a[i]);x.beginPath();x.moveTo(-12,0);x.lineTo(12,0);x.stroke();x.restore()}
requestAnimationFrame(L)})()})();
io($('abt'),el=>el.classList.add('in'));
/* ---- storybook ---- */
let pi=-1;
function book(flip){const old=flip&&!$('bk').hidden?$('pr').innerHTML:null;
$('pl').innerHTML='<h4>INDEX</h4>'+CHAPTERS.map((c,i)=>`<button class="idx ${i==pi?'on':''}" data-i="${i}">${String(i+1).padStart(2,'0')}. ${c[0]}<small>p. 0${i+1}</small></button>`).join('');
const r=$('pr');r.className='pg r';
const x='<button class="x" aria-label="Close book">×</button>';
if(pi<0)r.innerHTML=x+'<h4 style="margin-top:34px">Start reading</h4><p style="text-align:center;margin-top:30px">Pick a chapter from the index, or click this page to turn it.</p>';
else if(pi>=CHAPTERS.length)r.innerHTML=x+'<div class="end">The End<button id="again">↻ Read Again</button></div>';
else r.innerHTML=x+`<h4 style="margin-top:34px">${CHAPTERS[pi][0]}</h4><p>${CHAPTERS[pi][1]}</p>`;
if(old!==null){const l=document.createElement('div');l.className='leaf';l.innerHTML='<div class="pg r lf">'+old+'</div><div class="pg l lb"></div>';$('bk').appendChild(l);l.onanimationend=()=>l.remove()}
}
$('pl').onclick=e=>{const b=e.target.closest('.idx');if(b){pi=+b.dataset.i;book(1)}};
$('pr').onclick=e=>{if(e.target.closest('.x')){pi=-1;book();$('bk').hidden=true;$('cv').hidden=false;return}if(e.target.id=='again')pi=-1;else if(pi<CHAPTERS.length)pi++;book(1)};
$('cv').onclick=()=>{const v=$('cv');v.classList.add('opening');setTimeout(()=>{v.hidden=true;v.classList.remove('opening');$('bk').hidden=false;book()},450)};
book();
/* ---- floating words + scroll line ---- */
WORDS.forEach(([t,c])=>{const s=document.createElement('span');s.className='w';s.textContent=t;s.style.cssText=`left:${R(4,86)}%;top:${R(4,90)}%;color:${c};animation-duration:${R(4,9)}s;animation-delay:${R(0,4)}s`;$('float').appendChild(s)});
const sl=$('sl'),wave=()=>{const r=$('float').getBoundingClientRect(),p=Math.min(1,Math.max(0,(1-r.top/innerHeight)*1.5-.2));sl.style.opacity=p;sl.style.letterSpacing=(1-p)*.5+'em'};
onScroll(wave);wave();
/* ---- projects cards ---- */
PROJECTS.forEach((p,i)=>{const d=document.createElement('div');d.innerHTML=`<div class="lab">Project ${i+1}</div><div class="pc"><div class="shot" style="--g:${p.g}"><b>COMING SOON</b>${p.t.toLowerCase().replace(/ /g,'_')}</div><h3>${p.t}</h3><div class="sub">${p.s}</div><ul>${p.b.map(x=>`<li>${x}</li>`).join('')}</ul><div class="tags">${p.tg.map(x=>`<span>${x}</span>`).join('')}</div><a class="ext" href="${p.u}" target="_blank" rel="noopener" aria-label="Open ${p.t}">↗</a></div>`;$('grid').appendChild(d)});
/* ---- ghost cursors: slow, gentle drift ---- */
(function(){const p=$('projects'),gs=GHOSTS.map(([n,c],i)=>{const g=document.createElement('div');g.className='gh';
g.innerHTML=`<svg width="14" height="16" viewBox="0 0 18 20"><path d="M1 1l14 8-6 2-3 7z" fill="${c}"/></svg><i style="background:${c};box-shadow:0 0 14px ${c}">${n}</i>`;p.appendChild(g);
const A=[[.03,.1],[.82,.18],[.02,.42],[.84,.55],[.03,.72],[.8,.8]][i%6],x=p.clientWidth*A[0],y=p.clientHeight*A[1];return{g,x,y,ax:x,ay:y,tx:x,ty:y,v:R(10,18)}});
let last=performance.now();
(function L(now){const pr=p.getBoundingClientRect();if(calm||pr.bottom<0||pr.top>innerHeight){last=now;requestAnimationFrame(L);return}const dt=Math.min(.05,(now-last)/1000);last=now;gs.forEach(s=>{const dx=s.tx-s.x,dy=s.ty-s.y,d=Math.hypot(dx,dy);
if(d<4){s.tx=s.ax+R(-40,40);s.ty=s.ay+R(-40,40)}
else{s.x+=dx/d*s.v*dt;s.y+=dy/d*s.v*dt}
s.g.style.transform=`translate(${s.x}px,${s.y}px)`});requestAnimationFrame(L)})(last)})();
/* ---- accordion + form ---- */
CRED.forEach(([t,d])=>{const r=document.createElement('div');r.className='row';r.innerHTML=`<button aria-expanded="false"><span>+&nbsp;&nbsp;${t}</span><span>⌄</span></button><div>${d}</div>`;
r.firstChild.onclick=()=>{const on=r.classList.contains('on');document.querySelectorAll('.row').forEach(k=>{k.classList.remove('on');k.firstChild.setAttribute('aria-expanded','false')});if(!on){r.classList.add('on');r.firstChild.setAttribute('aria-expanded','true')}};$('ac').appendChild(r)});
$('mf').onsubmit=e=>{e.preventDefault();const v=$('em').value.trim();
if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){$('msg').textContent='Enter a valid email address.';return}
location.href='mailto:abhijaijaiss@gmail.com?subject=Hello%20Abhijai&body=From:%20'+encodeURIComponent(v);$('msg').textContent='Opening your mail app. Thanks for connecting!'};

/* ---- thread: drawn by scroll, continues straight out of the scribble ---- */
(function(){const st=$('story'),tp=$('tp'),u=()=>{const r=st.getBoundingClientRect();tp.style.strokeDashoffset=1-Math.min(1,Math.max(0,(innerHeight*.35-r.top)/(r.height*.45)))};onScroll(u);u()})();
/* ---- Projects heading: typed in with a caret ---- */
(function(){const el=$('ph'),T='Projects',L='abcdefghijklmnopqrstuvwxyz';el.textContent='\u00a0';
io(el,()=>{let i=0;const t=setInterval(()=>{i++;el.textContent=T.slice(0,i)+(i<T.length?L[Math.random()*26|0]:'')+'_';if(i>=T.length){clearInterval(t);setTimeout(()=>el.textContent=T,800)}},90)})})();
