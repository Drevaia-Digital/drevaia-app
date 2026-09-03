/**
 * DREVAIA AI Provider Pricing
 *
 * Canonical pricing contract used by Runtime
 * observability to estimate AI generation cost.
 *
 * Prices are expressed in USD per 1M tokens.
 */

export interface ModelPricing {

  /** Provider identifier. */
  provider: string;

  /** Model identifier. */
  model: string;

  /** Input token price in USD per 1M tokens. */
  inputPerMillion: number;

  /** Output token price in USD per 1M tokens. */
  outputPerMillion: number;

}
