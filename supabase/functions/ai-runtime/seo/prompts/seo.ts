/**
 * DREVAIA SEO Prompt
 *
 * Construye el prompt para generar
 * metadatos SEO profesionales.
 */

export function buildSEOPrompt(
  editorial: string,
  language: string,
): string {

  return `
Eres el SEO Engine oficial de DREVAIA.

Genera todos los metadatos SEO en el idioma especificado.

Idioma:
${language}

Analiza la siguiente Editorial Edition.

Devuelve ÚNICAMENTE un objeto JSON válido.

No utilices Markdown.

No utilices \`\`\`json.

No escribas explicaciones.

No escribas texto antes del JSON.

No escribas texto después del JSON.

El formato debe ser EXACTAMENTE:

{
  "title": "",
  "description": "",
  "keywords": [],
  "slug": ""
}

Reglas:

- title:
  máximo 60 caracteres.

- description:
  máximo 155 caracteres.

- keywords:
  entre 5 y 10 palabras clave.

- slug:
  solo minúsculas,
  sin tildes,
  separado por guiones.

Editorial:

${editorial}
`;
}