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
    es: "Descubre por qué sientes vacío emocional, qué lo causa y cómo empezar a reconectar contigo.",
    en: "Understand emotional emptiness and how to reconnect with yourself.",
    fr: "Comprendre le vide émotionnel et se reconnecter à soi.",
    pt: "Entenda o vazio emocional e reconecte-se consigo.",
  },

  content: {
    es: (
      <>
        <p className="mb-4">
          A veces no falta nada afuera… y aun así sientes un hueco adentro.
        </p>

        <p className="mb-4">
          Tienes responsabilidades, personas, rutinas, incluso momentos buenos. Pero cuando todo se calma, aparece esa sensación difícil de explicar: vacío.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          ¿Qué significa sentir vacío emocional?
        </h2>

        <p className="mb-4">
          Muchas veces no significa que estés roto. Significa que llevas demasiado tiempo desconectado de ti.
        </p>

        <p className="mb-4">
          Aprendiste a funcionar, a cumplir, a seguir… pero no necesariamente a escucharte.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Razones frecuentes por las que te sientes vacío
        </h2>

        <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">
          <li>Vives para otros y no para ti.</li>
          <li>Ignoras emociones pendientes.</li>
          <li>Te llenas de distracciones para no sentir.</li>
          <li>Has normalizado sobrevivir en automático.</li>
          <li>Perdiste conexión con lo que realmente deseas.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Señales comunes
        </h2>

        <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">
          <li>Nada entusiasma de verdad.</li>
          <li>Sientes cansancio interno constante.</li>
          <li>Todo parece repetitivo.</li>
          <li>Buscas llenar algo sin saber qué.</li>
          <li>Te cuesta sentir plenitud.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Cómo empezar a salir de ahí
        </h2>

        <p className="mb-4">
          No se trata de llenarte más. Se trata de volver a ti.
        </p>

        <p className="mb-4">
          Empieza con preguntas honestas:
        </p>

        <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">
          <li>¿Qué llevo tiempo ignorando?</li>
          <li>¿Qué me duele realmente?</li>
          <li>¿Qué necesito y no me permito?</li>
          <li>¿Estoy viviendo mi vida o sobreviviendo?</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Cierre Drevaia
        </h2>

        <p className="mb-4">
          Quizá no estás vacío.
        </p>

        <p className="mb-4">
          Quizá estás lleno de todo lo que no expresaste.
        </p>

        <p className="mb-4">
          Y sanar empieza cuando dejas de huir de ti.
        </p>

        <div className="mt-10 border-t border-white/10 pt-6 text-gray-400">
          <ul className="space-y-1">
            <li><a href="/es/blog/por-que-me-siento-perdido">Sentirse perdido</a></li>
            <li><a href="/es/blog/como-reconectar-contigo-mismo">Reconectar contigo</a></li>
            <li><a href="/es/blog/vivir-en-automatico">Vivir en automático</a></li>
          </ul>
        </div>
      </>
    ),

    en: (
      <>
        <p className="mb-4">
          Sometimes nothing is missing outside… yet you feel empty inside.
        </p>

        <p className="mb-4">
          Emotional emptiness often means disconnection from yourself.
        </p>

        <p className="mb-4">
          You learned how to function, but not how to feel.
        </p>
      </>
    ),

    fr: (
      <>
        <p className="mb-4">
          Parfois rien ne manque dehors… et pourtant tu te sens vide dedans.
        </p>

        <p className="mb-4">
          Le vide émotionnel est souvent une déconnexion de soi.
        </p>

        <p className="mb-4">
          Tu as appris à fonctionner, mais pas à ressentir.
        </p>
      </>
    ),

    pt: (
      <>
        <p className="mb-4">
          Às vezes nada falta por fora… e mesmo assim você se sente vazio por dentro.
        </p>

        <p className="mb-4">
          O vazio emocional costuma ser desconexão de si mesmo.
        </p>

        <p className="mb-4">
          Você aprendeu a funcionar, mas não a sentir.
        </p>
      </>
    ),
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
    es: "Descubre cómo dejar de vivir en automático y volver a sentir tu vida.",
    en: "Learn how to stop living on autopilot.",
    fr: "Sortir du mode automatique.",
    pt: "Sair do automático.",
  },

  content: {
    es: (
      <>
        <p className="mb-4">
          Vivir en automático es avanzar sin presencia.
        </p>

        <p className="mb-4">
          Haces lo necesario, cumples, respondes… pero algo dentro se apagó.
        </p>

        <p className="mb-4">
          No siempre estás triste. A veces solo estás desconectado.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Señales comunes
        </h2>

        <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">
          <li>Los días pasan rápido.</li>
          <li>Todo parece rutina.</li>
          <li>Cuesta disfrutar.</li>
          <li>Te distraes para no sentir.</li>
          <li>Sientes vacío interno.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Cómo empezar a salir
        </h2>

        <p className="mb-4">
          Haz pausas. Respira. Pregúntate cómo estás realmente.
        </p>

        <p className="mb-4">
          Volver a sentir comienza con detenerte.
        </p>
      </>
    ),

    en: (<p>Coming soon...</p>),
    fr: (<p>Contenu en construction...</p>),
    pt: (<p>Conteúdo em construção...</p>),
  },
},
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
    es: "Descubre cómo sanar heridas emocionales y recuperar tu paz interior.",
    en: "Learn how to heal emotional wounds.",
    fr: "Guérir les blessures émotionnelles.",
    pt: "Curar feridas emocionais.",
  },

  content: {
    es: (
      <>
        <p className="mb-4">
          Sanar heridas emocionales no es olvidar lo que pasó.
        </p>

        <p className="mb-4">
          Es dejar de vivir desde ese dolor.
        </p>

        <p className="mb-4">
          Muchas heridas nacieron cuando tuviste que adaptarte para sobrevivir emocionalmente.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Señales comunes
        </h2>

        <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">
          <li>Reacciones intensas.</li>
          <li>Miedo al abandono.</li>
          <li>Patrones repetitivos.</li>
          <li>Autoexigencia constante.</li>
          <li>Vacío interno.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Cómo empezar a sanar
        </h2>

        <p className="mb-4">
          Comprender tu historia es el inicio.
        </p>

        <p className="mb-4">
          Escucharte sin juicio cambia todo.
        </p>

        <p className="mb-4">
          Sanar es volver a ti.
        </p>
      </>
    ),

    en: (<p>Healing starts when you stop living from old pain.</p>),
    fr: (<p>Guérir commence quand tu cesses de vivre depuis l’ancienne douleur.</p>),
    pt: (<p>Curar começa quando você para de viver da dor antiga.</p>),
  },
},
];