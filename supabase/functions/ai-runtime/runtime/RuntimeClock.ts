/**
 * DREVAIA Runtime Clock
 *
 * Centralized time provider for the AI Runtime.
 */
export class RuntimeClock {

  /**
   * Current timestamp.
   */
  now(): Date {

    return new Date();

  }

  /**
   * Calculates duration in milliseconds.
   */
  duration(

    startedAt: Date,

    finishedAt: Date,

  ): number {

    return (
      finishedAt.getTime() -
      startedAt.getTime()
    );

  }

}

export const runtimeClock =
  new RuntimeClock();