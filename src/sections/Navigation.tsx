import { translations } from "../i18n/translations";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export function Navigation() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 1024);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const go = (path: string) => {
  navigate(path);
  window.scrollTo({
    top: 0,
    behavior: "auto"
  });
  setOpen(false);
};

const goToSection = (id: string) => {
  const el = document.getElementById(id);

  if (el) {
    el.scrollIntoView({
      behavior: "auto",
      block: "start"
    });
  }

  setOpen(false);
};

  const item =
    "text-white/85 hover:text-white transition duration-200 text-sm tracking-wide";

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-[9999] border-b border-white/10 bg-black/55 backdrop-blur-2xl">

        <div className="max-w-7xl mx-auto h-16 px-5 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-6">

            {/* MOBILE */}
            {isMobile && (
              <button
                onClick={() => setOpen(!open)}
                className="text-white flex flex-col items-center leading-none"
              >
                {open ? <X size={22} /> : <Menu size={22} />}

                <span className="text-[10px] mt-1 tracking-[0.22em] text-white/60">
                  MENU
                </span>
              </button>
            )}

            {/* LOGO */}
            <button
  onClick={() => go(`/${language}`)}
  className="flex items-center gap-3"
>
  <img
    src="/assets/logo/logo-azul.png"
    alt="Drevaia Digital"
    className="w-8 h-8 object-contain"
  />

  <span className="text-white text-lg font-semibold tracking-[0.28em]">
    DREVAIA
  </span>
</button>

            {/* DESKTOP MENU */}
            {!isMobile && (
              <div className="flex items-center gap-6 ml-4">

                <button onClick={() => go(`/${language}`)} className={item}>
                  {language === "es" ? "Inicio" : "Home"}
                </button>

                <button onClick={() => go("/library")} className={item}>
                  {t.nav.library}
                </button>

                <button onClick={() => go("/blog")} className={item}>
                  Blog
                </button>

                <button onClick={() => goToSection("daily")} className={item}>
  Palabra del día
</button>

                <button onClick={() => goToSection("stats")} className={item}>
  Contador
</button>

                <button onClick={() => goToSection("testimonials")} className={item}>
  Testimonios
</button>

                <button onClick={() => go("/portal")} className={item}>
                  Portal
                </button>

                <button onClick={() => go("/legal")} className={item}>
                  {t.nav.legal}
                </button>

              </div>
            )}
          </div>

          {/* RIGHT */}
          {!isMobile && (
            <div className="flex items-center gap-4">

              {/* LANG */}
              <div className="flex gap-1 rounded-full border border-white/10 bg-white/5 px-1 py-1">
                {["es", "en", "fr", "pt"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang as any)}
                    className={`px-2 py-1 text-[11px] rounded-full transition ${
                      language === lang
                        ? "bg-white text-black"
                        : "text-white/75 hover:text-white"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => go("/empieza")}
                className="px-5 py-2 rounded-full border border-white/15 bg-white text-black text-sm font-medium hover:scale-[1.03] transition"
              >
                Empezar
              </button>

            </div>
          )}
        </div>
      </nav>

      {/* MOBILE PANEL */}
      {open && isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-16 left-0 w-full z-[9998] bg-black/92 backdrop-blur-2xl border-b border-white/10 px-6 py-7 flex flex-col items-start gap-5 text-white"
        >

          <button onClick={() => go(`/${language}`)}>Inicio</button>
          <button onClick={() => go("/library")}>{t.nav.library}</button>
          <button onClick={() => go("/blog")}>Blog</button>
          <button onClick={() => goToSection("daily")}>
  Palabra del día
</button>

<button onClick={() => goToSection("stats")}>
  Contador
</button>

<button onClick={() => goToSection("testimonials")}>
  Testimonios
</button>
          <button onClick={() => go("/portal")}>Portal</button>
          <button onClick={() => go("/legal")}>{t.nav.legal}</button>

          <button
            onClick={() => go("/empieza")}
            className="mt-2 px-5 py-2 rounded-full bg-white text-black text-sm"
          >
            Empezar
          </button>

          <div className="flex gap-2 pt-2">
            {["es", "en", "fr", "pt"].map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang as any);
                  setOpen(false);
                }}
                className={`px-3 py-1 rounded-full text-xs ${
                  language === lang
                    ? "bg-white text-black"
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