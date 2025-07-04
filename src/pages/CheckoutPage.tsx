import React, { useState } from 'react';
import { useApp } from '../context/useApp';
import { PageHero } from '../components/ui';
import { formatPrice } from '../utils';

export const CheckoutPage: React.FC = () => {
    const { user, cart, totalAmount, shippingFee, clearCart, setCurrentPage } = useApp();
    const [orderProcessing, setOrderProcessing] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    if (!user) {
        setCurrentPage('login');
        return null;
    }

    if (cart.length === 0) {
        setCurrentPage('cart');
        return null;
    }

    const handlePlaceOrder = async () => {
        setOrderProcessing(true);

        // Simulate order processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        setOrderPlaced(true);
        clearCart();
        setOrderProcessing(false);

        // Redirect to home after 3 seconds
        setTimeout(() => {
            setCurrentPage('home');
        }, 3000);
    };

    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Order Placed Successfully!</h2>
                    <p className="text-gray-600">Thank you for your purchase. You will be redirected shortly.</p>
                </div>
            </div>
        );
    }

    return (
        <main>
            <PageHero title="checkout" />
            <div className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Order Summary */}
                        <div>
                            <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-medium">{item.name}</h4>
                                            <p className="text-sm text-gray-600">
                                                Quantity: {item.amount} × {formatPrice(item.price)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">{formatPrice(item.price * item.amount)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 mt-6 space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>{formatPrice(totalAmount)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping:</span>
                                    <span>{formatPrice(shippingFee)}</span>
                                </div>
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total:</span>
                                    <span>{formatPrice(totalAmount + shippingFee)}</span>
                                </div>
                            </div>
                        </div>

                        {/* User Info & Place Order */}
                        <div>
                            <h3 className="text-xl font-semibold mb-6">Billing Information</h3>
                            <div className="bg-gray-50 p-6 rounded-lg mb-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    {user.photoURL && (
                                        <img
                                            src={user.photoURL}
                                            alt={user.name}
                                            className="w-12 h-12 rounded-full"
                                        />
                                    )}
                                    <div>
                                        <h4 className="font-medium">{user.name}</h4>
                                        <p className="text-sm text-gray-600">{user.email}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Your order will be processed using the information associated with your account.
                                </p>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={orderProcessing}
                                className="w-full bg-red-500 text-white py-3 px-6 rounded-md font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                            >
                                {orderProcessing ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing Order...
                                    </span>
                                ) : (
                                    'Place Order'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};