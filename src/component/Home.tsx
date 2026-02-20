import { motion } from "framer-motion";
import CountUp from "./Count";
import { ArrowRight, Award, Globe, Building2 } from "lucide-react";
import { useState, useEffect } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

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

  const stats = [
    {
      icon: <Award className="w-8 h-8" />,
      value: 18,
      suffix: "+",
      label: "Années d'expérience",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      text: "Afrique & Europe",
      label: "Présence internationale",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      value: 150,
      suffix: "+",
      label: "Organisations accompagnées",
      gradient: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <section
      id="Accueil"
      className="w-full min-h-screen flex items-start overflow-hidden pt-2 md:pt-3 pb-12 sm:pb-14 md:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gradient-to-br from-[#e0f7f1] via-white to-[#f0f9ff]"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-12">
        {/* ================= TITRE CENTRÉ EN HAUT ================= */}
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={isMobile ? {} : { duration: 0.6 }}
          className="text-center"
        >
          <h1 className="font-michroma text-4xl md:text-5xl lg:text-6xl text-[#0a4d7c] leading-tight">
            Yapithe & Partners
          </h1>
        </motion.div>

        {/* ================= GRID 3 COLONNES ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-8 lg:gap-12">
          
          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            variants={isMobile ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : fadeUp}
            initial="hidden"
            animate="visible"
            transition={isMobile ? {} : { duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Tagline principal */}
            <motion.p
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isMobile ? {} : { delay: 0.2 }}
              className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight bg-gradient-to-r from-[#23c367] to-[#0a4d7c] bg-clip-text text-transparent"
            >
              Cabinet de conseil
              <br />
              en contrôle de gestion
              <br />& pilotage de la performance
            </motion.p>

            {/* Description courte */}
            <motion.p
              initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={isMobile ? {} : { delay: 0.3 }}
              className="text-base md:text-lg text-[#7090a6] leading-relaxed"
            >
              Nous accompagnons les organisations dans leur transformation et leur
              quête d'excellence opérationnelle.
            </motion.p>

            {/* Boutons CTA */}
            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isMobile ? {} : { delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={isMobile ? {} : { scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="group px-6 py-3 md:px-8 md:py-4 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 bg-gradient-to-r from-[#23c367] to-[#1fa85a] text-sm md:text-base"
                onClick={() => scrollToSection("Contact")}
              >
                Travaillons ensemble
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={isMobile ? {} : { scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 md:px-8 md:py-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-[#0a4d7c]/20 text-[#0a4d7c] font-semibold hover:bg-white hover:border-[#0a4d7c]/40 transition-all duration-300 text-sm md:text-base"
                onClick={() => scrollToSection("Services")}
              >
                Nos services
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ================= CENTER IMAGE ================= */}
          <motion.div
            initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={isMobile ? {} : { duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative group">
              {/* Container image */}
              <div className="relative my-4 w-64 md:w-80 lg:w-96 h-72 md:h-96 lg:h-[450px] rounded-t-[180px] overflow-hidden shadow-2xl group-hover:shadow-[0_20px_60px_rgba(35,195,103,0.3)] transition-all duration-500 bg-gradient-to-br from-[#0a4d7c] to-[#0c5d94]">
                <img
                  src="/yapth.jpeg"
                  alt="Yapithe & Partners"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#0a4d7c]/50 to-transparent"></div>

                <motion.div
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={isMobile ? {} : { delay: 1 }}
                  className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-xl"
                >
                  <p className="text-xs md:text-sm font-semibold text-[#0a4d7c]">
                    Expertise reconnue
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-600">
                    En Afrique et en Europe
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT STATS ================= */}
          <motion.div
            variants={isMobile ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : fadeUp}
            initial="hidden"
            animate="visible"
            transition={isMobile ? {} : { duration: 0.8, delay: 0.4 }}
            className="space-y-4 lg:space-y-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={isMobile ? {} : { delay: 0.5 + index * 0.1 }}
                whileHover={isMobile ? {} : { scale: 1.05, x: 10 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group flex items-start gap-3 md:gap-4"
              >
                {/* Icône */}
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0 bg-gradient-to-br ${stat.gradient}`}>
                  {stat.icon}
                </div>

                {/* Contenu */}
                <div className="flex-1 min-w-0">
                  {stat.value !== undefined ? (
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#23c367] to-[#0a4d7c] bg-clip-text text-transparent">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </p>
                  ) : (
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight bg-gradient-to-r from-[#23c367] to-[#0a4d7c] bg-clip-text text-transparent">
                      {stat.text}
                    </p>
                  )}
                  <p className="text-xs md:text-sm lg:text-base text-[#7090a6] mt-1">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;