import React from 'react';
import { useApp } from '../context/useApp';
import { PageHero, Loading } from '../components/ui';
import { Filters, Sort, ProductList } from '../components/filters';

export const ProductsPage: React.FC = () => {
    const {
        productsLoading,
        productsError,
        loadProducts,
        filters
    } = useApp();

    if (productsLoading) {
        return (
            <main>
                <PageHero title="produkty" />
                <div className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <Loading />
                    </div>
                </div>
            </main>
        );
    }

    if (productsError) {
        return (
            <main>
                <PageHero title="produkty" />
                <div className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center py-20">
                            <div className="text-red-600 mb-4">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h2 className="text-2xl font-semibold mb-2">Nie udało się załadować produktów</h2>
                                <p className="text-gray-600 mb-6">{productsError}</p>
                            </div>
                            <div className="space-y-4">
                                <button
                                    onClick={loadProducts}
                                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                >
                                    Spróbuj ponownie
                                </button>
                                <div className="text-sm text-gray-500">
                                    <p>Upewnij się, że masz:</p>
                                    <ul className="mt-2 space-y-1">
                                        <li>• Poprawnie skonfigurowane reguły Firestore</li>
                                        <li>• Prawidłową konfigurację Firebase</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main>
            <PageHero title="produkty" />
            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-[200px_1fr] gap-8">
                        <Filters />
                        <div>
                            <Sort />
                            {/* ✅ UŻYJ key z category zamiast length */}
                            <ProductList key={filters.category} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};