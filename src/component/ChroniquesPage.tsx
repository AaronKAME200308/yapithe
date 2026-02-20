import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Calendar, ArrowLeft, X } from "lucide-react";
import { chroniquesData } from "./ChroniquesData";
import { useNavigate } from "react-router-dom";

export const ChroniquesPage = () => {
    const navigate = useNavigate();
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    return (
        <div
            className="min-h-screen w-full relative"
            style={{ background: "linear-gradient(135deg, #e8faf3 0%, #ffffff 50%, #eef6ff 100%)" }}
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
                            mb-2
                            px-4 py-2
                            rounded-xl
                            bg-gradient-to-r from-[#23c367] to-[#1fa85a]
                            text-white
                            text-sm font-semibold
                            flex items-center gap-2
                            shadow-lg
                            transition-all duration-300 ease-out
                            hover:shadow-xl
                            hover:-translate-y-1
                            hover:scale-[1.03]
                            active:scale-95
                            active:translate-y-0
                            focus:outline-none
                            focus:ring-2
                            focus:ring-[#23c367]/50
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
                        style={{ background: "linear-gradient(to right, rgba(35,195,103,0.12), rgba(10,77,124,0.12))" }}
                    >
                        <span
                            className="text-sm font-michroma font-semibold uppercase tracking-widest"
                            style={{ background: "linear-gradient(to right, #23c367, #0a4d7c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
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
                        style={{ background: "linear-gradient(to right, #23c367, #0a4d7c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                    >
                        Toutes les chroniques
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        className="text-sm md:text-base max-w-xl"
                        style={{ color: "#7090a6" }}
                    >
                        Explorez l'ensemble de nos chroniques vidéo et plongez dans des analyses captivantes, inspirantes et enrichissantes.
                    </motion.p>
                </motion.div>

                {/* ── GRID ── */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {chroniquesData.map((chronique, index) => (
                        <motion.div
                            key={chronique.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                        >
                            {/* Vignette vidéo */}
                            <div
                                onClick={() => setSelectedVideo(chronique.videoUrl)}
                                className="relative w-full aspect-video cursor-pointer overflow-hidden bg-gray-100"
                            >
                                <iframe
                                    src={chronique.videoUrl}
                                    className="w-full h-full pointer-events-none transition-transform duration-700 group-hover:scale-105"
                                    allowFullScreen
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 transition-colors duration-300" style={{ background: "rgba(0,0,0,0.35)" }}
                                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.18)")}
                                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.35)")}
                                />

                                {/* Bouton play */}
                                {/* <div className="absolute inset-0 flex items-center justify-center">
                                    <div
                                        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110"
                                        style={{ background: "rgba(255,255,255,0.92)" }}
                                    >
                                        <Play className="w-6 h-6 ml-0.5" fill="#23c367" style={{ color: "#23c367" }} />
                                    </div>
                                </div> */}

                               
                            </div>

                            {/* Contenu */}
                            <div className="p-6 flex flex-col gap-3">
                                {/* Date */}
                                <div className="flex items-center gap-1.5 text-xs" style={{ color: "#7090a6" }}>
                                    <Calendar className="w-3.5 h-3.5" />
                                    {chronique.date}
                                </div>

                                {/* Titre */}
                                <h2
                                    className="text-lg md:text-xl font-bold leading-snug transition-colors duration-300"
                                    style={{ color: "#0a4d7c" }}
                                    onMouseEnter={e => (e.currentTarget.style.color = "#23c367")}
                                    onMouseLeave={e => (e.currentTarget.style.color = "#0a4d7c")}
                                >
                                    {chronique.title}
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
                                    {chronique.description}
                                </p>

                                {/* Bouton regarder */}
                                <button
                                    onClick={() => setSelectedVideo(chronique.videoUrl)}
                                    className="
                                        mt-2
                                        px-5 py-2
                                        rounded-full
                                        bg-gradient-to-r from-[#23c367] to-[#1fa85a]
                                        text-white
                                        text-sm font-semibold
                                        self-start
                                        shadow-sm
                                        transition-all duration-300 ease-out
                                        hover:shadow-md
                                        hover:-translate-y-0.5
                                        hover:scale-[1.02]
                                        active:scale-95
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-[#23c367]/40
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
                    <div className="h-px flex-1" style={{ background: "linear-gradient(to right, rgba(35,195,103,0.3), transparent)" }} />
                    <span className="text-xs font-medium" style={{ color: "#b0c4d0" }}>Fin des chroniques</span>
                    <div className="h-px flex-1" style={{ background: "linear-gradient(to left, rgba(10,77,124,0.2), transparent)" }} />
                </div>
            </div>

            {/* ── MODAL VIDÉO ── */}
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
                            bg-black/75
                            backdrop-blur-md
                        "
                    >
                        <motion.div
                            initial={{ scale: 0.94, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.94, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            className="
                                relative
                                w-full
                                max-w-3xl
                                aspect-video
                                bg-black
                                rounded-xl
                                overflow-hidden
                                shadow-2xl
                            "
                        >
                            {/* Bouton fermer */}
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="
                                    absolute top-3 right-3 z-10
                                    w-8 h-8
                                    flex items-center justify-center
                                    rounded-full
                                    bg-white/20
                                    backdrop-blur-sm
                                    text-white
                                    transition-all duration-300
                                    hover:bg-white/40
                                    hover:scale-110
                                    active:scale-95
                                "
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <iframe
                                src={selectedVideo}
                                className="w-full h-full"
                                title="Chronique vidéo"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </motion.div>

                        {/* Barre accent bas modal */}
                        <div
                            className="
                                absolute bottom-6 left-1/2 -translate-x-1/2
                                w-32 h-1
                                rounded-full
                                bg-gradient-to-r from-[#23c367] to-[#0a4d7c]
                            "
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};