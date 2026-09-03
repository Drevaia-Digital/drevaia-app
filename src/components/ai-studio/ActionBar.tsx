import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

interface ActionBarProps {
  canExport?: boolean;
  copied?: boolean;
  onCopy?: () => void;
  onMarkdown?: () => void;
  onPdf?: () => void;
  onDocx?: () => void;
}

export function ActionBar({
  canExport = false,
  copied = false,
  onCopy,
  onMarkdown,
  onPdf,
  onDocx,
}: ActionBarProps) {
  const { t } = useLanguage();

  const exportText = t.aiStudio.export;

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-violet-400">
            {exportText.label}
          </span>

          <h3 className="mt-2 text-xl font-semibold text-white">
            {exportText.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            {exportText.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={onCopy}
            disabled={!canExport}
          >
            {copied ? `[OK] ${exportText.copied}` : exportText.copy}
          </Button>

          <Button
            variant="outline"
            onClick={onMarkdown}
            disabled={!canExport}
          >
            {exportText.markdown}
          </Button>

          <Button
            variant="outline"
            onClick={onDocx}
            disabled={!canExport}
          >
            {exportText.docx}
          </Button>

          <Button
            variant="outline"
            onClick={onPdf}
            disabled={!canExport}
          >
            {exportText.pdf}
          </Button>
        </div>
      </div>
    </section>
  );
}