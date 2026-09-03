export interface ExportContent {
  title?: string;
  content: string;
}

class ExportService {
  async copy(content: ExportContent): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(content.content);
      return true;
    } catch (error) {
      console.error("Clipboard error:", error);
      return false;
    }
  }

  downloadMarkdown(content: ExportContent) {
    const markdown = `# ${content.title ?? "DREVAIA Editorial Edition"}

${content.content}
`;

    this.downloadFile(
      markdown,
      this.createFilename(content.title, "md"),
      "text/markdown;charset=utf-8"
    );
  }

  downloadText(content: ExportContent) {
    this.downloadFile(
      content.content,
      this.createFilename(content.title, "txt"),
      "text/plain;charset=utf-8"
    );
  }

  downloadPDF() {
    throw new Error("PDF export not implemented yet.");
  }

  downloadDOCX() {
    throw new Error("DOCX export not implemented yet.");
  }

  private createFilename(
    title: string | undefined,
    extension: string
  ) {
    const name =
      title
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") ||
      "drevaia-editorial-edition";

    return `${name}.${extension}`;
  }

  private downloadFile(
    content: string,
    filename: string,
    mime: string
  ) {
    const blob = new Blob([content], {
      type: mime,
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
  }
}

export const exportService = new ExportService();