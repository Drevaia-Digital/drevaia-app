/**
 * DREVAIA Editorial Generation Service
 *
 * Application Service responsible for coordinating
 * the editorial generation capabilities.
 */

import {
  editorialEngine,
} from "../../engines/editorial/EditorialEngine.ts";

import {
  knowledgeEngine,
} from "../../knowledge/engines/KnowledgeEngine.ts";

import type {
  AICallMetricsSink,
} from "../../runtime/AICallMetricsSink.ts";

import type {
  EditorialEngineResult,
} from "../../domain/EditorialEngineResult.ts";

import type {
  KnowledgeEntry,
} from "../../knowledge/domain/KnowledgeEntry.ts";

import type {
  EditorialGenerationContext,
} from "../../domain/context/EditorialGenerationContext.ts";

export interface EditorialGenerationRequest {

  reflection: string;

  language: string;

}

export interface EditorialGenerationResponse {

  editorial: EditorialEngineResult;

  knowledge: KnowledgeEntry;

}

export class EditorialGenerationService {

  /**
   * Generates the editorial edition.
   *
   * This operation must complete before Knowledge
   * because Knowledge depends on the generated editorial.
   *
   * The metrics sink is execution-scoped and optional
   * for compatibility with existing consumers.
   */
  async generateEditorial(
    context: EditorialGenerationContext,
    metricsSink?: AICallMetricsSink,
  ): Promise<EditorialEngineResult> {

    return await editorialEngine.generate(

      context.reflection,

      context.language,

      metricsSink,

    );

  }

  /**
   * Generates semantic knowledge from the reflection
   * and the previously generated editorial.
   *
   * The metrics sink is propagated through:
   *
   * KnowledgeEngine
   *      ↓
   * KnowledgePipeline
   *      ↓
   * SemanticEngine
   *      ↓
   * AIClient
   */
  async generateKnowledge(
    context: EditorialGenerationContext,
    editorial: EditorialEngineResult,
    metricsSink?: AICallMetricsSink,
  ): Promise<KnowledgeEntry> {

    return await knowledgeEngine.generate(

      context.reflection,

      context.language,

      editorial,

      metricsSink,

    );

  }

  /**
   * Legacy complete generation flow.
   *
   * Kept for compatibility with existing consumers.
   *
   * Editorial → Knowledge
   */
  async generate(
    context: EditorialGenerationContext,
    metricsSink?: AICallMetricsSink,
  ): Promise<EditorialGenerationResponse> {

    const editorial =
      await this.generateEditorial(

        context,

        metricsSink,

      );

    const knowledge =
      await this.generateKnowledge(

        context,

        editorial,

        metricsSink,

      );

    return {

      editorial,

      knowledge,

    };

  }

}

export const editorialGenerationService =
  new EditorialGenerationService();