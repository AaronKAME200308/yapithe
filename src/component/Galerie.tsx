import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn, Play } from "lucide-react";
import type {Variants} from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    }
  },
};

const Galerie = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galerieData = [
    { id: 1, type: "image", src: "/galerie1.jpeg", title: "Événement corporatif 2024" },
    { id: 2, type: "image", src: "/galerie2.jpeg", title: "Formation en gestion" },
    { id: 3, type: "image", src: "/galerie3.jpeg", title: "Atelier stratégique" },
    { id: 4, type: "video", src: "/galerie4.jpeg", title: "Présentation projet" },
    { id: 5, type: "image", src: "/galerie5.jpeg", title: "Team building" },
    { id: 6, type: "image", src: "/galerie6.jpeg", title: "Conférence annuelle" },
    { id: 7, type: "image", src: "/galerie7.jpeg", title: "Séminaire de performance" },
    { id: 8, type: "image", src: "/galerie8.jpeg", title: "Consultation client" },
  ];

  return (
    <>
      <motion.section
        id="galerie"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto px-6 py-16 md:py-24 bg-linear-to-br from-[#e0f7f1] via-white to-[#f0f9ff] relative overflow-hidden"
      >
        {/* Éléments décoratifs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#23c367]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

        <div className="relative z-10">
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
              className="inline-block px-4 py-2 bg-linear-to-r from-[#23c367]/20 to-[#0a4d7c]/20 backdrop-blur-sm rounded-full mb-4"
            >
              <span className="bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text font-semibold text-sm uppercase tracking-wider">
                Notre Galerie
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text mb-6">
              Moments clés
            </h2>

            <p className="text-base md:text-lg text-[#7090a6] leading-relaxed max-w-3xl mx-auto">
              Parcourez notre galerie d'images et vidéos illustrant nos projets,
              interventions et événements marquants.
            </p>
          </motion.div>

          {/* Grid de galerie */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {galerieData.map((item, _index) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedImage(item.id)}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-linear-to-br from-[#0a4d7c] to-[#0c5d94]">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay avec linear */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Icône type */}
                  {item.type === "video" && (
                    <div className="absolute top-3 right-3 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                    </div>
                  )}

                  {/* Icône zoom au centre */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn className="w-7 h-7 text-[#0a4d7c]" />
                    </div>
                  </div>

                  {/* Titre en bas */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-semibold text-sm line-clamp-2">
                      {item.title}
                    </p>
                  </div>
                </div>

                {/* Accent line */}
                <div className="h-1 bg-linear-to-r from-[#23c367] to-[#1fa85a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </motion.div>
            ))}
          </div>

          {/* CTA voir plus */}
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
              className="px-8 py-4 bg-linear-to-r from-[#23c367] to-[#1fa85a] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Voir toute la galerie ({galerieData.length}+ photos)
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Modal lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Bouton fermer */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Image agrandie */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galerieData.find(item => item.id === selectedImage)?.src}
                alt={galerieData.find(item => item.id === selectedImage)?.title}
                className="w-full h-full object-contain rounded-2xl shadow-2xl"
              />

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                <h3 className="text-white text-xl font-bold">
                  {galerieData.find(item => item.id === selectedImage)?.title}
                </h3>
              </div>

              {/* Navigation (optionnel) */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(prev => prev && prev > 1 ? prev - 1 : galerieData.length);
                  }}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors pointer-events-auto"
                >
                  <span className="text-white text-2xl">←</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(prev => prev && prev < galerieData.length ? prev + 1 : 1);
                  }}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors pointer-events-auto"
                >
                  <span className="text-white text-2xl">→</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Galerie;