import { motion } from "framer-motion";
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
const Galerie = () => {
  return (
    <motion.section
      id="galerie"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-20 bg-white"
    >
      <h2 className="text-4xl font-bold text-[#23c367] mb-6">Galerie</h2>
      <p className="text-lg text-[#7090a6] leading-relaxed mb-8">
        Parcourez notre galerie d’images et vidéos illustrant nos projets, interventions et événements.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[1,2,3,4,5,6,7,8].map((n) => (
          <div key={n} className="overflow-hidden rounded-xl shadow-lg">
            <img
              src={`/galerie${n}.jpg`}
              alt={`Galerie ${n}`}
              className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Galerie;
