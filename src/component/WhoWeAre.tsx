import { motion } from "framer-motion";
import { Target, Award, Users, TrendingUp } from "lucide-react";
import type { Variants } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const WhoWeAre = () => {
  const highlights = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Mission",
      desc: "Accompagner les entreprises vers l'excellence",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Expertise",
      desc: "15+ ans d'expérience terrain",
      color: "from-[#23c367] to-[#1fa85a]",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Clients",
      desc: "100+ entreprises accompagnées",
      color: "from-purple-500 to-indigo-600",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Résultats",
      desc: "Croissance moyenne de 35%",
      color: "from-orange-500 to-red-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      id="about"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full py-16 md:py-24 bg-linear-to-br from-[#e0f7f1] via-white to-[#f0f9ff] relative overflow-hidden"
    >
      {/* Éléments décoratifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#23c367]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block px-4 py-2 bg-linear-to-r from-[#23c367]/20 to-[#0a4d7c]/20 backdrop-blur-sm rounded-full mb-2"
            >
              <span className="bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text font-semibold text-sm uppercase tracking-wider">
                À propos
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text leading-tight">
              Qui sommes-nous ?
            </h2>

            <div className="space-y-4">
              <p className="text-base md:text-lg text-[#7090a6] leading-relaxed">
                <span className="font-semibold text-[#0a4d7c]">
                  Yapithe & Partners
                </span>{" "}
                est un cabinet spécialisé dans le conseil et l'accompagnement
                stratégique des entreprises. Nous fournissons des solutions
                innovantes et efficaces pour aider nos clients à se développer
                durablement.
              </p>

              <p className="text-base md:text-lg text-[#7090a6] leading-relaxed">
                Notre expertise couvre{" "}
                <span className="font-semibold text-[#23c367]">
                  l'exploitation forestière, la logistique, le transport, le
                  commerce général et le BTP
                </span>
                . Nous mettons notre savoir-faire au service de votre réussite.
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
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl border border-gray-100 hover:border-[#23c367]/30 transition-all duration-300 relative overflow-hidden"
                >
                  {/* linear hover effect */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${highlight.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  ></div>

                  <div className="relative">
                    {/* Icône */}
                    <div
                      className={`w-12 h-12 rounded-xl bg-linear-to-br ${highlight.color} flex items-center justify-center text-white mb-3 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                    >
                      {highlight.icon}
                    </div>

                    {/* Texte */}
                    <h3 className="font-bold text-[#0a4d7c] mb-1 text-sm">
                      {highlight.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {highlight.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-linear-to-r from-[#23c367] to-[#1fa85a] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Découvrir nos services
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image avec design amélioré */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Cercle décoratif arrière */}
              <div className="absolute -top-8 -right-8 w-72 h-72 bg-linear-to-br from-[#23c367]/20 to-[#1fa85a]/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-linear-to-br from-[#0a4d7c]/20 to-[#0c5d94]/20 rounded-full blur-3xl"></div>

              {/* Container image principal */}
              <div className="relative">
                {/* Cadre décoratif 1 */}
                <motion.div
                  initial={{ rotate: -5, scale: 0.9 }}
                  whileInView={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute -top-4 -left-4 w-full h-full bg-linear-to-br from-[#23c367] to-[#1fa85a] rounded-[200px] opacity-20"
                ></motion.div>

                {/* Cadre décoratif 2 */}
                <motion.div
                  initial={{ rotate: 5, scale: 0.9 }}
                  whileInView={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="absolute -bottom-4 -right-4 w-full h-full bg-linear-to-br from-[#0a4d7c] to-[#0c5d94] rounded-[200px] opacity-20"
                ></motion.div>

                {/* Image principale */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative w-80 md:w-96 h-96 md:h-[28rem] rounded-[200px] overflow-hidden shadow-2xl border-8 border-white"
                >
                  <img
                    src="/images.png"
                    alt="Qui sommes-nous ?"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a4d7c]/20 via-transparent to-transparent"></div>
                </motion.div>

                {/* Badge flottant */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-4 border-4 border-[#23c367]"
                >
                  <div className="text-center">
                    <p className="text-3xl font-bold bg-linear-to-r from-[#23c367] to-[#1fa85a] text-transparent bg-clip-text">
                      15+
                    </p>
                    <p className="text-xs font-semibold text-gray-600">
                      Années d'expertise
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WhoWeAre;