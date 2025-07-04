import React from 'react';

export const Footer: React.FC = () => (
    <footer className="h-20 bg-black text-white flex flex-col lg:flex-row items-center justify-center space-y-2 lg:space-y-0">
        <h5 className="text-sm font-normal">
            &copy; {new Date().getFullYear()} <span className="text-red-500 px-2">Er-Furniture</span>
        </h5>
        <h5 className="text-sm font-normal">Wszelkie prawa zastrzeżone</h5>
    </footer>
);