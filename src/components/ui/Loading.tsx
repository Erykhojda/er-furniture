import React from 'react';
import { useApp } from '../../context/useApp';

export const Loading: React.FC = () => {
    const { productsLoading, authLoading } = useApp();

    if (authLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Weryfikacja...</p>
                </div>
            </div>
        );
    }

    if (productsLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Ładowanie produktów...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center py-20">
            <div className="w-24 h-24 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
        </div>
    );
};