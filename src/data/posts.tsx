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
    es: "Descubre por qué te sientes perdido y cómo volver a encontrarte.",
    en: "Understand why you feel lost and how to reconnect.",
    fr: "Comprendre pourquoi tu te sens perdu.",
    pt: "Entenda por que você se sente perdido.",
  },

  content: {
    es: (
      <>
        <p className="mb-4">
          Sentirse perdido no siempre significa no saber qué hacer.
        </p>

        <p className="mb-4">
          A veces significa haber avanzado tanto hacia afuera… que dejaste de escucharte por dentro.
        </p>

        <p className="mb-4">
          Sigues funcionando, pero ya no sabes hacia dónde vas ni por qué.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Razones comunes por las que te sientes perdido
        </h2>

        <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">
          <li>Viviste mucho tiempo complaciendo a otros.</li>
          <li>Seguiste caminos que no eran tuyos.</li>
          <li>Ignoraste lo que sentías.</li>
          <li>Perdiste conexión contigo.</li>
          <li>Cambiaste por sobrevivir.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Señales frecuentes
        </h2>

        <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">
          <li>No sabes qué quieres realmente.</li>
          <li>Todo parece confuso.</li>
          <li>Comparas tu vida con la de otros.</li>
          <li>Sientes vacío aunque avances.</li>
          <li>Te cuesta tomar decisiones.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Cómo empezar a encontrarte
        </h2>

        <p className="mb-4">
          No necesitas tener toda la respuesta hoy.
        </p>

        <p className="mb-4">
          Empieza con preguntas pequeñas:
        </p>

        <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">
          <li>¿Qué ya no quiero seguir cargando?</li>
          <li>¿Qué deseo de verdad?</li>
          <li>¿Dónde me traiciono?</li>
          <li>¿Qué me haría sentir más vivo?</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Cierre Drevaia
        </h2>

        <p className="mb-4">
          Tal vez no estás perdido.
        </p>

        <p className="mb-4">
          Tal vez estás dejando atrás una versión que ya no eres.
        </p>

        <p className="mb-4">
          Y eso también es avanzar.
        </p>

        <div className="mt-10 border-t border-white/10 pt-6 text-gray-400">
          <ul className="space-y-1">
            <li><a href="/es/blog/por-que-me-siento-vacio">Vacío emocional</a></li>
            <li><a href="/es/blog/vivir-en-automatico">Vivir en automático</a></li>
            <li><a href="/es/blog/como-reconectar-contigo-mismo">Reconectar contigo</a></li>
          </ul>
        </div>
      </>
    ),

    en: (
      <>
        <p className="mb-4">Feeling lost often means being disconnected from yourself.</p>
        <p className="mb-4">You may have followed paths that were never yours.</p>
        <p className="mb-4">Reconnection starts with honesty.</p>
      </>
    ),

    fr: (
      <>
        <p className="mb-4">Se sentir perdu signifie souvent être déconnecté de soi.</p>
        <p className="mb-4">Tu as peut-être suivi des chemins qui n’étaient pas les tiens.</p>
        <p className="mb-4">Le retour commence par l’honnêteté.</p>
      </>
    ),

    pt: (
      <>
        <p className="mb-4">Sentir-se perdido muitas vezes é estar desconectado de si.</p>
        <p className="mb-4">Talvez você seguiu caminhos que não eram seus.</p>
        <p className="mb-4">O reencontro começa com honestidade.</p>
      </>
    ),
  },
},
{
  slug: {
    es: "como-reconectar-contigo-mismo",
    en: "how-to-reconnect-with-yourself",
    fr: "comment-se-reconnecter-a-soi",
    pt: "como-se-reconectar-consigo",
  },

  title: {
    es: "Cómo reconectar contigo mismo",
    en: "How to reconnect with yourself",
    fr: "Comment se reconnecter à soi",
    pt: "Como se reconectar consigo",
  },

  description: {
    es: "Guía para volver a ti, recuperar claridad y reconectar con tu esencia.",
    en: "Reconnect with yourself and regain clarity.",
    fr: "Se reconnecter à soi.",
    pt: "Reconecte-se consigo.",
  },

  content: {
    es: (
      <>
        <p className="mb-4">
          A veces no estás roto. Solo estás lejos de ti.
        </p>

        <p className="mb-4">
          Entre responsabilidades, ruido y supervivencia, muchas personas se abandonan sin notarlo.
        </p>

        <p className="mb-4">
          Reconectar contigo no es volverte otra persona. Es regresar.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Cómo empezar
        </h2>

        <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">
          <li>Haz pausas diarias.</li>
          <li>Escucha lo que sientes.</li>
          <li>Reduce ruido externo.</li>
          <li>Haz algo que te nutra.</li>
          <li>Di la verdad interna.</li>
        </ul>

        <p className="mb-4">
          Volver a ti puede cambiar toda tu vida.
        </p>
      </>
    ),

    en: (<p>Reconnecting with yourself is coming home.</p>),
    fr: (<p>Se reconnecter à soi, c’est rentrer chez soi.</p>),
    pt: (<p>Reconectar-se consigo é voltar para casa.</p>),
  },
},
{
  slug: {
    es: "apego-ansioso-senales",
    en: "anxious-attachment-signs",
    fr: "signes-attachement-anxieux",
    pt: "sinais-apego-ansioso",
  },

  title: {
    es: "Apego ansioso: señales y cómo empezar a sanarlo",
    en: "Anxious attachment: signs and healing",
    fr: "Attachement anxieux : signes et guérison",
    pt: "Apego ansioso: sinais e cura",
  },

  description: {
    es: "Descubre las señales del apego ansioso y cómo empezar a sanar relaciones desde dentro.",
    en: "Learn the signs of anxious attachment.",
    fr: "Découvrez les signes de l’attachement anxieux.",
    pt: "Descubra os sinais do apego ansioso.",
  },

  content: {
    es: (
      <>
        <p className="mb-4">
          El apego ansioso no significa amar demasiado.
        </p>

        <p className="mb-4">
          Muchas veces significa temer perder tanto… que terminas perdiéndote tú.
        </p>

        <p className="mb-4">
          Nace cuando el amor se sintió incierto, inconsistente o condicionado.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Señales comunes de apego ansioso
        </h2>

        <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">
          <li>Necesitas mucha validación.</li>
          <li>Temes que te abandonen.</li>
          <li>Sobrepiensas mensajes y silencios.</li>
          <li>Te cuesta estar en calma si alguien se aleja.</li>
          <li>Das demasiado por miedo a perder.</li>
          <li>Tu paz depende de la respuesta externa.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Qué lo origina
        </h2>

        <p className="mb-4">
          Suele nacer en vínculos donde el cariño era impredecible:
          a veces sí, a veces no.
        </p>

        <p className="mb-4">
          Aprendiste a vigilar el amor en lugar de sentirlo seguro.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Cómo empezar a sanarlo
        </h2>

        <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">
          <li>Aprende a regularte antes de reaccionar.</li>
          <li>Observa tus miedos sin obedecerlos.</li>
          <li>Construye vida propia fuera de la relación.</li>
          <li>Comunica necesidades con calma.</li>
          <li>Elige vínculos consistentes.</li>
          <li>Fortalece autoestima diaria.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Cierre Drevaia
        </h2>

        <p className="mb-4">
          No eres intenso por sentir.
        </p>

        <p className="mb-4">
          Quizá solo aprendiste a amar desde el miedo.
        </p>

        <p className="mb-4">
          Y todo cambia cuando aprendes a amar desde la seguridad.
        </p>

        <div className="mt-10 border-t border-white/10 pt-6 text-gray-400">
          <ul className="space-y-1">
            <li><a href="/es/blog/por-que-me-siento-vacio">Vacío emocional</a></li>
            <li><a href="/es/blog/como-sanar-heridas-emocionales">Heridas emocionales</a></li>
            <li><a href="/es/blog/como-reconectar-contigo-mismo">Reconectar contigo</a></li>
          </ul>
        </div>
      </>
    ),

    en: (
      <>
        <p className="mb-4">Anxious attachment often means loving through fear.</p>
        <p className="mb-4">Healing begins with inner safety.</p>
      </>
    ),

    fr: (
      <>
        <p className="mb-4">L’attachement anxieux signifie souvent aimer avec peur.</p>
        <p className="mb-4">La guérison commence par la sécurité intérieure.</p>
      </>
    ),

    pt: (
      <>
        <p className="mb-4">Apego ansioso muitas vezes é amar com medo.</p>
        <p className="mb-4">A cura começa com segurança interna.</p>
      </>
    ),
  },
},
{
  slug: {
    es: "como-reconstruir-autoestima",
    en: "how-to-rebuild-self-esteem",
    fr: "comment-reconstruire-estime-de-soi",
    pt: "como-reconstruir-autoestima",
  },

  title: {
    es: "Cómo reconstruir la autoestima después de años de dolor",
    en: "How to rebuild self-esteem after years of pain",
    fr: "Reconstruire l’estime de soi après des années de douleur",
    pt: "Como reconstruir a autoestima após anos de dor",
  },

  description: {
    es: "Guía profunda para reconstruir la autoestima, sanar la autocrítica y volver a valorarte.",
    en: "Learn how to rebuild self-esteem and self-worth.",
    fr: "Reconstruire l’estime de soi et retrouver sa valeur.",
    pt: "Reconstruir a autoestima e recuperar seu valor.",
  },

  content: {
    es: (
      <>
        <p className="mb-4">
          La autoestima no siempre se rompe en un solo día.
        </p>

        <p className="mb-4">
          A veces se desgasta lentamente entre críticas, rechazo, abandono,
          comparaciones y años olvidándote de ti.
        </p>

        <p className="mb-4">
          Pero lo que fue herido también puede reconstruirse.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Señales de autoestima dañada
        </h2>

        <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">
          <li>Sientes que nunca eres suficiente.</li>
          <li>Te comparas constantemente.</li>
          <li>Te cuesta poner límites.</li>
          <li>Buscas validación externa.</li>
          <li>Te hablas con dureza.</li>
          <li>Saboteas oportunidades buenas.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Cómo empezar a reconstruirla
        </h2>

        <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">
          <li>Cuestiona la voz interna que te humilla.</li>
          <li>Habla contigo como hablarías con alguien amado.</li>
          <li>Celebra avances pequeños.</li>
          <li>Aléjate de vínculos que te destruyen.</li>
          <li>Haz promesas pequeñas y cúmplelas.</li>
          <li>Recuerda que tu valor no depende del rendimiento.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Algo importante
        </h2>

        <p className="mb-4">
          La baja autoestima muchas veces no nació contigo.
        </p>

        <p className="mb-4">
          Fue aprendida en ambientes donde no supieron reflejar tu valor.
        </p>

        <p className="mb-4">
          Y lo aprendido también puede desaprenderse.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Cierre Drevaia
        </h2>

        <p className="mb-4">
          No necesitas convertirte en otra persona para merecer amor.
        </p>

        <p className="mb-4">
          Quizá solo necesitas dejar de mirarte con ojos que no eran tuyos.
        </p>

        <p className="mb-4">
          Y empezar a verte con verdad.
        </p>

        <div className="mt-10 border-t border-white/10 pt-6 text-gray-400">
          <ul className="space-y-1">
            <li><a href="/es/blog/como-sanar-heridas-emocionales">Sanar heridas emocionales</a></li>
            <li><a href="/es/blog/apego-ansioso-senales">Apego ansioso</a></li>
            <li><a href="/es/blog/como-reconectar-contigo-mismo">Reconectar contigo</a></li>
          </ul>
        </div>
      </>
    ),

    en: (
      <>
        <p className="mb-4">Self-esteem can be rebuilt.</p>
        <p className="mb-4">Your value was never lost.</p>
      </>
    ),

    fr: (
      <>
        <p className="mb-4">L’estime de soi peut se reconstruire.</p>
        <p className="mb-4">Ta valeur n’a jamais disparu.</p>
      </>
    ),

    pt: (
      <>
        <p className="mb-4">A autoestima pode ser reconstruída.</p>
        <p className="mb-4">Seu valor nunca foi perdido.</p>
      </>
    ),
  },
},
{
  slug: {
    es: "sanar-abandono-emocional",
    en: "heal-emotional-abandonment",
    fr: "guerir-abandon-emotionnel",
    pt: "curar-abandono-emocional",
  },

  title: {
    es: "Cómo sanar el abandono emocional y volver a sentirte suficiente",
    en: "How to heal emotional abandonment",
    fr: "Guérir l’abandon émotionnel",
    pt: "Como curar o abandono emocional",
  },

  description: {
    es: "Descubre cómo sanar el abandono emocional, recuperar seguridad interna y dejar de mendigar amor.",
    en: "Learn how to heal emotional abandonment.",
    fr: "Découvrez comment guérir l’abandon émotionnel.",
    pt: "Aprenda a curar o abandono emocional.",
  },

  content: {
    es: (
      <>
        <p className="mb-4">
          El abandono emocional no siempre ocurre cuando alguien se va.
        </p>

        <p className="mb-4">
          A veces ocurre cuando alguien se queda… pero nunca está realmente contigo.
        </p>

        <p className="mb-4">
          También ocurre cuando aprendiste a abandonarte para que otros no te dejaran.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Señales comunes
        </h2>

        <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">
          <li>Miedo intenso a que te dejen.</li>
          <li>Necesidad de aprobación constante.</li>
          <li>Tolerar migajas afectivas.</li>
          <li>Ansiedad cuando alguien se distancia.</li>
          <li>Sentirte insuficiente.</li>
          <li>Abandonarte para agradar.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Cómo empezar a sanar
        </h2>

        <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">
          <li>Reconoce que dolió.</li>
          <li>Deja de normalizar vínculos fríos.</li>
          <li>Aprende a darte lo que pides afuera.</li>
          <li>Pon límites al amor inconsistente.</li>
          <li>Fortalece tu valor interno.</li>
          <li>Busca relaciones recíprocas.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Algo clave
        </h2>

        <p className="mb-4">
          Sanar abandono emocional no es dejar de amar.
        </p>

        <p className="mb-4">
          Es dejar de perseguir amor donde nunca hubo presencia real.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Cierre Drevaia
        </h2>

        <p className="mb-4">
          No eras difícil de amar.
        </p>

        <p className="mb-4">
          Solo buscaste calor en lugares fríos.
        </p>

        <p className="mb-4">
          Y mereces aprender la diferencia.
        </p>

        <div className="mt-10 border-t border-white/10 pt-6 text-gray-400">
          <ul className="space-y-1">
            <li><a href="/es/blog/apego-ansioso-senales">Apego ansioso</a></li>
            <li><a href="/es/blog/como-reconstruir-autoestima">Autoestima</a></li>
            <li><a href="/es/blog/como-sanar-heridas-emocionales">Heridas emocionales</a></li>
          </ul>
        </div>
      </>
    ),

    en: (
      <>
        <p className="mb-4">Emotional abandonment often starts inside.</p>
        <p className="mb-4">Healing means choosing reciprocal love.</p>
      </>
    ),

    fr: (
      <>
        <p className="mb-4">L’abandon émotionnel commence souvent à l’intérieur.</p>
        <p className="mb-4">Guérir, c’est choisir l’amour réciproque.</p>
      </>
    ),

    pt: (
      <>
        <p className="mb-4">O abandono emocional muitas vezes começa por dentro.</p>
        <p className="mb-4">Curar é escolher amor recíproco.</p>
      </>
    ),
  },
},
{
  slug: {
    es: "por-que-atraigo-personas-frias",
    en: "why-do-i-attract-cold-people",
    fr: "pourquoi-jattire-des-personnes-froides",
    pt: "por-que-atraio-pessoas-frias",
  },

  title: {
    es: "¿Por qué atraigo personas frías?",
    en: "Why do I attract cold people?",
    fr: "Pourquoi j’attire des personnes froides ?",
    pt: "Por que atraio pessoas frias?",
  },

  description: {
    es: "Descubre por qué repites vínculos fríos y cómo empezar a elegir relaciones sanas.",
    en: "Understand why you attract emotionally cold people.",
    fr: "Comprendre pourquoi vous attirez des personnes froides.",
    pt: "Entenda por que atrai pessoas frias.",
  },

  content: {
    es: (
      <>
        <p className="mb-4">
          No siempre atraes personas frías.
        </p>

        <p className="mb-4">
          A veces reconoces como familiar lo que un día te dolió.
        </p>

        <p className="mb-4">
          Y el sistema nervioso suele confundir intensidad, distancia o incertidumbre con amor.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Razones comunes por las que repites este patrón
        </h2>

        <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">
          <li>Normalizaste el afecto inconsistente.</li>
          <li>Confundes perseguir con amar.</li>
          <li>Sientes que debes ganarte el cariño.</li>
          <li>La disponibilidad emocional te parece aburrida.</li>
          <li>Tu autoestima tolera menos de lo que mereces.</li>
          <li>Buscas reparar heridas antiguas en relaciones nuevas.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Señales de una persona emocionalmente fría
        </h2>

        <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">
          <li>Inconsistencia constante.</li>
          <li>Evita conversaciones profundas.</li>
          <li>Da migajas afectivas.</li>
          <li>Solo aparece cuando le conviene.</li>
          <li>Te hace dudar de lo evidente.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Cómo romper el patrón
        </h2>

        <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">
          <li>Trabaja tu valor personal.</li>
          <li>Aprende a tolerar la calma, no solo la intensidad.</li>
          <li>Observa hechos, no promesas.</li>
          <li>Retírate de lo ambiguo.</li>
          <li>Elige reciprocidad.</li>
          <li>Sana heridas de abandono previas.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Cierre Drevaia
        </h2>

        <p className="mb-4">
          No atraes personas frías porque vales poco.
        </p>

        <p className="mb-4">
          Quizá solo aprendiste a llamar amor a lo que dolía.
        </p>

        <p className="mb-4">
          Y hoy puedes aprender algo nuevo.
        </p>

        <div className="mt-10 border-t border-white/10 pt-6 text-gray-400">
          <ul className="space-y-1">
            <li><a href="/es/blog/apego-ansioso-senales">Apego ansioso</a></li>
            <li><a href="/es/blog/sanar-abandono-emocional">Abandono emocional</a></li>
            <li><a href="/es/blog/como-reconstruir-autoestima">Autoestima</a></li>
          </ul>
        </div>
      </>
    ),

    en: (
      <>
        <p className="mb-4">You may be repeating familiar emotional patterns.</p>
        <p className="mb-4">Healing means choosing consistency.</p>
      </>
    ),

    fr: (
      <>
        <p className="mb-4">Vous répétez peut-être des schémas émotionnels familiers.</p>
        <p className="mb-4">Guérir, c’est choisir la constance.</p>
      </>
    ),

    pt: (
      <>
        <p className="mb-4">Você pode estar repetindo padrões emocionais familiares.</p>
        <p className="mb-4">Curar é escolher constância.</p>
      </>
    ),
  },
},
];