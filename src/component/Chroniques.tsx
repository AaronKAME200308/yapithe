import { motion } from "framer-motion";

const Chroniques = () => {
  // Variants pour les enfants
  const fadeDirection = (index) => ({
    hidden: { opacity: 0, y: index % 2 === 0 ? 40 : -40 }, // pair descend, impair monte
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  });

  return (
    <motion.section
      id="Chroniques"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="max-w-7xl mx-auto px-6 py-20 bg-[#0a4d7c]"
    >
      <h2 className="text-4xl font-bold bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text mb-6">Chroniques</h2>
      <p className="text-lg text-[#ffffff] leading-relaxed mb-8">
        Découvrez nos chroniques d'experts où nous partageons des points de vue, des tendances et des analyses sur la gestion d'entreprise, la performance et les conseils stratégiques.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((n, i) => (
          <motion.div
            key={n}
            variants={fadeDirection(i)}
          >
            <div className="border rounded-xl overflow-hidden shadow-lg">
              <img
                src={`/chronique${n}.jpg`}
                alt={`Chronique ${n}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Chronicle {n}</h3>
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
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Chroniques;
