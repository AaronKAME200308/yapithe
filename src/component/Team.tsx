import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import type { Variants } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Team = () => {
  const members = [
    {
      name: "Michel Eugène YAPITHE",
      role: "Directeur Général",
      img: "/yapth2.png",
      bio: "Expert en Contrôle de gestion & pilotage de la performance",
      linkedin: "#",
      email: "michel.yapithe@yapithepartners.com",
    },
    {
      name: "",
      role: "",
      img: "/membre2.png",
      bio: "",
      linkedin: "#",
      email: "",
    },
    {
      name: "",
      role: "",
      img: "/membre3.png",
      bio: "",
      linkedin: "#",
      email: "",
    },
    {
      name: "Paola KOUMBA",
      role: "Consultante",
      img: "/membre4.png",
      bio: "Contrôle de gestion & pilotage de la performance",
      linkedin: "#",
      email: "paola.koumda@yapithepartners.com",
    },
    {
      name: "",
      role: "",
      img: "/membre5.png",
      bio: "",
      linkedin: "#",
      email: "",
    },
    {
      name: "",
      role: "",
      img: "/membre6.png",
      bio: "",
      linkedin: "#",
      email: "",
    },
    {
      name: "Atenga owona marie-viviane",
      role: "Consultante en controle de gestion et pilotage de la performance",
      img: "/membre7.png",
      bio: "Redaction des cahiers de charge construction des tableaux de bord",
      linkedin: "#",
      email: "sophie.ondoua@yapithepartners.com",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Réduit pour mobile
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 }, // Réduit l'amplitude
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80, // Réduit pour plus de fluidité
        damping: 12,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.section
      id="team"
      variants={fadeUp}    
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-full mx-auto py-12 sm:py-14 md:py-16 bg-linear-to-br from-[#0a4d7c] via-[#0c5d94] to-[#0a4d7c] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#23c367]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} // Réduit l'amplitude
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }} // Plus sensible
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }} // Ajout opacity
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-block px-4 py-2 bg-[#23c367]/20 backdrop-blur-sm rounded-full mb-4"
          >
            <span className="text-[#23c367] font-semibold text-sm uppercase tracking-wider">
              Notre Équipe
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Des experts{" "}
            <span className="bg-linear-to-r from-[#23c367] to-[#1fa85a] text-transparent bg-clip-text">
              à votre service
            </span>
          </h2>

          <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
            Notre équipe est composée de professionnels expérimentés et
            passionnés, chacun expert dans son domaine. Ensemble, nous mettons
            notre savoir-faire au service de vos projets.
          </p>
        </motion.div>

        {/* Grid des membres */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }} // Encore plus sensible pour le grid
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {members.map((member, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_rgba(35,195,103,0.3)] transition-all duration-500"
            >
              {/* Image  */}
              <div className="relative overflow-hidden bg-linear-to-br from-[#0a4d7c] to-[#0c5d94] p-8">
                {/* Cercle décoratif */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#23c367]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                {/* Animation flottante désactivée sur mobile pour la performance */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative hidden md:block"
                >
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-2xl group-hover:border-[#23c367]/50 transition-all duration-500">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </motion.div>

                {/* Version statique pour mobile */}
                <div className="relative md:hidden">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-2xl group-hover:border-[#23c367]/50 transition-all duration-500">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-[#0a4d7c] mb-2 group-hover:text-[#23c367] transition-colors duration-300">
                  {member.name}
                </h3>

                <p className="text-[#23c367] font-semibold text-sm mb-3">
                  {member.role}
                </p>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Liens sociaux */}
                <div className="flex justify-center gap-3">
                  <motion.a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>

                  <motion.a
                    href={`mailto:${member.email}`}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-linear-to-br from-[#23c367] to-[#1fa85a] rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Mail className="w-5 h-5" />
                  </motion.a>

                  {/* <motion.a
                    href="#"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-linear-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Phone className="w-5 h-5" />
                  </motion.a> */}
                </div>
              </div>

              {/* Accent */}
              <div className="h-1.5 bg-linear-to-r from-[#23c367] to-[#1fa85a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* rejoindre l'équipe
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">
              Rejoignez notre équipe !
            </h3>
            <p className="text-white/80 mb-6">
              Nous recherchons constamment des talents passionnés pour renforcer
              notre équipe d'experts.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-linear-to-r from-[#23c367] to-[#1fa85a] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Voir les opportunités
            </motion.button>
          </div>
        </motion.div> */}
      </div>
    </motion.section>
  );
};

export default Team;