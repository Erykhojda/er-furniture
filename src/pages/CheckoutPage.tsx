import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PageHero } from '../components/ui';
import { CheckoutForm } from '../components/payment/CheckoutForm';
import { useApp } from '../context/useApp';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const CheckoutPage: React.FC = () => {
    const { cart, totalAmount, shippingFee, setCurrentPage, user } = useApp();
    const [clientSecret, setClientSecret] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    // Email z zalogowanego użytkownika lub guest
    const customerEmail = user?.email || 'guest@er-furniture.pl';

    const total = totalAmount + shippingFee;

    useEffect(() => {
        const createPaymentIntent = async () => {
            if (cart.length === 0) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:3001/api/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: total,
                        cart: cart,
                        customerEmail: customerEmail
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to create payment intent');
                }

                setClientSecret(data.clientSecret);
                setLoading(false);
            } catch (err: unknown) {
                console.error('Payment Intent Error:', err);
                const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                setError(errorMessage);
                setLoading(false);
            }
        };

        createPaymentIntent();
    }, [total, cart, customerEmail]);

    if (cart.length === 0) {
        return (
            <main>
                <PageHero title="checkout" />
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <h2 className="text-3xl mb-8">Koszyk jest pusty</h2>
                        <button
                            onClick={() => setCurrentPage('products')}
                            className="px-8 py-3 bg-red-500 text-white uppercase tracking-wide hover:bg-red-600 transition-colors rounded"
                        >
                            Kontynuuj zakupy
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main>
            <PageHero title="checkout" />
            <div className="py-16 bg-white">
                {/* Centrowany kontener */}
                <div className="flex justify-center items-center min-h-[600px]">
                    <div className="w-full max-w-2xl px-4">
                        {/* Info o emailu */}
                        {user && (
                            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                                <p className="text-blue-800">
                                    📧 Potwierdzenie zostanie wysłane na: <strong>{user.email}</strong>
                                </p>
                            </div>
                        )}

                        {loading ? (
                            <div className="text-center py-20">
                                <div className="animate-spin h-10 w-10 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                                <p className="text-gray-600">Ładowanie płatności...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-10">
                                <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                                    Błąd: {error}
                                </div>
                            </div>
                        ) : clientSecret ? (
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <CheckoutForm customerEmail={customerEmail} />
                            </Elements>
                        ) : null}
                    </div>
                </div>
            </div>
        </main>
    );
};