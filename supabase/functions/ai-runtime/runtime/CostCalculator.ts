/**
 * DREVAIA Runtime Cost Calculator
 *
 * Calculates estimated provider API cost from
 * actual token usage and the canonical pricing catalog.
 *
 * Model resolution supports provider model aliases
 * and versioned snapshots.
 *
 * This component calculates internal AI execution cost.
 * It does NOT calculate customer pricing, billing,
 * invoices, product prices or commercial margins.
 */

import { MODEL_PRICING } from '../providers/PricingCatalog.ts';

import type {
  ModelPricing,
} from '../providers/Pricing.ts';

export interface CostCalculationInput {
  provider: string;
  model: string;
  promptTokens?: number;
  completionTokens?: number;
}

export class CostCalculator {

  private resolvePricing(
    provider: string,
    model: string,
  ): ModelPricing | undefined {

    const exactMatch =
      MODEL_PRICING.find(
        (entry) =>
          entry.provider === provider &&
          entry.model === model,
      );

    if (exactMatch) {
      return exactMatch;
    }

    const snapshotMatch =
      MODEL_PRICING.find(
        (entry) =>
          entry.provider === provider &&
          model.startsWith(`${entry.model}-`),
      );

    return snapshotMatch;
  }

  calculate(
    input: CostCalculationInput,
  ): number | undefined {

    const pricing =
      this.resolvePricing(
        input.provider,
        input.model,
      );

    if (!pricing) {
      return undefined;
    }

    const promptTokens =
      input.promptTokens ?? 0;

    const completionTokens =
      input.completionTokens ?? 0;

    const inputCost =
      (promptTokens / 1_000_000) *
      pricing.inputPerMillion;

    const outputCost =
      (completionTokens / 1_000_000) *
      pricing.outputPerMillion;

    return inputCost + outputCost;
  }
}

export const costCalculator =
  new CostCalculator();