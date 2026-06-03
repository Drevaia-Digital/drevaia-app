import type { Language } from '@/i18n';

interface EbooksProps {
  language: Language;
}

interface Ebook {
  title: string;
  description: string;
  link: string;
}

interface Collection {
  id: string;
  name: string;
  subtitle: string;
  flag: string;
  books: Ebook[];
}

const uiText = {
  es: {
    title: "No es solo lectura. Es transformación.",
    subtitle:
      "No puedes sanar lo que no escuchas. Aquí empiezas a entender lo que te pasa… y a cambiarlo.",
    cta: "Empezar ahora",
    trust: "Acceso inmediato · Lectura privada · Sin complicaciones",
  },

  en: {
    title: "This is not just reading. It’s transformation.",
    subtitle:
      "You can’t heal what you don’t listen to. This is where you begin to understand… and change.",
    cta: "Start now",
    trust: "Instant access · Private reading · No complications",
  },

  fr: {
    title: "Ce n’est pas juste lire. C’est se transformer.",
    subtitle:
      "Tu ne peux pas guérir ce que tu n’écoutes pas. Ici commence le changement.",
    cta: "Commencer maintenant",
    trust: "Accès immédiat · Lecture privée · Sans complication",
  },

  pt: {
    title: "Não é apenas leitura. É transformação.",
    subtitle:
      "Você não pode curar o que não escuta. Aqui começa a mudança.",
    cta: "Começar agora",
    trust: "Acesso imediato · Leitura privada · Sem complicações",
  },
};

const collections: Collection[] = [
  {
    id: "es",
    name: "Español",
    subtitle: "Sanación emocional profunda",
    flag: "🇪🇸",

    books: [
      {
        title: "Heridas Invisibles",
        description: "Descubre cómo tu pasado sigue viviendo en ti",
        link: "https://payhip.com/b/Wz0IG",
      },

      {
        title: "Espejos para tu herida",
        description: "Lo que ves fuera, habla de lo que llevas dentro",
        link: "https://payhip.com/b/cFJTb",
      },

      {
        title: "Pesa más la simpatía",
        description: "Conexión emocional que transforma relaciones",
        link: "https://payhip.com/b/Y9KTs",
      },

      {
        title: "Cómo decir 'no' sin culpa",
        description: "Pon límites sin sentirte mal",
        link: "https://payhip.com/b/2g89T",
      },

      {
        title: "Cosas que no sabías que te hacían libre",
        description: "Libérate sin darte cuenta",
        link: "https://payhip.com/b/kNSQa",
      },

      {
        title: "De Invisible a Referente",
        description: "Construye tu autoridad desde dentro",
        link: "https://payhip.com/b/m0sQ3",
      },
    ],
  },

  {
    id: "en",
    name: "English",
    subtitle: "Emotional transformation",
    flag: "🇬🇧",

    books: [
      {
        title: "Invisible Wounds",
        description: "Your past is still shaping your present",
        link: "https://payhip.com/b/BYviE",
      },

      {
        title: "Mirrors",
        description: "What you see outside reflects what’s inside",
        link: "https://payhip.com/b/lFxuV",
      },

      {
        title: "Sympathy Weighs More",
        description: "Emotional intelligence that connects deeply",
        link: "https://payhip.com/b/DGOd6",
      },

      {
        title: "How to say no without guilt",
        description: "Set boundaries without fear",
        link: "https://payhip.com/b/gTQLM",
      },

      {
        title: "Things you didn’t know made you free",
        description: "Freedom starts within",
        link: "https://payhip.com/b/CdrP5",
      },

      {
        title: "From Invisible to Authority",
        description: "Build your presence with purpose",
        link: "https://payhip.com/b/8QCbG",
      },
    ],
  },

  {
    id: "fr",
    name: "Français",
    subtitle: "Guérison intérieure",
    flag: "🇫🇷",

    books: [
      {
        title: "Blessures Invisibles",
        description: "Ton passé influence encore ta réalité",
        link: "https://payhip.com/b/6xTwV",
      },

      {
        title: "Miroirs",
        description: "Ce que tu vois reflète ton intérieur",
        link: "https://payhip.com/b/jOcke",
      },

      {
        title: "La Sympathie Pèse Davantage",
        description: "Connexion émotionnelle profonde",
        link: "https://payhip.com/b/HQ1Lb",
      },

      {
        title: "Dire non sans culpabilité",
        description: "Pose des limites sans peur",
        link: "https://payhip.com/b/K9r3R",
      },

      {
        title: "Ce que tu ignorais te rend libre",
        description: "Liberté intérieure réelle",
        link: "https://payhip.com/b/MDdsb",
      },

      {
        title: "De l’Invisible à la Référence",
        description: "Construis ton autorité",
        link: "https://payhip.com/b/VjwyZ",
      },
    ],
  },

  {
    id: "pt",
    name: "Português",
    subtitle: "Transformação emocional",
    flag: "🇧🇷",

    books: [
      {
        title: "Feridas Invisíveis",
        description: "Seu passado ainda vive em você",
        link: "https://payhip.com/b/OWV4T",
      },

      {
        title: "Espelhos",
        description: "O exterior reflete o interior",
        link: "https://payhip.com/b/BpZPY",
      },

      {
        title: "A Simpatia Pesa Mais",
        description: "Conexões que transformam",
        link: "https://payhip.com/b/3BvRa",
      },

      {
        title: "Dizer não sem culpa",
        description: "Limites com liberdade",
        link: "https://payhip.com/b/Z7yfI",
      },

      {
        title: "Coisas que te libertam",
        description: "Descubra sua liberdade",
        link: "https://payhip.com/b/KGMWi",
      },

      {
        title: "Do Invisível para Referência",
        description: "Construa sua presença",
        link: "https://payhip.com/b/mcWN5",
      },
    ],
  },
];

