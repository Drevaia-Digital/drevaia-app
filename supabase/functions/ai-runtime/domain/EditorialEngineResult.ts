/**
 * Resultado generado por el Editorial Engine.
 */

export interface EditorialReview {

  score: number;

  strengths: string[];

  improvements: string[];

}

export interface EditorialEngineResult {

  editorial: string;

  review: EditorialReview;

  quality: string;

  rewrite: boolean;

  runtime: {

    model: string;

    version: string;

  };

}