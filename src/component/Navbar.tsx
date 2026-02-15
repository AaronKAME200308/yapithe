import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

/* ===================== CONSTANTS ===================== */
const SCROLL_OFFSET = 100;
const THROTTLE_DELAY = 100;
const SCROLL_THRESHOLD = 20;
const LOGO_PATH = "/logoorigin.png";
const FALLBACK_LOGO_PATH = "/logoorigin.jpeg";

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

/* ===================== CUSTOM HOOK - useIsMobile ===================== */
const useIsMobile = (breakpoint = 1024) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
};

/* ===================== THROTTLE HELPER ===================== */
const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
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
  const [imageError, setImageError] = useState(false);

  const sectionsRef = useRef<NodeListOf<Element> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  /* ===================== PRELOAD LOGO ===================== */
  useEffect(() => {
    const img = new Image();
    img.src = LOGO_PATH;
  }, []);

  /* ===================== CLOSE DROPDOWN ON OUTSIDE CLICK ===================== */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openDropdown]);

  /* ===================== KEYBOARD NAVIGATION ===================== */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* ===================== OPTIMIZED SCROLL LISTENER ===================== */
  useEffect(() => {
    sectionsRef.current = document.querySelectorAll("section, div[id]");

    const onScroll = () => {
      // Check scrolled state
      const isScrolled = window.scrollY > SCROLL_THRESHOLD;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Check active section
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

    const throttledScroll = throttle(onScroll, THROTTLE_DELAY);

    window.addEventListener("scroll", throttledScroll, { passive: true });
    onScroll(); // Initial check

    return () => window.removeEventListener("scroll", throttledScroll as any);
  }, [scrolled, active]);

  /* ===================== SCROLL TO SECTION ===================== */
  const scrollToSection = useCallback((id: string) => {
    setActive(id);
    setOpenDropdown(null);
    setOpen(false);

    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Section with id "${id}" not found`);
      return;
    }

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - SCROLL_OFFSET;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, []);

  /* ===================== LINK CLASS ===================== */
  const linkClass = (id: string, children?: any[], isMobileView = false) => {
    const isActive =
      active === id || (children && children.some((c) => c.id === active));

    if (isMobileView) {
      return `w-full px-4 py-3 rounded-xl transition-colors duration-300 flex items-center justify-between font-medium
        ${
          isActive
            ? "bg-[#23c367] text-white shadow-lg"
            : "text-white hover:bg-white/10"
        }`;
    }

    return `px-4 py-2 rounded-full transition-colors duration-300 flex items-center gap-1.5 font-medium text-sm whitespace-nowrap
      ${
        isActive
          ? "bg-[#23c367] text-white shadow-lg"
          : scrolled
          ? "text-[#0a4d7c] hover:bg-[#23c367]/10"
          : "text-[#0a4d7c] hover:bg-[#23c367]/10"
      }`;
  };

  return (
    <header
      ref={navRef}
      style={{
        background: scrolled && !isMobile 
          ? 'transparent' 
          : 'linear-gradient(to right, #e0f7f1, white, #f0f9ff)'
      }}
      className={`sticky top-0 z-50 transition-all duration-300
        ${
          scrolled
            ? `border shadow-lg md:rounded-full md:mx-5 md:top-2 text-white ${
                isMobile ? "" : "backdrop-blur-md"
              }`
            : ""
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
              src={imageError ? FALLBACK_LOGO_PATH : LOGO_PATH}
              alt="Yapithe & Partners"
              onError={() => setImageError(true)}
              className="h-12 md:h-14 w-auto object-contain transition-opacity duration-300"
              loading="eager"
            />
          </motion.div>

          {/* ================= NAV CENTER ================= */}
          <nav className="hidden lg:flex justify-center" role="navigation" aria-label="Navigation principale">
            <ul
              className={`flex gap-2 items-center px-3 py-2 rounded-full transition-all duration-300
                ${
                  scrolled
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
                    aria-expanded={link.children ? openDropdown === link.label : undefined}
                    aria-haspopup={link.children ? "true" : undefined}
                    aria-current={active === link.id ? "page" : undefined}
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
                        role="menu"
                      >
                        {link.children.map((child) => (
                          <motion.li
                            key={child.id}
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                            role="menuitem"
                          >
                            <button
                              onClick={() => scrollToSection(child.id)}
                              style={{
                                background: active === child.id 
                                  ? 'linear-gradient(to right, #23c367, #1fa85a)' 
                                  : 'transparent'
                              }}
                              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200
                                ${
                                  active === child.id
                                    ? "text-white shadow-lg"
                                    : "text-[#0a4d7c] hover:bg-[#23c367]/10"
                                }`}
                              aria-current={active === child.id ? "page" : undefined}
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
              aria-label="Aller à la section contact"
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #23c367, #1fa85a)' }}></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to right, #1fa85a, #23c367)' }}></div>
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
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            {open ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </motion.button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ maxHeight: 0, opacity: 0 }}
            animate={{ maxHeight: "70vh", opacity: 1 }}
            exit={{ maxHeight: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-[#0a4d7c]"
            role="navigation"
            aria-label="Navigation mobile"
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
                    aria-expanded={link.children ? openDropdown === link.label : undefined}
                    aria-haspopup={link.children ? "true" : undefined}
                    aria-current={active === link.id ? "page" : undefined}
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

                  {/* MOBILE SUBMENU */}
                  <AnimatePresence>
                    {link.children && openDropdown === link.label && (
                      <motion.ul
                        initial={{ maxHeight: 0, opacity: 0 }}
                        animate={{ maxHeight: 500, opacity: 1 }}
                        exit={{ maxHeight: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="flex flex-col pl-4 mt-2 gap-1 overflow-hidden"
                        role="menu"
                      >
                        {link.children.map((child, index) => (
                          <motion.li
                            key={child.id}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            role="menuitem"
                          >
                            <button
                              onClick={() => scrollToSection(child.id)}
                              className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors duration-200 font-medium text-sm
                                ${
                                  active === child.id
                                    ? "bg-[#23c367] text-white shadow-lg"
                                    : "text-white/90 hover:bg-white/10"
                                }`}
                              aria-current={active === child.id ? "page" : undefined}
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
    </header>
  );
};

export default Navbar;