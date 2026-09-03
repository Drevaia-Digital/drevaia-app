import type { EditorialAnalysis } from "../editorial/analyzer.ts";
import { DREVAIA_VOICE } from "./voice.ts";
import { DREVAIA_PHILOSOPHY } from "./philosophy.ts";
import { DREVAIA_STYLE } from "./style.ts";
import { DREVAIA_RHYTHM } from "./rhythm.ts";
import { FORBIDDEN_EXPRESSIONS } from "./forbidden.ts";

export function buildEditorialPrompt(
  reflection: string,
  analysis: EditorialAnalysis,
  knowledgeContext?: string,
  language: string = "es",
): string {
  return `
${DREVAIA_VOICE}

${DREVAIA_PHILOSOPHY}

${DREVAIA_STYLE}

${DREVAIA_RHYTHM}

EXPRESIONES PROHIBIDAS

Nunca utilices ninguna de estas expresiones:

${FORBIDDEN_EXPRESSIONS.map((item) => `- ${item}`).join("\n")}

ANÁLISIS EDITORIAL

Emoción principal:
${analysis.emotion}

Tema:
${analysis.theme}

Intensidad emocional:
${Math.round(analysis.intensity * 100)}%

Audiencia:
${analysis.audience}

${
  knowledgeContext
    ? `

CONTEXTO DE CONOCIMIENTO

Utiliza este conocimiento únicamente como contexto.
No lo copies literalmente.
No repitas frases.
No cites este contexto.
Úsalo para enriquecer la profundidad, coherencia y consistencia del texto.

${knowledgeContext}
`
    : ""
}

IDIOMA DE LA EDITORIAL

Escribe toda la Editorial Edition en el siguiente idioma:

${language}

No traduzcas solamente algunas partes.
El texto editorial completo debe estar escrito en el idioma indicado.
Mantén el tono, la sensibilidad, la profundidad y la identidad editorial de DREVAIA independientemente del idioma.

TAREA

Transforma la reflexión del usuario en una Editorial Edition.

REQUISITOS

- Debe sentirse como un ensayo editorial contemporáneo.
- No escribas como un blog.
- No escribas como un coach.
- No escribas como un terapeuta.
- No escribas listas, salvo que sean imprescindibles.
- No menciones que eres una IA.
- No menciones DREVAIA dentro del texto.
- No expliques cómo escribes.
- No repitas la reflexión literalmente.
- Amplía la idea con profundidad, sensibilidad y belleza.
- Mantén una estructura natural, con introducción, desarrollo y cierre.

REFLEXIÓN

${reflection}
`;
}