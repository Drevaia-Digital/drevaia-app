/**
 * DREVAIA Knowledge Entry
 *
 * Representa el conocimiento estructurado extraído
 * por el Knowledge Engine.
 */
export interface KnowledgeEntry {

  id?: string;

  projectId: string;

  workflow: string;

  language: string;

  topic: string;

  subtopic?: string;

  emotion: string;

  emotions: string[];

  intent: string;

  narrative: string;

  collection?: string;

  keywords: string[];

  summary: string;

  score: number;

  editorial: string;

  createdAt?: string;

  updatedAt?: string;

}