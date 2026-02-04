import { motion } from "framer-motion";
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
const Team = () => {
  return (
    <motion.div
      id="team"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-20 bg-gray-50"
    >
      <h2 className="text-4xl font-bold text-[#23c367] mb-6">Notre Équipe</h2>
      <p className="text-lg text-[#7090a6] leading-relaxed mb-8">
        Notre équipe est composée de professionnels expérimentés et passionnés, chacun expert dans son domaine. 
        Ensemble, nous mettons notre savoir-faire au service de vos projets.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="text-center">
          <img src="/team1.jpg" alt="Membre 1" className="w-32 h-32 mx-auto rounded-full object-cover mb-4" />
          <h3 className="text-xl font-semibold">Jean Dupont</h3>
          <p className="text-[#7090a6]">Directeur Général</p>
        </div>
        <div className="text-center">
          <img src="/team2.jpg" alt="Membre 2" className="w-32 h-32 mx-auto rounded-full object-cover mb-4" />
          <h3 className="text-xl font-semibold">Marie Claire</h3>
          <p className="text-[#7090a6]">Responsable Logistique</p>
        </div>
        <div className="text-center">
          <img src="/team3.jpg" alt="Membre 3" className="w-32 h-32 mx-auto rounded-full object-cover mb-4" />
          <h3 className="text-xl font-semibold">Paul Martin</h3>
          <p className="text-[#7090a6]">Consultant Senior</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Team;
