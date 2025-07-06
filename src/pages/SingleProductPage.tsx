import React from 'react';
import { useApp } from '../context/useApp';
import { PageHero, Loading, Stars } from '../components/ui';
import { ProductImages, AddToCart } from '../components/product';
import { formatPrice } from '../utils';

export const SingleProductPage: React.FC = () => {
    const { selectedProduct, setCurrentPage } = useApp();

    if (!selectedProduct) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <Loading />
            </main>
        );
    }

    const {
        name,
        price,
        description,
        stock,
        stars,
        reviews,
        images,
        category,
        material,
        availableSizes,
        availableMaterials,
        availableUpholstery,
        canExtend,
        // Stare parametry (dla kompatybilności)
        tapicerka,
        poduszki,
        szuflady,
        drzwi
    } = selectedProduct;

    // Funkcja do renderowania dostępnych opcji
    const renderAvailableOptions = () => {
        return (
            <div className="space-y-3">
                {/* Dostępne rozmiary */}
                {availableSizes && availableSizes.length > 0 && (
                    <p className="grid grid-cols-[125px_1fr] gap-4">
                        <span className="font-semibold">Dostępne rozmiary:</span>
                        <span>{availableSizes.join(', ')} cm</span>
                    </p>
                )}

                {/* Dostępne materiały */}
                {availableMaterials && availableMaterials.length > 0 && (
                    <p className="grid grid-cols-[125px_1fr] gap-4">
                        <span className="font-semibold">Dostępne materiały:</span>
                        <span className="capitalize">{availableMaterials.join(', ')}</span>
                    </p>
                )}

                {/* Dostępne tapicerki */}
                {availableUpholstery && availableUpholstery.length > 0 && (
                    <p className="grid grid-cols-[125px_1fr] gap-4">
                        <span className="font-semibold">Dostępne tapicerki:</span>
                        <span>{availableUpholstery.join(', ')}</span>
                    </p>
                )}

                {/* Opcja rozkładania */}
                {canExtend !== undefined && (
                    <p className="grid grid-cols-[125px_1fr] gap-4">
                        <span className="font-semibold">Rozkładanie:</span>
                        <span>{canExtend ? 'Dostępne' : 'Niedostępne'}</span>
                    </p>
                )}
            </div>
        );
    };

    // Funkcja do renderowania dodatkowych parametrów (stare dane)
    const renderLegacyParams = () => {
        const params = [];

        // Podstawowy materiał (jeśli nie ma availableMaterials)
        if (material && (!availableMaterials || availableMaterials.length === 0)) {
            params.push(
                <p key="material" className="grid grid-cols-[125px_1fr] gap-4">
                    <span className="font-semibold">Materiał:</span>
                    <span className="capitalize">{material}</span>
                </p>
            );
        }

        // Parametry specyficzne dla kategorii
        switch (category) {
            case 'krzesła':
            case 'łóżka':
                if (tapicerka && (!availableUpholstery || availableUpholstery.length === 0)) {
                    params.push(
                        <p key="tapicerka" className="grid grid-cols-[125px_1fr] gap-4">
                            <span className="font-semibold">Tapicerka:</span>
                            <span>{tapicerka}</span>
                        </p>
                    );
                }
                if (poduszki) {
                    params.push(
                        <p key="poduszki" className="grid grid-cols-[125px_1fr] gap-4">
                            <span className="font-semibold">Poduszki:</span>
                            <span className="capitalize">{poduszki}</span>
                        </p>
                    );
                }
                break;

            case 'komody':
                if (szuflady) {
                    params.push(
                        <p key="szuflady" className="grid grid-cols-[125px_1fr] gap-4">
                            <span className="font-semibold">Liczba szuflad:</span>
                            <span>{szuflady}</span>
                        </p>
                    );
                }
                break;

            case 'szafy':
                if (drzwi) {
                    params.push(
                        <p key="drzwi" className="grid grid-cols-[125px_1fr] gap-4">
                            <span className="font-semibold">Typ drzwi:</span>
                            <span>{drzwi}</span>
                        </p>
                    );
                }
                break;
        }

        return params;
    };

    return (
        <main className="min-h-screen flex flex-col">
            <PageHero title={name} product />
            <div className="py-16 bg-white flex-1">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 mb-8">
                        <ProductImages images={images} name={name} />

                        <div className="space-y-6">
                            <h2 className="text-4xl font-light text-gray-800">{name}</h2>
                            <Stars stars={stars} reviews={reviews} />
                            <h5 className="text-2xl text-red-500">{formatPrice(price)}</h5>
                            <p className="text-gray-600 leading-relaxed max-w-lg">{description}</p>

                            <div className="space-y-3 text-gray-700">
                                <p className="grid grid-cols-[125px_1fr] gap-4">
                                    <span className="font-semibold">Dostępność:</span>
                                    <span>{stock > 0 ? "Na stanie" : "Brak w magazynie"}</span>
                                </p>

                                <p className="grid grid-cols-[125px_1fr] gap-4">
                                    <span className="font-semibold">Kategoria:</span>
                                    <span className="capitalize">{category}</span>
                                </p>

                                {/* <p className="grid grid-cols-[125px_1fr] gap-4">
                                    <span className="font-semibold">SKU:</span>
                                    <span>{selectedProduct.id}</span>
                                </p> */}

                                {renderAvailableOptions()}

                                {renderLegacyParams()}
                            </div>

                            <hr />

                            {stock > 0 && <AddToCart product={selectedProduct} />}
                        </div>
                    </div>

                    <button
                        onClick={() => setCurrentPage('products')}
                        className="px-6 py-3 bg-red-500 text-white uppercase tracking-wide hover:bg-red-600 transition-colors rounded"
                    >
                        Powrót do produktów
                    </button>
                </div>
            </div>
        </main>
    );
};