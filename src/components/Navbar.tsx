import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { userProfile } from "@/utils/userProfile";

type Props = {
  language: "es" | "en" | "fr" | "pt";
};

type Emotion = "ansiedad" | "proposito" | "patrones";

export function Navbar({ language }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const emotion = userProfile.getEmotion() as Emotion | null;

  // 🌊 scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🌍 idioma base
  const labels = {
    es: { menu: "MENÚ", home: "Inicio", library: "Biblioteca", legal: "Legal" },
    en: { menu: "MENU", home: "Home", library: "Library", legal: "Legal" },
    fr: { menu: "MENU", home: "Accueil", library: "Bibliothèque", legal: "Légal" },
    pt: { menu: "MENU", home: "Início", library: "Biblioteca", legal: "Legal" },
  };

  const t = labels[language];

  // 🧠 CTA inteligente
  const ctaMap = {
    ansiedad: {
      es: "Encontrar calma",
      en: "Find calm",
      fr: "Trouver la paix",
      pt: "Encontrar calma",
    },
    proposito: {
      es: "Descubrir mi camino",
      en: "Find my path",
      fr: "Trouver mon chemin",
      pt: "Descobrir meu caminho",
    },
    patrones: {
      es: "Romper el ciclo",
      en: "Break the cycle",
      fr: "Briser le cycle",
      pt: "Quebrar o ciclo",
    },
  };

  const linkMap = {
    ansiedad: {
      es: "https://payhip.com/b/Wz0IG",
      en: "https://payhip.com/b/BYviE",
      fr: "https://payhip.com/b/6xTwV",
      pt: "https://payhip.com/b/OWV4T",
    },
    proposito: {
      es: "https://payhip.com/b/kNSQa",
      en: "https://payhip.com/b/CdrP5",
      fr: "https://payhip.com/b/MDdsb",
      pt: "https://payhip.com/b/KGMWi",
    },
    patrones: {
      es: "https://payhip.com/b/Nx0cF",
      en: "https://payhip.com/b/0rjX8",
      fr: "https://payhip.com/b/hBRzA",
      pt: "https://payhip.com/b/kE8hV",
    },
  };

  const dynamicCTA =
    emotion && ctaMap[emotion]
      ? ctaMap[emotion][language]
      : {
          es: "Explorar",
          en: "Explore",
          fr: "Explorer",
          pt: "Explorar",
        }[language];

  const dynamicLink =
    emotion && linkMap[emotion]
      ? linkMap[emotion][language]
      : "/library";

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50">

      <div
        className={`
          flex items-center justify-between
          px-6 py-3
          rounded-2xl
          transition-all duration-300
          ${
            scrolled
              ? "bg-[#0f0f1a]/95 backdrop-blur-xl border border-white/10 shadow-2xl"
              : "bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl"
          }
        `}
      >

        {/* IZQUIERDA */}
        <div className="flex items-center gap-4">

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition"
          >
            <Menu size={18} />
            <span className="text-xs tracking-widest">
              {t.menu}
            </span>
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

        {/* CTA INTELIGENTE */}
        <a
          href={dynamicLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
            hidden md:inline-flex
            items-center
            px-5 py-2
            rounded-full
            bg-gradient-to-r from-purple-500 to-indigo-600
            text-white text-sm font-semibold
            shadow-lg
            hover:scale-105
            transition-all duration-300
          "
        >
          {dynamicCTA}
        </a>

      </div>

      {/* MENÚ */}
      {open && (
        <div className="mt-3 rounded-2xl bg-[#0f0f1a]/95 backdrop-blur-xl border border-white/10 p-6 shadow-xl text-white">
          <nav className="flex flex-col gap-4">

            <Link to="/" onClick={() => setOpen(false)}>
              {t.home}
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