import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Play, GraduationCap, ChevronRight } from "lucide-react";

// ─── Formations Video Page ────────────────────────────────────────────────────
const formations = [
  {
    id: 1,
    title: "Introduction au Contrôle de Gestion",
    description: "Maîtrisez les fondamentaux du contrôle de gestion et les outils essentiels pour piloter la performance de votre organisation.",
    duration: "2h 15min",
    level: "Débutant",
    thumbnail: "/formation-thumb-1.jpg",
    videoUrl: "#",
    date: "Janvier 2024",
    tags: ["Contrôle de gestion", "KPI", "Tableau de bord"],
  },
  {
    id: 2,
    title: "Comptabilité Analytique Avancée",
    description: "Approfondissez vos connaissances en comptabilité analytique pour optimiser les coûts et améliorer la rentabilité.",
    duration: "3h 40min",
    level: "Avancé",
    thumbnail: "/formation-thumb-2.jpg",
    videoUrl: "#",
    date: "Mars 2024",
    tags: ["Comptabilité", "Coûts", "Rentabilité"],
  },
  {
    id: 3,
    title: "Pilotage Stratégique & Décision",
    description: "Comment transformer vos données financières en décisions stratégiques percutantes pour vos dirigeants.",
    duration: "1h 50min",
    level: "Intermédiaire",
    thumbnail: "/formation-thumb-3.jpg",
    videoUrl: "#",
    date: "Mai 2024",
    tags: ["Stratégie", "Décision", "Leadership"],
  },
  {
    id: 4,
    title: "Outils de Pilotage Opérationnel",
    description: "Découvrez les outils modernes pour élaborer et suivre vos budgets avec efficacité et précision.",
    duration: "2h 30min",
    level: "Intermédiaire",
    thumbnail: "/formation-thumb-4.jpg",
    videoUrl: "#",
    date: "Juillet 2024",
    tags: ["Budget", "Prévision", "Outils"],
  },
  {
    id: 5,
    title: "Coaching de Performance d'Équipe",
    description: "Techniques avancées pour coacher vos équipes vers l'excellence et développer une culture de la performance.",
    duration: "2h 05min",
    level: "Avancé",
    thumbnail: "/formation-thumb-5.jpg",
    videoUrl: "#",
    date: "Septembre 2024",
    tags: ["Coaching", "Équipe", "Performance"],
  },
  {
    id: 6,
    title: "Transformation Digitale & Finance",
    description: "Intégrez les outils digitaux dans votre gestion financière pour gagner en efficacité et en précision.",
    duration: "3h 10min",
    level: "Intermédiaire",
    thumbnail: "/formation-thumb-6.jpg",
    videoUrl: "#",
    date: "Novembre 2024",
    tags: ["Digital", "Finance", "Innovation"],
  },
];

