import { motion } from "framer-motion";
import { useState } from "react";

const logos = [
  { src: "/forvis-mazars-logo.svg", name: "Forvis Mazars" },
  { src: "/deloitte.png", name: "Deloitte" },
  { src: "/isnov.png", name: "Isnov" },
];

const Partners = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="partners"
      className="w-full py-14 md:py-24 overflow-hidden bg-gradient-to-br from-[#e8faf3] via-white to-[#eef6ff]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 md:mb-20"
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

        {/* ── Desktop : 3 cards côte à côte avec effet focus ── */}
        <div className="hidden md:flex items-center justify-center gap-0 relative h-64">
          {logos.map((logo, i) => {
            const isHovered = hoveredIndex === i;
            const isAdjacent = hoveredIndex !== null && !isHovered;
            const isLeft = hoveredIndex !== null && i < hoveredIndex;
            const isRight = hoveredIndex !== null && i > hoveredIndex;

            return (
              <motion.div
                key={i}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                animate={{
                  scale: isHovered ? 1.18 : isAdjacent ? 0.88 : 1,
                  x: isHovered ? 0 : isLeft ? -24 : isRight ? 24 : 0,
                  zIndex: isHovered ? 10 : 1,
                  opacity: isAdjacent ? 0.6 : 1,
                }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                className="relative flex-1 max-w-xs cursor-pointer mx-3"
                style={{ zIndex: isHovered ? 10 : 1 }}
              >
                {/* Glow derrière la card active */}
                <motion.div
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -inset-4 rounded-3xl blur-2xl pointer-events-none bg-gradient-to-br from-[#23c367]/30 to-[#0a4d7c]/20"
                />

                {/* Ligne du haut */}
                <motion.div
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="absolute top-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r from-[#23c367] to-[#0a4d7c] z-10"
                />

                <motion.div
                  animate={{
                    boxShadow: isHovered
                      ? "0 24px 64px rgba(35,195,103,0.22), 0 4px 16px rgba(0,0,0,0.10)"
                      : "0 2px 10px rgba(0,0,0,0.05)",
                    borderColor: isHovered
                      ? "rgba(35,195,103,0.35)"
                      : "rgba(0,0,0,0.06)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-[#23c367]/5 rounded-3xl border overflow-hidden"
                >
                  {/* Coin décoratif */}
                  <div
                    className={`absolute top-0 right-0 w-16 h-16 rounded-bl-3xl transition-opacity duration-300 bg-gradient-to-br from-[#23c367] to-[#0a4d7c] ${isHovered ? "opacity-10" : "opacity-4"}`}
                  />

                  <div className="flex flex-col items-center justify-center px-8 py-10 min-h-[200px] gap-5">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className={`max-h-14 max-w-full object-contain transition-all duration-500 ${isHovered ? "filter-none" : "grayscale opacity-50"}`}
                    />
                    <motion.span
                      animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 6 }}
                      transition={{ duration: 0.25 }}
                      className="text-xs font-semibold uppercase tracking-widest text-[#0a4d7c]/60"
                    >
                      {logo.name}
                    </motion.span>
                  </div>
                </motion.div>

              </motion.div>
            );
          })}
        </div>

        {/* ── Mobile : empilement vertical simple ── */}
        <div className="flex md:hidden flex-col gap-4">
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative bg-[#ffffff] rounded-2xl border border-black/6 shadow-sm overflow-hidden"
            >
              {/* Ligne du haut décorative */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#23c367] to-[#0a4d7c]" />
              <div className="flex items-center gap-5 px-6 py-5">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-10 max-w-[120px] object-contain"
                />
                <span className="text-sm font-semibold text-[#0a4d7c]/70 uppercase tracking-wider">
                  {logo.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;