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
      linkedin: "https://cm.linkedin.com/company/yapithe-partners",
      email: "michel.yapithe@yapithepartners.com",
      featured: true,
    },
    {
      name: "Mouhammadou Yakouba",
      role: "Directeur Général Adjoint",
      img: "/membre2.png",
      bio: "Je suis responsable de l'assistance à la Direction Générale dans la gestion stratégique et opérationnelle du cabinet",
      linkedin: "https://www.linkedin.com/in/mouhammadou-yakouba-a8234a264/",
      email: "yakouba.mouhamadou@yapithepartners.com",
      featured: false,
    },
    {
      name: "Williams BAMATABINA",
      role: "Consultant",
      img: "/membre3.png",
      bio: "",
      linkedin: "#",
      email: "",
      featured: false,
    },
    {
      name: "Paola KOUMDA",
      role: "Consultante",
      img: "/membre4.png",
      bio: "Contrôle de gestion & pilotage de la performance",
      linkedin: "#",
      email: "paola.koumda@yapithepartners.com",
      featured: false,
    },
    {
      name: "Mouhamadou Mahama",
      role: "",
      img: "/membre6.png",
      bio: "",
      linkedin: "https://www.linkedin.com/in/mouhamadou-mahama-243688122/",
      email: "mahama.mouhamadou@yapithepartners.com",
      featured: false,
    },
    {
      name: "Atenga Owona Marie-Viviane",
      role: "Consultante en contrôle de gestion",
      img: "/membre7.png",
      bio: "Rédaction des cahiers de charge, construction des tableaux de bord",
      linkedin: "#",
      email: "viviane.atenga@yapithepartners.com",
      featured: false,
    },
    {
      name: "Nwaha Onana Jenaye Bertille Deborah",
      role: "Consultante",
      img: "/membre8.png",
      bio: "Rédaction des cahiers de charge, construction des tableaux de bord",
      linkedin: "#",
      email: "sophie.ondoua@yapithepartners.com",
      featured: false,
    },
    {
      name: "Albert Narcisse Ibato",
      role: "Consultant",
      img: "/membre9.png",
      bio: "",
      linkedin: "#",
      email: "albert.ibato@yapithepartners.com",
      featured: false,
    },
    {
      name: "Olinga Njoya Jean Pascal",
      role: "Consultant",
      img: "/membre10.png",
      bio: "",
      linkedin: "#",
      email: "jeanpascal.olinga@yapithepartners.com",
      featured: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 14 },
    },
  };

  const validMembers = members.filter((m) => m.name && m.name.trim() !== "");
  const [featured, ...rest] = validMembers;

  return (
    <motion.section
      id="team"
      variants={fadeUp}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-full mx-auto py-16 sm:py-20 bg-gradient-to-br from-[#0a4d7c] via-[#0c5d94] to-[#0a4d7c] relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#23c367]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0c5d94]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
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
            <span className="bg-gradient-to-r from-[#23c367] to-[#1fa85a] text-transparent bg-clip-text">
              à votre service
            </span>
          </h2>

          <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
            Notre équipe est composée de professionnels expérimentés et
            passionnés, chacun expert dans son domaine. Ensemble, nous mettons
            notre savoir-faire au service de vos projets.
          </p>
        </motion.div>

        {/* ── FEATURED CARD (Directeur Général) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="mb-10"
        >
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_rgba(35,195,103,0.35)] transition-all duration-500 flex flex-col md:flex-row"
          >
            {/* Left: image panel */}
            <div className="relative md:w-80 lg:w-96 flex-shrink-0 bg-gradient-to-br from-[#0a4d7c] to-[#0c5d94] flex items-center justify-center p-10">
              <div className="absolute -top-12 -right-12 w-52 h-52 bg-[#23c367]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full blur-xl" />

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative hidden md:block"
              >
                <div className="w-52 h-52 mx-auto rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl group-hover:border-[#23c367]/60 transition-all duration-500">
                  <img
                    src={featured.img}
                    alt={featured.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </motion.div>

              {/* Mobile version */}
              <div className="relative md:hidden">
                <div className="w-44 h-44 mx-auto rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img
                    src={featured.img}
                    alt={featured.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#23c367] rounded-full">
                <span className="text-white text-xs font-bold uppercase tracking-wider">Direction</span>
              </div>
            </div>

            {/* Right: content */}
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
              <div className="mb-2">
                <span className="text-[#23c367] font-semibold text-sm uppercase tracking-wider">
                  {featured.role}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0a4d7c] mb-3 group-hover:text-[#0c5d94] transition-colors duration-300">
                {featured.name}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-lg">
                {featured.bio}
              </p>

              {/* Divider */}
              <div className="w-16 h-1 bg-gradient-to-r from-[#23c367] to-[#1fa85a] rounded-full mb-6" />

              <div className="flex gap-3">
                <motion.a
                  href={featured.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={`mailto:${featured.email}`}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 bg-gradient-to-br from-[#23c367] to-[#1fa85a] rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            {/* Bottom accent bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#23c367] to-[#1fa85a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.div>
        </motion.div>

        {/* ── REST OF THE TEAM — Responsive grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {rest.map((member, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_16px_48px_rgba(35,195,103,0.28)] transition-all duration-500 flex flex-col"
            >
              {/* Image panel */}
              <div className="relative bg-gradient-to-br from-[#0a4d7c] to-[#0c5d94] p-6 flex justify-center items-center">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#23c367]/15 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                {/* Desktop float */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative hidden md:block"
                >
                  <div className="w-50 h-50 mx-auto overflow-hidden border-4 border-white/20 shadow-xl group-hover:border-[#23c367]/50 transition-all duration-500">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </motion.div>

                {/* Mobile static */}
                <div className="relative md:hidden">
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 text-center flex flex-col flex-1">
                <h3 className="text-base font-bold text-[#0a4d7c] mb-1 group-hover:text-[#23c367] transition-colors duration-300 leading-snug">
                  {member.name}
                </h3>

                {member.role && (
                  <p className="text-[#23c367] font-semibold text-xs mb-2 uppercase tracking-wide">
                    {member.role}
                  </p>
                )}

                {member.bio && (
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1">
                    {member.bio}
                  </p>
                )}

                {/* Push links to bottom */}
                <div className="mt-auto pt-4 flex justify-center gap-2">
                  <motion.a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.a>
                  {member.email && (
                    <motion.a
                      href={`mailto:${member.email}`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-9 h-9 bg-gradient-to-br from-[#23c367] to-[#1fa85a] rounded-lg flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <Mail className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Accent */}
              <div className="h-1 bg-gradient-to-r from-[#23c367] to-[#1fa85a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Team;