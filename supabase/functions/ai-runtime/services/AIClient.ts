import { providerFactory }
  from "../providers/ProviderFactory.ts";

import type {
  ProviderGenerationRequest,
  ProviderGenerationResponse,
} from "../providers/AIProvider.ts";

import type {
  AICallMetricsSink,
} from "../runtime/AICallMetricsSink.ts";

/**
 * Parameters for an AI model call.
 */
export interface AIRequest {

  /**
   * User prompt.
   */
  prompt: string;

  /**
   * Optional system prompt.
   */
  system?: string;

  /**
   * Provider identifier.
   *
   * Default: openai
   */
  provider?: string;

  /**
   * Model identifier.
   */
  model?: string;

  /**
   * Temperature.
   */
  temperature?: number;

  /**
   * Maximum output tokens.
   */
  maxTokens?: number;

  /**
   * Logical operation name.
   *
   * Used for Runtime observability.
   */
  operation?: string;

  /**
   * Optional execution-scoped metrics sink.
   *
   * Allows Runtime executions to collect
   * AI call metrics without global mutable state.
   */
  metricsSink?: AICallMetricsSink;

}

/**
 * DREVAIA AI Client
 *
 * Canonical gateway to every AI Provider.
 */
export class AIClient {

  /**
   * Last AI call metrics.
   *
   * This preserves the existing string-returning
   * generate() contract while exposing observability
   * data to the Runtime.
   */
  private lastMetrics?: AICallMetrics;

  /**
   * Returns metrics from the most recent AI call.
   */
  getLastMetrics(): AICallMetrics | undefined {

    return this.lastMetrics;

  }

  /**
   * Text generation.
   */
  async generate(
    request: AIRequest,
  ): Promise<string> {

    const provider =
      providerFactory.create(
        request.provider ?? "openai",
      );

    const providerRequest:
      ProviderGenerationRequest = {

      system:
        request.system,

      prompt:
        request.prompt,

      model:
        request.model,

      temperature:
        request.temperature,

      maxTokens:
        request.maxTokens,

    };

    const startedAt =
      performance.now();

    const providerId =
      request.provider ??
      "openai";

    const operation =
      request.operation ??
      "unknown";

    try {

      const response:
        ProviderGenerationResponse =
        await provider.generate(
          providerRequest,
        );

      const durationMs =
        Math.round(
          performance.now() - startedAt,
        );

            this.lastMetrics = {

        operation,

        provider:
          providerId,

        model:
          response.model,

        version:
          response.version,

        durationMs,

        promptTokens:
          response.usage?.promptTokens,

        completionTokens:
          response.usage?.completionTokens,

        totalTokens:
          response.usage?.totalTokens,

      };

      if (request.metricsSink) {

        request.metricsSink.record(
          this.lastMetrics,
        );

      }

      console.log(
        "[DREVAIA AI]",
        this.lastMetrics,
      );




      return response.content;

    } catch (error) {

      const durationMs =
        Math.round(
          performance.now() - startedAt,
        );

      console.error(
        "[DREVAIA AI ERROR]",
        {

          operation,

          provider:
            providerId,

          model:
            request.model ??
            "default",

          durationMs,

          error,

        },
      );

      throw error;

    }

  }

  /**
   * Structured generation.
   */
  async json<T>(
    request: AIRequest,
  ): Promise<T> {

    const content =
      await this.generate(
        request,
      );

    try {

      return JSON.parse(
        content,
      ) as T;

    } catch {

      throw new Error(
        "Invalid JSON returned by AI.",
      );

    }

  }

}

export const aiClient =
  new AIClient();