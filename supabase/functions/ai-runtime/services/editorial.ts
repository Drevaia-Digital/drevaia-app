import { editorialEngine }
  from "../engines/editorial/EditorialEngine.ts";

import type {
  EditorialEngineResult,
} from "../domain/EditorialEngineResult.ts";

/**
 * Adaptador temporal.
 *
 * Mantiene compatibilidad con el Runtime actual
 * mientras migramos al AI Runtime v2.
 */
export async function generateEditorialEdition(
  reflection: string,
): Promise<EditorialEngineResult> {

  return await editorialEngine.generate(
  reflection,
);

}