export function Ebooks({ language }: EbooksProps) {

  const t = uiText[language];

  const filtered = collections.filter(
    (col) => col.id === language
  );

  return (
    <section
      id="ebooks"
      className="
        relative
        overflow-hidden

        bg-gray-900
        py-24

        text-white
      "
    >

      <div className="mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <div className="mb-16 text-center">

          <h2 className="mb-5 text-4xl font-black text-white/95 md:text-5xl">
            {t.title}
          </h2>

          <p
            className="
              mx-auto
              max-w-2xl

              text-lg
              leading-relaxed

              text-white/60
            "
          >
            {t.subtitle}
          </p>

        </div>

        {/* COLLECTIONS */}
        <div className="space-y-20">

          {filtered.map((col) => (

            <div key={col.id}>

              {/* Collection Header */}
              <div className="mb-8 flex items-center gap-4">

                <span className="text-4xl">
                  {col.flag}
                </span>

                <div>

                  <h3 className="text-3xl font-black text-white/95">
                    {col.name}
                  </h3>

                  <p className="text-primary">
                    {col.subtitle}
                  </p>

                </div>

              </div>

              {/* Books Grid */}
              <div
                className="
                  grid
                  gap-6

                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >

                {col.books.map((book, i) => (

                  <a
                    key={i}
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"

                    className="
                      group
                      relative
                      overflow-hidden

                      rounded-[2rem]

                      border
                      border-white/10

                      bg-white/[0.04]
                      backdrop-blur-2xl

                      p-7

                      shadow-[0_0_50px_rgba(0,0,0,0.18)]

                      transition-all
                      duration-500
                      ease-out

                      hover:-translate-y-2
                      hover:border-primary/30
                      hover:bg-white/[0.06]
                      hover:shadow-[0_0_80px_rgba(214,164,92,0.18)]
                    "
                  >

                    {/* Ambient Glow */}
                    <div
                      className="
                        pointer-events-none

                        absolute
                        inset-0

                        opacity-0

                        transition-opacity
                        duration-700

                        group-hover:opacity-100
                      "
                    >

                      <div
                        className="
                          absolute
                          inset-0

                          bg-gradient-to-br
                          from-primary/10
                          via-transparent
                          to-transparent
                        "
                      />

                    </div>

                    {/* Title */}
                    <h4
                      className="
                        relative
                        z-10

                        mb-3

                        text-xl
                        font-black

                        text-white/95

                        transition-colors
                        duration-300

                        group-hover:text-primary
                      "
                    >
                      {book.title}
                    </h4>

                    {/* Description */}
                    <p
                      className="
                        relative
                        z-10

                        mb-6

                        text-sm
                        leading-relaxed

                        text-white/65
                      "
                    >
                      {book.description}
                    </p>

                    {/* CTA */}
                    <span
                      className="
                        relative
                        z-10

                        inline-flex
                        items-center
                        gap-2

                        text-sm
                        font-semibold
                        uppercase

                        tracking-[0.12em]

                        text-primary

                        transition-all
                        duration-300

                        group-hover:translate-x-1
                      "
                    >
                      → {t.cta}
                    </span>

                  </a>

                ))}

              </div>

            </div>

          ))}

        </div>

        {/* TRUST */}
        <p
          className="
            mt-20
            text-center

            text-sm
            tracking-[0.08em]

            text-white/35
          "
        >
          {t.trust}
        </p>

      </div>

    </section>
  );
}