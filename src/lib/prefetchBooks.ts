
import { supabase } from "@/lib/supabase";

const CACHE_KEY = "drevaia_books";
const CACHE_TIME = 1000 * 60 * 10;

export async function prefetchBooks(force = false) {
  try {
    const cachedRaw = localStorage.getItem(CACHE_KEY);

    if (cachedRaw && !force) {
      const cached = JSON.parse(cachedRaw);

      const isFresh =
        Date.now() - cached.timestamp < CACHE_TIME;

      if (isFresh) {
        return cached.data;
      }
    }

    const { data: booksData, error } = await supabase
      .from("books")
      .select("*");

    if (error) {
      console.error("Books prefetch error:", error.message);
      return [];
    }

    const mapped = (booksData || []).map((book: any) => ({
      ...book,
      coverImage: book.image || "",
      score: 0,
    }));

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data: mapped,
        timestamp: Date.now(),
      })
    );

    return mapped;
  } catch (error) {
    console.error("Prefetch error:", error);
    return [];
  }
}
