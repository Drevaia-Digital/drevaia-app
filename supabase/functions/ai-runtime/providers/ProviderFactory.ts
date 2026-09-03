/**
 * DREVAIA OS
 * Provider Factory
 */

import type { AIProvider } from "./AIProvider.ts";

import { providerResolver }
  from "./ProviderResolver.ts";

export class ProviderFactory {

  create(
    providerId: string,
  ): AIProvider {

    return providerResolver.resolve(
      providerId,
    );

  }

}

export const providerFactory =
  new ProviderFactory();