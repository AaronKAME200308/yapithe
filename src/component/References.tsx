import { motion } from "framer-motion";
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
const References = () => {
  return (
    <motion.div
      id="references"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-20 bg-gray-50"
    >
      <h2 className="text-4xl font-bold text-[#23c367] mb-6">Nos Références pratiques</h2>
      <p className="text-lg text-[#7090a6] leading-relaxed mb-4">
        Nous avons accompagné de nombreuses entreprises et projets au Cameroun et à l’international. 
        Nos missions couvrent le conseil stratégique, la gestion de projets logistiques et la réalisation de chantiers BTP.
      </p>
      <p className="text-lg text-[#7090a6] leading-relaxed">
        Notre approche pragmatique garantit des résultats concrets et mesurables pour chacun de nos clients.
      </p>
    </motion.div>
  );
};

export default References;
