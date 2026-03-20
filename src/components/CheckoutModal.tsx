import { useState, useEffect } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { X, Lock, CreditCard, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getStripe } from '@/lib/stripe';
import { checkoutService } from '@/services/checkout';
import type { CheckoutItem } from '@/lib/stripe';
import type { Language } from '@/i18n';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CheckoutItem[];
  language: Language;
}

// Formulario de pago interno
function CheckoutForm({ onSuccess, onClose, language }: { 
  items: CheckoutItem[];
  onSuccess: () => void;
  onClose: () => void;
  language: Language;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const labels = {
    pay: language === 'es' ? 'Pagar' : language === 'en' ? 'Pay' : language === 'fr' ? 'Payer' : 'Pagar',
    processing: language === 'es' ? 'Procesando...' : language === 'en' ? 'Processing...' : language === 'fr' ? 'Traitement...' : 'Processando...',
    secure: language === 'es' ? 'Pago seguro con Stripe' : language === 'en' ? 'Secure payment with Stripe' : language === 'fr' ? 'Paiement sécurisé avec Stripe' : 'Pagamento seguro com Stripe',
    error: language === 'es' ? 'Error al procesar el pago' : language === 'en' ? 'Error processing payment' : language === 'fr' ? 'Erreur lors du traitement du paiement' : 'Erro ao processar pagamento',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message || labels.error);
    } else {
      onSuccess();
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement 
        options={{
          layout: 'tabs',
          defaultValues: {
            billingDetails: {
              name: '',
            },
          },
        }}
      />
      
      {errorMessage && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {errorMessage}
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Lock className="w-3 h-3" />
        {labels.secure}
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="flex-1"
          disabled={isLoading}
        >
          {language === 'es' ? 'Cancelar' : language === 'en' ? 'Cancel' : language === 'fr' ? 'Annuler' : 'Cancelar'}
        </Button>
        <Button
          type="submit"
          disabled={!stripe || isLoading}
          className="flex-1 bg-gradient-to-r from-purple-600 to-amber-500"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {labels.processing}
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              {labels.pay}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

// Modal principal
export function CheckoutModal({ isOpen, onClose, items, language }: CheckoutModalProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [stripePromise] = useState(() => getStripe());

  const labels = {
    title: language === 'es' ? 'Finalizar compra' : language === 'en' ? 'Complete purchase' : language === 'fr' ? 'Finaliser l\'achat' : 'Finalizar compra',
    total: language === 'es' ? 'Total' : language === 'en' ? 'Total' : language === 'fr' ? 'Total' : 'Total',
    success: language === 'es' ? '¡Pago exitoso!' : language === 'en' ? 'Payment successful!' : language === 'fr' ? 'Paiement réussi!' : 'Pagamento bem-sucedido!',
    successDesc: language === 'es' ? 'Recibirás un email con los detalles de tu compra.' : language === 'en' ? 'You will receive an email with your purchase details.' : language === 'fr' ? 'Vous recevrez un email avec les détails de votre achat.' : 'Você receberá um email com os detalhes da sua compra.',
    close: language === 'es' ? 'Cerrar' : language === 'en' ? 'Close' : language === 'fr' ? 'Fermer' : 'Fechar',
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    if (isOpen && items.length > 0) {
      setIsLoading(true);
      checkoutService.createPaymentIntent(items).then((intent) => {
        if (intent) {
          setClientSecret(intent.clientSecret);
        }
        setIsLoading(false);
      });
    }
  }, [isOpen, items]);

  useEffect(() => {
    if (!isOpen) {
      setClientSecret(null);
      setIsSuccess(false);
      setIsLoading(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const options = {
    clientSecret: clientSecret || '',
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#7c3aed',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#ef4444',
        fontFamily: 'system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={!isSuccess ? onClose : undefined}
      />
      
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {isSuccess ? labels.success : labels.title}
          </h2>
          {!isSuccess && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {labels.successDesc}
              </p>
              <Button onClick={onClose} className="w-full">
                {labels.close}
              </Button>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-16 bg-gradient-to-br from-purple-100 to-amber-100 rounded flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-purple-400" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.currency.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between py-4 border-t border-gray-200 dark:border-gray-700 mb-6">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {labels.total}
                </span>
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Stripe Form */}
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                </div>
              ) : clientSecret ? (
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm 
                    items={items} 
                    onSuccess={() => setIsSuccess(true)}
                    onClose={onClose}
                    language={language}
                  />
                </Elements>
              ) : (
                <div className="text-center py-8 text-red-600">
                  {language === 'es' 
                    ? 'Error al inicializar el pago. Intenta de nuevo.' 
                    : 'Error initializing payment. Please try again.'}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
