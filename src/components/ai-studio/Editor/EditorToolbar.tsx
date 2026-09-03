import {
  Copy,
  FileText,
  Save,
  Sparkles,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

interface EditorToolbarProps {
  onCopy?: () => void;
  onMarkdown?: () => void;
  onImprove?: () => void;
  onSave?: () => void;
}

export function EditorToolbar({
  onCopy,
  onMarkdown,
  onImprove,
  onSave,
}: EditorToolbarProps) {
  const { t } = useLanguage();

  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        gap-3
        border-b
        border-zinc-800
        bg-zinc-900/50
        px-6
        py-4
      "
    >
      <ToolbarButton
        icon={<Copy size={16} />}
        label={t.aiStudio.toolbar.copy}
        onClick={onCopy}
      />

      <ToolbarButton
        icon={<FileText size={16} />}
        label={t.aiStudio.toolbar.markdown}
        onClick={onMarkdown}
      />

      <ToolbarButton
        icon={<Save size={16} />}
        label={t.aiStudio.toolbar.save}
        onClick={onSave}
      />

      <ToolbarButton
        icon={<Sparkles size={16} />}
        label={t.aiStudio.toolbar.improve}
        onClick={onImprove}
      />
    </div>
  );
}

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function ToolbarButton({
  icon,
  label,
  onClick,
}: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        flex
        items-center
        gap-2
        rounded-xl
        border
        border-zinc-700
        bg-zinc-900
        px-4
        py-2
        text-sm
        text-zinc-300
        transition
        hover:border-violet-500
        hover:text-white
      "
    >
      {icon}
      {label}
    </button>
  );
}