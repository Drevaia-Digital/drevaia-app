import { useMemo } from "react";

import { useLanguage } from "@/context/LanguageContext";
import { EditorToolbar } from "./EditorToolbar";

interface EditorialEditorProps {
  content: string;
}

export function EditorialEditor({
  content,
}: EditorialEditorProps) {
  const { t } = useLanguage();

  const editorialText = t.aiStudio.editorial;

  const words = useMemo(() => {
    return content
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
  }, [content]);

  const readingTime = useMemo(() => {
    return Math.max(
      1,
      Math.ceil(words / 200),
    );
  }, [words]);

  const handleComingSoon = () => {
    console.log("Editor action not yet implemented.");
  };

  return (
    <article
      className="
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-950/70
        overflow-hidden
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-zinc-800
          bg-zinc-900/60
          px-6
          py-4
        "
      >
        <div>
          <h3 className="font-semibold text-white">
            {editorialText.editor}
          </h3>

          <p className="mt-1 text-xs text-zinc-500">
            {editorialText.editorSubtitle}
          </p>
        </div>

        <div className="flex gap-6 text-xs text-zinc-400">
          <span>
            {words} {editorialText.words}
          </span>

          <span>
            {readingTime} {editorialText.readingTime}
          </span>
        </div>
      </div>

      <EditorToolbar
        onCopy={handleComingSoon}
        onMarkdown={handleComingSoon}
        onSave={handleComingSoon}
        onImprove={handleComingSoon}
      />

      <div
        className="
          whitespace-pre-wrap
          p-8
          text-[17px]
          leading-9
          text-zinc-200
          selection:bg-violet-600/40
        "
      >
        {content}
      </div>
    </article>
  );
}