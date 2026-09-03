/**
 * DREVAIA Runtime Telemetry
 *
 * Central service responsible for collecting
 * execution information from the AI Runtime.
 */

import type {
  RuntimeExecution,
} from "../domain/RuntimeExecution.ts";

import type {
  RuntimeMetrics,
} from "./RuntimeMetrics.ts";

export class RuntimeTelemetry {

  /**
   * Registers a Runtime execution.
   *
   * Future integrations:
   *
   * - Sentry
   * - PostHog
   * - OpenTelemetry
   * - Supabase
   * - Analytics
   */
  record(

    execution: RuntimeExecution,

    metrics: RuntimeMetrics,

  ): void {

    console.log(
      "[Runtime Execution]",
      execution,
    );

    console.log(
      "[Runtime Metrics]",
      metrics,
    );

  }

}

export const runtimeTelemetry =
  new RuntimeTelemetry();