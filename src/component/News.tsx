import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/* ================= ANIMATION ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

/* ================= TEXT DATA ================= */
const sectionContent = [
  {
    title: "Actualités",
    desc: "Retrouvez toutes les dernières actualités de Yapithe & Partners, nos projets, interventions et publications récentes.",
    button: "Explorer",
  },
];

/* ================= SLIDER DATA ================= */
const sliderData = [
  {
    id: 1,
    number: "7",
    title: "personnalités scientifiques",
    desc: "De haut niveau et de renommée internationale qui composent un Conseil Scientifique.",
    image: "/images/p1.jpg",
  },
  {
    id: 2,
    number: "12",
    title: "partenaires académiques",
    desc: "Collaborations avec des universités et centres de recherche.",
    image: "/images/p2.jpg",
  },
  {
    id: 3,
    number: "5",
    title: "experts internationaux",
    desc: "Experts impliqués dans nos programmes scientifiques.",
    image: "/images/p3.jpg",
  },
];

const News = () => {
  const [index, setIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  /* ================= AUTOPLAY ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 4000);

    return () => clearInterval(interval);
  }, [page]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
    setIndex(
      (prev) =>
        (prev + newDirection + sliderData.length) %
        sliderData.length
    );
  };

  /* ================= SWIPE ================= */
  const swipeConfidenceThreshold = 50;

  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 120 : -120,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction < 0 ? 120 : -120,
      opacity: 0,
    }),
  };

  return (
    <motion.section
      id="news"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto px-6 py-20 bg-linear-to-r from-[#e0f7f1] to-[#ffffff]"
    >
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* ================= LEFT TEXT ================= */}
        {sectionContent.map((content, i) => (
          <div key={i}>
            <h2 className="text-4xl font-bold bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text mb-6">
              {content.title}
            </h2>

            <p className="text-lg text-[#7090a6] leading-relaxed mb-8">
              {content.desc}
            </p>

            <button
              className="
                px-8 py-4 rounded-full
                bg-gradient-to-r
                from-[#23c367] via-[#23c367]/90 to-[#23c367]/80
                text-white font-medium
                shadow-lg
                hover:scale-105 hover:shadow-2xl
                transition-all duration-300
              "
            >
              {content.button}
            </button>
          </div>
        ))}

{/* ================= RIGHT SLIDER ================= */}
<div className="relative w-full flex justify-center">

  {/* Wrapper de centrage mobile */}
  <div className="relative flex justify-center w-full">

    <div
      className="
        relative
        w-[340px] md:w-[420px]
        h-[320px]

        /* CENTRAGE VISUEL MOBILE */
        -translate-x-3 md:translate-x-0
      "
    >

      {/* Background layers */}
      <div className="absolute top-6 left-6 w-full h-full bg-[#23c367] rounded-xl"></div>
      <div className="absolute top-12 left-12 w-full h-full bg-[#0a4d7c] rounded-xl"></div>

      <AnimatePresence initial={false} custom={direction}>
        {sliderData
          .filter((_, i) => i === index)
          .map((item) => (
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(
                  offset.x,
                  velocity.x
                );

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="
                absolute top-0 left-0 w-full h-full
                bg-gray-200 rounded-xl p-8
                flex flex-col justify-between
                cursor-grab active:cursor-grabbing
              "
            >
              <div>
                <h1 className="text-6xl font-bold">
                  {item.number}
                </h1>

                <h2 className="text-2xl font-bold leading-tight">
                  {item.title}
                </h2>

                <p className="text-gray-700 mt-4 text-sm">
                  {item.desc}
                </p>
              </div>

              <img
                src={item.image}
                alt=""
                className="
                  w-20 h-20 rounded-full
                  object-cover border-4
                  border-white shadow-lg
                "
              />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  </div>
</div>

      </div>
    </motion.section>
  );
};

export default News;
