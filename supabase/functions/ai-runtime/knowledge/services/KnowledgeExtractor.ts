import type { KnowledgeEntry } from "../domain/KnowledgeEntry.ts";

/**
 * DREVAIA Knowledge Extractor
 *
 * Responsable de transformar una Editorial Edition
 * en conocimiento estructurado.
 */
export class KnowledgeExtractor {
  extract(
    _reflection: string,
    _editorial: string,
    language: string,
  ): KnowledgeEntry {

    return {
      projectId: "",

      language,

      topic: "",

      subtopic: "",

      emotion: "",

      emotions: [],

      intent: "",

      narrative: "",

      collection: "",

      keywords: [],

      summary: "",

      score: 0,
    };
  }
}

export const knowledgeExtractor =
  new KnowledgeExtractor();