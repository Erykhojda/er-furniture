import React from 'react';
import type { ReactNode as ReactNodeType } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface StripeProviderProps {
    children: ReactNodeType;
    clientSecret?: string;
}

export const StripeProvider: React.FC<StripeProviderProps> = ({
    children,
    clientSecret
}) => {
    const options = clientSecret ? { clientSecret } : undefined;

    return (
        <Elements stripe={stripePromise} options={options}>
            {children}
        </Elements>
    );
};