/**
 * DREVAIA AI Project
 *
 * Domain model shared across the entire AI Platform.
 * This model is independent from React, Supabase and UI.
 */

import type {
  AIWorkspaceRuntime,
  AIWorkspaceReview,
  AIWorkspaceSEO,
} from "@/application/ai/workspace/AIWorkspace";

/**
 * Persisted AI Project.
 */
export interface AIProject {
  id: string;

  createdAt?: string;

  updatedAt?: string;

  userId: string | null;

  language: string;

  workflow: string;

  title: string | null;

  reflection: string;

  editorial: string;

  seo: AIWorkspaceSEO | null;

  review: AIWorkspaceReview | null;

  runtime: AIWorkspaceRuntime | null;
}

/**
 * Payload used when creating a project.
 */
export interface AIProjectInsert {
  userId?: string | null;

  language: string;

  workflow: string;

  title?: string | null;

  reflection: string;

  editorial: string;

  seo: AIWorkspaceSEO | null;

  review: AIWorkspaceReview | null;

  runtime: AIWorkspaceRuntime | null;
}

/**
 * Payload used when updating a project.
 */
export interface AIProjectUpdate
  extends Partial<AIProjectInsert> {
  id: string;
}

/**
 * Lightweight model for project history.
 */
export interface AIProjectSummary {
  id: string;

  title: string | null;

  workflow: string;

  language: string;

  createdAt?: string;

  updatedAt?: string;
}