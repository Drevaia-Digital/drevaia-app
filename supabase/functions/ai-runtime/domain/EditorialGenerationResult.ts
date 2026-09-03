/**
 * DREVAIA Runtime
 *
 * Resultado oficial de cualquier generación editorial.
 */

export interface SEOResult {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
}

export interface ReviewResult {
  score: number;
  strengths: string[];
  improvements: string[];
}

export interface RuntimeResult {
  model: string;
  version: string;
}

export interface EditorialGenerationResult {
  success: boolean;

  workflow: string;

  editorial: string;

  seo: SEOResult;

  review: ReviewResult;

  runtime: RuntimeResult;
}