import type {
  AICallMetrics,
} from "./AICallMetrics.ts";

/**
 * DREVAIA Runtime
 * AI Call Metrics Sink
 *
 * Minimal abstraction used by the AI Client
 * to publish metrics without depending on
 * a concrete collector implementation.
 */
export interface AICallMetricsSink {

  /**
   * Records one AI provider call.
   */
  record(
    metrics: AICallMetrics,
  ): void;

}