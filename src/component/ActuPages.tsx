import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Calendar, ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { articles as rawArticles } from "./ActuData";
const articles = rawArticles as Article[];

/* ─── TYPES ──────────────────────────────────────────────────── */
type Category = "Expertise" | "Partenariats" | "Innovation" | "Publication" | "Événement";

/* ─── TYPES ─────────────────────────────────────────────────── */

interface MediaItem {
    type: "image" | "video";
    src: string;
};

interface Article {
    id: number;
    category: "Expertise" | "Partenariats" | "Innovation";
    date: string;
    number?: string;
    title: string;
    excerpt: string;
    full: string;
    media: MediaItem[];
};
interface CategoryStyleEntry {
    dot: string;
    bgLight: string;
    text: string;
    border: string;
}

/* ─── STYLES ────────────────────────────────────────────────── */
const categoryStyle: Record<Category, CategoryStyleEntry> = {
    Expertise: { dot: "#23c367", bgLight: "rgba(35,195,103,0.1)", text: "#1a9950", border: "rgba(35,195,103,0.3)" },
    Partenariats: { dot: "#0a4d7c", bgLight: "rgba(10,77,124,0.1)", text: "#0a4d7c", border: "rgba(10,77,124,0.3)" },
    Innovation: { dot: "#23c367", bgLight: "rgba(35,195,103,0.1)", text: "#1a9950", border: "rgba(35,195,103,0.3)" },
    Publication: { dot: "#0c5d94", bgLight: "rgba(12,93,148,0.1)", text: "#0c5d94", border: "rgba(12,93,148,0.3)" },
    Événement: { dot: "#1fa85a", bgLight: "rgba(31,168,90,0.1)", text: "#1a9950", border: "rgba(31,168,90,0.3)" },
};

//* ─── IMAGE GRID (post preview) ─────────────────────────────── */
interface ImageGridProps {
    images: string[];
    onOpenModal: (index: number) => void;
    startIndex?: number;
}

