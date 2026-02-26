import { motion } from "framer-motion";
import CountUp from "./Count";
import { ArrowRight, ChevronDown, Globe2 } from "lucide-react";

const Home = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="Accueil"
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
    >
      {/* ── Photo de fond ── */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/event1.jpg')" }}
      />

      {/* ── Overlays ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,30,15,0.4) 0%, rgba(5,30,15,0.3) 35%, rgba(5,30,15,0.72) 75%, rgba(5,30,15,0.90) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(5,30,15,0.55) 0%, transparent 60%)",
        }}
      />

      {/* ══ HEADER ══ */}
      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex items-center justify-end px-5 sm:px-14 md:px-20 py-5 sm:py-7"
      >       

        <div className="flex items-center gap-1.5">
          <Globe2 className="w-4 h-4 animate-pulse" color="#ffffff" />
          <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-white">
            Afrique & Europe
          </span>
        </div>
      </motion.header>

      {/* ══ CONTENU PRINCIPAL ══ */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-5 sm:px-14 md:px-20 pb-10 sm:pb-20">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="flex items-center gap-3 mb-4 sm:mb-5"
        >
          <div className="w-6 sm:w-8 h-px bg-[#22c55e]" />
          <span className="text-[10px] sm:text-xs tracking-[0.22em] uppercase text-white">
            Cabinet de conseil
          </span>
        </motion.div>

        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 sm:mb-7"
        >
          <h1 className="font-michroma text-[clamp(2.4rem,10vw,6.5rem)] leading-[1.05] tracking-tight text-white">
            Yapithe
          </h1>
          <h1
            className="font-michroma text-[clamp(2.4rem,10vw,6.5rem)] leading-[1.05] tracking-tight"
            style={{ color: "#22c55e" }}
          >
            & Partners
          </h1>
        </motion.div>

        {/* Séparateur */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.75, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="origin-left mb-5 sm:mb-7 h-px w-28 sm:w-40"
          style={{ background: "#ffffff" }}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-sm sm:text-xl text-white/80 leading-relaxed tracking-wide max-w-[240px] sm:max-w-[300px] mb-5 sm:mb-6"
        >
          Contrôle de gestion & pilotage<br />de la performance.
        </motion.p>

        {/* Stats — mobile : ligne horizontale compacte */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.88, duration: 0.8 }}
          className="flex gap-6 items-center mb-6 sm:hidden"
        >
          <div>
            <p className="text-2xl leading-none text-white font-semibold">
              <CountUp value={18} suffix="+" />
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/60 mt-0.5">Années</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div>
            <p className="text-2xl leading-none text-white font-semibold">
              <CountUp value={150} suffix="+" />
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/60 mt-0.5">Organisations</p>
          </div>
        </motion.div>

        {/* CTAs — mobile : pleine largeur, desktop : inline */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-8"
        >
          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToSection("Contact")}
              className="flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 rounded-full text-sm tracking-[0.1em] text-white transition-all duration-300 w-full sm:w-auto"
              style={{ background: "#16a34a" }}
            >
              Travaillons ensemble
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToSection("Services")}
              className="flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 rounded-full text-sm tracking-[0.1em] text-white transition-all duration-300 w-full sm:w-auto"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              Nos services
            </motion.button>
          </div>

          {/* Stats — desktop uniquement */}
          <div className="hidden sm:flex gap-8 items-end">
            <div className="text-right">
              <p className="text-[clamp(2rem,4vw,3.2rem)] leading-none text-white">
                <CountUp value={18} suffix="+" />
              </p>
              <p className="text-[9px] uppercase tracking-[0.22em] text-white mt-1">Années</p>
            </div>
            <div className="w-px h-10 bg-white/15" />
            <div className="text-right">
              <p className="text-[clamp(2rem,4vw,3.2rem)] leading-none text-white">
                <CountUp value={150} suffix="+" />
              </p>
              <p className="text-[9px] uppercase tracking-[0.22em] text-white mt-1">Organisations</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="relative z-10 flex justify-center pb-5 sm:pb-7 cursor-pointer"
        onClick={() => scrollToSection("Services")}
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5 text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;