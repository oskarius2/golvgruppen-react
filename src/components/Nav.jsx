import { Menu, X, ChevronRight } from "lucide-react";
import { NAV_ITEMS } from "../data.jsx";

export default function Nav({ page, navigate, menuOpen, setMenuOpen }) {
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
            <button
              key={l.id}
              className={`mob-btn ${page === l.id ? "act" : ""}`}
              onClick={() => { navigate(l.id); setMenuOpen(false); }}
            >
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
              <button
                key={l.id}
                className={`nl-btn ${page === l.id ? "act" : ""}`}
                onClick={() => navigate(l.id)}
              >
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
