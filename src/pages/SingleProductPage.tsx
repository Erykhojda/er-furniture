import React from 'react';
import { useApp } from '../context/useApp';
import { PageHero, Loading, Stars } from '../components/ui';
import { ProductImages, AddToCart } from '../components/product';
import { formatPrice } from '../utils';

export const SingleProductPage: React.FC = () => {
    const { selectedProduct, setCurrentPage } = useApp();

    if (!selectedProduct) {
        return <Loading />;
    }

    const { name, price, description, stock, stars, reviews, designer, images } = selectedProduct;

    return (
        <main>
            <PageHero title={name} product />
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 mb-8">
                        <ProductImages images={images} name={name} />

                        <div className="space-y-6">
                            <h2 className="text-4xl font-light text-gray-800">{name}</h2>
                            <Stars stars={stars} reviews={reviews} />
                            <h5 className="text-2xl text-red-500">{formatPrice(price)}</h5>
                            <p className="text-gray-600 leading-relaxed max-w-lg">{description}</p>

                            <div className="space-y-2 text-gray-700">
                                <p className="grid grid-cols-[125px_1fr] gap-4">
                                    <span className="font-semibold">Available:</span>
                                    <span>{stock > 0 ? "In stock" : "Out of stock"}</span>
                                </p>
                                <p className="grid grid-cols-[125px_1fr] gap-4">
                                    <span className="font-semibold">SKU:</span>
                                    <span>{selectedProduct.id}</span>
                                </p>
                                <p className="grid grid-cols-[125px_1fr] gap-4">
                                    <span className="font-semibold">Brand:</span>
                                    <span className="capitalize">{designer}</span>
                                </p>
                            </div>

                            <hr />

                            {stock > 0 && <AddToCart product={selectedProduct} />}
                        </div>
                    </div>

                    <button
                        onClick={() => setCurrentPage('products')}
                        className="px-6 py-3 bg-red-500 text-white uppercase tracking-wide hover:bg-red-600 transition-colors rounded"
                    >
                        Back to products
                    </button>
                </div>
            </div>
        </main>
    );
};