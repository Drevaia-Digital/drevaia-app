import { aiClient }
  from "../../../services/AIClient.ts";

import {
  buildSemanticPrompt,
} from "../../../prompts/semantic/semantic-analysis.ts";

import type {
  SemanticAnalysis,
} from "../../domain/SemanticAnalysis.ts";

import type {
  AICallMetricsSink,
} from "../../../runtime/AICallMetricsSink.ts";

/**
 * Semantic Engine
 *
 * Responsable del análisis semántico
 * utilizando IA.
 */
export class SemanticEngine {

  async analyze(
  editorial: string,
  language: string,
  metricsSink?: AICallMetricsSink,
): Promise<SemanticAnalysis> {

    const prompt =
      buildSemanticPrompt(
        editorial,
        language,
      );

    return await aiClient.json<SemanticAnalysis>({
  prompt,
  operation: "knowledge",
  metricsSink,
});

  }

}

export const semanticEngine =
  new SemanticEngine();