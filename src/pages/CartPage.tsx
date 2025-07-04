import React from 'react';
import { useApp } from '../context/useApp';
import { PageHero } from '../components/ui';
import { CartContent } from '../components/cart';

export const CartPage: React.FC = () => {
    const { cart, setCurrentPage } = useApp();

    if (cart.length < 1) {
        return (
            <main>
                <PageHero title="koszyk" />
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <h2 className="text-3xl mb-8">Twoj koszyk jest Pusty</h2>
                        <button
                            onClick={() => setCurrentPage('products')}
                            className="px-8 py-3 bg-red-500 text-white uppercase tracking-wide hover:bg-red-600 transition-colors rounded"
                        >
                            Fill it
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main>
            <PageHero title="koszyk" />
            <div className="py-16 bg-white">
                <CartContent />
            </div>
        </main>
    );
};