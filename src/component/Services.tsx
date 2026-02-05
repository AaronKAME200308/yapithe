import { motion } from "framer-motion";
import { Briefcase, Truck, BarChart2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Diagnostic & Structuration",
      description:
        "Analyse des processus, mise en place d’outils de contrôle de gestion, tableaux de bord et systèmes de pilotage.",
      icon: <Briefcase className="w-8 h-8 text-[#23c367] mb-4" />,
    },
    {
      id: 2,
      title: "Performance & Pilotage",
      description:
        "Suivi des indicateurs clés (KPI), optimisation des coûts, amélioration de la rentabilité et sécurisation de la croissance.",
      icon: <Truck className="w-8 h-8 text-[#23c367] mb-4" />,
    },
    {
      id: 3,
      title: "Accompagnement stratégique",
      description:
        "Conseil aux dirigeants, aide à la décision, structuration financière et accompagnement dans les phases de transformation.",
      icon: <BarChart2 className="w-8 h-8 text-[#23c367] mb-4" />,
    },
  ];

  return (
    <motion.section
      id="Services"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full py-20 bg-[#0a4d7c] px-6"
    >
<h2 className="text-4xl font-bold bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text mb-6">Services</h2> 
<p className="text-lg text-[#ffffff] leading-relaxed mb-12"> 
  Yapithe & Partners offre une vaste gamme de services professionnels conçus pour aider les organisations à réussir dans leurs domaines respectifs.
   </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <motion.div
            key={service.id}
            variants={fadeUp}
            className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-amber-50 hover:border-2 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("/service${service.id}.jpeg")` }}
            ></div>

            {/* Overlay sombre pour rendre le texte lisible */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Contenu */}
            <div className="relative p-6 flex flex-col items-center text-center text-white">
              {service.icon}
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm md:text-base">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Services;
