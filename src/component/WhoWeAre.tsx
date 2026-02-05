import { motion } from "framer-motion";
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
const WhoWeAre = () => {
  return (
    <motion.div
    id="about"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center bg-linear-to-r from-[#e0f7f1] to-[#ffffff]"
    >
      {/* Texte */}
      <div className="space-y-5">
        <h2 className="text-4xl font-bold  bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text">Qui sommes-nous ?</h2>
        <p className="text-lg text-[#7090a6] leading-relaxed">
          Yapithe & Partners est un cabinet spécialisé dans le conseil et l'accompagnement stratégique des entreprises. 
          Nous fournissons des solutions innovantes et efficaces pour aider nos clients à se développer durablement.
        </p>
        <p className="text-lg text-[#7090a6] leading-relaxed">
          Notre expertise couvre l'exploitation forestière, la logistique, le transport, le commerce général et le BTP.
        </p>
      </div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="relative border shadow-[#0a4d7c] w-[280px] md:w-[360px] h-[420px] md:h-[520px] rounded-[180px] overflow-hidden shadow-xl">
          <img
            src="/images.png"
            alt="Qui sommes-nous ?"
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WhoWeAre;
