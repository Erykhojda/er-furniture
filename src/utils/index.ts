import type { Product } from '../types';

export const formatPrice = (price: number): string => {
    const priceInZloty = price / 100;
    return new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(priceInZloty);
};

export const getUniqueValues = (data: Product[], type: keyof Product): string[] => {
    const unique: string[] = [];

    data.forEach(item => {
        const value = item[type];

        if (Array.isArray(value)) {
            value.forEach(val => {
                if (typeof val === 'string') {
                    unique.push(val);
                }
            });
        }
        else if (value && typeof value === 'string') {
            unique.push(value);
        }
    });

    const uniqueValues = [...new Set(unique)].sort();

    return ['all', ...uniqueValues];
};

export const getCategoryDisplayName = (category: string): string => {
    const categoryNames: Record<string, string> = {
        'office': 'Biuro',
        'kitchen': 'Kuchnia',
        'living room': 'Salon',
        'bedroom': 'Sypialnia',
        'dining room': 'Jadalnia',
        'stoły': 'Stoły',
        'krzesła': 'Krzesła',
        'biurka': 'Biurka',
        'łóżka': 'Łóżka',
        'komody': 'Komody',
        'szafy': 'Szafy',
        'fotele': 'Fotele',
        'all': 'Wszystkie kategorie'
    };

    return categoryNames[category] || category;
};


export const formatProductParams = (product: Product): string[] => {
    const params: string[] = [];

    if (product.material) {
        params.push(`Materiał: ${product.material}`);
    }

    if (product.availableSizes && product.availableSizes.length > 0) {
        params.push(`Dostępne rozmiary: ${product.availableSizes.join(', ')} cm`);
    }

    if (product.availableMaterials && product.availableMaterials.length > 0) {
        params.push(`Dostępne materiały: ${product.availableMaterials.join(', ')}`);
    }

    if (product.availableUpholstery && product.availableUpholstery.length > 0) {
        params.push(`Dostępne tapicerki: ${product.availableUpholstery.join(', ')}`);
    }

    if (product.canExtend !== undefined) {
        params.push(`Rozkładanie: ${product.canExtend ? 'dostępne' : 'niedostępne'}`);
    }

    if (product.category) {
        params.push(`Kategoria: ${getCategoryDisplayName(product.category)}`);
    }

    if (product.stock !== undefined) {
        params.push(`Dostępność: ${product.stock} szt.`);
    }

    if (product.shipping) {
        params.push('Darmowa dostawa');
    }

    return params;
};

export const getUniqueCategories = (data: Product[]): string[] => {
    return getUniqueValues(data, 'category');
};

export const getUniqueMaterials = (data: Product[]): string[] => {
    return getUniqueValues(data, 'material');
};

export const getAllAvailableMaterials = (data: Product[]): string[] => {
    const allMaterials: string[] = [];

    data.forEach(item => {
        if (item.availableMaterials && Array.isArray(item.availableMaterials)) {
            allMaterials.push(...item.availableMaterials);
        }
    });

    const uniqueValues = [...new Set(allMaterials)].sort();
    return ['all', ...uniqueValues];
};

export const getAllAvailableSizes = (data: Product[]): string[] => {
    const allSizes: string[] = [];

    data.forEach(item => {
        if (item.availableSizes && Array.isArray(item.availableSizes)) {
            allSizes.push(...item.availableSizes);
        }
    });

    const uniqueValues = [...new Set(allSizes)].sort();
    return ['all', ...uniqueValues];
};