import { useLanguage } from "@/context/LanguageContext";

interface RuntimePhase {
  id: string;
  status: "completed" | "skipped" | "failed";
}

interface RuntimeMetrics {
  durationMs: number;

  provider: string;

  model: string;

  promptTokens?: number;

  completionTokens?: number;

  totalTokens?: number;

  estimatedCost?: number;

  workflow: string;

  stages: string[];

  success: boolean;
}

interface RuntimeCardProps {
  workflow?: string;

  runtime?: {
    model: string;
    version: string;
  };

  metrics?: RuntimeMetrics;

  execution?: {
    phases: RuntimePhase[];
  };

  knowledgeScore?: number;

  qualityScore?: number;
}

export function RuntimeCard({
  workflow,
  runtime,
  metrics,
  execution,
  knowledgeScore,
  qualityScore,
}: RuntimeCardProps) {
  const { t } = useLanguage();

  const runtimeText = t.aiStudio.runtime;

  const hasRuntime = Boolean(runtime);
  const runtimeData = runtime!;

  const phaseStatus = (status: RuntimePhase["status"]) => {
    if (status === "completed") {
      return runtimeText.completed;
    }

    if (status === "skipped") {
      return runtimeText.skipped;
    }

    return runtimeText.failed;
  };

  const formatDuration = (durationMs: number) => {
    if (durationMs < 1000) {
      return `${durationMs} ms`;
    }

    return `${(durationMs / 1000).toFixed(2)} s`;
  };

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm overflow-hidden">
      <header className="border-b border-zinc-800 px-6 py-5">
        <span className="text-xs uppercase tracking-[0.2em] text-violet-400">
          {runtimeText.label}
        </span>

        <h2 className="mt-2 text-xl font-semibold text-white">
          {runtimeText.title}
        </h2>
      </header>

      <div className="p-6">
        {!hasRuntime ? (
          <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/40 p-6">
            <p className="text-sm leading-7 text-zinc-500">
              {runtimeText.empty}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950/60 px-5 py-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  {runtimeText.workflow}
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  {workflow ?? "Editorial Edition"}
                </p>
              </div>

              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                {runtimeText.completed}
              </span>
            </div>

            {execution && (
              <div>
                <p className="mb-4 text-xs uppercase tracking-wider text-zinc-500">
                  {runtimeText.execution}
                </p>

                <div className="space-y-3">
                  {execution.phases.map((phase) => (
                    <div
                      key={phase.id}
                      className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3"
                    >
                      <span className="text-sm capitalize text-zinc-200">
                        {phase.id}
                      </span>

                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                        {phaseStatus(phase.status)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid gap-4">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-5 py-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  {runtimeText.model}
                </p>

                <p className="mt-2 text-lg font-semibold text-white">
                  {runtimeData.model}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-5 py-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  {runtimeText.version}
                </p>

                <p className="mt-2 text-lg font-semibold text-white">
                  {runtimeData.version}
                </p>
              </div>
            </div>

            {metrics && (
              <div>
                <p className="mb-4 text-xs uppercase tracking-wider text-zinc-500">
                  Runtime Metrics
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-5 py-4">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                      Provider
                    </p>

                    <p className="mt-2 text-lg font-semibold text-white">
                      {metrics.provider || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-5 py-4">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                      Latency
                    </p>

                    <p className="mt-2 text-lg font-semibold text-white">
                      {formatDuration(metrics.durationMs)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-5 py-4">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                      Prompt Tokens
                    </p>

                    <p className="mt-2 text-lg font-semibold text-white">
                      {metrics.promptTokens ?? "N/A"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-5 py-4">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                      Completion Tokens
                    </p>

                    <p className="mt-2 text-lg font-semibold text-white">
                      {metrics.completionTokens ?? "N/A"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-5 py-4 sm:col-span-2">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                      Total Tokens
                    </p>

                    <p className="mt-2 text-2xl font-bold text-white">
                      {metrics.totalTokens ?? "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {(knowledgeScore !== undefined ||
              qualityScore !== undefined) && (
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 px-5 py-4">
                  <p className="text-xs uppercase tracking-wider text-violet-300">
                    {runtimeText.knowledgeScore}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-white">
                    {knowledgeScore ?? "N/A"}
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4">
                  <p className="text-xs uppercase tracking-wider text-emerald-300">
                    {runtimeText.qualityScore}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-white">
                    {qualityScore ?? "N/A"}
                  </p>
                </div>
              </div>
            )}

            <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-4">
              <p className="text-xs uppercase tracking-wider text-violet-300">
                {runtimeText.roadmap}
              </p>

              <ul className="mt-3 space-y-2 text-sm leading-6 text-violet-200">
                <li>
                  [OK] {runtimeText.cognitivePhases}
                </li>

                <li>
                  [OK] {runtimeText.runtimeExecution}
                </li>

                <li>
                  [OK] {runtimeText.provider}
                </li>

                <li>
                  [OK] {runtimeText.latency}
                </li>

                <li>
                  [OK] {runtimeText.tokens}
                </li>

                <li>
                  [ ] {runtimeText.cost}
                </li>

                <li>
                  [ ] {runtimeText.cacheStatus}
                </li>

                <li>
                  [ ] {runtimeText.traceId}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}