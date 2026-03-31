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

const collections: Collection[] = [
  {
    id: "es",
    name: "Español",
    subtitle: "Sanación emocional profunda",
    flag: "🇪🇸",
    books: [
      { title: "Sanar desde dentro", description: "Transforma tu mundo emocional", link: "https://payhip.com/b/m0sQ3" },
      { title: "Reconectar contigo", description: "Vuelve a tu esencia", link: "https://payhip.com/b/wlN02" },
      { title: "El mapa invisible", description: "Descubre tu mente emocional", link: "https://payhip.com/b/Y9KTs" },
      { title: "Liberarte de ti", description: "Rompe patrones internos", link: "https://payhip.com/b/Wz0IG" },
      { title: "Expansión interior", description: "Evoluciona tu conciencia", link: "https://payhip.com/b/Ftkd6" },
      { title: "Despierta tu poder", description: "Activa tu transformación", link: "https://payhip.com/b/n9MHe" },
    ],
  },
  {
    id: "en",
    name: "English",
    subtitle: "Emotional transformation",
    flag: "🇬🇧",
    books: [
      { title: "Heal From Within", description: "Transform your inner world", link: "https://payhip.com/b/8QCbG" },
      { title: "Reconnect With Yourself", description: "Return to your essence", link: "https://payhip.com/b/R4MKv" },
      { title: "The Invisible Map", description: "Understand your emotional mind", link: "https://payhip.com/b/DGOd6" },
      { title: "Break Your Patterns", description: "Free your inner self", link: "https://payhip.com/b/BYviE" },
      { title: "Inner Expansion", description: "Evolve your awareness", link: "https://payhip.com/b/hUBy5" },
      { title: "Awaken Your Power", description: "Activate transformation", link: "https://payhip.com/b/bDfr2" },
    ],
  },
  {
    id: "fr",
    name: "Français",
    subtitle: "Guérison intérieure",
    flag: "🇫🇷",
    books: [
      { title: "Guérir de l'intérieur", description: "Transforme ton monde émotionnel", link: "https://payhip.com/b/VjwyZ" },
      { title: "Reconnexion à soi", description: "Retour à ton essence", link: "https://payhip.com/b/CDaeN" },
      { title: "Carte invisible", description: "Comprendre ton esprit", link: "https://payhip.com/b/HQ1Lb" },
      { title: "Libération intérieure", description: "Brise tes schémas", link: "https://payhip.com/b/6xTwV" },
      { title: "Expansion", description: "Éveille ta conscience", link: "https://payhip.com/b/0qfyH" },
      { title: "Pouvoir intérieur", description: "Active ton changement", link: "https://payhip.com/b/9B3r0" },
    ],
  },
  {
    id: "pt",
    name: "Português",
    subtitle: "Transformação emocional",
    flag: "🇧🇷",
    books: [
      { title: "Cura interior", description: "Transforme sua vida", link: "https://payhip.com/b/mcWN5" },
      { title: "Reconexão", description: "Volte para sua essência", link: "https://payhip.com/b/bXhB7" },
      { title: "Mapa invisível", description: "Entenda sua mente", link: "https://payhip.com/b/3BvRa" },
      { title: "Libertação", description: "Rompa padrões", link: "https://payhip.com/b/OWV4T" },
      { title: "Expansão", description: "Eleve sua consciência", link: "https://payhip.com/b/IRvw1" },
      { title: "Poder interior", description: "Ative sua transformação", link: "https://payhip.com/b/HTeu4" },
    ],
  },
];

export function Ebooks({ language }: EbooksProps) {
const filtered = collections.filter(col => col.id === language);  
return (
    <section
  id="ebooks"
  className="relative py-24 bg-gray-900 text-white"
>
      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Biblioteca Drevaia 🔥🔥🔥
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            No puedes sanar lo que no escuchas. Tu cuerpo es el diario en el que tu alma escribe.
          </p>
        </div>

        <div className="space-y-20">
          {filtered.map((col) => (
            <div key={col.id}>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">{col.flag}</span>
                <div>
                  <h3 className="text-2xl font-bold">{col.name}</h3>
                  <p className="text-purple-600">{col.subtitle}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {col.books.map((book, i) => (
                  <a
                    key={i}
                    href={book.link}
                    target="_blank"
                    className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 
shadow-lg transition-all duration-300 ease-out 
hover:-translate-y-2 hover:scale-[1.02] 
hover:shadow-2xl hover:shadow-purple-500/10"
                  >
                    <h4 className="font-bold text-lg mb-2">{book.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      {book.description}
                    </p>
                    <span className="text-purple-600 font-medium">
                      Ver ebook →
                    </span>
                  </a>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}