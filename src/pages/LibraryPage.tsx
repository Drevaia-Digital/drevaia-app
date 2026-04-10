import { PremiumSearch } from "@/components/PremiumSearch";
import { EbookCard } from '@/components/EbookCard';
import { BookPreviewModal } from '@/components/BookPreviewModal';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronUp, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDeferredValue } from "react";
import { SkeletonCard } from "@/components/SkeletonCard";

export default function LibraryPage() {
  const navigate = useNavigate();

  const [books, setBooks] = useState<any[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);

  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔥 NUEVO
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 🔥 PERFORMANCE PRO
  const deferredSearch = useDeferredValue(searchQuery);

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [deferredSearch, selectedCategory, books]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          setFilteredBooks(parsed);
        } catch {
          localStorage.removeItem('books_cache');
        }
      }

      const { data, error } = await supabase.from('books').select('*');

      if (!error && data) {
        const mapped = data.map((book: any) => ({
          ...book,
          coverImage: book.image || "https://via.placeholder.com/300x400",
          buy_url:
            book.buy_url_es ||
            book.buy_url_en ||
            book.buy_url_fr ||
            book.buy_url_pt ||
            ""
        }));

        setBooks(mapped);
        setFilteredBooks(mapped);
        localStorage.setItem('books_cache', JSON.stringify(mapped));
      }

    } catch (err) {
      console.error("Error inesperado:", err);
    }

    setLoading(false);
  };

  const filterBooks = () => {
  let result = [...books];

  if (deferredSearch) {
  const q = (deferredSearch || "").toLowerCase().trim();

  result = result.filter(book => {
    const title = (book.title || "").toLowerCase();
    const author = (book.author || "").toLowerCase();

    return title.includes(q) || author.includes(q);
  });
}

  if (selectedCategory) {
    const selected = selectedCategory.toLowerCase().trim();

    result = result.filter(book =>
      book.category?.toLowerCase().trim() === selected
    );
  }

  setFilteredBooks(result);
};

  const openPreview = (book: any) => {
  requestAnimationFrame(() => {
    setSelectedBook(book);
    setIsModalOpen(true);
  });
};
    
  const closePreview = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBook(null), 200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToHome = () => {
    navigate('/');
  };

  const categories = Array.from(
  new Map(
    books.map(b => [
      b.category?.trim().toLowerCase(),
      b.category?.trim()
    ])
  ).values()
);

const searchResults = filteredBooks.map(book => ({
  id: book.id,
  title: book.title,
  cover: book.coverImage,
  author: book.author || ""
}));

  if (loading) {
  return (
    <div className="min-h-screen bg-[#0f0f1a] px-4 sm:px-6 py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
        {[...Array(10)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white overflow-x-hidden">

      {/* VOLVER */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button
          onClick={goToHome}
          className="text-sm text-gray-400 hover:text-white flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </button>
      </div>

      {/* HERO */}
      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Biblioteca Drevaia
        </h1>
        <p className="text-gray-400">
          {filteredBooks.length} ebooks disponibles
        </p>
      </section>

      {/* BUSCADOR */}
      <section className="py-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-4 items-center">

          {/* 🔥 INPUT FAKE */}
          <div
            onClick={() => setIsSearchOpen(true)}
            className="w-full md:w-80 cursor-text bg-neutral-900/60 border border-neutral-700 rounded-xl px-4 py-3 text-neutral-400 hover:border-neutral-500 transition"
          >
            Buscar en Drevaia Digital...
          </div>

          {/* 🔥 PREMIUM SEARCH */}
          <PremiumSearch
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            results={searchResults}
            onSelectBook={(book) => {
  const realBook = books.find(b => b.id === book.id);
  if (!realBook) return;

  setIsSearchOpen(false); // 🔥 primero cerramos

  requestAnimationFrame(() => {
    openPreview(realBook); // 🔥 luego abrimos fluido
  });
}}
          />

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            <Button onClick={() => setSelectedCategory(null)}>
              Todos
            </Button>

            {categories.map((cat) => (
              <Button key={cat} onClick={() => setSelectedCategory(cat)}>
                {cat}
              </Button>
            ))}
          </div>

        </div>
      </section>

      {/* LIBROS */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 relative z-20">

        {filteredBooks.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <BookOpen className="mx-auto mb-4 w-12 h-12 opacity-50" />
            No hay libros disponibles
          </div>
        )}

        {filteredBooks.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">

            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <EbookCard
                  id={book.id}
                  title={book.title}
                  cover={book.coverImage}
                  price={book.price}
                  onClick={() => openPreview(book)}
                />
              </div>
            ))}

          </div>
        )}

      </section>

      {/* BOTÓN SCROLL */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-110 text-white p-3 rounded-full shadow-xl transition-all duration-300"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* MODAL */}
      <BookPreviewModal
        isOpen={isModalOpen}
        onClose={closePreview}
        book={
          selectedBook
            ? {
                id: selectedBook.id,
                title: selectedBook.title,
                description: selectedBook.description || "Descripción no disponible",
                link: selectedBook.buy_url,
                collection: selectedBook.category || "Colección",
                cover: selectedBook.coverImage,
              }
            : null
        }
      />

    </div>
  );
}