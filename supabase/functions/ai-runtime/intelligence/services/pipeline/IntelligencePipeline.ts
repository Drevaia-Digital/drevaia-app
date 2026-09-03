import type {
  KnowledgeEntry,
} from "../../../knowledge/domain/KnowledgeEntry.ts";

import type {
  IntelligenceDecision,
} from "../../domain/IntelligenceDecision.ts";

import {
  intelligenceEngine,
} from "../../engines/IntelligenceEngine.ts";

/**
 * DREVAIA Intelligence Pipeline
 *
 * Coordinates every strategic decision
 * before the Editorial Engine writes.
 */
export class IntelligencePipeline {

  async process(
    knowledge: KnowledgeEntry,
  ): Promise<IntelligenceDecision> {

    return await intelligenceEngine.generate(
      knowledge,
    );

  }

}

export const intelligencePipeline =
  new IntelligencePipeline();