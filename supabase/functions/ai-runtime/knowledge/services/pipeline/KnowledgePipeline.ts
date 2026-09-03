import type { KnowledgeEntry } from "../../domain/KnowledgeEntry.ts";

import { semanticEngine }
  from "../semantic/SemanticEngine.ts";

import { knowledgeBuilder }
  from "../builders/KnowledgeBuilder.ts";

import type {
  AICallMetricsSink,
} from "../../../runtime/AICallMetricsSink.ts";

/**
 * DREVAIA Knowledge Pipeline
 *
 * Coordina todos los analizadores del Knowledge Engine
 * y construye una entrada de conocimiento.
 */
export class KnowledgePipeline {

  async process(

  reflection: string,

  editorial: string,

  language: string,

  metricsSink?: AICallMetricsSink,

): Promise<KnowledgeEntry> {

    const analysis =
  await semanticEngine.analyze(
    editorial,
    language,
    metricsSink,
  );

    return knowledgeBuilder.build({

      workflow: "create-editorial-edition",

      language,

      topic: analysis.topic,

      subtopic: analysis.subtopic,

      emotion: analysis.emotion,

      emotions: analysis.emotions,

      intent: analysis.intent,

      narrative: analysis.narrative,

      collection: analysis.collection,

      keywords: analysis.keywords,

      summary: analysis.summary,

      score: analysis.score,

      editorial,

    });

  }

}

export const knowledgePipeline =
  new KnowledgePipeline();