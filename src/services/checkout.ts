import { supabase } from '@/lib/supabase';
import type { CheckoutItem, PaymentIntent } from '@/lib/stripe';

class CheckoutService {
  async createPaymentIntent(items: CheckoutItem[]): Promise<PaymentIntent | null> {
    try {
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: { items },
      });

      if (error) throw error;
      return data as PaymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      return null;
    }
  }

  async createCheckoutSession(items: CheckoutItem[], successUrl: string, cancelUrl: string) {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { items, successUrl, cancelUrl },
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      return null;
    }
  }

  async confirmPayment(clientSecret: string, paymentMethodId: string) {
    try {
      const { data, error } = await supabase.functions.invoke('confirm-payment', {
        body: { clientSecret, paymentMethodId },
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error confirming payment:', error);
      return null;
    }
  }

  calculateTotal(items: CheckoutItem[]): number {
    return items.reduce((total, item) => total + item.price, 0);
  }

  formatAmount(amount: number, currency: string): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount);
  }
}

export const checkoutService = new CheckoutService();
export default CheckoutService;
