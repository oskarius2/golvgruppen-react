import { useState } from "react";
import { Phone, Mail, MapPin, Check } from "lucide-react";
import { saveQuote } from "../lib/storage.js";
import Breadcrumb from "../components/Breadcrumb.jsx";
import Toast from "../components/Toast.jsx";

const ARENDETYPER = [
  "Kostnadsfri besiktning & offert",
  "Parkettslipning",
  "Golvläggning",
  "Mattläggning & Våtrum",
  "Kommersiellt projekt",
  "Upphandling (LOU)",
  "Dokumentationsförfrågan",
  "Annat",
];

export default function ContactPage({ navigate }) {
  const [form, setForm] = useState({
    fornamn: "", efternamn: "", telefon: "", epost: "", org: "",
    arendetyp: "", tjanst: "", yta: "", meddelande: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [toast, setToast] = useState(null);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = async () => {
    if (!form.fornamn || !form.epost) {
      setToast({ msg: "Förnamn och e-post krävs", type: "error" });
      return;
    }
    setSending(true);
    const ok = await saveQuote(form);
    setSending(false);
    if (ok) setSent(true);
    else setToast({ msg: "Kunde inte spara — försök igen", type: "error" });
  };

  return (
    <div className="page-enter">
      {toast && <Toast msg={toast.msg} type={toast.type} onHide={() => setToast(null)}/>}
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
              {[
                { ic: <Phone size={16}/>, l: "Telefon",       v: "073-309 16 95" },
                { ic: <Mail size={16}/>,  l: "E-post",        v: "info@ggruppen.se" },
                { ic: <MapPin size={16}/>, l: "Besöksadress", v: "Smedstorpsvägen 2, 702 30 Örebro" },
              ].map((x, i) => (
                <div key={i} className="ct-row">
                  <div className="ct-ic">{x.ic}</div>
                  <div>
                    <div className="ct-lbl">{x.l}</div>
                    <div className="ct-val">{x.v}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: "1.75rem" }}>
                <h4 style={{
                  fontSize: ".68rem", fontWeight: 700, color: "var(--g5)",
                  letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".85rem",
                }}>Öppettider</h4>
                <div className="hr-row">
                  <span>Måndag – Fredag</span>
                  <span style={{ fontWeight: 700, color: "var(--black)" }}>07:00 – 17:00</span>
                </div>
                <div className="hr-row">
                  <span>Lördag</span>
                  <span style={{ fontWeight: 600, color: "var(--black)" }}>Tidsbokning</span>
                </div>
                <div className="hr-row">
                  <span>Söndag</span>
                  <span style={{ color: "var(--g4)" }}>Stängt</span>
                </div>
              </div>
              <div className="infobox" style={{ marginTop: "1.75rem" }}>
                <p>
                  <strong>Upphandling & Offentlig sektor:</strong> Ange &ldquo;Upphandling (LOU)&rdquo;
                  i ärendetypen så prioriterar vi din förfrågan och bifogar certifikatdokumentation
                  i svaret.
                </p>
              </div>
            </div>
            <div className="cf">
              {sent ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <div style={{
                    width: 56, height: 56, background: "#DCFCE7", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1.25rem",
                  }}>
                    <Check size={26} color="#16A34A"/>
                  </div>
                  <h3 className="cf-title" style={{ marginBottom: ".5rem" }}>Tack för din förfrågan!</h3>
                  <p style={{ fontSize: ".88rem", color: "var(--g5)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    Vi har mottagit din förfrågan och återkommer inom 24 timmar.
                  </p>
                  <button className="btn bo" onClick={() => setSent(false)}>Skicka ny förfrågan</button>
                </div>
              ) : (
                <>
                  <h3 className="cf-title">Skicka en förfrågan</h3>
                  <div className="fr">
                    <div className="fg">
                      <label className="fl">Förnamn *</label>
                      <input className="fi" placeholder="Anders" value={form.fornamn}
                        onChange={e => update("fornamn", e.target.value)}/>
                    </div>
                    <div className="fg">
                      <label className="fl">Efternamn</label>
                      <input className="fi" placeholder="Svensson" value={form.efternamn}
                        onChange={e => update("efternamn", e.target.value)}/>
                    </div>
                  </div>
                  <div className="fr">
                    <div className="fg">
                      <label className="fl">Telefon</label>
                      <input className="fi" type="tel" placeholder="070-000 00 00" value={form.telefon}
                        onChange={e => update("telefon", e.target.value)}/>
                    </div>
                    <div className="fg">
                      <label className="fl">E-post *</label>
                      <input className="fi" type="email" placeholder="din@email.se" value={form.epost}
                        onChange={e => update("epost", e.target.value)}/>
                    </div>
                  </div>
                  <div className="fg">
                    <label className="fl">Organisation / Företag</label>
                    <input className="fi" placeholder="Frivilligt" value={form.org}
                      onChange={e => update("org", e.target.value)}/>
                  </div>
                  <div className="fr">
                    <div className="fg">
                      <label className="fl">Ärendetyp</label>
                      <select className="fi" value={form.arendetyp}
                        onChange={e => update("arendetyp", e.target.value)}>
                        <option value="">Välj...</option>
                        {ARENDETYPER.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div className="fg">
                      <label className="fl">Ungefärlig yta</label>
                      <input className="fi" placeholder="t.ex. 200 m²" value={form.yta}
                        onChange={e => update("yta", e.target.value)}/>
                    </div>
                  </div>
                  <div className="fg">
                    <label className="fl">Meddelande</label>
                    <textarea className="fi" placeholder="Beskriv ert uppdrag, krav eller önskemål..."
                      value={form.meddelande}
                      onChange={e => update("meddelande", e.target.value)}/>
                  </div>
                  <button className="fsub" onClick={submit} disabled={sending}>
                    {sending ? "Skickar..." : "Skicka förfrågan →"}
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
