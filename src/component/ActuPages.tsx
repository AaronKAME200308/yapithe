import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { articles } from "./ActuData";

/* ─── TYPES ─────────────────────────────────────────────────── */


export interface Article {
  id: number;
  category: string;
  date: string;
  number?: string;
  title: string;
  excerpt: string;
  full: string;
  images: string[];
}

interface ImageGridProps {
  images: string[];
  onOpenModal: (index: number) => void;
  startIndex?: number;
}

interface ModalProps {
  article: Article;
  initialPhoto?: number;
  onClose: () => void;
}

interface PostRowProps {
  article: Article;
  index: number;
  onOpen: (article: Article, photoIndex?: number) => void;
}

interface ModalState {
  article: Article;
  photoIndex: number;
}



/* ─── IMAGE GRID ────────────────────────────────────────────── */

const ImageGrid = ({
  images,
  onOpenModal,
  startIndex = 0,
}: ImageGridProps) => {
  const show = images.slice(0, 3);
  const remaining = images.length - 3;

  if (images.length === 1) {
    return (
      <div
        className="relative w-full overflow-hidden cursor-pointer"
        style={{ height: 220 }}
        onClick={() => onOpenModal(startIndex)}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url(${images[0]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
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
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url(${img})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-0.5" style={{ height: 220 }}>
      <div
        className="relative overflow-hidden cursor-pointer"
        style={{ flex: "0 0 60%" }}
        onClick={() => onOpenModal(0)}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url(${show[0]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="flex flex-col gap-0.5" style={{ flex: "0 0 40%" }}>
        <div
          className="relative overflow-hidden cursor-pointer flex-1"
          onClick={() => onOpenModal(1)}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: `url(${show[1]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <div
          className="relative overflow-hidden cursor-pointer flex-1"
          onClick={() => onOpenModal(2)}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: `url(${show[2]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {remaining > 0 && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: "rgba(10,77,124,0.75)",
                backdropFilter: "blur(2px)",
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

const Modal = ({ article, initialPhoto, onClose }: ModalProps) => {

  const [photoIndex, setPhotoIndex] = useState<number>(
    initialPhoto ?? 0
  );
  const [dir, setDir] = useState<number>(0);

  const total = article.images.length;

  const go = (newDir: number) => {
    setDir(newDir);
    setPhotoIndex((prev) => (prev + newDir + total) % total);
  };

  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({
      x: d < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
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
        transition={{ duration: 0.35 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: "90vh" }}
      >
        {/* Slider */}
        <div
          className="relative flex-shrink-0 overflow-hidden bg-black"
          style={{ height: 280 }}
        >
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={photoIndex}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${article.images[photoIndex]})`,
              }}
            />
          </AnimatePresence>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-white"
            style={{
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(6px)",
            }}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Arrows */}
          {total > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="space-y-4 whitespace-pre-line">
            {article.full}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── POST ROW ───────────────────────────────────────────────── */

const PostRow = ({ article , index, onOpen }: PostRowProps) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div
        className={`flex ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        <div className="w-full md:w-72">
          <ImageGrid
            images={article.images}
            onOpenModal={(i) => onOpen(article, i)}
          />
        </div>

        <div className="p-6 flex-1">
          <h2 className="font-bold text-xl">{article.title}</h2>
          <p className="text-sm mt-2">{article.excerpt}</p>

          <button
            onClick={() => onOpen(article, 0)}
            className="mt-4 text-green-600 font-semibold"
          >
            Lire la suite →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── PAGE ───────────────────────────────────────────────────── */

const ActualitesPage = () => {
  const navigate = useNavigate();

  const [modal, setModal] = useState<ModalState | null>(null);

  const openModal = (article: Article, photoIndex = 0) =>
    setModal({ article, photoIndex });

  const closeModal = () => setModal(null);

  return (
    <div className="min-h-screen">
      <header className="p-6">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft /> Retour
        </button>
      </header>

      <main className="max-w-3xl mx-auto flex flex-col gap-8">
        {articles.map((a, i) => (
          <PostRow
            key={a.id}
            article={a}
            index={i}
            onOpen={openModal}
          />
        ))}
      </main>

      <AnimatePresence>
        {modal && (
          <Modal
            article={modal.article}
            initialPhoto={modal.photoIndex}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActualitesPage;
