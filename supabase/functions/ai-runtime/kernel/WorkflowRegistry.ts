/**
 * DREVAIA Workflow
 *
 * Todo Workflow debe implementar esta interfaz.
 */
export interface Workflow<TInput = unknown, TResult = unknown> {
  execute(input: TInput): Promise<TResult>;
}

/**
 * Registro central de Workflows.
 */
export class WorkflowRegistry {

  private readonly workflows =
    new Map<string, Workflow>();

  register(
    name: string,
    workflow: Workflow,
  ) {
    this.workflows.set(name, workflow);
  }

  get(name: string): Workflow {

    const workflow =
      this.workflows.get(name);

    if (!workflow) {
      throw new Error(
        `Workflow "${name}" not found.`,
      );
    }

    return workflow;
  }

}

export const workflowRegistry =
  new WorkflowRegistry();