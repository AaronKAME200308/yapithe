'use client';

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // ou utilisez un simple ✕ si vous n'avez pas lucide-react

type MediaModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    date: string;
    description: string;
    media: string;
    isVideo?: boolean;
    category?: string;
};

const MediaModal = ({
    isOpen,
    onClose,
    title,
    date,
    description,
    media,
    isVideo = false,
    category,
}: MediaModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop avec animation de fade */}
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 300,
                                duration: 0.3
                            }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header fixe avec animation */}
                            <motion.div
                                className="relative shrink-0 bg-linear-to-br from-[#0a4d7c] to-[#0c5d94] text-white px-6 md:px-8 py-5"
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                {/* Bouton fermer */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:rotate-90"
                                    aria-label="Fermer"
                                >
                                    <X className="w-6 h-6" />
                                    {/* Si vous n'avez pas lucide-react, utilisez: <span className="text-2xl">✕</span> */}
                                </button>

                                {/* Titre et date */}
                                <div className="pr-12">
                                    {category && (
                                        <motion.span
                                            className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-2"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {category}
                                        </motion.span>
                                    )}
                                    <h2 className="text-xl md:text-2xl font-bold mb-1 leading-tight">
                                        {title}
                                    </h2>
                                    <p className="text-white/80 text-sm">{date}</p>
                                </div>
                            </motion.div>

                            {/* Contenu scrollable */}
                            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                                {/* Media avec animation - hauteur optimisée pour desktop */}
                                <motion.div
                                    className="w-full bg-black flex items-center justify-center"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.15 }}
                                >
                                    {isVideo ? (
                                        <video
                                            src={media}
                                            controls
                                            className="w-full h-auto min-h-[300px] md:min-h-[500px] max-h-[60vh] object-contain"
                                        />
                                    ) : (
                                        <img
                                            src={media || "/placeholder.svg"}
                                            alt={title}
                                            className="w-full h-auto min-h-[300px] md:min-h-[500px] max-h-[60vh] object-contain"
                                        />
                                    )}
                                </motion.div>

                                {/* Description avec animation */}
                                <motion.div
                                    className="p-6 md:p-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 }}
                                >
                                    <div className="prose prose-gray max-w-none">
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line wrap-break-word text-base">
                                            {description}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Footer optionnel avec dégradé subtil */}
                            <motion.div
                                className="shrink-0 px-6 md:px-8 py-4 bg-linear-to-t from-gray-50 to-transparent border-t border-gray-100"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span className="hidden md:inline">Faites défiler pour lire la suite</span>
                                    <button
                                        onClick={onClose}
                                        className="text-[#0a4d7c] hover:text-[#0c5d94] font-medium transition-colors ml-auto md:ml-0"
                                    >
                                        Fermer
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MediaModal;