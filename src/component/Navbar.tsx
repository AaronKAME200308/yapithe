import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

/* ===================== CONSTANTS ===================== */
const THROTTLE_DELAY = 100;
const SCROLL_THRESHOLD = 20;
const LOGO_PATH = "/logoorigin.png";
const FALLBACK_LOGO_PATH = "/logoorigin.jpeg";

/* ===================== NAV DATA ===================== */
const navLinks = [
  { label: "Accueil", id: "Accueil", sectionId: "Accueil" },
  {
    label: "À propos",
    id: "Apropos",
    sectionId: "Apropos",
    children: [
      { label: "Qui sommes-nous ?", id: "about", sectionId: "about" },
      { label: "Nos Partenaires", id: "partners", sectionId: "partners" },
      { label: "Notre Équipe", id: "team", sectionId: "team" },
    ],
  },
  {
    label: "Actualité",
    id: "Actualite",
    sectionId: "Actualite",
    children: [
      { label: "News", id: "news", sectionId: "news" },
      { label: "Événements", id: "events", sectionId: "events" },
    ],
  },
  { label: "Services", id: "Services", sectionId: "Services" },
  { label: "Chroniques", id: "Chroniques", sectionId: "Chroniques" },
  { label: "Contact", id: "Contact", sectionId: "Contact" },
];

/* ===================== Pages séparées (pas sur la home) ===================== */

