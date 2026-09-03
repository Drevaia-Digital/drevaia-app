import {
  editorialGenerationService,
} from "../services/generation/EditorialGenerationService.ts";

import {
  seoEngine,
} from "../seo/services/SEOEngine.ts";

import {
  runtimeExecutionBuilder,
} from "../runtime/builders/RuntimeExecutionBuilder.ts";

import {
  runtimeClock,
} from "../runtime/RuntimeClock.ts";

import {
  createAIMetricsCollector,
} from "../runtime/AIMetricsCollector.ts";

import {
  runtimeTelemetry,
} from "../runtime/RuntimeTelemetry.ts";

import type {
  CreateEditorialEditionResponse,
} from "../domain/CreateEditorialEditionResponse.ts";

import type {
  Workflow,
} from "../kernel/WorkflowRegistry.ts";

import type {
  EditorialGenerationContext,
} from "../domain/context/EditorialGenerationContext.ts";

import {
  runtimeContextFactory,
} from "../kernel/RuntimeContextFactory.ts";

/**
 * Workflow oficial para crear una Editorial Edition.
 *
 * Execution flow:
 *
 * Editorial
 *    ↓
 * ┌──┴──────────────┐
 * ↓                 ↓
 * Knowledge         SEO
 * ↓                 ↓
 * └───────┬─────────┘
 *         ↓
 *      Response
 *
 * Knowledge and SEO both depend on the generated
 * editorial, but neither depends on the other.
 *
 * Runtime observability:
 *
 * AI calls
 *    ↓
 * AIMetricsCollector
 *    ↓
 * RuntimeMetrics
 *    ↓
 * RuntimeTelemetry
 */
export async function createEditorialEditionWorkflow(
  reflection: string,
  language: EditorialGenerationContext["language"],
): Promise<CreateEditorialEditionResponse> {

  /**
   * Runtime execution context.
   *
   * Creates the unique execution identifier
   * and records the Runtime start timestamp.
   */
  const runtimeContext =
    runtimeContextFactory.create({

      reflection,

      language,

      workflow:
        "create-editorial-edition",

    });

  /**
   * Execution-scoped AI metrics collector.
   *
   * This collector belongs exclusively to this
   * Runtime execution and must never be shared
   * between concurrent executions.
   */
  const metricsCollector =
    createAIMetricsCollector();

  /**
   * Editorial generation context.
   *
   * This remains intentionally separate from RuntimeContext.
   *
   * Editorial services receive only the context
   * required for editorial generation.
   */
  const context: EditorialGenerationContext = {

    reflection:
      runtimeContext.reflection,

    language:
      runtimeContext.language,

    workflow:
      runtimeContext.workflow,

    metadata:
      runtimeContext.metadata,

  };

  try {

    /**
     * Phase 1
     *
     * Editorial must be generated first because
     * both Knowledge and SEO consume its result.
     */
    const editorial =
      await editorialGenerationService.generateEditorial(
        context,
        metricsCollector,
      );

    /**
     * Phase 2
     *
     * Knowledge and SEO are independent once
     * Editorial has been generated.
     *
     * Both operations receive the same execution-scoped
     * metrics collector.
     *
     * Promise.all allows them to execute concurrently
     * without sharing mutable global state.
     */
    const [
      knowledge,
      seo,
    ] = await Promise.all([

      editorialGenerationService.generateKnowledge(
        context,
        editorial,
        metricsCollector,
      ),

      seoEngine.generate(
        editorial.editorial,
        context.language,
        metricsCollector,
      ),

    ]);

    /**
     * Runtime execution finished.
     */
    const finishedAt =
      runtimeClock.now();

    /**
     * Runtime duration.
     *
     * Calculated through the centralized RuntimeClock.
     */
    const durationMs =
      runtimeClock.duration(
        new Date(
          runtimeContext.metrics.startedAt,
        ),
        finishedAt,
      );

    runtimeContext.metrics.finishedAt =
      finishedAt.getTime();

    runtimeContext.metrics.durationMs =
      durationMs;

    /**
     * Build aggregated Runtime metrics
     * from every AI call executed during
     * this Runtime invocation.
     */
    const runtimeMetrics =
      metricsCollector.build({

        durationMs,

        workflow:
          runtimeContext.workflow,

        stages: [
          "editorial",
          "knowledge",
          "seo",
        ],

        success:
          true,

      });

    /**
     * Build the Runtime execution report.
     */
    const execution =
      runtimeExecutionBuilder.build({

        executionId:
          runtimeContext.executionId,

        workflow:
          runtimeContext.workflow,

        startedAt:
          runtimeContext.metrics.startedAt,

        finishedAt:
          finishedAt.getTime(),

        success:
          true,

      });

    /**
     * Register Runtime telemetry.
     *
     * Telemetry is deliberately recorded after
     * the complete workflow has finished so the
     * RuntimeMetrics represent the entire execution.
     */
    runtimeTelemetry.record(
      execution,
      runtimeMetrics,
    );

    return {

      success: true,

      workflow:
        runtimeContext.workflow,

      editorial:
        editorial.editorial,

      knowledge,

      seo,

      review:
        editorial.review,

      runtime:
  editorial.runtime,

metrics:
  runtimeMetrics,

execution,

    };

  } catch (error) {

    /**
     * Runtime execution failed.
     */
    const finishedAt =
      runtimeClock.now();

    const durationMs =
      runtimeClock.duration(
        new Date(
          runtimeContext.metrics.startedAt,
        ),
        finishedAt,
      );

    runtimeContext.metrics.finishedAt =
      finishedAt.getTime();

    runtimeContext.metrics.durationMs =
      durationMs;

    /**
     * Build the failed Runtime execution report.
     */
    const execution =
      runtimeExecutionBuilder.build({

        executionId:
          runtimeContext.executionId,

        workflow:
          runtimeContext.workflow,

        startedAt:
          runtimeContext.metrics.startedAt,

        finishedAt:
          finishedAt.getTime(),

        success:
          false,

        error:
          error instanceof Error
            ? error.message
            : String(error),

      });

    /**
     * Preserve the original error while recording
     * the Runtime telemetry for the failed execution.
     */
    const runtimeMetrics =
      metricsCollector.build({

        durationMs,

        workflow:
          runtimeContext.workflow,

        stages: [
          "editorial",
          "knowledge",
          "seo",
        ],

        success:
          false,

      });

    runtimeTelemetry.record(
      execution,
      runtimeMetrics,
    );

    /**
     * Preserve the original error.
     */
    throw error;

  }

}

/**
 * Instancia registrada por el Runtime.
 */
export const createEditorialEditionWorkflowInstance:
  Workflow<
    {
      reflection: string;
      language: EditorialGenerationContext["language"];
    },
    CreateEditorialEditionResponse
  > = {

  async execute(input) {

  return createEditorialEditionWorkflow(
    input.reflection,
    input.language ?? "es",
  );

},

};
