/**
 * DREVAIA OS
 * Runtime Middleware
 */

import type { RuntimeContext } from "./RuntimeContext.ts";

export interface Middleware {

  execute(
    context: RuntimeContext,
  ): Promise<RuntimeContext>;

}