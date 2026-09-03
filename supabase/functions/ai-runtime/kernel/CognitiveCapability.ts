import { CognitivePhase }
  from "./CognitivePhase.ts";

/**
 * Every Runtime capability belongs
 * to exactly one cognitive phase.
 */
export interface CognitiveCapability {

  /**
   * Capability identifier.
   */
  readonly id: string;

  /**
   * Runtime phase.
   */
  readonly phase: CognitivePhase;

}