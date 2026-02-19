import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const Partners = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const logos = [
    "/logo1.png", "/logo2.png", "/logo3.jpeg", "/logo4.jpeg",
    "/logo5.png", "/logo6.png", "/logo7.png", "/logo8.jpeg",
    "/logo9.jpg", "/logo10.png", "/logo11.png", "/logo12.jpg",
    "/logo13.png", "/logo14.png", "/logo15.svg", "/logo16.png",
    "/logo17.jpg", "/logo18.png", "/logo19.svg",
  ];

  const visibleCount = isMobile ? 2 : 5;
  const maxIndex = logos.length - visibleCount;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex(i => Math.max(i - 1, 0));
  const next = () => setCurrentIndex(i => Math.min(i + 1, maxIndex));

  const atStart = currentIndex === 0;
  const atEnd = currentIndex >= maxIndex;

  return (
    <section
      id="partners"
      className="w-full py-14 md:py-20 overflow-hidden bg-gradient-to-br from-[#e8faf3] via-white to-[#eef6ff]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* ── En-tête ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-gradient-to-r from-green-200/30 to-blue-200/30">
            <span className="text-sm font-semibold uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-[#23c367] to-[#0a4d7c]">
              Nos Partenaires
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black leading-none mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#23c367] to-[#0a4d7c]">
            Ils nous font confiance
          </h2>
          <p className="text-sm md:text-base max-w-xl text-[#7090a6]">
            Nous collaborons avec des partenaires fiables pour renforcer notre expertise et garantir la qualité de nos prestations.
          </p>
        </motion.div>

        {/* ── Carousel ── */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${(100 / visibleCount) * currentIndex}%` }}
              transition={{ type: "spring", stiffness: 260, damping: 32 }}
            >
              {logos.map((logo, i) => (
                <div key={i} className={`flex-none px-2 md:px-3 w-[${100/visibleCount}%]`}>
                  <LogoCard logo={logo} index={i} isMobile={isMobile} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Flèches ── */}
          <NavButton direction="left" onClick={prev} disabled={atStart} />
          <NavButton direction="right" onClick={next} disabled={atEnd} />
        </div>

        {/* ── Indicateurs ── */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(logos.length / visibleCount) }).map((_, i) => {
            const active = Math.floor(currentIndex / visibleCount) === i;
            return (
              <button
                key={i}
                onClick={() => setCurrentIndex(Math.min(i * visibleCount, maxIndex))}
                className={`rounded-full transition-all duration-300 ${active ? "w-6 h-2 bg-gradient-to-r from-[#23c367] to-[#1fa85a]" : "w-2 h-2 bg-[#0a4d7c]/15"}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const LogoCard = ({ logo, index, isMobile }: { logo: string; index: number; isMobile: boolean }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 5) * 0.07 }}
      onHoverStart={() => !isMobile && setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative cursor-default select-none"
    >
      {/* Lueur verte */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.85 }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-1 rounded-2xl blur-lg pointer-events-none bg-gradient-to-br from-green-300/30 to-blue-200/20"
      />
      <motion.div
        animate={{ y: hovered ? -1 : 0 }}
        transition={{ duration: 0.25 }}
        className={`relative bg-white rounded-2xl border overflow-hidden transition-shadow duration-300
          ${hovered ? "border-green-300/30 shadow-[0_12px_32px_rgba(35,195,103,0.15),0_2px_8px_rgba(0,0,0,0.06)]" : "border-black/6 shadow-[0_2px_10px_rgba(0,0,0,0.05)]"}
        `}
      >
        <div className={`absolute top-0 right-0 w-10 h-10 rounded-bl-2xl transition-opacity ${hovered ? "opacity-12" : "opacity-5"} bg-gradient-to-br from-[#23c367] to-[#0a4d7c]`} />
        <div className={`absolute top-0 left-0 right-0 h-0.5 transition-opacity ${hovered ? "opacity-100" : "opacity-0"} bg-gradient-to-r from-[#23c367] to-[#0a4d7c]`} />

        <div className="flex items-center justify-center px-4 py-5 md:py-7 min-h-[80px]">
          <img
            src={logo}
            alt=""
            className={`max-h-10 md:max-h-14 max-w-full object-contain transition-all duration-500 ${hovered || isMobile ? "filter-none" : "grayscale opacity-55"}`}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const NavButton = ({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-300 z-10 ${
      disabled ? "opacity-30 cursor-not-allowed" : "hover:scale-110"
    }`}
    style={{
      [direction === "left" ? "left" : "right"]: "-1.25rem",
      width: 40,
      height: 40,
      backdropFilter: "blur(6px)",
    }}
  >
    <div className={`flex items-center justify-center w-full h-full rounded-full ${disabled ? "bg-gray-300" : "bg-gradient-to-br from-green-500 to-emerald-500"} shadow-md`}>
      {direction === "left" ? <ChevronLeft className="w-5 h-5 text-white" /> : <ChevronRight className="w-5 h-5 text-white" />}
    </div>
  </button>
);

export default Partners;