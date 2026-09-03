import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { posts } from "@/data/posts";
import { useLanguage } from "@/context/LanguageContext";

type Lang = "es" | "en" | "fr" | "pt";

const BASE_URL = "https://drevaia.com";

const SUPPORTED_LANGUAGES: Lang[] = [
  "es",
  "en",
  "fr",
  "pt",
];

const ctaText: Record<
  Lang,
  {
    notFound: string;
    title: string;
    description: string;
    urgency: string;
    button: string;
    related: string;
    startToday: string;
    immediateAccess: string;
  }
> = {
  es: {
    notFound: "Artículo no encontrado",
    title: "Esto puede cambiar más de lo que crees",
    description:
      "No es solo información. Es una guía diseñada para ayudarte a entender lo que estás viviendo y empezar a transformarlo desde dentro.",
    urgency:
      "Miles de personas ya han comenzado este proceso.",
    button: "Acceder ahora",
    related: "También puede resonar contigo",
    startToday: "Empieza tu proceso hoy",
    immediateAccess: "Acceso inmediato",
  },

  en: {
    notFound: "Article not found",
    title: "This can change more than you think",
    description:
      "This is not just information. It's a guide designed to help you understand what you're going through and begin transforming it from within.",
    urgency:
      "Thousands of people have already started this process.",
    button: "Access now",
    related: "You may also resonate with",
    startToday: "Start your process today",
    immediateAccess: "Instant access",
  },

  fr: {
    notFound: "Article introuvable",
    title: "Cela peut changer plus que tu ne le penses",
    description:
      "Ce n’est pas seulement de l’information. C’est un guide conçu pour t’aider à comprendre ce que tu vis et à commencer à le transformer de l’intérieur.",
    urgency:
      "Des milliers de personnes ont déjà commencé ce processus.",
    button: "Accéder maintenant",
    related: "Cela pourrait aussi résonner avec toi",
    startToday: "Commence ton processus aujourd’hui",
    immediateAccess: "Accès immédiat",
  },

  pt: {
    notFound: "Artigo não encontrado",
    title: "Isso pode mudar mais do que você imagina",
    description:
      "Não é apenas informação. É um guia criado para ajudar você a entender o que está vivendo e começar a transformar isso de dentro para fora.",
    urgency:
      "Milhares de pessoas já começaram este processo.",
    button: "Acessar agora",
    related: "Isso também pode ressoar com você",
    startToday: "Comece seu processo hoje",
    immediateAccess: "Acesso imediato",
  },
};

/**
 * Payhip links are indexed by the canonical Spanish
 * post identifier, then resolved according to language.
 *
 * This avoids depending on the translated slug.
 */
const salesMap: Record<
  string,
  Record<Lang, string>
> = {
  "por-que-me-siento-vacio": {
    es: "https://payhip.com/b/Wz0IG",
    en: "https://payhip.com/b/BYviE",
    fr: "https://payhip.com/b/6xTwV",
    pt: "https://payhip.com/b/OWV4T",
  },

  "por-que-me-siento-perdido": {
    es: "https://payhip.com/b/kNSQa",
    en: "https://payhip.com/b/CdrP5",
    fr: "https://payhip.com/b/MDdsb",
    pt: "https://payhip.com/b/KGMWi",
  },

  "como-sanar-heridas-emocionales": {
    es: "https://payhip.com/b/Nx0cF",
    en: "https://payhip.com/b/0rjX8",
    fr: "https://payhip.com/b/hBRzA",
    pt: "https://payhip.com/b/kE8hV",
  },

  "como-reconectar-contigo-mismo": {
    es: "https://payhip.com/b/Nx0cF",
    en: "https://payhip.com/b/0rjX8",
    fr: "https://payhip.com/b/hBRzA",
    pt: "https://payhip.com/b/kE8hV",
  },
};

function isLanguage(value: string | undefined): value is Lang {
  return (
    value !== undefined &&
    SUPPORTED_LANGUAGES.includes(
      value as Lang,
    )
  );
}

