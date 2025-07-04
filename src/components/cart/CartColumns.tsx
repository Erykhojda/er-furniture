import React from 'react';

export const CartColumns: React.FC = () => (
    <div className="hidden lg:block">
        <div className="grid grid-cols-[316px_1fr_1fr_1fr_auto] gap-4 justify-items-center mb-8">
            <h5 className="text-gray-500 font-normal">Item</h5>
            <h5 className="text-gray-500 font-normal">Price</h5>
            <h5 className="text-gray-500 font-normal">Amount</h5>
            <h5 className="text-gray-500 font-normal">Combined</h5>
            <span className="w-8 h-8"></span>
        </div>
        <hr className="mb-12" />
    </div>
);