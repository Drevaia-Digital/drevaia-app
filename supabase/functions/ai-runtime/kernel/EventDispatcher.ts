/**
 * DREVAIA OS
 * Runtime Event Dispatcher
 */

import type { ExecutionEvent } from "./ExecutionEvents.ts";

export class EventDispatcher {

  private readonly events: ExecutionEvent[] = [];

  dispatch(
    event: ExecutionEvent,
  ): void {

    this.events.push(event);

  }

  all(): ExecutionEvent[] {

    return [...this.events];

  }

  clear(): void {

    this.events.length = 0;

  }

}

export const eventDispatcher =
  new EventDispatcher();