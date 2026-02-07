import { motion } from "framer-motion";
import { Briefcase, Truck, BarChart2, ArrowRight } from "lucide-react";
import type { Variants } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Diagnostic & Structuration",
      description:
        "Analyse des processus, mise en place d'outils de contrôle de gestion, tableaux de bord et systèmes de pilotage.",
      icon: <Briefcase className="w-10 h-10" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Performance & Pilotage",
      description:
        "Suivi des indicateurs clés (KPI), optimisation des coûts, amélioration de la rentabilité et sécurisation de la croissance.",
      icon: <Truck className="w-10 h-10" />,
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: 3,
      title: "Accompagnement stratégique",
      description:
        "Conseil aux dirigeants, aide à la décision, structuration financière et accompagnement dans les phases de transformation.",
      icon: <BarChart2 className="w-10 h-10" />,
      color: "from-purple-500 to-indigo-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.section
      id="Services"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full py-16 md:py-24 bg-linear-to-br from-[#0a4d7c] via-[#0c5d94] to-[#0a4d7c] px-6 relative overflow-hidden"
    >
      {/* Éléments de fond décoratifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#23c367]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header section */}
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
              Nos Services
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Des solutions adaptées à{" "}
            <span className="bg-linear-to-r from-[#23c367] to-[#1fa85a] text-transparent bg-clip-text">
              vos besoins
            </span>
          </h2>

          <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
            Yapithe & Partners offre une vaste gamme de services professionnels
            conçus pour aider les organisations à réussir dans leurs domaines
            respectifs.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, _index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_rgba(35,195,103,0.3)] transition-all duration-500"
            >
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url("/service${service.id}.jpeg")`,
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                ></motion.div>
              </div>

              <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/50 to-black/70 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/60 transition-all duration-500"></div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-20 blur-xl`}
                ></div>
              </div>

              {/* Contenu */}
              <div className="relative p-8 flex flex-col h-full min-h-[320px]">
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-linear-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-white">{service.icon}</div>
                </motion.div>

                {/* Numéro de service */}
                <div className="absolute top-6 right-6 text-white/20 font-bold text-5xl">
                  0{service.id}
                </div>

                {/* Texte */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <motion.div
                  className="flex items-center gap-2 text-[#23c367] font-semibold mt-6 group-hover:gap-4 transition-all duration-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-sm">En savoir plus</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </motion.div>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/4 bg-linear-to-b from-white/10 to-transparent blur-2xl"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Services;