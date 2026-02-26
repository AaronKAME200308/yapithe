
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  X,
  Download,
  ExternalLink,
  FileText,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Loader2,
} from "lucide-react";

interface PdfModalProps {
  pdf: string;
  title: string;
  onClose: () => void;
}

export const PdfModal = ({ pdf, title, onClose }: PdfModalProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Ref sur le conteneur scrollable pour mesurer la largeur disponible
  const viewerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  // Détecte si on est sur mobile (largeur < 768px)
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    const measure = () => {
      if (viewerRef.current) {
        // padding horizontal 2×16px = 32px
        setContainerWidth(viewerRef.current.clientWidth - 32);
      }
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (viewerRef.current) ro.observe(viewerRef.current);
    return () => ro.disconnect();
  }, []);

  const absoluteUrl = pdf.startsWith("/")
    ? `${window.location.origin}${pdf}`
    : pdf;

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setLoading(false);
      setError(false);
    },
    []
  );

  const onDocumentLoadError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  const prevPage = () => setPageNumber((p) => Math.max(1, p - 1));
  const nextPage = () => setPageNumber((p) => Math.min(numPages, p + 1));
  const zoomIn = () =>
    setScale((s) => Math.min(2.5, parseFloat((s + 0.2).toFixed(1))));
  const zoomOut = () =>
    setScale((s) => Math.max(0.5, parseFloat((s - 0.2).toFixed(1))));

  // Sur mobile, on pilote par width (fit-to-container).
  // Sur desktop, on pilote par scale (zoom manuel).
  const pageProps = isMobile
    ? { width: containerWidth ?? undefined }
    : { scale };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/85 backdrop-blur-lg"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(35,195,103,0.2)] border border-white/10"
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a4d7c] border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#23c367]/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#23c367]" />
            </div>
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest font-medium">
                Document
              </p>
              <h3 className="text-white font-bold text-base leading-tight">
                {title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={absoluteUrl}
              download
              className="flex items-center gap-2 px-4 py-2 bg-[#23c367]/20 hover:bg-[#23c367]/30 text-[#23c367] rounded-xl text-sm font-semibold transition-all duration-200 border border-[#23c367]/30"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Télécharger</span>
            </a>
            <a
              href={absoluteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-semibold transition-all duration-200 border border-white/20"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Ouvrir</span>
            </a>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-red-500/30 text-white/70 hover:text-white rounded-xl transition-all duration-200 border border-white/20 hover:border-red-500/40"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Toolbar pagination + zoom (zoom masqué sur mobile) ── */}
        {!error && !loading && numPages > 0 && (
          <div className="flex items-center justify-between px-6 py-2.5 bg-[#0a4d7c]/60 border-b border-white/10 flex-shrink-0">
            {/* Pagination */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevPage}
                disabled={pageNumber <= 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 border border-white/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-white/70 text-xs font-medium min-w-[80px] text-center">
                Page{" "}
                <span className="text-white font-bold">{pageNumber}</span>
                {" "}/ {numPages}
              </span>
              <button
                onClick={nextPage}
                disabled={pageNumber >= numPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 border border-white/10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Zoom — masqué sur mobile (le PDF s'adapte automatiquement) */}
            {!isMobile && (
              <div className="flex items-center gap-2">
                <button
                  onClick={zoomOut}
                  disabled={scale <= 0.5}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 border border-white/10"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-white/70 text-xs font-medium min-w-[44px] text-center">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={zoomIn}
                  disabled={scale >= 2.5}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 border border-white/10"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Viewer ── */}
        <div
          ref={viewerRef}
          className="flex-1 bg-[#1a1a2e] overflow-auto relative flex justify-center"
        >
          {/* Loading */}
          <AnimatePresence>
            {loading && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Loader2 className="w-10 h-10 text-[#23c367] animate-spin" />
                <p className="text-white/50 text-sm">Chargement du document…</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error fallback */}
          {error && (
            <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
              <div className="w-24 h-24 rounded-3xl bg-[#23c367]/10 border border-[#23c367]/30 flex items-center justify-center">
                <FileText className="w-12 h-12 text-[#23c367]" />
              </div>
              <div className="text-center max-w-md">
                <h4 className="text-white text-xl font-bold mb-3">
                  Téléchargez ou ouvrez-le dans un onglet.
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  <code className="text-[#23c367]"></code>Aperçu non disponible
                </p>
              </div>
              <div className="flex gap-3 flex-wrap justify-center">
                <a
                  href={absoluteUrl}
                  download
                  className="flex items-center gap-2 px-6 py-3 bg-[#23c367] hover:bg-[#1fa85a] text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-[#23c367]/30"
                >
                  <Download className="w-5 h-5" />
                  Télécharger le PDF
                </a>
                <a
                  href={absoluteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-200 border border-white/20"
                >
                  <ExternalLink className="w-5 h-5" />
                  Ouvrir dans un onglet
                </a>
              </div>
            </div>
          )}

          {/* PDF Document */}
          {!error && (
            <div className="py-6 px-4 w-full flex justify-center">
              <Document
                file={absoluteUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={null}
                className="flex flex-col items-center gap-4"
              >
                <Page
                  pageNumber={pageNumber}
                  {...pageProps}
                  loading={null}
                  className="shadow-2xl rounded-lg overflow-hidden"
                  renderAnnotationLayer
                  renderTextLayer
                />
              </Document>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-3 bg-[#0a4d7c]/80 border-t border-white/10 flex items-center justify-between flex-shrink-0">
          <p className="text-white/40 text-xs">
            Cliquez en dehors du document pour fermer
          </p>
          <p className="text-white/40 text-xs">{pdf.split("/").pop()}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};