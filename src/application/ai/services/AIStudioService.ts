/**
 * DREVAIA AI Studio Service
 *
 * Application Service responsible for coordinating
 * AI Studio operations.
 */

import { aiService } from "@/services/ai";

import { aiProjectsRepository }
  from "../workspace/AIProjectsRepository";

import { aiWorkspaceMapper }
  from "../workspace/AIWorkspaceMapper";

import type {
  CreateEditorialEditionRequest,
  CreateEditorialEditionResponse,
} from "@/services/ai";

import type {
  AIWorkspaceState,
} from "../workspace/AIWorkspace";

export class AIStudioService {

  /**
   * Generates a complete Editorial Edition.
   */
  async generateEditorialEdition(
    request: CreateEditorialEditionRequest,
  ): Promise<CreateEditorialEditionResponse> {

    return await aiService.createEditorialEdition(
      request,
    );

  }

  /**
   * Persists the current Workspace.
   */
  async saveWorkspace(
  workspace: AIWorkspaceState,
  language: string,
  userId: string,
): Promise<void> {

    const project =
  aiWorkspaceMapper.workspaceToProject(
    workspace,
    language,
    userId,
  );

    await aiProjectsRepository.save(
      project,
    );

  }

}

export const aiStudioService =
  new AIStudioService();