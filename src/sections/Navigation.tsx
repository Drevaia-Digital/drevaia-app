import { translations } from "@/i18n";
import type { Language } from "@/i18n";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Menu, X } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

import { motion } from "framer-motion";

import { DrevaiaButton } from "@/components/ui/DrevaiaButton";

export function Navigation() {

  const {
    language,
    setLanguage,
  } = useLanguage();

  const t =
    translations[language];

  const [open, setOpen] =
    useState(false);

  const [isMobile, setIsMobile] =
    useState(false);

  const navigate =
    useNavigate();

  useEffect(() => {

    const resize = () =>
      setIsMobile(
        window.innerWidth < 1024,
      );

    resize();

    window.addEventListener(
      "resize",
      resize,
    );

    return () =>
      window.removeEventListener(
        "resize",
        resize,
      );

  }, []);

  const go = (path: string) => {

    navigate(path);

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });

    setOpen(false);
  };

  const goToSection = (id: string) => {
  const homePath = `/${language}`;

  // Si ya estamos en Home, hacer scroll directamente.
  if (window.location.pathname === homePath) {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setOpen(false);
    return;
  }

  // Si estamos en otra sección del sitio,
  // volver primero al Home en el idioma actual.
  navigate(`${homePath}#${id}`);

  setOpen(false);
};

  const item = `
    text-sm
    tracking-[0.14em]
    text-white/70
    hover:text-white
    transition-all
    duration-300
    relative
    after:absolute
    after:left-0
    after:-bottom-1
    after:h-px
    after:w-0
    after:bg-primary
    after:transition-all
    after:duration-300
    hover:after:w-full
  `;

  const navigationLabels: Record<
    Language,
    {
      home: string;
      blog: string;
      daily: string;
      stats: string;
      testimonials: string;
      portal: string;
      start: string;
      menu: string;
    }
  > = {

    es: {
      home: "Inicio",
      blog: "Blog",
      daily: "Palabra del día",
      stats: "Contador",
      testimonials: "Testimonios",
      portal: "Portal",
      start: "Empezar",
      menu: "MENÚ",
    },

    en: {
      home: "Home",
      blog: "Blog",
      daily: "Word of the day",
      stats: "Counter",
      testimonials: "Testimonials",
      portal: "Portal",
      start: "Get started",
      menu: "MENU",
    },

    fr: {
      home: "Accueil",
      blog: "Blog",
      daily: "Mot du jour",
      stats: "Compteur",
      testimonials: "Témoignages",
      portal: "Portail",
      start: "Commencer",
      menu: "MENU",
    },

    pt: {
      home: "Início",
      blog: "Blog",
      daily: "Palavra do dia",
      stats: "Contador",
      testimonials: "Depoimentos",
      portal: "Portal",
      start: "Começar",
      menu: "MENU",
    },

  };

  const nav =
    navigationLabels[language];

  const changeLanguage = (
  lang: Language,
) => {
  const currentPath =
    window.location.pathname;

  const languagePrefix =
    /^\/(es|en|fr|pt)(?=\/|$)/;

  const nextPath =
    languagePrefix.test(currentPath)
      ? currentPath.replace(
          languagePrefix,
          `/${lang}`,
        )
      : `/${lang}${currentPath === "/" ? "" : currentPath}`;

  setLanguage(lang);

  navigate(
    `${nextPath}${window.location.hash}`,
  );

  setOpen(false);
};

  return (
    <>
      {/* NAVBAR */}

      <nav
        className="
          fixed
          top-0
          left-0
          right-0
          z-[9999]
          border-b
          border-white/[0.06]
          bg-black/30
          backdrop-blur-3xl
          supports-[backdrop-filter]:bg-black/20
          transition-all
          duration-500
          drevaia-transition
        "
      >

        <div
          className="
            mx-auto
            flex
            h-20
            max-w-7xl
            items-center
            justify-between
            px-6
            lg:px-10
          "
        >

          {/* LEFT */}

          <div
            className="
              flex
              items-center
              gap-6
            "
          >

            {/* MOBILE */}

            {isMobile && (

              <button
                onClick={() =>
                  setOpen(!open)
                }
                className="
                  text-white
                  flex
                  flex-col
                  items-center
                  leading-none
                "
                aria-label={nav.menu}
              >

                {open ? (
                  <X size={22} />
                ) : (
                  <Menu size={22} />
                )}

                <span
                  className="
                    text-[10px]
                    mt-1
                    tracking-[0.22em]
                    text-white/60
                  "
                >
                  {nav.menu}
                </span>

              </button>

            )}

            {/* LOGO */}

            <button
              onClick={() =>
                go(`/${language}`)
              }
              className="
                flex
                items-center
                gap-3
              "
              aria-label="Drevaia"
            >

              <img
                src="/assets/logo/logo-icon-azul.png"
                alt="Drevaia Digital"
                className="
                  w-10
                  h-10
                  object-contain
                  drop-shadow-[0_0_10px_rgba(59,130,246,.35)]
                "
              />

              <span
                className="
                  text-white
                  text-lg
                  font-semibold
                  tracking-[0.28em]
                "
              >
                DREVAIA
              </span>

            </button>

            {/* DESKTOP MENU */}

            {!isMobile && (

              <div
                className="
                  flex
                  items-center
                  gap-6
                  ml-4
                "
              >

                <button
                  onClick={() =>
                    go(`/${language}`)
                  }
                  className={item}
                >
                  {nav.home}
                </button>

                <button
                  onClick={() =>
                    go(
                      `/${language}/library`,
                    )
                  }
                  className={item}
                >
                  {t.nav.ebooks}
                </button>

<button
  onClick={() =>
    go(
      `/${language}/studio`,
    )
  }
  className={item}
>
  AI Studio
</button>

                <button
                  onClick={() =>
                    go(
                      `/${language}/blog`,
                    )
                  }
                  className={item}
                >
                  {nav.blog}
                </button>

                <button
                  onClick={() =>
                    goToSection("daily")
                  }
                  className={item}
                >
                  {nav.daily}
                </button>

                <button
                  onClick={() =>
                    goToSection("stats")
                  }
                  className={item}
                >
                  {nav.stats}
                </button>

                <button
                  onClick={() =>
                    goToSection(
                      "testimonials",
                    )
                  }
                  className={item}
                >
                  {nav.testimonials}
                </button>

                <button
                  onClick={() =>
                    go(
                      `/${language}/portal`,
                    )
                  }
                  className={item}
                >
                  {nav.portal}
                </button>

                <button
                  onClick={() =>
                    go(
                      `/${language}/legal`,
                    )
                  }
                  className={item}
                >
                  {t.nav.legal}
                </button>

              </div>

            )}

          </div>

          {/* RIGHT */}

          {!isMobile && (

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              {/* LANGUAGE */}

              <div
                className="
                  flex
                  gap-1
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  px-1
                  py-1
                "
              >

                {(
                  [
                    "es",
                    "en",
                    "fr",
                    "pt",
                  ] as Language[]
                ).map((lang) => (

                  <button
                    key={lang}
                    onClick={() =>
                      changeLanguage(lang)
                    }
                    className={`
                      px-2
                      py-1
                      text-[11px]
                      rounded-full
                      transition
                      ${
                        language === lang
                          ? "bg-white text-black"
                          : "text-white/75 hover:text-white"
                      }
                    `}
                  >
                    {lang.toUpperCase()}
                  </button>

                ))}

              </div>

              {/* CTA */}

              <DrevaiaButton
                onClick={() =>
                  go(
                    `/${language}/empieza`,
                  )
                }
              >
                {nav.start}
              </DrevaiaButton>

            </div>

          )}

        </div>

      </nav>

      {/* MOBILE PANEL */}

      {open && isMobile && (

        <motion.div
          initial={{
            opacity: 0,
            y: -14,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            fixed
            top-16
            left-0
            w-full
            z-[9998]
            bg-black/92
            backdrop-blur-2xl
            border-b
            border-white/10
            px-6
            py-7
            flex
            flex-col
            items-start
            gap-5
            text-white
          "
        >

          <button
            onClick={() =>
              go(`/${language}`)
            }
          >
            {nav.home}
          </button>

          <button
            onClick={() =>
              go(
                `/${language}/library`,
              )
            }
          >
            {t.nav.ebooks}
          </button>

<button
  onClick={() =>
    go(
      `/${language}/studio`,
    )
  }
>
  AI Studio
</button>

          <button
            onClick={() =>
              go(
                `/${language}/blog`,
              )
            }
          >
            {nav.blog}
          </button>

          <button
            onClick={() =>
              goToSection("daily")
            }
          >
            {nav.daily}
          </button>

          <button
            onClick={() =>
              goToSection("stats")
            }
          >
            {nav.stats}
          </button>

          <button
            onClick={() =>
              goToSection(
                "testimonials",
              )
            }
          >
            {nav.testimonials}
          </button>

          <button
            onClick={() =>
              go(
                `/${language}/portal`,
              )
            }
          >
            {nav.portal}
          </button>

          <button
            onClick={() =>
              go(
                `/${language}/legal`,
              )
            }
          >
            {t.nav.legal}
          </button>

          <button
            onClick={() =>
              go(
                `/${language}/empieza`,
              )
            }
            className="
              mt-2
              px-5
              py-2
              rounded-full
              bg-white
              text-black
              text-sm
            "
          >
            {nav.start}
          </button>

          <div
            className="
              flex
              gap-2
              pt-2
            "
          >

            {(
              [
                "es",
                "en",
                "fr",
                "pt",
              ] as Language[]
            ).map((lang) => (

              <button
                key={lang}
                onClick={() =>
                  changeLanguage(lang)
                }
                className={`
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  ${
                    language === lang
                      ? "bg-white text-black"
                      : "bg-white/10 text-white"
                  }
                `}
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