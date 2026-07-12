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
  "team.eyebrow": "Board", "team.title": "Our team",
  "downloads.title": "Documents & downloads",
  "contact.eyebrow": "Contact", "contact.title": "Become part of the club.",
  "contact.text": "Drop us a line about who you are and what you ride — we'll get back to you personally and invite you to our WhatsApp channel, where all rides are coordinated.",
  "form.firstname": "First name", "form.lastname": "Last name",
  "form.email": "Email", "form.whatsapp": "WhatsApp number",
  "form.bike": "Motorcycle model", "form.bikePh": "e.g. BMW R1250 RT",
  "form.message": "Message", "form.messagePh": "Tell us a bit about yourself …",
  "form.submit": "Send message",
  "form.sent": "Thanks! Your message has been sent — we'll get back to you soon.",
  "form.sending": "Sending …",
  "form.error": "Sorry, sending didn't work. Please email us at sunset.riders.2023@gmail.com.",
  "footer.tagline": "Sunset Riders — founded 2023 in Zurich."
};

const FORM_SENT_DE = "Danke! Deine Nachricht wurde gesendet — wir melden uns bald.";
const FORM_SENDING_DE = "Wird gesendet …";
const FORM_ERROR_DE = "Senden hat leider nicht geklappt. Bitte schreibt uns an sunset.riders.2023@gmail.com.";
const CONTACT_EMAIL = "sunset.riders.2023@gmail.com";
const DEFAULT_LANG = "en";   // Startsprache der Website

/* ---------- content (from js/content.js) ---------- */
const SC = (typeof SITE_CONTENT !== "undefined")
  ? SITE_CONTENT
  : { images:{}, activities:[], news:[], gallery:[] };

