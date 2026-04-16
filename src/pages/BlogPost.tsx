import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { posts } from "@/data/posts";

const BASE_URL = "https://drevaia.com";

export default function BlogPost() {
  const { lang, slug } = useParams();

  const language = (lang || "es") as "es" | "en" | "fr" | "pt";

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

  // 🔥 SEO REAL
  const description = post.description?.[language] || `${title} | Drevaia`;

  // 🌐 URLs por idioma
  const urls = {
    es: `${BASE_URL}/es/blog/${post.slug.es}`,
    en: `${BASE_URL}/en/blog/${post.slug.en}`,
    fr: `${BASE_URL}/fr/blog/${post.slug.fr}`,
    pt: `${BASE_URL}/pt/blog/${post.slug.pt}`,
  };

  const canonical = urls[language];

  // 🔗 RELATED POSTS (interlinking)
  const relatedPosts = posts
    .filter(p => p !== post)
    .slice(0, 3);

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

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-[#0f0f1a] text-white px-6 py-10 max-w-3xl mx-auto">
        
        {/* 🧠 TÍTULO */}
        <h1 className="text-4xl font-bold mb-6">
          {title}
        </h1>

        {/* 📄 CONTENIDO */}
        <div className="text-gray-300 leading-relaxed">
          {content}
        </div>

        {/* 💰 BLOQUE DE CONVERSIÓN */}
<div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 text-center">

  <h3 className="text-xl font-semibold mb-3">
    ¿Quieres ir más profundo?
  </h3>

  <p className="text-gray-400 mb-6">
    Este es solo el inicio. Dentro encontrarás una guía completa para entender,
    sanar y transformar lo que estás viviendo.
  </p>

  <a
    href="https://payhip.com/b/Wz0IG"
    target="_blank"
  >
    <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-amber-400 hover:scale-105 transition font-semibold">
      Acceder ahora
    </button>
  </a>

</div>

        {/* 🔗 INTERLINKING SEO */}
        <div className="mt-12 border-t border-white/10 pt-6">
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