import { supabase } from "@/lib/supabase";

type TrackEventInput = {
  type: string;
  bookId?: string | null;
  meta?: Record<string, unknown>;
};

/**
 * Records a first-party analytics event.
 *
 * Returns false when Supabase reports an insert error so callers and tests
 * can distinguish a recorded event from a failed attempt. Analytics failures
 * must never interrupt the visitor's purchase journey.
 */
export async function trackEvent({
  type,
  bookId = null,
  meta = {},
}: TrackEventInput): Promise<boolean> {
  try {
    const { error } = await supabase.from("ebook_events").insert({
      book_id: bookId,
      event_type: type,
      meta,
      created_at: new Date().toISOString(),
    });

    if (error) {
      // Do not log event metadata, which may contain visitor-provided data.
      console.error("Analytics insert failed", {
        code: error.code,
        message: error.message,
        hint: error.hint,
      });
      return false;
    }

    return true;
  } catch (error) {
    console.error(
      "Analytics error",
      error instanceof Error ? error.message : "Unknown analytics error",
    );
    return false;
  }
}
