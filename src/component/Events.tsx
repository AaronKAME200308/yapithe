import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
const Events = () => {
  const navigate = useNavigate();
  return (
    <motion.section
      id="events"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-20 bg-[#0a4d7c] "
    >
      <h2 className="text-4xl font-bold bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text mb-6">Événements</h2>
      <p className="text-lg text-[#ffffff] leading-relaxed mb-8">
        Découvrez nos événements récents, conférences, ateliers et rencontres organisés par Yapithe & Partners.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {[1,2,3].map((n) => (
          <div key={n} className="border shadow-amber-50 rounded-xl overflow-hidden shadow-lg">
            <img
              src={`/event${n}.jpg`}
              alt={`Event ${n}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Événement {n}</h3>
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
                <span
                 onClick={() =>
                  navigate("/voir-plus", {
                    state: {
                      media: `/event${n}.jpg`, // image ou vidéo
                      type: "image", // ou "video"
                      title: `Événement ${n}`,
                      description: "Description complète liée à cette publication.",
                      date: "05 Février 2026",
                    },
                  })
                }
                 className="relative z-10">Voir Plus</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Events;
