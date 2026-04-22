import { EbookCard } from '@/components/EbookCard';
import { BookPreviewModal } from '@/components/BookPreviewModal';
import { supabase } from '@/lib/supabase';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchBooks } from "@/engines/searchEngine";
import { useDebounce } from "@/hooks/useDebounce";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import { addToHistory } from "@/lib/userHistory";
import { ArrowLeft } from 'lucide-react';
import type { Book } from "@/types/book";
import { getAIRecommendations } from "@/lib/aiBackend";

export default function LibraryPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [books, setBooks] = useState<Book[]>([]);
  const [aiBooks, setAiBooks] = useState<any[]>([]);
  const [aiCache, setAiCache] = useState<Record<string, any[]>>({});

  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 200);

  // 🧠 PERFIL USUARIO
  const getUserProfile = () => {
    const raw = localStorage.getItem("drevaia_history");
    const history = raw ? JSON.parse(raw) : {};

    return Object.entries(history)
      .map(([id, data]: any) => ({
        id,
        score: data.views * 2 + data.clicks * 5
      }))
      .sort((a, b) => b.score - a.score);
  };

  // 🌍 MULTI IDIOMA
  const translations = {
    es: {
      back: "Volver",
      recommended: "✨ Recomendado para ti",
      based: "IA basada en tu comportamiento",
      all: "📚 Todos los ebooks"
    },
    en: {
      back: "Back",
      recommended: "✨ Recommended for you",
      based: "AI based on your behavior",
      all: "📚 All ebooks"
    },
    fr: {
      back: "Retour",
      recommended: "✨ Recommandé pour toi",
      based: "IA basée sur ton comportement",
      all: "📚 Tous les ebooks"
    },
    pt: {
      back: "Voltar",
      recommended: "✨ Recomendado para você",
      based: "IA baseada no seu comportamento",
      all: "📚 Todos os ebooks"
    }
  };

  const lang = (language in translations ? language : "es") as keyof typeof translations;
  const t = translations[lang];

  // 🔥 CARGAR LIBROS
  useEffect(() => {
    const loadBooks = async () => {
      const { data: booksData } = await supabase.from('books').select('*');
      const { data: events } = await supabase.from("ebook_events").select("*");

      const scoreMap: Record<string, number> = {};

      (events || []).forEach((e: any) => {
        const weight = e.event_type === "click" ? 3 : 1;
        scoreMap[e.book_id] = (scoreMap[e.book_id] || 0) + weight;
      });

      const mapped = (booksData || []).map((book: Book) => ({
        ...book,
        coverImage: book.image || "",
        score: scoreMap[book.id] || 0,
      }));

      setBooks(mapped);
    };

    loadBooks();
    trackEvent({ type: "open_library" });
  }, []);

  // 🤖 IA PROACTIVA (SIN BUGS)
  useEffect(() => {
    if (!books.length) return;

    const profile = getUserProfile();

    const baseBook =
      profile.length
        ? books.find(b => b.id === profile[0].id)
        : books[0];

    if (!baseBook) return;

    if (aiCache[baseBook.id]) {
      setAiBooks(aiCache[baseBook.id]);
      return;
    }

    getAIRecommendations(baseBook)
      .then((data) => {
        const mapped =
          (Array.isArray(data) ? data : data?.data || [])
            .map((b: any) => {
              const original = books.find((bk) => bk.id === b.id);
              return original ? { ...original } : null;
            })
            .filter(Boolean);

        setAiBooks(mapped);

        setAiCache(prev => ({
          ...prev,
          [baseBook.id]: mapped
        }));
      })
      .catch(() => setAiBooks([]));

  }, [books]);

  const openPreview = (book: any) => {
    setSelectedBook(book);
    setIsModalOpen(true);

    addToHistory({ id: book.id, title: book.title });

    trackEvent({ type: "open_book", meta: { id: book.id } });
  };

  const closePreview = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBook(null), 200);
  };

  const computedBooks = useMemo(() => {
    return searchBooks(books || [], {
      query: debouncedQuery,
      category: "all",
    });
  }, [books, debouncedQuery]);

  const getTitle = (book: any) =>
    book[`title_${language}`] || book.title;

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">

      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button
          onClick={() => navigate('/')}
          className="text-gray-400 hover:text-white flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.back}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* 🤖 IA */}
        {aiBooks.length > 0 && (
          <div className="mb-12">
            <h3 className="mb-2">{t.recommended}</h3>
            <p className="text-xs text-gray-400 mb-4">{t.based}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {aiBooks.map((book: any) => (
                <EbookCard
                  key={book.id}
                  id={book.id}
                  title={getTitle(book)}
                  cover={book.coverImage || ""}
                  price={book.price}
                  onClick={() => openPreview(book)}
                />
              ))}
            </div>
          </div>
        )}

        {/* 📚 CATÁLOGO */}
        <div>
          <h3 className="mb-6">{t.all}</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {computedBooks.map((book: any) => (
              <EbookCard
                key={book.id}
                id={book.id}
                title={getTitle(book)}
                cover={book.coverImage || ""}
                price={book.price}
                onClick={() => openPreview(book)}
              />
            ))}
          </div>
        </div>

      </div>

      <BookPreviewModal
        isOpen={isModalOpen}
        onClose={closePreview}
        book={selectedBook}
        recommendedBooks={aiBooks}
        onSelectBook={(book) => {
          setSelectedBook(book);
          setIsModalOpen(true);
        }}
      />
    </div>
  );
}