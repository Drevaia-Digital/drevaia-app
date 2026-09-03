/**
 * DREVAIA OS
 * Runtime Lifecycle Manager
 */

import {

  ExecutionEventType,

} from "./ExecutionEvents.ts";

import { eventDispatcher } from "./EventDispatcher.ts";

import type { RuntimeContext } from "./RuntimeContext.ts";

export class LifecycleManager {

  started(
    context: RuntimeContext,
  ): void {

    eventDispatcher.dispatch({

      id: crypto.randomUUID(),

      timestamp: Date.now(),

      type: ExecutionEventType.STARTED,

      source: context.workflow,

      message: "Workflow execution started.",

    });

  }

  completed(
    context: RuntimeContext,
  ): void {

    eventDispatcher.dispatch({

      id: crypto.randomUUID(),

      timestamp: Date.now(),

      type: ExecutionEventType.COMPLETED,

      source: context.workflow,

      message: "Workflow execution completed.",

    });

  }

  failed(

    context: RuntimeContext,

    error: Error,

  ): void {

    eventDispatcher.dispatch({

      id: crypto.randomUUID(),

      timestamp: Date.now(),

      type: ExecutionEventType.FAILED,

      source: context.workflow,

      message: error.message,

    });

  }

}

export const lifecycleManager =
  new LifecycleManager();