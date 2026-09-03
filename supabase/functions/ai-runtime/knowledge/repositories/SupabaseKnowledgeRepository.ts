import type {
  KnowledgeRepository,
} from "./KnowledgeRepository.ts";

import type {
  KnowledgeEntry,
} from "../domain/KnowledgeEntry.ts";

/**
 * Implementación del repositorio utilizando Supabase.
 */
export class SupabaseKnowledgeRepository
  implements KnowledgeRepository {

  async save(
    entry: KnowledgeEntry,
  ): Promise<void> {

    console.log(
      "Saving KnowledgeEntry",
      entry,
    );

  }

  async findByProject(
    projectId: string,
  ): Promise<KnowledgeEntry | null> {

    console.log(
      "Find project",
      projectId,
    );

    return null;

  }

  async findByTopic(
    topic: string,
  ): Promise<KnowledgeEntry[]> {

    console.log(
      "Find topic",
      topic,
    );

    return [];

  }

  async findByEmotion(
    emotion: string,
  ): Promise<KnowledgeEntry[]> {

    console.log(
      "Find emotion",
      emotion,
    );

    return [];

  }

  async search(
    query: string,
  ): Promise<KnowledgeEntry[]> {

    console.log(
      "Semantic search",
      query,
    );

    return [];

  }

  async update(
    entry: KnowledgeEntry,
  ): Promise<void> {

    console.log(
      "Update",
      entry,
    );

  }

  async delete(
    id: string,
  ): Promise<void> {

    console.log(
      "Delete",
      id,
    );

  }

}

export const
supabaseKnowledgeRepository =
new SupabaseKnowledgeRepository();