import type { KnowledgeEntry } from "../knowledge/domain/KnowledgeEntry.ts";
/**
 * Runtime Metrics
 */
export interface RuntimeMetrics {
  startedAt: number;
  finishedAt?: number;
  durationMs?: number;
}

/**
 * Runtime Event
 */
export interface RuntimeEvent {
  timestamp: number;
  type: string;
  message: string;
}

/**
 * Shared execution state during an entire workflow.
 */
export interface RuntimeContext {

  /**
   * Unique execution id.
   */
  executionId: string;

  /**
   * Workflow identifier.
   */
  workflow: string;

  /**
   * Requested language.
   */
  language: string;

  /**
   * Original user reflection.
   */
  reflection: string;

  /**
   * Editorial output.
   */
  editorial?: string;

  /**
   * SEO output.
   */
  seo?: {
    title: string;
    description: string;
    keywords: string[];
    slug: string;
  };

  /**
   * Editorial review.
   */
  review?: {
    score: number;
    strengths: string[];
    improvements: string[];
  };

  /**
   * Runtime information.
   */
  runtime?: {
    provider: string;
    model: string;
    version: string;
  };

  /**
   * Knowledge generated during execution.
   */
  knowledge?: KnowledgeEntry;

  /**
   * Execution metrics.
   */
  metrics: RuntimeMetrics;

  /**
   * Runtime events.
   */
  events: RuntimeEvent[];

  /**
   * Shared metadata.
   */
  metadata: Record<string, unknown>;
}