import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Briefcase,
  Truck,
  BarChart2,
  ArrowRight,
  BookCheck,
  X,
  Download,
  ExternalLink,
  FileText,
} from "lucide-react";
import type { Variants } from "framer-motion";

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

const PdfModal = ({
  pdf,
  title,
  onClose,
}: {
  pdf: string;
  title: string;
  onClose: () => void;
}) => {
  const [pdfError, setPdfError] = useState(false);
  const absoluteUrl =
    pdf.startsWith("/") ? `${window.location.origin}${pdf}` : pdf;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/85 backdrop-blur-lg"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-5xl h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(35,195,103,0.2)] border border-white/10"
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a4d7c] border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#23c367]/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#23c367]" />
            </div>
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest font-medium">
                Document
              </p>
              <h3 className="text-white font-bold text-base leading-tight">
                {title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Télécharger */}
            <a
              href={absoluteUrl}
              download
              className="flex items-center gap-2 px-4 py-2 bg-[#23c367]/20 hover:bg-[#23c367]/30 text-[#23c367] rounded-xl text-sm font-semibold transition-all duration-200 border border-[#23c367]/30"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Télécharger</span>
            </a>

            {/* Ouvrir dans un nouvel onglet */}
            <a
              href={absoluteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-semibold transition-all duration-200 border border-white/20"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Ouvrir</span>
            </a>

            {/* Fermer */}
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-red-500/30 text-white/70 hover:text-white rounded-xl transition-all duration-200 border border-white/20 hover:border-red-500/40"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-[#1a1a2e] overflow-hidden relative">
          {!pdfError ? (
            <>
              {/* Tentative avec object (meilleur support que iframe pour les PDFs locaux) */}
              <object
                data={`${absoluteUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                type="application/pdf"
                className="w-full h-full"
                onError={() => setPdfError(true)}
              >
                {/* Fallback si object ne fonctionne pas */}
                <embed
                  src={`${absoluteUrl}#toolbar=1`}
                  type="application/pdf"
                  className="w-full h-full"
                  onError={() => setPdfError(true)}
                />
              </object>
            </>
          ) : null}

          {/* Fallback UI si le PDF ne peut pas être affiché */}
          {pdfError && (
            <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
              <div className="w-24 h-24 rounded-3xl bg-[#23c367]/10 border border-[#23c367]/30 flex items-center justify-center">
                <FileText className="w-12 h-12 text-[#23c367]" />
              </div>
              <div className="text-center max-w-md">
                <h4 className="text-white text-xl font-bold mb-3">
                  Aperçu non disponible
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  L'aperçu du PDF n'est pas disponible dans le navigateur.
                  Téléchargez le document ou ouvrez-le dans un nouvel onglet.
                </p>
              </div>
              <div className="flex gap-3">
                <a
                  href={absoluteUrl}
                  download
                  className="flex items-center gap-2 px-6 py-3 bg-[#23c367] hover:bg-[#1fa85a] text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-[#23c367]/30"
                >
                  <Download className="w-5 h-5" />
                  Télécharger le PDF
                </a>
                <a
                  href={absoluteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-200 border border-white/20"
                >
                  <ExternalLink className="w-5 h-5" />
                  Ouvrir dans un onglet
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#0a4d7c]/80 border-t border-white/10 flex items-center justify-between flex-shrink-0">
          <p className="text-white/40 text-xs">
            Cliquez en dehors du document pour fermer
          </p>
          <p className="text-white/40 text-xs">{pdf.split("/").pop()}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      id: 1,
      title: "Pilotage de performance",
      description:
        "Analyse des processus, mise en place d'outils de contrôle de gestion, tableaux de bord et systèmes de pilotage.",
      icon: <Briefcase className="w-10 h-10" />,
      color: "from-blue-500 to-cyan-500",
      pdf: "/PilotagePerf.pdf",
    },
    {
      id: 2,
      title: "Performance & Pilotage",
      description:
        "Suivi des indicateurs clés (KPI), optimisation des coûts, amélioration de la rentabilité et sécurisation de la croissance.",
      icon: <Truck className="w-10 h-10" />,
      color: "from-emerald-500 to-teal-500",
      pdf: "/comptabilite_analytique.pdf",
    },
    {
      id: 3,
      title: "Accompagnement stratégique",
      description:
        "Conseil aux dirigeants, aide à la décision, structuration financière et accompagnement dans les phases de transformation.",
      icon: <BarChart2 className="w-10 h-10" />,
      color: "from-purple-500 to-indigo-500",
      pdf: "/OutilsElaboration.pdf",
    },
    {
      id: 4,
      title: "Formation & Coaching",
      description:
        "Formation personnalisée et coaching pour les équipes et les dirigeants.",
      icon: <BookCheck className="w-10 h-10" />,
      color: "from-amber-500 to-orange-500",
      pdf: "/formation.pdf",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
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
              Yapithe & Partners offre une vaste gamme de services
              professionnels conçus pour aider les organisations à réussir dans
              leurs domaines respectifs.
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
                    style={{
                      backgroundImage: `url("/service${service.id}.jpeg")`,
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/50 to-black/70 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/60 transition-all duration-500" />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-20 blur-xl`}
                  />
                </div>

                <div className="relative p-8 flex flex-col h-full min-h-[320px]">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-linear-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="text-white">{service.icon}</div>
                  </motion.div>

                  <div className="absolute top-6 right-6 text-white/20 font-bold text-5xl">
                    0{service.id}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed">
                      {service.description}
                    </p>
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
                <div>
                  <span>Nos Précédentes Formations</span>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/4 bg-linear-to-b from-white/10 to-transparent blur-2xl" />
                </div>

                
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Modal PDF en dehors de la section pour éviter les problèmes de z-index et overflow */}
      <AnimatePresence>
        {selectedService && (
          <PdfModal
            pdf={selectedService.pdf}
            title={selectedService.title}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Services;