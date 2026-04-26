import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { posts } from "@/data/posts";
import { useLanguage } from "@/context/LanguageContext";

const categories = [
  "Autoestima",
  "Heridas emocionales",
  "Relaciones",
  "Vacío interior",
  "Crecimiento personal"
];

export default function BlogIndexPage() {
  const { language } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const featured = posts.slice(0, 3);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const title = post.title[language].toLowerCase();
      const desc = post.description[language].toLowerCase();
      const term = search.toLowerCase();

      const matchesSearch =
        title.includes(term) || desc.includes(term);

      const matchesCategory =
        activeCategory === "Todos" ||
        title.includes(activeCategory.toLowerCase()) ||
        desc.includes(activeCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory, language]);

  return (
    <main className="min-h-screen bg-[#090910] text-white px-4 py-20">
      <div className="max-w-7xl mx-auto">

        {/* HERO */}
        <header className="text-center mb-14">
          <div className="inline-block px-4 py-2 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-300 text-sm mb-5">
            Drevaia Editorial
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-5">
            Blog Drevaia
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sanación emocional, autoestima, relaciones y evolución interior.
          </p>
        </header>

        {/* SEARCH */}
        <section className="mb-8">
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder-gray-500 outline-none focus:border-violet-400"
            />
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="mb-14">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setActiveCategory("Todos")}
              className={`px-4 py-2 rounded-full border text-sm ${
                activeCategory === "Todos"
                  ? "bg-violet-500 text-white border-violet-500"
                  : "border-white/10 text-gray-300"
              }`}
            >
              Todos
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full border text-sm ${
                  activeCategory === cat
                    ? "bg-violet-500 text-white border-violet-500"
                    : "border-white/10 text-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* FEATURED */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">
            Destacados
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((post, i) => (
              <Link
                key={i}
                to={`/${language}/blog/${post.slug[language]}`}
                className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:border-violet-400/40 transition"
              >
                <div className="h-40 bg-gradient-to-br from-violet-600/30 to-white/5"></div>

                <div className="p-6">
                  <div className="text-xs uppercase text-violet-300 mb-3">
                    Destacado
                  </div>

                  <h3 className="text-xl font-semibold mb-3">
                    {post.title[language]}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {post.description[language]}
                  </p>

                  <div className="mt-5 text-violet-300 text-sm">
                    Leer →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ALL POSTS */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">
            Todos los artículos
          </h2>

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

                <p className="text-gray-400 text-sm">
                  {post.description[language]}
                </p>

                <div className="mt-5 text-violet-300 text-sm">
                  Leer artículo →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-600/10 to-white/5 p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Empieza tu transformación hoy
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Accede a ebooks y herramientas profundas para sanar heridas emocionales,
            elevar autoestima y cambiar tu historia.
          </p>

          <Link
            to="/empieza"
            className="inline-block px-7 py-4 rounded-2xl bg-violet-500 hover:bg-violet-600 transition font-medium"
          >
            Comenzar ahora
          </Link>
        </section>

      </div>
    </main>
  );
}