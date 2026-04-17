import { PremiumSearch } from "@/components/PremiumSearch";
import { EbookCard } from '@/components/EbookCard';
import { BookPreviewModal } from '@/components/BookPreviewModal';
import { supabase } from '@/lib/supabase';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);

  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 🌍 TEXTOS MULTIIDIOMA
  const t = {
    es: {
      back: "Volver",
      search: "Buscar en Drevaia...",
      all: "Todos",
      featured: "RESULTADOS DESTACADOS",
      loading: "Cargando biblioteca..."
    },
    en: {
      back: "Back",
      search: "Search in Drevaia...",
      all: "All",
      featured: "FEATURED RESULTS",
      loading: "Loading library..."
    },
    fr: {
      back: "Retour",
      search: "Rechercher dans Drevaia...",
      all: "Tous",
      featured: "RÉSULTATS EN VEDETTE",
      loading: "Chargement de la bibliothèque..."
    },
    pt: {
      back: "Voltar",
      search: "Buscar no Drevaia...",
      all: "Todos",
      featured: "RESULTADOS EM DESTAQUE",
      loading: "Carregando biblioteca..."
    }
  }[language as Lang];

  // 🚀 LOAD
  useEffect(() => {
    loadBooks();
  }, []);

  // 🚀 SCROLL
  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🚀 CTRL + K
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const loadBooks = async () => {
    setLoading(true);

    try {
      const { data } = await supabase.from('books').select('*');

      if (data) {
        const mapped = data.map((book: any) => ({
          ...book,
          coverImage: book.image || "https://via.placeholder.com/300x400",
          link:
            book.buy_url_es ||
            book.buy_url_en ||
            book.buy_url_fr ||
            book.buy_url_pt ||
            "",
        }));

        setBooks(mapped);
      }

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

  // 🧠 SEARCH
  const computedBooks = useMemo(() => {
    return searchBooks(books || [], {
      query: debouncedQuery,
      category: selectedCategory || "all",
    });
  }, [books, debouncedQuery, selectedCategory]);

  const topResults = useMemo(() => {
    if (!debouncedQuery) return [];
    return computedBooks.slice(0, 3);
  }, [computedBooks, debouncedQuery]);

  const otherResults = useMemo(() => {
    if (!debouncedQuery) return computedBooks;
    return computedBooks.slice(3);
  }, [computedBooks, debouncedQuery]);

  // 🔥 CATEGORÍAS DINÁMICAS (TRADUCCIÓN)
  const rawCategories = useMemo(() => {
    return Array.from(
      new Map(
        (books || [])
          .filter(b => b.category)
          .map(b => [
            b.category.trim().toLowerCase(),
            b.category.trim()
          ])
      ).values()
    );
  }, [books]);

  const categoryMap: Record<string, Record<Lang, string>> = {
    "bienestar": {
      es: "Bienestar",
      en: "Wellbeing",
      fr: "Bien-être",
      pt: "Bem-estar"
    },
    "desarrollo personal": {
      es: "Desarrollo Personal",
      en: "Personal Growth",
      fr: "Développement personnel",
      pt: "Desenvolvimento pessoal"
    },
    "sanación": {
      es: "Sanación",
      en: "Healing",
      fr: "Guérison",
      pt: "Cura"
    },
    "bienestar emocional": {
      es: "Bienestar emocional",
      en: "Emotional Wellness",
      fr: "Bien-être émotionnel",
      pt: "Bem-estar emocional"
    }
  };

  const translateCategory = (cat: string) => {
    const key = cat.toLowerCase();
    return categoryMap[key]?.[language as Lang] || cat;
  };

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

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button
          onClick={() => navigate('/')}
          className="text-gray-400 hover:text-white flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.back}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* SEARCH */}
        <div
          onClick={() => setIsSearchOpen(true)}
          className="mb-8 cursor-text bg-neutral-900/70 border border-neutral-700 rounded-xl px-4 py-3 text-neutral-400 backdrop-blur"
        >
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

        {/* CATEGORIES */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          <Button onClick={() => setSelectedCategory(null)}>
            {t.all}
          </Button>

          {rawCategories.map(cat => (
            <Button key={cat} onClick={() => setSelectedCategory(cat)}>
              {translateCategory(cat)}
            </Button>
          ))}
        </div>

        {/* TOP RESULTS */}
        {debouncedQuery && topResults.length > 0 && (
          <div className="mb-10">
            <p className="text-purple-400 mb-3 text-sm tracking-wider">
              {t.featured}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {topResults.map(book => (
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
        )}

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {(debouncedQuery ? otherResults : computedBooks).map(book => (
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

      {/* 🔥 SCROLL */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-full shadow-xl hover:scale-110 transition"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* MODAL */}
      <BookPreviewModal
        isOpen={isModalOpen}
        onClose={closePreview}
        book={selectedBook}
      />

    </div>
  );
}