import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { DEFAULT_PROJECTS, TESTIMONIALS } from "../data.jsx";
import { dedupeProjects, loadProjects } from "../lib/storage.js";
import Breadcrumb from "../components/Breadcrumb.jsx";

const FALLBACK_IMG = "https://via.placeholder.com/400x300?text=Bild+saknas";

export default function ProjectsPage({ navigate }) {
  const [projects, setProjects] = useState(() => dedupeProjects(DEFAULT_PROJECTS));
  const [filter, setFilter] = useState("Alla");

  useEffect(() => {
    loadProjects().then(setProjects);
  }, []);

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
            {tags.map(t => (
              <button
                key={t}
                className={`filter-btn ${filter === t ? "act" : ""}`}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="pj-grid">
            {filtered.map((p, i) => (
              <div key={p.id || i} className="pj-card">
                <div className="pj-img">
                  <img
                    src={p.img}
                    alt={p.title}
                    width="640"
                    height="480"
                    loading="lazy"
                    decoding="async"
                    onError={e => { e.target.src = FALLBACK_IMG; }}
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
      <section className="sec" style={{ background: "var(--g1)" }}>
        <div className="w">
          <span className="lbl">Kundrecensioner</span>
          <h2 className="h2" style={{ marginBottom: "2rem" }}>Vad beställarna säger</h2>
          <div className="ts-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="ts-card">
                <div className="stars">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} size={12}/>)}
                </div>
                <p className="ts-text">&ldquo;{t.text}&rdquo;</p>
                <div className="ts-au">
                  <div className="ts-av">{t.name.split(" ").map(n => n[0]).join("")}</div>
                  <div>
                    <div className="ts-nm">{t.name}</div>
                    <div className="ts-ro">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
