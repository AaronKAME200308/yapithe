import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import type { Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

/* ================= ANIMATION ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

/* ================= TEXT DATA ================= */
const sectionContent = {
  title: "Actualités",
  desc: "Retrouvez toutes les dernières actualités de Yapithe & Partners, nos projets, interventions et publications récentes.",
  button: "Explorer toutes les actualités",
};

const arcLayer: Variants = {
  hidden: (i) => ({
    opacity: 0,
    x: -200,
    y: -120 + i * 40,
    rotate: -15 + i * 5,
    scale: 0.9,
  }),
  show: (i) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.25,
      ease: "easeOut",
    },
  }),
};

/* ================= SLIDER DATA ================= */
const sliderData = [
  {
    id: 1,
    type: "image",
    number: "7",
    title: "Personnalités scientifiques",
    desc: "De haut niveau et de renommée internationale qui composent un Conseil Scientifique d'excellence.",
    media: "/event1.jpg",
    date: "10 Janvier 2026",
    category: "Expertise",
  },
  {
    id: 2,
    type: "image",
    number: "12",
    title: "Partenaires académiques",
    desc: "Collaborations avec des universités et centres de recherche de premier plan.",
    media: "/event2.jpg",
    date: "15 Janvier 2026",
    category: "Partenariats",
  },
  {
    id: 3,
    type: "image",
    number: "5",
    title: "Experts internationaux",
    desc: "Experts impliqués dans nos programmes scientifiques et nos missions de conseil.",
    media: "/event3.jpeg",
    date: "20 Janvier 2026",
    category: "Innovation",
  },
];

const News = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  /* ================= AUTOPLAY ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [page]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
    setIndex(
      (prev) => (prev + newDirection + sliderData.length) % sliderData.length
    );
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  return (
    <motion.section
      id="news"
      variants={fadeUp}     
      transition={{ duration: 0.8 }}
      className="w-full py-16 md:py-24 bg-linear-to-br from-[#e0f7f1] via-white to-[#f0f9ff] relative overflow-hidden"
    >
      {/* Éléments décoratifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#23c367]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ================= LEFT TEXT ================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block px-4 py-2 bg-linear-to-r from-[#23c367]/20 to-[#0a4d7c]/20 backdrop-blur-sm rounded-full mb-6"
            >
              <span className="bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text font-semibold text-sm uppercase tracking-wider">
                {sectionContent.title}
                
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text mb-6 leading-tight">
              Dernières Nouvelles
            </h2>

            <p className="text-base md:text-lg text-[#7090a6] leading-relaxed mb-8">
              {sectionContent.desc}
            </p>

            {/* Stats rapides */}
            {/* <div className="grid grid-cols-3 gap-4 mb-8">
              {sliderData.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`text-center p-4 rounded-xl transition-all duration-300 ${
                    index === i
                      ? "bg-linear-to-br from-[#23c367] to-[#1fa85a] text-white shadow-lg"
                      : "bg-white/80 backdrop-blur-sm border border-gray-200"
                  }`}
                >
                  <p
                    className={`text-2xl md:text-3xl font-bold ${
                      index === i ? "text-white" : "text-[#0a4d7c]"
                    }`}
                  >
                    {item.number}
                  </p>
                  <p
                    className={`text-xs ${
                      index === i ? "text-white/90" : "text-gray-600"
                    }`}
                  >
                    {item.category}
                  </p>
                </motion.div>
              ))}
            </div> */}

            <motion.button
              onClick={() =>
                navigate("/actu-page", {
                  state: {
                    data: sliderData,
                    category: "Actualités",
                  },
                })
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-xl bg-linear-to-r from-[#23c367] to-[#1fa85a] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
            >
              <span>{sectionContent.button}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* ================= RIGHT SLIDER ================= */}
          <div className="relative w-full flex justify-center">
            <div className="relative flex justify-center w-full">
              <div className="relative w-full max-w-md lg:max-w-lg h-[450px]">
                {/* Carré vert */}
                <motion.div
                  custom={0}
                  variants={arcLayer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  className="absolute top-6 left-6 w-full h-full bg-linear-to-br from-[#23c367] to-[#1fa85a] rounded-3xl shadow-xl"
                />

                {/* Carré bleu */}
                <motion.div
                  custom={1}
                  variants={arcLayer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  className="absolute top-12 left-12 w-full h-full bg-linear-to-br from-[#0a4d7c] to-[#0c5d94] rounded-3xl shadow-2xl"
                />

                {/* Carte image avec AnimatePresence */}
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={index}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.3 },
                    }}
                    className="absolute top-0 left-0 w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden"
                  >
                    {/* Image de fond */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${sliderData[index].media})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20"></div>
                    </div>

                    {/* Contenu */}
                    <div className="relative h-full p-8 flex flex-col justify-between">
                      {/* Badge date */}
                      <div className="flex justify-between items-start">
                        <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-[#0a4d7c] shadow-lg">
                          {sliderData[index].category}
                        </span>
                        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs">
                          <Calendar className="w-3.5 h-3.5" />
                          {sliderData[index].date}
                        </div>
                      </div>

                      {/* Texte */}
                      <div className="text-white">
                        <motion.h1
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-6xl md:text-7xl font-bold mb-2"
                        >
                          {sliderData[index].number}
                        </motion.h1>

                        <motion.h2
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-2xl md:text-3xl font-bold leading-tight mb-4"
                        >
                          {sliderData[index].title}
                        </motion.h2>

                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-white/90 text-sm md:text-base leading-relaxed line-clamp-3"
                        >
                          {sliderData[index].desc}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Contrôles navigation */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4">
                  {/* Bouton précédent */}
                  <button
                    onClick={() => paginate(-1)}
                    className="w-12 h-12 bg-white hover:bg-[#23c367] text-[#0a4d7c] hover:text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  {/* Indicateurs */}
                  <div className="flex gap-2">
                    {sliderData.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          const newDirection = i > index ? 1 : -1;
                          setPage([i, newDirection]);
                          setIndex(i);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === index
                            ? "w-8 bg-linear-to-r from-[#23c367] to-[#1fa85a]"
                            : "w-2 bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Bouton suivant */}
                  <button
                    onClick={() => paginate(1)}
                    className="w-12 h-12 bg-white hover:bg-[#23c367] text-[#0a4d7c] hover:text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default News;