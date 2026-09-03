/**
 * DREVAIA OS
 * Create Editorial Edition
 * Data Transfer Objects
 */

export interface CreateEditorialEditionRequest {
  reflection: string;
  language: string;
}

export interface CreateEditorialEditionResponse {
  id: string;

  status: "draft" | "published";

  edition: unknown;

  createdAt: string;
}