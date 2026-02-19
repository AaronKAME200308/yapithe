import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock, Play, ArrowLeft, X } from "lucide-react";
import { chroniquesData } from "./ChroniquesData";
import { useNavigate } from "react-router-dom";

export const ChroniquesPage = () => {
    const navigate = useNavigate();
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    return (
        <div
            className="min-h-screen w-full relative"
            style={{ fontFamily: "'Sora', sans-serif", background: "linear-gradient(135deg, #e8faf3 0%, #ffffff 50%, #eef6ff 100%)" }}
        >
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800;900&display=swap');`}</style>

            {/* Blobs décoratifs */}
            <div style={{ position: "fixed", top: "-8rem", right: "-8rem", width: "28rem", height: "28rem", background: "rgba(35,195,103,0.07)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />
            <div style={{ position: "fixed", bottom: "-6rem", left: "-6rem", width: "24rem", height: "24rem", background: "rgba(10,77,124,0.05)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />

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
                        className="mb-8 flex items-center gap-2 text-sm font-semibold group transition-colors"
                        style={{ color: "#0a4d7c" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#23c367")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#0a4d7c")}
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Retour
                    </button>

                    {/* Badge */}
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

                    {/* Séparateur */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                        className="mt-6 origin-left"
                        style={{ height: "1px", background: "linear-gradient(to right, #23c367, rgba(10,77,124,0.2), transparent)" }}
                    />
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
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div
                                        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110"
                                        style={{ background: "rgba(255,255,255,0.92)" }}
                                    >
                                        <Play className="w-6 h-6 ml-0.5" fill="#23c367" style={{ color: "#23c367" }} />
                                    </div>
                                </div>

                                {/* Badge durée */}
                                {chronique.readTime && (
                                    <div
                                        className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                                        style={{ background: "rgba(10,77,124,0.75)", color: "#fff", backdropFilter: "blur(4px)" }}
                                    >
                                        <Clock className="w-3 h-3" />
                                        {chronique.readTime}
                                    </div>
                                )}
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
                                    className="mt-2 self-start flex items-center gap-2 text-sm font-semibold transition-colors"
                                    style={{ color: "#23c367" }}
                                    onMouseEnter={e => (e.currentTarget.style.color = "#1a9950")}
                                    onMouseLeave={e => (e.currentTarget.style.color = "#23c367")}
                                >
                                    <span>Regarder</span>
                                    <span
                                        className="w-5 h-5 rounded-full border flex items-center justify-center text-xs"
                                        style={{ borderColor: "#23c367" }}
                                    >
                                        →
                                    </span>
                                </button>

                                {/* Accent line */}
                                <div
                                    className="h-0.5 w-10 rounded-full mt-1 transition-all duration-500 group-hover:w-full"
                                    style={{ background: "linear-gradient(to right, #23c367, #1fa85a)" }}
                                />
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
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
                        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
                    >
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            onClick={e => e.stopPropagation()}
                            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
                        >
                            {/* Bouton fermer */}
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full text-white transition-colors"
                                style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)" }}
                                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.3)")}
                                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
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
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-1 rounded-full"
                            style={{ background: "linear-gradient(to right, #23c367, #0a4d7c)" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};