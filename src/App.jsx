import { useState, useEffect, useCallback, useRef } from "react";
import {
  Menu, X, Phone, Mail, MapPin, ArrowRight, Star, ArrowLeft,
  Shield, Clock, Award, ChevronDown, CheckCircle2, FileText,
  Wrench, Layers, Home, Building2, ChevronRight, Lock,
  BookOpen, AlertCircle, BadgeCheck, Briefcase, ExternalLink,
  Trash2, Plus, Eye, EyeOff, LogOut, Inbox, Image, Check,
  AlertTriangle, RefreshCw, User
} from "lucide-react";

const G = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');`;
const HERO_POSTER = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1920";
const HERO_VIDEO_SOURCES = [
  "/hero-option-2.mp4",
  "/hero-option2.mp4",
];

/* ══════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════ */
const ADMIN_PASSWORD = "golv2024";

const CERTS = [
  { code:"GVK",      full:"Godkända våtrum",                          year:"2009", color:"#1A56DB" },
  { code:"ID06",     full:"ID06 Legitimationssystem",                  year:"2010", color:"#0D7A3E" },
  { code:"AML",      full:"Arbetsmiljölagen 1977:1160",                year:"—",    color:"#7C3AED" },
  { code:"BBR",      full:"Boverkets Byggregler",                      year:"—",    color:"#B45309" },
  { code:"F-SKATT",  full:"Registrerad för F-skatt",                   year:"2009", color:"#0369A1" },
  { code:"KOLLAV.",  full:"Kollektivavtal via GolvBranschen",           year:"2009", color:"#9D174D" },
];

const REGS = [
  { icon:<Shield size={20}/>, title:"Arbetsmiljölagen (AML)", ref:"SFS 1977:1160",
    desc:"Vi följer samtliga bestämmelser i Arbetsmiljölagen gällande systematiskt arbetsmiljöarbete, riskbedömning och skyddsåtgärder vid alla arbetsplatser.",
    items:["Systematiskt arbetsmiljöarbete (SAM)","Riskbedömning inför varje uppdrag","Skyddsombud på alla arbetsplatser","Regelbundna säkerhetsutbildningar"] },
  { icon:<FileText size={20}/>, title:"AFS 2001:1 — Systematiskt Arbetsmiljöarbete", ref:"Arbetsmiljöverkets föreskrift",
    desc:"Föreskriften om systematiskt arbetsmiljöarbete implementeras fullt ut med dokumenterade rutiner, riskbedömningar och uppföljningsprotokoll.",
    items:["Dokumenterade SAM-rutiner","Handlingsplaner för risker","Årlig uppföljning och revision","Medarbetarinvolvering i SAM"] },
  { icon:<AlertCircle size={20}/>, title:"AFS 1999:3 — Byggnads- och anläggningsarbete", ref:"Arbetsmiljöverkets föreskrift",
    desc:"Föreskriften reglerar säkerhet vid byggnads- och anläggningsarbete. Alla projekt bedrivs i enlighet med kraven på byggarbetsmiljösamordning.",
    items:["BAS-P & BAS-U kompetens","Säkerhetsplaner per projekt","Personlig skyddsutrustning (PSA)","Regelbundna skyddsronder"] },
  { icon:<BookOpen size={20}/>, title:"AFS 2011:18 — Hygieniska gränsvärden", ref:"Arbetsmiljöverkets föreskrift",
    desc:"Vi arbetar strikt inom hygieniska gränsvärden för damm, lösningsmedel och andra ämnen. Dammfri utrustning och andningsskydd används konsekvent.",
    items:["Dammfri sliputrustning","Mätning av exponering","Andningsskydd klass P3","Ventilationsprotokoll"] },
  { icon:<Building2 size={20}/>, title:"Boverkets Byggregler (BBR)", ref:"BFS 2011:6 med ändringar",
    desc:"Samtliga installationer utförs enligt BBR avseende brandskydd, tillgänglighet, fuktskydd och tekniska egenskapskrav.",
    items:["Fuktskydd enligt BBR 6:5","Brandskyddsklassificering","Tillgänglighetsanpassning","Teknisk dokumentation"] },
  { icon:<BadgeCheck size={20}/>, title:"Plan- och Bygglagen (PBL)", ref:"SFS 2010:900",
    desc:"Vi arbetar alltid i enlighet med Plan- och Bygglagen och säkerställer att nödvändiga anmälningar och kontroller genomförs.",
    items:["Bygganmälan vid behov","Kontrollplan upprättas","Kontrollansvarig (KA) vid krav","Slutbesked och dokumentation"] },
  { icon:<Lock size={20}/>, title:"GVK — Branschregler för Våtrum", ref:"Golvbranschen, rev. 2022",
    desc:"Som GVK-auktoriserat företag följer vi branschens striktaste regler för våtrumsarbeten med fullständig GVK-protokolldokumentation.",
    items:["GVK-protokoll på varje uppdrag","Auktoriserade installatörer","10-årsgaranti på våtrum","Fuktkontroll och mätning"] },
  { icon:<Briefcase size={20}/>, title:"Branschstandard AMA Hus", ref:"Allmän material- och arbetsbeskrivning",
    desc:"Tekniska utföranden följer AMA Hus-standardens krav för golvarbeten, vilket säkerställer enhetlig hög kvalitet och branschöverensstämmande dokumentation.",
    items:["AMA-koder i alla offerter","Materialkrav enligt standard","Utförandekontroll","Avvikelsehantering"] },
];

const SERVICES = [
  { icon:<Wrench size={22}/>, num:"01", title:"Badrum", short:"Renovering & plattsättning i våtrum",
    desc:"Vi skapar badrum med fokus på kvalitet, funktion och stil. Oavsett om du vill ha ett modernt, klassiskt eller tidlöst badrum hjälper vi dig genom hela processen – från planering till färdigt resultat. Vi arbetar med både keramik och våtrumsmatta och anpassar lösningen efter dina önskemål och behov. Med noggrant utfört arbete och känsla för detaljer ser vi till att ditt badrum blir både hållbart och trivsamt i många år framöver.",
    bullets:["Kakel & klinker","Noggrann planering av ytor","Fuktsäkra arbetsmoment","Dokumenterad kvalitet"],
    image:"https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=900" },
  { icon:<Layers size={22}/>, num:"02", title:"Trägolv", short:"Installation av parkett & massivträ",
    desc:"Vi erbjuder professionell nyinstallation av trägolv samt dammfri slipning för att ge ditt golv nytt liv. Oavsett om du vill lägga ett helt nytt golv eller återställa känslan i ett befintligt trägolv arbetar vi med precision, kvalitet och noggrant utvalda material. Med moderna metoder för dammfri slipning får du ett snyggt resultat med minimal påverkan på ditt hem.",
    bullets:["Parkett & massivträ","Fiskbens- & segmentmönster","Kontrollerad fuktnivå","BBR & AMA Hus-godkänt"],
    image:"https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&q=80&w=900" },
  { icon:<Home size={22}/>, num:"03", title:"Mattläggning", short:"Textila mattor & plastmattor",
    desc:"Vi utför professionell mattläggning för både privata och offentliga miljöer. Vi arbetar med allt från textilmattor till plast- och våtrumsmattor, inklusive lösningar med uppvik för miljöer där höga krav ställs på hygien och hållbarhet, såsom sjukhus, vårdmiljöer och andra offentliga verksamheter. Med fokus på kvalitet, precision och funktion levererar vi hållbara resultat anpassade efter varje projekts behov.",
    bullets:["Textilmattor & plastmattor","Kommersiella och offentliga miljöer","Noggrann underlagskontroll","Kvalitetsdokumentation"],
    image:"https://images.unsplash.com/photo-1600607687940-47a000dfd39c?auto=format&fit=crop&q=80&w=900" },
  { icon:<Building2 size={22}/>, num:"04", title:"Plattsättning", short:"Kakel & klinker med precision",
    desc:"Vi utför professionell plattsättning för allt från butiker och bilhallar till kontor och större byggprojekt. Med erfarenhet av både traditionell plattsättning och montering av storformatsplattor levererar vi hållbara och stilrena lösningar anpassade för miljöer med höga krav på kvalitet och slitstyrka. Vi arbetar noggrant i varje detalj för att skapa ett resultat som håller över tid.",
    bullets:["Kakel & klinker","Noggrann linjering och fall","Underlag och fästmassa enligt krav","Dokumenterat utförande"],
    image:"https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=900" },
  { icon:<Shield size={22}/>, num:"05", title:"Golvavjämning / EPS", short:"Stabil grund för lång livslängd",
    desc:"Vi erbjuder professionell golvavjämning och arbete med EPS-cement för både ROT-projekt och nyproduktion. Med rätt underarbete, armering och noggrant utförande skapar vi stabila, jämna och hållbara golvkonstruktioner anpassade efter varje projekts krav. EPS-cement är en effektiv lösning för uppbyggnad, isolering och viktminskning, särskilt vid renoveringar och större byggprojekt där funktion och hållbarhet är avgörande.",
    bullets:["Självutjämnande massor","EPS-cement och lättfyllnad","Nivå- och fallkorrigering","Förberedelse inför slutbeläggning"],
    image:"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=900" },
];

