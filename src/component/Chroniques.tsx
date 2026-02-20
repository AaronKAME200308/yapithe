"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Variants } from "framer-motion";
import { Calendar, ArrowRight, Clock, X } from "lucide-react";
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
                Nos Chroniques
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

          {/* BOUTON VOIR PLUS */}
          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/chroniques-page")}
              className="px-8 py-4  bg-linear-to-r from-[#23c367] to-[#1fa85a] text-[#ffffff] font-semibold rounded-xl hover:scale-105 transition flex items-center gap-2 mx-auto"
            >
              Voir plus
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
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
