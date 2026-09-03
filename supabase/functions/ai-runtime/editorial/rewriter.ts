import type { EditorialReview } from "./reviewer.ts";

export interface RewriteRequest {
  editorial: string;
  review: EditorialReview;
}

export function shouldRewrite(
  request: RewriteRequest,
): boolean {

  if (request.review.score < 90) {
    return true;
  }

  if (request.review.improvements.length > 0) {
    return true;
  }

  return false;
}