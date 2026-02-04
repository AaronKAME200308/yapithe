import { motion } from "framer-motion";
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
const Partners = () => {
  return (
    <motion.div
      id="partners"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-20"
    >
      <h2 className="text-4xl font-bold text-[#23c367] mb-6">Nos Partenaires</h2>
      <p className="text-lg text-[#7090a6] leading-relaxed mb-6">
        Nous collaborons avec des partenaires fiables pour renforcer notre expertise et garantir la qualité de nos prestations.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        <img src="/partner1.png" alt="Partenaire 1" className="h-16 object-contain" />
        <img src="/partner2.png" alt="Partenaire 2" className="h-16 object-contain" />
        <img src="/partner3.png" alt="Partenaire 3" className="h-16 object-contain" />
      </div>
    </motion.div>
  );
};

export default Partners;
