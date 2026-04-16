import type { ReactNode } from "react";

type Lang = "es" | "en" | "fr" | "pt";

type Post = {
  slug: Record<Lang, string>;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  content: Record<Lang, ReactNode>;
};

export const posts: Post[] = [

  {
    slug: {
      es: "como-sanar-heridas-emocionales",
      en: "heal-emotional-wounds",
      fr: "guerir-blessures-emotionnelles",
      pt: "curar-feridas-emocionais",
    },
    title: {
      es: "Cómo sanar heridas emocionales",
      en: "How to heal emotional wounds",
      fr: "Comment guérir les blessures émotionnelles",
      pt: "Como curar feridas emocionais",
    },
    description: {
      es: "Descubre cómo sanar heridas emocionales y recuperar tu bienestar.",
      en: "Learn how to heal emotional wounds.",
      fr: "Guérir les blessures émotionnelles.",
      pt: "Curar feridas emocionais.",
    },
    content: {
      es: (
        <>
          <p className="mb-4">
            Las heridas emocionales no siempre son visibles, pero afectan profundamente cómo vives tu realidad.
          </p>

          <p className="mb-4">
            Muchas nacen en momentos donde tuviste que adaptarte emocionalmente para sobrevivir.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Comprender es el inicio
          </h2>

          <p className="mb-4">
            Sanar no es cambiar lo que sientes, sino entenderlo.
          </p>

          <div className="mt-10 border-t border-white/10 pt-6 text-gray-400">
            <p className="mb-2">También podría resonar contigo:</p>
            <ul className="space-y-1">
              <li><a href="/es/blog/por-que-me-siento-vacio">¿Por qué me siento vacío?</a></li>
              <li><a href="/es/blog/por-que-me-siento-perdido">¿Por qué me siento perdido?</a></li>
            </ul>
          </div>
        </>
      ),
      en: (<p>Coming soon...</p>),
      fr: (<p>Contenu en construction...</p>),
      pt: (<p>Conteúdo em construção...</p>),
    },
  },

  {
    slug: {
      es: "vivir-en-automatico",
      en: "living-on-autopilot",
      fr: "vivre-en-mode-automatique",
      pt: "viver-no-automatico",
    },
    title: {
      es: "Vivir en automático",
      en: "Living on autopilot",
      fr: "Vivre en mode automatique",
      pt: "Viver no automático",
    },
    description: {
      es: "Descubre cómo dejar de vivir en automático.",
      en: "Stop living on autopilot.",
      fr: "Sortir du mode automatique.",
      pt: "Sair do automático.",
    },
    content: {
      es: (
        <>
          <p className="mb-4">
            Vivir en automático es avanzar sin sentirte realmente presente.
          </p>

          <p className="mb-4">
            Es funcionar, pero no vivir.
          </p>

          <div className="mt-10 border-t border-white/10 pt-6 text-gray-400">
            <ul className="space-y-1">
              <li><a href="/es/blog/por-que-me-siento-vacio">Vacío emocional</a></li>
            </ul>
          </div>
        </>
      ),
      en: (<p>Coming soon...</p>),
      fr: (<p>Contenu en construction...</p>),
      pt: (<p>Conteúdo em construção...</p>),
    },
  },

  {
    slug: {
      es: "por-que-me-siento-vacio",
      en: "why-do-i-feel-empty",
      fr: "pourquoi-je-me-sens-vide",
      pt: "por-que-me-sinto-vazio",
    },
    title: {
      es: "¿Por qué me siento vacío?",
      en: "Why do I feel empty?",
      fr: "Pourquoi je me sens vide ?",
      pt: "Por que me sinto vazio?",
    },
    description: {
      es: "Entiende el vacío emocional.",
      en: "Understand emotional emptiness.",
      fr: "Comprendre le vide intérieur.",
      pt: "Entender o vazio emocional.",
    },
    content: {
      es: (
        <>
          <p className="mb-4">
            El vacío no es falta de algo externo, es desconexión interna.
          </p>

          <p className="mb-4">
            Es una señal de que necesitas volver a ti.
          </p>

          <div className="mt-10 border-t border-white/10 pt-6 text-gray-400">
            <ul className="space-y-1">
              <li><a href="/es/blog/por-que-me-siento-perdido">Sentirse perdido</a></li>
            </ul>
          </div>
        </>
      ),
      en: (<p>Coming soon...</p>),
      fr: (<p>Contenu en construction...</p>),
      pt: (<p>Conteúdo em construção...</p>),
    },
  },

  {
    slug: {
      es: "por-que-me-siento-perdido",
      en: "why-do-i-feel-lost",
      fr: "pourquoi-je-me-sens-perdu",
      pt: "por-que-me-sinto-perdido",
    },
    title: {
      es: "¿Por qué me siento perdido?",
      en: "Why do I feel lost?",
      fr: "Pourquoi je me sens perdu ?",
      pt: "Por que me sinto perdido?",
    },
    description: {
      es: "Descubre por qué te sientes perdido y cómo encontrar dirección.",
      en: "Why you feel lost and how to find direction.",
      fr: "Pourquoi vous êtes perdu.",
      pt: "Por que você se sente perdido.",
    },
    content: {
      es: (
        <>
          <p className="mb-4">
            Sentirse perdido no es un error, es una señal de cambio.
          </p>

          <p className="mb-4">
            Es el momento en el que tu vida ya no encaja con quien eres.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            No estás perdido, estás despertando
          </h2>

          <p className="mb-4">
            Esta sensación aparece cuando empiezas a cuestionar todo.
          </p>

          <div className="mt-10 border-t border-white/10 pt-6 text-gray-400">
            <ul className="space-y-1">
              <li><a href="/es/blog/por-que-me-siento-vacio">Vacío emocional</a></li>
              <li><a href="/es/blog/como-sanar-heridas-emocionales">Sanar heridas</a></li>
            </ul>
          </div>
        </>
      ),
      en: (<p>Coming soon...</p>),
      fr: (<p>Contenu en construction...</p>),
      pt: (<p>Conteúdo em construção...</p>),
    },
  }

];