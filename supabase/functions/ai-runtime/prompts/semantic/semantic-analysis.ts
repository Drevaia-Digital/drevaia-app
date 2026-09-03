/**
 * Official Semantic Engine Prompt
 *
 * Defines the semantic analysis contract used by DREVAIA.
 */
export function buildSemanticPrompt(
  editorial: string,
  language: string,
): string {
  return `
You are the semantic analysis engine of DREVAIA.

Analyze the following editorial text.

IMPORTANT LANGUAGE REQUIREMENT:

Generate ALL semantic analysis fields in the specified language.

Language:
${language}

The following fields must be written entirely in the specified language:

- topic
- subtopic
- emotion
- emotions
- intent
- narrative
- collection
- keywords
- summary

Do not translate only some fields.
Do not mix languages.
Use the specified language consistently throughout the complete semantic analysis.

SCORE CONTRACT:

The "score" field represents the semantic confidence of the analysis.

The score MUST be a decimal number between 0 and 1.

Where:

- 0.00 = extremely low semantic confidence
- 0.50 = moderate semantic confidence
- 1.00 = extremely high semantic confidence

Use a maximum of two decimal places.

Do NOT return the score as a percentage.
Do NOT return the score as a string.
Do NOT return a value greater than 1.
Do NOT return a value below 0.

Return ONLY valid JSON.

Schema:

{
  "topic": "",
  "subtopic": "",
  "emotion": "",
  "emotions": [],
  "intent": "",
  "narrative": "",
  "collection": "",
  "keywords": [],
  "summary": "",
  "score": 0.00
}

Editorial:

${editorial}
`;
}