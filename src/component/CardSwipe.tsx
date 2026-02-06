
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const data = [
  {
    id: 1,
    title: "7",
    subtitle: "personnalités scientifiques",
    desc: "De haut niveau et de renommée internationale qui composent un Conseil Scientifique.",
    image: "/images/p1.jpg",
  },
  {
    id: 2,
    title: "12",
    subtitle: "partenaires académiques",
    desc: "Collaborations avec des universités et centres de recherche.",
    image: "/images/p2.jpg",
  },
  {
    id: 3,
    title: "5",
    subtitle: "experts internationaux",
    desc: "Experts impliqués dans nos programmes scientifiques.",
    image: "/images/p3.jpg",
  },
];

export default function ScientificSlider() {
  const [index, setIndex] = useState(0);

  /* ================= AUTOPLAY ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 4000); // 4 sec

    return () => clearInterval(interval);
  }, [index]);

  /* ================= NAVIGATION ================= */
  const next = () => {
    setIndex((prev) => (prev + 1) % data.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  /* ================= SWIPE ================= */
  const swipeConfidenceThreshold = 50;

  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
    setIndex(
      (prev) => (prev + newDirection + data.length) % data.length
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-20 bg-white overflow-hidden">

      {/* SLIDER */}
      <div className="relative w-[340px] md:w-[520px] h-[340px]">

        {/* Barres derrière */}
        <div className="absolute top-6 left-6 w-full h-full bg-orange-500 rounded-xl"></div>
        <div className="absolute top-12 left-12 w-full h-full bg-black rounded-xl"></div>

        {/* CARD */}
        <AnimatePresence initial={false} custom={direction}>
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
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute top-0 left-0 w-full h-full bg-gray-200 rounded-xl p-8 flex flex-col justify-between cursor-grab active:cursor-grabbing"
          >
            {/* Texte */}
            <div>
              <h1 className="text-6xl font-bold">
                {data[index].title}
              </h1>

              <h2 className="text-2xl font-bold leading-tight">
                {data[index].subtitle}
              </h2>

              <p className="text-gray-700 mt-4 text-sm">
                {data[index].desc}
              </p>
            </div>

            {/* Photo */}
            <img
              src={data[index].image}
              alt=""
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOUTONS */}
      <div className="flex gap-4 mt-10">
        <button
          onClick={() => paginate(-1)}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          ←
        </button>

        <button
          onClick={() => paginate(1)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg"
        >
          →
        </button>
      </div>
    </div>
  );
}

