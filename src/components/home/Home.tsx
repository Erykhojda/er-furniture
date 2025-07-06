import React from 'react';
import { useApp } from '../../context/useApp';

export const Home: React.FC = () => {
    const { setCurrentPage } = useApp();

    return (
        <>
            <style>
                {`
                @keyframes slideInLeft {
                    from {
                        transform: translateX(-100px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes slideInRight {
                    from {
                        transform: translateX(100px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(5deg);
                    }
                }

                @keyframes float-delayed {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-15px) rotate(-3deg);
                    }
                }

                @keyframes spin-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                .animate-slideInLeft {
                    animation: slideInLeft 1s ease-out forwards;
                }

                .animate-slideInRight {
                    animation: slideInRight 1s ease-out 0.3s forwards;
                    opacity: 0;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-float-delayed {
                    animation: float-delayed 8s ease-in-out infinite 2s;
                }

                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }

                .delay-300 {
                    animation-delay: 0.3s;
                }
                `}
            </style>

            <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-red-50 to-red-100 relative overflow-hidden">
                {/* Animowane kółka w tle */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-red-300 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-48 h-48 bg-red-200 rounded-full animate-bounce"></div>
                    <div className="absolute top-1/2 right-20 w-20 h-20 bg-red-400 rounded-full animate-ping"></div>
                    <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-red-300 rounded-full animate-pulse delay-300"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 animate-slideInLeft">
                        <h1 className="text-5xl lg:text-7xl font-light text-gray-800 leading-tight">
                            Twój dom, Twoje zasady. <br />
                            <span className="font-medium text-red-500 animate-pulse">
                                Zaprojektuj swoją unikalność.
                            </span>
                        </h1>
                        <button
                            onClick={() => setCurrentPage('products')}
                            className="px-8 py-3 bg-red-500 text-white font-medium uppercase tracking-wide hover:bg-red-600 transition-all duration-300 hover:scale-105 hover:shadow-xl rounded shadow-lg transform hover:-translate-y-1"
                        >
                            Zamów teraz
                        </button>
                    </div>

                    <div className="relative animate-slideInRight">
                        <img
                            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=700&fit=crop&crop=center"
                            alt="Comfortable furniture"
                            className="w-full h-96 lg:h-[550px] object-cover rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500 hover:rotate-1"
                        />
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-red-300 opacity-60 rounded-lg animate-float"></div>
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-200 opacity-40 rounded-lg animate-float-delayed"></div>
                        <div className="absolute top-1/2 -left-6 w-12 h-12 bg-red-400 opacity-50 rounded-lg animate-spin-slow"></div>
                        <div className="absolute bottom-1/3 -right-6 w-20 h-20 bg-red-300 opacity-30 rounded-lg animate-pulse"></div>
                    </div>
                </div>
            </section>
        </>
    );
};