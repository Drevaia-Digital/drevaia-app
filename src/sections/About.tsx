import { Target, Eye, Leaf, Wifi, Palette, Globe } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Translations } from '@/i18n';

interface AboutProps {
  t: Translations;
}

export function About({ t }: AboutProps) {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.1);

  const values = [
    { icon: Leaf, text: t.about.value1 },
    { icon: Wifi, text: t.about.value2 },
    { icon: Palette, text: t.about.value3 },
    { icon: Globe, text: t.about.value4 },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden transition-colors duration-300"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/30 dark:bg-amber-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/about-visual.jpg"
                alt="Drevaia Digital"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-8 -right-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">✦</span>
                </div>
                <span className="font-semibold text-gray-800 dark:text-white">Noa Drevaia</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Visionaria, poeta sanadora y ritualista digital
              </p>
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
              {t.about.subtitle}
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t.about.title}
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {t.about.description1}
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t.about.description2}
            </p>

            {/* Mission & Vision */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-800">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t.about.mission}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t.about.missionText}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-amber-100 dark:border-amber-800">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t.about.vision}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t.about.visionText}</p>
              </div>
            </div>

            {/* Values */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                {t.about.values}
              </h3>
              <div className="flex flex-wrap gap-3">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-100 dark:border-gray-700"
                  >
                    <value.icon className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{value.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
