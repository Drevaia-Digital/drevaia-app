import { useLanguage } from "@/context/LanguageContext";

interface KnowledgeCardProps {
  knowledge?: {
    topic: string;
    subtopic?: string;
    emotion: string;
    emotions: string[];
    intent: string;
    narrative: string;
    collection?: string;
    keywords: string[];
    summary: string;
    score: number;
  };
}

export function KnowledgeCard({
  knowledge,
}: KnowledgeCardProps) {
  const { t } = useLanguage();

  const hasKnowledge = Boolean(knowledge);
  const data = knowledge!;
  const knowledgeText = t.aiStudio.knowledge;

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm overflow-hidden">
      <header className="border-b border-zinc-800 px-6 py-5">
        <span className="text-xs uppercase tracking-[0.2em] text-violet-400">
          {knowledgeText.label}
        </span>

        <h2 className="mt-2 text-xl font-semibold text-white">
          {knowledgeText.title}
        </h2>
      </header>

      <div className="p-6">
        {!hasKnowledge ? (
          <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/40 p-6">
            <p className="text-sm leading-7 text-zinc-500">
              {knowledgeText.empty}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                {knowledgeText.score}
              </p>

              <div className="mt-4 text-6xl font-bold text-violet-400">
                {data.score}
              </div>

              <p className="mt-2 text-sm text-zinc-500">
                /100
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
                {knowledgeText.topic}
              </p>

              <p className="text-sm leading-7 text-zinc-200">
                {data.topic}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
                {knowledgeText.subtopic}
              </p>

              <p className="text-sm leading-7 text-zinc-300">
                {data.subtopic || "N/A"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
                {knowledgeText.emotion}
              </p>

              <p className="text-sm leading-7 text-zinc-300">
                {data.emotion}
              </p>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-wider text-zinc-500">
                {knowledgeText.emotions}
              </p>

              <div className="flex flex-wrap gap-2">
                {data.emotions.length > 0 ? (
                  data.emotions.map((emotion, index) => (
                    <span
                      key={`${emotion}-${index}`}
                      className="rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-3 py-1 text-xs text-fuchsia-300"
                    >
                      {emotion}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-zinc-500">
                    N/A
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
                {knowledgeText.intent}
              </p>

              <p className="text-sm leading-7 text-zinc-300">
                {data.intent}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
                {knowledgeText.narrative}
              </p>

              <p className="text-sm leading-7 text-zinc-300">
                {data.narrative}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
                {knowledgeText.collection}
              </p>

              <p className="text-sm leading-7 text-zinc-300">
                {data.collection || "N/A"}
              </p>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-wider text-zinc-500">
                {knowledgeText.keywords}
              </p>

              <div className="flex flex-wrap gap-2">
                {data.keywords.map((keyword, index) => (
                  <span
                    key={`${keyword}-${index}`}
                    className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-300"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
                {knowledgeText.summary}
              </p>

              <p className="text-sm leading-7 text-zinc-300">
                {data.summary}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}