import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Briefcase,
  Truck,
  BarChart2,
  ArrowRight,
  BookCheck,
  Play,
  ChevronRight,
} from "lucide-react";
import type { Variants } from "framer-motion";
import FormationsPage from "./Formation";
import { useNavigate } from "react-router-dom";
import {PdfModal} from "./PdfModal";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  pdf: string;
}

// ─── Main Services Component ──────────────────────────────────────────────────
const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showFormations, setShowFormations] = useState(false);
  const navigate = useNavigate();

  const services: Service[] = [
    {
      id: 1,
      title: "Pilotage de performance",
      description: "Analyse des processus, mise en place d'outils de contrôle de gestion, tableaux de bord et systèmes de pilotage.",
      icon: <Briefcase className="w-10 h-10" />,
      color: "from-blue-500 to-cyan-500",
      pdf: "/PilotagePerf.pdf",
    },
    {
      id: 2,
      title: "Performance & Pilotage",
      description: "Suivi des indicateurs clés (KPI), optimisation des coûts, amélioration de la rentabilité et sécurisation de la croissance.",
      icon: <Truck className="w-10 h-10" />,
      color: "from-emerald-500 to-teal-500",
      pdf: "/comptabilite_analytique.pdf",
    },
    {
      id: 3,
      title: "Accompagnement stratégique",
      description: "Conseil aux dirigeants, aide à la décision, structuration financière et accompagnement dans les phases de transformation.",
      icon: <BarChart2 className="w-10 h-10" />,
      color: "from-purple-500 to-indigo-500",
      pdf: "/OutilsElaboration.pdf",
    },
    {
      id: 4,
      title: "Formation & Coaching",
      description: "Formation personnalisée et coaching pour les équipes et les dirigeants.",
      icon: <BookCheck className="w-10 h-10" />,
      color: "from-amber-500 to-orange-500",
      pdf: "/formation.pdf",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 15, stiffness: 100 } },
  };

  return (
    <>
      <motion.section
        id="Services"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full py-16 md:py-24 bg-linear-to-br from-[#0a4d7c] via-[#0c5d94] to-[#0a4d7c] px-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#23c367]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
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
              <span className="text-[#23c367] font-semibold text-sm uppercase tracking-wider">Nos Services</span>
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Des solutions adaptées à{" "}
              <span className="bg-linear-to-r from-[#23c367] to-[#1fa85a] text-transparent bg-clip-text">vos besoins</span>
            </h2>
            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
              Yapithe & Partners offre une vaste gamme de services professionnels conçus pour aider les organisations à réussir dans leurs domaines respectifs.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_rgba(35,195,103,0.3)] transition-all duration-500"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url("/service${service.id}.jpeg")` }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/50 to-black/70 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/60 transition-all duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-20 blur-xl`} />
                </div>

                <div className="relative p-8 flex flex-col h-full min-h-[320px]">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-linear-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="text-white">{service.icon}</div>
                  </motion.div>

                  <div className="absolute top-6 right-6 text-white/20 font-bold text-5xl">0{service.id}</div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{service.title}</h3>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed">{service.description}</p>
                  </div>

                  <motion.button
                    onClick={() => setSelectedService(service)}
                    className="flex items-center gap-2 text-[#23c367] font-semibold mt-6 group-hover:gap-4 transition-all duration-300 cursor-pointer w-fit"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-sm">En savoir plus</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </motion.button>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/4 bg-linear-to-b from-white/10 to-transparent blur-2xl" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Bouton "Nos Précédentes Formations" ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 flex justify-center"
          >
            <motion.button
              onClick={() => navigate("/formations")}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center gap-4 cursor-pointer"
            >
              {/* Glow behind button */}
              <span className="absolute inset-0 rounded-2xl bg-[#23c367]/20 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <span className="relative flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0a4d7c] to-[#0c5d94] border border-white/20 group-hover:border-[#23c367]/50 shadow-xl shadow-black/30 group-hover:shadow-[#23c367]/20 transition-all duration-400 overflow-hidden">
                {/* Shimmer sweep */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                {/* Icon container */}
                <span className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#23c367] to-[#0a9d4f] flex items-center justify-center shadow-lg shadow-[#23c367]/40 group-hover:shadow-[#23c367]/60 transition-shadow duration-300 flex-shrink-0">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </span>

                {/* Text */}
                <span className="flex flex-col items-start">
                  <span className="text-[#23c367] text-xs font-semibold uppercase tracking-widest leading-none mb-0.5">
                    Vidéothèque
                  </span>
                  <span className="text-white font-bold text-base leading-tight">
                    Nos Précédentes Formations
                  </span>
                </span>

                {/* Arrow */}
                <span className="relative ml-2 w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-[#23c367]/20 group-hover:border-[#23c367]/40 transition-all duration-300 flex-shrink-0">
                  <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-[#23c367] group-hover:translate-x-0.5 transition-all duration-300" />
                </span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* PDF Modal */}
      <AnimatePresence>
        {selectedService && (
          <PdfModal pdf={selectedService.pdf} title={selectedService.title} onClose={() => setSelectedService(null)} />
        )}
      </AnimatePresence>

      {/* Formations Page Modal */}
      <AnimatePresence>
        {showFormations && (
          <FormationsPage onClose={() => setShowFormations(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Services;