export default function BlogPost() {
  const { lang, slug } = useParams();

  const { language: contextLanguage } =
    useLanguage();

  const language: Lang = isLanguage(lang)
    ? lang
    : isLanguage(contextLanguage)
      ? contextLanguage
      : "es";

  /**
   * Find the article using any translated slug.
   */
  const post = posts.find((item) =>
    Object.values(item.slug).includes(
      slug || "",
    ),
  );

  const ui = ctaText[language];

  if (!post) {
    return (
      <main className="min-h-screen bg-[#0f0f1a] text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">
            {ui.notFound}
          </h1>

          <Link
            to={`/${language}/blog`}
            className="inline-flex px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition"
          >
            {language === "es" && "Volver al Blog"}
            {language === "en" && "Back to Blog"}
            {language === "fr" && "Retour au Blog"}
            {language === "pt" && "Voltar ao Blog"}
          </Link>
        </div>
      </main>
    );
  }

  const title =
    post.title[language];

  const content =
    post.content[language];

  const description =
    post.description?.[language] ||
    `${title} | Drevaia`;

  const urls: Record<Lang, string> = {
    es: `${BASE_URL}/es/blog/${post.slug.es}`,
    en: `${BASE_URL}/en/blog/${post.slug.en}`,
    fr: `${BASE_URL}/fr/blog/${post.slug.fr}`,
    pt: `${BASE_URL}/pt/blog/${post.slug.pt}`,
  };

  const canonical = urls[language];

  /**
   * Canonical Spanish slug identifies the
   * underlying article independently of language.
   */
  const canonicalPostId =
    post.slug.es;

  const buyLink =
    salesMap[canonicalPostId]?.[language];

  /**
   * Related articles.
   */
  const relatedPosts = posts
    .filter(
      (item) => item !== post,
    )
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <html lang={language} />

        <title>
          {title} | Drevaia
        </title>

        <meta
          name="description"
          content={description}
        />

        <meta
          name="robots"
          content="index,follow,max-image-preview:large"
        />

        <link
          rel="canonical"
          href={canonical}
        />

        <link
          rel="alternate"
          hrefLang="es"
          href={urls.es}
        />

        <link
          rel="alternate"
          hrefLang="en"
          href={urls.en}
        />

        <link
          rel="alternate"
          hrefLang="fr"
          href={urls.fr}
        />

        <link
          rel="alternate"
          hrefLang="pt"
          href={urls.pt}
        />

        <link
          rel="alternate"
          hrefLang="x-default"
          href={urls.es}
        />

        <meta
          property="og:type"
          content="article"
        />

        <meta
          property="og:title"
          content={title}
        />

        <meta
          property="og:description"
          content={description}
        />

        <meta
          property="og:url"
          content={canonical}
        />

        <meta
          property="og:site_name"
          content="Drevaia Digital"
        />

        <meta
          property="og:image"
          content={`${BASE_URL}/images/hero-bg.jpg`}
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content={title}
        />

        <meta
          name="twitter:description"
          content={description}
        />

        <meta
          name="twitter:image"
          content={`${BASE_URL}/images/hero-bg.jpg`}
        />

        <meta
          name="author"
          content="Drevaia Digital"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context":
              "https://schema.org",

            "@type": "Article",

            headline: title,

            description,

            author: {
              "@type": "Organization",
              name: "Drevaia Digital",
            },

            publisher: {
              "@type": "Organization",
              name: "Drevaia Digital",
            },

            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": canonical,
            },

            url: canonical,

            image:
              `${BASE_URL}/images/hero-bg.jpg`,
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-[#0f0f1a] text-white px-6 py-10 pb-28">

        <article className="max-w-3xl mx-auto">

          {/* TITLE */}

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {title}
          </h1>

          {/* CONTENT */}

          <div className="text-gray-300 leading-relaxed whitespace-pre-line">
            {content}
          </div>

          {/* CONVERSION CTA */}

          {buyLink && (
            <section className="mt-14 p-7 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-xl">

              <h2 className="text-xl font-semibold mb-3">
                {ui.title}
              </h2>

              <p className="text-gray-400 mb-4">
                {ui.description}
              </p>

              <p className="text-sm text-gray-500 mb-6">
                {ui.urgency}
              </p>

              <a
                href={buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-amber-400 hover:scale-105 transition font-semibold shadow-lg"
              >
                {ui.button}
              </a>

            </section>
          )}

          {/* RELATED POSTS */}

          <section className="mt-14 border-t border-white/10 pt-6">

            <h2 className="text-lg font-semibold mb-4 text-white">
              {ui.related}
            </h2>

            <div className="space-y-2">

              {relatedPosts.map((item) => (
                <Link
                  key={item.slug[language]}
                  to={`/${language}/blog/${item.slug[language]}`}
                  className="block text-gray-400 hover:text-white transition"
                >
                  → {item.title[language]}
                </Link>
              ))}

            </div>

          </section>

        </article>

      </main>

      {/* STICKY CTA */}

      {buyLink && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md">

          <a
            href={buyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-amber-400 shadow-xl backdrop-blur-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
          >

            <div className="flex flex-col text-left">

              <span className="text-sm font-semibold text-white leading-tight">
                {ui.startToday}
              </span>

              <span className="text-[11px] text-white/80">
                {ui.immediateAccess}
              </span>

            </div>

            <span className="text-lg text-white font-bold">
              →
            </span>

          </a>

        </div>
      )}
    </>
  );
}