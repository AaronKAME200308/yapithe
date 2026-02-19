import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock, Play } from "lucide-react";
import { chroniquesData } from "./ChroniquesData";

export const ChroniquesPage = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <>
      {/* SECTION PRINCIPALE */}
      <section className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-[#061a2b] via-[#0a4d7c] to-[#061a2b] relative overflow-hidden">
        {/* Effet décoratif flou */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#00c6ff]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#0072ff]/20 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* HEADER */}
          <div className="text-center mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold text-white mb-6"
            >
              Toutes les chroniques
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white/80 max-w-2xl mx-auto text-lg"
            >
              Explorez l’ensemble de nos chroniques vidéo et plongez dans des
              analyses captivantes, inspirantes et enrichissantes.
            </motion.p>
          </div>

          {/* GRID */}
          <div className="grid lg:grid-cols-2 gap-12">
            {chroniquesData.map((chronique, index) => (
              <motion.div
                key={chronique.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_80px_rgba(0,114,255,0.35)] transition-all duration-500"
              >
                {/* VIDEO THUMB */}
                <div
                  onClick={() => setSelectedVideo(chronique.videoUrl)}
                  className="relative w-full aspect-video cursor-pointer overflow-hidden"
                >
                  <iframe
                    src={chronique.videoUrl}
                    className="w-full h-full pointer-events-none group-hover:scale-110 transition-transform duration-700"
                    allowFullScreen
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 group-hover:bg-white p-4 rounded-full shadow-xl scale-90 group-hover:scale-110 transition">
                      <Play className="w-6 h-6 text-[#0a4d7c]" />
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-[#00c6ff] transition">
                    {chronique.title}
                  </h2>

                  <p className="text-white/70 mb-6 leading-relaxed line-clamp-3">
                    {chronique.description}
                  </p>

                  {/* META */}
                  <div className="flex items-center gap-6 text-sm text-white/60">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {chronique.date}
                    </span>

                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {chronique.readTime}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL VIDEO */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            >
              

              <iframe
                src={selectedVideo}
                className="w-full h-full"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
