import React from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/useApp';
import { NavIcons } from './NavIcons';

export const Sidebar: React.FC = () => {
    const { isSidebarOpen, closeSidebar, setCurrentPage, user } = useApp();

    if (!isSidebarOpen) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeSidebar}></div>

            <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300">
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="text-xl font-bold text-red-500">Er-Furniture</div>
                    <button
                        onClick={closeSidebar}
                        className="p-2 text-red-500 hover:text-red-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="p-4">
                    <div className="space-y-4">
                        <button
                            onClick={() => {
                                setCurrentPage('home');
                                closeSidebar();
                            }}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded capitalize"
                        >
                            Strona Główna
                        </button>
                        <button
                            onClick={() => {
                                setCurrentPage('products');
                                closeSidebar();
                            }}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded capitalize"
                        >
                            Produkty
                        </button>
                        <button
                            onClick={() => {
                                setCurrentPage('about');
                                closeSidebar();
                            }}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded capitalize"
                        >
                            O nas
                        </button>
                        {user && (
                            <button
                                onClick={() => {
                                    setCurrentPage('contact');
                                    closeSidebar();
                                }}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded capitalize"
                            >
                                Kontakt
                            </button>
                        )}
                    </div>
                </nav>

                <div className="absolute bottom-4 left-4 right-4">
                    <NavIcons />
                </div>
            </div>
        </div>
    );
};