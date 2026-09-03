/**
 * DREVAIA AI Workspace Mapper
 *
 * Responsible for converting between
 * persisted AI Projects and the
 * in-memory AI Workspace.
 */

import type {
  AIWorkspaceState,
} from "./AIWorkspace";

import type {
  AIProject,
  AIProjectInsert,
} from "@/types/ai/AIProject";

export class AIWorkspaceMapper {

  /**
   * Converts a persisted project
   * into a Workspace state.
   */
  projectToWorkspace(
    project: AIProject,
  ): AIWorkspaceState {

    return {

      reflection: project.reflection,

      loading: false,

      error: null,

      workflow: project.workflow,

      editorial: project.editorial,

      knowledge: null,

      seo: project.seo,

      review: project.review,

            runtime: project.runtime,

      /**
       * Runtime metrics are not yet persisted.
       * They are generated during the current Runtime execution.
       */
      metrics: null,

      /**
       * Execution report is not yet persisted.
       * It is generated during the current Runtime execution.
       */
      execution: null,

    };

  }

  /**
   * Converts the current Workspace
   * into a persistable project.
   */
  workspaceToProject(
  workspace: AIWorkspaceState,
  language: string,
  userId: string,
): AIProjectInsert {

    return {

      language,

      userId,

      workflow: workspace.workflow,

      reflection: workspace.reflection,

      editorial: workspace.editorial,

      title:
        workspace.seo?.title ?? null,

      seo: workspace.seo,

      review: workspace.review,

      runtime: workspace.runtime,

      // execution is intentionally omitted.
      // It will be persisted in a future Runtime version.

    };

  }

}

export const aiWorkspaceMapper =
  new AIWorkspaceMapper();