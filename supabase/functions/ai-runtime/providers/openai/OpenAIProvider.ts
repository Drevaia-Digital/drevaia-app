/**
 * DREVAIA OS
 * OpenAI Provider
 */

import type {
  AIProvider,
  ProviderGenerationRequest,
  ProviderGenerationResponse,
} from "../AIProvider.ts";

import { getOpenAIClient } from "../openai.ts";

import { OPENAI_CONFIG } from "./OpenAIConfig.ts";

export class OpenAIProvider implements AIProvider {

  readonly id = "openai";

  readonly name = "OpenAI";

  async health(): Promise<boolean> {

    try {

      getOpenAIClient();

      return true;

    } catch {

      return false;

    }

  }

  async generate(
    request: ProviderGenerationRequest,
  ): Promise<ProviderGenerationResponse> {

    const client =
      getOpenAIClient();

    const input: Array<{
      role: "system" | "user";
      content: string;
    }> = [];

    if (request.system) {

      input.push({

        role: "system",

        content: request.system,

      });

    }

    input.push({

      role: "user",

      content: request.prompt,

    });

    const response =
      await client.responses.create({

        model:
          request.model ??
          OPENAI_CONFIG.defaultModel,

        max_output_tokens:
          request.maxTokens ??
          OPENAI_CONFIG.defaultMaxTokens,

        input,

      });

    return {

      content:
        response.output_text,

      model:
        response.model ??
        request.model ??
        OPENAI_CONFIG.defaultModel,

      version: "1.0.0",

      usage: response.usage
        ? {
            promptTokens:
              response.usage.input_tokens,

            completionTokens:
              response.usage.output_tokens,

            totalTokens:
              response.usage.total_tokens,
          }
        : undefined,

    };

  }

}

export const openAIProvider =
  new OpenAIProvider();