import {
  CognitivePhase,
} from "../../kernel/CognitivePhase.ts";

import type {
  CognitiveCapability,
} from "../../kernel/CognitiveCapability.ts";

import {
  knowledgePipeline,
} from "../services/pipeline/KnowledgePipeline.ts";

import type {
  KnowledgeEntry,
} from "../domain/KnowledgeEntry.ts";

import type {
  EditorialEngineResult,
} from "../../domain/EditorialEngineResult.ts";

import type {
  AICallMetricsSink,
} from "../../runtime/AICallMetricsSink.ts";

/**
 * DREVAIA Knowledge Engine
 *
 * Cognitive Phase:
 * PERCEPTION
 */
export class KnowledgeEngine
  implements CognitiveCapability {

  readonly id =
    "knowledge-engine";

  readonly phase =
    CognitivePhase.PERCEPTION;

  async generate(

  reflection: string,

  language: string,

  editorial: EditorialEngineResult,

  metricsSink?: AICallMetricsSink,

): Promise<KnowledgeEntry> {

    return knowledgePipeline.process(

  reflection,

  editorial.editorial,

  language,

  metricsSink,

);

  }

}

export const knowledgeEngine =
  new KnowledgeEngine();