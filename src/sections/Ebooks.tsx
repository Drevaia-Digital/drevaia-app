import type { Language } from '@/i18n';

interface EbooksProps {
  language: Language;
}

const ebooks = [
  {
    title: "Ebook 1",
    link: "https://payhip.com/b/m0sQ3",
  },
  {
    title: "Ebook 2",
    link: "https://payhip.com/b/wlN02",
  },
  {
    title: "Ebook 3",
    link: "https://payhip.com/b/Y9KTs",
  },
  {
    title: "Ebook 4",
    link: "https://payhip.com/b/Wz0IG",
  },
];

export function Ebooks({}: EbooksProps) {
  return (
    <section id="ebooks" className="py-20 bg-white text-center">
      <h2 className="text-3xl font-bold mb-10">
        Biblioteca Drevaia
      </h2>

      <div className="grid gap-6 max-w-4xl mx-auto px-4">
        {ebooks.map((book, i) => (
          <a
            key={i}
            href={book.link}
            target="_blank"
            className="block p-6 bg-purple-100 rounded-xl hover:bg-purple-200 transition"
          >
            {book.title}
          </a>
        ))}
      </div>
    </section>
  );
}