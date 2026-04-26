import { Link } from "react-router-dom";
import { posts } from "@/data/posts";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogIndexPage() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0f0f1a] text-white px-4 py-20">
      <div className="max-w-6xl mx-auto">

        <header className="text-center mb-14">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Blog Drevaia
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Artículos profundos sobre sanación emocional, autoestima,
            relaciones y crecimiento interior.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Link
              key={i}
              to={`/${language}/blog/${post.slug[language]}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
            >
              <h2 className="text-xl font-semibold mb-3">
                {post.title[language]}
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed">
                {post.description[language]}
              </p>

              <div className="mt-5 text-violet-300 text-sm">
                Leer artículo →
              </div>
            </Link>
          ))}
        </section>

      </div>
    </main>
  );
}