const DEFAULT_PROJECTS = [
  { id:"p1", title:"Statlig myndighetsbyggnad",    type:"Golvläggning",          area:"2 400 m²", tag:"Offentlig sektor", img:"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" },
  { id:"p2", title:"Institutionell fastighet",      type:"Parkettslipning",       area:"1 800 m²", tag:"Institutionell",   img:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
  { id:"p3", title:"Hotell Örebro",                 type:"Kommersiell läggning",  area:"1 200 m²", tag:"Kommersiell",      img:"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800" },
  { id:"p4", title:"Bostadsrättsförening",          type:"Parkettslipning",       area:"800 m²",   tag:"Bostäder",         img:"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800" },
  { id:"p5", title:"Förskola & skola, Vivalla",     type:"Golvläggning",          area:"430 m²",   tag:"Offentlig sektor", img:"https://images.unsplash.com/photo-1571624436279-b272aff752b5?auto=format&fit=crop&q=80&w=800" },
  { id:"p6", title:"Kontorskomplex, City",          type:"Golvläggning",          area:"340 m²",   tag:"Kommersiell",      img:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800" },
  { id:"p7", title:"Restaurang Kvarnen",            type:"Kommersiell läggning",  area:"210 m²",   tag:"Kommersiell",      img:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800" },
  { id:"p8", title:"Villa i Örebro",                type:"Parkettslipning",       area:"120 m²",   tag:"Privat",           img:"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800" },
  { id:"p9", title:"Badrum & våtrum, GVK",          type:"Mattläggning",          area:"45 m²",    tag:"Privat",           img:"https://images.unsplash.com/photo-1600607687940-47a000dfd39c?auto=format&fit=crop&q=80&w=800" },
];

const TESTIMONIALS = [
  { name:"Johan Persson",   role:"Förvaltningschef, Statlig myndighet",        stars:5, text:"GolvGruppen levererade ett komplett projekt i en säkerhetsklassad miljö med full sekretess, i tid och utan avvikelser." },
  { name:"Marcus Bergqvist",role:"Fastighetsförvaltare, Örebro Fastigheter AB", stars:5, text:"Alltid i tid, alltid rätt kvalitet. Deras dokumentation håller måttet vid alla revisioner." },
  { name:"Sofia Ek",        role:"Projektledare, Kommunfastigheter",            stars:5, text:"Exceptionellt hantverkskunnande kombinerat med fullständig regelefterlevnad. GVK-dokumentationen var felfri." },
  { name:"Lars Eriksson",   role:"Hotelldirektör, Örebro",                      stars:5, text:"Hela restauranggolvet på en natt. Fullständig AML-dokumentation dagen efter. Imponerande." },
  { name:"Anna Lindström",  role:"Styrelseordförande, BRF Vasastaden",          stars:5, text:"Slipad om hela fastigheten med minimal störning. Korrekt anmält, kontrollerat och dokumenterat." },
  { name:"Maria Holm",      role:"Inköpschef, Regionfastigheter",               stars:5, text:"Vi utvärderade tre leverantörer. GolvGruppen vann på kvalitet, pris och dokumentationskrav." },
];

/** Placeholderprofiler — byt namn, telefon, mail och lägg bild i img (tom sträng = platshållare) */
const TEAM_MEMBERS = [
  { name: "Förnamn Efternamn", title: "Arbetsledare", tel: "073-309 16 95", email: "namn1@ggruppen.se", img: "" },
  { name: "Förnamn Efternamn", title: "Byggadministratör", tel: "073-309 16 95", email: "namn2@ggruppen.se", img: "" },
  { name: "Förnamn Efternamn", title: "Titel / roll", tel: "073-309 16 95", email: "namn3@ggruppen.se", img: "" },
  { name: "Förnamn Efternamn", title: "Titel / roll", tel: "073-309 16 95", email: "namn4@ggruppen.se", img: "" },
  { name: "Förnamn Efternamn", title: "Titel / roll", tel: "073-309 16 95", email: "namn5@ggruppen.se", img: "" },
];

/** Keeps first occurrence per `id`, else per title+img — avoids duplicate cards on /projekt. */
function dedupeProjects(projects) {
  if (!Array.isArray(projects)) return [];
  const seen = new Set();
  const out = [];
  for (const p of projects) {
    if (!p || typeof p !== "object") continue;
    const id = p.id;
    const key =
      id != null && String(id).trim() !== ""
        ? `id:${String(id)}`
        : `k:${String(p.title ?? "").trim()}|${String(p.img ?? "").trim()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(p);
  }
  return out;
}

/* ══════════════════════════════════════════════════════
   STORAGE HELPERS
══════════════════════════════════════════════════════ */
async function saveQuote(data) {
  try {
    let existing = [];
    try { const r = await window.storage.get("gg-quotes"); if (r) existing = JSON.parse(r.value); } catch {}
    existing.unshift({ ...data, id: Date.now(), date: new Date().toISOString(), read: false });
    await window.storage.set("gg-quotes", JSON.stringify(existing));
    return true;
  } catch { return false; }
}
async function loadQuotes() {
  try { const r = await window.storage.get("gg-quotes"); return r ? JSON.parse(r.value) : []; }
  catch { return []; }
}
async function deleteQuote(id) {
  try {
    const quotes = await loadQuotes();
    await window.storage.set("gg-quotes", JSON.stringify(quotes.filter(q => q.id !== id)));
    return true;
  } catch { return false; }
}
async function markRead(id) {
  try {
    const quotes = await loadQuotes();
    const updated = quotes.map(q => q.id === id ? { ...q, read: true } : q);
    await window.storage.set("gg-quotes", JSON.stringify(updated));
  } catch {}
}
async function loadProjects() {
  try {
    const r = await window.storage.get("gg-projects");
    if (!r?.value) return dedupeProjects(DEFAULT_PROJECTS);
    const parsed = JSON.parse(r.value);
    if (!Array.isArray(parsed)) return dedupeProjects(DEFAULT_PROJECTS);
    return dedupeProjects(parsed);
  } catch {
    return dedupeProjects(DEFAULT_PROJECTS);
  }
}
async function saveProjects(projects) {
  try {
    await window.storage.set("gg-projects", JSON.stringify(dedupeProjects(projects)));
    return true;
  } catch { return false; }
}

/* ══════════════════════════════════════════════════════
   CSS
══════════════════════════════════════════════════════ */
const CSS = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --black:#04070D;--navy:#080F24;--navy2:#0D1B3E;
    --blue:#132a57;--blue2:#1b376f;--blue-lt:#2f4f8f;
    --sky:#EFF6FF;--sky2:#DBEAFE;--white:#fff;
    --g1:#F8FAFC;--g2:#F1F5F9;--g3:#CBD5E1;--g4:#94A3B8;--g5:#64748B;--g6:#334155;
    --green:#16A34A;--red:#DC2626;--amber:#D97706;
    --serif:'DM Serif Display',Georgia,serif;--sans:'Inter',system-ui,sans-serif;
    --r:8px;--sh:0 10px 28px rgba(10,20,60,.08);--sh2:0 22px 56px rgba(10,20,60,.14);
    --ticker-h:36px;--nav-h:66px;
  }
  html{scroll-behavior:smooth;font-size:16px}
  body{font-family:var(--sans);background:var(--white);color:var(--g6);line-height:1.65;overflow-x:hidden;-webkit-font-smoothing:antialiased}
  img{display:block;width:100%;object-fit:cover}
  button{font-family:var(--sans);-webkit-tap-highlight-color:transparent}
  button:focus-visible,a:focus-visible{outline:2px solid rgba(59,130,246,.55);outline-offset:2px}

  .w{max-width:1200px;margin:0 auto;padding:0 2rem}
  .sec{padding:5rem 0}
  @media(max-width:640px){.sec{padding:3.5rem 0}.w{padding:0 1.25rem}}

  /* ── TICKER ── */
  .ticker-wrap{
    background:var(--navy);height:var(--ticker-h);overflow:hidden;
    display:flex;align-items:center;border-bottom:1px solid rgba(255,255,255,.06);
  }
  .ticker-track{display:flex;animation:ticker 35s linear infinite;width:max-content}
  .ticker-track:hover{animation-play-state:paused}
  .ticker-item{display:inline-flex;align-items:center;gap:.55rem;padding:0 2rem;
    font-size:.72rem;font-weight:700;letter-spacing:.06em;
    color:rgba(255,255,255,.4);white-space:nowrap;font-family:var(--serif)}
  .ticker-dot{width:3px;height:3px;border-radius:50%;background:var(--blue-lt);flex-shrink:0}
  @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}

  /* ── NAV ── */
  .nav{
    position:sticky;top:0;z-index:200;height:var(--nav-h);
    background:rgba(4,7,13,.92);backdrop-filter:blur(16px);
    border-bottom:1px solid rgba(255,255,255,.07);
    transition:background .3s,border-color .3s;
  }
  .nav.light{background:rgba(255,255,255,.97);border-bottom:1px solid var(--g2)}
  .nav-in{max-width:1200px;margin:0 auto;padding:0 2rem;height:100%;
    display:flex;align-items:center;justify-content:space-between;gap:1rem}
  .logo-btn{font-family:var(--serif);font-size:1.3rem;font-weight:400;
    color:#fff;background:none;border:none;cursor:pointer;padding:0;
    letter-spacing:.01em;flex-shrink:0;transition:opacity .2s}
  .logo-btn:hover{opacity:.8}
  .nav.light .logo-btn{color:var(--black)}
  .logo-blue{color:#93C5FD}
  .nav.light .logo-blue{color:var(--blue)}
  .nl{display:flex;align-items:center;gap:.1rem;flex:1;justify-content:center}
  .nl-btn{font-size:.82rem;font-weight:500;color:rgba(255,255,255,.72);background:none;border:none;
    padding:.45rem .75rem;border-radius:5px;cursor:pointer;transition:all .2s;
    white-space:nowrap;letter-spacing:.01em}
  .nl-btn:hover{color:#fff;background:rgba(255,255,255,.1)}
  .nl-btn.act{color:#fff;background:rgba(255,255,255,.12);font-weight:600}
  .nav.light .nl-btn{color:var(--g5)}
  .nav.light .nl-btn:hover{color:var(--black);background:var(--g1)}
  .nav.light .nl-btn.act{color:var(--blue);background:var(--sky)}
  .nav-right{display:flex;align-items:center;gap:.6rem;flex-shrink:0}
  .nav-cta{background:linear-gradient(135deg,#10224a 0%,var(--navy2) 55%,#1e3f81 100%);
    color:#fff;border:1px solid rgba(147,197,253,.2);padding:.52rem 1.12rem;
    border-radius:calc(var(--r) + 1px);font-size:.8rem;font-weight:600;cursor:pointer;
    transition:transform .2s,box-shadow .24s,filter .24s;white-space:nowrap;letter-spacing:.02em;
    box-shadow:0 8px 22px rgba(8,15,36,.22),inset 0 1px 0 rgba(255,255,255,.14)}
  .nav-cta:hover{filter:brightness(1.04);transform:translateY(-2px);box-shadow:0 12px 28px rgba(8,15,36,.3)}
  .nmb{background:none;border:none;color:#fff;cursor:pointer;display:none;padding:.25rem}
  .nav.light .nmb{color:var(--black)}
  @media(max-width:960px){.nl{display:none}.nav-cta{display:none}.nmb{display:flex}}

  /* ── BREADCRUMB ── */
  .bcrumb{background:var(--g1);border-bottom:1px solid var(--g2);padding:.6rem 0}
  .bcrumb-in{max-width:1200px;margin:0 auto;padding:0 2rem;
    display:flex;align-items:center;gap:.5rem;flex-wrap:wrap}
  .bcrumb-home{display:inline-flex;align-items:center;gap:.35rem;font-size:.75rem;
    font-weight:600;color:var(--blue);background:none;border:none;cursor:pointer;padding:0;transition:opacity .2s}
  .bcrumb-home:hover{opacity:.7}
  .bcrumb-sep{font-size:.72rem;color:var(--g4)}
  .bcrumb-current{font-size:.75rem;font-weight:600;color:var(--g5)}

  /* ── MOBILE MENU ── */
  .mob{position:fixed;inset:0;z-index:400;background:var(--navy);
    display:flex;flex-direction:column;padding:1.5rem;
    transform:translateX(100%);transition:transform .28s cubic-bezier(.4,0,.2,1)}
  .mob.open{transform:translateX(0)}
  .mob-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;
    padding-bottom:1.25rem;border-bottom:1px solid rgba(255,255,255,.08)}
  .mob-logo{font-family:var(--serif);font-size:1.3rem;color:#fff}
  .mob-logo span{color:#93C5FD}
  .mob-x{background:none;border:none;color:rgba(255,255,255,.7);cursor:pointer;padding:.25rem}
  .mob-links{display:flex;flex-direction:column;flex:1;gap:.15rem}
  .mob-btn{font-size:.98rem;font-weight:500;color:rgba(255,255,255,.68);background:none;border:none;
    text-align:left;padding:.85rem .5rem;border-bottom:1px solid rgba(255,255,255,.05);
    display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:color .2s}
  .mob-btn:hover,.mob-btn.act{color:#fff}
  .mob-btn.act{color:#93C5FD;font-weight:600}
  .mob-cta{background:linear-gradient(135deg,#11244e 0%,var(--navy2) 58%,#1f458f 100%);
    color:#fff;border:1px solid rgba(147,197,253,.2);padding:.9rem;
    border-radius:calc(var(--r) + 1px);font-size:.92rem;font-weight:700;margin-top:1.5rem;cursor:pointer;
    letter-spacing:.02em;box-shadow:0 10px 24px rgba(8,15,36,.24),inset 0 1px 0 rgba(255,255,255,.14);
    transition:transform .2s,box-shadow .24s,filter .24s}
  .mob-cta:hover{filter:brightness(1.05);transform:translateY(-2px);box-shadow:0 14px 30px rgba(8,15,36,.33)}

  /* ── BUTTONS ── */
  .btn{display:inline-flex;align-items:center;gap:.45rem;font-family:var(--sans);
    font-size:.82rem;font-weight:650;padding:.74rem 1.5rem;border-radius:calc(var(--r) + 1px);
    border:1px solid transparent;cursor:pointer;
    transition:transform .2s,box-shadow .24s,background .24s,color .24s,border-color .24s,filter .24s;
    letter-spacing:.01em;white-space:nowrap;text-decoration:none}
  .btn:active{transform:translateY(0)}
  .bp{background:linear-gradient(135deg,#10224a 0%,var(--navy2) 55%,#1f4389 100%);color:#fff;
    border-color:rgba(147,197,253,.22);box-shadow:0 10px 24px rgba(8,15,36,.24),inset 0 1px 0 rgba(255,255,255,.15)}
  .bp:hover{filter:brightness(1.04);transform:translateY(-2px);box-shadow:0 14px 30px rgba(8,15,36,.31)}
  .bo{background:rgba(255,255,255,.96);color:var(--navy2);border:1.5px solid rgba(13,27,62,.26);
    box-shadow:inset 0 1px 0 rgba(255,255,255,.86)}
  .bo:hover{background:#f4f8fe;border-color:rgba(13,27,62,.46);transform:translateY(-1px);box-shadow:0 6px 16px rgba(8,15,36,.1)}
  .bw{background:rgba(255,255,255,.97);color:var(--navy2);border-color:rgba(255,255,255,.56);
    box-shadow:0 6px 18px rgba(2,6,23,.18),inset 0 1px 0 rgba(255,255,255,.9)}
  .bw:hover{background:#fff;transform:translateY(-2px);box-shadow:0 12px 24px rgba(2,6,23,.24)}
  .bgh{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.22);
    backdrop-filter:blur(8px)}
  .bgh:hover{background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.42);transform:translateY(-1px)}
  .bdanger{background:linear-gradient(135deg,#DC2626 0%,#B91C1C 100%);color:#fff;
    border-color:rgba(254,202,202,.45);box-shadow:0 8px 20px rgba(185,28,28,.24)}
  .bdanger:hover{filter:brightness(1.04);transform:translateY(-1px)}

  /* ── PAGE ANIMATION ── */
  .page-enter{animation:fadeUp .28s ease both}
  @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}

  /* ── PAGE HEADER ── */
  .phdr{background:var(--navy);padding:4.5rem 0 3.5rem;position:relative;overflow:hidden}
  .phdr::after{content:'';position:absolute;inset:0;
    background:radial-gradient(ellipse at 80% 50%,rgba(26,86,219,.1) 0%,transparent 65%);pointer-events:none}
  .phdr-inner{position:relative;z-index:1}
  .phdr h1{font-family:var(--serif);font-size:clamp(2.2rem,4.5vw,3.4rem);font-weight:400;color:#fff;line-height:1.08;margin-top:.5rem}
  .phdr p{font-size:.95rem;color:rgba(255,255,255,.48);max-width:520px;line-height:1.78;margin-top:.65rem}

  /* ── HERO ── */
  .hero{position:relative;height:calc(100vh - var(--ticker-h) - var(--nav-h));
    min-height:560px;display:flex;align-items:flex-end;overflow:hidden;
    background:url('${HERO_POSTER}') center center / cover no-repeat #080F24}
  .hvid{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 36%;
    filter:brightness(.62) contrast(.86) saturate(.82);pointer-events:none;transform:translateZ(0);backface-visibility:hidden}
  .hov{position:absolute;inset:0;
    background:linear-gradient(
      to top,
      rgba(4,7,13,.96) 0%,
      rgba(4,7,13,.86) 22%,
      rgba(4,7,13,.58) 44%,
      rgba(4,7,13,.24) 66%,
      rgba(4,7,13,0) 88%
    )}
  .hmask{position:absolute;left:50%;bottom:-8%;transform:translateX(-50%);
    width:min(980px,96vw);height:50%;
    background:radial-gradient(ellipse at 50% 100%, rgba(4,7,13,.98) 0%, rgba(4,7,13,.8) 38%, rgba(4,7,13,.32) 68%, rgba(4,7,13,0) 100%);
    filter:blur(8px);z-index:1;pointer-events:none}
  .hcon{position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:0 2rem 7.25rem;width:100%}
  .hbadge{display:inline-flex;align-items:center;gap:.5rem;
    background:rgba(26,86,219,.18);border:1px solid rgba(59,130,246,.28);
    backdrop-filter:blur(8px);color:#93C5FD;padding:.38rem .9rem;border-radius:3px;
    font-size:.67rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;margin-bottom:1.4rem}
  .hbadge-dot{width:5px;height:5px;background:var(--blue-lt);border-radius:50%}
  .hero h1{font-family:var(--serif);font-size:clamp(2.4rem,5vw,4.2rem);font-weight:400;
    line-height:1.08;color:#fff;max-width:760px;margin-bottom:1.1rem}
  .hero h1 em{font-style:italic;color:#93C5FD}
  .hero-sub{font-size:.9rem;color:rgba(255,255,255,.55);max-width:460px;line-height:1.8;
    margin-bottom:2rem;padding-left:.9rem;border-left:2px solid rgba(59,130,246,.35)}
  .hbtns{display:flex;gap:.75rem;flex-wrap:wrap;margin-bottom:3rem}
  .hcerts-bar{position:absolute;bottom:0;left:0;right:0;z-index:2;
    background:rgba(4,7,13,.82);backdrop-filter:blur(10px);
    border-top:1px solid rgba(255,255,255,.06)}
  .hcerts-in{max-width:1200px;margin:0 auto;padding:.8rem 2rem;
    overflow:hidden}
  .hcerts-track{display:flex;gap:2rem;width:max-content;animation:hcertsTicker 54s linear infinite}
  .hcerts-in:hover .hcerts-track{animation-play-state:paused}
  @keyframes hcertsTicker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  .hci{display:flex;align-items:center;gap:.45rem;flex-shrink:0}
  .hci-code{font-size:.62rem;font-weight:800;letter-spacing:.1em;color:#fff;
    background:rgba(26,86,219,.4);padding:.18rem .48rem;border-radius:3px}
  .hci-name{font-size:.67rem;color:rgba(255,255,255,.38);white-space:nowrap}

  /* ── STATS BAR ── */
  .sbar{background:var(--navy2)}
  .sgrid{display:grid;grid-template-columns:repeat(5,1fr);
    border-left:1px solid rgba(255,255,255,.05)}
  .stat{padding:1.6rem 1rem;border-right:1px solid rgba(255,255,255,.05);text-align:center}
  .sic{color:#93C5FD;margin:0 auto .3rem;width:fit-content}
  .sv{font-family:var(--serif);font-size:1.75rem;font-weight:400;color:#fff;line-height:1}
  .sl{font-size:.62rem;font-weight:600;color:rgba(255,255,255,.32);margin-top:.28rem;
    letter-spacing:.1em;text-transform:uppercase}
  .sbar + .sec{padding-top:4.25rem}
  @media(max-width:720px){.sgrid{grid-template-columns:repeat(3,1fr)}}
  @media(max-width:480px){.sgrid{grid-template-columns:repeat(2,1fr)}}

  /* ── SECTION HEADER ── */
  .lbl{font-size:.65rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
    color:var(--blue);display:inline-flex;align-items:center;gap:.45rem;margin-bottom:.6rem}
  .lbl::before{content:'';width:14px;height:2px;background:var(--blue);flex-shrink:0}
  .sv-det .lbl{color:var(--navy2)}
  .sv-det .lbl::before{background:var(--navy2)}
  .lbl-w{color:rgba(255,255,255,.45)}
  .lbl-w::before{background:rgba(255,255,255,.3)}
  .sh{display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:1rem;margin-bottom:2.25rem}
  .h2{font-family:var(--serif);font-size:clamp(1.8rem,3vw,2.6rem);font-weight:400;line-height:1.1;color:var(--black)}
  .h2-w{color:#fff}
  .lead{font-size:.95rem;color:var(--g5);line-height:1.78;max-width:540px;margin-top:.5rem}

  /* ── CERT CARDS ── */
  .cert-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.9rem}
  .cert-card{
    background:#fff;padding:1.35rem 1.4rem;display:flex;flex-direction:column;gap:.55rem;
    border:1px solid var(--g2);border-left:4px solid var(--navy2);border-radius:6px;
    box-shadow:0 1px 8px rgba(10,20,60,.04);transition:border-color .2s,box-shadow .2s,transform .2s
  }
  .cert-card:hover{border-color:#c5d1e3;box-shadow:0 6px 18px rgba(10,20,60,.08);transform:translateY(-1px)}
  .cert-badge-pill{display:inline-flex;align-items:center;justify-content:center;
    width:fit-content;padding:.24rem .62rem;font-size:.69rem;font-weight:800;letter-spacing:.08em;border-radius:3px;
    background:var(--navy2);color:#dbeafe}
  .cert-name{font-size:.87rem;font-weight:700;color:var(--black);line-height:1.3}
  .cert-owner{font-size:.74rem;color:var(--g5)}
  .cert-year{font-size:.7rem;color:var(--g4);font-weight:500;margin-top:auto;padding-top:.4rem;
    border-top:1px solid var(--g2);text-transform:uppercase;letter-spacing:.08em}
  @media(max-width:720px){.cert-grid{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:420px){.cert-grid{grid-template-columns:1fr}}

  /* ── REG CARDS ── */
  .reg-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.1rem}
  .reg-card{border:1px solid var(--g2);border-left:4px solid var(--navy2);border-radius:var(--r);padding:1.6rem;transition:border-color .2s,box-shadow .2s,transform .2s;background:#fff}
  .reg-card:hover{border-color:#c5d1e3;box-shadow:0 6px 18px rgba(10,20,60,.08);transform:translateY(-1px)}
  .reg-hdr{display:flex;align-items:flex-start;gap:.85rem;margin-bottom:.9rem}
  .reg-ic{width:38px;height:38px;border-radius:var(--r);background:#eef2f7;color:var(--navy2);
    display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:.1rem}
  .reg-title{font-size:.88rem;font-weight:700;color:var(--black);margin-bottom:.25rem;line-height:1.3}
  .reg-ref{font-size:.63rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
    color:#334155;background:#eef2f7;padding:.14rem .42rem;border-radius:3px}
  .reg-desc{font-size:.83rem;color:var(--g5);line-height:1.72;margin-bottom:.9rem}
  .reg-list{list-style:none;display:flex;flex-direction:column;gap:.38rem}
  .reg-list li{display:flex;align-items:center;gap:.45rem;font-size:.79rem;font-weight:500;color:var(--g6)}
  .reg-list li::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--blue);flex-shrink:0}
  @media(max-width:720px){.reg-grid{grid-template-columns:1fr}}

  /* ── SERVICES ── */
  .sv-wrap{display:grid;grid-template-columns:280px 1fr;gap:3rem;align-items:start}
  .sv-list{display:flex;flex-direction:column;gap:.45rem}
  .sv-item{padding:1rem 1.1rem;border-radius:var(--r);border:1.5px solid var(--g2);
    cursor:pointer;transition:all .2s;background:#fff}
  .sv-item:hover{border-color:#c5d1e3;background:#f4f7fb}
  .sv-item.act{border-color:#c5d1e3;background:#f2f6fc;box-shadow:0 4px 14px rgba(10,20,60,.06),0 0 0 1px rgba(26,86,219,.12),0 0 18px rgba(26,86,219,.18)}
  .sv-ih{display:flex;align-items:center;gap:.8rem}
  .sv-ic{width:36px;height:36px;border-radius:var(--r);background:#eef2f7;color:var(--navy2);
    display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s}
  .sv-item.act .sv-ic{background:var(--navy2);color:#dbeafe;box-shadow:0 0 0 1px rgba(147,197,253,.26),0 0 14px rgba(26,86,219,.22)}
  .sv-it{font-size:.86rem;font-weight:600;color:var(--black)}
  .sv-is{font-size:.74rem;color:var(--g4);margin-top:.08rem}
  .sv-det{position:sticky;top:calc(var(--nav-h) + 1.5rem)}
  .sv-img{border-radius:8px;overflow:hidden;margin-bottom:1.4rem;aspect-ratio:16/9}
  .sv-bul{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:.4rem;margin-top:.9rem}
  .sv-bul li{display:flex;align-items:center;gap:.4rem;font-size:.79rem;font-weight:500;color:var(--g6)}
  .sv-bul li::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--navy2);flex-shrink:0}
  @media(max-width:720px){.sv-wrap{grid-template-columns:1fr}.sv-det{position:static}}

  /* ── PROJECTS ── */
  .filter-row{display:flex;gap:.45rem;flex-wrap:wrap;margin-bottom:2rem}
  .filter-btn{padding:.42rem .95rem;border-radius:999px;font-size:.76rem;font-weight:600;
    cursor:pointer;border:1.5px solid var(--g3);background:#fff;color:var(--g5);
    transition:all .22s;box-shadow:0 1px 0 rgba(255,255,255,.8) inset}
  .filter-btn:hover{border-color:rgba(19,42,87,.45);color:var(--blue);background:#f7faff;transform:translateY(-1px)}
  .filter-btn.act{background:linear-gradient(135deg,#12316a 0%,var(--blue) 100%);color:#fff;
    border-color:transparent;box-shadow:0 10px 20px rgba(19,42,87,.22)}
  .pj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.1rem}
  .pj-card{border-radius:8px;overflow:hidden;border:1px solid var(--g2);background:#fff;transition:all .25s}
  .pj-card:hover{transform:translateY(-3px);box-shadow:var(--sh2)}
  .pj-img{aspect-ratio:4/3;overflow:hidden;position:relative}
  .pj-img img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
  .pj-card:hover .pj-img img{transform:scale(1.05)}
  .pj-tag-badge{position:absolute;top:.65rem;left:.65rem;background:rgba(4,7,13,.75);
    backdrop-filter:blur(6px);color:#fff;font-size:.6rem;font-weight:700;
    letter-spacing:.1em;text-transform:uppercase;padding:.22rem .55rem;border-radius:3px}
  .pj-body{padding:.95rem 1.1rem}
  .pj-type{font-size:.67rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--blue);margin-bottom:.28rem}
  .pj-title{font-size:.88rem;font-weight:700;color:var(--black)}
  .pj-meta{font-size:.75rem;color:var(--g4);margin-top:.18rem}
  @media(max-width:720px){.pj-grid{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:480px){.pj-grid{grid-template-columns:1fr}}
  @media(max-width:640px){.home-ref-preview{display:none}}

  /* ── TESTIMONIALS ── */
  .ts-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
  .ts-card{background:#fff;border-radius:8px;padding:1.5rem;border:1px solid var(--g2)}
  .stars{display:flex;gap:2px;margin-bottom:.85rem}
  .stars svg{color:#F59E0B;fill:#F59E0B}
  .ts-text{font-size:.85rem;color:var(--g6);line-height:1.72;margin-bottom:1.1rem;font-style:italic}
  .ts-au{display:flex;align-items:center;gap:.55rem;padding-top:.9rem;border-top:1px solid var(--g2)}
  .ts-av{width:32px;height:32px;border-radius:50%;background:var(--sky);color:var(--blue);
    display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:800;flex-shrink:0}
  .ts-nm{font-size:.8rem;font-weight:700;color:var(--black)}
  .ts-ro{font-size:.69rem;color:var(--g4);margin-top:.05rem}
  @media(max-width:720px){.ts-grid{grid-template-columns:1fr 1fr}}
  @media(max-width:480px){.ts-grid{grid-template-columns:1fr}}

  /* ── MEDARBETARE + FLER FRÅGOR ── */
  .fq-wrap{display:grid;grid-template-columns:minmax(0,278px) minmax(0,1fr);gap:clamp(1.5rem,3vw,2.75rem);align-items:start}
  .fq-aside{background:var(--navy2);border-radius:8px;padding:1.6rem;position:sticky;top:calc(var(--nav-h) + 1.5rem)}
  .fq-aside h3{font-family:var(--serif);font-size:1.15rem;color:#fff;margin-bottom:.55rem}
  .fq-aside p{font-size:.8rem;color:rgba(255,255,255,.42);line-height:1.7;margin-bottom:1.3rem}
  .fq-ci{display:flex;align-items:center;gap:.55rem;font-size:.8rem;color:rgba(255,255,255,.62);margin-bottom:.65rem}
  .fq-ci svg{color:#93C5FD;flex-shrink:0}
  .team-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.5rem 1.85rem;width:100%;min-width:0}
  .team-card{border:1px solid var(--g2);border-radius:var(--r);background:#fff;display:flex;
    flex-direction:column;transition:border-color .2s,box-shadow .2s;overflow:hidden;height:100%}
  .team-card:focus-within,.team-card:hover{border-color:var(--g3);box-shadow:var(--sh)}
  .team-ph{position:relative;width:100%;aspect-ratio:5/6;overflow:hidden;background:var(--g2);
    display:flex;align-items:center;justify-content:center;color:var(--g4)}
  .team-ph img{width:100%;height:100%;object-fit:cover;object-position:center top}
  .team-ph svg{opacity:.5}
  .team-meta{display:flex;flex-direction:column;gap:.52rem;text-align:left;padding:.95rem 1.05rem 1.15rem;flex:1}
  .team-n{font-size:1.02rem;font-weight:700;color:var(--black);line-height:1.25;margin:0;
    font-family:var(--sans);letter-spacing:-.01em}
  .team-role{font-size:.84rem;color:var(--g6);font-weight:500;line-height:1.42;margin:0}
  .team-tel{font-size:.84rem;color:var(--g6);font-weight:400;line-height:1.42;text-decoration:none;
    transition:color .15s;margin:0;margin-top:.08rem;border:none}
  .team-tel:hover{color:var(--blue)}
  .team-mail{font-size:.76rem;color:var(--g5);font-weight:400;line-height:1.45;text-decoration:none;
    transition:color .15s;margin:0;margin-top:.12rem;word-break:break-word}
  .team-mail:hover{color:var(--blue)}
  @media(max-width:720px){.fq-wrap{grid-template-columns:1fr}.fq-aside{position:static}}

  /* ── CONTACT ── */
  .ct-wrap{display:grid;grid-template-columns:1fr 1.5fr;gap:3.5rem;align-items:start}
  .ct-row{display:flex;gap:.8rem;align-items:flex-start;padding:.95rem 0;border-bottom:1px solid var(--g2)}
  .ct-ic{width:36px;height:36px;background:var(--sky);border-radius:var(--r);
    display:flex;align-items:center;justify-content:center;color:var(--blue);flex-shrink:0}
  .ct-lbl{font-size:.66rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--g4);margin-bottom:.18rem}
  .ct-val{font-size:.88rem;font-weight:600;color:var(--black)}
  .hr-row{display:flex;justify-content:space-between;align-items:center;font-size:.83rem;color:var(--g5);padding:.38rem 0;border-bottom:1px solid var(--g2)}
  .hr-row:last-child{border-bottom:none}
  .cf{background:var(--g1);border-radius:8px;padding:2rem}
  .cf-title{font-family:var(--serif);font-size:1.3rem;color:var(--black);margin-bottom:1.35rem}
  .fr{display:grid;grid-template-columns:1fr 1fr;gap:.8rem;margin-bottom:.8rem}
  .fg{margin-bottom:.8rem}
  .fl{display:block;font-size:.7rem;font-weight:700;color:var(--g6);margin-bottom:.28rem;
    letter-spacing:.05em;text-transform:uppercase}
  .fi{width:100%;padding:.62rem .88rem;border:1.5px solid var(--g3);border-radius:var(--r);
    font-family:var(--sans);font-size:.86rem;color:var(--black);background:#fff;
    transition:border-color .2s,box-shadow .2s;outline:none;-webkit-appearance:none}
  .fi:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(26,86,219,.1)}
  textarea.fi{resize:vertical;min-height:100px}
  select.fi{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right .75rem center;padding-right:2rem}
  .fsub{width:100%;padding:.8rem;background:linear-gradient(135deg,#1A56DB 0%,#123ca3 100%);color:#fff;
    border:1px solid rgba(147,197,253,.3);border-radius:calc(var(--r) + 1px);font-size:.88rem;font-weight:700;cursor:pointer;
    transition:transform .2s,box-shadow .24s,filter .24s;margin-top:.25rem;letter-spacing:.02em;
    box-shadow:0 10px 24px rgba(19,42,87,.24),inset 0 1px 0 rgba(255,255,255,.18)}
  .fsub:hover{filter:brightness(1.04);transform:translateY(-2px);box-shadow:0 14px 30px rgba(19,42,87,.32)}
  .fsub:disabled{opacity:.7;cursor:not-allowed;transform:none;box-shadow:none}
  @media(max-width:720px){.ct-wrap{grid-template-columns:1fr;gap:2rem}.fr{grid-template-columns:1fr}}

  /* ── ABOUT ── */
  .ab-wrap{display:grid;grid-template-columns:1fr 1fr;gap:4.5rem;align-items:center}
  .ab-imgs{display:grid;grid-template-columns:1fr 1fr;gap:.85rem}
  .ab-main{grid-column:1/-1;border-radius:8px;overflow:hidden;aspect-ratio:16/9}
  .ab-sm{border-radius:8px;overflow:hidden;aspect-ratio:1}
  @media(max-width:720px){.ab-wrap{grid-template-columns:1fr;gap:2.5rem}}

  /* ── CTA BANNER ── */
  .ctab{background:linear-gradient(130deg,var(--navy) 0%,var(--navy2) 56%,#142a55 100%);
    padding:4.5rem 2rem;text-align:center;position:relative;overflow:hidden}
  .ctab::before{content:'';position:absolute;inset:0;
    background:radial-gradient(ellipse at 50% 120%,rgba(255,255,255,.04) 0%,transparent 55%)}
  .ctab h2{font-family:var(--serif);font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:400;
    color:#fff;margin-bottom:.8rem;line-height:1.1;position:relative}
  .ctab:not(:has(> p)) h2{margin-bottom:1.5rem}
  .ctab:not(:has(> p)){padding:3.85rem 2rem}
  .ctab p{font-size:.92rem;color:rgba(255,255,255,.6);margin-bottom:1.85rem;line-height:1.75;
    max-width:500px;margin-left:auto;margin-right:auto;position:relative}
  .ctab-btns{display:flex;justify-content:center;gap:.75rem;flex-wrap:wrap;position:relative}

  /* ── INFO BOX ── */
  .infobox{background:var(--sky);border:1px solid rgba(26,86,219,.14);border-radius:var(--r);padding:1.1rem 1.35rem}
  .infobox p{font-size:.83rem;color:var(--navy2);line-height:1.65}

  /* ── TRUST TAGS ── */
  .trust-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:1.5rem}
  .tt{display:inline-flex;align-items:center;gap:.35rem;font-size:.74rem;font-weight:600;
    color:var(--g6);background:#fff;border:1px solid var(--g2);padding:.3rem .75rem;border-radius:3px}

  /* ── SECURE SECTION ── */
  .sec-box{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);
    border-radius:var(--r);padding:1.2rem;display:flex;gap:.8rem;align-items:flex-start}
  .sec-box-ic{width:34px;height:34px;background:rgba(26,86,219,.3);border-radius:var(--r);
    display:flex;align-items:center;justify-content:center;color:#93C5FD;flex-shrink:0;margin-top:.1rem}
  .sec-box-t{font-size:.84rem;font-weight:700;color:#fff;margin-bottom:.28rem}
  .sec-box-d{font-size:.77rem;color:rgba(255,255,255,.42);line-height:1.6}

  /* ── FOOTER ── */
  .foot{background:var(--black);padding:3.5rem 0 2rem}
  .fg4{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:2.5rem;margin-bottom:2.5rem}
  .flogo{font-family:var(--serif);font-size:1.3rem;color:#fff;margin-bottom:.8rem;display:block}
  .flogo span{color:var(--blue)}
  .ftag{font-size:.8rem;color:rgba(255,255,255,.27);line-height:1.72;max-width:230px}
  .f-gvk-cta{display:inline-flex;align-items:center;justify-content:center;margin-top:.85rem;
    min-height:48px;padding:.45rem .6rem;text-decoration:none;background:#fff;border-radius:12px;
    border:1px solid rgba(255,255,255,.14);box-shadow:0 2px 10px rgba(0,0,0,.14);
    transition:transform .2s, box-shadow .2s;line-height:0}
  .f-gvk-cta:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(0,0,0,.22)}
  .f-gvk-cta:focus-visible{outline:2px solid var(--blue);outline-offset:3px}
  .f-gvk-cta img{width:48px;height:48px;object-fit:contain;object-position:center;
    display:block;border-radius:8px;-webkit-user-drag:none;user-select:none}
  .fc h4{font-size:.62rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
    color:rgba(255,255,255,.22);margin-bottom:.95rem}
  .fc ul{list-style:none}
  .fc ul li+li{margin-top:.55rem}
  .fc ul li button{font-size:.82rem;color:rgba(255,255,255,.42);background:none;border:none;
    cursor:pointer;padding:0;transition:color .2s;text-align:left}
  .fc ul li button:hover{color:#fff}
  .fcr{display:flex;align-items:flex-start;gap:.45rem;font-size:.78rem;color:rgba(255,255,255,.32);margin-bottom:.55rem}
  .fcr svg{flex-shrink:0;color:var(--blue);margin-top:1px}
  .fbot{border-top:1px solid rgba(255,255,255,.05);padding-top:1.5rem;
    display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.75rem}
  .fcopy{font-size:.72rem;color:rgba(255,255,255,.18)}
  .fadmin-link{font-size:.68rem;color:rgba(255,255,255,.14);background:none;border:none;cursor:pointer;padding:0;transition:color .2s}
  .fadmin-link:hover{color:rgba(255,255,255,.4)}
  @media(max-width:860px){.fg4{grid-template-columns:1fr 1fr}}
  @media(max-width:480px){.fg4{grid-template-columns:1fr}}

  /* ════════════════════════════
     ADMIN PANEL
  ════════════════════════════ */
  .adm{min-height:100vh;background:var(--g1);font-family:var(--sans)}
  .adm-top{background:var(--navy);padding:0 2rem;height:60px;display:flex;align-items:center;justify-content:space-between}
  .adm-logo{font-family:var(--serif);font-size:1.2rem;color:#fff}
  .adm-logo span{color:#93C5FD}
  .adm-top-right{display:flex;align-items:center;gap:1rem}
  .adm-site-btn{font-size:.76rem;color:rgba(255,255,255,.55);background:none;border:none;cursor:pointer;
    display:flex;align-items:center;gap:.35rem;transition:color .2s}
  .adm-site-btn:hover{color:#fff}
  .adm-logout{display:flex;align-items:center;gap:.35rem;font-size:.76rem;color:rgba(255,255,255,.55);
    background:none;border:none;cursor:pointer;transition:color .2s}
  .adm-logout:hover{color:#ff6b6b}

  .adm-body{max-width:1100px;margin:0 auto;padding:2rem}
  .adm-tabs{display:flex;gap:.35rem;background:#fff;border:1px solid var(--g2);border-radius:var(--r);
    padding:.3rem;margin-bottom:2rem;width:fit-content}
  .adm-tab{padding:.5rem 1.25rem;border-radius:4px;font-size:.82rem;font-weight:600;cursor:pointer;
    background:none;border:none;color:var(--g5);transition:all .2s;display:flex;align-items:center;gap:.45rem}
  .adm-tab.act{background:var(--blue);color:#fff}
  .adm-tab:hover:not(.act){background:var(--g1);color:var(--black)}

  /* Quotes */
  .quote-list{display:flex;flex-direction:column;gap:.75rem}
  .quote-card{background:#fff;border:1px solid var(--g2);border-radius:var(--r);overflow:hidden;transition:border-color .2s}
  .quote-card.unread{border-left:3px solid var(--blue)}
  .quote-hdr{padding:1rem 1.25rem;display:flex;align-items:center;justify-content:space-between;
    gap:1rem;cursor:pointer;flex-wrap:wrap}
  .quote-hdr:hover{background:var(--g1)}
  .quote-name{font-size:.9rem;font-weight:700;color:var(--black)}
  .quote-meta{font-size:.75rem;color:var(--g4);margin-top:.15rem}
  .quote-badges{display:flex;align-items:center;gap:.5rem;flex-shrink:0}
  .q-badge{font-size:.62rem;font-weight:700;letter-spacing:.08em;padding:.2rem .55rem;border-radius:3px}
  .q-badge-new{background:var(--sky);color:var(--blue)}
  .q-badge-read{background:var(--g2);color:var(--g4)}
  .quote-body{padding:0 1.25rem 1.25rem;border-top:1px solid var(--g2);margin-top:0}
  .quote-body.hidden{display:none}
  .quote-fields{display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;margin-bottom:1rem;margin-top:1rem}
  .qf{display:flex;flex-direction:column;gap:.18rem}
  .qf-label{font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--g4)}
  .qf-val{font-size:.84rem;font-weight:600;color:var(--black)}
  .q-msg{background:var(--g1);border:1px solid var(--g2);border-radius:var(--r);
    padding:.9rem;font-size:.84rem;color:var(--g6);line-height:1.65;margin-bottom:1rem}
  .quote-actions{display:flex;gap:.5rem}
  .q-date{font-size:.68rem;color:var(--g4);background:var(--g1);padding:.18rem .45rem;border-radius:3px}
  .empty-state{text-align:center;padding:4rem 2rem;color:var(--g4)}
  .empty-state svg{margin:0 auto 1rem;color:var(--g3)}
  .empty-state p{font-size:.9rem}

  /* Gallery Admin */
  .gal-add{background:#fff;border:1px solid var(--g2);border-radius:var(--r);padding:1.5rem;margin-bottom:2rem}
  .gal-add h3{font-size:.9rem;font-weight:700;color:var(--black);margin-bottom:1rem}
  .gal-add-row{display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:.75rem;align-items:end}
  .gal-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
  .gal-card{background:#fff;border:1px solid var(--g2);border-radius:var(--r);overflow:hidden;position:relative}
  .gal-img{aspect-ratio:4/3;overflow:hidden}
  .gal-img img{width:100%;height:100%;object-fit:cover;transition:transform .4s}
  .gal-card:hover .gal-img img{transform:scale(1.04)}
  .gal-info{padding:.85rem}
  .gal-title{font-size:.84rem;font-weight:700;color:var(--black)}
  .gal-type{font-size:.72rem;color:var(--blue);font-weight:600;text-transform:uppercase;letter-spacing:.08em}
  .gal-meta{font-size:.72rem;color:var(--g4);margin-top:.12rem}
  .gal-del{position:absolute;top:.5rem;right:.5rem;background:rgba(220,38,38,.9);
    color:#fff;border:none;border-radius:4px;width:28px;height:28px;cursor:pointer;
    display:flex;align-items:center;justify-content:center;transition:all .2s;
    opacity:0}
  .gal-card:hover .gal-del{opacity:1}
  @media(max-width:720px){.gal-grid{grid-template-columns:1fr 1fr}.gal-add-row{grid-template-columns:1fr}}
  @media(max-width:480px){.gal-grid{grid-template-columns:1fr}}
  .quote-fields{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:.75rem;margin-top:1rem;margin-bottom:1rem}

  /* Login */
  .login-wrap{min-height:100vh;background:var(--navy);display:flex;align-items:center;justify-content:center;padding:2rem}
  .login-box{background:#fff;border-radius:10px;padding:2.5rem;width:100%;max-width:380px;box-shadow:var(--sh2)}
  .login-logo{font-family:var(--serif);font-size:1.4rem;color:var(--black);text-align:center;margin-bottom:1.5rem}
  .login-logo span{color:var(--blue)}
  .login-title{font-size:.9rem;font-weight:700;color:var(--black);margin-bottom:.25rem;text-align:center}
  .login-sub{font-size:.78rem;color:var(--g4);text-align:center;margin-bottom:1.75rem}
  .pw-wrap{position:relative}
  .pw-toggle{position:absolute;right:.75rem;top:50%;transform:translateY(-50%);
    background:none;border:none;color:var(--g4);cursor:pointer;padding:.15rem}
  .login-err{background:#FEF2F2;border:1px solid #FECACA;border-radius:var(--r);
    padding:.65rem .9rem;font-size:.8rem;color:var(--red);margin-bottom:1rem;
    display:flex;align-items:center;gap:.45rem}

  /* Toast */
  .toast{position:fixed;bottom:1.5rem;right:1.5rem;z-index:999;
    background:var(--black);color:#fff;padding:.75rem 1.25rem;border-radius:var(--r);
    font-size:.82rem;font-weight:600;display:flex;align-items:center;gap:.5rem;
    box-shadow:var(--sh2);animation:toastIn .25s ease both}
  .toast.success svg{color:#4ade80}
  .toast.error svg{color:#f87171}
  @keyframes toastIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

  /* ── MOBILE / SMALL SCREENS (global polish) ── */
  @media(max-width:640px){
    html{font-size:15px}
    .nav-in{padding:0 1.15rem}
    .logo-btn{font-size:1.12rem}
    .bcrumb-in{padding:0 1.15rem}
    .ticker-item{padding:0 1.15rem;font-size:.66rem;letter-spacing:.04em}
    .phdr{padding:3rem 0 2.25rem}
    .phdr h1{font-size:clamp(1.75rem,6.5vw,2.4rem)}
    .phdr p{font-size:.88rem;max-width:none}
    .hero{
      height:auto;
      min-height:min(88dvh, 580px);
      padding:1.25rem 0 5.25rem;
      align-items:flex-start;
    }
    .hcon{padding:0 1.15rem}
    .hbadge{font-size:.58rem;padding:.32rem .72rem;margin-bottom:1rem;letter-spacing:.12em;max-width:100%;flex-wrap:wrap}
    .hero h1{
      font-size:clamp(1.85rem,7vw,2.65rem);
      max-width:none;
      margin-bottom:.85rem;
    }
    .hero-sub{
      max-width:none;
      font-size:.86rem;
      line-height:1.75;
      padding-left:.65rem;
      margin-bottom:1.35rem;
    }
    .hbtns{margin-bottom:1.75rem;flex-direction:column;width:100%}
    .hbtns .btn{width:100%;justify-content:center;min-height:46px}
    .hmask{
      width:min(640px,100vw);
      height:46%;
      bottom:-12%;
      filter:blur(6px);
    }
    .hcerts-in{padding:.55rem 1.15rem;gap:1.25rem}
    .hci-name{max-width:42vw;white-space:normal;line-height:1.25}
    .sbar .stat{padding:1.1rem .45rem}
    .sbar .sv{font-size:1.35rem}
    .sbar .sl{font-size:.52rem;letter-spacing:.06em}
    .sh{align-items:flex-start;flex-direction:column;gap:.75rem;margin-bottom:1.6rem}
    .sh .btn{width:100%;justify-content:center;min-height:46px}
    .lead{max-width:none;font-size:.9rem}
    .sv-bul{grid-template-columns:1fr}
    .sv-item{min-height:52px}
    .sv-det .sv-img{margin-bottom:1rem}
    .sv-det h3{font-size:1.15rem!important}
    .sv-det > div:last-of-type{flex-direction:column!important;width:100%;gap:.5rem!important}
    .sv-det > div:last-of-type .btn{width:100%;justify-content:center;min-height:46px}
    .filter-row{gap:.35rem}
    .filter-btn{padding:.45rem .65rem;font-size:.72rem}
    .ctab{padding:3rem 1.15rem}
    .ctab:not(:has(> p)){padding:2.85rem 1.15rem}
    .ctab h2{font-size:clamp(1.45rem,6vw,2rem)}
    .ctab:not(:has(> p)) h2{margin-bottom:1.35rem}
    .ctab p{font-size:.86rem;max-width:none;margin-bottom:1.35rem}
    .ctab-btns{flex-direction:column;width:100%;max-width:320px;margin:0 auto}
    .ctab-btns .btn{width:100%;justify-content:center;min-height:48px}
    .cf{padding:1.35rem}
    .fsub{min-height:48px;padding:.85rem}
    .infobox{padding:1rem}
    .foot{padding:2.75rem 0 1.75rem}
    .fg4{gap:1.75rem}
    .flogo{font-size:1.15rem}
    .ftag{max-width:none;font-size:.78rem;line-height:1.65}
    .fbot{flex-direction:column;align-items:flex-start;gap:.65rem}
    .toast{left:1rem;right:1rem;bottom:1rem}
    .adm-top{padding:0 1rem}
    .adm-body{padding:1.15rem}
    .adm-tabs{flex-wrap:wrap;width:100%;max-width:100%}
    .adm-tab{flex:1;justify-content:center;min-height:44px;padding:.5rem .75rem}
    .team-list{grid-template-columns:1fr;gap:1.25rem}
  }

  @media(max-width:400px){
    .sgrid{grid-template-columns:repeat(2,1fr);border-left:none}
    .stat{border-right:none;border-bottom:1px solid rgba(255,255,255,.05)}
    .stat:last-child{border-bottom:none}
  }

  @media(prefers-reduced-motion:reduce){
    .ticker-track{animation:none}
    .hcerts-track{animation:none}
    .page-enter{animation:none}
    .hvid{display:none}
  }
`;

/* ══════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════ */
function Toast({ msg, type, onHide }) {
  useEffect(() => { const t = setTimeout(onHide, 3000); return () => clearTimeout(t); }, []);
  return (
    <div className={`toast ${type}`}>
      {type === "success" ? <Check size={15}/> : <AlertTriangle size={15}/>}
      {msg}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   NAV + FOOTER + BREADCRUMB
══════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  {id:"home",label:"Hem"},
  {id:"tjanster",label:"Tjänster"},
  {id:"om-oss",label:"Om oss"},
  {id:"projekt",label:"Projekt"},
  {id:"medarbetare",label:"Medarbetare"},
];

function Nav({ page, navigate, menuOpen, setMenuOpen }) {
  const isHome = page === "home";
  return (
    <>
      <div className={`mob ${menuOpen ? "open" : ""}`}>
        <div className="mob-top">
          <span className="mob-logo"><span>Golv</span>Gruppen</span>
          <button className="mob-x" onClick={() => setMenuOpen(false)}><X size={22}/></button>
        </div>
        <nav className="mob-links">
          {NAV_ITEMS.map(l => (
            <button key={l.id} className={`mob-btn ${page===l.id?"act":""}`}
              onClick={() => { navigate(l.id); setMenuOpen(false); }}>
              {l.label}<ChevronRight size={14}/>
            </button>
          ))}
        </nav>
        <button className="mob-cta" onClick={() => { navigate("kontakt"); setMenuOpen(false); }}>
          Begär offert
        </button>
      </div>
      <header className={`nav ${!isHome ? "light" : ""}`}>
        <div className="nav-in">
          <button className="logo-btn" onClick={() => navigate("home")}>
            <span className="logo-blue">Golv</span>Gruppen
          </button>
          <nav className="nl">
            {NAV_ITEMS.map(l => (
              <button key={l.id} className={`nl-btn ${page===l.id?"act":""}`} onClick={() => navigate(l.id)}>
                {l.label}
              </button>
            ))}
          </nav>
          <div className="nav-right">
            <button className="nav-cta" onClick={() => navigate("kontakt")}>Begär offert</button>
            <button className="nmb" onClick={() => setMenuOpen(true)}><Menu size={22}/></button>
          </div>
        </div>
      </header>
    </>
  );
}

function Breadcrumb({ label, navigate }) {
  return (
    <div className="bcrumb">
      <div className="bcrumb-in">
        <button className="bcrumb-home" onClick={() => navigate("home")}>
          <ArrowLeft size={12}/> Startsidan
        </button>
        <span className="bcrumb-sep">/</span>
        <span className="bcrumb-current">{label}</span>
      </div>
    </div>
  );
}

function Ticker() {
  const items = Array.from({ length: 12 }, () => "GolvGruppen");
  const all = [...items, ...items];
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {all.map((t, i) => <span key={i} className="ticker-item"><span className="ticker-dot"/>{t}</span>)}
      </div>
    </div>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="foot">
      <div className="w">
        <div className="fg4">
          <div>
            <span className="flogo"><span>Golv</span>Gruppen</span>
            <p className="ftag">GVK-auktoriserad golvspecialist i Örebro län.</p>
            <a
              className="f-gvk-cta"
              href="https://www.gvk.se/branschregler/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/gvk-logo.png" alt="GVK — branschregler för våtrum" width="48" height="48" loading="lazy" decoding="async" />
            </a>
          </div>
          <div className="fc">
            <h4>Tjänster</h4>
            <ul>{["Badrum","Trägolv","Mattläggning","Plattsättning","Golvavjämning / EPS"].map(t=>(
              <li key={t}><button onClick={()=>navigate("tjanster")}>{t}</button></li>
            ))}</ul>
          </div>
          <div className="fc">
            <h4>Företaget</h4>
            <ul>
              <li><button onClick={()=>navigate("om-oss")}>Om oss</button></li>
              <li><button onClick={()=>navigate("projekt")}>Projekt</button></li>
              <li><button onClick={()=>navigate("medarbetare")}>Medarbetare</button></li>
              <li><button onClick={()=>navigate("kontakt")}>Kontakt</button></li>
            </ul>
          </div>
          <div className="fc">
            <h4>Kontakt</h4>
            <div className="fcr"><Phone size={12}/><span>073-309 16 95</span></div>
            <div className="fcr"><Mail size={12}/><span>info@ggruppen.se</span></div>
            <div className="fcr"><MapPin size={12}/><span>Smedstorpsvägen 2, 702 30 Örebro</span></div>
          </div>
        </div>
        <div className="fbot">
          <span className="fcopy">© {new Date().getFullYear()} GolvGruppen Örebro AB · Org.nr 59416-5549 · F-Skatt</span>
          <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
            <button className="fadmin-link" onClick={()=>navigate("admin")}>Admin</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════
   ADMIN PANEL
══════════════════════════════════════════════════════ */
function AdminLogin({ onLogin }) {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  const submit = () => {
    if (pw === ADMIN_PASSWORD) { onLogin(); }
    else { setErr(true); setPw(""); setTimeout(() => setErr(false), 2500); }
  };
  return (
    <div className="login-wrap">
      <div className="login-box">
        <div className="login-logo"><span>Golv</span>Gruppen</div>
        <div className="login-title">Administrationspanel</div>
        <div className="login-sub">Logga in för att hantera offertförfrågningar och projektgalleri</div>
        {err && <div className="login-err"><AlertTriangle size={14}/>Fel lösenord. Försök igen.</div>}
        <div className="fg">
          <label className="fl">Lösenord</label>
          <div className="pw-wrap">
            <input className="fi" type={show?"text":"password"} value={pw}
              onChange={e=>setPw(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&submit()}
              placeholder="Ange lösenord" autoFocus/>
            <button className="pw-toggle" onClick={()=>setShow(!show)}>
              {show?<EyeOff size={16}/>:<Eye size={16}/>}
            </button>
          </div>
        </div>
        <button className="fsub" onClick={submit}>Logga in</button>
      </div>
    </div>
  );
}

function QuoteCard({ q, onDelete, onRead }) {
  const [open, setOpen] = useState(false);
  const d = new Date(q.date);
  const dateStr = d.toLocaleDateString("sv-SE",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});
  return (
    <div className={`quote-card ${!q.read?"unread":""}`}>
      <div className="quote-hdr" onClick={()=>{setOpen(!open);if(!q.read)onRead(q.id);}}>
        <div>
          <div className="quote-name">{q.fornamn} {q.efternamn}</div>
          <div className="quote-meta">{q.epost} · {q.telefon}{q.org?` · ${q.org}`:""}</div>
        </div>
        <div className="quote-badges">
          <span className="q-date">{dateStr}</span>
          <span className={`q-badge ${!q.read?"q-badge-new":"q-badge-read"}`}>{!q.read?"Ny":"Läst"}</span>
          <ChevronDown size={16} color="var(--g4)" style={{transition:"transform .2s",transform:open?"rotate(180deg)":"none"}}/>
        </div>
      </div>
      {open && (
        <div className="quote-body">
          <div className="quote-fields">
            {q.tjanst&&<div className="qf"><span className="qf-label">Tjänst</span><span className="qf-val">{q.tjanst}</span></div>}
            {q.yta&&<div className="qf"><span className="qf-label">Yta</span><span className="qf-val">{q.yta}</span></div>}
            {q.arendetyp&&<div className="qf"><span className="qf-label">Ärendetyp</span><span className="qf-val">{q.arendetyp}</span></div>}
          </div>
          {q.meddelande&&<div className="q-msg">{q.meddelande}</div>}
          <div className="quote-actions">
            <a href={`mailto:${q.epost}`} className="btn bp" style={{fontSize:".76rem",textDecoration:"none"}}>
              <Mail size={13}/> Svara via e-post
            </a>
            <button className="btn bdanger" style={{fontSize:".76rem"}} onClick={()=>onDelete(q.id)}>
              <Trash2 size={13}/> Ta bort
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminPanel({ navigate }) {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("quotes");
  const [quotes, setQuotes] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [newP, setNewP] = useState({title:"",type:"",area:"",tag:"Privat",img:""});

  const showToast = (msg, type="success") => {
    setToast({msg,type});
    setTimeout(()=>setToast(null),3200);
  };

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    Promise.all([loadQuotes(), loadProjects()])
      .then(([q, p]) => { setQuotes(q); setProjects(p); })
      .finally(() => setLoading(false));
  }, [authed]);

  const handleDelete = async (id) => {
    if (!confirm("Ta bort denna offertförfrågan?")) return;
    await deleteQuote(id);
    setQuotes(qs => qs.filter(q => q.id !== id));
    showToast("Offert borttagen");
  };
  const handleRead = async (id) => {
    await markRead(id);
    setQuotes(qs => qs.map(q => q.id===id?{...q,read:true}:q));
  };
  const handleDeleteProject = async (id) => {
    if (!confirm("Ta bort detta projekt?")) return;
    const updated = projects.filter(p => p.id !== id);
    await saveProjects(updated);
    setProjects(updated);
    showToast("Projekt borttaget");
  };
  const handleAddProject = async () => {
    if (!newP.title || !newP.img) { showToast("Titel och bild-URL krävs","error"); return; }
    const p = { ...newP, id: "p" + Date.now() };
    const updated = [p, ...projects];
    await saveProjects(updated);
    setProjects(updated);
    setNewP({title:"",type:"",area:"",tag:"Privat",img:""});
    showToast("Projekt tillagt!");
  };

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)}/>;
  const unread = quotes.filter(q => !q.read).length;

  return (
    <div className="adm page-enter">
      {toast && <Toast msg={toast.msg} type={toast.type} onHide={()=>setToast(null)}/>}
      <div className="adm-top">
        <span className="adm-logo"><span>Golv</span>Gruppen &nbsp;<span style={{fontSize:".7rem",opacity:.4,fontFamily:"var(--sans)",fontWeight:500}}>Admin</span></span>
        <div className="adm-top-right">
          <button className="adm-site-btn" onClick={()=>navigate("home")}>
            <ExternalLink size={13}/> Visa webbplats
          </button>
          <button className="adm-logout" onClick={()=>setAuthed(false)}>
            <LogOut size={13}/> Logga ut
          </button>
        </div>
      </div>
      <div className="adm-body">
        <div style={{marginBottom:"1.75rem"}}>
          <h1 style={{fontFamily:"var(--serif)",fontSize:"1.8rem",color:"var(--black)",fontWeight:400}}>Administrationspanel</h1>
          <p style={{fontSize:".85rem",color:"var(--g5)",marginTop:".25rem"}}>Hantera offertförfrågningar och projektgalleri.</p>
        </div>

        <div style={{display:"flex",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"}}>
          {[{icon:<Inbox size={18}/>,label:"Offertförfrågningar",val:quotes.length,sub:`${unread} olästa`,color:"var(--blue)"},
            {icon:<Image size={18}/>,label:"Projekt i galleri",val:projects.length,sub:"Aktiva",color:"var(--green)"}].map((s,i)=>(
            <div key={i} style={{background:"#fff",border:"1px solid var(--g2)",borderRadius:"var(--r)",padding:"1.25rem 1.5rem",display:"flex",alignItems:"center",gap:"1rem",flex:"1",minWidth:180}}>
              <div style={{width:42,height:42,background:`${s.color}15`,borderRadius:"var(--r)",display:"flex",alignItems:"center",justifyContent:"center",color:s.color}}>{s.icon}</div>
              <div>
                <div style={{fontSize:"1.5rem",fontFamily:"var(--serif)",color:"var(--black)",lineHeight:1}}>{s.val}</div>
                <div style={{fontSize:".72rem",fontWeight:600,color:"var(--g4)",marginTop:".2rem",textTransform:"uppercase",letterSpacing:".08em"}}>{s.label}</div>
                <div style={{fontSize:".68rem",color:s.color,fontWeight:600,marginTop:".1rem"}}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="adm-tabs">
          <button className={`adm-tab ${tab==="quotes"?"act":""}`} onClick={()=>setTab("quotes")}>
            <Inbox size={14}/> Offertförfrågningar {unread>0&&<span style={{background:"#EF4444",color:"#fff",borderRadius:"10px",padding:"0 .4rem",fontSize:".65rem",fontWeight:800}}>{unread}</span>}
          </button>
          <button className={`adm-tab ${tab==="gallery"?"act":""}`} onClick={()=>setTab("gallery")}>
            <Image size={14}/> Fotogalleri
          </button>
        </div>

        {loading ? (
          <div style={{textAlign:"center",padding:"3rem",color:"var(--g4)"}}>
            <RefreshCw size={24} style={{animation:"spin 1s linear infinite",margin:"0 auto .75rem"}}/>
            <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
            <p style={{fontSize:".85rem"}}>Laddar...</p>
          </div>
        ) : tab === "quotes" ? (
          <div className="quote-list">
            {quotes.length === 0 ? (
              <div className="empty-state">
                <Inbox size={40}/>
                <p>Inga offertförfrågningar ännu.<br/><span style={{fontSize:".8rem"}}>Nya förfrågningar dyker upp här när kunder skickar formuläret.</span></p>
              </div>
            ) : quotes.map(q => (
              <QuoteCard key={q.id} q={q} onDelete={handleDelete} onRead={handleRead}/>
            ))}
          </div>
        ) : (
          <>
            <div className="gal-add">
              <h3>Lägg till nytt projekt</h3>
              <div className="gal-add-row">
                <div className="fg" style={{margin:0}}>
                  <label className="fl">Titel *</label>
                  <input className="fi" placeholder="Villa i Örebro" value={newP.title} onChange={e=>setNewP({...newP,title:e.target.value})}/>
                </div>
                <div className="fg" style={{margin:0}}>
                  <label className="fl">Tjänst</label>
                  <input className="fi" placeholder="Parkettslipning" value={newP.type} onChange={e=>setNewP({...newP,type:e.target.value})}/>
                </div>
                <div className="fg" style={{margin:0}}>
                  <label className="fl">Yta</label>
                  <input className="fi" placeholder="120 m²" value={newP.area} onChange={e=>setNewP({...newP,area:e.target.value})}/>
                </div>
                <div className="fg" style={{margin:0}}>
                  <label className="fl">Kategori</label>
                  <select className="fi" value={newP.tag} onChange={e=>setNewP({...newP,tag:e.target.value})}>
                    {["Privat","Kommersiell","Offentlig sektor","Institutionell","Bostäder"].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="fg" style={{marginTop:".75rem",marginBottom:".75rem"}}>
                <label className="fl">Bild-URL *</label>
                <input className="fi" placeholder="https://images.unsplash.com/..." value={newP.img} onChange={e=>setNewP({...newP,img:e.target.value})}/>
              </div>
              <button className="btn bp" onClick={handleAddProject}><Plus size={14}/> Lägg till projekt</button>
            </div>
            <div className="gal-grid">
              {projects.map(p => (
                <div key={p.id} className="gal-card">
                  <div className="gal-img"><img src={p.img} alt={p.title} onError={e=>e.target.src="https://via.placeholder.com/400x300?text=Bild+saknas"}/></div>
                  <div className="gal-info">
                    <div className="gal-type">{p.type}</div>
                    <div className="gal-title">{p.title}</div>
                    <div className="gal-meta">{p.area} · {p.tag}</div>
                  </div>
                  <button className="gal-del" onClick={()=>handleDeleteProject(p.id)}><Trash2 size={13}/></button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PAGES
══════════════════════════════════════════════════════ */
/**
 * Keep hero playback lightweight and smooth:
 * - loop one active source for seamless playback
 * - fallback to next source only on hard media error
 * - pause when tab is hidden to reduce background CPU usage
 */
function HeroLoopVideo() {
  const ref = useRef(null);
  const [srcIndex, setSrcIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const attemptsRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;
    const onVisibilityChange = () => {
      if (document.hidden) {
        el.pause();
        return;
      }
      void el.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [disabled, srcIndex]);

  const handleError = useCallback(() => {
    attemptsRef.current += 1;
    if (attemptsRef.current >= HERO_VIDEO_SOURCES.length) {
      setDisabled(true);
      return;
    }
    setSrcIndex(attemptsRef.current);
  }, []);

  if (disabled) return null;

  return (
    <video
      ref={ref}
      className="hvid"
      autoPlay
      muted
      playsInline
      preload="metadata"
      poster={HERO_POSTER}
      aria-hidden="true"
      loop
      src={HERO_VIDEO_SOURCES[srcIndex]}
      onError={handleError}
    />
  );
}

function HomePage({ navigate }) {
  const [activeSv, setActiveSv] = useState(0);
  return (
    <div className="page-enter">
      <section className="hero">
        <HeroLoopVideo />
        <div className="hov"/>
        <div className="hmask" aria-hidden="true"/>
        <div className="hcon">
          <div className="hbadge"><span className="hbadge-dot"/>Certifierad & Auktoriserad — Sverige</div>
          <h1>Kompletta lösningar inom<br/><em>golv & plattsättning</em></h1>
          <p className="hero-sub">Vi hjälper företag och privatpersoner med allt från trägolv och våtrum till storformat, golvavjämning och entreprenadprojekt – alltid med kvalitet och service i fokus.</p>
          <div className="hbtns">
            <button className="btn bp" onClick={()=>navigate("kontakt")}>Kontakta oss <ArrowRight size={15}/></button>
          </div>
        </div>
        <div className="hcerts-bar">
          <div className="hcerts-in">
            <div className="hcerts-track">
              {[...CERTS, ...CERTS].map((c, i) => (
                <div key={`${c.code}-${i}`} className="hci" aria-hidden={i >= CERTS.length}>
                  <span className="hci-code">{c.code}</span>
                  <span className="hci-name">{c.full}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="sbar">
        <div className="w">
          <div className="sgrid">
            {[{v:"90+",l:"Års erfarenhet",i:<Clock size={16}/>},{v:"600+",l:"Slutförda projekt",i:<CheckCircle2 size={16}/>},{v:"8",l:"Aktiva certifikat",i:<BadgeCheck size={16}/>},{v:"GVK",l:"Auktoriserat",i:<Shield size={16}/>},{v:"4.9★",l:"Snittbetyg",i:<Star size={16}/>}].map((s,i)=>(
              <div key={i} className="stat"><div className="sic">{s.i}</div><div className="sv">{s.v}</div><div className="sl">{s.l}</div></div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <section className="sec">
        <div className="w">
          <span className="lbl">Tjänster</span>
          <h2 className="h2" style={{marginBottom:".65rem"}}>Allt ditt golv behöver</h2>
          <p className="lead" style={{marginBottom:"2.5rem"}}>Komplett utbud för privatpersoner, bostadsrättsföreningar, kommuner och offentliga aktörer — med full dokumentation och regelefterlevnad.</p>
          <div className="sv-wrap">
            <div className="sv-list">
              {SERVICES.map((s,i)=>(
                <div key={i} className={`sv-item ${activeSv===i?"act":""}`} onClick={()=>setActiveSv(i)}>
                  <div className="sv-ih">
                    <div className="sv-ic">{s.icon}</div>
                    <div><div className="sv-it">{s.title}</div><div className="sv-is">{s.short}</div></div>
                    <ChevronRight size={14} style={{marginLeft:"auto",color:"var(--g3)"}}/>
                  </div>
                </div>
              ))}
            </div>
            <div className="sv-det">
              <div className="sv-img"><img src={SERVICES[activeSv].image} alt={SERVICES[activeSv].title}/></div>
              <span className="lbl">{SERVICES[activeSv].num} — {SERVICES[activeSv].title}</span>
              <h3 style={{fontFamily:"var(--serif)",fontSize:"1.3rem",color:"var(--black)",marginBottom:".55rem"}}>{SERVICES[activeSv].title}</h3>
              <p style={{fontSize:".88rem",color:"var(--g5)",lineHeight:1.75,marginBottom:".9rem"}}>{SERVICES[activeSv].desc}</p>
              <ul className="sv-bul">{SERVICES[activeSv].bullets.map((b,i)=><li key={i}>{b}</li>)}</ul>
              <div style={{marginTop:"1.35rem",display:"flex",gap:".65rem"}}>
                <button className="btn bo" style={{fontSize:".78rem"}} onClick={()=>navigate("tjanster")}>Mer info</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini projects — dold på mobil (≤640px); full lista under Projekt */}
      <section className="sec home-ref-preview" style={{background:"var(--g1)"}}>
        <div className="w">
          <div className="sh">
            <div><span className="lbl">Referensprojekt</span><h2 className="h2">Utvalda projekt</h2></div>
            <button className="btn bo" onClick={()=>navigate("projekt")}>Alla projekt <ArrowRight size={14}/></button>
          </div>
          <div className="pj-grid">
            {DEFAULT_PROJECTS.slice(0,3).map((p,i)=>(
              <div key={i} className="pj-card">
                <div className="pj-img"><img src={p.img} alt={p.title}/><span className="pj-tag-badge">{p.tag}</span></div>
                <div className="pj-body"><div className="pj-type">{p.type}</div><div className="pj-title">{p.title}</div><div className="pj-meta">{p.area}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="ctab">
        <h2>Redo att samarbeta?</h2>
        <p>Vi välkomnar uppdrag av alla storlekar — från privata hem till statliga institutioner.</p>
        <div className="ctab-btns">
          <button className="btn bw" onClick={()=>navigate("kontakt")}>Kontakta oss <ArrowRight size={15}/></button>
        </div>
      </div>
    </div>
  );
}

function AboutPage({ navigate }) {
  return (
    <div className="page-enter">
      <div className="phdr">
        <div className="w phdr-inner">
          <h1 className="phdr">Om företaget</h1>
          <p>Familjeägt golvföretag med rötter i Örebro, certifierad personal och uppdrag för privata såväl som institutionella beställare.</p>
        </div>
      </div>
      <Breadcrumb label="Om oss" navigate={navigate}/>
      <section className="sec">
        <div className="w">
          <div className="ab-wrap">
            <div className="ab-imgs">
              <div className="ab-main"><img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000" alt="Golv"/></div>
              <div className="ab-sm"><img src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80&w=600" alt="Slipning"/></div>
              <div className="ab-sm"><img src="https://images.unsplash.com/photo-1600607687940-47a000dfd39c?auto=format&fit=crop&q=80&w=600" alt="Mattläggning"/></div>
            </div>
            <div>
              <h2 className="h2" style={{marginBottom:".9rem"}}>Om oss</h2>
              <p className="lead" style={{marginBottom:".85rem"}}>Vi är ett familjärt och professionellt företag inom golv, plattsättning och våtrum med bas i Örebro. Vi hjälper privatpersoner, företag och offentlig verksamhet med hållbara och kvalitativa lösningar anpassade efter varje kunds behov.</p>
              <p style={{fontSize:".87rem",color:"var(--g5)",lineHeight:1.78,marginBottom:".85rem"}}>Med bred erfarenhet inom trägolv, badrum, mattläggning, plattsättning, golvavjämning och EPS-cement utför vi allt från mindre renoveringar till större entreprenader och nyproduktioner. Vi arbetar i bland annat bostäder, butiker, kontor, bilhallar och offentliga miljöer där höga krav ställs på kvalitet och noggrannhet.</p>
              <p style={{fontSize:".87rem",color:"var(--g5)",lineHeight:1.78,marginBottom:".85rem"}}>Som ett mindre och personligt företag kombinerar vi närhet, flexibilitet och engagemang med kapaciteten och kompetensen att hantera stora projekt och entreprenader. Det ger våra kunder det bästa av två världar – personlig service med resurserna och erfarenheten för att leverera professionella resultat i alla typer av projekt.</p>
              <p style={{fontSize:".87rem",color:"var(--g5)",lineHeight:1.78,marginBottom:"1.75rem"}}>För oss är det viktigt att varje kund känner sig trygg genom hela projektet. Därför lägger vi stor vikt vid personlig service, tydlig kommunikation och ett professionellt utfört arbete i varje detalj. Vi tror på långsiktiga relationer, hög kvalitet och hantverk som håller över tid.</p>
              <div style={{marginTop:"2rem",display:"flex",gap:".65rem",flexWrap:"wrap"}}>
                <button className="btn bp" onClick={()=>navigate("kontakt")}>Kontakta oss <ArrowRight size={14}/></button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="ctab">
        <h2>Hör av dig idag</h2>
        <div className="ctab-btns"><button className="btn bw" onClick={()=>navigate("kontakt")}>Kontakta oss <ArrowRight size={15}/></button></div>
      </div>
    </div>
  );
}

function TjansterPage({ navigate }) {
  const [active, setActive] = useState(0);
  return (
    <div className="page-enter">
      <div className="phdr">
        <div className="w phdr-inner">
          <h1 className="phdr">Våra tjänster</h1>
          <p>Komplett utbud för alla typer av uppdrag — privata, kommersiella och institutionella. Full dokumentation och regelefterlevnad ingår alltid.</p>
        </div>
      </div>
      <Breadcrumb label="Tjänster" navigate={navigate}/>
      <section className="sec">
        <div className="w">
          <div className="sv-wrap">
            <div className="sv-list">
              {SERVICES.map((s,i)=>(
                <div key={i} className={`sv-item ${active===i?"act":""}`} onClick={()=>setActive(i)}>
                  <div className="sv-ih">
                    <div className="sv-ic">{s.icon}</div>
                    <div><div className="sv-it">{s.title}</div><div className="sv-is">{s.short}</div></div>
                    <ChevronRight size={14} style={{marginLeft:"auto",color:"var(--g3)"}}/>
                  </div>
                </div>
              ))}
            </div>
            <div className="sv-det">
              <div className="sv-img"><img src={SERVICES[active].image} alt={SERVICES[active].title}/></div>
              <span className="lbl">{SERVICES[active].num} — {SERVICES[active].title}</span>
              <h3 style={{fontFamily:"var(--serif)",fontSize:"1.3rem",color:"var(--black)",marginBottom:".55rem"}}>{SERVICES[active].title}</h3>
              <p style={{fontSize:".88rem",color:"var(--g5)",lineHeight:1.75,marginBottom:".9rem"}}>{SERVICES[active].desc}</p>
              <ul className="sv-bul">{SERVICES[active].bullets.map((b,i)=><li key={i}>{b}</li>)}</ul>
              <div style={{marginTop:"1.35rem",display:"flex",gap:".65rem",flexWrap:"wrap"}}>
                <button className="btn bp" style={{fontSize:".78rem"}} onClick={()=>navigate("kontakt")}>Begär offert <ArrowRight size={13}/></button>
                <button className="btn bo" style={{fontSize:".78rem"}} onClick={()=>navigate("kontakt")}>Kontakta oss</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="ctab">
        <h2>Redo att komma igång?</h2>
        <div className="ctab-btns"><button className="btn bw" onClick={()=>navigate("kontakt")}>Kontakta oss <ArrowRight size={15}/></button></div>
      </div>
    </div>
  );
}

function ProjectsPage({ navigate }) {
  const [projects, setProjects] = useState(() => dedupeProjects(DEFAULT_PROJECTS));
  const [filter, setFilter] = useState("Alla");
  useEffect(() => { loadProjects().then(setProjects); }, []);
  const tags = ["Alla", ...new Set(projects.map(p => p.tag))];
  const filtered = filter === "Alla" ? projects : projects.filter(p => p.tag === filter);
  return (
    <div className="page-enter">
      <div className="phdr">
        <div className="w phdr-inner">
          <span className="lbl lbl-w">Portfolio</span>
          <h1 className="phdr">Referensprojekt</h1>
          <p>Från privata villor till statliga institutioner — genomförda projekt med dokumenterade resultat.</p>
        </div>
      </div>
      <Breadcrumb label="Projekt" navigate={navigate}/>
      <section className="sec">
        <div className="w">
          <div className="filter-row">
            {tags.map(t=><button key={t} className={`filter-btn ${filter===t?"act":""}`} onClick={()=>setFilter(t)}>{t}</button>)}
          </div>
          <div className="pj-grid">
            {filtered.map((p,i)=>(
              <div key={p.id||i} className="pj-card">
                <div className="pj-img"><img src={p.img} alt={p.title} onError={e=>e.target.src="https://via.placeholder.com/400x300?text=Bild+saknas"}/><span className="pj-tag-badge">{p.tag}</span></div>
                <div className="pj-body"><div className="pj-type">{p.type}</div><div className="pj-title">{p.title}</div><div className="pj-meta">{p.area}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="sec" style={{background:"var(--g1)"}}>
        <div className="w">
          <span className="lbl">Kundrecensioner</span>
          <h2 className="h2" style={{marginBottom:"2rem"}}>Vad beställarna säger</h2>
          <div className="ts-grid">
            {TESTIMONIALS.map((t,i)=>(
              <div key={i} className="ts-card">
                <div className="stars">{[...Array(t.stars)].map((_,j)=><Star key={j} size={12}/>)}</div>
                <p className="ts-text">"{t.text}"</p>
                <div className="ts-au">
                  <div className="ts-av">{t.name.split(" ").map(n=>n[0]).join("")}</div>
                  <div><div className="ts-nm">{t.name}</div><div className="ts-ro">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function telHref(tel) {
  const digits = tel.replace(/\D/g, "");
  if (!digits) return "#";
  if (digits.startsWith("0")) return `tel:+46${digits.slice(1)}`;
  return `tel:+${digits}`;
}

function TeamMemberCard({ member: m }) {
  const [imgBroken, setImgBroken] = useState(false);
  const showImg = Boolean(m.img && !imgBroken);
  return (
    <article className="team-card">
      <div className="team-ph" aria-hidden={showImg ? undefined : true}>
        {showImg ? (
          <img src={m.img} alt={`Porträtt: ${m.name}`} loading="lazy" decoding="async" onError={()=>setImgBroken(true)} />
        ) : (
          <User size={34} strokeWidth={1.5} />
        )}
      </div>
      <div className="team-meta">
        <h3 className="team-n">{m.name}</h3>
        {m.title ? <p className="team-role">{m.title}</p> : null}
        <a className="team-tel" href={telHref(m.tel)}>{m.tel}</a>
        <a className="team-mail" href={`mailto:${m.email}`}>{m.email}</a>
      </div>
    </article>
  );
}

function MedarbetarePage({ navigate }) {
  return (
    <div className="page-enter">
      <div className="phdr">
        <div className="w phdr-inner">
          <span className="lbl lbl-w">Vårt team</span>
          <h1 className="phdr">Medarbetare</h1>
          <p>Hitta rätt kontaktperson — vi hjälper dig vidare vid frågor, offert och projekt.</p>
        </div>
      </div>
      <Breadcrumb label="Medarbetare" navigate={navigate}/>
      <section className="sec">
        <div className="w">
          <div className="fq-wrap">
            <div className="fq-aside">
              <h3>Fler frågor</h3>
              <p>Vi svarar inom 24 timmar och tillhandahåller gärna dokumentation för upphandlingsändamål.</p>
              <div className="fq-ci"><Phone size={14}/><span>073-309 16 95</span></div>
              <div className="fq-ci"><Mail size={14}/><span>info@ggruppen.se</span></div>
              <div className="fq-ci"><Clock size={14}/><span>Mån–Fre 07:00–17:00</span></div>
              <button className="btn bp" style={{width:"100%",marginTop:"1rem",justifyContent:"center",fontSize:".78rem"}} onClick={()=>navigate("kontakt")}>
                Kontakta oss <ArrowRight size={13}/>
              </button>
              <div style={{marginTop:"1rem",padding:".9rem",background:"rgba(255,255,255,.05)",borderRadius:"var(--r)",border:"1px solid rgba(255,255,255,.07)"}}>
                <p style={{fontSize:".72rem",color:"rgba(255,255,255,.38)",lineHeight:1.6}}>
                  <strong style={{color:"rgba(255,255,255,.55)"}}>Upphandling:</strong> Vi tillhandahåller certifikatintyg och dokumentation på begäran.
                </p>
              </div>
            </div>
            <div className="team-list">
              {TEAM_MEMBERS.map((member, i) => (
                <TeamMemberCard key={`${member.email}-${i}`} member={member}/>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactPage({ navigate }) {
  const [form, setForm] = useState({fornamn:"",efternamn:"",telefon:"",epost:"",org:"",arendetyp:"",tjanst:"",yta:"",meddelande:""});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [toast, setToast] = useState(null);

  const update = (k,v) => setForm(f=>({...f,[k]:v}));
  const submit = async () => {
    if (!form.fornamn||!form.epost) { setToast({msg:"Förnamn och e-post krävs",type:"error"}); return; }
    setSending(true);
    const ok = await saveQuote(form);
    setSending(false);
    if (ok) setSent(true);
    else setToast({msg:"Kunde inte spara — försök igen",type:"error"});
  };

  return (
    <div className="page-enter">
      {toast && <Toast msg={toast.msg} type={toast.type} onHide={()=>setToast(null)}/>}
      <div className="phdr">
        <div className="w phdr-inner">
          <span className="lbl lbl-w">Kontakt</span>
          <h1 className="phdr">Hör av dig</h1>
          <p>Vi svarar inom 24 timmar. För upphandlingsfrågor eller dokumentationsförfrågningar — använd formuläret nedan.</p>
        </div>
      </div>
      <Breadcrumb label="Kontakt" navigate={navigate}/>
      <section className="sec">
        <div className="w">
          <div className="ct-wrap">
            <div>
              <span className="lbl">Kontaktuppgifter</span>
              {[{ic:<Phone size={16}/>,l:"Telefon",v:"073-309 16 95"},{ic:<Mail size={16}/>,l:"E-post",v:"info@ggruppen.se"},{ic:<MapPin size={16}/>,l:"Besöksadress",v:"Smedstorpsvägen 2, 702 30 Örebro"}].map((x,i)=>(
                <div key={i} className="ct-row">
                  <div className="ct-ic">{x.ic}</div>
                  <div><div className="ct-lbl">{x.l}</div><div className="ct-val">{x.v}</div></div>
                </div>
              ))}
              <div style={{marginTop:"1.75rem"}}>
                <h4 style={{fontSize:".68rem",fontWeight:700,color:"var(--g5)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:".85rem"}}>Öppettider</h4>
                <div className="hr-row"><span>Måndag – Fredag</span><span style={{fontWeight:700,color:"var(--black)"}}>07:00 – 17:00</span></div>
                <div className="hr-row"><span>Lördag</span><span style={{fontWeight:600,color:"var(--black)"}}>Tidsbokning</span></div>
                <div className="hr-row"><span>Söndag</span><span style={{color:"var(--g4)"}}>Stängt</span></div>
              </div>
              <div className="infobox" style={{marginTop:"1.75rem"}}>
                <p><strong>Upphandling & Offentlig sektor:</strong> Ange "Upphandling (LOU)" i ärendetypen så prioriterar vi din förfrågan och bifogar certifikatdokumentation i svaret.</p>
              </div>
            </div>
            <div className="cf">
              {sent ? (
                <div style={{textAlign:"center",padding:"3rem 1rem"}}>
                  <div style={{width:56,height:56,background:"#DCFCE7",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1.25rem"}}><Check size={26} color="#16A34A"/></div>
                  <h3 className="cf-title" style={{marginBottom:".5rem"}}>Tack för din förfrågan!</h3>
                  <p style={{fontSize:".88rem",color:"var(--g5)",lineHeight:1.7,marginBottom:"1.5rem"}}>Vi har mottagit din förfrågan och återkommer inom 24 timmar.</p>
                  <button className="btn bo" onClick={()=>setSent(false)}>Skicka ny förfrågan</button>
                </div>
              ) : (
                <>
                  <h3 className="cf-title">Skicka en förfrågan</h3>
                  <div className="fr">
                    <div className="fg"><label className="fl">Förnamn *</label><input className="fi" placeholder="Anders" value={form.fornamn} onChange={e=>update("fornamn",e.target.value)}/></div>
                    <div className="fg"><label className="fl">Efternamn</label><input className="fi" placeholder="Svensson" value={form.efternamn} onChange={e=>update("efternamn",e.target.value)}/></div>
                  </div>
                  <div className="fr">
                    <div className="fg"><label className="fl">Telefon</label><input className="fi" type="tel" placeholder="070-000 00 00" value={form.telefon} onChange={e=>update("telefon",e.target.value)}/></div>
                    <div className="fg"><label className="fl">E-post *</label><input className="fi" type="email" placeholder="din@email.se" value={form.epost} onChange={e=>update("epost",e.target.value)}/></div>
                  </div>
                  <div className="fg"><label className="fl">Organisation / Företag</label><input className="fi" placeholder="Frivilligt" value={form.org} onChange={e=>update("org",e.target.value)}/></div>
                  <div className="fr">
                    <div className="fg"><label className="fl">Ärendetyp</label>
                      <select className="fi" value={form.arendetyp} onChange={e=>update("arendetyp",e.target.value)}>
                        <option value="">Välj...</option>
                        {["Kostnadsfri besiktning & offert","Parkettslipning","Golvläggning","Mattläggning & Våtrum","Kommersiellt projekt","Upphandling (LOU)","Dokumentationsförfrågan","Annat"].map(o=><option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div className="fg"><label className="fl">Ungefärlig yta</label><input className="fi" placeholder="t.ex. 200 m²" value={form.yta} onChange={e=>update("yta",e.target.value)}/></div>
                  </div>
                  <div className="fg"><label className="fl">Meddelande</label><textarea className="fi" placeholder="Beskriv ert uppdrag, krav eller önskemål..." value={form.meddelande} onChange={e=>update("meddelande",e.target.value)}></textarea></div>
                  <button className="fsub" onClick={submit} disabled={sending}>
                    {sending?"Skickar...":"Skicka förfrågan →"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useCallback((p) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({top:0,behavior:"instant"});
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  if (page === "admin") {
    return (
      <>
        <style>{G}</style>
        <style>{CSS}</style>
        <AdminPanel navigate={navigate}/>
      </>
    );
  }

  const pages = {
    home:       <HomePage navigate={navigate}/>,
    tjanster:   <TjansterPage navigate={navigate}/>,
    "om-oss":   <AboutPage navigate={navigate}/>,
    projekt:    <ProjectsPage navigate={navigate}/>,
    medarbetare: <MedarbetarePage navigate={navigate}/>,
    kontakt:    <ContactPage navigate={navigate}/>,
  };

  return (
    <>
      <style>{G}</style>
      <style>{CSS}</style>
      <Ticker/>
      <Nav page={page} navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <main>{pages[page] || pages.home}</main>
      <Footer navigate={navigate}/>
    </>
  );
}
