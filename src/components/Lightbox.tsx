import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxImage {
  src: string;
  caption: string;
  alt?: string;
}

interface Props {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}

export function Lightbox({ images, index, onClose, onChange }: Props) {
  const isOpen = index !== null;

  const next = useCallback(() => {
    if (index === null) return;
    onChange((index + 1) % images.length);
  }, [index, images.length, onChange]);

  const prev = useCallback(() => {
    if (index === null) return;
    onChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onChange]);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, next, prev, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={images[index].caption}
        >
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Image */}
          <motion.figure
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full max-h-full flex flex-col items-center"
          >
            <img
              src={images[index].src}
              alt={images[index].alt ?? images[index].caption}
              className="max-h-[80vh] w-auto rounded-2xl shadow-2xl object-contain"
            />
            <figcaption className="mt-4 text-center text-white/90 text-sm md:text-base px-4">
              {images[index].caption}
              <span className="block text-white/50 text-xs mt-1">
                {index + 1} / {images.length}
              </span>
            </figcaption>
          </motion.figure>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
