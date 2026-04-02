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
      { title: "Heridas Invisibles", description: "Descubre cómo tu pasado sigue viviendo en ti", link: "https://payhip.com/b/Wz0IG" },
      { title: "Espejos para tu herida", description: "Lo que ves fuera, habla de lo que llevas dentro", link: "https://payhip.com/b/cFJTb" },
      { title: "Pesa más la simpatía", description: "Conexión emocional que transforma relaciones", link: "https://payhip.com/b/Y9KTs" },
      { title: "Cómo decir 'no' sin culpa", description: "Pon límites sin sentirte mal", link: "https://payhip.com/b/2g89T" },
      { title: "Cosas que no sabías que te hacían libre", description: "Libérate sin darte cuenta", link: "https://payhip.com/b/kNSQa" },
      { title: "De Invisible a Referente", description: "Construye tu autoridad desde dentro", link: "https://payhip.com/b/m0sQ3" },
    ],
  },
  {
    id: "en",
    name: "English",
    subtitle: "Emotional transformation",
    flag: "🇬🇧",
    books: [
      { title: "Invisible Wounds", description: "Your past is still shaping your present", link: "https://payhip.com/b/BYviE" },
      { title: "Mirrors", description: "What you see outside reflects what’s inside", link: "https://payhip.com/b/lFxuV" },
      { title: "Sympathy Weighs More", description: "Emotional intelligence that connects deeply", link: "https://payhip.com/b/DGOd6" },
      { title: "How to say no without guilt", description: "Set boundaries without fear", link: "https://payhip.com/b/gTQLM" },
      { title: "Things you didn’t know made you free", description: "Freedom starts within", link: "https://payhip.com/b/CdrP5" },
      { title: "From Invisible to Authority", description: "Build your presence with purpose", link: "https://payhip.com/b/8QCbG" },
    ],
  },
  {
    id: "fr",
    name: "Français",
    subtitle: "Guérison intérieure",
    flag: "🇫🇷",
    books: [
      { title: "Blessures Invisibles", description: "Ton passé influence encore ta réalité", link: "https://payhip.com/b/6xTwV" },
      { title: "Miroirs", description: "Ce que tu vois reflète ton intérieur", link: "https://payhip.com/b/jOcke" },
      { title: "La Sympathie Pèse Davantage", description: "Connexion émotionnelle profonde", link: "https://payhip.com/b/HQ1Lb" },
      { title: "Dire non sans culpabilité", description: "Pose des limites sans peur", link: "https://payhip.com/b/K9r3R" },
      { title: "Ce que tu ignorais te rend libre", description: "Liberté intérieure réelle", link: "https://payhip.com/b/MDdsb" },
      { title: "De l’Invisible à la Référence", description: "Construis ton autorité", link: "https://payhip.com/b/VjwyZ" },
    ],
  },
  {
    id: "pt",
    name: "Português",
    subtitle: "Transformação emocional",
    flag: "🇧🇷",
    books: [
      { title: "Feridas Invisíveis", description: "Seu passado ainda vive em você", link: "https://payhip.com/b/OWV4T" },
      { title: "Espelhos", description: "O exterior reflete o interior", link: "https://payhip.com/b/BpZPY" },
      { title: "A Simpatia Pesa Mais", description: "Conexões que transformam", link: "https://payhip.com/b/3BvRa" },
      { title: "Dizer não sem culpa", description: "Limites com liberdade", link: "https://payhip.com/b/Z7yfI" },
      { title: "Coisas que te libertam", description: "Descubra sua liberdade", link: "https://payhip.com/b/KGMWi" },
      { title: "Do Invisível para Referência", description: "Construa sua presença", link: "https://payhip.com/b/mcWN5" },
    ],
  },
];

export function Ebooks({ language }: EbooksProps) {
  const t = uiText[language];
  const filtered = collections.filter((col) => col.id === language);

  return (
    <section id="ebooks" className="relative py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER EMOCIONAL */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* LIBROS */}
        <div className="space-y-20">
          {filtered.map((col) => (
            <div key={col.id}>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">{col.flag}</span>
                <div>
                  <h3 className="text-2xl font-bold">{col.name}</h3>
                  <p className="text-amber-400">{col.subtitle}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {col.books.map((book, i) => (
                  <a
                    key={i}
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 
                    shadow-lg transition-all duration-300 ease-out 
                    hover:-translate-y-2 hover:scale-[1.02] 
                    hover:shadow-2xl hover:shadow-orange-500/20"
                  >
                    <h4 className="font-bold text-lg mb-2 group-hover:text-amber-400 transition">
                      {book.title}
                    </h4>

                    <p className="text-gray-300 text-sm mb-4">
                      {book.description}
                    </p>

                    <span className="text-amber-400 font-medium group-hover:text-orange-400 transition">
                      → {t.cta}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CONFIANZA */}
        <p className="mt-16 text-center text-sm text-gray-500">
          {t.trust}
        </p>

      </div>
    </section>
  );
}