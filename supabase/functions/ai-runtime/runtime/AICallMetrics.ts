/**
 * DREVAIA Runtime
 * AI Call Metrics
 *
 * Canonical telemetry contract for one AI provider call.
 */
export interface AICallMetrics {

  /**
   * AI provider identifier.
   */
  provider: string;

  /**
   * Model used.
   */
  model: string;

  /**
   * Provider runtime version.
   */
  version: string;

  /**
   * AI call duration in milliseconds.
   */
  durationMs: number;

  /**
   * Input tokens.
   */
  promptTokens?: number;

  /**
   * Output tokens.
   */
  completionTokens?: number;

  /**
   * Total tokens.
   */
  totalTokens?: number;

  /**
   * Logical operation executed.
   */
  operation: string;

}