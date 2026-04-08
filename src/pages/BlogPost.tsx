import { useParams } from "react-router-dom";
import { getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { getLangFromURL } from "@/lib/getLang";

export default function BlogPost() {
  const { slug } = useParams();
  const lang = getLangFromURL();

  const post = getArticleBySlug(slug || "", lang);

// 🔥 SEO dinámico
if (post) {
  document.title = post.seo?.title || post.title;

  const metaDescription = document.querySelector("meta[name='description']");
  
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      post.seo?.description || post.excerpt
    );
  }
}

  if (!post) {
    return (
      <div className="text-center py-20 text-white">
        Artículo no encontrado
      </div>
    );
  }

  const related = getRelatedArticles(post, lang);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-white">

      <h1 className="text-4xl font-bold mb-6">
        {post.title}
      </h1>

      <p className="text-gray-400 mb-10">
        {post.excerpt}
      </p>

      <div
        className="space-y-6 text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">
          También puede resonar contigo
        </h2>

        <div className="grid gap-4">
          {related.map((rel) => (
            <a
              key={rel.slug}
              href={`/${lang}/blog/${rel.slug}`}
              className="p-4 border border-white/10 rounded-xl hover:bg-white/5 transition"
            >
              {rel.title}
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}