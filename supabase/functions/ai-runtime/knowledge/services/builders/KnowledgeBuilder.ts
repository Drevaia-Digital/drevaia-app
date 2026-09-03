import type { KnowledgeEntry } from "../../domain/KnowledgeEntry.ts";

/**
 * DREVAIA Knowledge Builder
 *
 * Construye una KnowledgeEntry a partir
 * del resultado de los analizadores.
 */
export class KnowledgeBuilder {

  build(data: {
    projectId?: string;

    workflow?: string;

    language: string;

    topic: string;

    subtopic?: string;

    emotion?: string;

    emotions?: string[];

    intent?: string;

    narrative?: string;

    collection?: string;

    keywords?: string[];

    summary?: string;

    score?: number;
  
    editorial?: string;

  }): KnowledgeEntry {

    return {

      projectId: data.projectId ?? "",

      workflow: data.workflow ?? "create-editorial-edition",

      language: data.language,

      topic: data.topic,

      subtopic: data.subtopic ?? "",

      emotion: data.emotion ?? "",

      emotions: data.emotions ?? [],

      intent: data.intent ?? "",

      narrative: data.narrative ?? "",

      collection: data.collection ?? "",

      keywords: data.keywords ?? [],

      summary: data.summary ?? "",

      score: data.score ?? 0,
    
      editorial: data.editorial ?? "",

updatedAt: undefined,

    };
  }

}

export const knowledgeBuilder =
  new KnowledgeBuilder();