import { useState, useEffect } from "react";
import {
  ChevronDown, Mail, Trash2, Plus, Eye, EyeOff, LogOut, Inbox, Image,
  AlertTriangle, RefreshCw, ExternalLink,
} from "lucide-react";
import { ADMIN_PASSWORD } from "../data.jsx";
import {
  loadQuotes, loadProjects, saveProjects, deleteQuote, markRead,
} from "../lib/storage.js";
import Toast from "../components/Toast.jsx";

const FALLBACK_IMG = "https://via.placeholder.com/400x300?text=Bild+saknas";
const CATEGORIES = ["Privat", "Kommersiell", "Offentlig sektor", "Institutionell", "Bostäder"];

function AdminLogin({ onLogin }) {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  const submit = () => {
    if (pw === ADMIN_PASSWORD) onLogin();
    else { setErr(true); setPw(""); setTimeout(() => setErr(false), 2500); }
  };
  return (
    <div className="login-wrap">
      <div className="login-box">
        <div className="login-logo"><span>Golv</span>Gruppen</div>
        <div className="login-title">Administrationspanel</div>
        <div className="login-sub">Logga in för att hantera offertförfrågningar och projektgalleri</div>
        {err && (
          <div className="login-err">
            <AlertTriangle size={14}/>Fel lösenord. Försök igen.
          </div>
        )}
        <div className="fg">
          <label className="fl">Lösenord</label>
          <div className="pw-wrap">
            <input
              className="fi"
              type={show ? "text" : "password"}
              value={pw}
              onChange={e => setPw(e.target.value)}
              onKeyDown={e => e.key === "Enter" && submit()}
              placeholder="Ange lösenord"
              autoFocus
            />
            <button className="pw-toggle" onClick={() => setShow(!show)}>
              {show ? <EyeOff size={16}/> : <Eye size={16}/>}
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
  const dateStr = d.toLocaleDateString("sv-SE", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
  return (
    <div className={`quote-card ${!q.read ? "unread" : ""}`}>
      <div className="quote-hdr" onClick={() => { setOpen(!open); if (!q.read) onRead(q.id); }}>
        <div>
          <div className="quote-name">{q.fornamn} {q.efternamn}</div>
          <div className="quote-meta">{q.epost} · {q.telefon}{q.org ? ` · ${q.org}` : ""}</div>
        </div>
        <div className="quote-badges">
          <span className="q-date">{dateStr}</span>
          <span className={`q-badge ${!q.read ? "q-badge-new" : "q-badge-read"}`}>
            {!q.read ? "Ny" : "Läst"}
          </span>
          <ChevronDown
            size={16}
            color="var(--g4)"
            style={{ transition: "transform .2s", transform: open ? "rotate(180deg)" : "none" }}
          />
        </div>
      </div>
      {open && (
        <div className="quote-body">
          <div className="quote-fields">
            {q.tjanst && (
              <div className="qf">
                <span className="qf-label">Tjänst</span>
                <span className="qf-val">{q.tjanst}</span>
              </div>
            )}
            {q.yta && (
              <div className="qf">
                <span className="qf-label">Yta</span>
                <span className="qf-val">{q.yta}</span>
              </div>
            )}
            {q.arendetyp && (
              <div className="qf">
                <span className="qf-label">Ärendetyp</span>
                <span className="qf-val">{q.arendetyp}</span>
              </div>
            )}
          </div>
          {q.meddelande && <div className="q-msg">{q.meddelande}</div>}
          <div className="quote-actions">
            <a
              href={`mailto:${q.epost}`}
              className="btn bp"
              style={{ fontSize: ".76rem", textDecoration: "none" }}
            >
              <Mail size={13}/> Svara via e-post
            </a>
            <button
              className="btn bdanger"
              style={{ fontSize: ".76rem" }}
              onClick={() => onDelete(q.id)}
            >
              <Trash2 size={13}/> Ta bort
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPanel({ navigate }) {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("quotes");
  const [quotes, setQuotes] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [newP, setNewP] = useState({ title: "", type: "", area: "", tag: "Privat", img: "" });

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  useEffect(() => {
    if (!authed) return;
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
    setQuotes(qs => qs.map(q => q.id === id ? { ...q, read: true } : q));
  };
  const handleDeleteProject = async (id) => {
    if (!confirm("Ta bort detta projekt?")) return;
    const updated = projects.filter(p => p.id !== id);
    await saveProjects(updated);
    setProjects(updated);
    showToast("Projekt borttaget");
  };
  const handleAddProject = async () => {
    if (!newP.title || !newP.img) {
      showToast("Titel och bild-URL krävs", "error");
      return;
    }
    const p = { ...newP, id: "p" + Date.now() };
    const updated = [p, ...projects];
    await saveProjects(updated);
    setProjects(updated);
    setNewP({ title: "", type: "", area: "", tag: "Privat", img: "" });
    showToast("Projekt tillagt!");
  };

  if (!authed) return <AdminLogin onLogin={() => { setLoading(true); setAuthed(true); }}/>;

  const unread = quotes.filter(q => !q.read).length;
  const statsCards = [
    { icon: <Inbox size={18}/>, label: "Offertförfrågningar", val: quotes.length,   sub: `${unread} olästa`, color: "var(--blue)" },
    { icon: <Image size={18}/>, label: "Projekt i galleri",   val: projects.length, sub: "Aktiva",            color: "var(--green)" },
  ];

  return (
    <div className="adm page-enter">
      {toast && <Toast msg={toast.msg} type={toast.type} onHide={() => setToast(null)}/>}
      <div className="adm-top">
        <span className="adm-logo">
          <span>Golv</span>Gruppen &nbsp;
          <span style={{ fontSize: ".7rem", opacity: .4, fontFamily: "var(--sans)", fontWeight: 500 }}>Admin</span>
        </span>
        <div className="adm-top-right">
          <button className="adm-site-btn" onClick={() => navigate("home")}>
            <ExternalLink size={13}/> Visa webbplats
          </button>
          <button className="adm-logout" onClick={() => setAuthed(false)}>
            <LogOut size={13}/> Logga ut
          </button>
        </div>
      </div>
      <div className="adm-body">
        <div style={{ marginBottom: "1.75rem" }}>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", color: "var(--black)", fontWeight: 400 }}>
            Administrationspanel
          </h1>
          <p style={{ fontSize: ".85rem", color: "var(--g5)", marginTop: ".25rem" }}>
            Hantera offertförfrågningar och projektgalleri.
          </p>
        </div>

        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {statsCards.map((s, i) => (
            <div key={i} style={{
              background: "#fff", border: "1px solid var(--g2)", borderRadius: "var(--r)",
              padding: "1.25rem 1.5rem", display: "flex", alignItems: "center",
              gap: "1rem", flex: "1", minWidth: 180,
            }}>
              <div style={{
                width: 42, height: 42, background: `${s.color}15`, borderRadius: "var(--r)",
                display: "flex", alignItems: "center", justifyContent: "center", color: s.color,
              }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: "1.5rem", fontFamily: "var(--serif)", color: "var(--black)", lineHeight: 1 }}>
                  {s.val}
                </div>
                <div style={{
                  fontSize: ".72rem", fontWeight: 600, color: "var(--g4)",
                  marginTop: ".2rem", textTransform: "uppercase", letterSpacing: ".08em",
                }}>{s.label}</div>
                <div style={{ fontSize: ".68rem", color: s.color, fontWeight: 600, marginTop: ".1rem" }}>
                  {s.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="adm-tabs">
          <button className={`adm-tab ${tab === "quotes" ? "act" : ""}`} onClick={() => setTab("quotes")}>
            <Inbox size={14}/> Offertförfrågningar{" "}
            {unread > 0 && (
              <span style={{
                background: "#EF4444", color: "#fff", borderRadius: "10px",
                padding: "0 .4rem", fontSize: ".65rem", fontWeight: 800,
              }}>{unread}</span>
            )}
          </button>
          <button className={`adm-tab ${tab === "gallery" ? "act" : ""}`} onClick={() => setTab("gallery")}>
            <Image size={14}/> Fotogalleri
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--g4)" }}>
            <RefreshCw size={24} style={{ animation: "spin 1s linear infinite", margin: "0 auto .75rem" }}/>
            <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
            <p style={{ fontSize: ".85rem" }}>Laddar...</p>
          </div>
        ) : tab === "quotes" ? (
          <div className="quote-list">
            {quotes.length === 0 ? (
              <div className="empty-state">
                <Inbox size={40}/>
                <p>
                  Inga offertförfrågningar ännu.<br/>
                  <span style={{ fontSize: ".8rem" }}>
                    Nya förfrågningar dyker upp här när kunder skickar formuläret.
                  </span>
                </p>
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
                <div className="fg" style={{ margin: 0 }}>
                  <label className="fl">Titel *</label>
                  <input
                    className="fi"
                    placeholder="Villa i Örebro"
                    value={newP.title}
                    onChange={e => setNewP({ ...newP, title: e.target.value })}
                  />
                </div>
                <div className="fg" style={{ margin: 0 }}>
                  <label className="fl">Tjänst</label>
                  <input
                    className="fi"
                    placeholder="Parkettslipning"
                    value={newP.type}
                    onChange={e => setNewP({ ...newP, type: e.target.value })}
                  />
                </div>
                <div className="fg" style={{ margin: 0 }}>
                  <label className="fl">Yta</label>
                  <input
                    className="fi"
                    placeholder="120 m²"
                    value={newP.area}
                    onChange={e => setNewP({ ...newP, area: e.target.value })}
                  />
                </div>
                <div className="fg" style={{ margin: 0 }}>
                  <label className="fl">Kategori</label>
                  <select
                    className="fi"
                    value={newP.tag}
                    onChange={e => setNewP({ ...newP, tag: e.target.value })}
                  >
                    {CATEGORIES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="fg" style={{ marginTop: ".75rem", marginBottom: ".75rem" }}>
                <label className="fl">Bild-URL *</label>
                <input
                  className="fi"
                  placeholder="https://… eller sökväg till bild"
                  value={newP.img}
                  onChange={e => setNewP({ ...newP, img: e.target.value })}
                />
              </div>
              <button className="btn bp" onClick={handleAddProject}>
                <Plus size={14}/> Lägg till projekt
              </button>
            </div>
            <div className="gal-grid">
              {projects.map(p => (
                <div key={p.id} className="gal-card">
                  <div className="gal-img">
                    <img
                      src={p.img}
                      alt={p.title}
                      width="640"
                      height="480"
                      loading="lazy"
                      decoding="async"
                      onError={e => { e.target.src = FALLBACK_IMG; }}
                    />
                  </div>
                  <div className="gal-info">
                    <div className="gal-type">{p.type}</div>
                    <div className="gal-title">{p.title}</div>
                    <div className="gal-meta">{p.area} · {p.tag}</div>
                  </div>
                  <button className="gal-del" onClick={() => handleDeleteProject(p.id)}>
                    <Trash2 size={13}/>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
