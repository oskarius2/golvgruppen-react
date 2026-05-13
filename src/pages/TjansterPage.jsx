import { useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { SERVICES } from "../data.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";

export default function TjansterPage({ navigate }) {
  const [active, setActive] = useState(0);
  return (
    <div className="page-enter">
      <div className="phdr">
        <div className="w phdr-inner">
          <h1 className="phdr">Våra tjänster</h1>
          <p>
            Komplett utbud för alla typer av uppdrag — privata, kommersiella och institutionella.
            Full dokumentation och regelefterlevnad ingår alltid.
          </p>
        </div>
      </div>
      <Breadcrumb label="Tjänster" navigate={navigate}/>
      <section className="sec">
        <div className="w">
          <div className="sv-wrap">
            <div className="sv-list">
              {SERVICES.map((s, i) => (
                <div
                  key={i}
                  className={`sv-item ${active === i ? "act" : ""}`}
                  onClick={() => setActive(i)}
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
                  src={SERVICES[active].image}
                  alt={SERVICES[active].title}
                  width="900"
                  height="506"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="lbl">{SERVICES[active].num} — {SERVICES[active].title}</span>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", color: "var(--black)", marginBottom: ".55rem" }}>
                {SERVICES[active].title}
              </h3>
              <p style={{ fontSize: ".88rem", color: "var(--g5)", lineHeight: 1.75, marginBottom: ".9rem" }}>
                {SERVICES[active].desc}
              </p>
              <ul className="sv-bul">
                {SERVICES[active].bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
              <div style={{ marginTop: "1.35rem", display: "flex", gap: ".65rem", flexWrap: "wrap" }}>
                <button className="btn bp" style={{ fontSize: ".78rem" }} onClick={() => navigate("kontakt")}>
                  Begär offert <ArrowRight size={13}/>
                </button>
                <button className="btn bo" style={{ fontSize: ".78rem" }} onClick={() => navigate("kontakt")}>
                  Kontakta oss
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="ctab">
        <h2>Redo att komma igång?</h2>
        <div className="ctab-btns">
          <button className="btn bw" onClick={() => navigate("kontakt")}>
            Kontakta oss <ArrowRight size={15}/>
          </button>
        </div>
      </div>
    </div>
  );
}
