import { dailyReadings } from '@/content/blog/dailyReadings';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';

export function DailyReading() {
  const { language } = useLanguage();

  const readings = dailyReadings[language as 'es' | 'en' | 'fr' | 'pt'];

  const today = new Date().getDate();
  const index = today % readings.length;

  const text = readings[index];

  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    setDisplayText('');
    const timeout = setTimeout(() => {
      setDisplayText(text);
    }, 200);

    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <section
      id="daily"
      className="py-20 md:py-28 text-center bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white"
    >
      <div className="max-w-3xl mx-auto px-6">

        {/* TÍTULO */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
          {language === 'es' && 'Lectura del día'}
          {language === 'en' && 'Daily reading'}
          {language === 'fr' && 'Lecture du jour'}
          {language === 'pt' && 'Leitura do dia'}
        </h2>

        {/* TEXTO */}
        <p className="text-xl md:text-2xl text-gray-300 italic leading-relaxed transition-opacity duration-500">
          "{displayText}"
        </p>

        {/* BOTÓN VOLVER */}
<a
  href="#top"
  className="inline-block mt-10 text-sm text-white/60 hover:text-white transition"
>
<span className="text-lg">←</span>
  <span>
  ← {language === 'es' && 'Volver al inicio'}
  {language === 'en' && 'Back to top'}
  {language === 'fr' && 'Retour en haut'}
  {language === 'pt' && 'Voltar ao início'}
</span>
</a>

      </div>
    </section>
  );
}