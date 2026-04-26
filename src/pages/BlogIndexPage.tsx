import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { posts } from "@/data/posts";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogIndexPage() {
  const { language } = useLanguage();
  const [search, setSearch] = useState("");

  const featured = posts.slice(0, 3);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const title = post.title[language].toLowerCase();
      const desc = post.description[language].toLowerCase();
      const term = search.toLowerCase();

      return title.includes(term) || desc.includes(term);
    });
  }, [search, language]);

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white px-4 py-20">
      <div className="max-w-7xl mx-auto">

        {/* HERO */}
        <header className="text-center mb-14">
          <div className="inline-block px-4 py-2 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-300 text-sm mb-5">
            Drevaia Editorial
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
            Blog Drevaia
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sanación emocional, autoestima, relaciones y crecimiento interior.
          </p>
        </header>

        {/* SEARCH */}
        <section className="mb-14">
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder-gray-500 outline-none focus:border-violet-400 transition"
            />
          </div>
        </section>

        {/* FEATURED */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              Destacados
            </h2>

            <span className="text-sm text-gray-500">
              Lecturas esenciales
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((post, i) => (
              <Link
                key={i}
                to={`/${language}/blog/${post.slug[language]}`}
                className="rounded-3xl p-6 bg-gradient-to-br from-violet-600/20 to-white/5 border border-white/10 hover:border-violet-400/40 transition"
              >
                <div className="text-xs uppercase tracking-wider text-violet-300 mb-3">
                  Destacado
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {post.title[language]}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {post.description[language]}
                </p>

                <div className="mt-5 text-violet-300 text-sm">
                  Leer →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ALL POSTS */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              Todos los artículos
            </h2>

            <span className="text-sm text-gray-500">
              {filteredPosts.length} disponibles
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, i) => (
              <Link
                key={i}
                to={`/${language}/blog/${post.slug[language]}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-violet-400/30 transition"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {post.title[language]}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {post.description[language]}
                </p>

                <div className="mt-5 text-violet-300 text-sm">
                  Leer artículo →
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}