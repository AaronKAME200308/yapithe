import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, Clock, X } from "lucide-react";
import { chroniquesData } from "./ChroniquesData";

export const ChroniquesPage = () => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    return (
        <>
            <section className="min-h-screen py-20 bg-linear-to-br from-[#0a4d7c] via-[#0c5d94] to-[#0a4d7c]">
                <div className="max-w-5xl mx-auto px-6">
                    {/* HEADER */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Toutes les chroniques
                        </h1>
                        <p className="text-white/80">
                            Retrouvez l’ensemble de nos chroniques vidéo.
                        </p>
                    </div>

                    {/* LISTE VERTICALE */}
                    <div className="flex flex-col gap-10">
                        {chroniquesData.map((chronique) => (
                            <div
                                key={chronique.id}
                                className="bg-white rounded-3xl overflow-hidden shadow-xl"
                            >
                                {/* VIDEO */}
                                <div className="w-full aspect-video">
                                    <iframe
                                        src={chronique.videoUrl}
                                        className="w-full h-full"
                                        allowFullScreen
                                    />
                                </div>

                                {/* CONTENT */}
                                <div className="p-8">
                                    <h2 className="text-2xl font-bold text-[#0a4d7c] mb-4">
                                        {chronique.title}
                                    </h2>

                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {chronique.description}
                                    </p>

                                    <div className="flex items-center gap-6 text-sm text-gray-500">
                                        <span className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {chronique.date}
                                        </span>

                                        <span className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            {chronique.readTime}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MODAL */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                        <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden">
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-4 right-4 bg-white p-2 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <iframe
                                src={selectedVideo}
                                className="w-full h-full"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
