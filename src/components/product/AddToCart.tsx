import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useApp } from '../../context/useApp';
import { Amount } from '../ui/Amount';
import type { Product } from '../../types';

interface AddToCartProps {
    product: Product;
}

export const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
    const { addToCart, setCurrentPage } = useApp();
    const { id, stock, colors } = product;
    const [mainColor, setMainColor] = useState(colors[0]);
    const [amount, setAmount] = useState(1);

    const increase = () => {
        setAmount((oldAmount) => {
            let newAmount = oldAmount + 1;
            if (newAmount > stock) {
                newAmount = stock;
            }
            return newAmount;
        });
    };

    const decrease = () => {
        setAmount((oldAmount) => {
            let newAmount = oldAmount - 1;
            if (newAmount < 1) {
                newAmount = 1;
            }
            return newAmount;
        });
    };

    const handleAddToCart = () => {
        addToCart(id, mainColor, amount, product);
        setCurrentPage('cart');
    };

    return (
        <div className="space-y-6 mt-8">
            {/* Colors */}
            <div className="grid grid-cols-[4rem_1fr] items-center gap-4">
                <span className="font-semibold capitalize">Colors:</span>
                <div className="flex space-x-2">
                    {colors.map((color, index) => (
                        <button
                            key={index}
                            onClick={() => setMainColor(color)}
                            style={{ backgroundColor: color }}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${mainColor === color ? 'border-gray-800 opacity-100' : 'border-gray-300 opacity-80'
                                }`}
                        >
                            {mainColor === color && <Check className="w-3 h-3 text-white" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
                <Amount amount={amount} increase={increase} decrease={decrease} />
                <button
                    onClick={handleAddToCart}
                    className="px-8 py-3 bg-red-500 text-white font-medium uppercase tracking-wide hover:bg-red-600 transition-colors rounded shadow-lg"
                >
                    Add to cart
                </button>
            </div>
        </div>
    );
};