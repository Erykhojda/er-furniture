import React from 'react';
import { useApp } from '../../context/useApp';
import { formatPrice } from '../../utils';
import type { Product as ProductType } from '../../types';

interface ListViewProps {
    products: ProductType[];
}

export const ListView: React.FC<ListViewProps> = ({ products }) => {
    const { setCurrentPage, setSelectedProduct } = useApp();

    return (
        <div className="space-y-8">
            {products.map((product) => (
                <div key={product.id} className="grid md:grid-cols-[300px_1fr] gap-8 items-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded"
                    />

                    <div className="space-y-4">
                        <h4 className="text-xl font-medium">{product.name}</h4>
                        <h5 className="text-lg text-red-500">{formatPrice(product.price)}</h5>
                        <p className="text-gray-600 max-w-md">{product.description.substring(0, 150)}...</p>
                        <button
                            onClick={() => {
                                setSelectedProduct(product);
                                setCurrentPage('single-product');
                            }}
                            className="px-4 py-2 bg-red-500 text-white text-sm uppercase tracking-wide hover:bg-red-600 transition-colors rounded"
                        >
                            Więcej
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};