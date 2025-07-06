import React, { useState, useEffect } from 'react';
import { runSolidWoodFurnitureSetup, wasSolidWoodFurnitureInitialized } from '../utils/initializeSolidWoodFurniture';
import { useApp } from '../context/useApp';

export const OneTimeSetup: React.FC = () => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { loadProducts, products } = useApp();

    useEffect(() => {
        setIsInitialized(wasSolidWoodFurnitureInitialized());
    }, []);

    const handleInitialize = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await runSolidWoodFurnitureSetup();
            setSuccess(true);
            setIsInitialized(true);

            setTimeout(() => {
                loadProducts();
            }, 1000);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Wystąpił nieznany błąd');
        } finally {
            setLoading(false);
        }
    };

    // Nie pokazuj jeśli produkty już istnieją
    if (products.length > 0) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                <div className="text-center">
                    <div className="text-6xl mb-4">🌳</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Inicjalizacja Sklepu Mebli
                    </h2>

                    {success ? (
                        <div className="text-green-600">
                            <div className="text-4xl mb-4">✅</div>
                            <p className="text-lg font-semibold mb-2">Sukces!</p>
                            <p className="text-gray-600 mb-4">
                                Dodano 8 ekskluzywnych mebli z drewna litego do sklepu.
                            </p>
                            <p className="text-sm text-gray-500">
                                Strona zostanie odświeżona automatycznie...
                            </p>
                        </div>
                    ) : (
                        <div>
                            <p className="text-gray-600 mb-6">
                                Aby rozpocząć, dodaj przykładowe produkty do sklepu.
                                Będą to wysokiej jakości meble z drewna litego.
                            </p>

                            <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                                <h3 className="font-semibold text-gray-800 mb-2">Co zostanie dodane:</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Dębowy Stół Jadalny</li>
                                    <li>• Sosnowa Komoda Rustykalna</li>
                                    <li>• Bukowe Krzesło Składane</li>
                                    <li>• Wiśniowa Biblioteczka</li>
                                    <li>• Jesionowe Biurko Sekretarzyk</li>
                                    <li>• Orzechowa Ława Owalana</li>
                                    <li>• Lipowa Szafka Pod TV</li>
                                    <li>• Akacjowa Ławka Ogrodowa</li>
                                </ul>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                                    <strong>Błąd:</strong> {error}
                                </div>
                            )}

                            {isInitialized && (
                                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded mb-4">
                                    <strong>Uwaga:</strong> Skrypt już był uruchomiony wcześniej.
                                </div>
                            )}

                            <div className="space-y-3">
                                <button
                                    onClick={handleInitialize}
                                    disabled={loading}
                                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Dodawanie produktów...
                                        </>
                                    ) : (
                                        <>
                                            <span className="mr-2">🚀</span>
                                            {isInitialized ? 'Uruchom ponownie' : 'Zainicjalizuj sklep'}
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-gray-500">
                                    ⚠️ Ta operacja powinna być wykonana tylko raz
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>a
        </div>
    );
};