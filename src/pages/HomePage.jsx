import { useState, useEffect, useCallback } from "react";
import {
  ArrowRight, Star, Shield, Clock, ChevronRight,
  CheckCircle2, BadgeCheck
} from "lucide-react";
import { CERTS, SERVICES, DEFAULT_PROJECTS, HERO_POSTER } from "../data.jsx";
import HeroLoopVideo from "../components/HeroLoopVideo.jsx";

export default function HomePage({ navigate }) {
  const [activeSv, setActiveSv] = useState(0);
  const [heroReady, setHeroReady] = useState(false);
  const handleHeroReady = useCallback(() => setHeroReady(true), []);

  useEffect(() => {
    // Fallback: never block the page forever if media events fail.
    const t = window.setTimeout(() => setHeroReady(true), 3200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="page-enter">
      <section className="hero" style={{ backgroundImage: `url(${HERO_POSTER})` }}>
        <HeroLoopVideo onLoopReady={handleHeroReady}/>
        <div className="hov"/>
        <div className="hmask" aria-hidden="true"/>
        <div className="hcon">
          <div className="hbadge"><span className="hbadge-dot"/>Certifierad & Auktoriserad — Sverige</div>
          <h1>Kompletta lösningar inom<br/><em>golv & plattsättning</em></h1>
          <p className="hero-sub">
            Vi hjälper företag och privatpersoner med allt från trägolv och våtrum till storformat,
            golvavjämning och entreprenadprojekt – alltid med kvalitet och service i fokus.
          </p>
          <div className="hbtns">
            <button className="btn bp" onClick={() => navigate("kontakt")}>
              Kontakta oss <ArrowRight size={15}/>
            </button>
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

      {heroReady ? (
        <div className="home-rest">
          <div className="sbar">
            <div className="w">
              <div className="sgrid">
                {[
                  { v: "90+",  l: "Års erfarenhet",   i: <Clock size={16}/> },
                  { v: "600+", l: "Slutförda projekt", i: <CheckCircle2 size={16}/> },
                  { v: "8",    l: "Aktiva certifikat", i: <BadgeCheck size={16}/> },
                  { v: "GVK",  l: "Auktoriserat",      i: <Shield size={16}/> },
                  { v: "4.9★", l: "Snittbetyg",        i: <Star size={16}/> },
                ].map((s, i) => (
                  <div key={i} className="stat">
                    <div className="sic">{s.i}</div>
                    <div className="sv">{s.v}</div>
                    <div className="sl">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <section className="sec">
            <div className="w">
              <span className="lbl">Tjänster</span>
              <h2 className="h2" style={{ marginBottom: ".65rem" }}>Allt ditt golv behöver</h2>
              <p className="lead" style={{ marginBottom: "2.5rem" }}>
                Komplett utbud för privatpersoner, bostadsrättsföreningar, kommuner och offentliga aktörer
                — med full dokumentation och regelefterlevnad.
              </p>
              <div className="sv-wrap">
                <div className="sv-list">
                  {SERVICES.map((s, i) => (
                    <div
                      key={i}
                      className={`sv-item ${activeSv === i ? "act" : ""}`}
                      onClick={() => setActiveSv(i)}
                    >
                      <div className="sv-ih">
                        <div className="sv-ic">{s.icon}</div>
                        <div>
                          <div className="sv-it">{s.title}</div>
                          <div className="sv-is">{s.short}</div>
                        </div>
                        <ChevronRight size={14} style={{ marginLeft: "auto", color: "var(--g3)" }}/>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="sv-det">
                  <div className="sv-img">
                    <img
                      src={SERVICES[activeSv].image}
                      alt={SERVICES[activeSv].title}
                      width="900"
                      height="506"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span className="lbl">{SERVICES[activeSv].num} — {SERVICES[activeSv].title}</span>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", color: "var(--black)", marginBottom: ".55rem" }}>
                    {SERVICES[activeSv].title}
                  </h3>
                  <p style={{ fontSize: ".88rem", color: "var(--g5)", lineHeight: 1.75, marginBottom: ".9rem" }}>
                    {SERVICES[activeSv].desc}
                  </p>
                  <ul className="sv-bul">
                    {SERVICES[activeSv].bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                  <div style={{ marginTop: "1.35rem", display: "flex", gap: ".65rem" }}>
                    <button className="btn bo" style={{ fontSize: ".78rem" }} onClick={() => navigate("tjanster")}>
                      Mer info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="sec home-ref-preview" style={{ background: "var(--g1)" }}>
            <div className="w">
              <div className="sh">
                <div>
                  <span className="lbl">Referensprojekt</span>
                  <h2 className="h2">Utvalda projekt</h2>
                </div>
                <button className="btn bo" onClick={() => navigate("projekt")}>
                  Alla projekt <ArrowRight size={14}/>
                </button>
              </div>
              <div className="pj-grid">
                {DEFAULT_PROJECTS.slice(0, 3).map((p, i) => (
                  <div key={i} className="pj-card">
                    <div className="pj-img">
                      <img
                        src={p.img}
                        alt={p.title}
                        width="640"
                        height="480"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="pj-tag-badge">{p.tag}</span>
                    </div>
                    <div className="pj-body">
                      <div className="pj-type">{p.type}</div>
                      <div className="pj-title">{p.title}</div>
                      <div className="pj-meta">{p.area}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="ctab">
            <h2>Redo att samarbeta?</h2>
            <p>Vi välkomnar uppdrag av alla storlekar — från privata hem till statliga institutioner.</p>
            <div className="ctab-btns">
              <button className="btn bw" onClick={() => navigate("kontakt")}>
                Kontakta oss <ArrowRight size={15}/>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
