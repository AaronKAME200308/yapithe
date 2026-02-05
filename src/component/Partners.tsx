import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Partners = () => {
  const logos = [
    "/logo1.png","/logo2.png","/logo3.jpeg","/logo4.jpeg",
    "/logo5.png","/logo6.png","/logo7.png","/logo8.jpeg",
    "/logo9.jpg","/logo10.png","/logo11.png","/logo12.jpg",
    "/logo13.png","/logo14.png","/logo15.svg","/logo16.png",
    "/logo17.jpg","/logo18.png","/logo19.svg",
  ];

  const visibleCount = 5; // nombre de logos visibles
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<number>();

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, logos.length - visibleCount));
  };

  // Auto-scroll
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= logos.length - visibleCount ? 0 : prev + 1
      );
    }, 3000);

    return () => {
      if (intervalRef.current !== undefined) clearInterval(intervalRef.current);
    };
  }, [logos.length]);

  return (
    <motion.div
      id="logos"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-20 bg-gradient-to-r from-[#e0f7f1] to-[#ffffff]"
    >
      <h2 className="text-4xl font-bold  bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text mb-6">Nos Partenaires</h2>
      <p className="text-lg text-[#7090a6] leading-relaxed mb-4">
        Nous collaborons avec des partenaires fiables pour renforcer notre expertise et garantir la qualité de nos prestations.
      </p>

      <div className="relative">
        {/* Carousel */}
        <div className="overflow-hidden rounded-lg p-5 bg-white border border-gray-200 shadow-lg">
          <div
            className="flex transition-transform duration-500 ease-out "
            style={{ transform: `translateX(-${(100 / visibleCount) * currentIndex}%) ` }}
          >
            {logos.map((logo, i) => (
              <div
                key={i}
                className="flex-none flex justify-center items-center px-4" // <-- espace entre logos
                style={{ width: `${100 / visibleCount}%` }}
              >
                <img
                  src={logo}
                  alt={`Partenaire ${i + 1}`}
                  className="h-16 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="absolute top-1/2 left-0 -translate-y-1/2 bg-[#0a4d7c] rounded-full p-2 shadow hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5 text-[#23c367]" />
        </button>
        <button
          onClick={next}
          disabled={currentIndex >= logos.length - visibleCount}
          className="absolute top-1/2 right-0 -translate-y-1/2 bg-[#0a4d7c] rounded-full p-2 shadow hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5 text-[#23c367]" />
        </button>
      </div>
    </motion.div>
  );
};

export default Partners;
