import type {
  EditorialEngineResult,
} from "./EditorialEngineResult.ts";

import type {
  SEOResult,
} from "../seo/domain/SEOResult.ts";

import type {
  KnowledgeEntry,
} from "../knowledge/domain/KnowledgeEntry.ts";

import type {
  RuntimeExecution,
} from "./RuntimeExecution.ts";

import type {
  RuntimeMetrics,
} from "../runtime/RuntimeMetrics.ts";

/**
 * Official Runtime response
 * for Editorial Edition.
 */
export interface CreateEditorialEditionResponse {

  success: boolean;

  workflow: string;

  /**
   * Generated Editorial Edition.
   */
  editorial: string;

  /**
   * Structured semantic knowledge.
   */
  knowledge: KnowledgeEntry;

  /**
   * SEO optimization.
   */
  seo: SEOResult;

  /**
   * Editorial review.
   */
  review: EditorialEngineResult["review"];

  /**
   * Runtime metadata.
   */
  runtime: EditorialEngineResult["runtime"];

  /**
   * Runtime execution metrics.
   */
  metrics: RuntimeMetrics;

  /**
   * Runtime execution report.
   */
  execution: RuntimeExecution;

}