import { useLanguage } from "@/context/LanguageContext";

interface QualityCardProps {
  review?: {
    score: number;
    strengths: string[];
    improvements: string[];
  };
}

export function QualityCard({
  review,
}: QualityCardProps) {
  const { t } = useLanguage();

  const qualityText = t.aiStudio.quality;

  const hasReview = Boolean(review);
  const reviewData = review!;

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm overflow-hidden">
      <header className="border-b border-zinc-800 px-6 py-5">
        <span className="text-xs uppercase tracking-[0.2em] text-violet-400">
          {qualityText.label}
        </span>

        <h2 className="mt-2 text-xl font-semibold text-white">
          {qualityText.title}
        </h2>
      </header>

      <div className="p-6">
        {!hasReview ? (
          <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/40 p-6">
            <p className="text-sm leading-7 text-zinc-500">
              {qualityText.empty}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                {qualityText.overallScore}
              </p>

              <div className="mt-4 text-6xl font-bold text-emerald-400">
                {reviewData.score}
              </div>

              <p className="mt-2 text-sm text-zinc-500">
                /100
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-400">
                {qualityText.strengths}
              </h3>

              <ul className="space-y-3">
                {reviewData.strengths.map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm leading-6 text-emerald-200"
                  >
                    [OK] {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-400">
                {qualityText.improvements}
              </h3>

              <ul className="space-y-3">
                {reviewData.improvements.map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm leading-6 text-amber-200"
                  >
                    [→] {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}