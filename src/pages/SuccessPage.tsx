import React, { useEffect } from 'react';
import { useApp } from '../context/useApp';

export const SuccessPage: React.FC = () => {
    const { clearCart, setCurrentPage } = useApp();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="text-center max-w-md px-4">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-4xl font-light text-gray-800 mb-4">Płatność zakończona sukcesem!</h1>
                <p className="text-gray-600 mb-4">
                    Dziękujemy za złożenie zamówienia.
                </p>
                <p className="text-gray-600 mb-8">
                    Potwierdzenie zostało wysłane na Twój adres email. Skontaktujemy się z Tobą wkrótce w sprawie szczegółów dostawy.
                </p>
                <button
                    onClick={() => setCurrentPage('home')}
                    className="px-8 py-3 bg-green-500 text-white uppercase tracking-wide hover:bg-green-600 transition-colors rounded font-semibold"
                >
                    Wróć do strony głównej
                </button>
            </div>
        </div>
    );
};