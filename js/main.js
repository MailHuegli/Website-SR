/* ============================================================
   Sunset Riders — interactions + i18n
   ------------------------------------------------------------
   Static UI text: German is the source of truth in index.html,
   English lives in the EN dictionary below.
   Editable content (news, rides, gallery, section images) comes
   from js/content.js (SITE_CONTENT) — pflegbar über das Programm
   "Website-Verwaltung".
   ============================================================ */

/* ---------- English dictionary (keys = data-i18n in HTML) ---------- */
const EN = {
  "meta.title": "Sunset Riders — Motorcycle Club Zurich",
  "nav.about": "About", "nav.activities": "Rides", "nav.news": "News",
  "nav.gallery": "Gallery", "nav.rules": "Rules", "nav.team": "Team",
  "nav.contact": "Contact", "nav.join": "Become a member",
  "hero.eyebrow": "Motorcycle Club Zurich · since 2023",
  "hero.name": "Sunset Riders",
  "hero.tagline": "Chasing the horizon.",
  "hero.lead": "Mindful, safe and full of joy — on twisty passes, easy weeknight rides and multi-day tours across Europe.",
  "hero.cta1": "Our rides", "hero.cta2": "Become a member",
  "about.eyebrow": "About us",
  "about.title": "One passion, one club.",
  "about.p1": "Sunset Riders was founded in Zurich in 2023 — a shared riding course turned into a firm friendship, and that friendship into a club. We're united by the joy of riding, respect for the machine and the belief that the best moments on two wheels are shared ones.",
  "about.p2": "Whether a quick evening ride or a multi-day alpine pass tour — we ride mindfully, safely and with a smile under the helmet.",
  "about.stat1": "founded", "about.stat2": "home base", "about.stat3": "regular ride formats",
  "activities.eyebrow": "Rides",
  "activities.title": "Out on the road with Sunset Riders",
  "activities.lead": "Details, meeting points and sign-up all run through our WhatsApp channel — as a member you're always the first to know.",
  "news.eyebrow": "News", "news.title": "From the club",
  "news.lead": "The latest updates, recaps and announcements.",
  "gallery.eyebrow": "Gallery", "gallery.title": "Moments on two wheels",
  "rules.eyebrow": "Safety first", "rules.title": "Our riding rules",
  "rules.lead": "13 rules that keep every ride safe, relaxed and clear for everyone. Tap a rule for details.",
  "rules.expandAll": "Expand all", "rules.collapseAll": "Collapse all",
  "rules.r1t": "Personal responsibility", "rules.r1d": "Members ride at their own risk. The club accepts no liability for the conduct of individuals.",
  "rules.r2t": "Licence category", "rules.r2d": "Everyone rides strictly according to their own valid driving licence category.",
  "rules.r3t": "Ready to ride", "rules.r3d": "Keep your motorcycle and gear ready to ride. Please refuel before arriving at the meeting point.",
  "rules.r4t": "Punctuality", "rules.r4d": "Be on time at the meeting point. If you can't make it, let the guide know as early as possible.",
  "rules.r5t": "Follow the guide", "rules.r5d": "Instructions and recommendations from the guide are to be followed.",
  "rules.r6t": "Staggered formation", "rules.r6d": "Staggered formation with at least a 2-second safety gap: even positions ride in the right, odd positions in the left half of the lane.",
  "rules.r7t": "No overtaking", "rules.r7d": "Members riding ahead within the group are not overtaken.",
  "rules.r8t": "Signal your turns", "rules.r8d": "Signal turns early and make sure the rider behind you recognises the direction.",
  "rules.r9t": "Stop signals", "rules.r9d": "Headlight flash or horn signal an upcoming stop — for example to refuel or in an emergency.",
  "rules.r10t": "Stopping", "rules.r10d": "If the rider ahead stops, the whole column stops.",
  "rules.r11t": "Togetherness", "rules.r11d": "Friendliness and exchange with the guide and fellow riders matter to us.",
  "rules.r12t": "Insurance", "rules.r12d": "Every participant is responsible for adequate personal insurance.",
  "rules.r13t": "Traffic laws", "rules.r13d": "All applicable traffic laws must be observed at all times.",
  "rules.consentTitle": "Photo and video consent",
  "rules.consentText": "By taking part in club activities, participants consent to the capture and use of photos and videos for the website, print material and social media for promotional, informational or archival purposes. Consent is given voluntarily, applies indefinitely and can be revoked in writing at any time. Personal data is processed in accordance with applicable Swiss data protection law.",
  "rules.docsNote": "Full statutes (2024 & 2025) and the general assembly minutes are available to members on request or via the WhatsApp channel.",
  "team.eyebrow": "Board", "team.title": "Our team",
  "contact.eyebrow": "Contact", "contact.title": "Become part of the club.",
  "contact.text": "Drop us a line about who you are and what you ride — we'll get back to you personally and invite you to our WhatsApp channel, where all rides are coordinated.",
  "form.firstname": "First name", "form.lastname": "Last name",
  "form.email": "Email", "form.whatsapp": "WhatsApp number",
  "form.bike": "Motorcycle model", "form.bikePh": "e.g. BMW R1250 RT",
  "form.message": "Message", "form.messagePh": "Tell us a bit about yourself …",
  "form.submit": "Send message",
  "form.sent": "Thanks! Your message has been prepared — please send it from your email app.",
  "footer.tagline": "Sunset Riders — founded 2023 in Zurich."
};

