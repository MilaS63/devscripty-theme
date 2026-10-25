const CONTACT = 'https://staging.devscripty.org/contact/';
const U = 'https://staging.devscripty.org/wp-content/uploads/2026/10/';
// Auto-screenshot for sites without a prepared image (replace with your own .webp when ready)
const shot = url => 'https://s.wordpress.com/mshots/v1/' + encodeURIComponent(url) + '?w=800&h=500';

/* ---------- DATA ----------
   cat   : wp | shopify | landing | ghl  (filter pills)
   badge : white label on the photo
   chip  : beige label above the title
   s     : short text on the card
   foot  : [FontAwesome icon, text] shown bottom-left of the card
   d / res / stack : shown in the case-study window                         */
const CATS = { wp: 'WordPress', shopify: 'Shopify', landing: 'Landing Pages', ghl: 'GoHighLevel' };

const PROJECTS = [
  { n: 'Uselite Wine', cat: 'wp', badge: 'WooCommerce', chip: 'WordPress / WooCommerce', img: U + 'Muscat.webp', u: 'https://uselitewine.com/',
    sub: 'Legacy System Migration to WooCommerce',
    s: 'Rebuilt from a slow legacy system into a stable WordPress & WooCommerce store, with wholesale access control.',
    foot: ['fa-chart-line', '2,707 orders migrated'],
    d: 'The old website was slow, unstable and losing orders. Customers could not complete checkout, and the client depended on a legacy system that kept breaking. I built a new WordPress & WooCommerce website from scratch, migrated 2,707 orders and 885 users without losing a single record, and optimized every step of the buying process.',
    res: ['Stable, high-performance website', 'Seamless checkout', 'Wholesale access control: pricing visible only to logged-in buyers', 'No more legacy system problems'],
    stack: ['WordPress', 'WooCommerce', 'Breakdance', 'PHP'] },

  { n: 'Soda Detour', cat: 'wp', badge: 'Breakdance 2.2', chip: 'WordPress / Breakdance', img: U + 'sodatour.webp', u: 'https://sodadetour.com/?currency=CVE',
    sub: 'Modern & Visually Engaging Layout',
    s: 'Responsive WordPress site on Breakdance 2.2 with a modern layout and intuitive navigation.',
    foot: ['fa-mobile-screen', 'Fully Responsive'],
    d: 'Designed a responsive WordPress site using Breakdance 2.2, focusing on a modern and visually engaging layout. While the content was provided by the client, I carefully crafted the design to ensure intuitive navigation, clear CTAs and a seamless user experience across all devices. The site was optimized for performance and usability.',
    res: ['Modern layout', 'Intuitive navigation', 'Clear CTAs'], stack: ['WordPress', 'Breakdance 2.2'] },

  { n: 'CVC Society', cat: 'wp', badge: 'Breakdance + SEO', chip: 'WordPress / Breakdance', img: U + 'ChildrenCamp.webp', u: 'https://www.cvcsociety.com/',
    sub: 'Niche-Specific SEO & Redesign',
    s: 'Redesigned with Breakdance and a niche-specific SEO content strategy to boost search visibility.',
    foot: ['fa-magnifying-glass-chart', 'SEO Optimized'],
    d: 'I redesigned the site using Breakdance Builder and developed a niche-specific SEO content strategy to boost search visibility. By optimizing on-page structure and content relevance, I improved user experience and professional branding.',
    res: ['Boosted search visibility', 'Improved UX', 'Professional branding'], stack: ['WordPress', 'Breakdance', 'SEO'] },

  { n: 'Takoda Equine', cat: 'wp', badge: 'Elementor', chip: 'WordPress / Elementor', img: U + 'takodahorse.webp', u: 'https://www.takodaequine.com/',
    sub: 'Elementor Development & Admin Optimization',
    s: 'Elementor build with an optimized WordPress admin, so content is easy to manage.',
    foot: ['fa-gears', 'Admin Optimized'],
    d: 'Website built on Elementor. A key part of the project was optimizing the WordPress admin dashboard, so the client can manage content without a cluttered backend.',
    res: ['Clean admin panel', 'Easy content management'], stack: ['WordPress', 'Elementor'] },

  { n: 'Mitch Carson', cat: 'wp', badge: 'Technical SEO', chip: 'WordPress / SEO', img: U + 'CoachWeb.webp', u: 'https://www.mitchcarson.com/',
    sub: 'Global Coaching & Media Infrastructure',
    s: 'Core digital infrastructure for a global coaching and media platform, with technical SEO for 134 posts.',
    foot: ['fa-magnifying-glass', '134 posts structured'],
    d: 'Engineered and optimized the core digital infrastructure for a high-authority global coaching and media platform. I wrote and structured content for pages and 134 posts, set up comprehensive technical SEO, resolved broken links, refined UI elements and tuned CSS to maximize search visibility and load speed.',
    res: ['134 posts structured', 'Technical SEO setup', 'CSS tuning'], stack: ['WordPress', 'Technical SEO', 'CSS'] },

  { n: 'Mofficer', cat: 'shopify', badge: 'Shopify', chip: 'Shopify / Custom code', img: U + 'ShopifyWeb.webp', u: 'https://mofficer.com.br/',
    sub: 'Shopify E-commerce Refinement',
    s: 'Shopify store aligned with the Figma design, with optimized product pages, menus and checkout.',
    foot: ['fa-code', 'Custom Code'],
    d: 'Refined the Shopify e-commerce site to align with the Figma design, optimizing product pages, menus and checkout for a smoother experience. I also added custom code to enhance performance and responsiveness across devices, so customers enjoy a faster, more seamless shopping journey.',
    res: ['Figma alignment', 'Custom code added', 'Faster shopping journey'], stack: ['Shopify', 'Custom Code', 'Figma'] },

  { n: 'Montemadeira Hotel', cat: 'wp', badge: 'Breakdance', chip: 'WordPress / Breakdance', img: U + 'HotelWeb.webp', u: 'https://montemadeiralhotel.com.cv/',
    sub: 'From-Scratch Hospitality Site',
    s: 'Built entirely from scratch on WordPress and Breakdance for a premium hospitality experience.',
    foot: ['fa-hotel', 'Built From Scratch'],
    d: 'Built entirely from scratch using WordPress and Breakdance for a premium hospitality experience.',
    res: ['Built from scratch', 'Premium design'], stack: ['WordPress', 'Breakdance'] },

  { n: 'Tartan Kilts Direct', cat: 'wp', badge: 'UX Builder + SEO', chip: 'WordPress / UX Builder', img: U + 'Kilts.webp', u: 'https://tartankiltsdirect.co.uk/',
    sub: 'UX Builder & SEO Strategy',
    s: 'Created on UX Builder with a comprehensive focus on SEO and site structure.',
    foot: ['fa-magnifying-glass', 'SEO Strategy'],
    d: 'Created on UX Builder. I handled the comprehensive SEO setup, optimizing the site structure and content to improve search engine rankings.',
    res: ['Comprehensive SEO', 'Site structure'], stack: ['WordPress', 'UX Builder', 'SEO'] },

  { n: 'Everest Hockey Group', cat: 'wp', badge: 'Elementor + WooCommerce', chip: 'WordPress / Elementor Pro', img: U + 'Hockey_EA_2021_06.webp', u: 'https://everesthockeygroup.com/',
    sub: 'Custom WooCommerce Forms',
    s: 'Corrected complex WooCommerce forms for gear purchases, team registrations and competition entries.',
    foot: ['fa-pen-to-square', 'Custom Forms'],
    d: 'Created using Elementor Pro and WooCommerce. I corrected complex forms for purchasing hockey gear, registering children for teams and registering entire teams for competitions.',
    res: ['Custom form logic', 'Team registration', 'Gear purchasing'], stack: ['WordPress', 'Elementor Pro', 'WooCommerce'] },

  { n: 'AJ Towing', cat: 'wp', badge: 'Breakdance', chip: 'WordPress / Breakdance', img: U + 'TowingWeb.webp', u: 'https://ajtowinginc.com/',
    sub: 'Local Service Site Content & Media',
    s: 'Created new pages, populated content, and optimized and converted images for a fast local service site.',
    foot: ['fa-image', 'Media Optimization'],
    d: 'Created new pages for the local towing service, populated them with content, and optimized and converted images to improve loading speed and visual appeal.',
    res: ['New pages created', 'Image optimization'], stack: ['WordPress', 'Breakdance'] },

  { n: 'West Galil', cat: 'wp', badge: 'Figma to WP', chip: 'WordPress / Elementor', img: U + 'WestGalWeb.webp', u: 'https://www.westgalil.org.il/',
    sub: 'Figma to WordPress with Custom Fields',
    s: 'Built pixel for pixel from Figma, with custom fields for seamless event and post management.',
    foot: ['fa-crop-simple', 'Figma to WP'],
    d: 'Built pixel-perfect from a Figma design. I constructed custom fields to make it easy for the client to manage and fill in events and other posts.',
    res: ['Pixel-perfect build', 'Custom event fields'], stack: ['WordPress', 'Elementor', 'Figma'] },

  { n: 'Gentled Hearts Stable', cat: 'wp', badge: 'Custom Design', chip: 'WordPress', img: U + 'Boy-feeds-horse.webp', u: 'https://gentledheartsstable.com/',
    sub: 'Custom Design & Full Build',
    s: 'Design created in-house and the whole site developed from scratch for a unique, tailored look.',
    foot: ['fa-pen-nib', 'Custom Design'],
    d: 'The website design was created by me, and the entire site was planned and developed from scratch, ensuring a unique and tailored look for the stable.',
    res: ['Unique design', 'Built from scratch'], stack: ['WordPress', 'Custom Design'] },

  { n: 'DM Wright Solutions', cat: 'ghl', badge: 'GoHighLevel', chip: 'GoHighLevel Website', img: U + 'dmwrightWeb.webp', u: 'https://dmwrightsolutions.com/',
    sub: 'GoHighLevel Website',
    s: 'Business website built on the GoHighLevel platform.',
    foot: ['fa-diagram-project', 'GoHighLevel Build'],
    d: 'A business website built on the GoHighLevel platform.',
    stack: ['GoHighLevel'] },

  { n: 'Verve Health Product Launch', cat: 'landing', badge: 'Landing Page', chip: 'Landing Page Development', img: U + 'IMG_6816-scaled-1.webp', u: 'https://red-chicken-656297.hostingersite.com/',
    sub: 'Ultrafast Sales & Campaign Landing Page',
    s: 'Standalone landing page for a high-ad-spend campaign, with sticky urgency callouts and fast mobile rendering.',
    foot: ['fa-bolt', 'Ultrafast Landing Page'],
    d: 'A standalone landing page crafted specifically for a high-ad-spend digital marketing campaign. Designed with sticky urgency callouts and fast mobile rendering.',
    res: ['99 Mobile PageSpeed Score', 'High Ad CTR Conversion', 'Zero Layout Shifts'],
    stack: ['HTML5', 'Tailwind CSS', 'JavaScript'] }
];

