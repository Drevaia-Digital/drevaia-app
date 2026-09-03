/**
 * DREVAIA OS
 * Workflow Bootstrap
 *
 * Registers all available workflows.
 */

import { workflowRegistry } from "../kernel/WorkflowRegistry.ts";

import {
  createEditorialEditionWorkflowInstance,
} from "../workflows/create-editorial-edition.ts";

export function configureWorkflows(): void {

  workflowRegistry.register(
    "create-editorial-edition",
    createEditorialEditionWorkflowInstance,
  );

}