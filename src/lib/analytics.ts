import { supabase } from "@/lib/supabase";

const ALLOWED_EVENTS = new Set([
  "open_library",
  "open_book",
  "open_book_from_portal",
]);

export async function trackEvent({
  type,
  bookId = null,
  meta = {},
}: {
  type: string;
  bookId?: string | null;
  meta?: { id?: string | number } | null;
}) {
  if (!ALLOWED_EVENTS.has(type)) {
    console.warn("Analytics event ignored:", type);
    return;
  }

  const resolvedBookId =
    bookId ?? (meta?.id != null ? String(meta.id) : null);

  try {
    const { error } = await supabase
      .from("ebook_events")
      .insert({
        book_id: resolvedBookId,
        event_type: type,
      });

    if (error) {
      console.error("Analytics error:", error.message);
    }
  } catch (error) {
    console.error("Analytics error:", error);
  }
}