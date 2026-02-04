import { motion } from "framer-motion";
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
const Events = () => {
  return (
    <motion.section
      id="events"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-20 bg-gray-50"
    >
      <h2 className="text-4xl font-bold text-[#23c367] mb-6">Événements</h2>
      <p className="text-lg text-[#7090a6] leading-relaxed mb-8">
        Découvrez nos événements récents, conférences, ateliers et rencontres organisés par Yapithe & Partners.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {[1,2,3].map((n) => (
          <div key={n} className="border rounded-xl overflow-hidden shadow-lg">
            <img
              src={`/event${n}.jpg`}
              alt={`Event ${n}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Événement {n}</h3>
              <p className="text-[#7090a6] text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod.
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Events;
