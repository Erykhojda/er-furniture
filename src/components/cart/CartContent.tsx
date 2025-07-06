import React from 'react';
import { useApp } from '../../context/useApp';
import { CartColumns } from './CartColumns';
import { CartItem } from './CartItem';
import { CartTotal } from './CartTotal';

export const CartContent: React.FC = () => {
    const { cart, clearCart, setCurrentPage } = useApp();

    return (
        <div className="max-w-7xl mx-auto px-4">
            <CartColumns />
            {cart.map((item) => (
                <CartItem key={item.id} {...item} />
            ))}
            <hr className="my-8" />

            <div className="flex justify-between mb-8">
                <button
                    onClick={() => setCurrentPage('products')}
                    className="px-4 py-2 bg-red-500 text-white uppercase tracking-wide hover:bg-red-600 transition-colors rounded"
                >
                    Dodaj więcej produktów
                </button>
                <button
                    onClick={clearCart}
                    className="px-4 py-2 bg-black text-white uppercase tracking-wide hover:bg-gray-800 transition-colors rounded"
                >
                    Wyczyść koszyk
                </button>
            </div>

            <CartTotal />
        </div>
    );
};