import type { EditorialReview } from "./reviewer.ts";

export interface QualityGateResult {
  approved: boolean;
  reason?: string;
}

export function evaluateQuality(
  review: EditorialReview,
): QualityGateResult {

  if (review.score < 90) {
    return {
      approved: false,
      reason: "Quality score below minimum threshold.",
    };
  }

  if (review.improvements.length > 0) {
    return {
      approved: false,
      reason: review.improvements.join(" "),
    };
  }

  return {
    approved: true,
  };
}