const levelColors: Record<string, string> = {
  "Débutant": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Intermédiaire": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Avancé": "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

const FormationsPage = ({ onClose }: { onClose: () => void }) => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Full-screen overlay with gradient bg */}
      <div className="min-h-screen bg-[#060d1a] relative">
        {/* Ambient blobs */}
        <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-[#0a4d7c]/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#23c367]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="sticky top-0 z-10 backdrop-blur-xl bg-[#060d1a]/80 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </motion.button>
              <div className="h-6 w-px bg-white/20" />
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#23c367] to-[#0a9d4f] flex items-center justify-center shadow-lg shadow-[#23c367]/30">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-widest">Yapithe & Partners</p>
                  <h1 className="text-white font-bold text-sm leading-tight">Nos Précédentes Formations</h1>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#23c367]/10 border border-[#23c367]/20 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#23c367] animate-pulse" />
              <span className="text-[#23c367] text-xs font-semibold">{formations.length} formations disponibles</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#23c367]/20 to-[#0a4d7c]/20 backdrop-blur-sm rounded-full border border-[#23c367]/30 mb-6"
            >
              <Play className="w-4 h-4 text-[#23c367] fill-[#23c367]" />
              <span className="text-[#23c367] font-semibold text-sm uppercase tracking-wider">Vidéothèque des Formations</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
              Apprenez à votre{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#23c367] via-[#1de080] to-[#0a9d4f] text-transparent bg-clip-text">rythme</span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#23c367] to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Accédez à l'ensemble de nos formations passées en vidéo. Revivez les sessions, renforcez vos compétences et partagez avec votre équipe.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {formations.map((formation, idx) => (
              <motion.div
                key={formation.id}
                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 18, stiffness: 120 } } }}
                onHoverStart={() => setHoveredId(formation.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#23c367]/40 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(35,195,103,0.15)]"
              >
                {/* Thumbnail area */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#0a4d7c] to-[#060d1a]">
                  {/* Placeholder gradient with number */}
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-60 ${
                    idx % 3 === 0 ? "from-blue-600 to-cyan-500" :
                    idx % 3 === 1 ? "from-emerald-600 to-teal-500" :
                    "from-purple-600 to-indigo-500"
                  }`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/10 font-black text-9xl select-none">0{formation.id}</span>
                  </div>

                  {/* Play overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/40 flex items-center justify-center"
                    animate={{ opacity: hoveredId === formation.id ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.button
                      onClick={() => setPlayingId(formation.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-16 h-16 rounded-full bg-[#23c367] shadow-xl shadow-[#23c367]/50 flex items-center justify-center cursor-pointer"
                    >
                      <Play className="w-7 h-7 text-white fill-white ml-1" />
                    </motion.button>
                  </motion.div>

                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-xs font-bold border border-white/20">
                    {formation.duration}
                  </div>
                  {/* Date badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-white/70 text-xs border border-white/10">
                    {formation.date}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-white font-bold text-lg leading-snug group-hover:text-[#23c367] transition-colors duration-300 flex-1">
                      {formation.title}
                    </h3>
                    <span className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold border ${levelColors[formation.level]}`}>
                      {formation.level}
                    </span>
                  </div>

                  <p className="text-white/60 text-sm leading-relaxed line-clamp-2">{formation.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {formation.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-white/50 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.button
                    onClick={() => setPlayingId(formation.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#0a4d7c] to-[#0c5d94] hover:from-[#23c367]/20 hover:to-[#23c367]/10 border border-white/10 hover:border-[#23c367]/40 text-white font-semibold text-sm transition-all duration-300 cursor-pointer group/btn"
                  >
                    <Play className="w-4 h-4 fill-current group-hover/btn:text-[#23c367] transition-colors" />
                    <span className="group-hover/btn:text-[#23c367] transition-colors">Regarder la formation</span>
                    <ChevronRight className="w-4 h-4 ml-auto group-hover/btn:translate-x-1 group-hover/btn:text-[#23c367] transition-all" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {playingId !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setPlayingId(null)} />
            <motion.div
              className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(35,195,103,0.2)]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
            >
              <div className="flex items-center justify-between px-6 py-4 bg-[#0a4d7c] border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#23c367]/20 flex items-center justify-center">
                    <Play className="w-4 h-4 text-[#23c367] fill-[#23c367]" />
                  </div>
                  <h3 className="text-white font-bold text-sm">
                    {formations.find(f => f.id === playingId)?.title}
                  </h3>
                </div>
                <button onClick={() => setPlayingId(null)} className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-red-500/30 text-white/70 hover:text-white rounded-xl transition-all duration-200 border border-white/20">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* Video placeholder — replace src with real video URL */}
              <div className="relative bg-[#060d1a] aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-[#23c367]/20 border border-[#23c367]/40 flex items-center justify-center mx-auto mb-4">
                    <Play className="w-10 h-10 text-[#23c367] fill-[#23c367] ml-1" />
                  </div>
                  <p className="text-white/60 text-sm">Remplacez cette zone par votre lecteur vidéo</p>
                  <p className="text-white/30 text-xs mt-1">ex: &lt;video src="..."&gt; ou un embed YouTube/Vimeo</p>
                </div>
                {/* Uncomment and replace src to use a real video:
                <video
                  className="w-full h-full"
                  controls
                  autoPlay
                  src={formations.find(f => f.id === playingId)?.videoUrl}
                /> */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FormationsPage;