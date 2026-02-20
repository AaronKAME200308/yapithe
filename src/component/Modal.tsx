'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import { useState } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    date: string;
    media: string ;
    isVideo?: boolean;
    description: string;
    category?: string;
};

const MediaModal = ({
    isOpen,
    onClose,
    title,
    date,
    media,
    isVideo = false,
    description,
    category,
}: ModalProps) => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 40, scale: 0.97 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                            style={{ maxHeight: "90vh" }}
                        >
                            

                            {/* Media */}
                            <div
                                className="relative shrink-0 overflow-hidden bg-black flex items-center justify-center cursor-zoom-in"
                                style={{ height: 230 }}
                                onClick={() => setIsFullscreen(true)}
                            >
                                {isVideo ? (
                                    <video
                                        src={media}
                                        className="w-full h-full object-cover"
                                        controls
                                    />
                                ) : (
                                    <img
                                        src={media || "/placeholder.svg"}
                                        alt={title}
                                        className="w-full h-full object-cover"
                                    />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                            </div>
                            {/* Info */}
<div className="flex items-center gap-4 px-6 md:px-8 py-4">
    {category && (
        <span
            className="text-[#23c367] flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border border-[#23c367]"
          
        >
            <h2 className="text-[#23c367] text-sm font-bold">{title}</h2>
            <span
                className="bg-[#23c367] w-1.5 h-1.5 rounded-full"
            />
            {category}
        </span>
    )}

    <span
        className="text-gray-500 flex items-center gap-1.5 text-xs"
    >
        <Calendar className="text-gray-500 w-3.5 h-3.5" />
        {date}
    </span>
</div>

                        {/* Description */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8">
                            <p className="text-sm md:text-base leading-relaxed text-gray-700 whitespace-pre-line">
                                {description}
                            </p>
                        </div>

                        {/* Footer */}
                        <div
                            className="h-1 shrink-0"
                            style={{ background: "linear-gradient(to right, #23c367, #0a4d7c)" }}
                        />
                    </motion.div>
                </motion.div>

            {/* Fullscreen */}
            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black flex items-center justify-center p-6"
                        onClick={() => setIsFullscreen(false)}
                    >
                        {isVideo ? (
                            <video
                                src={media}
                                className="max-w-full max-h-full"
                                controls
                                autoPlay
                            />
                        ) : (
                            <img
                                src={media}
                                className="max-w-full max-h-full object-contain"
                                alt={title}
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
    </AnimatePresence >
  );
};

export default MediaModal;