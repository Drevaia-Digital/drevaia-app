import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { highlightText } from "@/lib/highlight";

interface Book {
  id: number | string;
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
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // 🔥 AUTO FOCUS
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
      setActiveIndex(0);
    }
  }, [isOpen]);

  // 🔥 LIMPIAR INPUT
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  // 🔥 CARGAR HISTORIAL
  useEffect(() => {
    try {
      const saved = localStorage.getItem("drevaia-search-history");
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch {
      localStorage.removeItem("drevaia-search-history");
    }
  }, []);

  // 🔥 GUARDAR HISTORIAL
  useEffect(() => {
    if (!searchQuery.trim()) return;

    const updated = [
      searchQuery,
      ...recentSearches.filter((s) => s !== searchQuery),
    ].slice(0, 6);

    setRecentSearches(updated);
    localStorage.setItem("drevaia-search-history", JSON.stringify(updated));
  }, [searchQuery]);

  // 🔥 TECLADO
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

  // 🔥 SCROLL AUTOMÁTICO
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const activeItem = container.children[activeIndex] as HTMLElement;
    if (!activeItem) return;

    activeItem.scrollIntoView({ block: "nearest" });
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
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#111827]/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

              {/* INPUT */}
              <div className="px-5 py-4 border-b border-white/10">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Buscar en Drevaia Digital..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setActiveIndex(0);
                  }}
                  className="w-full bg-transparent text-white outline-none placeholder:text-gray-500"
                />
              </div>

              {/* RESULTADOS */}
              <div
                ref={listRef}
                className="max-h-[60vh] overflow-y-auto px-2 py-2 space-y-1"
              >
                {/* HISTORIAL */}
                {searchQuery.length === 0 && recentSearches.length > 0 && (
                  <div className="px-3 py-2">
                    <p className="text-xs text-gray-500 mb-2">
                      Búsquedas recientes
                    </p>

                    {recentSearches.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => setSearchQuery(item)}
                        className="text-sm text-white/80 hover:text-white cursor-pointer py-1"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}

                {/* SIN RESULTADOS */}
                {searchQuery.length > 0 && results.length === 0 && (
                  <p className="text-gray-400 text-sm px-3 py-2">
                    No se encontraron resultados
                  </p>
                )}

                {/* RESULTADOS */}
                {results.map((book, index) => (
                  <div
                    key={book.id}
                    onClick={() => onSelectBook(book)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition ${
                      index === activeIndex
                        ? "bg-white/10"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-11 h-16 object-cover rounded-md"
                    />

                    <div className="flex flex-col">
                      <span className="text-sm text-white font-medium">
                        {highlightText(book.title, searchQuery)}
                      </span>

                      {book.author && (
                        <span className="text-xs text-gray-400">
                          {highlightText(book.author, searchQuery)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}