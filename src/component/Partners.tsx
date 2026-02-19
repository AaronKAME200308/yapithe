import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Partners = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
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

  const visibleCount = isMobile ? 2 : 5;
  const maxIndex = logos.length - visibleCount;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const next = () => setCurrentIndex((i) => Math.min(i + 1, maxIndex));

  const atStart = currentIndex === 0;
  const atEnd   = currentIndex >= maxIndex;

  return (
    <section
      id="partners"
      className="w-full py-14 md:py-20 overflow-hidden"
      style={{ fontFamily: "'Sora', sans-serif", background: "linear-gradient(135deg, #e8faf3 0%, #ffffff 60%, #eef6ff 100%)" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800;900&display=swap');`}</style>

      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── En-tête ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{ background: "linear-gradient(to right, rgba(35,195,103,0.12), rgba(10,77,124,0.12))" }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#23c367" }} />
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ background: "linear-gradient(to right, #23c367, #0a4d7c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Ils nous font confiance
            </span>
          </div>

          <h2
            className="text-3xl md:text-4xl font-black leading-none mb-3"
            style={{ background: "linear-gradient(to right, #23c367, #0a4d7c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Nos Partenaires
          </h2>
          <p className="text-sm md:text-base max-w-xl" style={{ color: "#7090a6" }}>
            Nous collaborons avec des partenaires fiables pour renforcer notre expertise et garantir la qualité de nos prestations.
          </p>

          {/* Séparateur */}
          <div
            className="mt-6"
            style={{ height: "1px", background: "linear-gradient(to right, #23c367, rgba(10,77,124,0.2), transparent)" }}
          />
        </motion.div>

        {/* ── Carousel ── */}
        <div className="relative">

          {/* Piste */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${(100 / visibleCount) * currentIndex}%` }}
              transition={{ type: "spring", stiffness: 260, damping: 32 }}
            >
              {logos.map((logo, i) => (
                <div
                  key={i}
                  className="flex-none px-2 md:px-3"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <LogoCard logo={logo} index={i} isMobile={isMobile} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Flèches ── */}
          <NavButton direction="left"  onClick={prev} disabled={atStart} />
          <NavButton direction="right" onClick={next} disabled={atEnd}   />
        </div>

        {/* ── Indicateurs ── */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(logos.length / visibleCount) }).map((_, i) => {
            const active = Math.floor(currentIndex / visibleCount) === i;
            return (
              <button
                key={i}
                onClick={() => setCurrentIndex(Math.min(i * visibleCount, maxIndex))}
                className="rounded-full transition-all duration-300"
                style={{
                  width:  active ? 24 : 8,
                  height: 8,
                  background: active
                    ? "linear-gradient(to right, #23c367, #1fa85a)"
                    : "rgba(10,77,124,0.15)",
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ── Logo card ─────────────────────────────────────────────── */
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
      {/* Lueur verte au hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.85 }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-1 rounded-2xl blur-lg pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(35,195,103,0.3), rgba(10,77,124,0.2))" }}
      />

      {/* Carte */}
      <motion.div
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.25 }}
        className="relative bg-white rounded-2xl border overflow-hidden transition-shadow duration-300"
        style={{
          borderColor: hovered ? "rgba(35,195,103,0.35)" : "rgba(0,0,0,0.06)",
          boxShadow: hovered
            ? "0 12px 32px rgba(35,195,103,0.15), 0 2px 8px rgba(0,0,0,0.06)"
            : "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        {/* Coin coloré top-right */}
        <div
          className="absolute top-0 right-0 w-10 h-10 rounded-bl-2xl transition-opacity duration-300"
          style={{
            background: "linear-gradient(135deg, #23c367, #0a4d7c)",
            opacity: hovered ? 0.12 : 0.05,
          }}
        />

        {/* Ligne accent top */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to right, #23c367, #0a4d7c)",
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Logo */}
        <div className="flex items-center justify-center px-4 py-5 md:py-7" style={{ minHeight: 80 }}>
          <img
            src={logo}
            alt={`Partenaire ${index + 1}`}
            className="max-h-10 md:max-h-14 max-w-full object-contain transition-all duration-500"
            style={{
              filter: hovered || isMobile ? "none" : "grayscale(1) opacity(0.55)",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Bouton navigation ──────────────────────────────────────── */
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
    className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed z-10"
    style={{
      [direction === "left" ? "left" : "right"]: "-1.25rem",
      width: 40,
      height: 40,
      background: disabled
        ? "rgba(200,200,200,0.6)"
        : "linear-gradient(135deg, #23c367, #1fa85a)",
      boxShadow: disabled ? "none" : "0 4px 16px rgba(35,195,103,0.35)",
      backdropFilter: "blur(6px)",
    }}
    onMouseEnter={e => {
      if (!disabled) (e.currentTarget as HTMLElement).style.transform = `translateY(-50%) scale(1.1)`;
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLElement).style.transform = `translateY(-50%) scale(1)`;
    }}
  >
    {direction === "left"
      ? <ChevronLeft className="w-5 h-5 text-white" />
      : <ChevronRight className="w-5 h-5 text-white" />
    }
  </button>
);

export default Partners;