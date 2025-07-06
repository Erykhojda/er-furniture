import React from 'react';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useApp } from '../../context/useApp';

export const NavIcons: React.FC = () => {
    const { setCurrentPage, totalItems, user, logout } = useApp();

    const handleUserClick = () => {
        if (user) {
            setCurrentPage('checkout');
        } else {
            setCurrentPage('login');
        }
    };

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className="flex items-center space-x-4">
            {/* Cart */}
            <button
                onClick={() => setCurrentPage('cart')}
                className="relative flex items-center space-x-2 text-gray-700 hover:text-red-500 transition-colors"
            >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {totalItems}
                    </span>
                )}
            </button>

            {/* User */}
            {user ? (
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleUserClick}
                        className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition-colors"
                    >
                        {user.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt={user.name}
                                className="w-6 h-6 rounded-full"
                            />
                        ) : (
                            <User className="w-6 h-6" />
                        )}
                        <span className="text-sm hidden sm:inline">{user.name}</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="text-gray-700 hover:text-red-500 transition-colors"
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setCurrentPage('login')}
                    className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition-colors"
                >
                    <span className="text-sm">Zaloguj się</span>
                    <User className="w-6 h-6" />
                </button>
            )}
        </div>
    );
};