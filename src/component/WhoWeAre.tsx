import { motion } from "framer-motion";
import { Target, Award, Users, TrendingUp } from "lucide-react";
import type { Variants } from "framer-motion";
import { useState, useEffect } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const WhoWeAre = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const highlights = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Mission",
      desc: "Accompagner les entreprises vers l'excellence",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Expertise",
      desc: "18+ ans d'expérience terrain",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Clients",
      desc: "100+ entreprises accompagnées",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Résultats",
      desc: "Croissance moyenne de 35%",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const containerVariants = {
    hidden: isMobile ? { opacity: 1 } : { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: isMobile ? 0 : 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <motion.section
      id="about"
      variants={isMobile ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : fadeUp}      
      transition={isMobile ? {} : { duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-14 md:py-16 overflow-hidden bg-gradient-to-br from-[#e0f7f1] via-white to-[#f0f9ff] relative"
    >
      {/* Éléments décoratifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Texte */}
          <motion.div
            initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            whileInView={isMobile ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={isMobile ? {} : { duration: 0.6 }}
            className="space-y-6"
          >
            {/* Badge "À propos" */}
            <motion.div
              initial={isMobile ? { scale: 1 } : { scale: 0 }}
              whileInView={isMobile ? { scale: 1 } : { scale: 1 }}
              viewport={{ once: true }}
              transition={isMobile ? {} : { delay: 0.2, type: "spring" }}
              className="inline-block px-4 py-2 rounded-full mb-2 backdrop-blur-sm bg-gradient-to-r from-green-200 to-blue-200"
            >
              <span className="font-semibold text-sm uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#23c367] to-[#0a4d7c]">
                À propos
              </span>
            </motion.div>

            {/* Titre */}
            <h2 className="text-3xl md:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#23c367] to-[#0a4d7c]">
              Qui sommes-nous ?
            </h2>

            {/* Paragraphes */}
            <div className="space-y-4">
              <p className="text-base md:text-lg text-[#7090a6] leading-relaxed">
                <span className="font-semibold text-[#0a4d7c]">Yapithe & Partners</span> est un cabinet spécialisé dans le contrôle de gestion et le pilotage de la performance. Nous accompagnons dirigeants et directeurs financiers dans la structuration de leur fonction finance et la mise en place d'outils de décision efficaces.
              </p>
              <p className="text-base md:text-lg text-[#7090a6] leading-relaxed">
                Notre expertise couvre <span className="font-semibold text-[#23c367]">Diagnostic & Structuration, Performance & Pilotage, Accompagnement stratégique</span>. Nous mettons notre savoir-faire au service de votre réussite.
              </p>
            </div>

            {/* Points clés */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 pt-6"
            >
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={isMobile ? {} : { y: -5, scale: 1.02 }}
                  className="group bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl border border-gray-100 hover:border-green-300 transition-all duration-300 relative overflow-hidden"
                >
                  {/* gradient hover effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${highlight.gradient}`}></div>

                  <div className="relative">
                    {/* Icône */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 text-white bg-gradient-to-br ${highlight.gradient}`}>
                      {highlight.icon}
                    </div>
                    <h3 className="font-bold text-[#0a4d7c] mb-1 text-sm">{highlight.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{highlight.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={isMobile ? {} : { delay: 0.5 }}
              className="pt-4"
            >
              <motion.button
                whileHover={isMobile ? {} : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-[#23c367] to-[#1fa85a]"
              >
                Découvrir nos services
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image avec design amélioré */}
          <motion.div
            initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            whileInView={isMobile ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={isMobile ? {} : { duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Cercles décoratifs arrière */}
              <div className="absolute -top-8 -right-8 w-72 h-72 rounded-full blur-3xl bg-gradient-to-br from-green-200 to-green-300/20"></div>
              <div className="absolute -bottom-8 -left-8 w-72 h-72 rounded-full blur-3xl bg-gradient-to-br from-blue-200 to-blue-300/20"></div>

              {/* Image principale */}
              <div className="relative">
                {/* Cadres décoratifs */}
                <motion.div className="absolute -top-4 -left-4 w-full h-full rounded-[200px] opacity-20 bg-gradient-to-br from-green-500 to-emerald-500"></motion.div>
                <motion.div className="absolute -bottom-4 -right-4 w-full h-full rounded-[200px] opacity-20 bg-gradient-to-br from-[#0a4d7c] to-[#0c5d94]"></motion.div>

                <motion.div
                  initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
                  whileInView={isMobile ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={isMobile ? {} : { duration: 0.9, ease: "easeOut", delay: 0.5 }}
                  whileHover={isMobile ? {} : { scale: 1.05 }}
                  className="relative w-80 md:w-96 h-96 md:h-[28rem] rounded-[200px] overflow-hidden shadow-2xl border-8 border-white"
                >
                  <img src="/images.png" alt="Qui sommes-nous ?" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a4d7c]/20 to-transparent"></div>
                </motion.div>

                {/* Badge flottant */}
                <motion.div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-4 border-4 border-green-500 text-center">
                  <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#23c367] to-[#1fa85a]">18+</p>
                  <p className="text-xs font-semibold text-gray-600">Années d'expertise</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default WhoWeAre;