import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

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

/* ===================== NAVBAR COMPONENT ===================== */
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Accueil");
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  /* ===================== SCROLL LISTENER ===================== */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = document.querySelectorAll("section");
      let current = "Accueil";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 0) {
          current = section.id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ===================== SCROLL TO SECTION ===================== */
  const scrollToSection = (id: string) => {
    setActive(id);
    setOpenDropdown(null);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  /* ===================== LINK CLASS ===================== */
  const linkClass = (id: string, children?: any[]) => {
    const isActive =
      active === id || (children && children.some((c) => c.id === active));
    return `w-fit whitespace-nowrap px-4 py-1 rounded-full transition-all duration-300 flex items-center gap-1
      ${isActive
        ? "bg-[#23c367] text-white shadow-md"
        : "text-[#23c367] hover:bg-gray-100 hover:scale-105 hover:text-[#23c367]"
      }`;
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300
        ${scrolled
          ? " border bg-transparent backdrop-blur-md shadow-lg md:rounded-full md:mx-5 md:top-2 transition-all text-white"
          : "bg-linear-to-r from-[#0a4d7c] via-[#0a4d7c] to-[#0a4c7ce7]"
        }`}
    >
      {/* ===== CONTAINER ===== */}
      <div className="max-w-6xl mx-auto px-3 py-1">
        {/* GRID 3 ZONES */}
        <div className="grid grid-cols-2 md:grid-cols-3 items-center">
          {/* ================= LOGO ================= */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center"
          >
            {scrolled ? <img src="/logoorigin.png" alt="Logo" className="ml-4 w-[70px] h-[50px]" /> : <img src="/logoorigin.jpeg" alt="Logo" className="ml-4 w-[70px] h-[50px]" />}
          </motion.div>
          {/* ================= NAV CENTER ================= */}
          <nav className="hidden md:flex justify-center">
            <ul className={`flex gap-6 items-center text-sm border px-1 py-1 rounded-full
                ${scrolled ? "bg-[#0a4d7c] " : "bg-white text-[#23c367]"}
              `}>
              {navLinks.filter((l) => l.label !== "Contact").map((link) => (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={linkClass(link.id, link.children)}
                    onClick={() => !link.children && scrollToSection(link.id)}
                  >
                    {link.label} {link.children && (
                      <span className="text-xs">▾</span>)}
                  </button>
                  {/* DROPDOWN */}
                  <AnimatePresence>
                    {link.children && openDropdown === link.label && (
                      <motion.ul
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-xl p-2"
                      >
                        {link.children.map((child) => (
                          <li key={child.id}>
                            <button onClick={() => scrollToSection(child.id)}
                              className={`w-full text-left px-4 py-2 rounded-lg text-[#23c367]
                              ${active === child.id ? "bg-[#23c367] text-white" : "hover:bg-[#23c367]/20"}`}
                            >
                              {child.label}
                            </button>
                          </li>))}
                      </motion.ul>)}
                  </AnimatePresence>
                </li>))}
            </ul>
          </nav>
          {/* ================= CONTACT RIGHT ================= */}
          <div className="hidden md:flex justify-end">
            <button
              onClick={() => scrollToSection("Contact")}
              className="px-5 py-2 rounded-full font-semibold bg-gradient-to-r from-[#23c367] via-[#23c367]/90 to-[#23c367]/80 text-white shadow-md hover:scale-105 transition-all" >
              Contact
            </button>
          </div>
          {/* ================= MOBILE BTN ================= */}
          <button
            onClick={() => {
              setOpen(!open);
              setOpenDropdown(null);
            }}
            className="
              md:hidden
              w-10 h-10
              flex items-center justify-self-end justify-center
              text-2xl
              font-bold
              text-white
              bg-[#0a4d7c]
              rounded-xl
              shadow-lg
              transition-all duration-300
              hover:bg-[#23c367]
              hover:scale-105
              active:scale-95
            "
          >
            {open ? "✕" : "☰"}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden backdrop-blur-md bg-[#0a4d7c]"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <li key={link.label} className="w-full">
                  <button
                    onClick={() => !link.children && scrollToSection(link.id)}

                    className={`w-full ${linkClass(link.id, link.children)} justify-between text-white`}
                  >
                    {link.label}
                    {link.children && (
                      <motion.span
                        animate={{ rotate: openDropdown === link.label ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        ▾
                      </motion.span>
                    )}
                  </button>


                  {/* MOBILE SUBMENU */}
                  <AnimatePresence>
                    {link.children && openDropdown === link.label && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col pl-4 mt-1 gap-1"
                      >
                        {link.children.map((child) => (
                          <li key={child.id}>
                            <button
                              onClick={() => scrollToSection(child.id)}

                              className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300
                                ${active === child.id ? "bg-[#23c367] text-white" : "text-white hover:bg-[#23c367]/20"}`}
                            >
                              {child.label}
                            </button>
                          </li>
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
