import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Team = () => {
  const members = [
    { name: "Paul Martin", role: "Consultant Senior", img: "/yapth2.png" },
    { name: "Alice Dupont", role: "Chef de projet", img: "/membre2.png" },
    { name: "John Doe", role: "Analyste", img: "/membre3.png" },
    { name: "John Doe", role: "Analyste", img: "/membre4.png" },
    { name: "John Doe", role: "Analyste", img: "/membre5.png" },
    { name: "John Doe", role: "Analyste", img: "/membre6.png" },
    // tu peux ajouter d'autres membres ici
  ];

  return (
    <motion.div
      id="team"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-20 bg-[#0a4d7c]"
    >
      <h2 className="text-4xl font-bold bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text mb-6">Notre Équipe</h2>
      <p className="text-lg text-white leading-relaxed mb-8">
        Notre équipe est composée de professionnels expérimentés et passionnés, chacun expert dans son domaine. 
        Ensemble, nous mettons notre savoir-faire au service de vos projets.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {members.map((member, i) => (
          <div key={i} className="text-center">
            <motion.img
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              src={member.img}
              alt={member.name}
              className="w-70 h-70 mx-auto rounded-full object-contain mb-4 "
            />
            <h3 className="text-xl font-semibold text-white">{member.name}</h3>
            <p className="text-white">{member.role}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Team;
