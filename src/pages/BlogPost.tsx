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

  // ✅ SEO REAL (usa description del post)
  const description = post.description?.[language] || `${title} | Drevaia`;

  // 🌐 URLs por idioma
  const urls = {
    es: `${BASE_URL}/es/blog/${post.slug.es}`,
    en: `${BASE_URL}/en/blog/${post.slug.en}`,
    fr: `${BASE_URL}/fr/blog/${post.slug.fr}`,
    pt: `${BASE_URL}/pt/blog/${post.slug.pt}`,
  };

  const canonical = urls[language];

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
        <h1 className="text-4xl font-bold mb-6">
          {title}
        </h1>

        <div className="text-gray-300 leading-relaxed">
          {content}
        </div>
      </div>
    </>
  );
}