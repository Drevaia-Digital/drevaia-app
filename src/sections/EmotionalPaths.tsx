import { useLanguage } from '@/context/LanguageContext';

export function EmotionalPaths() {
  const { language } = useLanguage();

  const content = {
    es: {
      title: 'Si te sientes así…',
      subtitle: 'No necesitas buscar más. Solo empieza desde donde estás.',
      footer: 'No es casualidad que hayas llegado hasta aquí.',
      trust: 'Acceso inmediato · Lectura privada · Sin complicaciones',
      items: [
        {
          label: 'Cansado sin razón',
          desc: 'Entiende lo que tu cuerpo está intentando decirte',
          link: 'https://payhip.com/b/Wz0IG',
        },
        {
          label: 'Perdido aunque todo esté bien',
          desc: 'Reconecta con lo que realmente importa',
          link: 'https://payhip.com/b/kNSQa',
        },
        {
          label: 'Repitiendo lo mismo una y otra vez',
          desc: 'Rompe patrones que ya no te sirven',
          link: 'https://payhip.com/b/Nx0cF',
        },
      ],
    },

    en: {
      title: 'If you feel like this…',
      subtitle: 'You don’t need to search anymore. Just start where you are.',
      footer: 'It’s not a coincidence that you are here.',
      trust: 'Instant access · Private reading · No complications',
      items: [
        {
          label: 'Tired for no reason',
          desc: 'Understand what your body is trying to tell you',
          link: 'https://payhip.com/b/BYviE',
        },
        {
          label: 'Lost even when everything is fine',
          desc: 'Reconnect with what truly matters',
          link: 'https://payhip.com/b/CdrP5',
        },
        {
          label: 'Repeating the same patterns',
          desc: 'Break patterns that no longer serve you',
          link: 'https://payhip.com/b/0rjX8',
        },
      ],
    },

    fr: {
      title: 'Si tu te sens ainsi…',
      subtitle: 'Tu n’as pas besoin de chercher plus loin. Commence là où tu es.',
      footer: "Ce n'est pas un hasard si tu es ici.",
      trust: 'Accès immédiat · Lecture privée · Sans complication',
      items: [
        {
          label: 'Fatigué sans raison',
          desc: 'Comprends ce que ton corps essaie de te dire',
          link: 'https://payhip.com/b/6xTwV',
        },
        {
          label: 'Perdu même si tout va bien',
          desc: 'Reconnecte-toi à ce qui compte vraiment',
          link: 'https://payhip.com/b/MDdsb',
        },
        {
          label: 'Répéter les mêmes schémas',
          desc: 'Brise les schémas qui ne te servent plus',
          link: 'https://payhip.com/b/hBRzA',
        },
      ],
    },

    pt: {
      title: 'Se você se sente assim…',
      subtitle: 'Você não precisa procurar mais. Comece de onde você está.',
      footer: 'Não é coincidência que você esteja aqui.',
      trust: 'Acesso imediato · Leitura privada · Sem complicações',
      items: [
        {
          label: 'Cansado sem motivo',
          desc: 'Entenda o que seu corpo está tentando dizer',
          link: 'https://payhip.com/b/OWV4T',
        },
        {
          label: 'Perdido mesmo quando tudo está bem',
          desc: 'Reconecte-se com o que realmente importa',
          link: 'https://payhip.com/b/KGMWi',
        },
        {
          label: 'Repetindo os mesmos padrões',
          desc: 'Quebre padrões que não te servem mais',
          link: 'https://payhip.com/b/kE8hV',
        },
      ],
    },
  };

  const t = content[language as 'es' | 'en' | 'fr' | 'pt'];

  return (
    <section className="relative py-24 px-4 text-center text-white border-t border-white/5 overflow-hidden">

      {/* Fondo imagen corazones */}
      <div className="absolute inset-0">
        <img
          src="/images/corazones-bg.jpg"
          alt="background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Capa oscura */}
      <div className="absolute inset-0 bg-gray-900/80" />

      {/* Contenido */}
      <div className="relative z-10">

        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {t.title}
        </h2>

        <p className="text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {t.items.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-white/5 backdrop-blur hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl text-left block group"
            >
              <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-400 transition">
                {item.label}
              </h3>

              <p className="text-sm text-gray-400">
                {item.desc}
              </p>

              <p className="mt-4 text-xs text-gray-500 group-hover:text-gray-400 transition">
                → {language === 'es'
                    ? 'Empezar ahora'
                    : language === 'fr'
                    ? 'Commencer maintenant'
                    : language === 'pt'
                    ? 'Começar agora'
                    : 'Start now'}
              </p>
            </a>
          ))}
        </div>

        <p className="mt-8 text-xs text-gray-500">
          {t.trust}
        </p>

        <p className="mt-4 text-sm text-gray-500">
          {t.footer}
        </p>

      </div>
    </section>
  );
}