const FORM_SENT_DE = "Danke! Deine Nachricht wurde vorbereitet — bitte sende sie über dein E-Mail-Programm ab.";
const DEFAULT_LANG = "en";   // Startsprache der Website

/* ---------- content (from js/content.js) ---------- */
const SC = (typeof SITE_CONTENT !== "undefined")
  ? SITE_CONTENT
  : { images:{}, activities:[], news:[], gallery:[] };

let currentLang = DEFAULT_LANG;
const deCache = {};      // key -> original German innerHTML
const dePhCache = {};    // key -> original German placeholder

/* ---------- helpers ---------- */
function escapeHtml(s){
  return String(s == null ? "" : s).replace(/[&<>"']/g, c =>
    ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
}
// pick the field for the current language, with sensible fallbacks
function loc(field){
  if (field == null) return "";
  if (typeof field === "string") return field;
  return field[currentLang] || field.de || field.en || "";
}

/* ---------- i18n (static UI text) ---------- */
function cacheGerman(){
  document.querySelectorAll("[data-i18n]").forEach(el => {
    deCache[el.getAttribute("data-i18n")] = el.innerHTML;
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    dePhCache[el.getAttribute("data-i18n-ph")] = el.getAttribute("placeholder") || "";
  });
}

function applyLang(lang){
  currentLang = lang;
  const en = lang === "en";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = en ? EN[key] : deCache[key];
    if (val != null) el.innerHTML = val;
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    const val = en ? EN[key] : dePhCache[key];
    if (val != null) el.setAttribute("placeholder", val);
  });

  document.documentElement.lang = lang;
  document.title = en ? EN["meta.title"] : deCache["meta.title"];

  updateExpandLabel();

  document.querySelectorAll(".lang-toggle button").forEach(btn => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });

  // language-dependent content
  renderNews();
  renderActivities();
  renderTeam();
}

function initLang(){
  cacheGerman();
  // Die Website startet immer in der Standardsprache (Englisch). Eine evtl.
  // aus einer früheren Version gemerkte Sprache wird entfernt, damit beim
  // Öffnen zuverlässig Englisch erscheint. Umschalten bleibt jederzeit möglich.
  try { localStorage.removeItem("sr-lang"); } catch(e){}
  document.querySelectorAll(".lang-toggle button").forEach(btn => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
  });
  applyLang(DEFAULT_LANG);
}

/* ---------- content rendering ---------- */
function renderNews(){
  const feed = document.getElementById("news-feed");
  if (!feed) return;
  const items = [...(SC.news || [])].sort((a,b) => new Date(b.date) - new Date(a.date));
  const locale = currentLang === "en" ? "en-GB" : "de-CH";
  const fmt = new Intl.DateTimeFormat(locale, { day:"2-digit", month:"long", year:"numeric" });
  if (!items.length){
    feed.innerHTML = `<p class="news-empty">${currentLang === "en" ? "News coming soon." : "Bald gibt es hier Neuigkeiten."}</p>`;
    return;
  }
  feed.innerHTML = items.map(item => {
    const title = escapeHtml(loc(item.title));
    const excerpt = escapeHtml(loc(item.excerpt));
    const dateStr = item.date ? fmt.format(new Date(item.date)) : "";
    const media = item.image
      ? `<div class="news-media"><img src="${escapeHtml(item.image)}" alt="${title}" loading="lazy"></div>` : "";
    return `<article class="news-card">
      ${media}
      <span class="news-date">${escapeHtml(dateStr)}</span>
      <h3>${title}</h3>
      <p>${excerpt}</p>
    </article>`;
  }).join("");
}

function renderActivities(){
  const grid = document.getElementById("activities-grid");
  if (!grid) return;
  grid.innerHTML = (SC.activities || []).map(a => {
    const title = escapeHtml(loc(a.title));
    return `<article class="card">
      <div class="card-media"><img src="${escapeHtml(a.image)}" alt="${title}" loading="lazy"></div>
      <div class="card-body">
        <span class="tag">${escapeHtml(loc(a.tag))}</span>
        <h3>${title}</h3>
        <p>${escapeHtml(loc(a.text))}</p>
      </div>
    </article>`;
  }).join("");
}

function renderGallery(){
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;
  grid.innerHTML = (SC.gallery || []).map(g =>
    `<button class="gallery-item" data-full="${escapeHtml(g.src)}"><img src="${escapeHtml(g.src)}" alt="${escapeHtml(g.alt || "")}" loading="lazy"></button>`
  ).join("");
}

