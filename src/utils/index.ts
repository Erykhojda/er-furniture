import type { Product } from '../types';

export const formatPrice = (number: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(number / 100);
};

export const getUniqueValues = (data: Product[], type: keyof Product): string[] => {
    let unique: unknown[] = data.map((item) => item[type]);
    if (type === 'colors') {
        unique = unique.flat();
    }
    return ['all', ...Array.from(new Set(unique)).map(String)];
};