import type { RuntimeContext } from "./RuntimeContext.ts";

/**
 * Contrato que deben cumplir todos los Engines.
 */
export interface RuntimeEngine {

  execute(
    context: RuntimeContext,
  ): Promise<RuntimeContext>;

}

/**
 * Ejecuta una secuencia de Engines.
 */
export class EnginePipeline {

  async execute(

    context: RuntimeContext,

    engines: RuntimeEngine[],

  ): Promise<RuntimeContext> {

    let current = context;

    for (const engine of engines) {

      current =
        await engine.execute(current);

    }

    return current;

  }

}

export const enginePipeline =
  new EnginePipeline();