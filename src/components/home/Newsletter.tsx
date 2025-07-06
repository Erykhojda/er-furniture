import React, { useState } from 'react';
import { subscribeToNewsletter } from '../../firebase/newsletter';

export const Newsletter: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            setMessage('Proszę wprowadzić adres email');
            setStatus('ERROR');
            setTimeout(() => setStatus(''), 3000);
            return;
        }

        setIsSubmitting(true);
        setStatus('');
        setMessage('');

        try {
            const result = await subscribeToNewsletter(email, 'pl');

            if (result.success) {
                setStatus('SUCCESS');
                setMessage(result.message);
                setEmail('');
            } else {
                setStatus('ERROR');
                setMessage(result.message);
            }
        } catch {
            setStatus('ERROR');
            setMessage('Wystąpił błąd podczas zapisywania. Spróbuj ponownie.');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => {
                setStatus('');
                setMessage('');
            }, 5000);
        }
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
                        <form onSubmit={handleSubmit} className="flex max-w-md w-full"> {/* Added w-full for better responsiveness */}
                            <input
                                type="email"
                                placeholder="Wpisz email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isSubmitting}
                                className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 transition-all duration-200"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-r-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200"
                            >
                                {isSubmitting ? 'Zapisywanie...' : 'Zapisuję się!'}
                            </button>
                        </form>

                        {status && (
                            <div className={`absolute top-full mt-2 text-sm font-medium ${status === 'SUCCESS' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};