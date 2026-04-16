import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { posts } from "@/data/posts";

const BASE_URL = "https://drevaia.com";

type Lang = "es" | "en" | "fr" | "pt";

export default function BlogPost() {
  const { lang, slug } = useParams();

  const language = (lang || "es") as Lang;

  const post = posts.find(p =>
    Object.values(p.slug).includes(slug || "")
  );

  if (!post) {
    return (
      <div className="text-white p-10 text-center">
        Artículo no encontrado
      </div>
    );
  }

  const title = post.title[language];
  const content = post.content[language];
  const description = post.description?.[language] || `${title} | Drevaia`;

  // 🌐 URLs
  const urls = {
    es: `${BASE_URL}/es/blog/${post.slug.es}`,
    en: `${BASE_URL}/en/blog/${post.slug.en}`,
    fr: `${BASE_URL}/fr/blog/${post.slug.fr}`,
    pt: `${BASE_URL}/pt/blog/${post.slug.pt}`,
  };

  const canonical = urls[language];

  // 🔗 RELATED
  const relatedPosts = posts
    .filter(p => p !== post)
    .slice(0, 3);

  // 💰 MAPA DE VENTAS
  const salesMap: Record<string, Record<Lang, string>> = {
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
    }
  };

  // 🔍 slug real del post actual (IMPORTANTE)
  const currentSlug = post.slug[language];

  // 🎯 link correcto de compra
  const buyLink =
    salesMap[currentSlug]?.[language] ||
    salesMap["como-sanar-heridas-emocionales"][language];

  // 🌍 COPY MULTIIDIOMA (VENTA)
  const ctaText = {
    es: {
      title: "Esto puede cambiar más de lo que crees",
      desc: "No es solo información. Es una guía diseñada para ayudarte a entender lo que estás viviendo y empezar a transformarlo desde dentro.",
      urgency: "Miles de personas ya están haciendo este proceso.",
      button: "Acceder ahora"
    },
    en: {
      title: "This can change more than you think",
      desc: "This is not just information. It's a guide to understand and transform what you're going through.",
      urgency: "Thousands are already going through this process.",
      button: "Access now"
    },
    fr: {
      title: "Cela peut changer plus que tu ne le penses",
      desc: "Ce n’est pas seulement du contenu. C’est une guidance pour transformer ce que tu vis.",
      urgency: "Des milliers de personnes ont déjà commencé.",
      button: "Accéder maintenant"
    },
    pt: {
      title: "Isso pode mudar mais do que você imagina",
      desc: "Não é apenas informação. É um guia para transformar o que você está vivendo.",
      urgency: "Milhares de pessoas já começaram.",
      button: "Acessar agora"
    }
  };

  const t = ctaText[language];

  return (
    <>
      <Helmet>
        <title>{title} | Drevaia</title>
        <meta name="description" content={description} />

        <link rel="canonical" href={canonical} />

        <link rel="alternate" hrefLang="es" href={urls.es} />
        <link rel="alternate" hrefLang="en" href={urls.en} />
        <link rel="alternate" hrefLang="fr" href={urls.fr} />
        <link rel="alternate" hrefLang="pt" href={urls.pt} />
        <link rel="alternate" hrefLang="x-default" href={urls.es} />

        {/* 🔥 OPEN GRAPH */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-[#0f0f1a] text-white px-6 py-10 max-w-3xl mx-auto">

        {/* 🧠 TITLE */}
        <h1 className="text-4xl font-bold mb-6">
          {title}
        </h1>

        {/* 📄 CONTENT */}
        <div className="text-gray-300 leading-relaxed">
          {content}
        </div>

        {/* 💰 BLOQUE CONVERSIÓN PRO */}
        <div className="mt-14 p-7 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-xl">

          <h3 className="text-xl font-semibold mb-3">
            {t.title}
          </h3>

          <p className="text-gray-400 mb-4">
            {t.desc}
          </p>

          <p className="text-sm text-gray-500 mb-6">
            {t.urgency}
          </p>

          <a href={buyLink} target="_blank">
            <button className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-amber-400 hover:scale-105 transition font-semibold shadow-lg">
              {t.button}
            </button>
          </a>

        </div>

        {/* 🔗 INTERLINKING */}
        <div className="mt-14 border-t border-white/10 pt-6">
          <h3 className="text-lg font-semibold mb-4 text-white">
            También puede resonar contigo
          </h3>

          <div className="space-y-2">
            {relatedPosts.map((p, i) => (
              <a
                key={i}
                href={`/${language}/blog/${p.slug[language]}`}
                className="block text-gray-400 hover:text-white transition"
              >
                → {p.title[language]}
              </a>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}