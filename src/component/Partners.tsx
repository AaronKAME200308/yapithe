import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Partners = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const logos = [
    "/logo1.png","/logo2.png","/logo3.jpeg","/logo4.jpeg",
    "/logo5.png","/logo6.png","/logo7.png","/logo8.jpeg",
    "/logo9.jpg","/logo10.png","/logo11.png","/logo12.jpg",
    "/logo13.png","/logo14.png","/logo15.svg","/logo16.png",
    "/logo17.jpg","/logo18.png","/logo19.svg",
  ];

  const visibleCount = isMobile ? 2 : 5; // 2 sur mobile, 5 sur desktop
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const intervalRef = useRef<number>(0);

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, logos.length - visibleCount));
  };

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= logos.length - visibleCount ? 0 : prev + 1
      );
    }, 3000);

    return () => {
      if (intervalRef.current !== undefined) clearInterval(intervalRef.current);
    };
  }, [logos.length, visibleCount]);

  return (
    <motion.div
      id="partners"
      variants={isMobile ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={isMobile ? {} : { duration: 0.8, ease: "easeOut" }}
      style={{ background: 'linear-gradient(to right, #e0f7f1, #ffffff)' }}
      className="max-w-7xl mx-auto px-6 py-20"
    >
      <h2 
        style={{
          background: 'linear-gradient(to right, #23c367, #0a4d7c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
        className="text-3xl md:text-4xl font-bold mb-6"
      >
        Nos Partenaires
      </h2>
      <p className="text-base md:text-lg text-[#7090a6] leading-relaxed mb-8">
        Nous collaborons avec des partenaires fiables pour renforcer notre expertise et garantir la qualité de nos prestations.
      </p>

      <div className="relative px-12 md:px-16">
        {/* Carousel avec style moderne */}
        <div className="overflow-hidden rounded-3xl p-4 md:p-8 relative">
          {/* Background effet glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-white/60 backdrop-blur-xl border border-white/20 rounded-3xl"></div>
          
          {/* Effet de lumière flottante */}
          <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-[#23c367]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-[#0a4d7c]/10 rounded-full blur-3xl"></div>

          <div
            className="flex transition-transform duration-700 ease-out relative z-10"
            style={{ transform: `translateX(-${(100 / visibleCount) * currentIndex}%)` }}
          >
            {logos.map((logo, i) => (
              <motion.div
                key={i}
                className="flex-none flex justify-center items-center px-2 md:px-3"
                style={{ width: `${100 / visibleCount}%` }}
                onHoverStart={() => !isMobile && setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={isMobile ? {} : { scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Carte de logo avec effet 3D */}
                <div className="relative group w-full">
                  {/* Effet de lueur au hover - desktop only */}
                  {!isMobile && (
                    <motion.div
                      animate={{
                        opacity: hoveredIndex === i ? 1 : 0,
                        scale: hoveredIndex === i ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background: 'linear-gradient(135deg, #23c367, #0a4d7c)',
                      }}
                      className="absolute -inset-2 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    ></motion.div>
                  )}

                  {/* Carte principale */}
                  <motion.div
                    style={{
                      background: 'linear-gradient(135deg, #ffffff, #f8fffe)',
                    }}
                    className="relative bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-xl border border-gray-100/50 overflow-hidden group-hover:shadow-2xl transition-all duration-300"
                    animate={isMobile ? {} : {
                      rotateY: hoveredIndex === i ? 5 : 0,
                    }}
                  >
                    {/* Bande décorative en diagonale */}
                    <div 
                      style={{
                        background: 'linear-gradient(135deg, #23c367, #0a4d7c)',
                      }}
                      className="absolute top-0 right-0 w-12 md:w-20 h-12 md:h-20 opacity-5 group-hover:opacity-10 transition-opacity duration-300 -rotate-45 translate-x-6 md:translate-x-10 -translate-y-6 md:-translate-y-10"
                    ></div>

                    {/* Logo */}
                    <div className="relative z-10 flex items-center justify-center h-12 md:h-20">
                      <img
                        src={logo}
                        alt={`Partenaire ${i + 1}`}
                        className={`max-h-10 md:max-h-16 max-w-full object-contain filter ${!isMobile ? 'grayscale' : ''} group-hover:grayscale-0 transition-all duration-500`}
                      />
                    </div>

                    {/* Coin plié effet */}
                    <div className="absolute bottom-0 right-0 w-6 md:w-8 h-6 md:h-8 overflow-hidden">
                      <div 
                        style={{
                          background: 'linear-gradient(225deg, #23c367, #0a4d7c)',
                        }}
                        className="absolute -bottom-3 md:-bottom-4 -right-3 md:-right-4 w-6 md:w-8 h-6 md:h-8 rotate-45 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                      ></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Boutons navigation avec nouveau style - hors du carousel */}
        <motion.button
          onClick={prev}
          disabled={currentIndex === 0}
          whileHover={isMobile ? {} : { scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          style={{
            background: currentIndex === 0 
              ? 'linear-gradient(135deg, #e0e0e0, #c0c0c0)' 
              : 'linear-gradient(135deg, #23c367, #1fa85a)',
          }}
          className="absolute top-1/2 left-0 -translate-y-1/2 rounded-xl md:rounded-2xl p-2 md:p-3 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 backdrop-blur-sm border border-white/20 z-20"
        >
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-white" />
        </motion.button>

        <motion.button
          onClick={next}
          disabled={currentIndex >= logos.length - visibleCount}
          whileHover={isMobile ? {} : { scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          style={{
            background: currentIndex >= logos.length - visibleCount
              ? 'linear-gradient(135deg, #e0e0e0, #c0c0c0)' 
              : 'linear-gradient(135deg, #23c367, #1fa85a)',
          }}
          className="absolute top-1/2 right-0 -translate-y-1/2 rounded-xl md:rounded-2xl p-2 md:p-3 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 backdrop-blur-sm border border-white/20 z-20"
        >
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white" />
        </motion.button>

        {/* Indicateurs de pagination */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(logos.length / visibleCount) }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentIndex(i)}
              whileHover={isMobile ? {} : { scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: Math.floor(currentIndex / visibleCount) === i
                  ? 'linear-gradient(135deg, #23c367, #1fa85a)'
                  : '#e0e0e0',
              }}
              className="w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 shadow-md"
            ></motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Partners;