/* ---------- HELPERS ---------- */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- FILTER PILLS + GRID ---------- */
$('filters').innerHTML =
  '<button class="on" data-f="all">All</button>' +
  Object.keys(CATS).map(k => `<button data-f="${k}">${CATS[k]}</button>`).join('');

function renderGrid(f) {
  const list = PROJECTS.filter(p => f === 'all' || p.cat === f);
  if (!list.length) {
    $('grid').innerHTML = `<div class="dsw-empty"><p>New ${CATS[f]} case studies are coming soon.</p><a href="${CONTACT}">Start your project</a></div>`;
    return;
  }
  $('grid').innerHTML = list.map(p => `
    <article class="dsw-card">
      <div class="dsw-media">
        <img src="${p.img}" alt="${esc(p.n)} website" loading="lazy">
        <span class="dsw-badge">${esc(p.badge)}</span>
        <div class="dsw-ov">
          <button type="button" data-open="${PROJECTS.indexOf(p)}">Case Study</button>
          <a href="${p.u}" target="_blank" rel="noopener noreferrer">Visit Site</a>
        </div>
      </div>
      <div class="dsw-body">
        <span class="dsw-chip">${esc(p.chip)}</span>
        <h3>${esc(p.n)}</h3>
        <p>${esc(p.s)}</p>
        <div class="dsw-foot">
          <span class="dsw-metric"><i class="fa-solid ${p.foot[0]}"></i>${esc(p.foot[1])}</span>
          <button type="button" data-open="${PROJECTS.indexOf(p)}">Details <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    </article>`).join('');
}

