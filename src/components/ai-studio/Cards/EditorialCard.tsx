import { Sparkles } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { EditorialEditor } from "../Editor";

interface EditorialCardProps {
  editorial: string;
}

export function EditorialCard({
  editorial,
}: EditorialCardProps) {
  const { t } = useLanguage();

  const hasContent = editorial.trim().length > 0;
  const editorialText = t.aiStudio.editorial;

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/40 overflow-hidden backdrop-blur-sm">
      <header className="flex items-center justify-between border-b border-zinc-800 px-8 py-6">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-violet-400">
            {editorialText.label}
          </span>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            {editorialText.title}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
            {editorialText.description}
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 md:flex">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />

          <span className="text-xs font-medium text-emerald-300">
            {editorialText.ready}
          </span>
        </div>
      </header>

      <div className="p-8">
        {hasContent ? (
          <EditorialEditor content={editorial} />
        ) : (
          <div
            className="
              flex
              min-h-[280px]
              flex-col
              items-center
              justify-center
              rounded-2xl
              border
              border-dashed
              border-zinc-700
              bg-zinc-950/40
              px-8
              text-center
            "
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-violet-300">
  <Sparkles size={28} />
</div>

            <h3 className="text-xl font-semibold text-white">
              {editorialText.emptyTitle}
            </h3>

            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">
              {editorialText.emptyDescription}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}