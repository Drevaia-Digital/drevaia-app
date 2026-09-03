import { Workflow } from "../../kernel/WorkflowRegistry.ts";

import type {
  EditorialGenerationRequest,
} from "../../domain/EditorialGenerationRequest.ts";

import { createEditorialEditionWorkflow }
  from "../create-editorial-edition.ts";

/**
 * Workflow oficial para Editorial Edition.
 */
export class CreateEditorialEditionWorkflow
  implements Workflow<EditorialGenerationRequest> {

  async execute(
    input: EditorialGenerationRequest,
  ) {

    const reflection =
      input.reflection ?? "";

    return createEditorialEditionWorkflow(
      reflection,
    );

  }

}

export const
createEditorialEditionWorkflowInstance =
new CreateEditorialEditionWorkflow();