$('filters').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  document.querySelectorAll('#filters button').forEach(x => x.classList.toggle('on', x === b));
  renderGrid(b.dataset.f);
});

/* ---------- CASE STUDY MODAL ---------- */
let lastFocus = null;

function openModal(i) {
  const p = PROJECTS[i];
  lastFocus = document.activeElement;
  $('m-body').innerHTML = `
    <span class="dsw-chip">${esc(p.chip)}</span>
    <h3 id="m-title">${esc(p.n)}</h3>
    <p class="dsw-sub">${esc(p.sub)}</p>
    <img class="dsw-mimg" src="${p.img}" alt="${esc(p.n)} website">
    <h5>Project Details</h5>
    <p class="ov">${esc(p.d)}</p>
    ${(p.res || p.stack) ? `<div class="dsw-two">
      ${p.res ? `<div class="dsw-box"><h5>Key Results</h5><ul>${p.res.map(r => `<li><i class="fa-solid fa-check"></i>${esc(r)}</li>`).join('')}</ul></div>` : ''}
      ${p.stack ? `<div class="dsw-box"><h5>Tech Stack Used</h5><div class="dsw-stack">${p.stack.map(t => `<span>${esc(t)}</span>`).join('')}</div></div>` : ''}
    </div>` : ''}
    <div class="dsw-actions">
      <a class="o" href="${p.u}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-globe"></i> Visit Live Site</a>
      <a class="p" href="${CONTACT}?${new URLSearchParams({ service: p.chip, reference: p.n })}">Inquire About Similar Build</a>
    </div>`;
  $('modal').classList.add('open');
  $('modal').setAttribute('aria-hidden', 'false');
  document.body.classList.add('dsw-lock');
  $('m-close').focus();
}

function closeModal() {
  $('modal').classList.remove('open');
  $('modal').setAttribute('aria-hidden', 'true');
  document.body.classList.remove('dsw-lock');
  if (lastFocus) lastFocus.focus();
}

$('grid').addEventListener('click', e => {
  const b = e.target.closest('[data-open]');
  if (b) openModal(+b.dataset.open);
});
$('m-close').addEventListener('click', closeModal);
$('modal').addEventListener('click', e => { if (e.target === $('modal')) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ---------- INIT ---------- */
renderGrid('all');