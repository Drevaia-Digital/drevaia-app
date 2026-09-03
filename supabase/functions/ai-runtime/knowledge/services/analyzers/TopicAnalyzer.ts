/**
 * DREVAIA Topic Analyzer
 *
 * Detecta el tema principal de una reflexión.
 */
export class TopicAnalyzer {
  analyze(reflection: string): string {
    const text = reflection.toLowerCase();

    if (
      text.includes("perdón") ||
      text.includes("perdonar")
    ) {
      return "Perdón";
    }

    if (
      text.includes("amor")
    ) {
      return "Amor";
    }

    if (
      text.includes("miedo")
    ) {
      return "Miedo";
    }

    if (
      text.includes("sanar") ||
      text.includes("sanación")
    ) {
      return "Sanación";
    }

    if (
      text.includes("esperanza")
    ) {
      return "Esperanza";
    }

    return "Reflexión";
  }
}

export const topicAnalyzer =
  new TopicAnalyzer();