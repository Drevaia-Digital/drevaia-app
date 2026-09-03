import type { RuntimeContext } from "./RuntimeContext.ts";

import type {
  EditorialGenerationResult,
} from "../domain/EditorialGenerationResult.ts";

/**
 * DREVAIA Response Builder
 *
 * Construye la respuesta oficial enviada al frontend.
 */
export class ResponseBuilder {

  build(
    context: RuntimeContext,
  ): EditorialGenerationResult {

    return {

      success: true,

      workflow: context.workflow,

      editorial: context.editorial ?? "",

      seo: context.seo ?? {
        title: "",
        description: "",
        keywords: [],
        slug: "",
      },

      review: context.review ?? {
        score: 0,
        strengths: [],
        improvements: [],
      },

      runtime: context.runtime ?? {
        model: "gpt-5-mini",
        version: "1.0.0",
      },

    };
  }

}

export const responseBuilder =
  new ResponseBuilder();