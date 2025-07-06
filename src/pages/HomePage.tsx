import React from 'react';
import { useApp } from '../context/useApp';
import { Home, FeaturedProducts, Services, Newsletter } from '../components/home';
import { FirebaseInitializer } from '../components/FirebaseInitializer';
import { initializeSampleProducts } from '../firebase/products';

export const HomePage: React.FC = () => {
    const { products, productsError, loadProducts, user } = useApp();

    const debugInitialize = async () => {
        try {
            console.log('Rozpoczynanie inicjalizacji produktów...');
            await initializeSampleProducts();
            console.log('Produkty zostały zainicjalizowane pomyślnie!');
            await loadProducts();
            console.log('Produkty zostały ponownie załadowane!');
        } catch (error) {
            console.error('Debugowanie inicjalizacji nie powiodło się:', error);
        }
    };

    return (
        <main>
            <Home />

            {productsError && (
                <section className="py-8 bg-yellow-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="bg-white p-6 rounded-lg border border-yellow-200">
                            <h3 className="text-lg font-semibold text-yellow-800 mb-4">Panel debugowania</h3>
                            <div className="space-y-3 text-sm">
                                <div>Liczba produktów: {products.length}</div>
                                <div>Błąd: {productsError}</div>
                                <div>Użytkownik: {user ? 'Zalogowany' : 'Nie zalogowany'}</div>
                            </div>
                            <button
                                onClick={debugInitialize}
                                className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                            >
                                Debuguj inicjalizację produktów
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {products.length === 0 && productsError && (
                <section className="py-8 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <FirebaseInitializer />
                    </div>
                </section>
            )}

            <FeaturedProducts />
            <Services />
            <Newsletter />
        </main>
    );
};