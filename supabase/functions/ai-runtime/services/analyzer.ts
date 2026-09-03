import type { EditorialAnalysis } from "../editorial/analyzer.ts";
import { analyzeReflection } from "../editorial/analyzer.ts";

/**
 * Analysis Service
 *
 * Hoy usa reglas locales.
 * En el futuro utilizará OpenAI sin que el resto del sistema cambie.
 */
export async function analyzeEditorial(
  reflection: string,
): Promise<EditorialAnalysis> {
  return analyzeReflection(reflection);
}