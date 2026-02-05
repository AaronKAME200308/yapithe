import { motion } from "framer-motion";
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
const IPCG = () => {
  return (
    <motion.section
      id="IPCG"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-20 bg-linear-to-r from-[#e0f7f1] to-[#ffffff]"
    >
      <h2 className="text-4xl font-bold bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text mb-6">IPCG</h2>
      <p className="text-lg text-[#7090a6] leading-relaxed mb-8">
        The IPCG (Institute for Performance & Governance Control) is our dedicated platform for research, training, and guidance in management and performance evaluation.
      </p>
      <p className="text-lg text-[#7090a6] leading-relaxed">
        We provide specialized programs and resources to help organizations implement best practices and improve operational efficiency.
      </p>
    </motion.section>
  );
};

export default IPCG;
