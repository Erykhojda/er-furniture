import React from 'react';
import { useApp } from '../../context/useApp';
import { formatPrice, getUniqueCategories } from '../../utils';

export const Filters: React.FC = () => {
    const { filters, updateFilters, clearFilters, products } = useApp();
    const { searchText, category, price } = filters;

    const categories = getUniqueCategories(products);

    const translateCategory = (cat: string): string => {
        const categoryMap: Record<string, string> = {
            'all': 'wszystkie',
            'stoły': 'stoły',
            'krzesła': 'krzesła',
            'biurka': 'biurka',
            'łóżka': 'łóżka',
            'komody': 'komody',
            'szafy': 'szafy',
        };
        return categoryMap[cat.toLowerCase()] || cat;
    };

    const handleCategoryClick = (cat: string) => {
        const fakeEvent = {
            target: {
                name: 'category',
                value: cat
            }
        } as React.ChangeEvent<HTMLInputElement>;

        updateFilters(fakeEvent);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-6">
                {/* Search */}
                <div>
                    <input
                        type="text"
                        name="searchText"
                        placeholder="Szukaj mebli..."
                        value={searchText}
                        onChange={updateFilters}
                        className="w-full px-3 py-2 bg-gray-100 border border-transparent rounded focus:outline-none focus:border-red-500"
                    />
                </div>

                {/* Categories */}
                <div>
                    <h5 className="font-medium mb-2">Kategoria</h5>
                    <div className="space-y-1">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryClick(cat)}
                                type="button"
                                className={`block w-full text-left py-1 px-2 border-b border-transparent hover:border-red-300 transition-colors capitalize ${category === cat
                                    ? 'border-red-500 font-semibold text-red-600'
                                    : 'text-gray-700'
                                    }`}
                            >
                                {translateCategory(cat)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price */}
                <div>
                    <h5 className="font-medium mb-2">Cena</h5>
                    <p className="text-sm mb-2 text-red-600 font-medium">{formatPrice(price)}</p>
                    <input
                        type="range"
                        name="price"
                        onChange={updateFilters}
                        min={filters.minPrice}
                        max={filters.maxPrice}
                        value={price}
                        step={1000}
                        className="w-full accent-red-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{formatPrice(filters.minPrice)}</span>
                        <span>{formatPrice(filters.maxPrice)}</span>
                    </div>
                </div>

                {/* ❌ USUNIĘTO SEKCJĘ SHIPPING */}
            </div>

            <button
                type="button"
                onClick={clearFilters}
                className="mt-6 w-full px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors font-medium"
            >
                Wyczyść filtry
            </button>
        </div>
    );
};