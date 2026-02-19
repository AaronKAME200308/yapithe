import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Play, Image as ImageIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";
import type { Variants } from "framer-motion";

const VoirPlus = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const { data, category } = location.state || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div
      className="min-h-screen w-full relative"
      style={{ fontFamily: "'Sora', sans-serif", background: "linear-gradient(135deg, #e8faf3 0%, #ffffff 50%, #eef6ff 100%)" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800;900&display=swap');`}</style>

      {/* Blobs décoratifs */}
      <div style={{ position: "fixed", top: "-8rem", right: "-8rem", width: "28rem", height: "28rem", background: "rgba(35,195,103,0.07)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-6rem", left: "-6rem", width: "24rem", height: "24rem", background: "rgba(10,77,124,0.05)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          {/* Bouton retour — style ActualitesPage */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-sm font-semibold group transition-colors"
            style={{ color: "#0a4d7c" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#23c367")}
            onMouseLeave={e => (e.currentTarget.style.color = "#0a4d7c")}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour
          </button>

          {/* Badge + Titre — style ActualitesPage */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{ background: "linear-gradient(to right, rgba(35,195,103,0.12), rgba(10,77,124,0.12))" }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#23c367" }} />
            <span
              className="text-sm font-michroma font-semibold uppercase tracking-widest"
              style={{ background: "linear-gradient(to right, #23c367, #0a4d7c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Yapithe & Partners
            </span>
          </motion.div>

          {category && (
            <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}>
              <h1
                className="text-4xl md:text-5xl font-black leading-none mb-3"
                style={{ background: "linear-gradient(to right, #23c367, #0a4d7c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                {category}
              </h1>
              <p className="text-sm md:text-base" style={{ color: "#7090a6" }}>
                {data?.length || 0} {data?.length > 1 ? "éléments disponibles" : "élément disponible"}
              </p>
            </motion.div>
          )}

          {/* Ligne séparatrice */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="mt-6 origin-left"
            style={{ height: "1px", background: "linear-gradient(to right, #23c367, rgba(10,77,124,0.2), transparent)" }}
          />
        </motion.div>

        {/* ── LISTE ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8"
        >
          {data?.map((item: any, i: number) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group"
            >
              <div className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>

                {/* ── MEDIA ── */}
                <div className="relative w-full md:w-72 lg:w-80 flex-shrink-0 overflow-hidden" style={{ height: 220 }}>
                  {item.type === "video" ? (
                    <>
                      <video
                        src={item.media}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                          <Play className="w-6 h-6 ml-1" fill="#0a4d7c" style={{ color: "#0a4d7c" }} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${item.media})` }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                  {/* Badge type media */}
                  <div
                    className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "rgba(255,255,255,0.92)", color: "#0a4d7c", backdropFilter: "blur(6px)" }}
                  >
                    {item.type === "video"
                      ? <><Play className="w-3 h-3" fill="currentColor" /> Vidéo</>
                      : <><ImageIcon className="w-3 h-3" /> Image</>
                    }
                  </div>
                </div>

                {/* ── INFOS ── */}
                <div className="flex flex-col justify-between p-6 md:p-8 flex-1">
                  <div>
                    {/* Date badge */}
                    {item.date && (
                      <div className="flex items-center gap-1.5 mb-4 text-xs" style={{ color: "#7090a6" }}>
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                      </div>
                    )}

                    {/* Titre — style ActualitesPage */}
                    <h2
                      className="text-lg md:text-xl font-bold leading-snug mb-3 transition-colors duration-300"
                      style={{ color: "#0a4d7c" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#23c367")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#0a4d7c")}
                    >
                      {item.title}
                    </h2>

                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: "#7090a6",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>

                  {/* Bouton — style ActualitesPage */}
                  <button
                    onClick={() => { setSelected(item); setOpen(true); }}
                    className="mt-5 self-start flex items-center gap-2 text-sm font-semibold transition-colors"
                    style={{ color: "#23c367" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#1a9950")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#23c367")}
                  >
                    <span>Voir plus</span>
                    <span
                      className="w-5 h-5 rounded-full border flex items-center justify-center text-xs transition-all"
                      style={{ borderColor: "#23c367" }}
                    >
                      →
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── AUCUN CONTENU ── */}
        {(!data || data.length === 0) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-16 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(35,195,103,0.1)" }}>
              <ImageIcon className="w-8 h-8" style={{ color: "#23c367" }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: "#0a4d7c" }}>Aucun contenu disponible</h3>
            <p className="text-sm" style={{ color: "#7090a6" }}>Il n'y a pas encore de contenu à afficher dans cette section.</p>
          </motion.div>
        )}

        {/* Fin de liste */}
        {data?.length > 0 && (
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px flex-1" style={{ background: "linear-gradient(to right, rgba(35,195,103,0.3), transparent)" }} />
            <span className="text-xs font-medium" style={{ color: "#b0c4d0" }}>Fin des résultats</span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(to left, rgba(10,77,124,0.2), transparent)" }} />
          </div>
        )}
      </div>

      {/* ── MODAL ── */}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={selected?.title || "Titre inconnu"}
        date={selected?.date || "Date inconnue"}
        media={selected?.media || "/default.jpg"}
        description={selected?.desc || "Description inconnue"}
        isVideo={selected?.type === "video"}
        category={category}
      />
    </div>
  );
};

export default VoirPlus;