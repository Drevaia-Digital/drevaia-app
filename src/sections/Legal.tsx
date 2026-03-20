import { Shield, FileText, Lock, Cookie, RefreshCw, Mail, Scale, UserCheck, Globe, AlertTriangle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Translations } from '@/i18n';

interface LegalProps {
  t: Translations;
}

export function Legal({ t }: LegalProps) {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      id="legal"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden transition-colors duration-300"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-100/50 dark:bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100/50 dark:bg-amber-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
            <Scale className="w-4 h-4" />
            {t.legal.badge}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.legal.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.legal.description}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Privacy Policy */}
          <div
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {t.legal.privacyTitle}
                </h3>
              </div>

              <div className="space-y-6 text-gray-600 dark:text-gray-300">
                {/* Section 1 */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-purple-500" />
                    {t.legal.section1Title}
                  </h4>
                  <p className="text-sm leading-relaxed mb-3">
                    {t.legal.section1Text}
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-sm">
                    <p><strong>{t.legal.commercialName}:</strong> Drevaia Digital</p>
                    <p><strong>{t.legal.email}:</strong> noa@drevaia.com</p>
                    <p><strong>{t.legal.jurisdiction}:</strong> Colombia</p>
                  </div>
                  <p className="text-sm leading-relaxed mt-3 italic">
                    <AlertTriangle className="w-4 h-4 inline mr-1 text-amber-500" />
                    {t.legal.natureTitle}: {t.legal.natureText}
                  </p>
                </div>

                {/* Section 2 */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-500" />
                    {t.legal.section2Title}
                  </h4>
                  <p className="text-sm leading-relaxed">
                    {t.legal.section2Text}
                  </p>
                </div>

                {/* Section 3 */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-purple-500" />
                    {t.legal.section3Title}
                  </h4>
                  <p className="text-sm leading-relaxed">
                    {t.legal.section3Text}
                  </p>
                </div>

                {/* Section 4 */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-purple-500" />
                    {t.legal.section4Title}
                  </h4>
                  <p className="text-sm leading-relaxed mb-3">
                    {t.legal.section4Text}
                  </p>
                  <p className="text-sm leading-relaxed">
                    <strong>{t.legal.providers}:</strong> Payhip, Hotmart, Brevo, ManyChat, Tidio, Netlify y Porkbun.
                  </p>
                </div>

                {/* Section 5 */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-purple-500" />
                    {t.legal.section5Title}
                  </h4>
                  <p className="text-sm leading-relaxed">
                    {t.legal.section5Text} <a href="mailto:noa@drevaia.com" className="text-purple-600 dark:text-purple-400 hover:underline">noa@drevaia.com</a>
                  </p>
                </div>

                {/* Section 6 */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-purple-500" />
                    {t.legal.section6Title}
                  </h4>
                  <p className="text-sm leading-relaxed">
                    {t.legal.section6Text}
                  </p>
                </div>

                {/* Section 7 */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-purple-500" />
                    {t.legal.section7Title}
                  </h4>
                  <p className="text-sm leading-relaxed">
                    {t.legal.section7Text}
                  </p>
                </div>

                {/* Section 8 */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-purple-500" />
                    {t.legal.section8Title}
                  </h4>
                  <p className="text-sm leading-relaxed">
                    {t.legal.section8Text}
                  </p>
                </div>

                {/* Section 9 */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-purple-500" />
                    {t.legal.section9Title}
                  </h4>
                  <p className="text-sm leading-relaxed">
                    {t.legal.section9Text}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cookie Policy */}
          <div
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {t.legal.cookieTitle}
                </h3>
              </div>

              <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed space-y-4">
                <p>{t.legal.cookieText1}</p>
                <p>{t.legal.cookieText2}</p>
                <p>{t.legal.cookieText3}</p>
              </div>
            </div>
          </div>

          {/* Refund Policy */}
          <div
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {t.legal.refundTitle}
                </h3>
              </div>

              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t.legal.payhipTitle}</h4>
                  <p className="text-sm leading-relaxed">{t.legal.payhipText}</p>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t.legal.hotmartTitle}</h4>
                  <p className="text-sm leading-relaxed">{t.legal.hotmartText}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div
            className={`bg-gradient-to-r from-purple-600 to-amber-500 rounded-2xl shadow-lg p-6 md:p-8 text-center transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-white" />
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {t.legal.contactTitle}
              </h3>
            </div>
            <p className="text-white/90 mb-4">
              {t.legal.contactText}
            </p>
            <a
              href="mailto:noa@drevaia.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-700 rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              <Mail className="w-5 h-5" />
              noa@drevaia.com
            </a>
            <p className="text-white/70 mt-4 text-sm">
              {t.legal.footer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
