import { supabase } from "@/lib/supabase";

const CACHE_KEY = "drevaia_books";
const CACHE_TIME = 1000 * 60 * 10; // 10 minutos

export async function prefetchBooks(force = false) {
  try {
    const cachedRaw = localStorage.getItem(CACHE_KEY);

    if (cachedRaw && !force) {
      const cached = JSON.parse(cachedRaw);

      const isFresh = Date.now() - cached.timestamp < CACHE_TIME;

      if (isFresh) {
        // ⚡ cache válido → no hacer request
        return cached.data;
      }
    }

    // 🚀 fetch real
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

    // 💾 guardar con timestamp
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: mapped,
      timestamp: Date.now()
    }));

    return mapped;

  } catch (err) {
    console.error("Prefetch error", err);
    return [];
  }
}