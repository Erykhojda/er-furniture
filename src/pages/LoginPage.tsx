import React, { useState } from 'react';
import { LoginForm, RegisterForm } from '../components/auth';
import { useApp } from '../context/useApp';

export const LoginPage: React.FC = () => {
    const { user, setCurrentPage } = useApp();
    const [isLogin, setIsLogin] = useState(true);

    if (user) {
        setCurrentPage('home');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    {isLogin ? (
                        <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
                    ) : (
                        <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
                    )}
                </div>
            </div>
        </div>
    );
};