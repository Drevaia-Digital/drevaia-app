import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

interface Book {
  id: number;
  title: string;
  cover: string;
  author?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  results: Book[];
  onSelectBook: (book: Book) => void;
}

export function PremiumSearch({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  results,
  onSelectBook,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xl flex items-start justify-center pt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-2xl px-4"
            initial={{ scale: 0.95, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* INPUT */}
            <div className="bg-neutral-900/80 border border-neutral-700 rounded-2xl p-4 shadow-2xl">
              <input
                ref={inputRef}
                type="text"
                placeholder="Buscar en Drevaia Digital..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white text-lg outline-none placeholder:text-neutral-400"
              />
            </div>

            {/* RESULTADOS */}
            <div className="mt-4 max-h-[400px] overflow-y-auto space-y-2">
              {searchQuery.length > 0 && results.length === 0 && (
                <p className="text-neutral-400 text-sm px-2">
                  No se encontraron resultados
                </p>
              )}

              <AnimatePresence>
                {results.map((book) => (
                  <motion.div
                    key={book.id}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => onSelectBook(book)}
                  >
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded-lg"
                    />

                    <div>
                      <h3 className="text-white text-sm font-medium">
                        {book.title}
                      </h3>
                      {book.author && (
                        <p className="text-neutral-400 text-xs">
                          {book.author}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}