function initials(name){
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  const first = parts[0][0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function renderTeam(){
  const grid = document.getElementById("team-grid");
  if (!grid) return;
  grid.innerHTML = (SC.team || []).map(m => {
    const name = escapeHtml(m.name || "");
    const role = escapeHtml(loc(m.role));
    const avatar = m.photo
      ? `<div class="team-avatar has-photo"><img src="${escapeHtml(m.photo)}" alt="${name}" loading="lazy"></div>`
      : `<div class="team-avatar" aria-hidden="true">${escapeHtml(initials(m.name))}</div>`;
    return `<div class="team-card">${avatar}<h3>${name}</h3><p>${role}</p></div>`;
  }).join("");
}

function setSectionImages(){
  const hero = document.getElementById("hero-img");
  const about = document.getElementById("about-img");
  if (hero && SC.images && SC.images.hero) hero.src = SC.images.hero;
  if (about && SC.images && SC.images.about) about.src = SC.images.about;
}

/* ---------- header scroll + progress ---------- */
function initScroll(){
  const header = document.querySelector(".site-header");
  const bar = document.getElementById("scroll-bar");
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 30);
    if (bar){
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive:true });
}

/* ---------- scroll-spy (active nav link) ---------- */
function initScrollSpy(){
  const links = [...document.querySelectorAll(".nav-link[href^='#']")];
  const map = new Map();
  links.forEach(l => {
    const sec = document.querySelector(l.getAttribute("href"));
    if (sec) map.set(sec, l);
  });
  if (!map.size || !("IntersectionObserver" in window)) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        links.forEach(l => l.classList.remove("active"));
        map.get(entry.target)?.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
  map.forEach((_, sec) => io.observe(sec));
}

/* ---------- mobile nav ---------- */
function initNavToggle(){
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;
  const close = () => {
    nav.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

/* ---------- rules: expand / collapse all ---------- */
function updateExpandLabel(){
  const btn = document.getElementById("rules-expand");
  if (!btn) return;
  const rules = [...document.querySelectorAll(".rule")];
  const allOpen = rules.length && rules.every(r => r.open);
  btn.textContent = currentLang === "en"
    ? (allOpen ? EN["rules.collapseAll"] : EN["rules.expandAll"])
    : (allOpen ? "Alle einklappen" : "Alle ausklappen");
}
function initRules(){
  const btn = document.getElementById("rules-expand");
  const rules = [...document.querySelectorAll(".rule")];
  if (!btn || !rules.length) return;
  btn.addEventListener("click", () => {
    const allOpen = rules.every(r => r.open);
    rules.forEach(r => r.open = !allOpen);
    updateExpandLabel();
  });
  rules.forEach(r => r.addEventListener("toggle", updateExpandLabel));
  updateExpandLabel();
}

/* ---------- reveal on scroll ---------- */
function initReveal(){
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  if (!("IntersectionObserver" in window)){
    els.forEach(el => el.classList.add("in-view"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
  // Safety net: never leave content stuck invisible (e.g. hidden/throttled tab).
  setTimeout(() => {
    document.querySelectorAll(".reveal:not(.in-view)").forEach(el => el.classList.add("in-view"));
  }, 1200);
}

/* ---------- gallery lightbox (event delegation, survives re-render) ---------- */
function initLightbox(){
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  const grid = document.getElementById("gallery-grid");
  if (!lightbox || !lightboxImg) return;
  const close = () => { lightbox.classList.remove("open"); lightbox.setAttribute("aria-hidden","true"); };
  grid?.addEventListener("click", e => {
    const btn = e.target.closest(".gallery-item");
    if (!btn) return;
    lightboxImg.src = btn.dataset.full;
    lightboxImg.alt = btn.querySelector("img")?.alt || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
  closeBtn?.addEventListener("click", close);
  lightbox.addEventListener("click", e => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

/* ---------- contact form ---------- */
function initContactForm(){
  const form = document.getElementById("contact-form");
  const note = document.getElementById("form-note");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!form.checkValidity()){ form.reportValidity(); return; }
    note.textContent = currentLang === "en" ? EN["form.sent"] : FORM_SENT_DE;
    const d = new FormData(form);
    const body = encodeURIComponent(
      `Vorname: ${d.get("firstname")}\nNachname: ${d.get("lastname")}\nE-Mail: ${d.get("email")}\nWhatsApp: ${d.get("whatsapp")}\nMotorrad: ${d.get("bike")}\n\n${d.get("message")}`
    );
    const subject = encodeURIComponent(currentLang === "en" ? "Website enquiry" : "Kontaktanfrage über die Website");
    window.location.href = `mailto:sunset.riders.2023@gmail.com?subject=${subject}&body=${body}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  setSectionImages();
  renderGallery();
  initLang();          // renders news + activities in the chosen language
  initScroll();
  initScrollSpy();
  initNavToggle();
  initRules();
  initReveal();
  initLightbox();
  initContactForm();
});
