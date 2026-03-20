import { useState, useMemo } from 'react';
import { ExternalLink, BookOpen, Sparkles, Globe, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookPreviewModal } from '@/components/BookPreviewModal';
import type { Translations, Language } from '@/i18n';

interface EbooksProps {
  t: Translations;
  language: Language;
}

interface Ebook {
  title: string;
  description: string;
  link: string;
}

interface Collection {
  id: string;
  name: string;
  subtitle: string;
  language: string;
  flag: string;
  books: Ebook[];
}

// Book links are constant across all languages
const bookLinks = {
  es: [
    'https://payhip.com/b/m0sQ3',
    'https://payhip.com/b/wlN02',
    'https://payhip.com/b/Y9KTs',
    'https://payhip.com/b/Wz0IG',
    'https://payhip.com/b/Ftkd6',
    'https://payhip.com/b/n9MHe',
  ],
  en: [
    'https://payhip.com/b/8QCbG',
    'https://payhip.com/b/R4MKv',
    'https://payhip.com/b/DGOd6',
    'https://payhip.com/b/BYviE',
    'https://payhip.com/b/hUBy5',
    'https://payhip.com/b/bDfr2',
  ],
  fr: [
    'https://payhip.com/b/VjwyZ',
    'https://payhip.com/b/CDaeN',
    'https://payhip.com/b/HQ1Lb',
    'https://payhip.com/b/6xTwV',
    'https://payhip.com/b/0qfyH',
    'https://payhip.com/b/9B3r0',
  ],
  pt: [
    'https://payhip.com/b/mcWN5',
    'https://payhip.com/b/bXhB7',
    'https://payhip.com/b/3BvRa',
    'https://payhip.com/b/OWV4T',
    'https://payhip.com/b/IRvw1',
    'https://payhip.com/b/HTeu4',
  ],
};

