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
          emotion: 'ansiedad',
        },
        {
          label: 'Perdido aunque todo esté bien',
          desc: 'Reconecta con lo que realmente importa',
          link: 'https://payhip.com/b/kNSQa',
          emotion: 'proposito',
        },
        {
          label: 'Repitiendo lo mismo una y otra vez',
          desc: 'Rompe patrones que ya no te sirven',
          link: 'https://payhip.com/b/Nx0cF',
          emotion: 'patrones',
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
          emotion: 'ansiedad',
        },
        {
          label: 'Lost even when everything is fine',
          desc: 'Reconnect with what truly matters',
          link: 'https://payhip.com/b/CdrP5',
          emotion: 'proposito',
        },
        {
          label: 'Repeating the same patterns',
          desc: 'Break patterns that no longer serve you',
          link: 'https://payhip.com/b/0rjX8',
          emotion: 'patrones',
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
          emotion: 'ansiedad',
        },
        {
          label: 'Perdu même si tout va bien',
          desc: 'Reconnecte-toi à ce qui compte vraiment',
          link: 'https://payhip.com/b/MDdsb',
          emotion: 'proposito',
        },
        {
          label: 'Répéter les mêmes schémas',
          desc: 'Brise les schémas qui ne te servent plus',
          link: 'https://payhip.com/b/hBRzA',
          emotion: 'patrones',
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
          emotion: 'ansiedad',
        },
        {
          label: 'Perdido mesmo quando tudo está bem',
          desc: 'Reconecte-se com o que realmente importa',
          link: 'https://payhip.com/b/KGMWi',
          emotion: 'proposito',
        },
        {
          label: 'Repetindo os mesmos padrões',
          desc: 'Quebre padrões que não te servem mais',
          link: 'https://payhip.com/b/kE8hV',
          emotion: 'patrones',
        },
      ],
    },
  };

  const t = content[language as 'es' | 'en' | 'fr' | 'pt'] || content.es;

  return (
    <section className="relative py-24 px-4 text-center text-white border-t border-white/5 overflow-hidden">

      {/* Fondo */}
      <div className="absolute inset-0">
        <img
          src="/images/corazones-bg.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      <div className="relative z-10">

        <h2 className="text-2xl md:text-3xl font-bold mb-4 drop-shadow">
          {t.title}
        </h2>

        <p className="text-white/90 mb-12 max-w-xl mx-auto">
          {t.subtitle}
        </p>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {t.items.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (item.emotion) {
                  localStorage.setItem("emotion", item.emotion);
                }
              }}
              className="p-6 rounded-2xl bg-black/60 backdrop-blur-xl hover:scale-105 transition-all duration-300 shadow-2xl text-left block group"
            >
              <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-400 transition">
                {item.label}
              </h3>

              <p className="text-sm text-white">
                {item.desc}
              </p>

              <p className="mt-4 text-xs text-white/70 group-hover:text-white transition">
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

        <p className="mt-8 text-xs text-white/70">
          {t.trust}
        </p>

        <p className="mt-4 text-sm text-white/80">
          {t.footer}
        </p>

      </div>
    </section>
  );
}