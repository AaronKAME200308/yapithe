"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Variants } from "framer-motion";
import { Calendar, X,ChevronRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { chroniquesData } from "./ChroniquesData";

export const Chroniques = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const navigate = useNavigate();

  // Limite à 3
  const displayedChroniques = chroniquesData.slice(0, 3);

  const fadeDirection = (index: number): Variants => ({
    hidden: { opacity: 0, y: 40, scale: 0.95 },
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

  return (
    <>
      <section
        id="Chroniques"
        className="w-full py-16 md:py-24 bg-linear-to-br from-[#0a4d7c] via-[#0c5d94] to-[#0a4d7c]"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* HEADER */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#23c367]/20 rounded-full mb-4">
              <span className="text-[#23c367] font-semibold text-sm uppercase">
                Les Chroniques du Contrôle de Gestion
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Perspectives d'
              <span className="bg-linear-to-r from-[#23c367] to-[#1fa85a] text-transparent bg-clip-text">
                experts
              </span>
            </h2>
          </div>

          {/* GRID MAX 3 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedChroniques.map((chronique, index) => (
              <motion.div
                key={chronique.id}
                variants={fadeDirection(index)}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl"
              >
                {/* VIDEO */}
                <div className="relative w-full aspect-video">
                  <iframe
                    src={chronique.videoUrl}
                    className="w-full h-full"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0a4d7c] mb-3">
                    {chronique.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {chronique.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {chronique.date}
                    </span>                   
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 flex justify-center"
          >
            <motion.button
              onClick={() => navigate("/chroniques-page")}
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
                    Toutes nos Chroniques
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
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 bg-white p-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <iframe
                src={selectedVideo}
                className="w-full h-full"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chroniques;
