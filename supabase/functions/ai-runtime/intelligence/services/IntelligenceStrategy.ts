import type {
  KnowledgeEntry,
} from "../../knowledge/domain/KnowledgeEntry.ts";

import type {
  IntelligenceDecision,
} from "../domain/IntelligenceDecision.ts";

/**
 * DREVAIA Intelligence Strategy
 *
 * Responsible for transforming semantic
 * knowledge into an editorial strategy.
 */
export class IntelligenceStrategy {

  decide(
    knowledge: KnowledgeEntry,
  ): IntelligenceDecision {

    return {

      narrative:
        knowledge.narrative || "essay",

      depth:
        this.resolveDepth(
          knowledge.score,
        ),

      collection:
        knowledge.collection || "GENERAL",

      tone:
        this.resolveTone(
          knowledge.emotion,
        ),

      audience:
        this.resolveAudience(
          knowledge.intent,
        ),

      reasoning:
        "Initial strategic reasoning.",

    };

  }

  private resolveDepth(
    score: number,
  ): "low" | "medium" | "high" {

    if (score >= 85) {
      return "high";
    }

    if (score >= 60) {
      return "medium";
    }

    return "low";

  }

  private resolveTone(
    emotion: string,
  ): string {

    switch (
      emotion.toLowerCase()
    ) {

      case "hope":
      case "esperanza":
        return "hopeful";

      case "sadness":
      case "tristeza":
        return "compassionate";

      case "anger":
      case "ira":
        return "firm";

      case "fear":
      case "miedo":
        return "calm";

      default:
        return "reflective";

    }

  }

  private resolveAudience(
    intent: string,
  ): string {

    if (!intent) {
      return "general";
    }

    return intent;

  }

}

export const intelligenceStrategy =
  new IntelligenceStrategy();