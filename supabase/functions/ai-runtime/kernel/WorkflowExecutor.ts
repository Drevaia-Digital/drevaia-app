import { workflowRegistry } from "./WorkflowRegistry.ts";

/**
 * Ejecuta Workflows registrados.
 */
export class WorkflowExecutor {

  async execute(
    workflow: string,
    input: unknown,
  ) {

    const instance =
      workflowRegistry.get(workflow);

    return instance.execute(input);
  }

}

export const workflowExecutor =
  new WorkflowExecutor();