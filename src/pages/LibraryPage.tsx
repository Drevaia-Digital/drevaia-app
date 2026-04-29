import { EbookCard } from '@/components/EbookCard';
import { BookPreviewModal } from '@/components/BookPreviewModal';
import { supabase } from '@/lib/supabase';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { searchBooks } from "@/engines/searchEngine";
import { useDebounce } from "@/hooks/useDebounce";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import { addToHistory } from "@/lib/userHistory";
import { ArrowLeft, ArrowUp } from 'lucide-react';
import type { Book } from "@/types/book";
import { getAIRecommendations } from "@/lib/aiBackend";

export default function LibraryPage() {
  const [showTop, setShowTop] = useState(false);
  const [showOffer, setShowOffer] = useState(false);

  const navigate = useNavigate();
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();

  const [books, setBooks] = useState<Book[]>([]);
  const [aiBooks, setAiBooks] = useState<any[]>([]);
  const [aiCache, setAiCache] = useState<Record<string, any[]>>({});

  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 200);

  // 🌍 MULTI IDIOMA PREMIUM
  const translations = {
    es: {
      back: "Volver",
      recommended: "✨ Recomendado para ti",
      based: "IA basada en tu comportamiento",
      all: "📚 Todos los ebooks",

      heroBadge: "Nuevo Ebook Bestseller",
      heroTitle: "No sé qué hacer con mi vida",
      heroDesc:
        "Una guía profunda para salir del bloqueo interno, recuperar claridad emocional y encontrar dirección real.",
      buyNow: "Comprar Ahora — $9",
      viewLibrary: "Ver Biblioteca",

      popupTitle: "¿Te sientes perdido?",
      popupDesc:
        "Descubre la guía creada para recuperar claridad, dirección y calma interior.",
      popupBuy: "Comprar Ahora — $9",
    },

    en: {
      back: "Back",
      recommended: "✨ Recommended for you",
      based: "AI based on your behavior",
      all: "📚 All ebooks",

      heroBadge: "New Bestseller Ebook",
      heroTitle: "I Don't Know What To Do With My Life",
      heroDesc:
        "A deep guide to overcome inner blocks, regain clarity, and find real direction.",
      buyNow: "Buy Now — $9",
      viewLibrary: "View Library",

      popupTitle: "Feeling Lost?",
      popupDesc:
        "Discover the guide created to restore clarity, direction, and inner calm.",
      popupBuy: "Buy Now — $9",
    },

    fr: {
      back: "Retour",
      recommended: "✨ Recommandé pour toi",
      based: "IA basée sur ton comportement",
      all: "📚 Tous les ebooks",

      heroBadge: "Nouvel Ebook Bestseller",
      heroTitle: "Je ne sais pas quoi faire de ma vie",
      heroDesc:
        "Un guide profond pour sortir du blocage intérieur, retrouver de la clarté et une vraie direction.",
      buyNow: "Acheter — $9",
      viewLibrary: "Voir Bibliothèque",

      popupTitle: "Tu te sens perdu ?",
      popupDesc:
        "Découvre le guide créé pour retrouver clarté, direction et paix intérieure.",
      popupBuy: "Acheter — $9",
    },

    pt: {
      back: "Voltar",
      recommended: "✨ Recomendado para você",
      based: "IA baseada no seu comportamento",
      all: "📚 Todos os ebooks",

      heroBadge: "Novo Ebook Bestseller",
      heroTitle: "Não sei o que fazer com a minha vida",
      heroDesc:
        "Um guia profundo para sair do bloqueio interno, recuperar clareza e encontrar direção real.",
      buyNow: "Comprar Agora — $9",
      viewLibrary: "Ver Biblioteca",

      popupTitle: "Sentindo-se perdido?",
      popupDesc:
        "Descubra o guia criado para recuperar clareza, direção e paz interior.",
      popupBuy: "Comprar Agora — $9",
    },
  };

  const lang =
    (language in translations ? language : "es") as keyof typeof translations;

  const t = translations[lang];

  // 🧠 PERFIL USUARIO
  const getUserProfile = () => {
    const raw = localStorage.getItem("drevaia_history");
    const history = raw ? JSON.parse(raw) : {};

    return Object.entries(history)
      .map(([id, data]: any) => ({
        id,
        score: data.views * 2 + data.clicks * 5,
      }))
      .sort((a, b) => b.score - a.score);
  };

  // 🔥 POPUP OFERTA
  useEffect(() => {
    const seen = sessionStorage.getItem("drevaia_offer_seen");

    if (seen) return;

    const timer = setTimeout(() => {
      setShowOffer(true);
      sessionStorage.setItem("drevaia_offer_seen", "1");
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  // 🔥 CARGAR LIBROS
  useEffect(() => {
    const loadBooks = async () => {
      const { data: booksData } = await supabase
        .from("books")
        .select("*");

      const { data: events } = await supabase
        .from("ebook_events")
        .select("*");

      const scoreMap: Record<string, number> = {};

      (events || []).forEach((e: any) => {
        const weight = e.event_type === "click" ? 3 : 1;
        scoreMap[e.book_id] = (scoreMap[e.book_id] || 0) + weight;
      });

      const mapped = (booksData || []).map((book: Book) => ({
        ...book,
        coverImage: book.image || "",
        score: scoreMap[book.id] || 0,
      }));

      setBooks(mapped);
    };

    loadBooks();
    trackEvent({ type: "open_library" });
  }, []);

  // 🎯 ABRIR DESDE URL
  useEffect(() => {
    if (!books.length) return;

    const targetId = searchParams.get("book");
    if (!targetId) return;

    const found = books.find(
      (b: any) => String(b.id) === String(targetId)
    );

    if (found) {
      setSelectedBook(found);
      setIsModalOpen(true);

      addToHistory({
        id: found.id,
        title: found.title,
      });

      trackEvent({
        type: "open_book_from_portal",
        meta: { id: found.id },
      });
    }
  }, [books, searchParams]);

  // 🔝 BOTÓN TOP
  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🤖 IA PROACTIVA
  useEffect(() => {
    if (!books.length) return;

    const profile = getUserProfile();

    const baseBook = profile.length
      ? books.find((b) => b.id === profile[0].id)
      : books[0];

    if (!baseBook) return;

    if (aiCache[baseBook.id]) {
      setAiBooks(aiCache[baseBook.id]);
      return;
    }

    getAIRecommendations(baseBook)
      .then((data) => {
        const mapped = (Array.isArray(data)
          ? data
          : data?.data || []
        )
          .map((b: any) => {
            const original = books.find(
              (bk) => bk.id === b.id
            );

            return original ? { ...original } : null;
          })
          .filter(Boolean);

        setAiBooks(mapped);

        setAiCache((prev) => ({
          ...prev,
          [baseBook.id]: mapped,
        }));
      })
      .catch(() => setAiBooks([]));
  }, [books]);

  const openPreview = (book: any) => {
    setSelectedBook(book);
    setIsModalOpen(true);

    addToHistory({
      id: book.id,
      title: book.title,
    });

    trackEvent({
      type: "open_book",
      meta: { id: book.id },
    });
  };

  const closePreview = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBook(null), 200);
  };

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const computedBooks = useMemo(() => {
    return searchBooks(books || [], {
      query: debouncedQuery,
      category: "all",
    });
  }, [books, debouncedQuery]);

  const getTitle = (book: any) =>
    book[`title_${language}`] || book.title;

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">

      {/* TOP */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button
          onClick={() => navigate("/")}
          className="text-gray-400 hover:text-white flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.back}
        </button>
      </div>

      {/* HERO VENTAS PREMIUM */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="grid md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-[#151526] to-[#0f0f1a] rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">

          {/* TEXTO */}
          <div>
            <p className="text-purple-400 text-sm mb-3 uppercase tracking-[0.25em]">
              {t.heroBadge}
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
              {t.heroTitle}
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              {t.heroDesc}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://payhip.com/b/EkKRT"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold transition shadow-lg"
              >
                {t.buyNow}
              </a>

              <a
                href="#catalogo"
                className="border border-white/20 hover:border-white/40 px-6 py-3 rounded-xl font-semibold transition"
              >
                {t.viewLibrary}
              </a>
            </div>
          </div>

          {/* MOCKUP */}
          <div className="flex justify-center">
            <img
              src="/images/mockup-vida.webp"
              alt={t.heroTitle}
              className="w-full max-w-md rounded-2xl shadow-2xl hover:scale-[1.02] transition duration-500"
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div
        id="catalogo"
        className="max-w-7xl mx-auto px-6 py-10"
      >

        {/* IA */}
        {aiBooks.length > 0 && (
          <div className="mb-12">
            <h3 className="mb-2 text-xl font-semibold">
              {t.recommended}
            </h3>

            <p className="text-xs text-gray-400 mb-5">
              {t.based}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {aiBooks.map((book: any) => (
                <EbookCard
                  key={book.id}
                  id={book.id}
                  title={getTitle(book)}
                  cover={book.coverImage || ""}
                  price={book.price}
                  onClick={() => openPreview(book)}
                />
              ))}
            </div>
          </div>
        )}

        {/* CATÁLOGO */}
        <div>
          <h3 className="mb-6 text-xl font-semibold">
            {t.all}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {computedBooks.map((book: any) => (
              <EbookCard
                key={book.id}
                id={book.id}
                title={getTitle(book)}
                cover={book.coverImage || ""}
                price={book.price}
                onClick={() => openPreview(book)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MODAL LIBRO */}
      <BookPreviewModal
        isOpen={isModalOpen}
        onClose={closePreview}
        book={selectedBook}
        recommendedBooks={aiBooks}
        onSelectBook={(book) => {
          setSelectedBook(book);
          setIsModalOpen(true);
        }}
      />

      {/* POPUP OFERTA */}
      {showOffer && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-[#141424] rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl text-center relative">

            <button
              onClick={() => setShowOffer(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>

            <img
              src="/images/mockup-vida.webp"
              alt={t.heroTitle}
              className="w-40 mx-auto mb-5 rounded-xl"
            />

            <h3 className="text-2xl font-bold mb-3">
              {t.popupTitle}
            </h3>

            <p className="text-gray-300 mb-6">
              {t.popupDesc}
            </p>

            <a
              href="https://payhip.com/b/EkKRT"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold transition"
            >
              {t.popupBuy}
            </a>
          </div>
        </div>
      )}

      {/* BOTÓN TOP */}
      {showTop && (
        <button
          onClick={goTop}
          className="fixed bottom-6 right-6 z-40 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-2xl transition"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}