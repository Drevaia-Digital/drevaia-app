/**
 * DREVAIA AI Metrics Collector
 *
 * Collects AI call metrics for one Runtime execution.
 *
 * This collector is intentionally instantiated per execution.
 * It must never be used as a global mutable singleton because
 * multiple Runtime executions may occur concurrently.
 */
import type {
  AICallMetrics,
} from './AICallMetrics.ts';

import type {
  AICallMetricsSink,
} from './AICallMetricsSink.ts';

import type {
  RuntimeMetrics,
} from './RuntimeMetrics.ts';

import {
  costCalculator,
} from './CostCalculator.ts';

export class AIMetricsCollector
  implements AICallMetricsSink {

  private readonly calls: AICallMetrics[] = [];

  /**
   * Registers metrics from one AI call.
   */
  record(
    metrics: AICallMetrics,
  ): void {

    this.calls.push(
      metrics,
    );

  }

  /**
   * Returns all recorded AI calls.
   */
  all(): AICallMetrics[] {

    return [
      ...this.calls,
    ];

  }

  /**
   * Returns the number of recorded AI calls.
   */
  count(): number {

    return this.calls.length;

  }

  /**
   * Aggregates all AI calls into Runtime-level metrics.
   *
   * Runtime duration and workflow status are supplied by
   * the Runtime because they describe the complete execution,
   * not an individual AI call.
   */
  build(params: {
    durationMs: number;
    workflow: string;
    stages: string[];
    success: boolean;
  }): RuntimeMetrics {

    const promptTokens =
      this.calls.reduce(
        (total, call) =>
          total +
          (call.promptTokens ?? 0),
        0,
      );

    const completionTokens =
      this.calls.reduce(
        (total, call) =>
          total +
          (call.completionTokens ?? 0),
        0,
      );

    const totalTokens =
      this.calls.reduce(
        (total, call) =>
          total +
          (call.totalTokens ?? 0),
        0,
      );

    const providers =
      [
        ...new Set(
          this.calls.map(
            (call) =>
              call.provider,
          ),
        ),
      ];

    const models =
      [
        ...new Set(
          this.calls.map(
            (call) =>
              call.model,
          ),
        ),
      ];

    const costs =
      this.calls.map(
        (call) =>
          costCalculator.calculate({
            provider: call.provider,
            model: call.model,
            promptTokens: call.promptTokens,
            completionTokens: call.completionTokens,
          }),
      );

    const knownCosts =
      costs.filter(
        (cost): cost is number =>
          cost !== undefined,
      );

    const estimatedCost =
      knownCosts.length === costs.length
        ? knownCosts.reduce(
            (total, cost) =>
              total + cost,
            0,
          )
        : undefined;

    return {

      durationMs:
        params.durationMs,

      provider:
        providers.join(","),

      model:
        models.join(","),

      promptTokens,

      completionTokens,

      totalTokens,

      estimatedCost,

      workflow:
        params.workflow,

      stages: [
        ...params.stages,
      ],

      success:
        params.success,

    };

  }

}

export function createAIMetricsCollector():
  AIMetricsCollector {

  return new AIMetricsCollector();

}




