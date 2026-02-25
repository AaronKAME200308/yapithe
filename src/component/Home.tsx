import { motion } from "framer-motion";
import CountUp from "./Count";
import { ArrowRight, MoveDownRight } from "lucide-react";
import { useState, useEffect } from "react";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="Accueil"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0b2035 0%, #0f3358 50%, #0b3d25 100%)" }}
    >

      {/* ── Grain texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* ── Ambient glow ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #23c367 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #0a4d7c 0%, transparent 70%)" }}
        />
      </div>



      {/* ── TOP BAR ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-10 flex items-center justify-between px-8 md:px-16 pt-10"
      >
        <div className="flex items-center gap-3">
          <span className="block w-6 h-px bg-[#23c367]" />
          <span className="text-[10px] uppercase tracking-[0.35em] font-medium text-white/40">
            Cabinet de conseil
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#23c367] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#23c367]/80">
            Afrique · Europe
          </span>
        </div>
      </motion.div>

      {/* ── MAIN CONTENT — bottom anchored ── */}
      <div className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-10 px-8 md:px-16 pb-14 mt-auto">

        {/* LEFT — Titre + tagline + CTA */}
        <div className="space-y-4 max-w-sm">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-michroma text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
          >
            <span className="text-white">Yapithe</span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #23c367, #1af0aa)" }}
            >
              & Partners
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-white/40 text-sm leading-relaxed max-w-[260px]"
          >
            Contrôle de gestion & pilotage de la performance.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection("Contact")}
            className="group mt-2 flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-semibold text-[#071e38] transition-all duration-300"
            style={{ background: "linear-gradient(90deg, #23c367, #1af0aa)" }}
          >
            Travaillons ensemble
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* RIGHT — Logo + Stats + lien services */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="flex flex-col items-start md:items-end gap-6"
        >

          {/* Logo */}
          <motion.img
            src="/logoorigin.png"
            alt="Yapithe & Partners"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-[180px] md:w-[240px] lg:w-[280px]"
            style={{ filter: "drop-shadow(0 0 40px rgba(35,195,103,0.3)) drop-shadow(0 0 80px rgba(10,77,124,0.25))" }}
          />

          {/* Séparateur */}
          <div className="w-full h-px bg-white/10" />

          {/* Stats */}
          <div className="flex gap-10">
            <div className="flex flex-col items-start md:items-end">
              <span
                className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #23c367, #1af0aa)" }}
              >
                <CountUp value={18} suffix="+" />
              </span>
              <span className="text-[11px] text-white/30 uppercase tracking-[0.25em] mt-1">
                Années
              </span>
            </div>

            <div className="w-px self-stretch bg-white/10" />

            <div className="flex flex-col items-start md:items-end">
              <span
                className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #23c367, #1af0aa)" }}
              >
                <CountUp value={150} suffix="+" />
              </span>
              <span className="text-[11px] text-white/30 uppercase tracking-[0.25em] mt-1">
                Organisations
              </span>
            </div>
          </div>

          {/* Lien services */}
          <button
            onClick={() => scrollToSection("Services")}
            className="group flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors duration-300"
          >
            <span className="border-b border-white/20 group-hover:border-white/60 transition-colors pb-0.5">
              Découvrir nos services
            </span>
            <MoveDownRight className="w-3.5 h-3.5 group-hover:translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

        </motion.div>
      </div>

      {/* ── Ligne décorative bas ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left"
        style={{ background: "linear-gradient(90deg, #23c367 0%, transparent 60%)" }}
      />

    </section>
  );
};

export default Home;