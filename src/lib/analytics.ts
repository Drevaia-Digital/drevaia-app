import { supabase } from "@/lib/supabase";

export async function trackEvent({
  type,
  bookId = null,
  meta = {}
}: {
  type: string;
  bookId?: string | null;
  meta?: any;
}) {
  try {
    await supabase.from("ebook_events").insert([
      {
        book_id: bookId,
        event_type: type,
        meta,
        created_at: new Date().toISOString()
      }
    ]);
  } catch (e) {
    console.error("Analytics error", e);
  }
}