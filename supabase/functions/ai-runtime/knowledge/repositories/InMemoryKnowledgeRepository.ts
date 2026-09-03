import type { KnowledgeEntry }
  from "../domain/KnowledgeEntry.ts";

import type { KnowledgeRepository }
  from "./KnowledgeRepository.ts";

/**
 * Implementación temporal en memoria.
 *
 * Más adelante será reemplazada por Supabase.
 */
export class InMemoryKnowledgeRepository
  implements KnowledgeRepository {

  private entries: KnowledgeEntry[] = [];

  async save(
    entry: KnowledgeEntry,
  ): Promise<void> {

    this.entries.push(entry);

  }

  async findByProject(
    projectId: string,
  ): Promise<KnowledgeEntry | null> {

    return (
      this.entries.find(
        entry => entry.projectId === projectId,
      ) ?? null
    );

  }

  async findByTopic(
    topic: string,
  ): Promise<KnowledgeEntry[]> {

    return this.entries.filter(
      entry => entry.topic === topic,
    );

  }

  async findByEmotion(
    emotion: string,
  ): Promise<KnowledgeEntry[]> {

    return this.entries.filter(
      entry => entry.emotion === emotion,
    );

  }

  async search(): Promise<KnowledgeEntry[]> {

    return [];

  }

  async update(): Promise<void> {

    // Se implementará más adelante.

  }

  async delete(): Promise<void> {

    // Se implementará más adelante.

  }

}

export const knowledgeRepository =
  new InMemoryKnowledgeRepository();