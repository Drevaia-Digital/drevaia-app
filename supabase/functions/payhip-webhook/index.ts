import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let result = 0;

  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const payhipApiKey = Deno.env.get("PAYHIP_API_KEY");

if (!supabaseUrl || !serviceRoleKey || !payhipApiKey) {
  throw new Error("Required server secrets are not configured");
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return jsonResponse({ success: false, error: "Method not allowed" }, 405);
  }

  try {
    const payload = await req.json();

    if (!payload || typeof payload !== "object") {
      return jsonResponse({ success: false, error: "Invalid payload" }, 400);
    }

    const signature = String(payload.signature ?? "");

    if (!signature) {
      return jsonResponse(
        { success: false, error: "Missing Payhip signature" },
        401,
      );
    }

    const expectedSignature = await sha256Hex(payhipApiKey);

    if (!timingSafeEqual(signature, expectedSignature)) {
      return jsonResponse(
        { success: false, error: "Invalid Payhip signature" },
        401,
      );
    }

    const eventType = String(payload.type ?? "");

    if (eventType !== "paid") {
      return jsonResponse({
        success: true,
        ignored: true,
        event: eventType || null,
      });
    }

    const transactionId = String(payload.id ?? "");

    if (!transactionId) {
      return jsonResponse(
        { success: false, error: "Missing transaction id" },
        400,
      );
    }

    const firstItem = Array.isArray(payload.items) ? payload.items[0] : null;

    const rawPrice = Number(payload.price ?? 0);

    if (!Number.isFinite(rawPrice) || rawPrice < 0 || rawPrice > 100000000) {
      return jsonResponse({ success: false, error: "Invalid amount" }, 400);
    }

    const amount = rawPrice / 100;

    const parsedDate = payload.date
      ? new Date(Number(payload.date) * 1000)
      : new Date();
    const occurredAt = Number.isNaN(parsedDate.getTime())
      ? new Date()
      : parsedDate;

    const sale = {
      source: "payhip",
      external_transaction_id: transactionId,
      external_event_id: null,
      product_id: firstItem?.product_id ? String(firstItem.product_id) : null,
      product_name: firstItem?.product_name
        ? String(firstItem.product_name)
        : null,
      buyer_email: payload.email ? String(payload.email) : null,
      amount,
      currency: payload.currency ? String(payload.currency) : null,
      status: amount > 0 ? "paid" : "free",
      occurred_at: occurredAt.toISOString(),
      raw_event: payload,
    };

    const { data, error } = await supabase
      .from("sales")
      .upsert(sale, {
        onConflict: "source,external_transaction_id",
        ignoreDuplicates: true,
      })
      .select("id")
      .maybeSingle();

    if (error) {
      console.error("Payhip sales insert error:", error);

      return jsonResponse(
        { success: false, error: "Unable to record sale" },
        500,
      );
    }

    if (!data) {
      return jsonResponse({
        success: true,
        recorded: false,
        duplicate: true,
        transactionId,
      });
    }

    return jsonResponse({
      success: true,
      recorded: true,
      saleId: data.id,
      source: "payhip",
      transactionId,
    });
  } catch (error) {
    console.error("Payhip webhook error:", error);

    return jsonResponse(
      { success: false, error: "Invalid webhook request" },
      400,
    );
  }
});