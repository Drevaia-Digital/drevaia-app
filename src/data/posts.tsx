import type { ReactNode } from "react";

type Post = {
  slug: {
    es: string;
    en: string;
    fr: string;
    pt: string;
  };
  title: {
    es: string;
    en: string;
    fr: string;
    pt: string;
  };
  content: {
    es: ReactNode;
    en: ReactNode;
    fr: ReactNode;
    pt: ReactNode;
  };
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
    content: {
      es: (
        <>
          <p className="mb-4">
            Las heridas emocionales no siempre son visibles, pero pueden influir profundamente en la forma en que pensamos, sentimos y nos relacionamos.
          </p>

          <p className="mb-4">
            Muchas de estas heridas nacen en momentos donde tuvimos que aprender a sobrevivir emocionalmente sin el apoyo que necesitábamos.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            ¿Por qué se forman las heridas emocionales?
          </h2>

          <p className="mb-4">
            Se originan en experiencias como el rechazo, el abandono o la falta de validación emocional.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            El primer paso: comprender
          </h2>

          <p className="mb-4">
            Sanar no es cambiar lo que sientes, sino entenderlo.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Sanar también es volver a escucharte
          </h2>

          <p className="mb-4">
            Escuchar tus emociones es el inicio de una transformación real.
          </p>
        </>
      ),

      en: (
        <>
          <p className="mb-4">
            Emotional wounds are not always visible, but they deeply affect how we think and relate.
          </p>

          <p className="mb-4">
            Many come from moments where we had to emotionally survive without support.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Why do they form?
          </h2>

          <p className="mb-4">
            They originate from rejection, abandonment, or lack of emotional validation.
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