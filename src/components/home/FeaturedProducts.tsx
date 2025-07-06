import React from 'react';
import { useApp } from '../../context/useApp';
import { Product } from '../product/Product';
import { Loading } from '../ui/Loading';

export const FeaturedProducts: React.FC = () => {
    const { featured, productsLoading, productsError, loadProducts } = useApp();

    if (productsLoading) {
        return (
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-light text-gray-800 mb-4">Poznaj nasze produkty</h2>
                        <div className="w-24 h-1 bg-red-500 mx-auto"></div>
                    </div>
                    <Loading />
                </div>
            </section>
        );
    }

    if (productsError) {
        return (
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-light text-gray-800 mb-4">Poznaj nasze produkty</h2>
                        <div className="w-24 h-1 bg-red-500 mx-auto"></div>
                    </div>
                    <div className="text-center py-20">
                        <div className="text-red-600 mb-4">
                            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-lg font-semibold">Nie udało się załadować polecanych produktów</p>
                            <p className="text-sm text-gray-600 mt-2">{productsError}</p>
                        </div>
                        <button
                            onClick={loadProducts}
                            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        >
                            Spróbuj ponownie
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (featured.length === 0) {
        return (
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-light text-gray-800 mb-4">Poznaj nasze produkty</h2>
                        <div className="w-24 h-1 bg-red-500 mx-auto"></div>
                    </div>
                    <div className="text-center py-20">
                        <p className="text-gray-600 text-lg">Brak polecanych produktów w tej chwili.</p>
                        <p className="text-gray-500 text-sm mt-2">Spróbuj ponownie później lub przeglądaj cały katalog.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-light text-gray-800 mb-4">Poznaj nasze produkty</h2>
                    <div className="w-24 h-1 bg-red-500 mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featured.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};
