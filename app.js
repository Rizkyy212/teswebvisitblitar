(function(){
const NUL={addEventListener(){},querySelectorAll(){return[]},closest(){return{}},classList:{toggle(){}}};
const $=id=>document.getElementById(id)||NUL;
const dir=x=>'https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(x.n+' Blitar');
const gl=n=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(n+' Blitar');
const sel=(c,s)=>D.filter(x=>x.c===c&&(!s||x.s===s));
$('pilihanGrid').innerHTML=big(by('Makam Bung Karno'))+`<div class="stack">${big(by('Istana Gebang'),1)}${big(by('Waterpark Sumber Udel'),1)}</div>`;
[['sejarahGrid','sej',card],['rekreasiGrid','rek',card],['edukasiGrid','edu',card],['kampungGrid','kam',row],['pendukungGrid','pen',row],['rayaGrid','kab',card]].forEach(a=>$(a[0]).innerHTML=sel(a[1]).map(a[2]).join(''));
$('heroPics').innerHTML=['Makam Bung Karno','Istana Gebang','Masjid Ar-Rahman'].map(n=>`<button class="hpc" data-open="${n}" aria-label="Buka ${n}">${ph(by(n),n)}</button>`).join('');
const biz=a=>a.map(([n,ad,d,tag])=>`<a class="biz" href="${gl(n)}" target="_blank" rel="noopener"><b>${n}</b><span>${ad}</span><p>${d}</p><span class="chip">${tag}</span> <span class="chip pr">Harga: cek di Google Maps</span><em>Buka di Google Maps</em></a>`).join('');
$('hotelGrid').innerHTML=biz(HOTELS);$('foodGrid').innerHTML=biz(FOODS);
$('oleh').innerHTML=OLEH.map(([a,b,c])=>`<div class="row" style="cursor:default"><b>${a}</b><span>${b}</span><span class="chip">${c}</span></div>`).join('');
$('allTable').innerHTML=D.map(x=>{const f=INFO[x.n]||{};return `<tr><td><button class="lnk" data-open="${x.n}">${x.n}</button><br><small>${reg(x)}</small></td><td>${f.j||'-'}</td><td>${f.t||'-'}</td><td><a href="${gm(x)}" target="_blank" rel="noopener">Maps</a> <a href="${dir(x)}" target="_blank" rel="noopener">Rute</a></td></tr>`}).join('');

$('mapDots').innerHTML=D.filter(x=>pos[x.n]).map(x=>{const [px,py]=pos[x.n];const col=x.r==='B'?'#e0912b':x.s==='P'?'#6aa6c9':'var(--green)';return `<g data-open="${x.n}" style="cursor:pointer" tabindex="0" role="button" aria-label="${x.n}"><circle cx="${px}" cy="${py}" r="7" fill="${col}" stroke="var(--surface)" stroke-width="2"/>${x.r==='B'?`<text x="${px}" y="${py-12}" text-anchor="middle" font-size="11" fill="var(--ink)">${x.n}</text>`:''}</g>`}).join('');
$('mapList').innerHTML=D.map(x=>`<li><button class="lnk" data-open="${x.n}">${x.n}</button> <small>${(INFO[x.n]||{}).tc||''}</small> <a href="${gm(x)}" target="_blank" rel="noopener">Maps</a></li>`).join('');
let cur=null;
function nav(d){const i=D.findIndex(y=>y.n===cur);open(D[(i+d+D.length)%D.length].n)}
function open(n){const x=by(n);if(!x)return;cur=n;const f=INFO[n]||{};
 const near=(x.near||D.filter(y=>y!==x&&y.r===x.r&&(y.c===x.c||y.s==='U')).slice(0,5).map(y=>y.n)).filter(p=>!x.pts.includes(p));
 const ul=a=>'<ul>'+a.map(v=>`<li>${v}</li>`).join('')+'</ul>';
 $('dlg').innerHTML=`<div class="pop"><div class="pl">${ph(x)}<button class="x" data-close aria-label="Tutup">&times;</button><div class="nv"><button data-nav="-1" aria-label="Sebelumnya">&#8249;</button><button data-nav="1" aria-label="Berikutnya">&#8250;</button></div></div>
 <div class="pr">${badge(x)}<h2>${x.n}</h2><p class="lead">${x.d}</p>${f.lg?`<p>${f.lg}</p>`:''}
 <div class="facts"><div class="fact"><small>Jam buka</small><b>${f.j||'Hubungi pengelola'}</b></div><div class="fact"><small>Tiket / harga</small><b>${f.t||'Hubungi pengelola'}</b></div><div class="fact"><small>Alamat</small><b>${f.a||reg(x)}</b></div><div class="fact"><small>Parkir</small><b>${f.pk||'Konfirmasi di lokasi'}</b></div><div class="fact"><small>Lama kunjungan</small><b>${f.du||'-'}</b></div><div class="fact"><small>Waktu terbaik</small><b>${f.wt||'-'}</b></div></div>
 ${f.ak?'<h4>Yang bisa dilakukan</h4>'+ul(f.ak):''}${x.pts.length?'<h4>Ada di kawasan ini</h4>'+ul(x.pts):''}${f.fs&&f.fs.length?'<h4>Fasilitas</h4>'+ul(f.fs):''}${f.tp?'<h4>Tips berkunjung</h4>'+ul(f.tp):''}
 <h4>Kunjungi juga</h4><div class="near">${near.map(p=>by(p)?`<button data-open="${p}">${p}</button>`:`<button class="pt" disabled>${p}</button>`).join('')}</div>
 <div class="act"><a class="btn" href="${gm(x)}" target="_blank" rel="noopener">Buka di Google Maps</a><a class="btn ghost" href="${dir(x)}" target="_blank" rel="noopener">Rute ke sini</a>${x.r==='K'?'<a class="btn ghost" href="menginap.html">Hotel dan makan</a>':''}</div>
 <p class="note">Sumber: ${f.sb||'-'}. Jam dan harga bisa berubah, konfirmasi ke pengelola. Tanda * berarti perkiraan umum yang belum terverifikasi.</p></div></div>`;
 if(!$('dlg').open)$('dlg').showModal()}
window.open=open;
document.addEventListener('click',e=>{const t=e.target,g=s=>t.closest&&t.closest(s);
 const o=g('[data-open]');if(o){e.preventDefault();open(o.dataset.open);return}
 if(g('[data-nav]')){nav(+g('[data-nav]').dataset.nav);return}
 if(g('[data-close]')){const d=g('dialog');if(d)d.close();return}
 if(t.tagName==='DIALOG')t.close()});
document.addEventListener('keydown',e=>{if(!$('dlg').open)return;if(e.key==='ArrowRight')nav(1);if(e.key==='ArrowLeft')nav(-1)});
const PAGE=document.body.dataset.page;let fq='',ff='all';
function filt(){const q=fq.toLowerCase().trim();let tot=0;
 ['pilihanGrid','sejarahGrid','rekreasiGrid','edukasiGrid','kampungGrid','pendukungGrid','rayaGrid'].forEach(id=>{const gr=$(id);let any=false;
  gr.querySelectorAll('[data-open]').forEach(el=>{const x=by(el.dataset.open),ok=(ff==='all'||x.c===ff)&&(!q||(x.n+' '+x.d).toLowerCase().includes(q));(el.closest('.cw')||el).hidden=!ok;if(ok){any=true;tot++}});
  const s=gr.closest('section');if(s)s.hidden=!any});
 $('empty').hidden=tot>0}
const qi=$('q'),ch=$('chips'),P=new URLSearchParams(location.search);
if(PAGE==='index'){const fm=qi.closest&&qi.closest('form');if(fm&&fm.addEventListener)fm.addEventListener('submit',e=>{e.preventDefault();location.href='destinasi.html?q='+encodeURIComponent(qi.value)});
 ch.addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(b)location.href='destinasi.html?f='+b.dataset.f})}
else if(PAGE==='destinasi'){qi.addEventListener('input',e=>{fq=e.target.value;filt()});
 qi.closest('form').addEventListener('submit',e=>e.preventDefault());
 ch.addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(!b)return;ff=b.dataset.f;document.querySelectorAll('#chips button').forEach(c=>c.classList.toggle('on',c===b));filt()});
 if(P.get('q')){qi.value=P.get('q');fq=qi.value}
 if(P.get('f')){ff=P.get('f');document.querySelectorAll('#chips button').forEach(c=>c.classList.toggle('on',c.dataset.f===ff))}
 filt()}
document.querySelectorAll('.nav nav a').forEach(a=>{if(a.getAttribute('href')===(PAGE==='index'?'index.html':PAGE+'.html'))a.classList.add('on')});
})();
