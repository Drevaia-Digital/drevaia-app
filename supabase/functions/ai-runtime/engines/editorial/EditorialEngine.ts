import { analyzeReflection } from "../../editorial/analyzer.ts";
import { reviewEditorial } from "../../editorial/reviewer.ts";

import { buildEditorialPrompt } from "../../brand/builder.ts";
import { aiClient }
  from "../../services/AIClient.ts";

import { evaluateQuality } from "../../editorial/quality-gate.ts";
import { shouldRewrite } from "../../editorial/rewriter.ts";

import type {
  EditorialEngineResult,
} from "../../domain/EditorialEngineResult.ts";

import type {
  AICallMetricsSink,
} from "../../runtime/AICallMetricsSink.ts";

/**
 * DREVAIA Editorial Engine
 *
 * Responsable de generar una Editorial Edition
 * completa.
 */
export class EditorialEngine {

  async generate(
  reflection: string,
  language: string,
  metricsSink?: AICallMetricsSink,
): Promise<EditorialEngineResult> {

    const analysis =
      analyzeReflection(reflection);

    const prompt =
      buildEditorialPrompt(
        reflection,
        analysis,
        undefined,
        language,
      );

    const editorial =
  await aiClient.generate({
    prompt,
    operation: "editorial",
    metricsSink,
  });

    const review =
      reviewEditorial(editorial);

    const quality =
      evaluateQuality(review);

    const rewrite =
      shouldRewrite({
        editorial,
        review,
      });

    console.log(
      "Quality Gate:",
      quality,
    );

    console.log(
      "Should Rewrite:",
      rewrite,
    );

    console.log(
      "Editorial Review:",
      review,
    );

    return {

      editorial,

      review,

      quality,

      rewrite,

      runtime: {
        model: "gpt-5-mini",
        version: "1.0.0",
      },

    };
  }

}

export const editorialEngine =
  new EditorialEngine();