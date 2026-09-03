import { aiClient } from "../../services/AIClient.ts";

import { buildSEOPrompt }
  from "../prompts/seo.ts";

import type {
  SEOResult,
} from "../domain/SEOResult.ts";

import type {
  AICallMetricsSink,
} from "../../runtime/AICallMetricsSink.ts";

/**
 * DREVAIA SEO Engine
 *
 * Genera metadatos SEO profesionales
 * para cualquier contenido editorial.
 */
export class SEOEngine {

  async generate(
  editorial: string,
  language: string,
  metricsSink?: AICallMetricsSink,
): Promise<SEOResult> {

  const prompt =
    buildSEOPrompt(
      editorial,
      language,
    );

   return await aiClient.json<SEOResult>({
  prompt,
  operation: "seo",
  metricsSink,
});

  }

}

export const seoEngine =
  new SEOEngine();