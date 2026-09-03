import OpenAI from "npm:openai";

let client: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {

  if (client) {
    return client;
  }

  const apiKey =
    Deno.env.get("OPENAI_API_KEY");

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY secret was not found."
    );
  }

  client = new OpenAI({
    apiKey,
  });

  return client;

}