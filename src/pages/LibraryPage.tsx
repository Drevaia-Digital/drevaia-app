import { PremiumSearch } from "@/components/PremiumSearch";
import { EbookCard } from '@/components/EbookCard';
import { BookPreviewModal } from '@/components/BookPreviewModal';
import { supabase } from '@/lib/supabase';
import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchBooks } from "@/engines/searchEngine";
import { useDebounce } from "@/hooks/useDebounce";
import { useLanguage } from "@/context/LanguageContext";

type Lang = "es" | "en" | "fr" | "pt";

export default function LibraryPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [books, setBooks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 200);
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);

  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const t = {
    es: {
      back: "Volver",
      search: "Buscar en Drevaia...",
      loading: "Cargando biblioteca..."
    },
    en: {
      back: "Back",
      search: "Search in Drevaia...",
      loading: "Loading library..."
    },
    fr: {
      back: "Retour",
      search: "Rechercher dans Drevaia...",
      loading: "Chargement..."
    },
    pt: {
      back: "Voltar",
      search: "Buscar no Drevaia...",
      loading: "Carregando..."
    }
  }[language as Lang];

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadBooks = async () => {
    setLoading(true);

    try {
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
          coverImage: book.image || "https://via.placeholder.com/300x400",
          score: scoreMap[book.id] || 0,
        }))
        .sort((a, b) => b.score - a.score);

      setBooks(mapped);

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const openPreview = (book: any) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closePreview = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBook(null), 200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const computedBooks = useMemo(() => {
    return searchBooks(books || [], {
      query: debouncedQuery,
      category: "all",
    });
  }, [books, debouncedQuery]);

  // 🔥 INTELIGENCIA
  const topBook = computedBooks[0];
  const trendingBooks = computedBooks.slice(0, 3);

  const userHistory = JSON.parse(localStorage.getItem("drevaia_history") || "[]");

  const recommendedBooks = computedBooks
    .filter((book: any) => userHistory.includes(book.id))
    .slice(0, 3);

  const searchResults = computedBooks.map(book => ({
    id: book.id,
    title: book.title,
    cover: book.coverImage || "https://via.placeholder.com/300x400",
    author: book.author || ""
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center text-white">
        {t.loading}
      </div>
    );
  }

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

        {/* 🔥 MÁS POPULAR */}
        {!debouncedQuery && topBook && (
          <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <p className="text-sm mb-2">🔥 Más popular</p>
            <h2 className="text-xl font-bold mb-3">{topBook.title}</h2>
            <button onClick={() => openPreview(topBook)} className="bg-white text-black px-4 py-2 rounded-lg">
              Ver ahora
            </button>
          </div>
        )}

        {/* 🚀 TRENDING */}
        {!debouncedQuery && (
          <div className="mb-10">
            <h3 className="mb-4">🔥 Tendencia</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {trendingBooks.map((book: any, i: number) => (
                <div key={book.id} onClick={() => openPreview(book)} className="cursor-pointer p-4 bg-white/5 rounded-xl">
                  #{i + 1} {book.title}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🧠 RECOMENDADO */}
        {recommendedBooks.length > 0 && (
          <div className="mb-10">
            <h3 className="mb-4">✨ Recomendado para ti</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {recommendedBooks.map((book: any) => (
                <div key={book.id} onClick={() => openPreview(book)} className="cursor-pointer p-4 bg-white/5 rounded-xl">
                  {book.title}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEARCH */}
        <div onClick={() => setIsSearchOpen(true)} className="mb-8 bg-neutral-900 p-3 rounded-xl">
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

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {(debouncedQuery ? computedBooks : computedBooks).map(book => (
            <EbookCard
              key={book.id}
              id={book.id}
              title={book.title}
              cover={book.coverImage || "https://via.placeholder.com/300x400"}
              price={book.price}
              onClick={() => openPreview(book)}
            />
          ))}
        </div>

      </div>

      {showTop && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 bg-purple-600 p-3 rounded-full">
          <ChevronUp />
        </button>
      )}

      <BookPreviewModal isOpen={isModalOpen} onClose={closePreview} book={selectedBook} />

    </div>
  );
}