import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  return (
    <main id="Accueil" className="min-h-screen bg-[#ffffff] flex items-center px-6 md:px-16">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 items-center gap-12">

        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-5"
        >
          <p className="text-lg italic text-gray-700">
            Yapithe & Partners
          </p>

          <h1 className="text-xl md:text-xl font-extrabold leading-tight text-[#23c367]">
            Cabinet de conseil <br />
            en <span className="font-serif font-normal">contrôle de gestion</span>
            <br />
            <span className="block text-4xl md:text-5xl">
              & pilotage de la performance
            </span>
          </h1>

          <p className="max-w-md text-[#7090a6] leading-relaxed">
            Nous accompagnons les organisations publiques et privées dans la
            structuration de leurs outils de gestion, le suivi de la performance
            et la prise de décision stratégique.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-full bg-[#23c367] text-white font-medium"
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
            h-[420px] md:h-[520px]
            rounded-[180px]
            overflow-hidden
            bg-[#d8d2cb]
            shadow-xl
          ">
            <img
              src="/hero-yapithe.jpg" // 👉 image corporate / équipe / dirigeant
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
            <p className="text-4xl font-bold text-[#23c367]">10+</p>
            <p className="text-[#7090a6]">Années d’expérience</p>
          </div>

          <div>
            <p className="text-4xl font-bold text-[#23c367]">Afrique & Europe</p>
            <p className="text-[#7090a6]">Présence internationale</p>
          </div>

          <div>
            <p className="text-4xl font-bold text-[#23c367]">
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
