import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Play, Image as ImageIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";
import type { Variants } from "framer-motion";

const VoirPlus = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const { data, category } = location.state || {};

  // Variants pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-linear-to-br from-[#0a4d7c] via-[#0c5d94] to-[#0a4d7c] px-4 md:px-6 py-12 md:py-16 flex flex-col items-center"
    >
      {/* HEADER */}
      <div className="w-full max-w-6xl mb-8 md:mb-12">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 bg-white/95 backdrop-blur-sm text-[#0a4d7c] px-5 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Retour</span>
          </button>

          {/* Titre de section */}
          {category && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {category}
              </h1>
              <p className="text-white/80 text-sm md:text-base">
                {data?.length || 0} {data?.length > 1 ? "éléments" : "élément"} disponible{data?.length > 1 ? "s" : ""}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* LISTE */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl space-y-8"
      >
        {data?.map((item: any, i: number) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 group"
          >
            {/* MEDIA */}
            <div className="relative w-full h-64 md:h-full bg-black flex items-center justify-center overflow-hidden">
              {item.type === "video" ? (
                <>
                  <video
                    src={item.media}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-[#0a4d7c] ml-1" fill="currentColor" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={item.media}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#0a4d7c]" />
                    <span className="text-xs font-medium text-[#0a4d7c]">Image</span>
                  </div>
                </>
              )}
            </div>

            {/* INFOS */}
            <div className="p-6 md:p-10 flex flex-col justify-center">
              {/* Badge type */}
              <div className="flex items-center gap-2 mb-4">
                {item.type === "video" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">
                    <Play className="w-3 h-3" fill="currentColor" />
                    Vidéo
                  </span>
                )}
                {item.date && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-[#0a4d7c] mb-4 leading-tight">
                {item.title}
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6 line-clamp-4">
                {item.desc}
              </p>

              {/* BOUTON avec animation */}
              <button
                onClick={() => {
                  setSelected(item);
                  setOpen(true);
                }}
                className="group/btn relative bg-linear-to-r from-[#23c367] to-[#1fa85a] text-white px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl overflow-hidden w-fit transition-all duration-300"
              >
                <span className="relative z-10 font-medium flex items-center gap-2">
                  Voir Plus
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-[#1fa85a] to-[#23c367] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Message d'absence de données */}
      {(!data || data.length === 0) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 text-center max-w-md"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            Aucun contenu disponible
          </h3>
          <p className="text-gray-500 text-sm">
            Il n'y a pas encore de contenu à afficher dans cette section.
          </p>
        </motion.div>
      )}

      {/* MODAL */}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={selected?.title || "Titre inconnu"}
        date={selected?.date || "Date inconnue"}
        media={selected?.media || "/default.jpg"}
        description={selected?.desc || "Description inconnue"}
        isVideo={selected?.type === "video"}
        category={category}
      />
    </motion.section>
  );
};

export default VoirPlus;