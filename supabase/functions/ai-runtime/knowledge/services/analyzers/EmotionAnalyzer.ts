/**
 * DREVAIA Emotion Analyzer
 *
 * Detecta la emoción predominante
 * de una reflexión.
 */
export class EmotionAnalyzer {

  analyze(
    reflection: string,
  ): string {

    const text =
      reflection.toLowerCase();

    if (
      text.includes("miedo") ||
      text.includes("temor")
    ) {
      return "Miedo";
    }

    if (
      text.includes("amor") ||
      text.includes("amar")
    ) {
      return "Amor";
    }

    if (
      text.includes("esperanza")
    ) {
      return "Esperanza";
    }

    if (
      text.includes("triste") ||
      text.includes("dolor")
    ) {
      return "Tristeza";
    }

    if (
      text.includes("alegr")
    ) {
      return "Alegría";
    }

    return "Reflexión";
  }

}

export const emotionAnalyzer =
  new EmotionAnalyzer();