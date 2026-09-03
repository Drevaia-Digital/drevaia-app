import type { RuntimeContext } from "./RuntimeContext.ts";

/**
 * DREVAIA Runtime Context Factory
 *
 * Creates the initial execution context
 * for every AI Runtime workflow.
 */
export class RuntimeContextFactory {

  create(params: {
    workflow: string;
    language: string;
    reflection: string;
  }): RuntimeContext {

    return {

      /**
       * Unique execution identifier.
       */
      executionId: crypto.randomUUID(),

      /**
       * Workflow information.
       */
      workflow: params.workflow,

      language: params.language,

      reflection: params.reflection,

      /**
       * Runtime outputs.
       */
      editorial: undefined,

      seo: undefined,

      review: undefined,

      runtime: undefined,

      knowledge: undefined,

      /**
       * Runtime metrics.
       */
      metrics: {
        startedAt: Date.now(),
      },

      /**
       * Runtime events.
       */
      events: [],

      /**
       * Shared metadata.
       */
      metadata: {},

    };

  }

}

export const runtimeContextFactory =
  new RuntimeContextFactory();