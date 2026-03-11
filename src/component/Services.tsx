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
import { PdfModal } from "./PdfModal";

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
      description:
        "Analyse des processus, mise en place d'outils de contrôle de gestion, tableaux de bord et systèmes de pilotage.",
      icon: <Briefcase className="w-7 h-7" />,
      color: "from-blue-500 to-cyan-500",
      pdf: "/PilotagePerf.pdf",
    },
    {
      id: 2,
      title: "Comptabilité Analytique",
      description:
        "Analyse des coûts pour mesurer la rentabilité et aider à la prise de décision.",
      icon: <Truck className="w-7 h-7" />,
      color: "from-emerald-500 to-teal-500",
      pdf: "/comptabilite_analytique.pdf",
    },
    {
      id: 3,
      title: "Outils d'élaboration & de Suivi du Budget",
      description:
        "Méthodes et tableaux de pilotage pour planifier, contrôler et ajuster les performances financières.",
      icon: <BarChart2 className="w-7 h-7" />,
      color: "from-purple-500 to-indigo-500",
      pdf: "/OutilsElaboration.pdf",
    },
    {
      id: 4,
      title: "Formation",
      description:
        "Développement des compétences en pilotage financier, analyse des écarts et optimisation des coûts.",
      icon: <BookCheck className="w-7 h-7" />,
      color: "from-amber-500 to-orange-500",
      pdf: "/formation.pdf",
    },
    {
      id: 5,
      title: "Accompagnement et Recrutement",
      description:
        "Support personnalisé pour la mise en œuvre de solutions de contrôle de gestion et d'optimisation des performances.",
      icon: <Play className="w-7 h-7" />,
      color: "from-green-500 to-lime-500",
      pdf: "/Accompagnement_Recrutement.pdf",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", damping: 15, stiffness: 100 },
    },
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
        className="w-full py-16 md:py-24 bg-gradient-to-br from-[#0a4d7c] via-[#0c5d94] to-[#0a4d7c] px-4 md:px-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#23c367]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
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
              <span className="bg-gradient-to-r from-[#23c367] to-[#1fa85a] text-transparent bg-clip-text">
                vos besoins
              </span>
            </h2>
            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
              Yapithe & Partners offre une vaste gamme de services professionnels
              conçus pour aider les organisations à réussir dans leurs domaines
              respectifs.
            </p>
          </motion.div>

          {/* ── 5 cards on one row, square aspect ratio ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="group relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(35,195,103,0.3)] transition-all duration-500 min-h-[260px]"
              >
                {/* Background image */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url("/service${service.id}.jpeg")` }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-black/80 group-hover:from-black/40 group-hover:via-black/35 group-hover:to-black/70 transition-all duration-500" />

                {/* Color glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 blur-xl`} />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-4">
                  {/* Top: icon + number */}
                  <div className="flex items-start justify-between">
                    <motion.div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="text-white">{service.icon}</div>
                    </motion.div>
                    <span className="text-white/20 font-bold text-3xl leading-none">
                      0{service.id}
                    </span>
                  </div>

                  {/* Bottom: title + desc + CTA */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-white leading-tight line-clamp-2">
                      {service.title}
                    </h3>
                    <p className="text-white/90 text-xs leading-relaxed">
                      {service.description}
                    </p>
                    <motion.button
                      onClick={() => setSelectedService(service)}
                      className="flex items-center gap-1.5 text-[#23c367] font-semibold group-hover:gap-3 transition-all duration-300 cursor-pointer mt-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-xs">En savoir plus</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </motion.button>
                  </div>
                </div>

                {/* Top shine on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/4 bg-gradient-to-b from-white/10 to-transparent blur-2xl" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA button */}
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
              <span className="absolute inset-0 rounded-2xl bg-[#23c367]/20 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0a4d7c] to-[#0c5d94] border border-white/20 group-hover:border-[#23c367]/50 shadow-xl shadow-black/30 group-hover:shadow-[#23c367]/20 transition-all duration-400 overflow-hidden">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                <span className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#23c367] to-[#0a9d4f] flex items-center justify-center shadow-lg shadow-[#23c367]/40 flex-shrink-0">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </span>
                <span className="flex flex-col items-start">
                  <span className="text-[#23c367] text-xs font-semibold uppercase tracking-widest leading-none mb-0.5">
                    Vidéothèque
                  </span>
                  <span className="text-white font-bold text-base leading-tight">
                    Nos Précédentes Formations
                  </span>
                </span>
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
          <PdfModal
            pdf={selectedService.pdf}
            title={selectedService.title}
            onClose={() => setSelectedService(null)}
          />
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