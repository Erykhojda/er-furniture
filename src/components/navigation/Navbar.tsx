import React from 'react';
import { Menu } from 'lucide-react';
import { useApp } from '../../context/useApp';
import { NavIcons } from './NavIcons';
import logoEryk from '../../assets/logo_eryk 300x300px.png';

export const Navbar: React.FC = () => {
    const { setCurrentPage, openSidebar } = useApp();

    return (
        <nav className="h-20 flex items-center justify-center bg-gradient-to-b from-white to-red-25 shadow-sm relative">
            {/* Dodatkowy gradient po prawej stronie */}
            <div className="absolute top-0 right-0 w-4/5 h-full bg-gradient-to-l from-red-100 to-transparent opacity-50"></div>

            <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => setCurrentPage('home')}
                        className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                    >
                        <img
                            src={logoEryk}
                            alt="Er-Furniture Logo"
                            className="h-12 w-auto"
                        />
                        <span className="text-2xl font-bold text-gray-800 hover:text-red-600 transition-colors">
                            Er-Furniture
                        </span>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <button
                            onClick={() => setCurrentPage('home')}
                            className="text-gray-700 hover:text-red-500 transition-colors"
                        >
                            Strona Główna
                        </button>
                        <button
                            onClick={() => setCurrentPage('products')}
                            className="text-gray-700 hover:text-red-500 transition-colors"
                        >
                            Produkty
                        </button>
                        <button
                            onClick={() => setCurrentPage('about')}
                            className="text-gray-700 hover:text-red-500 transition-colors"
                        >
                            O Nas
                        </button>
                        <button
                            onClick={() => setCurrentPage('contact')}
                            className="text-gray-700 hover:text-red-500 transition-colors"
                        >
                            Kontakt
                        </button>
                    </div>

                    {/* Navigation Icons */}
                    <div className="flex items-center space-x-4">
                        <NavIcons />

                        {/* Mobile Menu Button */}
                        <button
                            onClick={openSidebar}
                            className="lg:hidden p-2 text-red-500 hover:text-red-600 transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};