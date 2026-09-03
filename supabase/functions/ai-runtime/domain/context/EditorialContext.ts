import type {
  KnowledgeEntry,
} from "../../knowledge/domain/KnowledgeEntry.ts";

import type {
  IntelligenceDecision,
} from "../../intelligence/domain/IntelligenceDecision.ts";

/**
 * Context consumed by the Editorial Engine.
 */
export interface EditorialContext {

  /**
   * Original user reflection.
   */
  reflection: string;

  /**
   * User language.
   */
  language: string;

  /**
   * Semantic knowledge extracted from the reflection.
   */
  knowledge: KnowledgeEntry;

  /**
   * Editorial strategy produced by the Intelligence Engine.
   */
  intelligence: IntelligenceDecision;

}