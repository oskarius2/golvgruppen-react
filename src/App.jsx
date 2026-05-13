import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Ticker from "./components/Ticker.jsx";
import HomePage from "./pages/HomePage.jsx";

const TjansterPage   = lazy(() => import("./pages/TjansterPage.jsx"));
const AboutPage      = lazy(() => import("./pages/AboutPage.jsx"));
const ProjectsPage   = lazy(() => import("./pages/ProjectsPage.jsx"));
const MedarbetarePage = lazy(() => import("./pages/MedarbetarePage.jsx"));
const ContactPage    = lazy(() => import("./pages/ContactPage.jsx"));
const AdminPanel     = lazy(() => import("./pages/AdminPanel.jsx"));

export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useCallback((p) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  if (page === "admin") {
    return (
      <Suspense fallback={null}>
        <AdminPanel navigate={navigate}/>
      </Suspense>
    );
  }

  const renderPage = () => {
    switch (page) {
      case "tjanster":    return <TjansterPage navigate={navigate}/>;
      case "om-oss":      return <AboutPage navigate={navigate}/>;
      case "projekt":     return <ProjectsPage navigate={navigate}/>;
      case "medarbetare": return <MedarbetarePage navigate={navigate}/>;
      case "kontakt":     return <ContactPage navigate={navigate}/>;
      case "home":
      default:            return <HomePage navigate={navigate}/>;
    }
  };

  return (
    <>
      <Ticker/>
      <Nav page={page} navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <main>
        <Suspense fallback={null}>
          {renderPage()}
        </Suspense>
      </main>
      <Footer navigate={navigate}/>
    </>
  );
}
