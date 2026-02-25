import { motion } from "framer-motion";
import CountUp from "./Count";
import { ArrowRight, MoveDownRight } from "lucide-react";

const Home = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="Accueil"
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f2d48 0%, #1a4a6e 45%, #0f3d22 100%)" }}
    >
      {/* ── Grain ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* ── Glow ambiants ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #23c367 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #1a7abf 0%, transparent 70%)" }}
        />
      </div>

      {/* ══════════════════════════════
          TOP BAR
      ══════════════════════════════ */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7 }}
        className="relative z-10 flex items-center justify-between px-6 sm:px-10 md:px-16 py-5"
      >
        <div className="flex items-center gap-2.5">
          <span className="block w-5 h-px bg-[#23c367]" />
          <span className="text-[10px] uppercase tracking-[0.32em] font-medium text-white/35">
            Cabinet de conseil
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#23c367] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.28em] font-medium text-[#23c367]/75">
            Afrique · Europe
          </span>
        </div>
      </motion.header>

      {/* ══════════════════════════════
          CONTENU PRINCIPAL
          Mobile  : colonne centrée
          Desktop : 2 colonnes, centré verticalement
      ══════════════════════════════ */}
      <div className="relative z-10 flex-1 flex items-center px-6 sm:px-10 md:px-16 py-10 md:py-0">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-12 md:gap-16">

          {/* ── GAUCHE : Titre + description + CTAs ── */}
          <div className="flex flex-col items-center md:items-start gap-5 w-full md:max-w-[420px] text-center md:text-left">

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-michroma text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight"
            >
              <span className="text-white block">Yapithe</span>
              <span
                className="bg-clip-text text-transparent block"
                style={{ backgroundImage: "linear-gradient(90deg, #23c367, #1af0aa)" }}
              >
                & Partners
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="text-white/38 text-sm sm:text-base leading-relaxed max-w-[280px]"
            >
              Contrôle de gestion & pilotage<br className="hidden sm:block" /> de la performance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollToSection("Contact")}
                className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-[#071e38] w-full sm:w-auto transition-all duration-300"
                style={{ background: "linear-gradient(90deg, #23c367, #1af0aa)" }}
              >
                Travaillons ensemble
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <button
                onClick={() => scrollToSection("Services")}
                className="group flex items-center justify-center gap-1.5 text-sm text-white/38 hover:text-white/70 transition-colors duration-300"
              >
                <span className="border-b border-white/18 group-hover:border-white/50 pb-px transition-colors">
                  Nos services
                </span>
                <MoveDownRight className="w-3.5 h-3.5 group-hover:translate-y-px group-hover:translate-x-px transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* ── DROITE : Logo + séparateur + stats ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9 }}
            className="flex flex-col items-center md:items-end gap-5 w-full md:w-auto"
          >
            {/* Logo */}
            <motion.img
              src="/logoorigin.png"
              alt="Yapithe & Partners"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-[160px] sm:w-[200px] md:w-[250px] lg:w-[300px]"
              style={{
                filter:
                  "drop-shadow(0 0 36px rgba(35,195,103,0.32)) drop-shadow(0 0 72px rgba(10,77,124,0.22))",
              }}
            />

            {/* Séparateur */}
            <div className="w-full h-px bg-white/10" />

            {/* Stats */}
            <div className="flex gap-8 sm:gap-12">
              <div className="flex flex-col items-center md:items-end">
                <span
                  className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #23c367, #1af0aa)" }}
                >
                  <CountUp value={18} suffix="+" />
                </span>
                <span className="text-[10px] sm:text-[11px] text-white/28 uppercase tracking-[0.22em] mt-1">
                  Années
                </span>
              </div>

              <div className="w-px self-stretch bg-white/10" />

              <div className="flex flex-col items-center md:items-end">
                <span
                  className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #23c367, #1af0aa)" }}
                >
                  <CountUp value={150} suffix="+" />
                </span>
                <span className="text-[10px] sm:text-[11px] text-white/28 uppercase tracking-[0.22em] mt-1">
                  Organisations
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Ligne décorative bas ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.0, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left"
        style={{ background: "linear-gradient(90deg, #23c367 0%, transparent 55%)" }}
      />
    </section>
  );
};

export default Home;