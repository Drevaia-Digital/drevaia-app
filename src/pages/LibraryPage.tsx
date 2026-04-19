import { PremiumSearch } from "@/components/PremiumSearch";
import { EbookCard } from '@/components/EbookCard';
import { BookPreviewModal } from '@/components/BookPreviewModal';
import { supabase } from '@/lib/supabase';
import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchBooks, getSmartRecommendations } from "@/engines/searchEngine";
import { useDebounce } from "@/hooks/useDebounce";
import { useLanguage } from "@/context/LanguageContext";
import { SkeletonCard } from "@/components/SkeletonCard";

type Lang = "es" | "en" | "fr" | "pt";

export default function LibraryPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [books, setBooks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 200);
  const [showTop, setShowTop] = useState(false);

  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 🌍 COPY MULTIIDIOMA CENTRALIZADO
  const t = {
    es: {
      back: "Volver",
      search: "Buscar en Drevaia...",
      trending: "🔥 Tendencia",
      top: "🔥 Más popular",
      view: "Ver ahora",
      recommended: "✨ Recomendado para ti",
      based: "Basado en tu actividad"
    },
    en: {
      back: "Back",
      search: "Search in Drevaia...",
      trending: "🔥 Trending",
      top: "🔥 Most popular",
      view: "View now",
      recommended: "✨ Recommended for you",
      based: "Based on your activity"
    },
    fr: {
      back: "Retour",
      search: "Rechercher...",
      trending: "🔥 Tendance",
      top: "🔥 Populaire",
      view: "Voir",
      recommended: "✨ Recommandé pour toi",
      based: "Basé sur ton activité"
    },
    pt: {
      back: "Voltar",
      search: "Buscar...",
      trending: "🔥 Tendência",
      top: "🔥 Mais popular",
      view: "Ver",
      recommended: "✨ Recomendado para você",
      based: "Baseado na sua atividade"
    }
  }[language as Lang];

  // ⚡ CACHE INSTANTÁNEO
  useEffect(() => {
    const cachedRaw = localStorage.getItem("drevaia_books");
    if (cachedRaw) {
      try {
        const cached = JSON.parse(cachedRaw);
        setBooks(cached.data || []);
      } catch {}
    }
  }, []);

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 250);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadBooks = async () => {
    try {
      const cachedRaw = localStorage.getItem("drevaia_books");

      if (cachedRaw) {
        try {
          const cached = JSON.parse(cachedRaw);
          const isFresh = Date.now() - cached.timestamp < 1000 * 60 * 10;

          if (isFresh && cached.data) {
            setBooks(cached.data);
            return;
          }
        } catch {}
      }

      const { data: booksData } = await supabase.from('books').select('*');
      const { data: events } = await supabase.from("ebook_events").select("*");

      const scoreMap: Record<string, number> = {};

      (events || []).forEach((e: any) => {
        const weight = e.event_type === "click" ? 3 : 1;
        scoreMap[e.book_id] = (scoreMap[e.book_id] || 0) + weight;
      });

      const mapped = (booksData || [])
        .map((book: any) => ({
          ...book,
          coverImage: book.image || "",
          score: scoreMap[book.id] || 0,
        }))
        .sort((a, b) => b.score - a.score);

      setBooks(mapped);

      localStorage.setItem("drevaia_books", JSON.stringify({
        data: mapped,
        timestamp: Date.now()
      }));

    } catch (err) {
      console.error(err);
    }
  };

  const openPreview = (book: any) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closePreview = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBook(null), 200);
  };

  const computedBooks = useMemo(() => {
    return searchBooks(books || [], {
      query: debouncedQuery,
      category: "all",
    });
  }, [books, debouncedQuery]);

  const topBook = computedBooks[0];
  const trendingBooks = computedBooks.slice(0, 3);

  const historyRaw = localStorage.getItem("drevaia_history");
  const userHistory = historyRaw ? JSON.parse(historyRaw) : {};

  let recommendedBooks = getSmartRecommendations(computedBooks, userHistory);

  // 🔥 fallback inteligente
  if (recommendedBooks.length < 4) {
    const extra = computedBooks.filter(
      b => !recommendedBooks.find(r => r.id === b.id)
    );
    recommendedBooks = [...recommendedBooks, ...extra].slice(0, 4);
  }

  const getTitle = (book: any) =>
    book[`title_${language}`] || book.title;

  const searchResults = computedBooks.map(book => ({
    id: book.id,
    title: getTitle(book),
    cover: book.coverImage || "",
    author: book.author || ""
  }));

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">

      {/* BACK */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          {t.back}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* TOP */}
        {!debouncedQuery && topBook && (
          <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600">
            <p className="text-sm mb-2">{t.top}</p>
            <h2 className="text-xl font-bold mb-3">{getTitle(topBook)}</h2>
            <button onClick={() => openPreview(topBook)} className="bg-white text-black px-4 py-2 rounded-lg">
              {t.view}
            </button>
          </div>
        )}

        {/* TRENDING */}
        {!debouncedQuery && (
          <div className="mb-10">
            <h3 className="mb-4">{t.trending}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {trendingBooks.map((book: any, i: number) => (
                <div key={book.id} onClick={() => openPreview(book)} className="cursor-pointer p-4 bg-white/5 rounded-xl hover:bg-white/10 transition">
                  #{i + 1} {getTitle(book)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RECOMENDADO PRO */}
        {recommendedBooks.length > 0 && (
          <div className="mb-10">
            <h3 className="mb-2">{t.recommended}</h3>
            <p className="text-xs text-gray-400 mb-4">{t.based}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {recommendedBooks.map((book: any) => (
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

        {/* SEARCH */}
        <div onClick={() => setIsSearchOpen(true)} className="mb-8 bg-neutral-900 p-3 rounded-xl cursor-pointer">
          {t.search}
        </div>

        <PremiumSearch
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          results={searchResults}
          onSelectBook={(book) => {
            const real = books.find(b => b.id === book.id);
            if (real) openPreview(real);
          }}
        />

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {computedBooks.length === 0
            ? Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : computedBooks.map(book => (
                <EbookCard
                  key={book.id}
                  id={book.id}
                  title={getTitle(book)}
                  cover={book.coverImage || ""}
                  price={book.price}
                  onClick={() => openPreview(book)}
                />
              ))
          }
        </div>

      </div>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 bg-purple-600 p-3 rounded-full"
        >
          <ChevronUp />
        </button>
      )}

      <BookPreviewModal
        isOpen={isModalOpen}
        onClose={closePreview}
        book={selectedBook}
      />

    </div>
  );
}