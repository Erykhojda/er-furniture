import React from 'react';
import { useApp } from '../../context/useApp';
import { GridView } from './GridView';
import { ListView } from './ListView';

export const ProductList: React.FC = () => {
    const { filteredProducts, gridView } = useApp();

    if (filteredProducts.length < 1) {
        return (
            <div className="text-center py-20">
                <h4 className="text-xl text-red-600 mb-4">Brak produktów spełniających kryteria wyszukiwania.</h4>
            </div>
        );
    }

    return gridView ? <GridView products={filteredProducts} /> : <ListView products={filteredProducts} />;
};