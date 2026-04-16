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
      es: "Guía profunda para sanar heridas emocionales y recuperar tu bienestar interior.",
      en: "Deep guide to heal emotional wounds.",
      fr: "Guérir les blessures émotionnelles.",
      pt: "Curar feridas emocionais.",
    },
    content: {
      es: (
        <>
          <p className="mb-4">
            Sanar heridas emocionales no es olvidar lo que pasó, es dejar de vivir desde ese dolor.
          </p>

          <p className="mb-4">
            Muchas heridas se formaron cuando tuviste que adaptarte para sobrevivir emocionalmente.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Comprender es el inicio
          </h2>

          <p className="mb-4">
            Cuando entiendes tu historia, dejas de reaccionar en automático.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Sanar es reconectar
          </h2>

          <p className="mb-4">
            Es volver a escucharte sin juicio.
          </p>

          <div className="mt-10 border-t border-white/10 pt-6 text-gray-400">
            <ul className="space-y-1">
              <li><a href="/es/blog/por-que-me-siento-vacio">Vacío emocional</a></li>
              <li><a href="/es/blog/por-que-me-siento-perdido">Sentirse perdido</a></li>
              <li><a href="/es/blog/como-reconectar-contigo-mismo">Reconectar contigo</a></li>
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
      es: "Descubre cómo salir del piloto automático y volver a sentir tu vida.",
      en: "Stop living on autopilot.",
      fr: "Sortir du mode automatique.",
      pt: "Sair do automático.",
    },
    content: {
      es: (
        <>
          <p className="mb-4">
            Vivir en automático es existir sin presencia.
          </p>

          <p className="mb-4">
            Cumples, avanzas… pero no sientes.
          </p>

          <p className="mb-4">
            El primer paso es darte cuenta.
          </p>

          <div className="mt-10 border-t border-white/10 pt-6 text-gray-400">
            <ul className="space-y-1">
              <li><a href="/es/blog/por-que-me-siento-vacio">Vacío emocional</a></li>
              <li><a href="/es/blog/como-reconectar-contigo-mismo">Reconectar contigo</a></li>
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
      es: "Descubre por qué sientes vacío emocional y cómo empezar a reconectar contigo.",
      en: "Understand emotional emptiness.",
      fr: "Comprendre le vide.",
      pt: "Entender o vazio.",
    },
    content: {
      es: (
        <>
          <p className="mb-4">
            El vacío no es falta de algo, es desconexión de ti.
          </p>

          <p className="mb-4">
            No se llena con cosas externas.
          </p>

          <p className="mb-4">
            Se comprende desde dentro.
          </p>

          <div className="mt-10 border-t border-white/10 pt-6 text-gray-400">
            <ul className="space-y-1">
              <li><a href="/es/blog/por-que-me-siento-perdido">Sentirse perdido</a></li>
              <li><a href="/es/blog/como-reconectar-contigo-mismo">Reconectar</a></li>
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
      es: "Comprende por qué te sientes perdido y cómo encontrar dirección.",
      en: "Why you feel lost.",
      fr: "Pourquoi vous êtes perdu.",
      pt: "Por que você se sente perdido.",
    },
    content: {
      es: (
        <>
          <p className="mb-4">
            Sentirte perdido es una señal de que algo dentro de ti está cambiando.
          </p>

          <p className="mb-4">
            Ya no encajas en tu vida anterior.
          </p>

          <div className="mt-10 border-t border-white/10 pt-6 text-gray-400">
            <ul className="space-y-1">
              <li><a href="/es/blog/por-que-me-siento-vacio">Vacío</a></li>
              <li><a href="/es/blog/como-reconectar-contigo-mismo">Reconectar</a></li>
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
      es: "como-reconectar-contigo-mismo",
      en: "how-to-reconnect-with-yourself",
      fr: "se-reconnecter-a-soi",
      pt: "reconectar-consigo",
    },
    title: {
      es: "Cómo reconectar contigo mismo",
      en: "How to reconnect with yourself",
      fr: "Se reconnecter à soi",
      pt: "Reconectar consigo",
    },
    description: {
      es: "Guía para volver a conectar contigo y recuperar claridad emocional.",
      en: "Reconnect with yourself.",
      fr: "Reconnectez-vous.",
      pt: "Reconecte-se.",
    },
    content: {
      es: (
        <>
          <p className="mb-4">
            Reconectar contigo no es cambiar quién eres, es volver a escucharte.
          </p>

          <p className="mb-4">
            Es salir del ruido externo y volver a tu voz interna.
          </p>

          <p className="mb-4">
            Empieza con pequeñas pausas conscientes.
          </p>

          <div className="mt-10 border-t border-white/10 pt-6 text-gray-400">
            <ul className="space-y-1">
              <li><a href="/es/blog/por-que-me-siento-vacio">Vacío</a></li>
              <li><a href="/es/blog/por-que-me-siento-perdido">Perdido</a></li>
              <li><a href="/es/blog/vivir-en-automatico">Automático</a></li>
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