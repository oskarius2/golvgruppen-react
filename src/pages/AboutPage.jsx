import { ArrowRight } from "lucide-react";
import { ABOUT_IMAGES } from "../data.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";

export default function AboutPage({ navigate }) {
  return (
    <div className="page-enter">
      <div className="phdr">
        <div className="w phdr-inner">
          <h1 className="phdr">Om företaget</h1>
          <p>
            Familjeägt golvföretag med rötter i Örebro, certifierad personal och uppdrag för privata
            såväl som institutionella beställare.
          </p>
        </div>
      </div>
      <Breadcrumb label="Om oss" navigate={navigate}/>
      <section className="sec">
        <div className="w">
          <div className="ab-wrap">
            <div className="ab-imgs">
              <div className="ab-main">
                <img
                  src={ABOUT_IMAGES.main}
                  alt="Referensbild: golv och interiör"
                  width="1000"
                  height="562"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="ab-sm">
                <img
                  src={ABOUT_IMAGES.small1}
                  alt="Referensbild: dusch och våtrum"
                  width="600"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="ab-sm">
                <img
                  src={ABOUT_IMAGES.small2}
                  alt="Referensbild: badrum"
                  width="600"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div>
              <h2 className="h2" style={{ marginBottom: ".9rem" }}>Om oss</h2>
              <p className="lead" style={{ marginBottom: ".85rem" }}>
                Vi är ett familjärt och professionellt företag inom golv, plattsättning och våtrum med
                bas i Örebro. Vi hjälper privatpersoner, företag och offentlig verksamhet med hållbara
                och kvalitativa lösningar anpassade efter varje kunds behov.
              </p>
              <p style={{ fontSize: ".87rem", color: "var(--g5)", lineHeight: 1.78, marginBottom: ".85rem" }}>
                Med bred erfarenhet inom trägolv, badrum, mattläggning, plattsättning, golvavjämning och
                EPS-cement utför vi allt från mindre renoveringar till större entreprenader och
                nyproduktioner. Vi arbetar i bland annat bostäder, butiker, kontor, bilhallar och
                offentliga miljöer där höga krav ställs på kvalitet och noggrannhet.
              </p>
              <p style={{ fontSize: ".87rem", color: "var(--g5)", lineHeight: 1.78, marginBottom: ".85rem" }}>
                Som ett mindre och personligt företag kombinerar vi närhet, flexibilitet och engagemang
                med kapaciteten och kompetensen att hantera stora projekt och entreprenader. Det ger våra
                kunder det bästa av två världar – personlig service med resurserna och erfarenheten för
                att leverera professionella resultat i alla typer av projekt.
              </p>
              <p style={{ fontSize: ".87rem", color: "var(--g5)", lineHeight: 1.78, marginBottom: "1.75rem" }}>
                För oss är det viktigt att varje kund känner sig trygg genom hela projektet. Därför
                lägger vi stor vikt vid personlig service, tydlig kommunikation och ett professionellt
                utfört arbete i varje detalj. Vi tror på långsiktiga relationer, hög kvalitet och
                hantverk som håller över tid.
              </p>
              <div style={{ marginTop: "2rem", display: "flex", gap: ".65rem", flexWrap: "wrap" }}>
                <button className="btn bp" onClick={() => navigate("kontakt")}>
                  Kontakta oss <ArrowRight size={14}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="ctab">
        <h2>Hör av dig idag</h2>
        <div className="ctab-btns">
          <button className="btn bw" onClick={() => navigate("kontakt")}>
            Kontakta oss <ArrowRight size={15}/>
          </button>
        </div>
      </div>
    </div>
  );
}
