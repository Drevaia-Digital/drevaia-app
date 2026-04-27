import { translations } from "../i18n/translations";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export function Navigation() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const go = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "auto" });
    setOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-[9999] bg-[#0f0f1a]/80 backdrop-blur-xl border-b border-white/10 shadow-lg">

        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

          {/* LOGO */}
          <button onClick={() => go(`/${language}`)} className="flex items-center gap-2">
            <Sparkles className="text-amber-400" />
            <span className="text-white font-bold text-lg">
              Drevaia
            </span>
          </button>

          {/* DESKTOP */}
          {!isMobile && (
            <div className="flex items-center gap-6 text-sm font-medium">

              <button onClick={() => go(`/${language}`)} className="text-white hover:text-amber-300">
                {language === "es" ? "Inicio" : "Home"}
              </button>

              <button onClick={() => go("/library")} className="text-white hover:text-amber-300">
                {t.nav.library}
              </button>

              <button onClick={() => go("/blog")} className="text-white hover:text-amber-300">
                Blog
              </button>

              <button onClick={() => go("/portal")} className="text-white hover:text-amber-300">
                Portal
              </button>

              <button onClick={() => go("/reading")} className="text-white hover:text-amber-300">
                {language === "es" ? "Lectura diaria" : "Daily Reading"}
              </button>

              <button onClick={() => go("/testimonials")} className="text-white hover:text-amber-300">
                {language === "es" ? "Testimonios" : "Testimonials"}
              </button>

              <button onClick={() => go("/legal")} className="text-white hover:text-amber-300">
                {t.nav.legal}
              </button>

              {/* LANG */}
              <div className="flex gap-2 ml-2 bg-white/10 px-2 py-1 rounded-full">
                {["es", "en", "fr", "pt"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang as any)}
                    className={`px-2 py-1 rounded-full text-xs ${
                      language === lang
                        ? "bg-amber-400 text-black"
                        : "text-white"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

            </div>
          )}

          {/* MOBILE BTN */}
          {isMobile && (
            <button onClick={() => setOpen(!open)} className="text-white">
              {open ? <X /> : <Menu />}
            </button>
          )}

        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-16 left-0 w-full bg-[#0f0f1a]/95 backdrop-blur-xl p-6 z-[9998] flex flex-col gap-4 text-white"
        >

          <button onClick={() => go(`/${language}`)}>Inicio</button>
          <button onClick={() => go("/library")}>{t.nav.library}</button>
          <button onClick={() => go("/blog")}>Blog</button>
          <button onClick={() => go("/portal")}>Portal</button>
          <button onClick={() => go("/reading")}>Lectura diaria</button>
          <button onClick={() => go("/testimonials")}>Testimonios</button>
          <button onClick={() => go("/legal")}>{t.nav.legal}</button>

          <div className="flex gap-2 mt-4">
            {["es", "en", "fr", "pt"].map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang as any);
                  setOpen(false);
                }}
                className={`px-3 py-1 rounded ${
                  language === lang
                    ? "bg-amber-400 text-black"
                    : "bg-white/10 text-white"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

        </motion.div>
      )}
    </>
  );
}