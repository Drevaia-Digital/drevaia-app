export async function getAIRecommendations(book: any) {
  try {
    const res = await fetch(
      "https://hkjiqihczalnekzuwjtw.supabase.co/functions/v1/ai-recommendations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ book }),
      }
    );

    const data = await res.json();

    return data || [];

  } catch (err) {
    console.error("AI error:", err);
    return [];
  }
}