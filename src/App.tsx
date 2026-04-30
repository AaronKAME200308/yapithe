import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from './component/Navbar'
import Home from './component/Home'
import Footer from './component/Footer'
import About from './component/About'
import Actu from './component/Actu'
import Services from './component/Services'
import { ChroniquesPage } from './component/ChroniquesPage'
import Chroniques from './component/Chroniques'
import Contact from './component/Contact'
import VoirPlus from './component/VoirPlus'
import ActualitesPage from "./component/ActuPages";
import FormationsPage from "./component/FormationPage";

// ← Ajoutez ceci tout en haut, juste après les imports
import MaintenancePage from './component/MaintenancePage';

const IS_MAINTENANCE = true; // ← Mettez false pour réactiver le site

const WHATSAPP_NUMBER = "237699948421"; // ← remplacez par votre numéro
const WHATSAPP_MESSAGE = "Bonjour, je souhaite en savoir plus sur vos services.";

function WhatsAppButton() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.2 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Nous contacter sur WhatsApp"
    >
      {/* Tooltip — pointer-events-none so it never expands the hit zone */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 bg-white text-[#0a4d7c] text-sm font-semibold px-4 py-2 rounded-full shadow-lg border border-gray-100 whitespace-nowrap pointer-events-none">
        Discutons sur WhatsApp
      </span>
      <div
        className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #25d366, #128c7e)" }}
      >
        <span className="absolute inset-0 rounded-full animate-ping opacity-25" style={{ background: "#25d366" }} />
        <FaWhatsapp size={28} className="text-white relative z-10" />
      </div>
    </motion.a>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function App() {

  return (
    <>

      {/* Site principal — apparaît après le loader */}
      <AnimatePresence>
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Router>
              <ScrollToTop />
              <div
                style={{ background: 'linear-gradient(to right, #e0f7f1, #ffffff)' }}
                className="min-h-screen w-full flex flex-col bg-portfolio-bg text-white"
              >
                  {IS_MAINTENANCE ? (
                    <MaintenancePage />
                  ) : (
                    <>
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
                  } />
                  <Route path="/home" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/actualites" element={<Actu />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/chroniques" element={<Chroniques />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/actu-page" element={<ActualitesPage />} />
                  <Route path="/chroniques-page" element={<ChroniquesPage />} />
                  <Route path="/voir-plus" element={<VoirPlus />} />
                  <Route path="/formations" element={<FormationsPage />} />
                </Routes>

                <Footer />
                </>
                  )}
                <WhatsAppButton />
              </div>
            </Router>
          </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;