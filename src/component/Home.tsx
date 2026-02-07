import { motion } from "framer-motion";
import CountUp from "./Count";
import { ArrowRight, Award, Globe, Building2, TrendingUp } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    {
      icon: <Award className="w-8 h-8" />,
      value: 10,
      suffix: "+",
      label: "Années d'expérience",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      text: "Afrique & Europe",
      label: "Présence internationale",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      value: 150,
      suffix: "+",
      label: "Organisations accompagnées",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: 98,
      suffix: "%",
      label: "Taux de satisfaction client",
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <main
      id="Accueil"
      className="min-h-screen bg-linear-to-br from-[#e0f7f1] via-white to-[#f0f9ff] flex items-center px-6 md:px-10 relative overflow-hidden"
    >
      {/* Éléments décoratifs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#23c367]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"></div>

      {/* Particules flottantes */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-32 h-32 bg-[#23c367]/10 rounded-full blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 left-40 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 items-center gap-12 relative z-10">
        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 lg:col-span-1"
        >

          {/* Logo/Nom */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="font-michroma text-3xl md:text-4xl text-[#0a4d7c] leading-tight"
          >
            Yapithe <br />& Partners
          </motion.h1>

          {/* Tagline principal */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text"
          >
            Cabinet de conseil
            <br />
            en contrôle de gestion
            <br />& pilotage de la performance
          </motion.p>

          {/* Description courte */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-lg text-[#7090a6] leading-relaxed"
          >
            Nous accompagnons les organisations dans leur transformation et leur
            quête d'excellence opérationnelle.
          </motion.p>

          {/* Boutons CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group px-8 py-4 rounded-xl bg-linear-to-r from-[#23c367] to-[#1fa85a] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
              onClick={() => scrollToSection("Contact")}
            >
              Travaillons ensemble
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-[#0a4d7c]/20 text-[#0a4d7c] font-semibold hover:bg-white hover:border-[#0a4d7c]/40 transition-all duration-300"
              onClick={() => scrollToSection("Services")}
            >
              Nos services
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ================= CENTER IMAGE ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="flex justify-center lg:col-span-1"
        >
          <div className="relative group">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 bg-linear-to-r from-[#23c367]/20 to-[#0a4d7c]/20 rounded-t-[200px] blur-xl"
            />

            {/* Container image */}
            <div className="relative w-72 md:w-96 h-80 md:h-[450px] rounded-t-[180px] overflow-hidden bg-linear-to-br from-[#0a4d7c] to-[#0c5d94] shadow-2xl group-hover:shadow-[0_20px_60px_rgba(35,195,103,0.3)] transition-all duration-500">
              <img
                src="/yapth.jpeg"
                alt="Yapithe & Partners"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#0a4d7c]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
              >
                <p className="text-sm font-semibold text-[#0a4d7c]">
                  Expertise reconnue
                </p>
                <p className="text-xs text-gray-600">
                  En Afrique et en Europe
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ================= RIGHT STATS ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6 lg:col-span-1"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, x: 10 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="flex items-start gap-4">
                {/* Icône */}
                <div
                  className={`w-14 h-14 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.icon}
                </div>

                {/* Contenu */}
                <div className="flex-1">
                  {stat.value !== undefined ? (
                    <p className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </p>
                  ) : (
                    <p className="text-2xl md:text-3xl font-bold bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text leading-tight">
                      {stat.text}
                    </p>
                  )}
                  <p className="text-sm md:text-base text-[#7090a6] mt-1">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default Home;