/**
 * DREVAIA AI Service
 *
 * Public API for all AI capabilities.
 */

import { AI_CONFIG } from "@/config/ai";
import { supabase } from "@/lib/supabase";
import type { Language } from "@/i18n";

export interface CreateEditorialEditionRequest {
  reflection: string;
  language: Language;
}

export interface KnowledgeEntry {
  projectId: string;
  workflow: string;
  language: string;
  topic: string;
  subtopic?: string;
  emotion: string;
  emotions: string[];
  intent: string;
  narrative: string;
  collection?: string;
  keywords: string[];
  summary: string;
  score: number;
  editorial: string;
}

export interface RuntimeExecution {
  phases: RuntimePhase[];
}

export interface RuntimePhase {
  id: string;
  status:
    | "completed"
    | "skipped"
    | "failed";
}

export interface CreateEditorialEditionResponse {
  success: boolean;
  workflow: string;
  editorial: string;
  knowledge: KnowledgeEntry;

  seo: {
    title: string;
    description: string;
    keywords: string[];
    slug: string;
  };

  review: {
    score: number;
    strengths: string[];
    improvements: string[];
  };

  runtime: {
    model: string;
    version: string;
  };

  execution: RuntimeExecution;
}

interface RuntimeErrorResponse {
  success?: boolean;
  error?: string;
  stack?: string;
}

class AIService {

  async createEditorialEdition(
    request: CreateEditorialEditionRequest,
  ): Promise<CreateEditorialEditionResponse> {

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      throw new Error(
        "User authentication is required.",
      );
    }

    const response = await fetch(
      AI_CONFIG.runtimeUrl,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          apikey:
            import.meta.env.VITE_SUPABASE_ANON_KEY,

          Authorization:
            `Bearer ${session.access_token}`,
        },

        body: JSON.stringify({
          workflow:
            "create-editorial-edition",

          input: request,
        }),
      },
    );

    if (!response.ok) {

      let runtimeError:
        RuntimeErrorResponse | null = null;

      try {
        runtimeError =
          await response.json();
      } catch {
        // Ignore invalid JSON.
      }

      const message =
        runtimeError?.error ??
        `Runtime request failed (${response.status})`;

      if (
        import.meta.env.DEV &&
        runtimeError?.stack
      ) {
        console.error(
          "===== DREVAIA RUNTIME STACK =====",
        );

        console.error(
          runtimeError.stack,
        );
      }

      throw new Error(message);
    }

    const data =
      (await response.json()) as
        CreateEditorialEditionResponse;

    if (!data.success) {
      throw new Error(
        "Runtime returned an unsuccessful response.",
      );
    }

    return data;
  }
}

export const aiService =
  new AIService();