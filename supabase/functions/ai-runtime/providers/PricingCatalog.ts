/**
 * DREVAIA AI Pricing Catalog
 *
 * Canonical pricing registry used by Runtime
 * observability.
 *
 * Prices are expressed in USD per 1M tokens.
 *
 * IMPORTANT:
 * This catalog represents provider API cost.
 * It is NOT a product price, customer price,
 * invoice amount or billing rule.
 */
import type {
  ModelPricing,
} from './Pricing.ts';

export const MODEL_PRICING: ModelPricing[] = [

  {
    provider: 'openai',
    model: 'gpt-5-mini',
    inputPerMillion: 0.25,
    outputPerMillion: 2.00,
  },

];
