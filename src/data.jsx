import {
  Shield, FileText, Wrench, Layers, Home, Building2,
  Lock, BookOpen, AlertCircle, BadgeCheck, Briefcase
} from "lucide-react";
import { PIX } from "./assets/pixMap.js";

/** Samma fil som `public/hero-poster.png` (video‑poster & CSS‑fallback; själva loopen är oförändrad). */
export const HERO_POSTER = "/hero-poster.png";

export const HERO_VIDEO_SOURCES = [
  "/hero-option-2.mp4",
  "/hero-option2.mp4",
];

export const ADMIN_PASSWORD = "golv2024";

export const CERTS = [
  { code: "GVK",      full: "Godkända våtrum",                year: "2009", color: "#1A56DB" },
  { code: "ID06",     full: "ID06 Legitimationssystem",        year: "2010", color: "#0D7A3E" },
  { code: "AML",      full: "Arbetsmiljölagen 1977:1160",      year: "—",    color: "#7C3AED" },
  { code: "BBR",      full: "Boverkets Byggregler",            year: "—",    color: "#B45309" },
  { code: "F-SKATT",  full: "Registrerad för F-skatt",         year: "2009", color: "#0369A1" },
  { code: "KOLLAV.",  full: "Kollektivavtal via GolvBranschen", year: "2009", color: "#9D174D" },
];

export const REGS = [
  { icon: <Shield size={20}/>, title: "Arbetsmiljölagen (AML)", ref: "SFS 1977:1160",
    desc: "Vi följer samtliga bestämmelser i Arbetsmiljölagen gällande systematiskt arbetsmiljöarbete, riskbedömning och skyddsåtgärder vid alla arbetsplatser.",
    items: ["Systematiskt arbetsmiljöarbete (SAM)", "Riskbedömning inför varje uppdrag", "Skyddsombud på alla arbetsplatser", "Regelbundna säkerhetsutbildningar"] },
  { icon: <FileText size={20}/>, title: "AFS 2001:1 — Systematiskt Arbetsmiljöarbete", ref: "Arbetsmiljöverkets föreskrift",
    desc: "Föreskriften om systematiskt arbetsmiljöarbete implementeras fullt ut med dokumenterade rutiner, riskbedömningar och uppföljningsprotokoll.",
    items: ["Dokumenterade SAM-rutiner", "Handlingsplaner för risker", "Årlig uppföljning och revision", "Medarbetarinvolvering i SAM"] },
  { icon: <AlertCircle size={20}/>, title: "AFS 1999:3 — Byggnads- och anläggningsarbete", ref: "Arbetsmiljöverkets föreskrift",
    desc: "Föreskriften reglerar säkerhet vid byggnads- och anläggningsarbete. Alla projekt bedrivs i enlighet med kraven på byggarbetsmiljösamordning.",
    items: ["BAS-P & BAS-U kompetens", "Säkerhetsplaner per projekt", "Personlig skyddsutrustning (PSA)", "Regelbundna skyddsronder"] },
  { icon: <BookOpen size={20}/>, title: "AFS 2011:18 — Hygieniska gränsvärden", ref: "Arbetsmiljöverkets föreskrift",
    desc: "Vi arbetar strikt inom hygieniska gränsvärden för damm, lösningsmedel och andra ämnen. Dammfri utrustning och andningsskydd används konsekvent.",
    items: ["Dammfri sliputrustning", "Mätning av exponering", "Andningsskydd klass P3", "Ventilationsprotokoll"] },
  { icon: <Building2 size={20}/>, title: "Boverkets Byggregler (BBR)", ref: "BFS 2011:6 med ändringar",
    desc: "Samtliga installationer utförs enligt BBR avseende brandskydd, tillgänglighet, fuktskydd och tekniska egenskapskrav.",
    items: ["Fuktskydd enligt BBR 6:5", "Brandskyddsklassificering", "Tillgänglighetsanpassning", "Teknisk dokumentation"] },
  { icon: <BadgeCheck size={20}/>, title: "Plan- och Bygglagen (PBL)", ref: "SFS 2010:900",
    desc: "Vi arbetar alltid i enlighet med Plan- och Bygglagen och säkerställer att nödvändiga anmälningar och kontroller genomförs.",
    items: ["Bygganmälan vid behov", "Kontrollplan upprättas", "Kontrollansvarig (KA) vid krav", "Slutbesked och dokumentation"] },
  { icon: <Lock size={20}/>, title: "GVK — Branschregler för Våtrum", ref: "Golvbranschen, rev. 2022",
    desc: "Som GVK-auktoriserat företag följer vi branschens striktaste regler för våtrumsarbeten med fullständig GVK-protokolldokumentation.",
    items: ["GVK-protokoll på varje uppdrag", "Auktoriserade installatörer", "10-årsgaranti på våtrum", "Fuktkontroll och mätning"] },
  { icon: <Briefcase size={20}/>, title: "Branschstandard AMA Hus", ref: "Allmän material- och arbetsbeskrivning",
    desc: "Tekniska utföranden följer AMA Hus-standardens krav för golvarbeten, vilket säkerställer enhetlig hög kvalitet och branschöverensstämmande dokumentation.",
    items: ["AMA-koder i alla offerter", "Materialkrav enligt standard", "Utförandekontroll", "Avvikelsehantering"] },
];

