import { Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { TEAM_MEMBERS } from "../data.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import TeamMemberCard from "../components/TeamMemberCard.jsx";

export default function MedarbetarePage({ navigate }) {
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
              <button
                className="btn bp"
                style={{ width: "100%", marginTop: "1rem", justifyContent: "center", fontSize: ".78rem" }}
                onClick={() => navigate("kontakt")}
              >
                Kontakta oss <ArrowRight size={13}/>
              </button>
              <div style={{
                marginTop: "1rem",
                padding: ".9rem",
                background: "rgba(255,255,255,.05)",
                borderRadius: "var(--r)",
                border: "1px solid rgba(255,255,255,.07)",
              }}>
                <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.38)", lineHeight: 1.6 }}>
                  <strong style={{ color: "rgba(255,255,255,.55)" }}>Upphandling:</strong>{" "}
                  Vi tillhandahåller certifikatintyg och dokumentation på begäran.
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
