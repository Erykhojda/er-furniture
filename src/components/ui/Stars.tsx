import React from 'react';
import { Star } from 'lucide-react';

interface StarsProps {
    stars: number;
    reviews: number;
}

export const Stars: React.FC<StarsProps> = ({ stars, reviews }) => {
    const starElements = Array.from({ length: 5 }, (_, index) => (
        <Star
            key={index}
            className={`w-4 h-4 ${index < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
    ));

    return (
        <div className="flex items-center space-x-2">
            <div className="flex">{starElements}</div>
            <p className="text-sm text-gray-600">
                from <span className="font-semibold text-red-500">{reviews}</span> reviews
            </p>
        </div>
    );
};