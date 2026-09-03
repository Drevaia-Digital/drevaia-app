import type { EditorialAnalysis } from "../editorial/analyzer.ts";
import { analyzeReflection } from "../editorial/analyzer.ts";

/**
 * AI Analyzer
 *
 * Temporalmente utiliza el analizador local.
 *
 * En la siguiente fase llamará a OpenAI
 * y devolverá exactamente el mismo objeto.
 */
export async function analyzeWithAI(
  reflection: string,
): Promise<EditorialAnalysis> {

  // Fallback actual
  return analyzeReflection(reflection);
}