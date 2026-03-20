import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ExternalLink, Star, Clock, Tag, ChevronRight, Sparkles, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/sections/Navigation';
import { Footer } from '@/sections/Footer';
import { SEO } from '@/partials/SEO';
import { libraryEngine } from '@/engines/library-engine';
import { FavoriteButtonSupabase } from '@/components/FavoriteButtonSupabase';
import { useAnalytics, usePageTracking } from '@/hooks/useAnalytics';
import { useCart } from '@/hooks/useCart';
import type { Translations, Language } from '@/i18n';

interface BookDetailPageProps {
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
  link: string;
  slug: string;
  coverImage: string;
  tags: string[];
  category: string;
  featured: boolean;
  new: boolean;
  bestseller: boolean;
}

export function BookDetailPage({ t, language, changeLanguage }: BookDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { trackEvent } = useAnalytics();
  const { addItem, isInCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  usePageTracking(`/books/${slug}`);

  useEffect(() => {
    loadBook();
  }, [slug, language]);

  const handleAddToCart = () => {
    if (book) {
      const added = addItem({
        id: book.id,
        title: book.title,
        description: book.description,
        price: book.price,
        currency: book.currency,
        image: book.coverImage,
        slug: book.slug,
        type: 'book',
      });
      if (added) {
        setIsAdded(true);
        trackEvent('ecommerce', 'add_to_cart', book.title);
        setTimeout(() => setIsAdded(false), 2000);
      }
    }
  };

  const loadBook = async () => {
    if (!slug) return;
    
    setLoading(true);
    const bookData = await libraryEngine.getBookBySlug(slug, language);
    
    if (bookData) {
      setBook(bookData);
      
      // Load related books
      const related = await libraryEngine.getRelatedBooks(bookData.id, language, 3);
      setRelatedBooks(related);
      
      // Update SEO
      document.title = `${bookData.title} | Drevaia Digital`;
    } else {
      // Book not found, redirect to library
      navigate('/library');
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navigation t={t} language={language} changeLanguage={changeLanguage} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse flex flex-col items-center">
            <BookOpen className="w-16 h-16 text-purple-300 mb-4" />
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navigation t={t} language={language} changeLanguage={changeLanguage} />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <BookOpen className="w-16 h-16 text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">
            {language === 'es' ? 'Libro no encontrado' : language === 'en' ? 'Book not found' : language === 'fr' ? 'Livre non trouvé' : 'Livro não encontrado'}
          </p>
          <Link to="/library">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'es' ? 'Volver a la librería' : language === 'en' ? 'Back to library' : language === 'fr' ? 'Retour à la bibliothèque' : 'Voltar à biblioteca'}
            </Button>
          </Link>
        </div>
        <Footer t={t} />
      </div>
    );
  }

  const labels = {
    back: language === 'es' ? 'Volver' : language === 'en' ? 'Back' : language === 'fr' ? 'Retour' : 'Voltar',
    buyNow: language === 'es' ? 'Comprar ahora' : language === 'en' ? 'Buy now' : language === 'fr' ? 'Acheter maintenant' : 'Comprar agora',
    related: language === 'es' ? 'También te puede interesar' : language === 'en' ? 'You may also like' : language === 'fr' ? 'Vous aimerez aussi' : 'Também pode gostar',
    pages: language === 'es' ? 'páginas' : language === 'en' ? 'pages' : language === 'fr' ? 'pages' : 'páginas',
    category: language === 'es' ? 'Categoría' : language === 'en' ? 'Category' : language === 'fr' ? 'Catégorie' : 'Categoria',
    tags: language === 'es' ? 'Etiquetas' : language === 'en' ? 'Tags' : language === 'fr' ? 'Tags' : 'Tags',
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <SEO 
        title={`${book.title} | Drevaia Digital`}
        description={book.description}
        keywords={book.tags.join(', ')}
        ogImage={book.coverImage}
        language={language}
        canonicalUrl={`https://drevaia.com/books/${book.slug}`}
      />
      
      <Navigation t={t} language={language} changeLanguage={changeLanguage} />

      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/library" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {labels.back}
          </Link>
        </div>
      </div>

      {/* Book Detail */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Cover Image */}
            <div className="relative">
              <div className="aspect-[2/3] bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 rounded-2xl overflow-hidden shadow-2xl">
                {book.coverImage ? (
                  <img 
                    src={book.coverImage} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="w-24 h-24 text-purple-300" />
                  </div>
                )}
              </div>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {book.new && (
                  <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                    NEW
                  </span>
                )}
                {book.bestseller && (
                  <span className="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    BESTSELLER
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {book.category}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {book.title}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {book.subtitle}
              </p>

              <div className="flex items-center gap-4 mb-8 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {book.pages} {labels.pages}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {Math.ceil(book.pages / 30)} min read
                </span>
              </div>

              <div className="prose dark:prose-invert max-w-none mb-8">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {book.description}
                </p>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {labels.tags}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                <div className="flex-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {language === 'es' ? 'Precio' : language === 'en' ? 'Price' : language === 'fr' ? 'Prix' : 'Preço'}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${book.price}
                    </span>
                    <span className="text-gray-500">{book.currency}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <FavoriteButtonSupabase
                    id={book.id}
                    type="book"
                    title={book.title}
                    url={`/books/${book.slug}`}
                    image={book.coverImage}
                    language={language}
                    variant="outline"
                    size="lg"
                  />
                  <Button 
                    size="lg" 
                    variant={isInCart(book.id) ? 'default' : 'outline'}
                    onClick={handleAddToCart}
                    disabled={isInCart(book.id)}
                    className={isInCart(book.id) ? 'bg-green-600 hover:bg-green-700' : ''}
                  >
                    {isAdded || isInCart(book.id) ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        {language === 'es' ? 'En carrito' : language === 'en' ? 'In cart' : language === 'fr' ? 'Dans le panier' : 'No carrinho'}
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {language === 'es' ? 'Agregar' : language === 'en' ? 'Add to cart' : language === 'fr' ? 'Ajouter' : 'Adicionar'}
                      </>
                    )}
                  </Button>
                  <a 
                    href={book.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('ecommerce', 'purchase_click', book.title)}
                  >
                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600">
                      {labels.buyNow}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {labels.related}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedBooks.map((relatedBook) => (
                <Link 
                  key={relatedBook.id} 
                  to={`/books/${relatedBook.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-40 bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-purple-400" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {relatedBook.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                      {relatedBook.subtitle}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 dark:text-white">
                        ${relatedBook.price}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer t={t} />
    </div>
  );
}
