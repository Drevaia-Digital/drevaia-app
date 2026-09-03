import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import { posts } from "@/data/posts";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogIndexPage() {
  const { language, t } = useLanguage();

  const blog = t.blog;

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const categories = [
    {
      key: "selfEsteem",
      label: blog.categories.selfEsteem,
    },
    {
      key: "emotionalWounds",
      label: blog.categories.emotionalWounds,
    },
    {
      key: "relationships",
      label: blog.categories.relationships,
    },
    {
      key: "innerEmptiness",
      label: blog.categories.innerEmptiness,
    },
    {
      key: "personalGrowth",
      label: blog.categories.personalGrowth,
    },
  ];

  const handleSubscribe = async () => {
    if (!email.trim()) {
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage(blog.success);
        setEmail("");
      } else {
        setMessage(
          data.message || blog.sendError,
        );
      }
    } catch {
      setMessage(blog.connectionError);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return posts.filter((post) => {
      const title =
        post.title[language]?.toLowerCase() || "";

      const description =
        post.description[language]?.toLowerCase() || "";

      const matchesSearch =
        !term ||
        title.includes(term) ||
        description.includes(term);

      /*
       * The current post model does not expose a
       * structured category field.
       *
       * Until categories are modeled explicitly,
       * category filtering is intentionally limited
       * to matching the translated title/description.
       */
      const selectedCategory =
        categories.find(
          (category) =>
            category.key === activeCategory,
        );

      const matchesCategory =
        activeCategory === "all" ||
        (
          selectedCategory &&
          (
            title.includes(
              selectedCategory.label.toLowerCase(),
            ) ||
            description.includes(
              selectedCategory.label.toLowerCase(),
            )
          )
        );

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [
    search,
    activeCategory,
    language,
    categories,
  ]);

  const canonical =
    `https://drevaia.com/${language}/blog`;

  return (
    <>
      <Helmet>
        <html lang={language} />

        <title>
          {blog.title} | Drevaia
        </title>

        <meta
          name="description"
          content={blog.description}
        />

        <link
          rel="canonical"
          href={canonical}
        />

        <link
          rel="alternate"
          hrefLang="es"
          href="https://drevaia.com/es/blog"
        />

        <link
          rel="alternate"
          hrefLang="en"
          href="https://drevaia.com/en/blog"
        />

        <link
          rel="alternate"
          hrefLang="fr"
          href="https://drevaia.com/fr/blog"
        />

        <link
          rel="alternate"
          hrefLang="pt"
          href="https://drevaia.com/pt/blog"
        />

        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://drevaia.com/es/blog"
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:site_name"
          content="Drevaia Digital"
        />

        <meta
          property="og:title"
          content={blog.title}
        />

        <meta
          property="og:description"
          content={blog.description}
        />

        <meta
          property="og:url"
          content={canonical}
        />

        <meta
          property="og:image"
          content="https://drevaia.com/logo.png"
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content={blog.title}
        />

        <meta
          name="twitter:description"
          content={blog.description}
        />

        <meta
          name="twitter:image"
          content="https://drevaia.com/logo.png"
        />
      </Helmet>

      <main className="min-h-screen bg-[#090910] text-white px-4 py-20">
        <div className="max-w-7xl mx-auto">

          {/* NEWSLETTER */}

          <section className="mb-10 rounded-2xl border border-violet-400/20 bg-violet-500/10 px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            <div>
              <h2 className="font-semibold text-lg">
                {blog.newsletterTitle}
              </h2>

              <p className="text-sm text-gray-300">
                {blog.newsletterDescription}
              </p>

              <div className="mt-3">
                <input
                  type="email"
                  placeholder={blog.emailPlaceholder}
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
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
                {loading
                  ? blog.sending
                  : blog.accessFree}
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
              {blog.title}
            </h1>

            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {blog.description}
            </p>
          </header>

          {/* SEARCH */}

          <section className="mb-10">
            <input
              type="text"
              placeholder={blog.searchPlaceholder}
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              className="w-full max-w-3xl mx-auto block rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white"
            />
          </section>

          {/* CATEGORIES */}

          <section className="mb-14 flex flex-wrap gap-3 justify-start">

            <button
              onClick={() =>
                setActiveCategory("all")
              }
              className={`px-4 py-2 rounded-full transition ${
                activeCategory === "all"
                  ? "bg-violet-500"
                  : "border border-white/10 hover:bg-white/10"
              }`}
            >
              {blog.all}
            </button>

            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() =>
                  setActiveCategory(category.key)
                }
                className={`px-4 py-2 rounded-full transition ${
                  activeCategory === category.key
                    ? "bg-violet-500"
                    : "border border-white/10 hover:bg-white/10"
                }`}
              >
                {category.label}
              </button>
            ))}

          </section>

          {/* POSTS */}

          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">

            {filteredPosts.map((post) => (
              <Link
                key={post.slug[language]}
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
                  {blog.readArticle}
                </div>
              </Link>
            ))}

          </section>

          {/* CTA FINAL */}

          <section className="rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-600/20 to-white/5 p-10 text-center">

            <h2 className="text-4xl font-bold mb-4">
              {blog.ctaTitle}
            </h2>

            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              {blog.ctaDescription}
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">

              <Link
                to={`/${language}/empieza`}
                className="px-7 py-4 rounded-2xl bg-violet-500 hover:bg-violet-600"
              >
                {blog.startFree}
              </Link>

              <Link
                to={`/${language}/library`}
                className="px-7 py-4 rounded-2xl border border-white/10"
              >
                {blog.viewLibrary}
              </Link>

            </div>

          </section>

        </div>
      </main>
    </>
  );
}