import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, ChevronUp, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LibraryPage() {
  const navigate = useNavigate();

  const [books, setBooks] = useState<any[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);

  // 🔥 CARGAR LIBROS (FIX DEFINITIVO)
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
      const { data, error } = await supabase
        .from('books')
        .select('*');

      if (error) {
        console.error(error);
        setBooks([]);
        setFilteredBooks([]);
      } else {
        const mapped = (data || []).map((book: any) => ({
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
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      setBooks([]);
      setFilteredBooks([]);
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToHome = () => {
    navigate('/');
  };

  const categories = [...new Set(books.map(b => b.category))];

  // 🔥 LOADING (FIX PANTALLA NEGRA)
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center text-white">
        Cargando ebooks...
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
      <section className="py-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-4 items-center">

          <Input
            placeholder="Buscar libros..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#1a1a2e] border border-white/20 w-full max-w-md"
          />

          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button onClick={() => setSelectedCategory(null)} className="whitespace-nowrap">
              Todos
            </Button>

            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="whitespace-nowrap"
              >
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

            {filteredBooks.map((book) => (
              <a
                key={book.id}
                href={book.buy_url || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="bg-[#151528] rounded-2xl overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300">

                  <img
                    src={book.coverImage}
                    loading="lazy"
                    className="w-full h-64 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-bold mb-1">{book.title}</h3>

                    <div className="flex justify-between mt-3">
                      <span className="text-amber-400 font-bold">
                        ${book.price}
                      </span>

                      <span className="flex items-center text-purple-400 text-sm">
                        Ver <ChevronRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>

                  </div>

                </div>
              </a>
            ))}

          </div>
        )}

      </section>

      {/* BOTÓN SUBIR */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-110 text-white p-3 rounded-full shadow-xl transition-all duration-300"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}