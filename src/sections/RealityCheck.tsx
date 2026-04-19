import { useLanguage } from '@/context/LanguageContext';

type Emotion = 'ansiedad' | 'proposito' | 'patrones';

export function RealityCheck() {
  const { language } = useLanguage();

  const emotion = localStorage.getItem("emotion") as Emotion | null;

  const content = {
    es: {
      defaultTitle: "Esto es lo que realmente te está pasando",
      emotionalTitles: {
        ansiedad: "Esto es por qué te sientes así",
        proposito: "Esto es por qué te sientes perdido",
        patrones: "Esto es lo que te mantiene en el mismo ciclo",
      },
      buy: "Acceder ahora",
      preCTA: {
        line1: "No es que no puedas… es que llevas demasiado tiempo sosteniendo todo solo.",
        line2: "Este ebook no es teoría. Es una forma de entender lo que te pasa… y empezar a cambiarlo.",
        trust: "Acceso inmediato · Lectura privada · Pago único",
        close: "Cuando lo entiendes, todo empieza a cambiar.",
      },
      items: [
        {
          emotion: 'ansiedad',
          title: "No es falta de disciplina",
          desc: "Es agotamiento emocional acumulado",
          cta: "Ver solución",
          blog: "/blog/por-que-me-siento-vacio",
          link: "https://payhip.com/b/Wz0IG",
        },
        {
          emotion: 'proposito',
          title: "No estás perdido",
          desc: "Estás desconectado de lo que importa",
          cta: "Recuperar dirección",
          blog: "/blog/por-que-me-siento-perdido",
          link: "https://payhip.com/b/kNSQa",
        },
        {
          emotion: 'patrones',
          title: "No es mala suerte",
          desc: "Estás repitiendo patrones invisibles",
          cta: "Romper el ciclo",
          blog: "/blog/como-sanar-heridas-emocionales",
          link: "https://payhip.com/b/Nx0cF",
        },
      ],
    },

    en: {
      defaultTitle: "This is what’s really happening to you",
      emotionalTitles: {
        ansiedad: "This is why you feel this way",
        proposito: "This is why you feel lost",
        patrones: "This is what keeps you stuck",
      },
      buy: "Access now",
      preCTA: {
        line1: "It’s not that you can’t… you’ve just been carrying too much for too long.",
        line2: "This isn’t theory. It’s a way to understand what’s happening to you… and start changing it.",
        trust: "Instant access · Private reading · One-time payment",
        close: "Once you understand it, everything starts to shift.",
      },
      items: [
        {
          emotion: 'ansiedad',
          title: "It’s not lack of discipline",
          desc: "It’s accumulated emotional exhaustion",
          cta: "See solution",
          blog: "/blog/why-do-i-feel-empty",
          link: "https://payhip.com/b/BYviE",
        },
        {
          emotion: 'proposito',
          title: "You’re not lost",
          desc: "You’re disconnected from what matters",
          cta: "Find direction",
          blog: "/blog/why-do-i-feel-lost",
          link: "https://payhip.com/b/CdrP5",
        },
        {
          emotion: 'patrones',
          title: "It’s not bad luck",
          desc: "You’re repeating invisible patterns",
          cta: "Break the cycle",
          blog: "/blog/heal-emotional-wounds",
          link: "https://payhip.com/b/0rjX8",
        },
      ],
    },

    fr: {
      defaultTitle: "Voici ce qui se passe vraiment",
      emotionalTitles: {
        ansiedad: "Voici pourquoi tu te sens ainsi",
        proposito: "Voici pourquoi tu te sens perdu",
        patrones: "Voici ce qui te bloque",
      },
      buy: "Accéder maintenant",
      preCTA: {
        line1: "Ce n’est pas que tu ne peux pas… tu portes simplement trop depuis trop longtemps.",
        line2: "Ce livre n’est pas de la théorie. C’est une façon de comprendre ce que tu vis… et de commencer à changer.",
        trust: "Accès immédiat · Lecture privée · Paiement unique",
        close: "Quand tu comprends, tout commence à changer.",
      },
      items: [
        {
          emotion: 'ansiedad',
          title: "Ce n’est pas un manque de discipline",
          desc: "C’est un épuisement émotionnel accumulé",
          cta: "Voir la solution",
          blog: "/blog/pourquoi-je-me-sens-vide",
          link: "https://payhip.com/b/6xTwV",
        },
        {
          emotion: 'proposito',
          title: "Tu n’es pas perdu",
          desc: "Tu es déconnecté de l’essentiel",
          cta: "Trouver une direction",
          blog: "/blog/pourquoi-je-me-sens-perdu",
          link: "https://payhip.com/b/MDdsb",
        },
        {
          emotion: 'patrones',
          title: "Ce n’est pas de la malchance",
          desc: "Tu répètes des schémas invisibles",
          cta: "Briser le cycle",
          blog: "/blog/guerir-blessures-emotionnelles",
          link: "https://payhip.com/b/hBRzA",
        },
      ],
    },

    pt: {
      defaultTitle: "Isso é o que realmente está acontecendo",
      emotionalTitles: {
        ansiedad: "É por isso que você se sente assim",
        proposito: "É por isso que você se sente perdido",
        patrones: "Isso é o que te prende no mesmo ciclo",
      },
      buy: "Acessar agora",
      preCTA: {
        line1: "Não é que você não consiga… você só tem carregado tudo sozinho por tempo demais.",
        line2: "Este ebook não é teoria. É uma forma de entender o que você está vivendo… e começar a mudar.",
        trust: "Acesso imediato · Leitura privada · Pagamento único",
        close: "Quando você entende, tudo começa a mudar.",
      },
      items: [
        {
          emotion: 'ansiedad',
          title: "Não é falta de disciplina",
          desc: "É exaustão emocional acumulada",
          cta: "Ver solução",
          blog: "/blog/por-que-me-sinto-vazio",
          link: "https://payhip.com/b/OWV4T",
        },
        {
          emotion: 'proposito',
          title: "Você não está perdido",
          desc: "Está desconectado do que importa",
          cta: "Encontrar direção",
          blog: "/blog/por-que-me-sinto-perdido",
          link: "https://payhip.com/b/KGMWi",
        },
        {
          emotion: 'patrones',
          title: "Não é azar",
          desc: "Você está repetindo padrões invisíveis",
          cta: "Quebrar o ciclo",
          blog: "/blog/curar-feridas-emocionais",
          link: "https://payhip.com/b/kE8hV",
        },
      ],
    },
  };

  const t = content[language] || content.es;

  const filteredItems = emotion
    ? t.items.filter(item => item.emotion === emotion)
    : t.items;

  const dynamicTitle =
    emotion && t.emotionalTitles[emotion]
      ? t.emotionalTitles[emotion]
      : t.defaultTitle;

  return (
    <section className="py-20 px-4 bg-black text-white text-center">

      <h2 className="text-2xl md:text-3xl font-bold mb-12">
        {dynamicTitle}
      </h2>

      <div className={`grid gap-6 max-w-6xl mx-auto ${
        filteredItems.length === 1 ? 'md:grid-cols-1 max-w-xl' : 'md:grid-cols-3'
      }`}>

        {filteredItems.map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:scale-105 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold mb-2 text-orange-400">
              {item.title}
            </h3>

            <p className="text-white/80 mb-6">
              {item.desc}
            </p>

            <div className="flex flex-col gap-4">

              <a href={`/${language}${item.blog}`}>
                <button className="w-full text-sm px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                  {item.cta}
                </button>
              </a>

              {/* 🔥 BLOQUE EMOCIONAL PRO */}
              <div className="text-left text-sm space-y-3 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
                <p className="text-white/90">{t.preCTA.line1}</p>
                <p className="text-white/70">{t.preCTA.line2}</p>
                <div className="text-xs text-white/60">{t.preCTA.trust}</div>
                <p className="text-xs text-purple-300 italic">{t.preCTA.close}</p>
              </div>

              <button
                onClick={() => window.open(item.link, "_blank", "noopener,noreferrer")}
                className="w-full text-sm px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-amber-400 hover:scale-105 transition font-medium"
              >
                {t.buy}
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}