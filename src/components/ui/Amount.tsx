import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface AmountProps {
    amount: number;
    increase: () => void;
    decrease: () => void;
}

export const Amount: React.FC<AmountProps> = ({ amount, increase, decrease }) => (
    <div className="flex items-center justify-center w-36 border border-gray-300 rounded">
        <button
            onClick={decrease}
            className="px-3 py-1 hover:bg-gray-100 transition-colors"
        >
            <Minus className="w-4 h-4" />
        </button>
        <span className="px-4 py-2 font-semibold">{amount}</span>
        <button
            onClick={increase}
            className="px-3 py-1 hover:bg-gray-100 transition-colors"
        >
            <Plus className="w-4 h-4" />
        </button>
    </div>
);