const ImageGrid = ({ images, onOpenModal, startIndex = 0 }: ImageGridProps) => {
    const isVideo = (src: string) => /\.(mp4|webm|ogg)$/i.test(src);

    const renderMedia = (src: string, _index: number) => {
        if (isVideo(src)) {
            return (
                <>
                    <video
                        src={src}
                        className="absolute inset-0 w-full h-full object-cover"
                        muted
                        preload="metadata"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {/* Icône play */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
                            <span className="text-white text-lg">▶</span>
                        </div>
                    </div>
                </>
            );
        }

        return (
            <>
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: `url(${src})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </>
        );
    };

    const show = images.slice(0, 3);
    const remaining = images.length - 3;

    if (images.length === 1) {
        return (
            <div
                className="relative w-full overflow-hidden cursor-pointer"
                style={{ height: 220 }}
                onClick={() => onOpenModal(startIndex)}
            >
                {renderMedia(images[0], 0)}
            </div>
        );
    }

    if (images.length === 2) {
        return (
            <div className="flex gap-0.5" style={{ height: 220 }}>
                {images.map((img, i) => (
                    <div
                        key={i}
                        className="flex-1 relative overflow-hidden cursor-pointer"
                        onClick={() => onOpenModal(i)}
                    >
                        {renderMedia(img, i)}
                    </div>
                ))}
            </div>
        );
    }

    /* 3+ images */
    return (
        <div className="flex gap-0.5" style={{ height: 220 }}>
            {/* Large left */}
            <div
                className="relative overflow-hidden cursor-pointer"
                style={{ flex: "0 0 60%" }}
                onClick={() => onOpenModal(0)}
            >
                {renderMedia(show[0], 0)}
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-0.5" style={{ flex: "0 0 40%" }}>
                {/* Second */}
                <div
                    className="relative overflow-hidden cursor-pointer flex-1"
                    onClick={() => onOpenModal(1)}
                >
                    {renderMedia(show[1], 1)}
                </div>

                {/* Third */}
                <div
                    className="relative overflow-hidden cursor-pointer flex-1"
                    onClick={() => onOpenModal(2)}
                >
                    {renderMedia(show[2], 2)}

                    {remaining > 0 && (
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                                background: "rgba(10,77,124,0.75)",
                                backdropFilter: "blur(2px)"
                            }}
                        >
                            <span className="text-white text-2xl font-black">
                                +{remaining}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ─── MODAL ─────────────────────────────────────────────────── */
interface ModalProps {
    article: Article;
    initialPhoto?: number;
    onClose: () => void;
}

const Modal = ({ article, initialPhoto, onClose }: ModalProps) => {
    const c = categoryStyle[article.category] ?? categoryStyle["Expertise"];

    const [photoIndex, setPhotoIndex] = useState<number>(initialPhoto ?? 0);
    const [dir, setDir] = useState<number>(0);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

    const mediaArray = article.media ?? article.media;
    const total = mediaArray.length;

    const go = (newDir: number) => {
        setDir(newDir);
        setPhotoIndex((prev) => (prev + newDir + total) % total);
    };

    const slideVariants = {
        enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d < 0 ? "100%" : "-100%", opacity: 0 }),
    };

    const currentItem =
        article.media
            ? article.media[photoIndex]
            : { type: "image", src: article.media[photoIndex] };

    return (
        <>
            {/* ───────────── MODAL PRINCIPAL ───────────── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
                onClick={onClose}
            >
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40, scale: 0.97 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    style={{ maxHeight: "90vh" }}
                >

                    {/* ── MEDIA SLIDER ── */}
                    <div
                        className="relative shrink-0 overflow-hidden bg-black flex items-center justify-center"
                        style={{ height: 230 }}
                    >
                        <AnimatePresence initial={false} custom={dir}>
                            <motion.div
                                key={photoIndex}
                                custom={dir}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                                className="absolute inset-0 flex items-center justify-center cursor-zoom-in"
                                onClick={() => setIsFullscreen(true)}
                            >
                                {currentItem.type === "video" ? (
                                    <video
                                        src={currentItem.src}
                                        className="w-full h-full object-cover"
                                        controls
                                    />
                                ) : (
                                    <img
                                        src={currentItem.src}
                                        className="w-full h-full object-cover"
                                        alt=""
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-white transition-colors z-10"
                            style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(6px)" }}
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Nav arrows */}
                        {total > 1 && (
                            <>
                                <button
                                    onClick={() => go(-1)}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full text-white z-10 transition-colors"
                                    style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => go(1)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full text-white z-10 transition-colors"
                                    style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}

                        {/* Counter */}
                        {total > 1 && (
                            <div
                                className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-white text-xs font-semibold z-10"
                                style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
                            >
                                {photoIndex + 1} / {total}
                            </div>
                        )}
                    </div>

                    {/* Thumbnail strip */}
                    {total > 1 && (
                        <div
                            className="flex gap-2 px-4 py-3 border-b border-gray-100 overflow-x-auto shrink-0"
                            style={{ scrollbarWidth: "none" }}
                        >
                            {mediaArray.map((item: any, i: number) => {
                                const src = article.media ? item.src : item;
                                const isVideo = /\.(mp4|webm|ogg)$/i.test(src);

                                return (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setDir(i > photoIndex ? 1 : -1);
                                            setPhotoIndex(i);
                                        }}
                                        className="shrink-0 rounded-lg overflow-hidden transition-all duration-200 relative"
                                        style={{
                                            width: 48,
                                            height: 36,
                                            outline: i === photoIndex ? "2px solid #23c367" : "2px solid transparent",
                                            outlineOffset: 1,
                                            opacity: i === photoIndex ? 1 : 0.55,
                                        }}
                                    >
                                        {isVideo ? (
                                            <>
                                                <div
                                                    className="w-full h-full bg-cover bg-center"
                                                    style={{
                                                        backgroundImage: `url(${src}#t=5)`,
                                                    }}
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                    <div className="w-4 h-4 bg-black/50 rounded-full flex items-center justify-center">
                                                        <span className="text-white text-xs font-bold">▶</span>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div
                                                className="w-full h-full bg-cover bg-center"
                                                style={{ backgroundImage: `url(${src})` }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* Text content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-5">
                            <span
                                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
                                style={{
                                    backgroundColor: c.bgLight,
                                    color: c.text,
                                    borderColor: c.border,
                                }}
                            >
                                <span
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: c.dot }}
                                />
                                {article.category}
                            </span>
                            <span
                                className="flex items-center gap-1.5 text-xs"
                                style={{ color: "#7090a6" }}
                            >
                                <Calendar className="w-3.5 h-3.5" />
                                {article.date}
                            </span>
                        </div>

                        <div className="space-y-4">
                            {article.full.split("\n\n").map((para, i) => (
                                <p
                                    key={i}
                                    className="text-sm md:text-base leading-relaxed"
                                    style={{ color: "#3d5a6e" }}
                                >
                                    {para}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div
                        className="h-1 shrink-0"
                        style={{ background: "linear-gradient(to right, #23c367, #0a4d7c)" }}
                    />
                </motion.div>
            </motion.div>

            {/* ───────────── FULLSCREEN VIEW ───────────── */}
            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black flex items-center justify-center p-6"
                        onClick={() => setIsFullscreen(false)}
                    >
                        {currentItem.type === "video" ? (
                            <video
                                src={currentItem.src}
                                className="max-w-full max-h-full"
                                controls
                                autoPlay
                            />
                        ) : (
                            <img
                                src={currentItem.src}
                                className="max-w-full max-h-full object-contain"
                                alt=""
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

/* ─── POST ROW ───────────────────────────────────────────────── */
interface PostRowProps {
    article: Article;
    index: number;
    onOpen: (article: Article, photoIndex: number) => void;
}

const PostRow = ({ article, index, onOpen }: PostRowProps) => {
    const c = categoryStyle[article.category] ?? categoryStyle["Expertise"];
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
        >
            {/* Timeline dot */}
            <div className="absolute top-8 w-3 h-3 rounded-full border-2 bg-white z-10"
                style={{ left: "1.25rem", borderColor: "#23c367", boxShadow: "0 0 0 3px rgba(35,195,103,0.15)" }}
            />

            <div className="ml-12 md:ml-16 group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>

                    {/* Image grid */}
                    <div className="w-full md:w-72 lg:w-80 shrink-0 overflow-hidden">
                        <ImageGrid
                            images={article.media.map((m) => m.src)}
                            onOpenModal={(photoIdx) => onOpen(article, photoIdx)}
                        />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col justify-between p-6 md:p-8 flex-1">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
                                    style={{ backgroundColor: c.bgLight, color: c.text, borderColor: c.border }}>
                                    {article.category}
                                </span>
                                <span className="flex items-center gap-1.5 text-xs" style={{ color: "#7090a6" }}>
                                    <Calendar className="w-3 h-3" />
                                    {article.date}
                                </span>
                                {article.media.length > 1 && (
                                    <span className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
                                        style={{ background: "rgba(10,77,124,0.07)", color: "#0a4d7c" }}>
                                        {article.media.length} photos
                                    </span>
                                )}
                            </div>

                            <h2
                                className="text-lg md:text-xl font-bold leading-snug mb-3 transition-colors duration-300"
                                style={{ color: "#0a4d7c" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#23c367")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "#0a4d7c")}
                            >
                                {article.title}
                            </h2>

                            <p className="text-sm leading-relaxed" style={{
                                color: "#7090a6",
                                display: "-webkit-box", WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical", overflow: "hidden"
                            }}>
                                {article.excerpt}
                            </p>
                        </div>

                        <button
                            onClick={() => onOpen(article, 0)}
                            className="
                            mt-5
                            px-5 py-3
                            rounded-full
                            bg-gradient-to-r from-[#23c367] to-[#1fa85a]
                            text-white
                            text-sm font-semibold
                            shadow-md
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
                            <span className="transition-all duration-300 group-hover:tracking-wide">
                                Lire la suite
                            </span>

                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/* ─── PAGE ───────────────────────────────────────────────────── */
interface ModalState {
    article: Article;
    photoIndex: number;
}

const ActualitesPage = () => {
    const navigate = useNavigate();
    const [modal, setModal] = useState<ModalState | null>(null);

    const openModal = (article: Article, photoIndex = 0) => setModal({ article, photoIndex });
    const closeModal = () => setModal(null);

    return (
        <div className="min-h-screen relative" style={{ background: "linear-gradient(135deg, #e8faf3 0%, #ffffff 50%, #eef6ff 100%)" }}>


            {/* Header */}
            <header className="relative z-10 max-w-3xl mx-auto px-6 pt-10 pb-8">
                <motion.button
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 group"
                    style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                    }}
                >

                    {/* Bouton retour */}
                    <button
                        onClick={() => navigate(-1)}
                        className="
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
                </motion.button>

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                    style={{ background: "linear-gradient(to right, rgba(35,195,103,0.12), rgba(10,77,124,0.12))" }}
                >
                    <span className="text-sm font-michroma font-semibold uppercase tracking-widest" style={{ background: "linear-gradient(to right, #23c367, #0a4d7c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        Yapithe & Partners
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-4xl md:text-5xl font-black leading-none mb-3"
                    style={{ background: "linear-gradient(to right, #23c367, #0a4d7c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                    Actualités
                </motion.h1>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                    className="text-sm md:text-base max-w-xl" style={{ color: "#7090a6" }}>
                    Retrouvez toutes les dernières actualités de Yapithe & Partners : projets, interventions et publications récentes.
                </motion.p>
            </header>

            {/* Feed */}
            <main className="relative z-10 max-w-3xl mx-auto px-6 pb-24">
                <div className="absolute top-0 bottom-0"
                    style={{ left: "calc(1.5rem + 1.25rem + 1px)", width: "1px", background: "linear-gradient(to bottom, rgba(35,195,103,0.4), rgba(10,77,124,0.15), transparent)" }}
                />
                <div className="flex flex-col gap-8">
                    {articles.map((a, i) => (
                        <PostRow key={a.id} article={a} index={i} onOpen={openModal} />
                    ))}
                </div>

            </main>

            {/* Modal */}
            <AnimatePresence>
                {modal && <Modal article={modal.article} initialPhoto={modal.photoIndex} onClose={closeModal} />}
            </AnimatePresence>
        </div>
    );
};

export default ActualitesPage;