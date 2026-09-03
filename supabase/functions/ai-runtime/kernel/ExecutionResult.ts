/**
 * DREVAIA OS
 * Runtime Execution Result
 */

import type { RuntimeContext } from "./RuntimeContext.ts";

export interface ExecutionResult {

  success: boolean;

  context: RuntimeContext;

  error?: Error;

}