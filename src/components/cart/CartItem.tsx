import React from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/useApp';
import { formatPrice } from '../../utils';
import { Amount } from '../ui/Amount';
import type { CartItem as CartItemType } from '../../types';

export const CartItem: React.FC<CartItemType> = ({
    id,
    name,
    selectedColor,
    selectedSize,
    selectedMaterial,
    amount,
    image,
    price,
}) => {
    const { removeItem, toggleAmount } = useApp();

    const increase = () => toggleAmount(id, "inc");
    const decrease = () => toggleAmount(id, "dec");

    return (
        <div className="grid grid-cols-[200px_auto_auto] lg:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 lg:gap-8 items-center justify-items-center mb-12">
            <div className="grid grid-cols-[75px_125px] lg:grid-cols-[100px_200px] gap-4 items-center text-left">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover rounded"
                />
                <div>
                    <h5 className="text-sm mb-1">{name}</h5>

                    {/* Kolor */}
                    <p className="text-xs text-gray-500 flex items-center">
                        Kolor:
                        <span
                            style={{ backgroundColor: selectedColor }}
                            className="inline-block w-3 h-3 rounded-full ml-2 border border-gray-300"
                        ></span>
                    </p>

                    {/* Rozmiar */}
                    {selectedSize && (
                        <p className="text-xs text-gray-500">
                            Rozmiar: <span className="font-medium">{selectedSize}</span>
                        </p>
                    )}

                    {/* Materiał */}
                    {selectedMaterial && (
                        <p className="text-xs text-gray-500">
                            Materiał: <span className="font-medium">{selectedMaterial}</span>
                        </p>
                    )}

                    <h5 className="text-sm text-red-500 lg:hidden mt-1">{formatPrice(price)}</h5>
                </div>
            </div>

            <h5 className="hidden lg:block text-red-500">{formatPrice(price)}</h5>

            <div className="w-20">
                <Amount amount={amount} increase={increase} decrease={decrease} />
            </div>

            <h5 className="hidden lg:block text-red-500 font-bold">{formatPrice(price * amount)}</h5>

            <button
                onClick={() => removeItem(id)}
                className="w-6 h-6 bg-red-600 text-white rounded flex items-center justify-center hover:bg-red-700 transition-colors"
                aria-label="Usuń produkt"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};