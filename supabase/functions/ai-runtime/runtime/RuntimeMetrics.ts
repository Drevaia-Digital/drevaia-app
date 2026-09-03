/**
 * DREVAIA Runtime Metrics
 *
 * Metrics collected during one Runtime execution.
 */
export interface RuntimeMetrics {

  /**
   * Execution duration.
   */
  durationMs: number;

  /**
   * AI provider.
   */
  provider: string;

  /**
   * AI model.
   */
  model: string;

  /**
   * Prompt tokens.
   */
  promptTokens?: number;

  /**
   * Completion tokens.
   */
  completionTokens?: number;

  /**
   * Total tokens.
   */
  totalTokens?: number;

  /**
   * Estimated cost.
   */
  estimatedCost?: number;

  /**
   * Executed workflow.
   */
  workflow: string;

  /**
   * Executed stages.
   */
  stages: string[];

  /**
   * Whether execution succeeded.
   */
  success: boolean;

}