import React from 'react';
import { PageHero } from '../components/ui';
import AboutImage from '../assets/About_Image.jpeg';

export const AboutPage: React.FC = () => (
    <main className="min-h-screen">
        <PageHero title="O nas" />
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <img
                        src={AboutImage}
                        alt="Our workshop"
                        className="w-full h-96 object-cover rounded"
                    />

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-4xl font-light text-gray-800 mb-4">Nasza Historia</h2>
                            <div className="w-24 h-1 bg-red-500 mb-6"></div>
                            <div className="text-gray-600 leading-relaxed space-y-4">
                                <p>
                                    Witajcie w wyjątkowym świecie, gdzie każdy kawałek drewna ma swoją własną historię do opowiedzenia. Jesteśmy dumni z tego, że nasze meble są nie tylko funkcjonalne, ale także niosą ze sobą esencję natury. W naszej firmie obcowanie z drzewem to nie tylko praca, to pasja i szacunek dla piękna, które natura nam oferuje.
                                </p>

                                <p>
                                    Staramy się utrzymywać równowagę między funkcjonalnością a estetyką, by mogli Państwo cieszyć się nie tylko praktycznymi rozwiązaniami, ale także naturalnym pięknem. Każdy mebel, który opuszcza naszą pracownię, niesie ze sobą ducha natury, inspirując do stworzenia przytulnych przestrzeni, gdzie czujemy się jednością z otaczającym nas światem.
                                </p>

                                <p>
                                    Nasze meble są projektowane z myślą o zaspokajaniu zarówno praktycznych, jak i estetycznych potrzeb. Zwracamy uwagę na proporcje, kolory, materiały i detale, aby tworzyć meble, które nie tylko doskonale spełniają swoje zadanie, ale także przyciągają wzrok i inspirują do kreowania wyjątkowych aranżacji wnętrz.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Social Media Section */}
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center">
                    <h3 className="text-2xl font-light text-gray-800 mb-6">Śledź nas w mediach społecznościowych</h3>
                    <p className="text-gray-600 mb-8">
                        Bądź na bieżąco z naszymi najnowszymi projektami i inspiracjami
                    </p>

                    <div className="flex justify-center space-x-6">
                        {/* Facebook */}
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                            aria-label="Facebook"
                        >
                            <svg
                                className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                            aria-label="Instagram"
                        >
                            <svg
                                className="w-8 h-8 text-pink-600 group-hover:text-pink-700 transition-colors"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>

                        {/* YouTube (opcjonalnie) */}
                        <a
                            href="https://www.youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                            aria-label="YouTube"
                        >
                            <svg
                                className="w-8 h-8 text-red-600 group-hover:text-red-700 transition-colors"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>

                        {/* LinkedIn (opcjonalnie) */}
                        <a
                            href="https://www.linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                            aria-label="LinkedIn"
                        >
                            <svg
                                className="w-8 h-8 text-blue-700 group-hover:text-blue-800 transition-colors"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </div>

                    {/* Social Media Text Links */}
                    <div className="mt-8 flex justify-center space-x-8 text-sm">
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                        >
                            Facebook
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-pink-600 transition-colors font-medium"
                        >
                            Instagram
                        </a>
                        <a
                            href="https://www.youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-red-600 transition-colors font-medium"
                        >
                            YouTube
                        </a>
                        <a
                            href="https://www.linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-blue-700 transition-colors font-medium"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>
);