/**
 * SEO Service (v1)
 *
 * Primera implementación.
 * Más adelante será reemplazada por un generador basado en IA.
 */

export interface SEOResult {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
}

export function generateSEO(
  editorial: string,
): SEOResult {

  const firstSentence =
    editorial.split(".")[0].trim();

  return {

    title: firstSentence,

    description:
      editorial.substring(0, 155).trim(),

    keywords: [
      "reflexión",
      "desarrollo personal",
      "bienestar emocional",
    ],

    slug:
      firstSentence
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-"),

  };

}