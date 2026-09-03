/**
 * DREVAIA Editorial Reviewer
 *
 * Revisión básica de calidad editorial.
 */

export interface EditorialReview {
  score: number;
  strengths: string[];
  improvements: string[];
}

export function reviewEditorial(
  editorial: string,
): EditorialReview {

  const normalizedEditorial =
    editorial.trim();

  const length =
    normalizedEditorial.length;

  const strengths: string[] = [];

  const improvements: string[] = [];

  let score = 100;

  if (length > 300) {
    strengths.push(
      "El contenido tiene una buena profundidad.",
    );
  } else {
    improvements.push(
      "Desarrollar más la reflexión.",
    );

    score -= 10;
  }

  if (editorial.includes("\n")) {
    strengths.push(
      "La estructura es fácil de leer.",
    );
  }

  const endsWithValidPunctuation =
    /[.!?]$/.test(normalizedEditorial);

  if (!endsWithValidPunctuation) {
    improvements.push(
      "Revisar la puntuación final.",
    );

    score -= 5;
  }

  return {
    score,
    strengths,
    improvements,
  };
}