// Der Browser merkt sich normalerweise die zuletzt besuchte Scroll-Position und
// springt beim erneuten Öffnen dorthin. Das schalten wir ab, damit die Seite
// immer oben (beim Hero/„About") startet und nicht z. B. bei „Our Team".
if ("scrollRestoration" in history) history.scrollRestoration = "manual";

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
  renderEvents();
  renderTeam();
  renderDownloads();
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
  // Nur Meldungen der letzten 6 Monate anzeigen (ältere bleiben in content.js
  // gespeichert, werden aber nicht mehr angezeigt).
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - 6);
  const items = [...(SC.news || [])]
    .filter(n => n.date && new Date(n.date) >= cutoff)
    .sort((a,b) => new Date(b.date) - new Date(a.date));
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
  const items = SC.gallery || [];
  const empty = items.length === 0;
  // Ganzen Galerie-Abschnitt sowie die zugehörigen Navigationslinks ausblenden,
  // wenn keine Bilder vorhanden sind.
  const section = document.getElementById("gallery");
  if (section) section.hidden = empty;
  document.querySelectorAll('a[href="#gallery"]').forEach(a => { a.hidden = empty; });

  const grid = document.getElementById("gallery-grid");
  if (!grid) return;
  grid.innerHTML = items.map(g =>
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

function renderDownloads(){
  const block = document.getElementById("downloads-block");
  const list = document.getElementById("downloads-list");
  if (!block || !list) return;
  const items = SC.downloads || [];
  if (!items.length){ block.hidden = true; list.innerHTML = ""; return; }
  block.hidden = false;
  list.innerHTML = items.map(d => {
    const title = escapeHtml(loc(d.title) || (d.file || "").split("/").pop());
    return `<a class="download-item" href="${escapeHtml(d.file || "")}" download>${title}</a>`;
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
  form.addEventListener("submit", async e => {
    e.preventDefault();
    if (!form.checkValidity()){ form.reportValidity(); return; }
    const submitBtn = form.querySelector('[type="submit"]');
    const d = new FormData(form);
    note.style.color = "";
    note.textContent = currentLang === "en" ? EN["form.sending"] : FORM_SENDING_DE;
    if (submitBtn) submitBtn.disabled = true;
    try {
      const res = await fetch("https://formsubmit.co/ajax/" + CONTACT_EMAIL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          Vorname: d.get("firstname"),
          Nachname: d.get("lastname"),
          "E-Mail": d.get("email"),
          WhatsApp: d.get("whatsapp"),
          Motorrad: d.get("bike"),
          Nachricht: d.get("message"),
          _subject: "Neue Kontaktanfrage über die Website",
          _template: "table",
          _replyto: d.get("email"),
          _captcha: "false"
        })
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      note.textContent = currentLang === "en" ? EN["form.sent"] : FORM_SENT_DE;
      form.reset();
    } catch (err) {
      note.textContent = currentLang === "en" ? EN["form.error"] : FORM_ERROR_DE;
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Hinweis „Vollständige Statuten … auf Anfrage" entfernen — die Dokumente
  // stehen jetzt als Downloads bereit.
  document.querySelectorAll('[data-i18n="rules.docsNote"]').forEach(el => el.remove());

  setSectionImages();
  initEvents();        // baut den Events-/Kalender-Bereich ein (vor initLang & scroll-spy)
  renderGallery();
  initLang();          // renders news + activities in the chosen language
  initScroll();
  initScrollSpy();
  initNavToggle();
  initRules();
  initReveal();
  initLightbox();
  initContactForm();

  // Falls der Browser doch eine alte Position wiederhergestellt hat: nach oben
  // springen — ausser die Seite wurde gezielt mit einem Abschnitts-Link geöffnet
  // (z. B. …/#contact). Sofort (ohne Scroll-Animation).
  if (!location.hash){
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }
});

/* ============================================================
   Kommende Events / Kalender  —  ergänzt durch die Website-Verwaltung
   ------------------------------------------------------------
   Daten: SC.events = [{
     start:"2026-07-16", end:"2026-07-20"(optional), time:"18:30"(optional),
     title:{de,en}, location:{de,en}, text:{de,en}, link:"https://…"(optional)
   }]
   Events, deren (End-)Datum mehr als 30 Tage zurückliegt, werden
   automatisch ausgeblendet. Der ganze Bereich wird dynamisch
   eingefügt — index.html und style.css bleiben unverändert.
   ============================================================ */
const EV = {
  de:{ eyebrow:"Kalender", title:"Kommende Events", nav:"Events",
       lead:"Unsere Termine der nächsten 30 Tage. Vergangene Termine (älter als 7 Tage) werden automatisch ausgeblendet.",
       none:"Zurzeit sind keine kommenden Events eingetragen.",
       more:"Mehr Infos", allday:"ganztägig", all:"Alle Events anzeigen",
       months:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
       dow:["Mo","Di","Mi","Do","Fr","Sa","So"] },
  en:{ eyebrow:"Calendar", title:"Upcoming Events", nav:"Events",
       lead:"Our events for the next 30 days. Past events (older than 7 days) are hidden automatically.",
       none:"No upcoming events at the moment.",
       more:"More info", allday:"all day", all:"Show all events",
       months:["January","February","March","April","May","June","July","August","September","October","November","December"],
       dow:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] }
};
const EV_PAST_DAYS   = 7;    // vergangene Events nur der letzten 7 Tage zeigen
const EV_FUTURE_DAYS = 30;   // kommende Events der nächsten 30 Tage zeigen
let evCal = null;   // aktuell gezeigter Monat {y,m}
let evSel = null;   // ausgewählter Tag (ISO) oder null

function evDate(s){ return s ? new Date(String(s).slice(0,10)+"T00:00:00") : null; }
function evEndDate(ev){ return evDate(ev.end) || evDate(ev.start); }
function evISO(d){ return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function evVisible(){
  const now=new Date(); now.setHours(0,0,0,0);
  const past=new Date(now); past.setDate(past.getDate()-EV_PAST_DAYS);
  const fut =new Date(now); fut.setDate(fut.getDate()+EV_FUTURE_DAYS);
  // sichtbar: Events, die im Fenster [heute-7 Tage ; heute+30 Tage] liegen
  return (SC.events||[])
    .filter(e=>e && e.start && evEndDate(e) >= past && evDate(e.start) <= fut)
    .sort((a,b)=> evDate(a.start)-evDate(b.start));
}
function evDayMap(){
  const map={};
  evVisible().forEach(e=>{
    let d=evDate(e.start); const end=evEndDate(e); let guard=0;
    while(d<=end && guard<400){ const k=evISO(d); (map[k]=map[k]||[]).push(e); d=new Date(d.getTime()+86400000); guard++; }
  });
  return map;
}

function initEvents(){
  if(document.getElementById("events")) return;
  const css = `
  .sr-events .sr-ev-wrap{display:grid;grid-template-columns:340px 1fr;gap:28px;align-items:start;margin-top:14px;}
  @media(max-width:820px){.sr-events .sr-ev-wrap{grid-template-columns:1fr;}}
  .sr-cal{background:var(--bg-2);border:1px solid var(--line);border-radius:var(--radius);padding:16px;box-shadow:var(--shadow);}
  .sr-cal-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
  .sr-cal-title{font-family:var(--font-display);font-size:1.15rem;font-weight:600;}
  .sr-nav{width:34px;height:34px;border-radius:9px;border:1px solid var(--line-strong);color:var(--muted);font-size:1.2rem;line-height:1;transition:.2s;}
  .sr-nav:hover{color:var(--accent);border-color:var(--accent);}
  .sr-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;}
  .sr-dow-row{margin-bottom:6px;}
  .sr-dow{text-align:center;font-size:.7rem;font-weight:700;letter-spacing:.05em;color:var(--muted-2);text-transform:uppercase;padding:2px 0;}
  .sr-day{position:relative;aspect-ratio:1;border-radius:9px;color:var(--text);font-size:.92rem;font-weight:500;display:flex;align-items:center;justify-content:center;border:1px solid transparent;transition:.15s;cursor:default;}
  .sr-day.out{color:var(--muted-2);opacity:.45;}
  .sr-day.today{border-color:var(--line-strong);}
  .sr-day.has-ev{background:rgba(213,155,87,.14);color:var(--accent-hi);font-weight:700;cursor:pointer;}
  .sr-day.has-ev:hover{background:rgba(213,155,87,.28);}
  .sr-day.sel{background:var(--accent);color:var(--accent-ink);}
  .sr-dot{position:absolute;bottom:5px;left:50%;transform:translateX(-50%);width:5px;height:5px;border-radius:50%;background:var(--accent);}
  .sr-day.sel .sr-dot{background:var(--accent-ink);}
  .sr-ev-list{display:flex;flex-direction:column;gap:12px;}
  .sr-clear{align-self:flex-start;font-size:.82rem;color:var(--muted);border:1px solid var(--line-strong);border-radius:999px;padding:.35em .9em;transition:.2s;}
  .sr-clear:hover{color:var(--accent);border-color:var(--accent);}
  .sr-none{color:var(--muted);padding:8px 2px;}
  .sr-ev-card{display:flex;gap:16px;background:var(--bg-2);border:1px solid var(--line);border-radius:var(--radius-sm);padding:16px;box-shadow:var(--shadow);}
  .sr-ev-chip{flex-shrink:0;width:78px;background:var(--bg-3);border:1px solid var(--line-strong);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:10px 4px;text-align:center;}
  .sr-chip-day{font-family:var(--font-display);font-size:1.7rem;font-weight:700;line-height:1;color:var(--accent-hi);}
  .sr-chip-range{font-family:var(--font-display);font-size:1.15rem;font-weight:700;line-height:1.1;color:var(--accent-hi);}
  .sr-chip-mon{font-size:.74rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-top:4px;}
  .sr-chip-yr{font-size:.68rem;color:var(--muted-2);margin-top:1px;}
  .sr-ev-body{min-width:0;flex:1;}
  .sr-ev-body h3{margin:0 0 6px;font-family:var(--font-body);font-size:1.08rem;font-weight:700;}
  .sr-ev-meta{display:flex;flex-wrap:wrap;gap:6px 14px;margin-bottom:8px;font-size:.85rem;color:var(--muted);}
  .sr-ev-time{color:var(--accent);font-weight:600;}
  .sr-ev-body p{margin:0 0 8px;font-size:.92rem;color:var(--muted);}
  .sr-ev-link{font-size:.86rem;font-weight:600;color:var(--accent);}
  .sr-ev-link:hover{color:var(--accent-hi);}
  .sr-events .section-lead{max-width:640px;}
  `;
  const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);

  const sec=document.createElement("section");
  sec.className="section section-alt sr-events"; sec.id="events";
  sec.innerHTML=`<div class="container">
    <p class="eyebrow center" data-ev="eyebrow"></p>
    <h2 class="center" data-ev="title"></h2>
    <p class="section-lead center" data-ev="lead"></p>
    <div class="sr-ev-wrap">
      <div class="sr-cal" id="sr-cal"></div>
      <div class="sr-ev-list" id="sr-ev-list"></div>
    </div>
  </div>`;
  const act=document.getElementById("activities");
  if(act && act.parentNode) act.parentNode.insertBefore(sec, act.nextSibling);
  else (document.querySelector("main")||document.body).appendChild(sec);

  // Navigationslinks (Kopf + Footer)
  const nav=document.getElementById("main-nav");
  if(nav && !nav.querySelector('a[href="#events"]')){
    const a=document.createElement("a"); a.href="#events"; a.className="nav-link"; a.setAttribute("data-ev","nav");
    nav.insertBefore(a, nav.querySelector(".nav-link-cta")||null);
  }
  const fnav=document.querySelector(".footer-nav");
  if(fnav && !fnav.querySelector('a[href="#events"]')){
    const a=document.createElement("a"); a.href="#events"; a.setAttribute("data-ev","nav");
    const ref=fnav.querySelector('a[href="#activities"]');
    fnav.insertBefore(a, ref? ref.nextSibling : null);
  }

  const first=evVisible()[0];
  const base=first? evDate(first.start) : new Date();
  evCal={y:base.getFullYear(), m:base.getMonth()};
  sec.addEventListener("click", onEvClick);
}

function renderEvents(){
  const sec=document.getElementById("events"); if(!sec) return;
  const L=EV[currentLang]||EV.de;
  const vis=evVisible();
  const empty=vis.length===0;
  sec.hidden=empty;
  document.querySelectorAll('a[href="#events"]').forEach(a=>{ a.hidden=empty; });
  if(empty) return;
  sec.querySelectorAll("[data-ev]").forEach(el=>{ const k=el.getAttribute("data-ev"); if(L[k]!=null) el.textContent=L[k]; });
  document.querySelectorAll('a[href="#events"][data-ev="nav"]').forEach(a=>{ a.textContent=L.nav; });
  renderCalendar(L);
  renderEvList(L, vis);
}

function renderCalendar(L){
  const cal=document.getElementById("sr-cal"); if(!cal || !evCal) return;
  const {y,m}=evCal;
  const days=evDayMap();
  const todayISO=evISO(new Date());
  const startDow=(new Date(y,m,1).getDay()+6)%7;   // Montag = 0
  const dim=new Date(y,m+1,0).getDate();
  const cells=[];
  for(let i=0;i<startDow;i++) cells.push({d:new Date(y,m,1-(startDow-i)),out:true});
  for(let n=1;n<=dim;n++) cells.push({d:new Date(y,m,n),out:false});
  while(cells.length%7!==0){ const last=cells[cells.length-1].d; cells.push({d:new Date(last.getTime()+86400000),out:true}); }
  const dow=L.dow.map(x=>`<div class="sr-dow">${x}</div>`).join("");
  const grid=cells.map(c=>{
    const iso=evISO(c.d), has=days[iso];
    const cls=["sr-day"];
    if(c.out)cls.push("out"); if(iso===todayISO)cls.push("today"); if(has)cls.push("has-ev"); if(evSel===iso)cls.push("sel");
    return `<button class="${cls.join(" ")}" data-day="${iso}"${has?"":' tabindex="-1"'}>${c.d.getDate()}${has?'<span class="sr-dot"></span>':""}</button>`;
  }).join("");
  cal.innerHTML=`
    <div class="sr-cal-head">
      <button class="sr-nav" data-cal="prev" aria-label="Vorheriger Monat">‹</button>
      <span class="sr-cal-title">${L.months[m]} ${y}</span>
      <button class="sr-nav" data-cal="next" aria-label="Nächster Monat">›</button>
    </div>
    <div class="sr-cal-grid sr-dow-row">${dow}</div>
    <div class="sr-cal-grid">${grid}</div>`;
}

function renderEvList(L, vis){
  const list=document.getElementById("sr-ev-list"); if(!list) return;
  const locale=currentLang==="en"?"en-GB":"de-CH";
  let items=vis;
  if(evSel){
    const sel=evDate(evSel);
    items=vis.filter(e=> sel>=evDate(e.start) && sel<=evEndDate(e));
  }
  const clear = evSel ? `<button class="sr-clear" data-cal="all">✕ ${L.all}</button>` : "";
  if(!items.length){ list.innerHTML=clear+`<p class="sr-none">${L.none}</p>`; return; }
  list.innerHTML=clear+items.map(e=>{
    const title=escapeHtml(loc(e.title));
    const locTxt=escapeHtml(loc(e.location));
    const txt=escapeHtml(loc(e.text));
    const link=e.link?`<a class="sr-ev-link" href="${escapeHtml(e.link)}" target="_blank" rel="noopener">${L.more} ↗</a>`:"";
    const locLine=locTxt?`<span class="sr-ev-loc">📍 ${locTxt}</span>`:"";
    const timeLine=`<span class="sr-ev-time">${e.time?escapeHtml(e.time):L.allday}</span>`;
    return `<article class="sr-ev-card">
      <div class="sr-ev-chip">${evChip(e,locale)}</div>
      <div class="sr-ev-body">
        <h3>${title}</h3>
        <div class="sr-ev-meta">${timeLine}${locLine}</div>
        ${txt?`<p>${txt}</p>`:""}
        ${link}
      </div>
    </article>`;
  }).join("");
}

function evChip(e,locale){
  const s=evDate(e.start), en=evEndDate(e);
  const day=new Intl.DateTimeFormat(locale,{day:"2-digit"});
  const mon=new Intl.DateTimeFormat(locale,{month:"short"});
  if(en>s){
    const mo=mon.format(s), mo2=mon.format(en);
    return `<span class="sr-chip-range">${day.format(s)}–${day.format(en)}</span><span class="sr-chip-mon">${mo}${mo2!==mo?"–"+mo2:""}</span><span class="sr-chip-yr">${s.getFullYear()}</span>`;
  }
  return `<span class="sr-chip-day">${day.format(s)}</span><span class="sr-chip-mon">${mon.format(s)}</span><span class="sr-chip-yr">${s.getFullYear()}</span>`;
}

function onEvClick(e){
  const nav=e.target.closest("[data-cal]");
  if(nav){
    const k=nav.getAttribute("data-cal");
    if(k==="prev"){ evCal.m--; if(evCal.m<0){evCal.m=11;evCal.y--;} }
    else if(k==="next"){ evCal.m++; if(evCal.m>11){evCal.m=0;evCal.y++;} }
    else if(k==="all"){ evSel=null; }
    renderEvents(); return;
  }
  const day=e.target.closest("[data-day]");
  if(day && day.classList.contains("has-ev")){
    const iso=day.getAttribute("data-day");
    evSel = (evSel===iso) ? null : iso;
    renderEvents();
    document.getElementById("sr-ev-list")?.scrollIntoView({behavior:"smooth",block:"nearest"});
  }
}
