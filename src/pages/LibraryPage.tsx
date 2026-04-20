import { EbookCard } from '@/components/EbookCard';
import { BookPreviewModal } from '@/components/BookPreviewModal';
import { supabase } from '@/lib/supabase';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchBooks, getSmartRecommendations } from "@/engines/searchEngine";
import { useDebounce } from "@/hooks/useDebounce";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import { addToHistory } from "@/lib/userHistory";
import { ArrowLeft } from 'lucide-react';

type Lang = "es" | "en" | "fr" | "pt";

export default function LibraryPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [books, setBooks] = useState<any[]>([]);
  const [searchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 200);

  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = {
    es: {
      back: "Volver",
      recommended: "✨ Recomendado para ti",
      based: "Basado en tu actividad"
    },
    en: {
      back: "Back",
      recommended: "✨ Recommended for you",
      based: "Based on your activity"
    },
    fr: {
      back: "Retour",
      recommended: "✨ Recommandé pour toi",
      based: "Basé sur ton activité"
    },
    pt: {
      back: "Voltar",
      recommended: "✨ Recomendado para você",
      based: "Baseado na sua atividade"
    }
  }[language as Lang];

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    trackEvent({ type: "open_library" });
  }, []);

  const loadBooks = async () => {
    try {
      const cachedRaw = localStorage.getItem("drevaia_books");

      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw);
        const isFresh = Date.now() - cached.timestamp < 1000 * 60 * 10;

        if (isFresh && cached.data) {
          setBooks(cached.data);
          return;
        }
      }

      const { data: booksData } = await supabase.from('books').select('*');
      const { data: events } = await supabase.from("ebook_events").select("*");

      const scoreMap: Record<string, number> = {};

      (events || []).forEach((e: any) => {
        const weight = e.event_type === "click" ? 3 : 1;
        scoreMap[e.book_id] = (scoreMap[e.book_id] || 0) + weight;
      });

      const mapped = (booksData || [])
        .map((book: any) => ({
          ...book,
          coverImage: book.image || "",
          score: scoreMap[book.id] || 0,
        }))
        .sort((a, b) => b.score - a.score);

      setBooks(mapped);

      localStorage.setItem("drevaia_books", JSON.stringify({
        data: mapped,
        timestamp: Date.now()
      }));

    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 AQUÍ ACTIVAMOS HISTORIAL REAL
  const openPreview = (book: any) => {
    setSelectedBook(book);
    setIsModalOpen(true);

    // 👉 guarda en historial
    addToHistory({
      id: book.id,
      title: book.title,
    });

    // 👉 tracking
    trackEvent({
      type: "open_book",
      meta: { id: book.id }
    });
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

  // 🔥 HISTORIAL REAL
  const historyRaw = localStorage.getItem("drevaia_history");
  let userHistory: any[] = [];

  try {
    userHistory = historyRaw ? JSON.parse(historyRaw) : [];
  } catch {}

  // 🔥 RECOMENDACIÓN INTELIGENTE
  const recommendedBooks = useMemo(() => {
    let rec = getSmartRecommendations(computedBooks, userHistory);

    if (rec.length < 4) {
      const extra = computedBooks.filter(
        b => !rec.find(r => r.id === b.id)
      );

      rec = [...rec, ...extra].slice(0, 4);
    }

    return rec;
  }, [computedBooks, userHistory]);

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

        {/* 🔥 RECOMENDADO INTELIGENTE */}
        <div className="mb-10">
          <h3 className="mb-2">{t.recommended}</h3>
          <p className="text-xs text-gray-400 mb-4">{t.based}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {recommendedBooks.map((book: any) => (
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
      />
    </div>
  );
}