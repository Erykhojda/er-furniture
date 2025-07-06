import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useApp } from '../../context/useApp';
import { Amount } from '../ui/Amount';
import { AVAILABLE_COLORS } from '../../types';
import type { Product } from '../../types';

interface AddToCartProps {
    product: Product;
}

export const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
    const { addToCart, setCurrentPage } = useApp();
    const { id, stock, availableSizes, availableMaterials, availableUpholstery, canExtend } = product;

    const [selectedColor, setSelectedColor] = useState<string>(AVAILABLE_COLORS[0].value);
    const [selectedSize, setSelectedSize] = useState(availableSizes[0]);
    const [selectedMaterial, setSelectedMaterial] = useState(availableMaterials?.[0] || '');
    const [selectedUpholstery, setSelectedUpholstery] = useState(availableUpholstery?.[0] || '');
    const [selectedExtendable, setSelectedExtendable] = useState(false);
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
        addToCart(id, selectedColor, selectedSize, amount, product, selectedMaterial, selectedUpholstery, selectedExtendable);
        setCurrentPage('cart');
    };

    const getColorName = (colorValue: string) => {
        const colorOption = AVAILABLE_COLORS.find(c => c.value === colorValue);
        return colorOption?.name || 'Nieznany';
    };

    return (
        <div className="space-y-6 mt-8">
            <div className="grid grid-cols-[4rem_1fr] items-center gap-4">
                <span className="font-semibold">Kolor:</span>
                <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                        {AVAILABLE_COLORS.map((color, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedColor(color.value)}
                                style={{ backgroundColor: color.hex }}
                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor === color.value
                                    ? 'border-gray-800 scale-110'
                                    : 'border-gray-300 hover:border-gray-500'
                                    }`}
                                title={color.name}
                            >
                                {selectedColor === color.value && (
                                    <Check className="w-4 h-4 text-white drop-shadow-lg" />
                                )}
                            </button>
                        ))}
                    </div>
                    <p className="text-sm text-gray-600">
                        Wybrany kolor: <span className="font-medium">{getColorName(selectedColor)}</span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-[4rem_1fr] items-center gap-4">
                <span className="font-semibold">Rozmiar:</span>
                <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                        {availableSizes.map((size, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedSize(size)}
                                className={`px-3 py-2 border rounded-md text-sm font-medium transition-colors ${selectedSize === size
                                    ? 'border-red-500 bg-red-50 text-red-700'
                                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                    <p className="text-sm text-gray-600">
                        Wybrany rozmiar: <span className="font-medium">{selectedSize}</span>
                        {product.category === 'stoły' && ' cm'}
                        {product.category === 'łóżka' && ' cm'}
                        {product.category === 'biurka' && ' cm'}
                        {product.category === 'komody' && ' cm (szer×głęb×wys)'}
                        {product.category === 'szafy' && ' cm (szer×wys)'}
                    </p>
                </div>
            </div>

            {availableMaterials && availableMaterials.length > 0 && (
                <div className="grid grid-cols-[4rem_1fr] items-center gap-4">
                    <span className="font-semibold">Materiał:</span>
                    <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                            {availableMaterials.map((material, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedMaterial(material)}
                                    className={`px-3 py-2 border rounded-md text-sm font-medium transition-colors capitalize ${selectedMaterial === material
                                        ? 'border-red-500 bg-red-50 text-red-700'
                                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                        }`}
                                >
                                    {material}
                                </button>
                            ))}
                        </div>
                        <p className="text-sm text-gray-600">
                            Wybrany materiał: <span className="font-medium capitalize">{selectedMaterial}</span>
                        </p>
                    </div>
                </div>
            )}

            {availableUpholstery && availableUpholstery.length > 0 && (
                <div className="grid grid-cols-[4rem_1fr] items-center gap-4">
                    <span className="font-semibold">Tapicerka:</span>
                    <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                            {availableUpholstery.map((upholstery, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedUpholstery(upholstery)}
                                    className={`px-3 py-2 border rounded-md text-sm font-medium transition-colors ${selectedUpholstery === upholstery
                                        ? 'border-red-500 bg-red-50 text-red-700'
                                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                        }`}
                                >
                                    {upholstery}
                                </button>
                            ))}
                        </div>
                        <p className="text-sm text-gray-600">
                            Wybrana tapicerka: <span className="font-medium">{selectedUpholstery}</span>
                        </p>
                    </div>
                </div>
            )}

            {canExtend !== undefined && (
                <div className="grid grid-cols-[4rem_1fr] items-center gap-4">
                    <span className="font-semibold">Rozkładanie:</span>
                    <div className="space-y-3">
                        <div className="flex gap-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="extendable"
                                    checked={selectedExtendable === false}
                                    onChange={() => setSelectedExtendable(false)}
                                    className="text-red-500 focus:ring-red-500"
                                />
                                <span className="text-sm">Nie</span>
                            </label>
                            {canExtend && (
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="extendable"
                                        checked={selectedExtendable === true}
                                        onChange={() => setSelectedExtendable(true)}
                                        className="text-red-500 focus:ring-red-500"
                                    />
                                    <span className="text-sm">Tak</span>
                                </label>
                            )}
                        </div>
                        <p className="text-sm text-gray-600">
                            Rozkładanie: <span className="font-medium">{selectedExtendable ? 'Tak' : 'Nie'}</span>
                        </p>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                <div className="grid grid-cols-[4rem_1fr] items-center gap-4">
                    <span className="font-semibold">Ilość:</span>
                    <Amount amount={amount} increase={increase} decrease={decrease} />
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={stock === 0}
                    className="w-full px-8 py-3 bg-red-500 text-white font-medium uppercase tracking-wide hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors rounded shadow-lg"
                >
                    {stock === 0 ? 'Brak w magazynie' : 'Dodaj do koszyka'}
                </button>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Twój wybór:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Kolor: {getColorName(selectedColor)}</li>
                        <li>• Rozmiar: {selectedSize}</li>
                        {selectedMaterial && <li>• Materiał: {selectedMaterial}</li>}
                        {selectedUpholstery && <li>• Tapicerka: {selectedUpholstery}</li>}
                        {canExtend !== undefined && <li>• Rozkładanie: {selectedExtendable ? 'Tak' : 'Nie'}</li>}
                        <li>• Ilość: {amount} szt.</li>
                        <li className="font-medium text-gray-800">
                            • Łącznie: {((product.price * amount) / 100).toLocaleString('pl-PL', {
                                style: 'currency',
                                currency: 'PLN'
                            })}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};