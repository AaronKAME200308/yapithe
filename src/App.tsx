import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from './component/Navbar'
import Home from './component/Home'
import Footer from './component/Footer'
import About from './component/About'
import Actu from './component/Actu'
import Services from './component/Services'
import {ChroniquesPage} from './component/ChroniquesPage'
import Chroniques from './component/Chroniques'
import Contact from './component/Contact'
import VoirPlus from './component/VoirPlus'
import ActualitesPage from "./component/ActuPages";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div 
        style={{ background: 'linear-gradient(to right, #e0f7f1, #ffffff)' }}
        className="min-h-screen w-full flex flex-col bg-portfolio-bg text-white"
      >
        <Navbar />

        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <About />
              <Actu />
              <Services />
              <Chroniques />
              <Contact />
            </>
          }/>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/actualites" element={<Actu />} />
          <Route path="/services" element={<Services />} />
          <Route path="/chroniques" element={<Chroniques />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/actu-page" element={<ActualitesPage />} />
          <Route path="/chroniques-page" element={<ChroniquesPage />} />
          <Route path="/voir-plus" element={<VoirPlus />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App