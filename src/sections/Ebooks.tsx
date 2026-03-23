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
  name: string;
  subtitle: string;
  flag: string;
  books: Ebook[];
}

const collections: Collection[] = [
  {
    name: "Español",
    subtitle: "Sanación emocional profunda",
    flag: "🇪🇸",
    books: [
      { title: "Sanar desde dentro", description: "Transforma tu mundo emocional", link: "https://payhip.com/b/m0sQ3" },
      { title: "Reconectar contigo", description: "Vuelve a tu esencia", link: "https://payhip.com/b/wlN02" },
      { title: "El mapa invisible", description: "Descubre tu mente emocional", link: "https://payhip.com/b/Y9KTs" },
      { title: "Liberarte de ti", description: "Rompe patrones internos", link: "https://payhip.com/b/Wz0IG" },
    ],
  },
  {
    name: "English",
    subtitle: "Emotional transformation",
    flag: "🇬🇧",
    books: [
      { title: "Heal From Within", description: "Transform your inner world", link: "https://payhip.com/b/8QCbG" },
      { title: "Reconnect With Yourself", description: "Return to your essence", link: "https://payhip.com/b/R4MKv" },
      { title: "The Invisible Map", description: "Understand your emotional mind", link: "https://payhip.com/b/DGOd6" },
    ],
  },
  {
    name: "Français",
    subtitle: "Guérison intérieure",
    flag: "🇫🇷",
    books: [
      { title: "Guérir de l'intérieur", description: "Transforme ton monde émotionnel", link: "https://payhip.com/b/VjwyZ" },
      { title: "Reconnexion à soi", description: "Retour à ton essence", link: "https://payhip.com/b/CDaeN" },
    ],
  },
  {
    name: "Português",
    subtitle: "Transformação emocional",
    flag: "🇧🇷",
    books: [
      { title: "Cura interior", description: "Transforme sua vida emocional", link: "https://payhip.com/b/mcWN5" },
      { title: "Reconexão", description: "Volte para sua essência", link: "https://payhip.com/b/bXhB7" },
    ],
  },
];

export function Ebooks({}: EbooksProps) {
  return (
    <section id="ebooks" className="py-20 bg-gradient-to-b from-white to-purple-50 text-center">
      
      <h2 className="text-4xl font-bold mb-4 text-gray-900">
        Biblioteca Drevaia
      </h2>

      <p className="text-gray-600 mb-12 max-w-xl mx-auto">
        No puedes sanar lo que no escuchas. Tu cuerpo es el diario en el que tu alma escribe.
      </p>

      <div className="space-y-16 max-w-6xl mx-auto px-4">

        {collections.map((collection, i) => (
          <div key={i}>
            
            <div className="flex items-center gap-3 justify-center mb-6">
              <span className="text-2xl">{collection.flag}</span>
              <h3 className="text-2xl font-bold text-gray-800">
                {collection.name}
              </h3>
            </div>

            <p className="text-purple-600 mb-6">
              {collection.subtitle}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {collection.books.map((book, j) => (
                <a
                  key={j}
                  href={book.link}
                  target="_blank"
                  className="block p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-1 border"
                >
                  <h4 className="font-bold text-lg mb-2">
                    {book.title}
                  </h4>

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
    </section>
  );
}