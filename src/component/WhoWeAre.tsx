import { motion, AnimatePresence } from "framer-motion";
import { Target, Award, Users, TrendingUp, X, ChevronDown, ChevronUp } from "lucide-react";
import type { Variants } from "framer-motion";
import { useState, useEffect } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const WhoWeAre = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMoreText, setShowMoreText] = useState(false);
  const [activeModal, setActiveModal] = useState<number | null>(null);

   const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fermer modal avec Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveModal(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const highlights = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Mission",
      shortDesc: "Le cabinet de référence en Contrôle de Gestion en Afrique Centrale.",
      fullDesc: `Le cabinet de référence en Contrôle de Gestion et pilotage de la performance en Afrique Centrale.

Fondé en 2013 à Douala, Cameroun, Yapithe & Partners est le pionnier absolu du conseil en contrôle de gestion et pilotage de la performance dans la sous-région d'Afrique Centrale.

Porté par une vision forte — celle d'une Afrique qui se pilote avec les meilleurs standards internationaux — notre cabinet accompagne les entreprises, les institutions et les organisations publiques dans la mise en place de dispositifs de gestion robustes, efficaces et durables.

Notre expertise est nourrie d'une pratique terrain de plus d'une décennie, combinant rigueur académique, expérience opérationnelle et connaissance approfondie des réalités économiques africaines.`,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Expertise",
      shortDesc: "Ce qui nous distingue fondamentalement.",
      fullDesc: `Ce qui nous distingue fondamentalement

01 — Pionniers & Experts reconnus
Plus de 10 ans d'expérience exclusive en contrôle de gestion en Afrique Centrale. Nos consultants cumulent une expertise terrain et académique de haut niveau.

02 — Approche sur-mesure & contextualisée
Contrairement aux grands cabinets internationaux, nous adaptons chaque mission aux réalités économiques, culturelles et organisationnelles spécifiques au contexte africain.

03 — Engagement total sur les résultats
Nous ne livrons pas des rapports. Nous transformons réellement vos organisations. Notre modèle garantit un transfert de compétences durable.

04 — Double expertise : Conseil & Académique
Nos experts sont à la fois praticiens du terrain et enseignants dans les meilleures écoles de commerce.

05 — Standards internationaux, ancrage local
Nos méthodes s'inspirent des meilleures pratiques mondiales tout en intégrant les contraintes propres aux marchés d'Afrique.

06 — Partenaire de long terme
Notre approche n'est pas transactionnelle. Nous construisons des relations durables avec nos clients.`,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Clients",
      shortDesc: "100+ entreprises accompagnées.",
      fullDesc: `100+ entreprises accompagnées dans toute l'Afrique Centrale.

Nos clients incluent des entreprises privées, des institutions publiques, des ONG et des organisations internationales opérant au Cameroun, au Gabon, en RDC, au Congo Brazzaville, en Centrafrique et dans toute la sous-région.

Nous sommes fiers d'avoir contribué à la transformation de ces organisations en les dotant d'outils de pilotage performants et adaptés à leurs réalités.`,
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Notre Approche",
      shortDesc: "Une méthodologie éprouvée en 4 étapes.",
      fullDesc: `Une méthodologie éprouvée en 4 étapes

01 — Diagnostic
Analyse approfondie de votre organisation, de vos processus et de votre maturité en gestion pour établir un état des lieux précis et objectif.

02 — Conception
Co-construction avec vos équipes d'un système de pilotage adapté à vos enjeux stratégiques, opérationnels et à votre culture d'entreprise.

03 — Déploiement
Implémentation progressive et accompagnée des outils et dispositifs, avec formation intégrée pour garantir l'appropriation par vos collaborateurs.

04 — Ancrage
Suivi post-mission, ajustements et montée en puissance pour pérenniser la transformation et ancrer durablement la culture de la performance.`,
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

  const shortText = "Depuis plus d'une décennie, nous accompagnons les entreprises, institutions publiques et organisations de la sous-région dans la mise en place d'outils et de systèmes de pilotage de la performance.";
  const extraText = "Portés par une conviction forte — celle qu'une Afrique qui se pilote bien est une Afrique qui performe — nos experts combinent excellence académique, expérience terrain et maîtrise des meilleurs standards internationaux pour offrir des solutions concrètes, durables et adaptées aux réalités africaines.";

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

      {/* ── MODAL ── */}
      <AnimatePresence>
        {activeModal !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header modal */}
              <div className={`p-6 bg-gradient-to-r ${highlights[activeModal].gradient} relative`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white">
                    {highlights[activeModal].icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{highlights[activeModal].title}</h3>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Contenu modal */}
              <div className="p-6 overflow-y-auto max-h-[55vh]">
                <div className="space-y-3">
                  {highlights[activeModal].fullDesc.split("\n\n").map((para, i) => (
                    <p key={i} className={`leading-relaxed ${i === 0 ? "text-[#0a4d7c] font-semibold text-base" : "text-gray-600 text-sm"}`}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Footer modal */}
              <div className="px-6 pb-6">
                <button
                  onClick={() => setActiveModal(null)}
                  className={`w-full py-3 rounded-xl text-white font-semibold text-sm bg-gradient-to-r ${highlights[activeModal].gradient} hover:opacity-90 transition-opacity`}
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── COLONNE TEXTE ── */}
          <motion.div
            initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            whileInView={isMobile ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={isMobile ? {} : { duration: 0.6 }}
            className="space-y-6"
          >
            {/* Badge */}
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

            {/* Paragraphes avec "Voir plus" */}
            <div className="space-y-4">
              <p className="text-base md:text-lg text-[#7090a6] leading-relaxed">
                <span className="font-semibold text-[#0a4d7c]">Yapithe & Partners</span> c'est le{" "}
                <span className="font-semibold text-[#0a4d7c]">
                  premier et unique cabinet d'expertise en Contrôle de Gestion et Pilotage de la Performance d'Afrique Centrale,
                </span>{" "}
                fondé en 2013 à Douala, Cameroun.
              </p>

              <p className="text-base md:text-lg text-[#7090a6] leading-relaxed">{shortText}</p>

              <AnimatePresence>
                {showMoreText && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="text-base md:text-lg text-[#7090a6] leading-relaxed overflow-hidden"
                  >
                    {extraText}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Bouton voir plus / moins */}
              <button
                onClick={() => setShowMoreText(!showMoreText)}
                className="flex items-center gap-1.5 text-sm font-semibold text-[#23c367] hover:text-[#1fa85a] transition-colors group"
              >
                {showMoreText ? (
                  <>
                    Voir moins
                    <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                ) : (
                  <>
                    Voir plus
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {/* Points clés */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6"
            >
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={isMobile ? {} : { y: -5, scale: 1.02 }}
                  className="group bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl border border-gray-100 hover:border-green-300 transition-all duration-300 relative overflow-hidden cursor-pointer"
                  onClick={() => setActiveModal(index)}
                >
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${highlight.gradient}`}></div>
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 text-white bg-gradient-to-br ${highlight.gradient}`}>
                      {highlight.icon}
                    </div>
                    <h3 className="font-bold text-[#0a4d7c] mb-1 text-sm">{highlight.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{highlight.shortDesc}</p>
                    {/* Voir plus inline */}
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#23c367] group-hover:underline">
                      Voir plus <ChevronDown className="w-3 h-3" />
                    </span>
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
                onClick ={() => scrollToSection("Services")}              
                whileHover={isMobile ? {} : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-[#23c367] to-[#1fa85a]"
              >
                Découvrir nos services
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ── COLONNE IMAGE + CITATION ── */}
          <motion.div
            initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            whileInView={isMobile ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={isMobile ? {} : { duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Image principale */}
            <div className="relative flex justify-center">
              <div className="relative">
                <div className="absolute -top-8 -right-8 w-72 h-72 rounded-full blur-3xl bg-gradient-to-br from-green-200 to-green-300/20"></div>
                <div className="absolute -bottom-8 -left-8 w-72 h-72 rounded-full blur-3xl bg-gradient-to-br from-blue-200 to-blue-300/20"></div>

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

            {/* ── CITATION SOUS L'IMAGE ── */}
            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={isMobile ? {} : { delay: 0.8, duration: 0.6 }}
              className="flex flex-col items-center text-center max-w-sm px-4 pt-4"
            >
              {/* Petite photo au-dessus de la citation */}
              <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 ring-2 ring-green-400">
                <img
                  src="/yapth2.png"
                  alt="Auteur de la citation"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Guillemet décoratif */}
              <span className="text-5xl text-[#23c367]/30 font-serif leading-none mb-1 select-none">"</span>

              {/* Citation en italique */}
              <p className="text-sm md:text-base text-[#7090a6] leading-relaxed italic">
                La performance ne se décrète pas. Elle se construit, se mesure et se pilote. Notre mission est d'outiller les organisations africaines pour qu'elles atteignent l'excellence — avec les meilleurs standards du monde.
              </p>

              {/* Ligne décorative + auteur */}
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#23c367]"></div>
                <span className="text-xs font-semibold text-[#0a4d7c] uppercase tracking-wider">
                  Fondateur, Yapithe & Partners
                </span>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#23c367]"></div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
};

export default WhoWeAre;