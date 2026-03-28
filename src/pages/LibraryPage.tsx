import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen } from 'lucide-react';

export function LibraryPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [searchQuery, selectedCategory, books]);

  const loadBooks = async () => {
    setLoading(true);

    const { data, error } = await supabase
  .from('books')
  .select('*');

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      setLoading(false);
      return;
    }

    const mapped = (data || []).map((book: any) => ({
      ...book,
      coverImage: book.image || "https://via.placeholder.com/300x400"
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
        book.title?.toLowerCase().includes(q) ||
        book.description?.toLowerCase().includes(q)
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
        <h1 className="text-4xl font-bold mb-4">
          Biblioteca Drevaia
        </h1>
        <p className="text-gray-400">
          {books.length} ebooks disponibles
        </p>
      </section>

      {/* SEARCH */}
      <section className="py-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-4">

          <Input
            placeholder="Buscar libros..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#1a1a2e] border border-white/20"
          />

          <div className="flex gap-2 overflow-x-auto">
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

      {/* CONTENT */}
      <section className="py-16 max-w-7xl mx-auto px-4">

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-64 bg-[#1a1a2e] animate-pulse rounded-xl" />
            ))}
          </div>
        )}

        {!loading && filteredBooks.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <BookOpen className="mx-auto mb-4 w-12 h-12 opacity-50" />
            No hay libros disponibles
          </div>
        )}

        {!loading && filteredBooks.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filteredBooks.map((book) => (
              <a
                key={book.id}
                href={book.buy_url}
                target="_blank"
                className="group"
              >
                <div className="bg-[#151528] rounded-2xl overflow-hidden hover:scale-105 transition">

                  <img
                    src={book.coverImage}
                    className="w-full h-64 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-bold mb-1">{book.title}</h3>
                    <p className="text-sm text-gray-400">{book.subtitle}</p>

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

    </div>
  );
}