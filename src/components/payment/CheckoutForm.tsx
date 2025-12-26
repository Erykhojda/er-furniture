import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useApp } from '../../context/useApp';
import { formatPrice } from '../../utils';

interface CheckoutFormProps {
    customerEmail: string;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ customerEmail }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { totalAmount, shippingFee, cart, clearCart, setCurrentPage } = useApp();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const total = totalAmount + shippingFee;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setErrorMessage(null);

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/success`,
                },
                redirect: 'if_required',
            });

            if (error) {
                setErrorMessage(error.message || 'Płatność nie powiodła się');
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                console.log('✅ Płatność udana!');

                try {
                    await fetch('http://localhost:3001/api/order-confirmation', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            paymentIntentId: paymentIntent.id,
                            cart: cart,
                            customerEmail: customerEmail
                        })
                    });
                    console.log('✅ Potwierdzenie wysłane');
                } catch (confirmError) {
                    console.error('⚠️ Błąd potwierdzenia:', confirmError);
                }

                clearCart();
                setCurrentPage('success');
            }
        } catch (error) {
            console.error('Payment error:', error);
            setErrorMessage('Wystąpił błąd podczas przetwarzania płatności');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Szczegóły płatności</h2>

            {/* Order Summary - Centrowane */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8 mx-auto max-w-lg">
                <h3 className="text-xl font-medium mb-4 text-center">Podsumowanie zamówienia</h3>
                <div className="space-y-2">
                    {cart.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="flex justify-between text-sm">
                            <span className="text-gray-700">{item.name} x {item.amount}</span>
                            <span className="font-medium">{formatPrice(item.price * item.amount)}</span>
                        </div>
                    ))}
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <span className="text-gray-700">Suma częściowa:</span>
                        <span className="font-medium">{formatPrice(totalAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-700">Dostawa:</span>
                        <span className="font-medium">{formatPrice(shippingFee)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold mt-2 pt-2 border-t-2 border-gray-300">
                        <span>Razem:</span>
                        <span className="text-red-600">{formatPrice(total)}</span>
                    </div>
                </div>
            </div>

            {/* Payment Form - Centrowane */}
            <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
                <div className="mb-6">
                    <PaymentElement
                        options={{
                            layout: {
                                type: 'tabs',
                                defaultCollapsed: false,
                            },
                        }}
                    />
                </div>

                {errorMessage && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
                        {errorMessage}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className="w-full py-4 bg-red-500 text-white font-bold text-lg uppercase tracking-wide hover:bg-red-600 transition-colors rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
                >
                    {isProcessing ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Przetwarzanie...
                        </span>
                    ) : (
                        `Zapłać ${formatPrice(total)}`
                    )}
                </button>
            </form>
        </div>
    );
};