export function Ebooks({ t, language }: EbooksProps) {
  const [selectedBook, setSelectedBook] = useState<{
    title: string;
    description: string;
    link: string;
    collection: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Build collections dynamically from translations, ordered by selected language
  const collections: Collection[] = useMemo(() => {
    const library = t.ebooks.library;
    const collectionsConfig = t.ebooks.collections;
    
    const allCollections: Collection[] = [
      {
        id: 'es',
        name: collectionsConfig.es.name,
        subtitle: collectionsConfig.es.subtitle,
        language: 'es',
        flag: '🇪🇸',
        books: [
          { title: library.book1.title, description: library.book1.description, link: bookLinks.es[0] },
          { title: library.book2.title, description: library.book2.description, link: bookLinks.es[1] },
          { title: library.book3.title, description: library.book3.description, link: bookLinks.es[2] },
          { title: library.book4.title, description: library.book4.description, link: bookLinks.es[3] },
          { title: library.book5.title, description: library.book5.description, link: bookLinks.es[4] },
          { title: library.book6.title, description: library.book6.description, link: bookLinks.es[5] },
        ],
      },
      {
        id: 'en',
        name: collectionsConfig.en.name,
        subtitle: collectionsConfig.en.subtitle,
        language: 'en',
        flag: '🇬🇧',
        books: [
          { title: library.book1.title, description: library.book1.description, link: bookLinks.en[0] },
          { title: library.book2.title, description: library.book2.description, link: bookLinks.en[1] },
          { title: library.book3.title, description: library.book3.description, link: bookLinks.en[2] },
          { title: library.book4.title, description: library.book4.description, link: bookLinks.en[3] },
          { title: library.book5.title, description: library.book5.description, link: bookLinks.en[4] },
          { title: library.book6.title, description: library.book6.description, link: bookLinks.en[5] },
        ],
      },
      {
        id: 'fr',
        name: collectionsConfig.fr.name,
        subtitle: collectionsConfig.fr.subtitle,
        language: 'fr',
        flag: '🇫🇷',
        books: [
          { title: library.book1.title, description: library.book1.description, link: bookLinks.fr[0] },
          { title: library.book2.title, description: library.book2.description, link: bookLinks.fr[1] },
          { title: library.book3.title, description: library.book3.description, link: bookLinks.fr[2] },
          { title: library.book4.title, description: library.book4.description, link: bookLinks.fr[3] },
          { title: library.book5.title, description: library.book5.description, link: bookLinks.fr[4] },
          { title: library.book6.title, description: library.book6.description, link: bookLinks.fr[5] },
        ],
      },
      {
        id: 'pt',
        name: collectionsConfig.pt.name,
        subtitle: collectionsConfig.pt.subtitle,
        language: 'pt',
        flag: '🇧🇷',
        books: [
          { title: library.book1.title, description: library.book1.description, link: bookLinks.pt[0] },
          { title: library.book2.title, description: library.book2.description, link: bookLinks.pt[1] },
          { title: library.book3.title, description: library.book3.description, link: bookLinks.pt[2] },
          { title: library.book4.title, description: library.book4.description, link: bookLinks.pt[3] },
          { title: library.book5.title, description: library.book5.description, link: bookLinks.pt[4] },
          { title: library.book6.title, description: library.book6.description, link: bookLinks.pt[5] },
        ],
      },
    ];
    
    // Sort collections: selected language first, then others in consistent order
    const languageOrder: Language[] = ['es', 'en', 'fr', 'pt'];
    const sortedLanguages = [language, ...languageOrder.filter(lang => lang !== language)];
    
    return sortedLanguages.map(langId => 
      allCollections.find(c => c.id === langId)!
    );
  }, [t, language]);

  const openPreview = (book: Ebook, collectionName: string) => {
    setSelectedBook({ ...book, collection: collectionName });
    setIsModalOpen(true);
  };

  return (
    <section
      id="ebooks"
      className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden transition-colors duration-300"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-100 via-amber-50 to-purple-100 dark:from-purple-900/20 dark:via-amber-900/20 dark:to-purple-900/20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            {t.ebooks.subtitle}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            {t.ebooks.title}
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            {t.ebooks.description}
          </p>
          <div className="mt-4 md:mt-6 flex items-center justify-center gap-2 text-purple-600 dark:text-purple-400">
            <Globe className="w-5 h-5" />
            <span className="text-sm font-medium">{t.ebooks.booksCount}</span>
          </div>
        </div>

        {/* Collections */}
        <div className="space-y-16 md:space-y-20">
          {collections.map((collection) => (
            <div key={collection.id}>
              {/* Collection Header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 md:mb-8">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-500 to-amber-500 rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-lg flex-shrink-0">
                  {collection.flag}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    {collection.name}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium text-sm md:text-base">
                    {collection.subtitle}
                  </p>
                </div>
              </div>

              {/* Books Grid - Always visible on all devices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {collection.books.map((book, bookIndex) => (
                  <div
                    key={bookIndex}
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Book Cover Placeholder */}
                    <div className="relative h-40 md:h-48 bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-amber-500/10" />
                      <div className="relative text-center px-4 md:px-6">
                        <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-purple-400 mx-auto mb-2 md:mb-3" />
                        <h4 className="text-xs md:text-sm font-bold text-gray-800 dark:text-gray-200 line-clamp-3 leading-snug">
                          {book.title}
                        </h4>
                      </div>
                      {/* Hover Overlay - Hidden on touch devices */}
                      <div className="hidden md:flex absolute inset-0 bg-purple-900/80 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-sm font-medium flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          {t.ebooks.buyNow}
                        </span>
                      </div>
                    </div>

                    {/* Book Content */}
                    <div className="p-4 md:p-5">
                      <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mb-3 md:mb-4 line-clamp-3 leading-relaxed">
                        {book.description}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openPreview(book, collection.name)}
                          className="flex-1 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-300 dark:hover:border-purple-600 rounded-xl text-xs md:text-sm"
                        >
                          <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          {t.ebooks.viewMore}
                        </Button>
                        <a
                          href={book.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white rounded-xl text-xs md:text-sm"
                          >
                            {t.ebooks.buyNow}
                            <ExternalLink className="w-3 h-3 md:w-4 md:h-4 ml-1" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Preview Modal */}
        <BookPreviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          book={selectedBook}
        />

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-amber-500 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 text-white mx-4">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
              {t.ebooks.exploreAll}
            </h3>
            <p className="text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
              {t.ebooks.exploreDesc}
            </p>
            <a
              href="https://payhip.com/DrevaiaDigital"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-white text-purple-700 hover:bg-white/90 rounded-full px-6 md:px-8 shadow-lg text-sm md:text-base"
              >
                {t.ebooks.visitStore}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
