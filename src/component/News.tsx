import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
const News = () => {
  const [visible, setVisible] = useState(false)
  const [activeNews, setActiveNews] = useState<string | null>(null);
  const [modalLoaded, setModalLoaded] = useState(false);

  return (
    <motion.section
      id="news"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-20 bg-linear-to-r from-[#e0f7f1] to-[#ffffff]"
    >
      <h2 className="text-4xl font-bold bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text mb-6">Actualités</h2>
      <p className="text-lg text-[#7090a6] leading-relaxed mb-8">
        Retrouvez toutes les dernières actualités de Yapithe & Partners, nos projets, interventions et publications récentes.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((n) => (
          <motion.div
            style={{ backgroundImage: `url("/news${n}.jpeg")` }}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            key={n}
            className="bg-contain hover:shadow-teal-800 hover:border-[#0a4d7c] h-50 hover:border-2 rounded-xl overflow-hidden shadow-lg">
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Titre de la news {n}</h3>
              <p className="my-4 h-10 text-[#ffffff] text-sm">
              </p>
              <button
                onClick={() => setActiveNews(`news${n}.jpeg`)}
                className="
                  px-6 py-3
                  rounded-full
                  bg-gradient-to-r from-[#23c367] via-[#23c367]/90 to-[#23c367]/80
                  text-white font-medium
                  shadow-lg
                  hover:scale-105 hover:shadow-2xl
                  transition-all duration-300 ease-in-out
                  relative overflow-hidden
                "
              >
                <span className="relative z-10">Voir Plus</span>
              </button>

            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {activeNews && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveNews(null)}
          >
            <div className="relative">
              {!modalLoaded && (
                <div className="absolute inset-0 rounded-lg bg-gray-300 animate-pulse" />
              )}

              <motion.img
                src={activeNews}
                alt="Preview"
                onLoad={() => setModalLoaded(true)}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`max-w-[90vw] max-h-[90vh] object-contain rounded-lg transition-opacity duration-500
                 ${modalLoaded ? "opacity-100" : "opacity-0"}`}
              />
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default News;
