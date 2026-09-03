/**
 * DREVAIA Knowledge Context Builder
 */

import type {
  KnowledgeEntry,
} from "../../domain/KnowledgeEntry.ts";

export class KnowledgeContextBuilder {

  build(
    entries: KnowledgeEntry[],
  ): string {

    if (!entries.length) {

      return "";

    }

    return entries.map(entry => {

      return [
        `Topic: ${entry.topic}`,
        `Emotion: ${entry.emotion}`,
        `Summary: ${entry.summary}`,
        `Keywords: ${entry.keywords.join(", ")}`,
        "",
      ].join("\n");

    }).join("\n");

  }

}

export const knowledgeContextBuilder =
  new KnowledgeContextBuilder();