import { loadStripe, type Stripe } from '@stripe/stripe-js';

// Stripe publishable key - En producción usar variable de entorno
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export interface PaymentIntent {
  clientSecret: string;
  amount: number;
  currency: string;
}

export interface CheckoutItem {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  image?: string;
}
