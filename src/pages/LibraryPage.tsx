import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { Language } from '@/i18n';

interface LibraryPageProps {
  language: Language;
}

interface Book {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  author: string;
  price: number;
  coverImage: string;
  category: string;
  buy_url: string;
}

export function LibraryPage({ language }: LibraryPageProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, [language]);

  useEffect(() => {
    filterBooks();
  }, [searchQuery, selectedCategory, books]);

  const loadBooks = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('books')
      .select('id,title,subtitle,description,price,image,category,buy_url_es,buy_url_en,buy_url_fr,buy_url_pt');

    if (error) {
      console.error("SUPABASE ERROR:", error);
      setLoading(false);
      return;
    }

    console.log("DATA SUPABASE:", data);

    const mapped = (data || []).map((book: any) => ({
      id: book.id,
      title: book.title || "Sin título",
      subtitle: book.subtitle || "",
      description: book.description || "",
      author: "Noa Drevaia",
      price: book.price || 0,
      coverImage: book.image || "https://via.placeholder.com/300x400",
      buy_url:
        language === 'es'
          ? book.buy_url_es
          : language === 'en'
          ? book.buy_url_en
          : language === 'fr'
          ? book.buy_url_fr
          : book.buy_url_pt,
      category: book.category || "General"
    }));

    setBooks(mapped);
    setFilteredBooks(mapped);
    setLoading(false);
  };

  const filterBooks = () => {
    let result = [...books];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(book =>
        book.title.toLowerCase().includes(q) ||
        book.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter(book => book.category === selectedCategory);
    }

    setFilteredBooks(result);
  };

  const categories = [...new Set(books.map(b => b.category))];

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">

      {/* HERO */}
      <section className="py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Biblioteca Drevaia
        </h1>
      </section>

      {/* BUSCADOR */}
      <section className="py-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-4">

          <Input
            placeholder="Buscar libros..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#1a1a2e] border border-white/20 text-white placeholder:text-gray-400 w-full md:max-w-md"
          />

          <div className="flex gap-2 overflow-x-auto">

            <Button
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null
                ? 'bg-gradient-to-r from-purple-600 to-amber-400'
                : 'bg-[#1a1a2e] border border-white/20'}
            >
              Todos
            </Button>

            {categories.map((cat) => (
              <Button
                key={cat}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-amber-400'
                  : 'bg-[#1a1a2e] border border-white/20'}
              >
                {cat}
              </Button>
            ))}

          </div>
        </div>
      </section>

      {/* LIBROS */}
      <section className="py-16 max-w-7xl mx-auto px-4">

        {loading && (
          <p className="text-center text-gray-400">Cargando libros...</p>
        )}

        {!loading && filteredBooks.length === 0 && (
          <p className="text-center text-gray-500">
            No hay libros disponibles
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

      </section>

    </div>
  );
}

function BookCard({ book }: any) {
  return (
    <a
      href={book.buy_url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <div className="bg-[#151528] border border-white/15 shadow-md rounded-2xl p-5 
                      hover:scale-105 hover:shadow-xl transition-all duration-300">

        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-64 object-cover mb-4 rounded-xl"
        />

        <h3 className="text-white font-bold mb-1">
          {book.title}
        </h3>

        <p className="text-gray-400 text-sm mb-3">
          {book.subtitle}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-amber-300 font-bold text-lg">
            ${book.price}
          </span>

          <span className="text-sm text-purple-400 flex items-center">
            Ver más <ChevronRight className="w-4 h-4 ml-1" />
          </span>
        </div>

      </div>
    </a>
  );
}