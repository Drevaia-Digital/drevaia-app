/**
 * DREVAIA OS
 * Runtime Execution Events
 */

export enum ExecutionEventType {

  STARTED = "started",

  ENGINE_STARTED = "engine.started",

  ENGINE_FINISHED = "engine.finished",

  WORKFLOW_STARTED = "workflow.started",

  WORKFLOW_FINISHED = "workflow.finished",

  COMPLETED = "completed",

  FAILED = "failed",

}

export interface ExecutionEvent {

  id: string;

  timestamp: number;

  type: ExecutionEventType;

  source: string;

  message: string;

  metadata?: Record<string, unknown>;

}