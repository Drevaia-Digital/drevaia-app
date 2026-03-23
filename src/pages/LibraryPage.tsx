import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { BookOpen, Search, Filter, ChevronRight, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navigation } from '@/sections/Navigation';
import { Footer } from '@/sections/Footer';
// import { SEO, seoConfigs } from '@/partials/SEO';
import type { Translations, Language } from '@/i18n';

interface LibraryPageProps {
  t: Translations;
  language: Language;
  changeLanguage: (lang: Language) => void;
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
  buy_url: string; // 👈 AÑADE ESTO
}

interface Collection {
  name: string;
  subtitle: string;
  description: string;
}

interface LibraryData {
  meta: {
    title: string;
    description: string;
    flag: string;
  };
  collection: Collection;
  books: Book[];
}

export function LibraryPage({ t, language, changeLanguage }: LibraryPageProps) {
  const [libraryData, setLibraryData] = useState<LibraryData | null>(null);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // const seo = seoConfigs.library(language);

  useEffect(() => {
    loadLibrary();
  }, [language]);

  useEffect(() => {
    if (libraryData) {
      filterBooks();
    }
  }, [searchQuery, selectedCategory, libraryData]);

  const loadLibrary = async () => {
  setLoading(true);

  const { data, error } = await supabase
    .from('books')
    .select('*');

  if (error) {
    console.error(error);
    setLoading(false);
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
  setLoading(false);
};

  const filterBooks = () => {
    if (!libraryData) return;

    let books = [...libraryData.books];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      books = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query) ||
        book.tags.some(tag => tag.toLowerCase().includes(query))
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

  const featuredBooks = libraryData?.books.filter(b => b.featured) || [];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">

      {/* SEO desactivado temporal */}
      
      <Navigation t={t} language={language} changeLanguage={changeLanguage} />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              {libraryData?.meta?.flag} {libraryData?.collection?.name}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {libraryData?.meta?.title || 'Biblioteca Drevaia'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              {libraryData?.collection?.description}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-500" />
                {libraryData?.books?.length || 0} eBooks
              </span>
              <span>•</span>
              <span>4 idiomas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder={language === 'es' ? 'Buscar libros...' : language === 'en' ? 'Search books...' : language === 'fr' ? 'Rechercher des livres...' : 'Buscar livros...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                <Filter className="w-4 h-4 mr-1" />
                {language === 'es' ? 'Todos' : language === 'en' ? 'All' : language === 'fr' ? 'Tous' : 'Todos'}
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      {!searchQuery && !selectedCategory && featuredBooks.length > 0 && (
        <section className="py-16 bg-purple-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
              <Star className="w-6 h-6 text-amber-500" />
              {language === 'es' ? 'Destacados' : language === 'en' ? 'Featured' : language === 'fr' ? 'En Vedette' : 'Destaques'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBooks.map((book) => (
                <BookCard key={book.id} book={book} language={language} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Books */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {language === 'es' ? 'Todos los Libros' : language === 'en' ? 'All Books' : language === 'fr' ? 'Tous les Livres' : 'Todos os Livros'}
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({filteredBooks.length})
            </span>
          </h2>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-96" />
              ))}
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} language={language} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {language === 'es' ? 'No se encontraron libros' : language === 'en' ? 'No books found' : language === 'fr' ? 'Aucun livre trouvé' : 'Nenhum livro encontrado'}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer t={t} />
    </div>
  );
}

interface BookCardProps {
  book: Book;
  language: Language;
}

function BookCard({ book, language }: BookCardProps) {
  return (
    <a href={book.buy_url} target="_blank" rel="noopener noreferrer" className="group">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        {/* Cover */}
        <div className="relative h-64 bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 flex items-center justify-center overflow-hidden">
          {book.coverImage ? (
            <img 
              src={book.coverImage} 
              alt={book.title}
              className="w-full h-full object-contain p-4"
            />
          ) : (
            <div className="text-center p-6">
              <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 line-clamp-2">
                {book.title}
              </h3>
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {book.new && (
              <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                NEW
              </span>
            )}
            {book.bestseller && (
              <span className="px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                BEST
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-2">
            {book.category}
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
            {book.subtitle}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-1">
            {book.description}
          </p>
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ${book.price}
              </span>
              <span className="text-xs text-gray-500">{book.currency}</span>
            </div>
            <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400 text-sm font-medium">
              {language === 'es' ? 'Ver más' : language === 'en' ? 'View more' : language === 'fr' ? 'Voir plus' : 'Ver mais'}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