export const SERVICES = [
  { icon: <Wrench size={22}/>, num: "01", title: "Badrum", short: "Renovering & plattsättning i våtrum",
    desc: "Vi skapar badrum med fokus på kvalitet, funktion och stil. Oavsett om du vill ha ett modernt, klassiskt eller tidlöst badrum hjälper vi dig genom hela processen – från planering till färdigt resultat. Vi arbetar med både keramik och våtrumsmatta och anpassar lösningen efter dina önskemål och behov. Med noggrant utfört arbete och känsla för detaljer ser vi till att ditt badrum blir både hållbart och trivsamt i många år framöver.",
    bullets: ["Kakel & klinker", "Noggrann planering av ytor", "Fuktsäkra arbetsmoment", "Dokumenterad kvalitet"],
    image: PIX.badrum },
  { icon: <Layers size={22}/>, num: "02", title: "Trägolv", short: "Installation av parkett & massivträ",
    desc: "Vi erbjuder professionell nyinstallation av trägolv samt dammfri slipning för att ge ditt golv nytt liv. Oavsett om du vill lägga ett helt nytt golv eller återställa känslan i ett befintligt trägolv arbetar vi med precision, kvalitet och noggrant utvalda material. Med moderna metoder för dammfri slipning får du ett snyggt resultat med minimal påverkan på ditt hem.",
    bullets: ["Parkett & massivträ", "Fiskbens- & segmentmönster", "Kontrollerad fuktnivå", "BBR & AMA Hus-godkänt"],
    image: PIX.vardagsrum },
  { icon: <Home size={22}/>, num: "03", title: "Mattläggning", short: "Textila mattor & plastmattor",
    desc: "Vi utför professionell mattläggning för både privata och offentliga miljöer. Vi arbetar med allt från textilmattor till plast- och våtrumsmattor, inklusive lösningar med uppvik för miljöer där höga krav ställs på hygien och hållbarhet, såsom sjukhus, vårdmiljöer och andra offentliga verksamheter. Med fokus på kvalitet, precision och funktion levererar vi hållbara resultat anpassade efter varje projekts behov.",
    bullets: ["Textilmattor & plastmattor", "Kommersiella och offentliga miljöer", "Noggrann underlagskontroll", "Kvalitetsdokumentation"],
    image: PIX.golvVaggmatta },
  { icon: <Building2 size={22}/>, num: "04", title: "Plattsättning", short: "Kakel & klinker med precision",
    desc: "Vi utför professionell plattsättning för allt från butiker och bilhallar till kontor och större byggprojekt. Med erfarenhet av både traditionell plattsättning och montering av storformatsplattor levererar vi hållbara och stilrena lösningar anpassade för miljöer med höga krav på kvalitet och slitstyrka. Vi arbetar noggrant i varje detalj för att skapa ett resultat som håller över tid.",
    bullets: ["Kakel & klinker", "Noggrann linjering och fall", "Underlag och fästmassa enligt krav", "Dokumenterat utförande"],
    image: PIX.klinkersBadrum },
  { icon: <Shield size={22}/>, num: "05", title: "Golvavjämning / EPS", short: "Stabil grund för lång livslängd",
    desc: "Vi erbjuder professionell golvavjämning och arbete med EPS-cement för både ROT-projekt och nyproduktion. Med rätt underarbete, armering och noggrant utförande skapar vi stabila, jämna och hållbara golvkonstruktioner anpassade efter varje projekts krav. EPS-cement är en effektiv lösning för uppbyggnad, isolering och viktminskning, särskilt vid renoveringar och större byggprojekt där funktion och hållbarhet är avgörande.",
    bullets: ["Självutjämnande massor", "EPS-cement och lättfyllnad", "Nivå- och fallkorrigering", "Förberedelse inför slutbeläggning"],
    image: PIX.kontorGolv },
];

