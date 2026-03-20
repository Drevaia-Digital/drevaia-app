import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Download, Mail, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/sections/Navigation';
import { Footer } from '@/sections/Footer';
import { SEO } from '@/partials/SEO';
import { useCart } from '@/hooks/useCart';
import type { Translations, Language } from '@/i18n';

interface CheckoutSuccessPageProps {
  t: Translations;
  language: Language;
  changeLanguage: (lang: Language) => void;
}

export function CheckoutSuccessPage({ t, language, changeLanguage }: CheckoutSuccessPageProps) {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const paymentIntent = searchParams.get('payment_intent');

  const labels = {
    title: language === 'es' ? '¡Pago exitoso!' : language === 'en' ? 'Payment successful!' : language === 'fr' ? 'Paiement réussi!' : 'Pagamento bem-sucedo!',
    subtitle: language === 'es' ? 'Gracias por tu compra' : language === 'en' ? 'Thank you for your purchase' : language === 'fr' ? 'Merci pour votre achat' : 'Obrigado pela sua compra',
    description: language === 'es' 
      ? 'Recibirás un email con los detalles de tu compra y los enlaces de descarga.' 
      : language === 'en' 
        ? 'You will receive an email with your purchase details and download links.' 
        : language === 'fr' 
          ? 'Vous recevrez un email avec les détails de votre achat et les liens de téléchargement.' 
          : 'Você receberá um email com os detalhes da sua compra e links de download.',
    orderId: language === 'es' ? 'ID de orden' : language === 'en' ? 'Order ID' : language === 'fr' ? 'ID de commande' : 'ID do pedido',
    browseMore: language === 'es' ? 'Explorar más libros' : language === 'en' ? 'Browse more books' : language === 'fr' ? 'Explorer plus de livres' : 'Explorar mais livros',
    goHome: language === 'es' ? 'Ir al inicio' : language === 'en' ? 'Go home' : language === 'fr' ? 'Aller à l\'accueil' : 'Ir para o início',
  };

  useEffect(() => {
    // Clear cart after successful purchase
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <SEO 
        title={`${labels.title} | Drevaia Digital`}
        description={labels.description}
        language={language}
      />
      
      <Navigation t={t} language={language} changeLanguage={changeLanguage} />

      <main className="flex items-center justify-center min-h-[70vh] py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/30">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {labels.title}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            {labels.subtitle}
          </p>
          
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {labels.description}
          </p>

          {/* Order ID */}
          {paymentIntent && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">{labels.orderId}</span>
              <p className="font-mono text-sm text-gray-700 dark:text-gray-300 break-all">
                {paymentIntent}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/library">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-amber-500">
                <BookOpen className="w-5 h-5 mr-2" />
                {labels.browseMore}
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                {labels.goHome}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <Mail className="w-6 h-6 text-purple-500 mb-2" />
              <span className="text-gray-600 dark:text-gray-400">
                {language === 'es' ? 'Email de confirmación' : language === 'en' ? 'Confirmation email' : language === 'fr' ? 'Email de confirmation' : 'Email de confirmação'}
              </span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <Download className="w-6 h-6 text-purple-500 mb-2" />
              <span className="text-gray-600 dark:text-gray-400">
                {language === 'es' ? 'Descarga inmediata' : language === 'en' ? 'Instant download' : language === 'fr' ? 'Téléchargement instantané' : 'Download instantâneo'}
              </span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <CheckCircle className="w-6 h-6 text-purple-500 mb-2" />
              <span className="text-gray-600 dark:text-gray-400">
                {language === 'es' ? 'Acceso de por vida' : language === 'en' ? 'Lifetime access' : language === 'fr' ? 'Accès à vie' : 'Acesso vitalício'}
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}
