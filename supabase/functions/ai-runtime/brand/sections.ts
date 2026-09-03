export function promptSection(
  title: string,
  content: string,
): string {
  return `
========================
${title.toUpperCase()}
========================

${content}
`;
}