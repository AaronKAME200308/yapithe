import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Calendar, ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Formation {
  id: number;
  title: string;
  description: string;
  date: string;
  videoUrl: string; // chemin local ou URL directe vers le fichier vidéo (mp4, webm, etc.)
  thumbnail?: string; // optionnel : image de couverture pour la vidéo
}

// ── Remplacez ces données par vos vraies formations ──────────────────────────
export const formationsData: Formation[] = [
  {
    id: 1,
    title: "Introduction au Contrôle de Gestion",
    description:
      "Maîtrisez les fondamentaux du contrôle de gestion et les outils essentiels pour piloter la performance de votre organisation.",
    date: "Janvier 2024",
    videoUrl: "/videos/formation-1.mp4",
    thumbnail: "/thumbnails/formation-1.jpg",
  },
  {
    id: 2,
    title: "Comptabilité Analytique Avancée",
    description:
      "Approfondissez vos connaissances en comptabilité analytique pour optimiser les coûts et améliorer la rentabilité de vos activités.",
    date: "Mars 2024",
    videoUrl: "/videos/formation-2.mp4",
    thumbnail: "/thumbnails/formation-2.jpg",
  },
  {
    id: 3,
    title: "Pilotage Stratégique & Décision",
    description:
      "Transformez vos données financières en décisions stratégiques percutantes et maîtrisez les outils de pilotage pour vos dirigeants.",
    date: "Mai 2024",
    videoUrl: "/videos/formation-3.mp4",
    thumbnail: "/thumbnails/formation-3.jpg",
  },
  {
    id: 4,
    title: "Outils de Pilotage Opérationnel",
    description:
      "Découvrez les outils modernes pour élaborer et suivre vos budgets avec efficacité, précision et en temps réel.",
    date: "Juillet 2024",
    videoUrl: "/videos/formation-4.mp4",
    thumbnail: "/thumbnails/formation-4.jpg",
  },
  {
    id: 5,
    title: "Coaching de Performance d'Équipe",
    description:
      "Techniques avancées pour coacher vos équipes vers l'excellence et développer une culture durable de la performance.",
    date: "Septembre 2024",
    videoUrl: "/videos/formation-5.mp4",
    thumbnail: "/thumbnails/formation-5.jpg",
  },
  {
    id: 6,
    title: "Transformation Digitale & Finance",
    description:
      "Intégrez les outils digitaux dans votre gestion financière pour gagner en efficacité, en précision et en réactivité.",
    date: "Novembre 2024",
    videoUrl: "/videos/formation-6.mp4",
    thumbnail: "/thumbnails/formation-6.jpg",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function FormationsPage() {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<Formation | null>(null);

  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        background:
          "linear-gradient(135deg, #e8faf3 0%, #ffffff 50%, #eef6ff 100%)",
      }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          {/* Bouton retour */}
          <button
            onClick={() => navigate(-1)}
            className="
              mb-2 px-4 py-2 rounded-xl
              bg-gradient-to-r from-[#23c367] to-[#1fa85a]
              text-white text-sm font-semibold
              flex items-center gap-2 shadow-lg
              transition-all duration-300 ease-out
              hover:shadow-xl hover:-translate-y-1 hover:scale-[1.03]
              active:scale-95 active:translate-y-0
              focus:outline-none focus:ring-2 focus:ring-[#23c367]/50
              group
            "
          >
            <ArrowLeft className="w-4 h-4 transition-all duration-300 group-hover:-translate-x-2 group-hover:scale-110" />
            <span className="transition-all duration-300 group-hover:tracking-wide">
              Retour
            </span>
          </button>

          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{
              background:
                "linear-gradient(to right, rgba(35,195,103,0.12), rgba(10,77,124,0.12))",
            }}
          >
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{
                background: "linear-gradient(to right, #23c367, #0a4d7c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Yapithe & Partners
            </span>
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl md:text-5xl font-black leading-none mb-3"
            style={{
              background: "linear-gradient(to right, #23c367, #0a4d7c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Nos Précédentes Formations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-sm md:text-base max-w-xl"
            style={{ color: "#7090a6" }}
          >
            Accédez à l'ensemble de nos formations en vidéo. Revivez les
            sessions, renforcez vos compétences et partagez avec votre équipe.
          </motion.p>
        </motion.div>

        {/* ── GRID ── */}
        <div className="grid lg:grid-cols-2 gap-8">
          {formationsData.map((formation, index) => (
            <motion.div
              key={formation.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              {/* Vignette vidéo native */}
              <div
                onClick={() => setSelectedVideo(formation)}
                className="relative w-full aspect-video cursor-pointer overflow-hidden bg-gray-100"
              >
                <video
                  src={formation.videoUrl}
                  poster={formation.thumbnail}
                  className="w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105"
                  preload="metadata"
                />

                {/* Overlay */}
                <div
                  className="absolute inset-0 transition-colors duration-300"
                  style={{ background: "rgba(0,0,0,0.35)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(0,0,0,0.18)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "rgba(0,0,0,0.35)")
                  }
                />
              </div>

              {/* Contenu */}
              <div className="p-6 flex flex-col gap-3">
                {/* Date */}
                <div
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: "#7090a6" }}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  {formation.date}
                </div>

                {/* Titre */}
                <h2
                  className="text-lg md:text-xl font-bold leading-snug transition-colors duration-300"
                  style={{ color: "#0a4d7c" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#23c367")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#0a4d7c")
                  }
                >
                  {formation.title}
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
                  {formation.description}
                </p>

                {/* Bouton regarder */}
                <button
                  onClick={() => setSelectedVideo(formation)}
                  className="
                    mt-2 px-5 py-2 rounded-full
                    bg-gradient-to-r from-[#23c367] to-[#1fa85a]
                    text-white text-sm font-semibold self-start shadow-sm
                    transition-all duration-300 ease-out
                    hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.02]
                    active:scale-95
                    focus:outline-none focus:ring-2 focus:ring-[#23c367]/40
                  "
                >
                  <span className="transition-all duration-300 hover:tracking-wide">
                    Regarder
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fin de liste */}
        <div className="mt-12 flex items-center gap-4">
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to right, rgba(35,195,103,0.3), transparent)",
            }}
          />
          <span className="text-xs font-medium" style={{ color: "#b0c4d0" }}>
            Fin des formations
          </span>
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to left, rgba(10,77,124,0.2), transparent)",
            }}
          />
        </div>
      </div>

      {/* ── MODAL VIDÉO NATIVE ── */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            className="
              fixed inset-0 z-50
              flex items-center justify-center
              p-4 md:p-8
              bg-black/75 backdrop-blur-md
            "
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative w-full max-w-3xl aspect-video
                bg-black rounded-xl overflow-hidden shadow-2xl
              "
            >
              {/* Bouton fermer */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="
                  absolute top-3 right-3 z-10
                  w-8 h-8 flex items-center justify-center
                  rounded-full bg-white/20 backdrop-blur-sm text-white
                  transition-all duration-300
                  hover:bg-white/40 hover:scale-110 active:scale-95
                "
              >
                <X className="w-4 h-4" />
              </button>

              {/* Lecteur vidéo natif */}
              <video
                key={selectedVideo.videoUrl}
                src={selectedVideo.videoUrl}
                poster={selectedVideo.thumbnail}
                className="w-full h-full"
                controls
                autoPlay
                title={selectedVideo.title}
              />
            </motion.div>

            {/* Barre accent bas modal */}
            <div
              className="
                absolute bottom-6 left-1/2 -translate-x-1/2
                w-32 h-1 rounded-full
                bg-gradient-to-r from-[#23c367] to-[#0a4d7c]
              "
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};