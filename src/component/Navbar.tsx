import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useIsMobile } from "./useIsMobile";

/* ===================== NAV DATA ===================== */
const navLinks = [
  { label: "Accueil", id: "Accueil" },
  {
    label: "À propos",
    id: "Apropos",
    children: [
      { label: "Qui sommes-nous ?", id: "about" },
      { label: "Nos Références pratiques", id: "references" },
      { label: "Nos Partenaires", id: "partners" },
      { label: "Notre Équipe", id: "team" },
    ],
  },
  {
    label: "Actualité",
    id: "Actualite",
    children: [
      { label: "News", id: "news" },
      { label: "Événements", id: "events" },
      { label: "Galerie", id: "galerie" },
    ],
  },
  { label: "Services", id: "Services" },
  { label: "IPCG", id: "IPCG" },
  { label: "Chroniques", id: "Chroniques" },
  { label: "Contact", id: "Contact" },
];

/* ===================== DEBOUNCE HELPER ===================== */
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/* ===================== THROTTLE HELPER ===================== */
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return (...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/* ===================== NAVBAR COMPONENT ===================== */
const Navbar = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Accueil");
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Cache pour sections
  const sectionsRef = useRef<NodeListOf<Element> | null>(null);

  /* ===================== PRELOAD LOGOS ===================== */
  useEffect(() => {
    // Preload les deux versions du logo pour éviter le flash
    const img1 = new Image();
    const img2 = new Image();
    img1.src = "/logoorigin.png";
    img2.src = "/logoorigin.jpeg";
  }, []);

  /* ===================== OPTIMIZED SCROLL LISTENER ===================== */
  useEffect(() => {
    // Cache les sections une seule fois
    sectionsRef.current = document.querySelectorAll("section, div[id]");

    const onScroll = () => {
      // Check scrolled state
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Check active section (moins fréquent)
      if (!sectionsRef.current) return;
      
      let current = "Accueil";
      sectionsRef.current.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 0) {
          current = section.id;
        }
      });

      if (current !== active) {
        setActive(current);
      }
    };

    // Throttle au lieu d'exécuter à chaque frame
    const throttledScroll = throttle(onScroll, 100); // Max 10 fois/seconde

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll as any);
  }, [scrolled, active]);

  /* ===================== SCROLL TO SECTION ===================== */
  const scrollToSection = useCallback((id: string) => {
    setActive(id);
    setOpenDropdown(null);
    setOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  /* ===================== LINK CLASS ===================== */
  const linkClass = (id: string, children?: any[], isMobileView = false) => {
    const isActive =
      active === id || (children && children.some((c) => c.id === active));
    
    if (isMobileView) {
      return `w-full px-4 py-3 rounded-xl transition-colors duration-300 flex items-center justify-between font-medium
        ${isActive
          ? "bg-[#23c367] text-white shadow-lg"
          : "text-white hover:bg-white/10"
        }`;
    }

    return `px-4 py-2 rounded-full transition-colors duration-300 flex items-center gap-1.5 font-medium text-sm whitespace-nowrap
      ${isActive
        ? "bg-[#23c367] text-white shadow-lg"
        : scrolled
        ? "text-[#0a4d7c] hover:bg-[#23c367]/10"
        : "text-[#0a4d7c] hover:bg-[#23c367]/10"
      }`;
  };

  return (
    <motion.header
      initial={isMobile ? false : { y: -100 }} // Pas d'animation initiale sur mobile
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className={`sticky top-0 z-50 transition-all duration-300
        ${scrolled
          ? `border shadow-lg md:rounded-full md:mx-5 md:top-2 text-white ${
              isMobile ? "bg-[#0a4d7c]" : "bg-transparent backdrop-blur-md"
            }`
          : "bg-linear-to-r from-[#0a4d7c] via-[#0a4d7c] to-[#0a4c7ce7]"
        }`}
    >
      {/* ===== CONTAINER ===== */}
      <div className="px-4 md:px-6 py-3">
        {/* GRID 3 ZONES */}
        <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-4">
          {/* ================= LOGO ================= */}
          <motion.div
            whileHover={isMobile ? {} : { scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection("Accueil")}
          >
            <img
              src={scrolled ? "/logoorigin.png" : "/logoorigin.jpeg"}
              alt="Yapithe & Partners"
              className="h-12 md:h-14 w-auto object-contain transition-opacity duration-300"
            />
          </motion.div>

          {/* ================= NAV CENTER ================= */}
          <nav className="hidden lg:flex justify-center">
            <ul
              className={`flex gap-2 items-center px-3 py-2 rounded-full transition-all duration-300
                ${scrolled
                  ? "bg-white border border-white/20"
                  : "bg-white shadow-lg"
                }`}
            >
              {navLinks.filter((l) => l.label !== "Contact").map((link) => (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={linkClass(link.id, link.children)}
                    onClick={() => !link.children && scrollToSection(link.id)}
                  >
                    {link.label}
                    {link.children && (
                      <motion.div
                        animate={{ rotate: openDropdown === link.label ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    )}
                  </motion.button>

                  {/* DROPDOWN */}
                  <AnimatePresence>
                    {link.children && openDropdown === link.label && (
                      <motion.ul
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl p-2 border border-gray-100"
                      >
                        {link.children.map((child) => (
                          <motion.li
                            key={child.id}
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                          >
                            <button
                              onClick={() => scrollToSection(child.id)}
                              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200
                                ${active === child.id
                                  ? "bg-linear-to-r from-[#23c367] to-[#1fa85a] text-white shadow-lg"
                                  : "text-[#0a4d7c] hover:bg-[#23c367]/10"
                                }`}
                            >
                              {child.label}
                            </button>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </nav>

          {/* ================= CONTACT RIGHT ================= */}
          <div className="hidden lg:flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("Contact")}
              className="group relative px-6 py-2.5 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 bg-linear-to-r from-[#23c367] to-[#1fa85a]"></div>
              <div className="absolute inset-0 bg-linear-to-r from-[#1fa85a] to-[#23c367] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </div>

          {/* ================= MOBILE BTN ================= */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setOpen(!open);
              setOpenDropdown(null);
            }}
            className="lg:hidden justify-self-end w-12 h-12 flex items-center justify-center bg-[#23c367] rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            {open ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </motion.button>
        </div>
      </div>

      {/* MOBILE MENU - OPTIMISÉ */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ maxHeight: 0, opacity: 0 }}
            animate={{ maxHeight: "70vh", opacity: 1 }}
            exit={{ maxHeight: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-[#0a4d7c]"
          >
            <ul 
              className="flex flex-col gap-2 px-4 py-4 max-h-[70vh] overflow-y-auto"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {navLinks.map((link) => (
                <li key={link.label} className="w-full">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (link.children) {
                        setOpenDropdown(
                          openDropdown === link.label ? null : link.label
                        );
                      } else {
                        scrollToSection(link.id);
                      }
                    }}
                    className={linkClass(link.id, link.children, true)}
                  >
                    <span>{link.label}</span>
                    {link.children && (
                      <motion.div
                        animate={{
                          rotate: openDropdown === link.label ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    )}
                  </motion.button>

                  {/* MOBILE SUBMENU - OPTIMISÉ */}
                  <AnimatePresence>
                    {link.children && openDropdown === link.label && (
                      <motion.ul
                        initial={{ maxHeight: 0, opacity: 0 }}
                        animate={{ maxHeight: 500, opacity: 1 }}
                        exit={{ maxHeight: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="flex flex-col pl-4 mt-2 gap-1 overflow-hidden"
                      >
                        {link.children.map((child, index) => (
                          <motion.li
                            key={child.id}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                          >
                            <button
                              onClick={() => scrollToSection(child.id)}
                              className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors duration-200 font-medium text-sm
                                ${active === child.id
                                  ? "bg-[#23c367] text-white shadow-lg"
                                  : "text-white/90 hover:bg-white/10"
                                }`}
                            >
                              {child.label}
                            </button>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;