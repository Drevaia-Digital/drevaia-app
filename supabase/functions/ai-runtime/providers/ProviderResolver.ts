/**
 * DREVAIA OS
 * Provider Resolver
 */

import type { AIProvider } from "./AIProvider.ts";

import { providerRegistry }
  from "./ProviderRegistry.ts";

export class ProviderResolver {

  resolve(
    providerId: string,
  ): AIProvider {

    return providerRegistry.get(
      providerId,
    );

  }

}

export const providerResolver =
  new ProviderResolver();