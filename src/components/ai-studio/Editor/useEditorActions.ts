import { exportService } from "@/application/export/ExportService";

interface EditorActionsProps {
  title: string;
  content: string;
}

export function useEditorActions({
  title,
  content,
}: EditorActionsProps) {

  const copy = async () => {

    return await exportService.copy({
      title,
      content,
    });

  };

  const markdown = () => {

    exportService.downloadMarkdown({
      title,
      content,
    });

  };

  const save = () => {

    console.log("Guardar proyecto (próximamente)");

  };

  const improve = () => {

    console.log("AI Improve (próximamente)");

  };

  return {

    copy,
    markdown,
    save,
    improve,

  };

}