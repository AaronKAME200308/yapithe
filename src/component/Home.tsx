import { motion } from "framer-motion";
import CountUp from "./Count";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};


const Home = () => {
  const [active, setActive] = useState("Accueil");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

      const scrollToSection = (id: string) => {
    setActive(id);
    setOpenDropdown(null);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <main id="Accueil" className="min-h-screen bg-linear-to-r from-[#e0f7f1] to-[#ffffff] flex items-center px-6 md:px-10">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 items-center gap-12">

        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-3"
        >
            <h2 className="font-michroma text-4xl md:text-5xl text-[#0a4d7c] mb-6">
    Yapithe <br/>& Partners
  </h2>
          <p className="text-4xl md:text-4xl font-extrabold leading-tight bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text">
            Cabinet de conseil <br />
            en contrôle de gestion
            <br />
              & pilotage de la performance
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#23c367] via-[#23c367]/90 to-[#23c367]/80 text-white font-medium"
                                onClick={() => scrollToSection("Contact")}
          >
            Travaillons ensemble
            
          </motion.button>
        </motion.div>

        {/* ================= CENTER IMAGE ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="
            relative
            w-[280px] md:w-[360px]
            h-[320px] md:h-[420px]
            rounded-t-[180px]
            overflow-hidden
            bg-[#ffffff]
            shadow-xl
          ">
            <img
              src="/yapth.jpeg" // 👉 image corporate / équipe / dirigeant
              alt="Yapithe & Partners"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* ================= RIGHT STATS ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-10 text-center md:text-left"
        >
          <div>
            <p className="text-4xl font-bold  bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text">
              <CountUp value={10} suffix="+" />
            </p>

            <p className="text-[#7090a6]">Années d’expérience</p>
          </div>

          <div>
            <p className="text-4xl font-bold  bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text">Afrique & Europe</p>
            <p className="text-[#7090a6]">Présence internationale</p>
          </div>

          <div>
            <p className="text-4xl font-bold  bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text">
              Organisations publiques & privées
            </p>
            <p className="text-[#7090a6]">Accompagnées</p>
          </div>
        </motion.div>

      </div>
    </main>
  );
};

export default Home;
