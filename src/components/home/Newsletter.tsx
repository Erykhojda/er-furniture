import React, { useState } from 'react';

export const Newsletter: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('SUCCESS');
        setEmail('');
        setTimeout(() => setStatus(''), 3000);
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-light text-gray-800 mb-4">
                        Zapisz się, by otrzymywać najnowsze informacje o rabatach i premierach.
                    </h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <p className="text-gray-600 leading-relaxed">
                        Bądź z nami na bieżąco i zdobądź 5% rabatu!
                    </p>

                    <div className="relative">
                        <div className="flex max-w-md">
                            <input
                                type="email"
                                placeholder="Wpisz email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 px-4 py-3 border-2 border-black border-r-0 rounded-l-md focus:outline-none"
                            />
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-3 bg-red-500 text-black border-2 border-black rounded-r-md hover:text-white transition-colors uppercase tracking-wide"
                            >
                                Zapisuję się!
                            </button>
                        </div>
                        {status === 'SUCCESS' && (
                            <span className="absolute top-full mt-2 text-red-600 text-sm">Thank you for subscribing!</span>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};