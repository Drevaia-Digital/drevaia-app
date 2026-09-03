import { useLanguage } from "@/context/LanguageContext";

interface SEOCardProps {
  seo?: {
    title: string;
    description: string;
    keywords: string[];
    slug: string;
  };
}

export function SEOCard({
  seo,
}: SEOCardProps) {
  const { t } = useLanguage();

  const seoText = t.aiStudio.seo;

  const hasSEO = Boolean(seo);
  const seoData = seo!;

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm overflow-hidden">
      <header className="border-b border-zinc-800 px-6 py-5">
        <span className="text-xs uppercase tracking-[0.2em] text-violet-400">
          {seoText.label}
        </span>

        <h2 className="mt-2 text-xl font-semibold text-white">
          {seoText.title}
        </h2>
      </header>

      <div className="p-6">
        {!hasSEO ? (
          <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/40 p-6">
            <p className="text-sm leading-7 text-zinc-500">
              {seoText.empty}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
                {seoText.titleField}
              </p>

              <p className="text-sm leading-7 text-zinc-200">
                {seoData.title}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
                {seoText.description}
              </p>

              <p className="text-sm leading-7 text-zinc-300">
                {seoData.description}
              </p>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-wider text-zinc-500">
                {seoText.keywords}
              </p>

              <div className="flex flex-wrap gap-2">
                {seoData.keywords.map((keyword, index) => (
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
                {seoText.slug}
              </p>

              <code className="rounded-lg bg-zinc-950 px-3 py-2 text-sm text-emerald-300">
                {seoData.slug}
              </code>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}