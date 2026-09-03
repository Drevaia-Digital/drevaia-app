import type {
  KnowledgeEntry,
} from "../../knowledge/domain/KnowledgeEntry.ts";

import type {
  IntelligenceDecision,
} from "../domain/IntelligenceDecision.ts";

import {
  intelligenceStrategy,
} from "../services/IntelligenceStrategy.ts";

/**
 * DREVAIA Intelligence Engine
 *
 * Generates an editorial strategy
 * before the Editorial Engine writes.
 */
export class IntelligenceEngine {

  async generate(
    knowledge: KnowledgeEntry,
  ): Promise<IntelligenceDecision> {

    return intelligenceStrategy.decide(
      knowledge,
    );

  }

}

export const intelligenceEngine =
  new IntelligenceEngine();