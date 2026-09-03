/**
 * DREVAIA OS
 * Runtime Middleware Pipeline
 */

import type { RuntimeContext } from "./RuntimeContext.ts";
import type { Middleware } from "./Middleware.ts";

export class MiddlewarePipeline {

  async execute(

    context: RuntimeContext,

    middlewares: Middleware[],

  ): Promise<RuntimeContext> {

    let current = context;

    for (const middleware of middlewares) {

      current =
        await middleware.execute(current);

    }

    return current;

  }

}

export const middlewarePipeline =
  new MiddlewarePipeline();