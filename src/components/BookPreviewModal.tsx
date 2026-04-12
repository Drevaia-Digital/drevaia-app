import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: {
    id: string | number;
    title: string;
    description: string;
    link: string;
    collection: string;
    cover?: string;
  } | null;
}

const features = [
  "Acceso inmediato",
  "Lectura en cualquier dispositivo",
  "Contenido transformador",
  "Actualizaciones incluidas",
];

export function BookPreviewModal({ isOpen, onClose, book }: BookPreviewModalProps) {
  if (!isOpen || !book) return null;

  return (
    <AnimatePresence>
      <>
        {/* OVERLAY */}
        <motion.div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* MODAL */}
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="w-full max-w-2xl max-h-[95vh] md:max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >

            {/* HEADER */}
            <div className="relative h-48 bg-gradient-to-br from-purple-600 via-indigo-600 to-amber-500">

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose();
                }}
                className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
                <BookOpen className="w-12 h-12 mb-2 opacity-90" />
                <span className="text-sm opacity-80">{book.collection}</span>
              </div>
            </div>

            {/* CONTENIDO */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 md:pb-24">

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {book.title}
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6">
                {book.description}
              </p>

              {/* COPY */}
              <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Este ebook no es solo información.
                  Es una nueva forma de ver tu vida.
                  Si algo dentro de ti te trajo hasta aquí… confía en eso.
                </p>
              </div>

              {/* PRUEBA SOCIAL */}
              <div className="mb-6 p-3 bg-green-50 border border-green-100 rounded-xl text-sm text-green-700">
                Este contenido ya está ayudando a muchas personas a transformar su forma de pensar.
              </div>

              {/* FEATURES */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* CTA FIJO */}
            <div className="p-4 md:pb-6 border-t bg-white">

              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6 rounded-xl shadow-xl hover:scale-[1.02] transition-all">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Acceder ahora
                </Button>
              </a>

              <p className="text-xs text-gray-500 text-center mt-2">
                Acceso inmediato · Lectura sin límites
              </p>

              <p className="text-xs text-purple-500 text-center animate-pulse mt-1">
                Varias personas están viendo este ebook ahora mismo
              </p>

              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-full mt-3 rounded-xl py-5"
              >
                Seguir explorando
              </Button>

            </div>

          </motion.div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}