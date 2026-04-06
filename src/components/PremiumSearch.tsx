import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function PremiumSearch({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 🔥 cerrar con ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // 🔥 focus automático
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  return (
    <>
      {/* 🔹 BOTÓN COMPACTO */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-[#1a1a2e] border border-white/20 px-4 py-3 rounded-xl w-full max-w-md text-gray-400 hover:text-white transition"
        >
          <Search className="w-4 h-4" />
          Buscar libros...
        </button>
      )}

      {/* 🔹 OVERLAY */}
      <AnimatePresence>
        {open && (
          <>
            {/* Fondo blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            />

            {/* Input expandido */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-xl px-6 z-50"
            >
              <div className="relative">
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="Buscar libros..."
                  style={{ fontSize: "16px" }}
                  className="w-full bg-[#1a1a2e] border border-white/20 rounded-2xl px-5 py-4 text-white outline-none"
                />

                {/* Botón cerrar */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}