/* ===================== CUSTOM HOOK - useIsMobile ===================== */
const useIsMobile = (breakpoint = 1024) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
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
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Accueil");
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  const sectionsRef = useRef<NodeListOf<Element> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const isOnHomePage = location.pathname === "/";

  /* ===================== PRELOAD LOGO ===================== */
  useEffect(() => {
    const img = new Image();
    img.src = LOGO_PATH;
  }, []);

  /* ===================== Quand on revient sur la home après navigation ===================== */
  useEffect(() => {
    if (isOnHomePage && pendingScroll) {
      // Attendre que le DOM soit prêt
      const timer = setTimeout(() => {
        const element = document.getElementById(pendingScroll);
        if (element) {
          const top =
            element.getBoundingClientRect().top +
            window.scrollY -
            (navRef.current?.offsetHeight ?? 80);
          window.scrollTo({ top, behavior: "smooth" });
        }
        setPendingScroll(null);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOnHomePage, pendingScroll]);

  /* ===================== Actif selon la route séparée ===================== */
  useEffect(() => {
    if (location.pathname === "/actu-page") setActive("Actualite");
    else if (location.pathname === "/chroniques-page") setActive("Chroniques");
    else if (location.pathname === "/voir-plus") setActive("");
    else if (!isOnHomePage) setActive("Accueil");
  }, [location.pathname]);

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

  /* ===================== SCROLL LISTENER (home seulement) ===================== */
  useEffect(() => {
    if (!isOnHomePage) return;

    sectionsRef.current = document.querySelectorAll("section[id], div[id]");

    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);

      if (!sectionsRef.current) return;
      let current = "Accueil";
      sectionsRef.current.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 0) current = section.id;
      });
      setActive(current);
    };

    const throttledScroll = throttle(onScroll, THROTTLE_DELAY);
    window.addEventListener("scroll", throttledScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", throttledScroll as any);
  }, [isOnHomePage]);

  /* ===================== SCROLL LISTENER (pages séparées) ===================== */
  useEffect(() => {
    if (isOnHomePage) return;

    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOnHomePage]);

  /* ===================== NAVIGATION PRINCIPALE ===================== */
  const scrollToSection = useCallback(
    (sectionId: string) => {
      setOpenDropdown(null);
      setOpen(false);
      setActive(sectionId);

      if (isOnHomePage) {
        // On est déjà sur la home → scroll direct
        const element = document.getElementById(sectionId);
        if (!element) return;
        const top =
          element.getBoundingClientRect().top +
          window.scrollY -
          (navRef.current?.offsetHeight ?? 80);
        window.scrollTo({ top, behavior: "smooth" });
      } else {
        // On est sur une page séparée → retour à la home puis scroll
        setPendingScroll(sectionId);
        navigate("/");
      }
    },
    [isOnHomePage, navigate]
  );

  /* ===================== LINK CLASS ===================== */
  const linkClass = (id: string, children?: any[], isMobileView = false) => {
    const isActive =
      active === id || (children && children.some((c) => c.id === active));

    if (isMobileView) {
      return `w-full px-4 py-3 rounded-xl transition-colors duration-300 flex items-center justify-between font-medium
      ${isActive ? "bg-[#23c367] text-white shadow-lg" : "text-white hover:bg-white/10"}`;
    }

    return `px-4 py-2 rounded-full transition-colors duration-300 flex items-center gap-1.5 font-medium text-sm whitespace-nowrap
    ${isActive ? "bg-[#23c367] text-white shadow-lg" : "text-white hover:bg-[#23c367]/80"}`;
  };

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 transition-all duration-300 border-b border-gray-200 bg-gradient-to-br from-[#e0f7f1] via-white to-[#f0f9ff] ${scrolled
          ? "backdrop-blur-md bg-gradient-to-br from-[#e0f7f1] via-white to-[#f0f9ff]"
          : "bg-transparent border-transparent"
        }`}
    >
      <div className="px-4 md:px-6 py-3">
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
          <nav
            className="hidden lg:flex justify-center"
            role="navigation"
            aria-label="Navigation principale"
          >
            <ul
              className="flex gap-2 items-center px-3 py-2 rounded-full transition-all duration-300"
              style={{ backgroundColor: '#0a4d7c' }}
            >              {navLinks
              .filter((l) => l.label !== "Contact")
              .map((link) => (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() =>
                    link.children && setOpenDropdown(link.label)
                  }
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={linkClass(link.id, link.children)}
                    onClick={() =>
                      !link.children && scrollToSection(link.sectionId)
                    }
                    aria-expanded={
                      link.children
                        ? openDropdown === link.label
                        : undefined
                    }
                    aria-haspopup={link.children ? "true" : undefined}
                    aria-current={active === link.id ? "page" : undefined}
                  >
                    {link.label}
                    {link.children && (
                      <motion.div
                        animate={{
                          rotate: openDropdown === link.label ? 180 : 0,
                        }}
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
                              onClick={() => scrollToSection(child.sectionId)}
                              style={{
                                background:
                                  active === child.id
                                    ? "linear-gradient(to right, #23c367, #1fa85a)"
                                    : "transparent hover:bg-[#23c367]/80",
                              }}
                              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200
                                  ${active === child.id
                                  ? "text-white shadow-lg"
                                  : "text-[#0a4d7c] hover:bg-[#23c367]/10"
                                }`}
                              aria-current={
                                active === child.id ? "page" : undefined
                              }
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
              className={`group relative px-6 py-2.5 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden
                ${active === "Contact" ? "ring-2 ring-white ring-offset-2 ring-offset-[#23c367]" : ""}`}
              aria-label="Aller à la section contact"
            >
              <span className="relative z-10">Contact</span>
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to right, #23c367, #1fa85a)",
                }}
              ></div>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(to right, #1fa85a, #23c367)",
                }}
              ></div>
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

      {/* ================= MOBILE MENU ================= */}
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
                        scrollToSection(link.sectionId);
                      }
                    }}
                    className={linkClass(link.id, link.children, true)}
                    aria-expanded={
                      link.children ? openDropdown === link.label : undefined
                    }
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
                              onClick={() => scrollToSection(child.sectionId)}
                              className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors duration-200 font-medium text-sm
                                ${active === child.id
                                  ? "bg-[#23c367] text-white shadow-lg"
                                  : "text-white/90 hover:bg-white/10"
                                }`}
                              aria-current={
                                active === child.id ? "page" : undefined
                              }
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