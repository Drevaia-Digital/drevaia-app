/**
 * DREVAIA Runtime Execution
 *
 * Execution metadata returned
 * after every Runtime invocation.
 */
export interface RuntimeExecution {

  /**
   * Unique execution identifier.
   */
  id: string;

  /**
   * Workflow executed.
   */
  workflow: string;

  /**
   * Execution start.
   */
  startedAt: Date;

  /**
   * Execution end.
   */
  finishedAt?: Date;

  /**
   * Success flag.
   */
  success: boolean;

  /**
   * Optional error.
   */
  error?: string;

  /**
   * Executed cognitive phases.
   */
  phases: RuntimePhase[];

}

export interface RuntimePhase {

  /**
   * Phase identifier.
   */
  id: string;

  /**
   * Execution status.
   */
  status:
    | "completed"
    | "skipped"
    | "failed";

}