import React from 'react';
import { Search } from 'lucide-react';
import { useApp } from '../../context/useApp';
import { formatPrice } from '../../utils';
import type { Product as ProductType } from '../../types';

interface ProductProps {
    product: ProductType;
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const { setCurrentPage, setSelectedProduct } = useApp();

    const handleProductClick = () => {
        setSelectedProduct(product);
        setCurrentPage('single-product');
    };

    return (
        <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative bg-black rounded-t-lg overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:opacity-50 transition-opacity"
                />
                <button
                    onClick={handleProductClick}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                    <Search className="w-5 h-5" />
                </button>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
                    <span className="text-lg font-semibold text-red-500">{formatPrice(product.price)}</span>
                </div>
            </div>
        </div>
    );
};