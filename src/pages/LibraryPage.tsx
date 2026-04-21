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

type Lang = "es" | "en" | "fr" | "pt";

export default function LibraryPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [aiBooks, setAiBooks] = useState<any[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 200);

  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userHistory, setUserHistory] = useState<Record<string, any>>({});

  const t = {
    es: {
      back: "Volver",
      recommended: "✨ Recomendado para ti",
      based: "IA basada en tu comportamiento"
    },
    en: {
      back: "Back",
      recommended: "✨ Recommended for you",
      based: "AI based on your behavior"
    },
    fr: {
      back: "Retour",
      recommended: "✨ Recommandé pour toi",
      based: "IA basée sur ton comportement"
    },
    pt: {
      back: "Voltar",
      recommended: "✨ Recomendado para você",
      based: "IA baseada no seu comportamento"
    }
  }[language as Lang];

  // 🔥 LOAD BOOKS + SCORE GLOBAL
  useEffect(() => {
    const loadBooks = async () => {
      try {
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

      } catch (err) {
        console.error(err);
      }
    };

    loadBooks();
    trackEvent({ type: "open_library" });
  }, []);

  // 🔥 HISTORIAL REACTIVO
  useEffect(() => {
    const raw = localStorage.getItem("drevaia_history");
    try {
      setUserHistory(raw ? JSON.parse(raw) : {});
    } catch {
      setUserHistory({});
    }
  }, []);

  // 🤖 IA REAL (embeddings backend)

useEffect(() => {
  if (!selectedBook || !isModalOpen || !books.length) return;

  setAiBooks([]);

  getAIRecommendations(selectedBook)
    .then((data) => {
      console.log("AI response:", data);

      setAiBooks(
        (Array.isArray(data) ? data : data?.data || []).map((b: any) => {
          const original = books.find((bk) => bk.id === b.id);

          return original ? { ...original } : null;
        }).filter(Boolean)
      );
    })
    .catch((err) => {
      console.error("AI error:", err);
    });

}, [selectedBook, isModalOpen, books]);

  const updateUserHistory = () => {
    const raw = localStorage.getItem("drevaia_history");
    try {
      setUserHistory(raw ? JSON.parse(raw) : {});
    } catch {
      setUserHistory({});
    }
  };

  // 🔥 OPEN MODAL
  const openPreview = (book: any) => {
    setSelectedBook(book);
    setIsModalOpen(true);

    addToHistory({
      id: book.id,
      title: book.title,
    });

    trackEvent({
      type: "open_book",
      meta: { id: book.id }
    });

    setTimeout(updateUserHistory, 50);
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

  // 🧠 FUNCIÓN IA (SIMILITUD SEMÁNTICA LIGHT)
  const getSimilarity = (a: any, b: any) => {
    if (!a || !b) return 0;

    let score = 0;

    if (a.collection && b.collection && a.collection === b.collection) {
      score += 5;
    }

    const textA = (a.title + " " + a.description).toLowerCase();
    const textB = (b.title + " " + b.description).toLowerCase();

    const wordsA = textA.split(" ");
    const wordsB = textB.split(" ");

    const overlap = wordsA.filter(w => wordsB.includes(w)).length;

    score += overlap * 0.1;

    return score;
  };

  // 🚀 MOTOR IA HÍBRIDO
  const recommendedBooks = useMemo(() => {
    if (!computedBooks.length) return [];

    const ranked = computedBooks.map((book) => {
      const history = userHistory[book.id] || { views: 0, clicks: 0 };

      const userScore =
        history.views * 2 +
        history.clicks * 6;

      const popularity = (book as any).score || 0;

      const similarity = selectedBook
        ? getSimilarity(book, selectedBook)
        : 0;

      // 🎯 exploración controlada
      const exploration = Math.random() * 2;

      const finalScore =
        userScore +
        popularity * 0.5 +
        similarity * 2 +
        exploration;

      return { ...book, finalScore };
    });

    return ranked
      .filter(b => b.id !== selectedBook?.id)
      .sort((a, b) => b.finalScore - a.finalScore)
      .slice(0, 4);

  }, [computedBooks, userHistory, selectedBook]);

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

        <div className="mb-10">
          <h3 className="mb-2">{t.recommended}</h3>
          <p className="text-xs text-gray-400 mb-4">{t.based}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {(aiBooks.length ? aiBooks : recommendedBooks).map((book: any) => (
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
        recommendedBooks={aiBooks.length > 0 ? aiBooks : recommendedBooks}
        onSelectBook={(book) => {
  setSelectedBook(book);
  setIsModalOpen(true);
  setTimeout(updateUserHistory, 50);
}}
      />
    </div>
  );
}