/**
 * DREVAIA OS
 * Knowledge Repository Contract
 */

import type {
  KnowledgeEntry,
} from "../domain/KnowledgeEntry.ts";

import type {
  KnowledgeSearchRequest,
} from "../KnowledgeRepository.ts";

export interface KnowledgeRepository {

  /**
   * Stores knowledge.
   */
  save(
    entry: KnowledgeEntry,
  ): Promise<void>;

  /**
   * Finds knowledge by project.
   */
  findByProject(
    projectId: string,
  ): Promise<KnowledgeEntry | null>;

  /**
   * Finds knowledge by topic.
   */
  findByTopic(
    topic: string,
  ): Promise<KnowledgeEntry[]>;

  /**
   * Finds knowledge by emotion.
   */
  findByEmotion(
    emotion: string,
  ): Promise<KnowledgeEntry[]>;

  /**
   * Semantic search.
   */
  search(
    request: KnowledgeSearchRequest,
  ): Promise<KnowledgeEntry[]>;

  /**
   * Updates knowledge.
   */
  update(
    entry: KnowledgeEntry,
  ): Promise<void>;

  /**
   * Deletes knowledge.
   */
  delete(
    id: string,
  ): Promise<void>;

}