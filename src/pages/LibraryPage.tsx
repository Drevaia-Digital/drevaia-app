import { Input } from '@/components/ui/input';
import { EbookCard } from '@/components/EbookCard';
import { BookPreviewModal } from '@/components/BookPreviewModal';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronUp, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [searchQuery, selectedCategory, books]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(book =>
        book.title?.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter(book => book.category === selectedCategory);
    }

    setFilteredBooks(result);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToHome = () => {
    navigate('/');
  };

  const categories = [...new Set(books.map(b => b.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f1a] px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="relative aspect-[3/4] rounded-2xl bg-[#151528] overflow-hidden">
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/5 to-white/10" />
            </div>
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

          {/* 🔥 INPUT FIX DEFINITIVO */}
          <Input
  placeholder="Buscar libros..."
  value={searchQuery}
  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value)
  }
  className="bg-[#1a1a2e] border border-white/20 w-full max-w-md"
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
      <section className="py-16 max-w-7xl mx-auto px-6 relative z-20">

        {filteredBooks.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <BookOpen className="mx-auto mb-4 w-12 h-12 opacity-50" />
            No hay libros disponibles
          </div>
        )}

        {filteredBooks.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                className="fade-up"
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