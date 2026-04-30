import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

type Props = {
  language: "es" | "en" | "fr" | "pt";
};

export function Navbar({ language }: Props) {
  const [open, setOpen] = useState(false);

  const labels = {
    es: { menu: "MENÚ", library: "Biblioteca", legal: "Legal" },
    en: { menu: "MENU", library: "Library", legal: "Legal" },
    fr: { menu: "MENU", library: "Bibliothèque", legal: "Légal" },
    pt: { menu: "MENU", library: "Biblioteca", legal: "Legal" },
  };

  const t = labels[language];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50">
      
      <div className="flex items-center justify-between px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl">
        
        {/* IZQUIERDA */}
        <div className="flex items-center gap-3">

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition"
          >
            <Menu size={18} />
            <span className="text-xs tracking-widest">{t.menu}</span>
          </button>

          <Link to="/" className="flex items-center gap-3 ml-2">
            <img
              src="/assets/logo/logo-icon-azul.png"
              alt="Drevaia"
              className="h-9 md:h-10 w-auto"
            />
            <span className="text-white font-semibold tracking-[0.2em] text-sm md:text-base">
              DREVAIA
            </span>
          </Link>

        </div>

      </div>

      {/* MENÚ DESPLEGABLE */}
      {open && (
        <div className="mt-3 rounded-2xl bg-[#0f0f1a]/95 backdrop-blur-xl border border-white/10 p-6 shadow-xl text-white">
          <nav className="flex flex-col gap-4">

            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link to="/library" onClick={() => setOpen(false)}>
              {t.library}
            </Link>

            <Link to="/legal" onClick={() => setOpen(false)}>
              {t.legal}
            </Link>

          </nav>
        </div>
      )}

    </header>
  );
}