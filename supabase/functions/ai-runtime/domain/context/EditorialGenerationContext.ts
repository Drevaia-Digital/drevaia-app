/**
 * DREVAIA OS
 * Editorial Generation Context
 *
 * Canonical execution context for editorial generation.
 */

export interface EditorialGenerationContext {

  /**
   * User reflection.
   */
  reflection: string;

  /**
   * Language.
   */
  language: string;

  /**
   * Workflow identifier.
   */
  workflow: string;

  /**
   * Optional project identifier.
   */
  projectId?: string;

  /**
   * Optional provider.
   */
  provider?: string;

  /**
   * Optional model.
   */
  model?: string;

  /**
   * Runtime metadata.
   */
  metadata?: Record<string, unknown>;

}