export const DEFAULT_PROJECTS = [
  { id: "p1", title: "Statlig myndighetsbyggnad",    type: "Golvläggning",         area: "2 400 m²", tag: "Offentlig sektor", img: PIX.kontorGolv },
  { id: "p2", title: "Institutionell fastighet",     type: "Parkettslipning",      area: "1 800 m²", tag: "Institutionell",   img: PIX.dusch2 },
  { id: "p3", title: "Hotell Örebro",                type: "Kommersiell läggning", area: "1 200 m²", tag: "Kommersiell",      img: PIX.vardagsrum },
  { id: "p4", title: "Bostadsrättsförening",         type: "Parkettslipning",      area: "800 m²",   tag: "Bostäder",         img: PIX.badrumHandfat },
  { id: "p5", title: "Förskola & skola, Vivalla",    type: "Golvläggning",         area: "430 m²",   tag: "Offentlig sektor", img: PIX.golvVaggmatta },
  { id: "p6", title: "Kontorskomplex, City",         type: "Golvläggning",         area: "340 m²",   tag: "Kommersiell",      img: PIX.badrumToa },
  { id: "p7", title: "Restaurang Kvarnen",           type: "Kommersiell läggning", area: "210 m²",   tag: "Kommersiell",      img: PIX.klinkersBadrum },
  { id: "p8", title: "Villa i Örebro",               type: "Parkettslipning",      area: "120 m²",   tag: "Privat",           img: PIX.vardagsrum2 },
  { id: "p9", title: "Badrum & våtrum, GVK",         type: "Mattläggning",         area: "45 m²",    tag: "Privat",           img: PIX.duschBadrum },
];

export const TESTIMONIALS = [
  { name: "Johan Persson",     role: "Förvaltningschef, Statlig myndighet",        stars: 5, text: "GolvGruppen levererade ett komplett projekt i en säkerhetsklassad miljö med full sekretess, i tid och utan avvikelser." },
  { name: "Marcus Bergqvist",  role: "Fastighetsförvaltare, Örebro Fastigheter AB", stars: 5, text: "Alltid i tid, alltid rätt kvalitet. Deras dokumentation håller måttet vid alla revisioner." },
  { name: "Sofia Ek",          role: "Projektledare, Kommunfastigheter",            stars: 5, text: "Exceptionellt hantverkskunnande kombinerat med fullständig regelefterlevnad. GVK-dokumentationen var felfri." },
  { name: "Lars Eriksson",     role: "Hotelldirektör, Örebro",                      stars: 5, text: "Hela restauranggolvet på en natt. Fullständig AML-dokumentation dagen efter. Imponerande." },
  { name: "Anna Lindström",    role: "Styrelseordförande, BRF Vasastaden",          stars: 5, text: "Slipad om hela fastigheten med minimal störning. Korrekt anmält, kontrollerat och dokumenterat." },
  { name: "Maria Holm",        role: "Inköpschef, Regionfastigheter",               stars: 5, text: "Vi utvärderade tre leverantörer. GolvGruppen vann på kvalitet, pris och dokumentationskrav." },
];

export const TEAM_MEMBERS = [
  { name: "Förnamn Efternamn", title: "Arbetsledare",       tel: "073-309 16 95", email: "namn1@ggruppen.se", img: "" },
  { name: "Förnamn Efternamn", title: "Byggadministratör",  tel: "073-309 16 95", email: "namn2@ggruppen.se", img: "" },
  { name: "Förnamn Efternamn", title: "Titel / roll",       tel: "073-309 16 95", email: "namn3@ggruppen.se", img: "" },
  { name: "Förnamn Efternamn", title: "Titel / roll",       tel: "073-309 16 95", email: "namn4@ggruppen.se", img: "" },
  { name: "Förnamn Efternamn", title: "Titel / roll",       tel: "073-309 16 95", email: "namn5@ggruppen.se", img: "" },
];

export const NAV_ITEMS = [
  { id: "home",         label: "Hem" },
  { id: "tjanster",     label: "Tjänster" },
  { id: "om-oss",       label: "Om oss" },
  { id: "projekt",      label: "Projekt" },
  { id: "medarbetare",  label: "Medarbetare" },
];

export const ABOUT_IMAGES = {
  main:   PIX.vardagsrum,
  small1: PIX.dusch,
  small2: PIX.badrumToa,
};
