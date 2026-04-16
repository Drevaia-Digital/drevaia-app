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
      es: "Descubre cómo sanar heridas emocionales, comprender tu pasado y recuperar tu bienestar paso a paso.",
      en: "Learn how to heal emotional wounds and regain emotional balance step by step.",
      fr: "Découvrez comment guérir les blessures émotionnelles et retrouver l’équilibre intérieur.",
      pt: "Aprenda a curar feridas emocionais e recuperar seu equilíbrio interior.",
    },
    content: {
      es: (
        <>
          <p className="mb-4">
            Las heridas emocionales no siempre son visibles, pero pueden influir profundamente en la forma en que pensamos, sentimos y nos relacionamos con los demás.
            A veces se manifiestan como ansiedad, vacío, miedo al abandono o dificultad para confiar.
          </p>

          <p className="mb-4">
            Muchas de estas heridas nacen en momentos donde tuvimos que aprender a sobrevivir emocionalmente sin el apoyo que necesitábamos.
            No es debilidad: es adaptación. Es la forma en que aprendimos a seguir adelante cuando no había otra opción.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            ¿Por qué se forman las heridas emocionales?
          </h2>

          <p className="mb-4">
            Se originan en experiencias como el rechazo, el abandono, la crítica constante o la falta de validación emocional.
            Con el tiempo, estas vivencias dejan huellas que se convierten en patrones automáticos que afectan nuestras decisiones y relaciones.
          </p>

          <p className="mb-4">
            Por ejemplo, alguien que no fue escuchado puede crecer sintiendo que su voz no importa.
            Alguien que fue herido puede desarrollar miedo a abrirse nuevamente.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            El primer paso: comprender
          </h2>

          <p className="mb-4">
            Sanar no comienza intentando cambiar lo que sientes, sino entendiendo por qué lo sientes.
            Cuando observas tus emociones con curiosidad en lugar de juicio, algo empieza a transformarse.
          </p>

          <p className="mb-4">
            Comprender tus heridas te permite identificar patrones, reconocer necesidades emocionales y dejar de reaccionar en automático.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Sanar también es volver a escucharte
          </h2>

          <p className="mb-4">
            Muchas veces la sanación comienza cuando dejamos de ignorar lo que sentimos.
            Escuchar tu mundo interno, tus límites y tus necesidades es un acto de respeto hacia ti mismo.
          </p>

          <p className="mb-4">
            No se trata de eliminar el pasado, sino de integrarlo sin que controle tu presente.
            Es recuperar tu capacidad de elegir cómo vivir, en lugar de reaccionar desde el dolor.
          </p>

          <p className="mb-4">
            Sanar es un proceso, no un destino. Y cada paso que das hacia ti, cuenta.
          </p>
        </>
      ),

      en: (
        <>
          <p className="mb-4">
            Emotional wounds are not always visible, but they deeply affect how we think, feel, and relate to others.
          </p>

          <p className="mb-4">
            Many of them come from moments where we had to emotionally survive without the support we needed.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Why do emotional wounds form?
          </h2>

          <p className="mb-4">
            They often originate from rejection, abandonment, or lack of emotional validation.
          </p>
        </>
      ),

      fr: (
        <>
          <p>Contenu en construction...</p>
        </>
      ),

      pt: (
        <>
          <p>Conteúdo em construção...</p>
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
      es: "Descubre qué significa vivir en automático, por qué ocurre y cómo reconectar contigo mismo.",
      en: "Discover what it means to live on autopilot and how to reconnect with yourself.",
      fr: "Découvrez ce que signifie vivre en mode automatique et comment vous reconnecter.",
      pt: "Descubra o que significa viver no automático e como se reconectar consigo mesmo.",
    },
    content: {
      es: (
        <>
          <p className="mb-4">
            Hay momentos en los que la vida sigue avanzando, pero tú no sientes que estás realmente en ella.
          </p>

          <p className="mb-4">
            Desde fuera puedes parecer funcional, pero por dentro hay desconexión.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            ¿Cómo salir del modo automático?
          </h2>

          <p className="mb-4">
            El primer paso es empezar a notar lo que sientes.
          </p>
        </>
      ),

      en: (
        <>
          <p className="mb-4">
            There are moments when life keeps moving, but you don’t feel present.
          </p>
        </>
      ),

      fr: (
        <>
          <p>Contenu en construction...</p>
        </>
      ),

      pt: (
        <>
          <p>Conteúdo em construção...</p>
        </>
      ),
    },
  },
];