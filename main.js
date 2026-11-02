/* Exclusive Sole - main.js - Part 3 */
const CONTACT_EMAIL = "REPLACE-WITH-YOUR-REAL-EMAIL@example.com";

// Current nav
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-nav a').forEach(a=>{
  if(a.getAttribute('href')===path) a.setAttribute('aria-current','page');
});

// Lightbox modal
(function(){
  const lightbox = document.createElement('div');
  lightbox.className='lightbox';
  lightbox.innerHTML='<button class="lightbox-close" aria-label="Close image">&times;</button><img alt="">';
  document.body.appendChild(lightbox);
  const imgEl = lightbox.querySelector('img');
  const close = ()=>{lightbox.classList.remove('open'); document.body.style.overflow='';};
  lightbox.addEventListener('click', e=>{ if(e.target===lightbox) close(); });
  lightbox.querySelector('.lightbox-close').addEventListener('click', close);
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') close(); });
  document.querySelectorAll('.lightbox-image').forEach(im=>{
    im.addEventListener('click', ()=>{
      imgEl.src=im.src; imgEl.alt=im.alt||'Enlarged image';
      lightbox.classList.add('open'); document.body.style.overflow='hidden';
    });
  });
})();

// Product data + search & sorting
const PRODUCTS = [
  {name:"Air Jordan 1 High", price:1599, img:"images/Air_Jordan1_High.jpeg"},
  {name:"Yeezy Boost 350 V2", price:1450, img:"images/Yeezy_Boost_350_V2.jpeg"},
  {name:"【entity-Nike¦canonical_name=Nike】 Dunk Low", price:1500, img:"images/Nike_Dunk_Low.jpeg"},
  {name:"Air Jordan 4 Retro", price:1899, img:"images/WhatsApp Image 2026-09-17 at 16.07.25.jpeg"},
  {name:"【entity-Nike¦canonical_name=Nike】 Air Max 90", price:1399, img:"images/WhatsApp Image 2026-09-17 at 16.13.26.jpeg"},
  {name:"【entity-Adidas¦canonical_name=Adidas】 Forum Low", price:1299, img:"images/WhatsApp Image 2026-09-17 at 16.31.49.jpeg"}
];

function renderProducts(list){
  const grid = document.getElementById('product-grid') || document.querySelector('.product-grid');
  if(!grid) return;
  if(document.getElementById('product-grid')===null && location.pathname.includes('index.html')) return;
  grid.innerHTML='';
  list.forEach(p=>{
    const art=document.createElement('article');
    art.className='product-card';
    art.innerHTML=`<img class="lightbox-image" src="${p.img}" alt="${p.name}"><div class="card-content"><h3>${p.name}</h3><p class="price">R ${p.price}</p><a class="text-link" href="inquiry.html?shoe=${encodeURIComponent(p.name)}">Enquire →</a></div>`;
    grid.appendChild(art);
  });
  const countEl=document.getElementById('product-count');
  if(countEl) countEl.textContent = list.length===PRODUCTS.length ? `All products (${list.length})` : `${list.length} results found`;
  const noEl=document.getElementById('no-products');
  if(noEl) noEl.hidden = list.length!==0;
}

const searchInput=document.getElementById('product-search');
const sortSelect=document.getElementById('product-sort');
function applyFilters(){
  if(!searchInput && !sortSelect) return;
  let filtered=[...PRODUCTS];
  const q=(searchInput?.value||'').toLowerCase().trim();
  if(q) filtered=filtered.filter(p=>p.name.toLowerCase().includes(q));
  const sort=sortSelect?.value||'default';
  if(sort==='name-asc') filtered.sort((a,b)=>a.name.localeCompare(b.name));
  if(sort==='price-asc') filtered.sort((a,b)=>a.price-b.price);
  if(sort==='price-desc') filtered.sort((a,b)=>b.price-a.price);
  renderProducts(filtered);
}
if(searchInput) searchInput.addEventListener('input', applyFilters);
if(sortSelect) sortSelect.addEventListener('change', applyFilters);
if(document.getElementById('product-grid') || document.getElementById('product-search')){
  renderProducts(PRODUCTS);
}

// Enquiry validation
(function(){
  const form=document.getElementById('enquiry-form');
  if(!form) return;
  const params=new URLSearchParams(location.search);
  const shoe=params.get('shoe');
  if(shoe){ document.getElementById('shoe').value=shoe; }
  form.addEventListener('submit', e=>{
    e.preventDefault();
    let valid=true;
    const fullname=document.getElementById('fullname');
    const email=document.getElementById('email');
    const whatsapp=document.getElementById('whatsapp');
    const reqType=document.getElementById('request-type');
    const shoeI=document.getElementById('shoe');
    const size=document.getElementById('size');
    form.querySelectorAll('.field-error').forEach(el=>el.textContent='');
    if(!fullname.value.trim() || fullname.value.trim().length<2){ valid=false; fullname.parentElement.querySelector('.field-error').textContent='Enter at least 2 chars'; }
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)){ valid=false; email.parentElement.querySelector('.field-error').textContent='Invalid email'; }
    if(!/^[0-9+()\s-]{7,20}$/.test(whatsapp.value)){ valid=false; whatsapp.parentElement.querySelector('.field-error').textContent='Enter valid phone'; }
    if(!reqType.value){ valid=false; reqType.parentElement.querySelector('.field-error').textContent='Choose type'; }
    if(!shoeI.value.trim()){ valid=false; shoeI.parentElement.querySelector('.field-error').textContent='Enter model'; }
    if(!size.value){ valid=false; size.parentElement.querySelector('.field-error').textContent='Select size'; }
    const result=document.getElementById('enquiry-result');
    if(!valid){ result.hidden=false; result.textContent='Please fix highlighted fields'; return; }
    result.hidden=false;
    result.innerHTML=`<h3>Enquiry received</h3><p>Thanks ${fullname.value}! Request for ${shoeI.value} (${size.value}) - ${reqType.value} received.</p>`;
    form.reset();
  });
})();

// Contact -> mailto
(function(){
  const form=document.getElementById('contact-form');
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const name=document.getElementById('contact-name').value;
    const email=document.getElementById('contact-email').value;
    const type=document.getElementById('message-type').value;
    const msg=document.getElementById('contact-message').value;
    if(CONTACT_EMAIL.includes('REPLACE')){ document.getElementById('contact-result').hidden=false; document.getElementById('contact-result').textContent='Setup required: replace email in js/main.js'; return; }
    const subject=encodeURIComponent(`[${type}] Message from ${name}`);
    const body=encodeURIComponent(`Name:${name}\nEmail:${email}\nType:${type}\n\n${msg}`);
    location.href=`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  });
})();

// Leaflet map
window.addEventListener('load', ()=>{
  const mapEl=document.getElementById('store-map');
  if(!mapEl || typeof L==='undefined') return;
  const map=L.map('store-map').setView([-26.1076,28.0567],15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap'}).addTo(map);
  L.marker([-26.1076,28.0567]).addTo(map).bindPopup('Sandton City Precinct area').openPopup();
});