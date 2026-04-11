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
  "Descarga inmediata",
  "Formato PDF y EPUB",
  "Acceso de por vida",
  "Actualizaciones gratuitas",
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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* MODAL */}
          <motion.div
            layoutId={`ebook-${book.id}`}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              className="w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-3xl shadow-2xl"
              initial={{ borderRadius: 24 }}
              animate={{ borderRadius: 24 }}
              exit={{ borderRadius: 24 }}
              onClick={(e) => e.stopPropagation()}
            >

              {/* HEADER */}
              <div className="relative h-48 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">

                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-8">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-80" />
                    <span className="text-sm font-medium opacity-80">
                      {book.collection}
                    </span>
                  </div>
                </div>

              </div>

              {/* CONTENIDO */}
              <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-12rem)]">

                <motion.h2
                  layoutId={`ebook-title-${book.id}`}
                  className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                >
                  {book.title}
                </motion.h2>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {book.description}
                </p>

                {/* FEATURES */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* STATS */}
                <div className="flex items-center gap-6 mb-6 p-4 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-500" />
                    <span className="text-sm text-gray-600">
                      Lectura: 2-3 horas
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span className="text-sm text-gray-600">
                      4.9/5 valoración
                    </span>
                  </div>
                </div>

                {/* 🔥 RECOMENDACIONES (AQUÍ VA CORRECTO) */}
                {recommendedBooks && recommendedBooks.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">
                      También te puede interesar
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {recommendedBooks.map((b) => (
                        <div
                          key={b.id}
                          className="cursor-pointer"
                          onClick={() => window.location.reload()}
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

                {/* BOTONES */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white rounded-xl py-6 shadow-lg">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Comprar en Payhip
                    </Button>
                  </a>

                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="rounded-xl py-6 border-gray-200"
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