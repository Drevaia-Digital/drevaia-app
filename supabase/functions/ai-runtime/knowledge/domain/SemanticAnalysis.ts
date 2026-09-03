/**
 * Resultado del análisis semántico realizado por IA.
 */
export interface SemanticAnalysis {

  topic: string;

  subtopic: string;

  emotion: string;

  emotions: string[];

  intent: string;

  narrative: string;

  collection: string;

  keywords: string[];

  summary: string;

  score: number;

}