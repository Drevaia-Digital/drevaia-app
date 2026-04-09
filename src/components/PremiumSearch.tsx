import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
  const listRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  // 🔥 AUTO FOCUS
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setActiveIndex(0);
    }
  }, [isOpen]);

// 🔥 LIMPIAR INPUT AL ABRIR
useEffect(() => {
  if (isOpen) {
    setSearchQuery("");
  }
}, [isOpen]);

  // 🔥 TECLADO PRO (↑ ↓ ENTER ESC)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
      }

      if (e.key === "Enter") {
        if (results[activeIndex]) {
          onSelectBook(results[activeIndex]);
        }
      }

      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, results, activeIndex]);

  // 🔥 SCROLL AUTOMÁTICO AL ITEM ACTIVO
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const activeItem = container.children[activeIndex] as HTMLElement;
    if (!activeItem) return;

    activeItem.scrollIntoView({
      block: "nearest",
    });
  }, [activeIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-2xl"
            initial={{ scale: 0.96, y: -16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: -16, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* CONTENEDOR */}
            <div className="bg-[#111827]/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

              {/* INPUT */}
              <div className="px-5 py-4 border-b border-white/10">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Buscar en Drevaia Digital..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-white text-base md:text-lg outline-none placeholder:text-gray-500"
                />
              </div>

              {/* RESULTADOS */}
              <div
                ref={listRef}
                className="max-h-[60vh] overflow-y-auto px-2 py-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10"
              >
                {searchQuery.length > 0 && results.length === 0 && (
                  <p className="text-gray-400 text-sm px-3 py-2">
                    No se encontraron resultados
                  </p>
                )}

                <AnimatePresence>
                  {results.map((book, index) => (
                    <motion.div
                      key={book.id}
                      onClick={() => onSelectBook(book)}
                      className={`
                        flex items-center gap-3
                        px-3 py-2
                        rounded-xl
                        cursor-pointer
                        transition
                        ${
                          index === activeIndex
                            ? "bg-white/10"
                            : "hover:bg-white/5"
                        }
                      `}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-11 h-15 object-cover rounded-md shadow-sm"
                      />

                      <div className="flex flex-col">
                        <span className="text-sm text-white font-medium">
                          {book.title}
                        </span>

                        {book.author && (
                          <span className="text-xs text-gray-400">
                            {book.author}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}