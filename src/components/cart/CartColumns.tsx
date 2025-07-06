import React from 'react';

export const CartColumns: React.FC = () => (
    <div className="hidden lg:block">
        <div className="grid grid-cols-[316px_1fr_1fr_1fr_auto] gap-4 justify-items-center mb-8">
            <h5 className="text-gray-500 font-normal">Produkt</h5>
            <h5 className="text-gray-500 font-normal">Cena</h5>
            <h5 className="text-gray-500 font-normal">Ilość</h5>
            <h5 className="text-gray-500 font-normal">Łącznie</h5>
            <span className="w-8 h-8"></span>
        </div>
        <hr className="mb-12" />
    </div>
);