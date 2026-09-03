/**
 * DREVAIA OS
 * Provider Bootstrap
 *
 * Registers all available AI providers.
 */

import { providerRegistry }
  from "../providers/ProviderRegistry.ts";

import { openAIProvider }
  from "../providers/openai/OpenAIProvider.ts";

export function configureProviders(): void {

  providerRegistry.register(
    openAIProvider,
  );

}