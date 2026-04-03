import { dailyReadings } from '@/content/dailyReadings';
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
      className="py-20 text-center bg-gradient-to-b from-gray-900 to-gray-800 text-white"
    >
      <div className="max-w-3xl mx-auto px-6">

        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          {language === 'es' && 'Lectura del día'}
          {language === 'en' && 'Daily reading'}
          {language === 'fr' && 'Lecture du jour'}
          {language === 'pt' && 'Leitura do dia'}
        </h2>

        <p className="text-xl text-gray-300 italic transition-opacity duration-500">
          "{displayText}"
        </p>

      </div>
    </section>
  );
}