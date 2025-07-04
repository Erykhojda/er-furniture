import React, { useState } from 'react';
import { initializeSampleProducts } from '../firebase/products';
import { useApp } from '../context/useApp';

export const FirebaseInitializer: React.FC = () => {
    const [initializing, setInitializing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { loadProducts } = useApp();

    const handleInitialize = async () => {
        setInitializing(true);
        setError(null);
        setSuccess(false);

        try {
            await initializeSampleProducts();
            setSuccess(true);

            // Reload products after initialization
            setTimeout(() => {
                loadProducts();
            }, 1000);

        } catch (err) {
            console.error('Failed to initialize products:', err);
            setError(err instanceof Error ? err.message : 'Failed to initialize products');
        } finally {
            setInitializing(false);
        }
    };

    if (success) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">
                            Products initialized successfully!
                        </h3>
                        <p className="mt-1 text-sm text-green-700">
                            Sample products have been added to your Firestore database. Products will reload automatically.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-blue-800">
                        Initialize Firebase Products
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                        <p>No products found in your Firestore database. Click the button below to add sample products.</p>
                        <p className="mt-1 font-medium">Note: This should only be done once!</p>
                    </div>
                    {error && (
                        <div className="mt-3 text-sm text-red-600">
                            <p>Error: {error}</p>
                        </div>
                    )}
                    <div className="mt-4">
                        <button
                            onClick={handleInitialize}
                            disabled={initializing}
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {initializing ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Initializing...
                                </span>
                            ) : (
                                'Initialize Sample Products'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};