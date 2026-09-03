import type { ReflectionInput } from "./types/reflection-input";
import type { ContentEdition } from "./types/content-edition";

export interface ContentEngine {
  createEdition(input: ReflectionInput): Promise<ContentEdition>;
}