/**
 * DREVAIA Knowledge Retriever
 *
 * Responsible for retrieving the most relevant
 * knowledge entries for a generation request.
 */

import type {
  KnowledgeEntry,
} from "../../domain/KnowledgeEntry.ts";

import type {
  KnowledgeRepository,
} from "../../repositories/KnowledgeRepository.ts";

export interface KnowledgeRetrievalRequest {

  /**
   * User reflection.
   */
  reflection: string;

  /**
   * Detected topic.
   */
  topic?: string;

  /**
   * Detected emotion.
   */
  emotion?: string;

  /**
   * Language.
   */
  language?: string;

  /**
   * Maximum results.
   */
  limit?: number;

}

export class KnowledgeRetriever {

  constructor(

    private readonly repository:
      KnowledgeRepository,

  ) {}

  async retrieve(

    request: KnowledgeRetrievalRequest,

  ): Promise<KnowledgeEntry[]> {

    return await this.repository.search({

      query:
        request.topic ??
        request.reflection,

      limit:
        request.limit ?? 5,

    });

  }

}