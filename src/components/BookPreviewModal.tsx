import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, BookOpen, Clock, Star, CheckCircle } from "lucide-react";
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
  recommendedBooks?: any[];
}

const features = [
  "Acceso inmediato",
  "Lectura en cualquier dispositivo",
  "Contenido transformador",
  "Actualizaciones incluidas",
];

export function BookPreviewModal({
  isOpen,
  onClose,
  book,
  recommendedBooks,
}: BookPreviewModalProps) {
  return (
    <AnimatePresence>
      {isOpen && book && (
        <>
          {/* OVERLAY */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* MODAL */}
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-3xl shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >

              {/* HEADER */}
              <div className="relative h-48 bg-gradient-to-br from-purple-600 via-indigo-600 to-amber-500">

                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
                  <BookOpen className="w-12 h-12 mb-2 opacity-90" />
                  <span className="text-sm opacity-80">
                    {book.collection}
                  </span>
                </div>

              </div>

              {/* CONTENIDO */}
              <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-12rem)]">

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {book.title}
                </h2>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {book.description}
                </p>

                {/* 🔥 COPY EMOCIONAL */}
                <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Este ebook no es solo información.
                    Es una nueva forma de ver tu vida.
                    Si algo dentro de ti te trajo hasta aquí… confía en eso.
                  </p>
                </div>

                {/* 🔥 PRUEBA SOCIAL */}
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

                {/* STATS */}
                <div className="flex items-center gap-6 mb-6 p-4 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-500" />
                    <span className="text-sm text-gray-600">
                      Lectura rápida
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span className="text-sm text-gray-600">
                      Muy bien valorado
                    </span>
                  </div>
                </div>

                {/* 🔥 RECOMENDADOS CORREGIDOS */}
                {recommendedBooks && recommendedBooks.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">
                      También te puede interesar
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {recommendedBooks.map((b) => (
                        <div
                          key={b.id}
                          className="cursor-pointer hover:scale-105 transition"
                          onClick={() => window.location.href = `/ebook/${b.id}`}
                        >
                          <img
                            src={b.coverImage}
                            alt={b.title}
                            className="rounded-lg object-cover w-full h-[160px]"
                          />
                          <p className="text-xs mt-2 text-gray-600 line-clamp-2">
                            {b.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 🔥 CTA + URGENCIA */}
                <div className="mt-10 space-y-3">

                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.02] text-white rounded-xl py-6 shadow-xl transition-all">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Acceder ahora
                    </Button>
                  </a>

                  <p className="text-xs text-gray-500 text-center">
                    Acceso inmediato · Lectura sin límites
                  </p>

                  {/* 🔥 URGENCIA */}
                  <p className="text-xs text-purple-500 text-center animate-pulse">
                    Varias personas están viendo este ebook ahora mismo
                  </p>

                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="w-full rounded-xl py-6 border-gray-200"
                  >
                    Seguir explorando
                  </Button>

                </div>

              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}