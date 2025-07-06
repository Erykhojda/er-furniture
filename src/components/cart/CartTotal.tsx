import React from 'react';
import { useApp } from '../../context/useApp';
import { formatPrice } from '../../utils';

export const CartTotal: React.FC = () => {
    const { totalAmount, shippingFee, user, setCurrentPage } = useApp();

    return (
        <div className="flex justify-center lg:justify-end mt-12">
            <div className="border border-gray-300 rounded p-8">
                <div className="space-y-2">
                    <div className="grid grid-cols-[200px_1fr] gap-4">
                        <h5>Suma produktów:</h5>
                        <span>{formatPrice(totalAmount)}</span>
                    </div>
                    <div className="grid grid-cols-[200px_1fr] gap-4">
                        <p>Koszt wysyłki:</p>
                        <span>{formatPrice(shippingFee)}</span>
                    </div>
                    <hr className="my-4" />
                    <div className="grid grid-cols-[200px_1fr] gap-4">
                        <h4>Suma zamówienia:</h4>
                        <span>{formatPrice(totalAmount + shippingFee)}</span>
                    </div>
                </div>

                {user ? (
                    <button
                        onClick={() => setCurrentPage('checkout')}
                        className="w-full mt-4 py-3 bg-red-500 text-white font-bold uppercase tracking-wide hover:bg-red-600 transition-colors rounded"
                    >
                        Przejdź do kasy
                    </button>
                ) : (
                    <button
                        onClick={() => setCurrentPage('login')}
                        className="w-full mt-4 py-3 bg-red-500 text-white font-bold uppercase tracking-wide hover:bg-red-600 transition-colors rounded"
                    >
                        Zaloguj się
                    </button>
                )}
            </div>
        </div>
    );
};