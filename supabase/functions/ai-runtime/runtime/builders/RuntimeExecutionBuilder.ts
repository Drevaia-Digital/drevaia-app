import type {
  RuntimeExecution,
} from "../../domain/RuntimeExecution.ts";

/**
 * DREVAIA Runtime Execution Builder
 *
 * Builds the execution report returned
 * by the Runtime.
 */
export class RuntimeExecutionBuilder {

  build(params: {
    executionId: string;
    workflow: string;
    startedAt: number;
    finishedAt: number;
    success: boolean;
    error?: string;
  }): RuntimeExecution {

    return {

      id:
        params.executionId,

      workflow:
        params.workflow,

      startedAt:
        new Date(params.startedAt),

      finishedAt:
        new Date(params.finishedAt),

      success:
        params.success,

      error:
        params.error,

      phases: [

        {
          id: "perception",
          status: "completed",
        },

        {
          id: "reasoning",
          status: "completed",
        },

        {
          id: "writing",
          status: "completed",
        },

        {
          id: "optimization",
          status: "completed",
        },

      ],

    };

  }

}

export const runtimeExecutionBuilder =
  new RuntimeExecutionBuilder();