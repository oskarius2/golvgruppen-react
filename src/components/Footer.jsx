import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer({ navigate }) {
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
              <img
                src="/gvk-logo.png"
                alt="GVK — branschregler för våtrum"
                width="48"
                height="48"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>
          <div className="fc">
            <h4>Tjänster</h4>
            <ul>
              {["Badrum", "Trägolv", "Mattläggning", "Plattsättning", "Golvavjämning / EPS"].map(t => (
                <li key={t}><button onClick={() => navigate("tjanster")}>{t}</button></li>
              ))}
            </ul>
          </div>
          <div className="fc">
            <h4>Företaget</h4>
            <ul>
              <li><button onClick={() => navigate("om-oss")}>Om oss</button></li>
              <li><button onClick={() => navigate("projekt")}>Projekt</button></li>
              <li><button onClick={() => navigate("medarbetare")}>Medarbetare</button></li>
              <li><button onClick={() => navigate("kontakt")}>Kontakt</button></li>
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
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button className="fadmin-link" onClick={() => navigate("admin")}>Admin</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
