/**
 * DREVAIA Intelligence Decision
 *
 * Strategic decision produced before
 * generating the editorial.
 */
export interface IntelligenceDecision {

  /**
   * Recommended narrative style.
   */
  narrative: string;

  /**
   * Editorial depth.
   */
  depth: "low" | "medium" | "high";

  /**
   * Suggested collection.
   */
  collection: string;

  /**
   * Recommended tone.
   */
  tone: string;

  /**
   * Target audience.
   */
  audience: string;

  /**
   * Strategic reasoning.
   */
  reasoning: string;

}