import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5, // décalage entre chaque image
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Galerie = () => {
  return (
    <motion.section
      id="galerie"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="max-w-7xl mx-auto px-6 py-20 bg-linear-to-r from-[#e0f7f1] to-[#ffffff]"
    >
      <h2 className="text-4xl font-bold bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text mb-6">Galerie</h2>
      <p className="text-lg text-[#7090a6] leading-relaxed mb-8">
        Parcourez notre galerie d’images et vidéos illustrant nos projets, interventions et événements.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <motion.div
            key={n}
            variants={fadeUp} // applique le fadeUp avec stagger
            className="bg-[#0a4d7c] overflow-hidden rounded-xl shadow-lg"
          >
            <img
              src={`/galerie${n}.jpeg`}
              alt={`Galerie ${n}`}
              className="w-full h-48 object-contain transform hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Galerie;
