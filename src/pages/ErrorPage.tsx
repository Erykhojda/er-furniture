import React from 'react';

export const ErrorPage: React.FC = () => (
    <main className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="text-center">
            <h1 className="text-9xl font-light text-gray-300">404</h1>
            <h3 className="text-2xl mb-8">Sorry, the page you tried cannot be found</h3>
            <button
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-red-500 text-white uppercase tracking-wide hover:bg-red-600 transition-colors rounded"
            >
                Back home
            </button>
        </div>
    </main>
);