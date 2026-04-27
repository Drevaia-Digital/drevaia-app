import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
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

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (data.success) {
        setMessage("¡Revisa tu email pronto!");
        setEmail("");
      } else {
        setMessage(data.message || "No se pudo enviar");
      }
    } catch {
      setMessage("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

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
    <>
      <Helmet>
        <title>Blog Drevaia | Sanación emocional y crecimiento interior</title>
        <meta
          name="description"
          content="Artículos profundos sobre autoestima, heridas emocionales, relaciones y transformación personal."
        />
        <link rel="canonical" href="https://drevaia.com/blog" />
      </Helmet>

      <main className="min-h-screen bg-[#090910] text-white px-4 py-20">
        <div className="max-w-7xl mx-auto">

          {/* TOP BAR */}
          <section className="mb-10 rounded-2xl border border-violet-400/20 bg-violet-500/10 px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            <div>
              <h2 className="font-semibold text-lg">
                Recibe guía emocional gratuita + recursos exclusivos
              </h2>

              <p className="text-sm text-gray-300">
                Reflexiones profundas + recursos exclusivos Drevaia.
              </p>

              <div className="mt-3">
                <input
                  type="email"
                  placeholder="Tu mejor email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-72 px-4 py-3 rounded-xl bg-white text-black border border-white/20 placeholder-gray-500 shadow-lg"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="px-5 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 transition disabled:opacity-60"
              >
                {loading ? "Enviando..." : "Acceder gratis"}
              </button>

              {message && (
                <p className="text-sm text-violet-200">
                  {message}
                </p>
              )}
            </div>

          </section>

          {/* HERO */}
          <header className="text-center mb-14">
            <h1 className="text-5xl md:text-7xl font-bold mb-5">
              Blog Drevaia
            </h1>

            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Sanación emocional, autoestima, relaciones y evolución interior.
            </p>
          </header>

          {/* SEARCH */}
          <section className="mb-10">
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-3xl mx-auto block rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white"
            />
          </section>

          {/* CATEGORIES */}
          <section className="mb-14 flex flex-wrap gap-3 justify-start">
            <button
              onClick={() => setActiveCategory("Todos")}
              className="px-4 py-2 rounded-full bg-violet-500"
            >
              Todos
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full border border-white/10"
              >
                {cat}
              </button>
            ))}
          </section>

          {/* POSTS */}
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {filteredPosts.map((post, i) => (
              <Link
                key={i}
                to={`/${language}/blog/${post.slug[language]}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-violet-400 transition"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {post.title[language]}
                </h3>

                <p className="text-gray-400 text-sm">
                  {post.description[language]}
                </p>

                <div className="mt-5 text-violet-300">
                  Leer artículo →
                </div>
              </Link>
            ))}
          </section>

          {/* CTA FINAL */}
          <section className="rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-600/20 to-white/5 p-10 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Cambia tu historia desde dentro
            </h2>

            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Accede a ebooks y herramientas profundas para reconstruirte emocionalmente.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                to="/empieza"
                className="px-7 py-4 rounded-2xl bg-violet-500 hover:bg-violet-600"
              >
                Empezar gratis
              </Link>

              <Link
                to="/library"
                className="px-7 py-4 rounded-2xl border border-white/10"
              >
                Ver biblioteca
              </Link>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}