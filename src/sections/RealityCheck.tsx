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
      items: [
        {
          emotion: 'ansiedad',
          title: "No es falta de disciplina",
          desc: "Es agotamiento emocional acumulado",
          cta: "Ver solución",
          link: "https://payhip.com/b/Wz0IG",
        },
        {
          emotion: 'proposito',
          title: "No estás perdido",
          desc: "Estás desconectado de lo que importa",
          cta: "Recuperar dirección",
          link: "https://payhip.com/b/kNSQa",
        },
        {
          emotion: 'patrones',
          title: "No es mala suerte",
          desc: "Estás repitiendo patrones invisibles",
          cta: "Romper el ciclo",
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
      items: [
        {
          emotion: 'ansiedad',
          title: "It’s not lack of discipline",
          desc: "It’s accumulated emotional exhaustion",
          cta: "See solution",
          link: "https://payhip.com/b/BYviE",
        },
        {
          emotion: 'proposito',
          title: "You’re not lost",
          desc: "You’re disconnected from what matters",
          cta: "Find direction",
          link: "https://payhip.com/b/CdrP5",
        },
        {
          emotion: 'patrones',
          title: "It’s not bad luck",
          desc: "You’re repeating invisible patterns",
          cta: "Break the cycle",
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
      items: [
        {
          emotion: 'ansiedad',
          title: "Ce n’est pas un manque de discipline",
          desc: "C’est un épuisement émotionnel accumulé",
          cta: "Voir la solution",
          link: "https://payhip.com/b/6xTwV",
        },
        {
          emotion: 'proposito',
          title: "Tu n’es pas perdu",
          desc: "Tu es déconnecté de l’essentiel",
          cta: "Trouver une direction",
          link: "https://payhip.com/b/MDdsb",
        },
        {
          emotion: 'patrones',
          title: "Ce n’est pas de la malchance",
          desc: "Tu répètes des schémas invisibles",
          cta: "Briser le cycle",
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
      items: [
        {
          emotion: 'ansiedad',
          title: "Não é falta de disciplina",
          desc: "É exaustão emocional acumulada",
          cta: "Ver solução",
          link: "https://payhip.com/b/OWV4T",
        },
        {
          emotion: 'proposito',
          title: "Você não está perdido",
          desc: "Está desconectado do que importa",
          cta: "Encontrar direção",
          link: "https://payhip.com/b/KGMWi",
        },
        {
          emotion: 'patrones',
          title: "Não é azar",
          desc: "Você está repetindo padrões invisíveis",
          cta: "Quebrar o ciclo",
          link: "https://payhip.com/b/kE8hV",
        },
      ],
    },
  };

  const t = content[language] || content.es;

  // 🔥 FILTRADO INTELIGENTE (SIN INDEX)
  const filteredItems = emotion
    ? t.items.filter(item => item.emotion === emotion)
    : t.items;

  // 🔥 TÍTULO DINÁMICO
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

            <a href={item.link} target="_blank">
              <button className="text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-amber-400 hover:scale-105 transition">
                {item.cta}
              </button>
            </a>
          </div>
        ))}

      </div>

    </section>
  );
}