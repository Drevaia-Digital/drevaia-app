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

export default function LibraryPage() {
  const navigate = useNavigate();

  const [books, setBooks] = useState<any[]>([]);
  const [showTop, setShowTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 250);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 🔥 LOAD
  useEffect(() => {
    loadBooks();
  }, []);

  // 🔥 SCROLL
  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔥 CTRL + K
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
      const cached = localStorage.getItem('books_cache');

      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setBooks(parsed);
        } catch {
          localStorage.removeItem('books_cache');
        }
      }

      const { data } = await supabase.from('books').select('*');

      if (data) {
        const mapped = data.map((book: any) => ({
          ...book,
          coverImage: book.image || "https://via.placeholder.com/300x400",
        }));

        setBooks(mapped);
        localStorage.setItem('books_cache', JSON.stringify(mapped));
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

  const categories = useMemo(() => {
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

  const searchResults = computedBooks.map(book => ({
    id: book.id,
    title: book.title,
    cover: book.coverImage || "https://via.placeholder.com/300x400",
    author: book.author || ""
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center text-white">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">

      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button onClick={() => navigate('/')} className="text-sm text-gray-400 hover:text-white flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* BUSCADOR */}
        <div
          onClick={() => setIsSearchOpen(true)}
          className="mb-6 cursor-text bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-neutral-400"
        >
          Buscar ebooks...
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

        {/* CATEGORÍAS */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <Button onClick={() => setSelectedCategory(null)}>Todos</Button>
          {categories.map(cat => (
            <Button key={cat} onClick={() => setSelectedCategory(cat)}>
              {cat}
            </Button>
          ))}
        </div>

        {/* TOP RESULTS */}
        {debouncedQuery && topResults.length > 0 && (
          <div className="mb-8">
            <p className="text-purple-400 mb-3 text-sm">Mejores resultados</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

        {/* RESTO */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

      {/* 🔥 BOTÓN FLOTANTE */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      <BookPreviewModal
        isOpen={isModalOpen}
        onClose={closePreview}
        book={selectedBook}
        recommendedBooks={[]}
      />

    </div>
  );
}