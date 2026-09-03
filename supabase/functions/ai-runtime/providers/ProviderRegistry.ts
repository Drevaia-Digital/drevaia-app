/**
 * DREVAIA OS
 * Provider Registry
 */

import type { AIProvider } from "./AIProvider.ts";

export class ProviderRegistry {

  private readonly providers =
    new Map<string, AIProvider>();

  register(
    provider: AIProvider,
  ): void {

    if (this.providers.has(provider.id)) {

      throw new Error(
        `Provider "${provider.id}" is already registered.`,
      );

    }

    this.providers.set(
      provider.id,
      provider,
    );

  }

  get(
    id: string,
  ): AIProvider {

    const provider =
      this.providers.get(id);

    if (!provider) {

      throw new Error(
        `Provider "${id}" was not found.`,
      );

    }

    return provider;

  }

  has(
    id: string,
  ): boolean {

    return this.providers.has(id);

  }

  all(): AIProvider[] {

    return [
      ...this.providers.values(),
    ];

  }

}

export const providerRegistry =
  new ProviderRegistry();