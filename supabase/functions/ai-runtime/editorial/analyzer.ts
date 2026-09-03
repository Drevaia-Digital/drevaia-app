export interface EditorialAnalysis {
  emotion: string;
  secondaryEmotion: string;
  theme: string;
  intensity: number;
  audience: string;
  tone: string;
  conflict: string;
  hope: string;
  symbols: string[];
}

export function analyzeReflection(
  reflection: string,
): EditorialAnalysis {

  const text = reflection.toLowerCase();

  if (text.includes("silencio")) {
    return {
      emotion: "melancolía",
      secondaryEmotion: "esperanza",
      theme: "silencio",
      intensity: 0.82,
      audience: "persona introspectiva",
      tone: "contemplativo",
      conflict: "expresar lo que siente",
      hope: "reconciliarse consigo mismo",
      symbols: [
        "silencio",
        "respiración",
        "vacío",
      ],
    };
  }

  if (text.includes("miedo")) {
    return {
      emotion: "temor",
      secondaryEmotion: "valor",
      theme: "miedo",
      intensity: 0.75,
      audience: "persona vulnerable",
      tone: "esperanzador",
      conflict: "enfrentar la incertidumbre",
      hope: "recuperar la confianza",
      symbols: [
        "camino",
        "oscuridad",
        "luz",
      ],
    };
  }

  return {
    emotion: "reflexión",
    secondaryEmotion: "curiosidad",
    theme: "crecimiento personal",
    intensity: 0.50,
    audience: "lector general",
    tone: "sereno",
    conflict: "comprender la experiencia",
    hope: "seguir creciendo",
    symbols: [
      "camino",
    ],
  };
}