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
  currency: string;
  pages: number;
  slug: string;
  coverImage: string;
  tags: string[];
  category: string;
  featured: boolean;
  new: boolean;
  bestseller: boolean;
  buy_url: string;
}

interface LibraryData {
  meta: {
    title: string;
    description: string;
    flag: string;
  };
  collection: {
    name: string;
    subtitle: string;
    description: string;
  };
  books: Book[];
}

export function LibraryPage({ language }: LibraryPageProps) {
  const [libraryData, setLibraryData] = useState<LibraryData | null>(null);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadLibrary();
  }, [language]);

  useEffect(() => {
    if (libraryData) filterBooks();
  }, [searchQuery, selectedCategory, libraryData]);

  const loadLibrary = async () => {
    const { data, error } = await supabase.from('books').select('*');

    if (error) {
      console.error(error);
      return;
    }

    const formatted = {
      meta: {
        title: "Biblioteca Drevaia",
        description: "",
        flag: "📚"
      },
      collection: {
        name: "Colección",
        subtitle: "",
        description: ""
      },
      books: data.map((book: any) => ({
        id: book.id,
        title: book.title,
        subtitle: book.subtitle || "",
        description: book.description || "",
        author: book.author || "Noa Drevaia",
        price: book.price,
        currency: "USD",
        pages: 0,
        slug: book.slug || book.title.toLowerCase().replace(/\s+/g, "-"),
        coverImage: book.image,
        buy_url: book.buy_url,
        tags: [],
        category: book.category,
        featured: true,
        new: false,
        bestseller: false
      }))
    };

    setLibraryData(formatted);
    setFilteredBooks(formatted.books);
  };

  const filterBooks = () => {
    if (!libraryData) return;

    let books = [...libraryData.books];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      books = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      books = books.filter(book => book.category === selectedCategory);
    }

    setFilteredBooks(books);
  };

  const categories = libraryData 
    ? [...new Set(libraryData.books.map(b => b.category))]
    : [];

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">

      {/* HERO */}
      <section className="py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {libraryData?.meta?.title}
        </h1>
        <p className="text-gray-400">
          {libraryData?.collection?.description}
        </p>
      </section>

      {/* BUSCADOR */}
      <section className="py-6 border-b border-white/10 sticky top-0 bg-[#0f0f1a] z-40">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-4">

          <Input
            placeholder="Buscar libros..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#1a1a2e] border border-white/20 text-white placeholder:text-gray-400"
          />

          <div className="flex gap-2 overflow-x-auto">

            <Button
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={`${
                selectedCategory === null
                  ? 'bg-gradient-to-r from-purple-600 to-amber-400 text-white'
                  : 'bg-[#1a1a2e] text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              Todos
            </Button>

            {categories.map((category) => (
              <Button
                key={category}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-amber-400 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {category}
              </Button>
            ))}

          </div>
        </div>
      </section>

      {/* LIBROS */}
      <section className="py-16 max-w-7xl mx-auto px-4">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <a href={book.buy_url} target="_blank" rel="noopener noreferrer" className="group">
      <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-5 hover:scale-105 hover:shadow-xl transition-all duration-300">

        <img
          src={book.coverImage || '/fallback.jpg'}
          className="w-full h-64 object-contain mb-4"
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