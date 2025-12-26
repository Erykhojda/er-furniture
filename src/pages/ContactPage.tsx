import React, { useState } from 'react';
import { PageHero } from '../components/ui';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');
        setSubmitSuccess(false);

        console.log('🔵 Wysyłanie formularza...', formData);

        try {
            const response = await fetch('http://localhost:3001/api/send-contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            console.log('🔵 Response status:', response.status);

            const data = await response.json();
            console.log('🔵 Response data:', data);

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send email');
            }

            setSubmitSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });

            setTimeout(() => setSubmitSuccess(false), 5000);
        } catch (error: unknown) {
            console.error('❌ Contact form error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Wystąpił błąd. Spróbuj ponownie.';
            setSubmitError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen">
            <PageHero title="kontakt" />

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-light text-gray-800 mb-4">Skontaktuj się z nami</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Masz pytania dotyczące naszych mebli? Chcesz zamówić projekt na wymiar?
                            Skontaktuj się z nami - chętnie pomożemy!
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Informacje kontaktowe */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Informacje kontaktowe</h3>

                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                            <MapPin className="w-6 h-6 text-red-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-1">Adres</h4>
                                            <p className="text-gray-600">
                                                ul. Stolarska 15<br />
                                                31-043 Kraków<br />
                                                Polska
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                            <Phone className="w-6 h-6 text-red-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-1">Telefon</h4>
                                            <p className="text-gray-600">
                                                <a href="tel:+48123456789" className="hover:text-red-600 transition-colors">
                                                    +48 123 456 789
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                            <Mail className="w-6 h-6 text-red-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                                            <p className="text-gray-600">
                                                <a href="mailto:erfurniturekontakt@gmail.com" className="hover:text-red-600 transition-colors">
                                                    erfurniturekontakt@gmail.com
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-red-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-1">Godziny otwarcia</h4>
                                            <div className="text-gray-600 space-y-1">
                                                <p>Poniedziałek - Piątek: 8:00 - 17:00</p>
                                                <p>Sobota: 9:00 - 14:00</p>
                                                <p>Niedziela: Zamknięte</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mapa (placeholder) */}
                            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                                <div className="text-center text-gray-500">
                                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                                    <p>Mapa lokalizacji</p>
                                    <p className="text-sm">ul. Stolarska 15, Kraków</p>
                                </div>
                            </div>
                        </div>

                        {/* Formularz kontaktowy */}
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Napisz do nas</h3>

                            {submitSuccess && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-green-800">
                                        ✅ Dziękujemy za wiadomość! Odpowiemy w ciągu 24 godzin.
                                    </p>
                                </div>
                            )}

                            {submitError && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-800">
                                        ❌ {submitError}
                                    </p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Imię i nazwisko *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            placeholder="Jan Kowalski"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            placeholder="jan.kowalski@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Temat *
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    >
                                        <option value="">Wybierz temat</option>
                                        <option value="projekt-na-wymiar">Projekt na wymiar</option>
                                        <option value="wycena">Wycena</option>
                                        <option value="dostawa">Dostawa i montaż</option>
                                        <option value="gwarancja">Gwarancja i serwis</option>
                                        <option value="inne">Inne pytanie</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Wiadomość *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                                        placeholder="Opisz swoje zapytanie..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Wysyłanie...
                                        </span>
                                    ) : (
                                        'Wyślij wiadomość'
                                    )}
                                </button>

                                <p className="text-sm text-gray-500 text-center">
                                    * Pola wymagane. Odpowiemy w ciągu 24 godzin.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};