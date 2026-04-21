import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import OpenAI from "https://esm.sh/openai@4.0.0";

serve(async (req) => {
  // 🔥 CORS FIX (permite que tu web llame la función)
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }
  try {
    const { book } = await req.json();

    if (!book) {
      return new Response(JSON.stringify({ error: "No book provided" }), {
        status: 400,
      });
    }

    const openai = new OpenAI({
      apiKey: Deno.env.get("OPENAI_API_KEY"),
    });

    const content = `
    ${book.title}
    ${book.description}
    ${book.collection}
    `;

    // 🧠 crear embedding
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: content,
    });

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // 🔎 búsqueda semántica en DB
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/match_books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({
        query_embedding: embedding.data[0].embedding,
        match_threshold: 0.7,
        match_count: 4,
      }),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

  } catch (err: any) {
    return new Response(
  JSON.stringify({ error: err.message }),
  {
    status: 500,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }
);
  }
});