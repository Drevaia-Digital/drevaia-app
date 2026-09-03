/**
 * Esquema de análisis editorial utilizado por DREVAIA.
 *
 * Este objeto representa el resultado esperado del AI Analyzer.
 */

export interface EditorialAnalysisSchema {
  emotion: string;
  secondaryEmotion: string;
  theme: string;
  intensity: number;
  audience: string;
  tone: string;
  conflict: string;
  hope: string;
  symbols: string[];
}