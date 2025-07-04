import React from 'react';
import { Product } from '../product/Product';
import type { Product as ProductType } from '../../types';

interface GridViewProps {
    products: ProductType[];
}

export const GridView: React.FC<GridViewProps> = ({ products }) => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
            <Product key={product.id} product={product} />
        ))}
    </div>
);