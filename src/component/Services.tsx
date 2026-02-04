import { motion } from "framer-motion";
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
const Services = () => {
  return (
    <motion.section
      id="Services"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-20 bg-white"
    >
      <h2 className="text-4xl font-bold text-[#23c367] mb-6">Services</h2>
      <p className="text-lg text-[#7090a6] leading-relaxed mb-8">
        Yapithe & Partners offers a wide range of professional services tailored to help organizations succeed in their respective fields.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: "Consulting", desc: "Strategic guidance for business growth." },
          { title: "Logistics", desc: "Optimized supply chain and operations management." },
          { title: "Construction & BTP", desc: "High-quality building and civil engineering solutions." },
        ].map((service, i) => (
          <div key={i} className="border rounded-xl p-6 shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-[#7090a6]">{service.desc}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Services;
