/**
 * DREVAIA Editorial Edition
 *
 * Dominio compartido por todo el AI Runtime.
 */

export interface EditorialSEO {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
}

export interface EditorialReview {
  score: number;
  strengths: string[];
  improvements: string[];
}

export interface EditorialRuntime {
  model: string;
  version: string;
}

export interface EditorialEdition {
  editorial: string;

  seo: EditorialSEO;

  review: EditorialReview;

  runtime: EditorialRuntime;
}