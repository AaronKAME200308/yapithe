import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Calendar, ArrowRight, Clock } from "lucide-react";

const Chroniques = () => {
  const chroniquesData = [
    {
      id: 1,
      title: "L'art du pilotage financier",
      description: "Comment optimiser vos tableaux de bord pour une meilleure prise de décision.",
      date: "15 Jan 2025",
      readTime: "5 min",
      category: "Gestion",
      image: "/chronique1.jpg",
    },
    {
      id: 2,
      title: "Performance & croissance",
      description: "Les clés pour sécuriser et accélérer le développement de votre entreprise.",
      date: "08 Jan 2025",
      readTime: "7 min",
      category: "Stratégie",
      image: "/chronique2.jpg",
    },
    {
      id: 3,
      title: "Transformation digitale",
      description: "Accompagner le changement et moderniser vos processus de gestion.",
      date: "22 Déc 2024",
      readTime: "6 min",
      category: "Innovation",
      image: "/chronique3.jpg",
    },
  ];

  // Variants d'animation
  const fadeDirection = (index: number): Variants => ({
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
      },
    },
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <motion.section
      id="Chroniques"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full py-16 md:py-24 bg-linear-to-br from-[#0a4d7c] via-[#0c5d94] to-[#0a4d7c] relative overflow-hidden"
    >
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#23c367]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block px-4 py-2 bg-[#23c367]/20 backdrop-blur-sm rounded-full mb-4"
          >
            <span className="text-[#23c367] font-semibold text-sm uppercase tracking-wider">
              Nos Chroniques
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Perspectives d'
            <span className="bg-linear-to-r from-[#23c367] to-[#1fa85a] text-transparent bg-clip-text">
              experts
            </span>
          </h2>

          <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
            Découvrez nos chroniques d'experts où nous partageons des points de
            vue, des tendances et des analyses sur la gestion d'entreprise, la
            performance et les conseils stratégiques.
          </p>
        </motion.div>

        {/* Grid de chroniques */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {chroniquesData.map((chronique, index) => (
            <motion.div
              key={chronique.id}
              variants={fadeDirection(index)}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_rgba(35,195,103,0.3)] transition-all duration-500"
            >
              {/* Image avec overlay */}
              <div className="relative h-56 overflow-hidden">
                <motion.img
                  src={chronique.image}
                  alt={chronique.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Overlay linear */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Badge catégorie */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-[#0a4d7c] shadow-lg">
                    {chronique.category}
                  </span>
                </div>

                {/* Info date et temps en bas */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 text-white text-xs">
                  <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{chronique.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{chronique.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-[#0a4d7c] mb-3 leading-tight group-hover:text-[#23c367] transition-colors duration-300">
                  {chronique.title}
                </h3>

                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 line-clamp-2">
                  {chronique.description}
                </p>

                {/* Bouton */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group/btn w-full px-6 py-3.5 rounded-xl bg-linear-to-r from-[#23c367] to-[#1fa85a] text-white font-semibold shadow-lg hover:shadow-xl relative overflow-hidden transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Lire l'article
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-[#1fa85a] to-[#23c367] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </div>

              {/* Accent line en bas */}
              <div className="h-1.5 bg-linear-to-r from-[#23c367] to-[#1fa85a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA pour voir toutes les chroniques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white hover:text-[#0a4d7c] transition-all duration-300 inline-flex items-center gap-2"
          >
            Voir toutes les chroniques
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Chroniques;