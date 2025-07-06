import React from 'react';
import { useApp } from '../../context/useApp';
import { formatPrice, getUniqueCategories } from '../../utils';

export const Filters: React.FC = () => {
    const { filters, updateFilters, clearFilters, products } = useApp();
    const { searchText, category, price } = filters;

    const categories = getUniqueCategories(products);

    // Funkcja do tłumaczenia kategorii
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

        return categoryMap[cat] || cat;
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-6">
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

                <div>
                    <h5 className="font-medium mb-2">Kategoria</h5>
                    <div className="space-y-1">
                        {categories.map((cat, index) => (
                            <button
                                key={index}
                                onClick={updateFilters}
                                name="category"
                                type="button"
                                className={`block w-full text-left py-1 border-b border-transparent hover:border-gray-300 transition-colors capitalize ${category === cat ? 'border-gray-500 font-medium' : ''
                                    }`}
                            >
                                {translateCategory(cat)}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h5 className="font-medium mb-2">Cena</h5>
                    <p className="text-sm mb-2">{formatPrice(price)}</p>
                    <input
                        type="range"
                        name="price"
                        onChange={updateFilters}
                        min={filters.minPrice}
                        max={filters.maxPrice}
                        value={price}
                        step={1000}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{formatPrice(filters.minPrice)}</span>
                        <span>{formatPrice(filters.maxPrice)}</span>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="shipping"
                        id="shipping"
                        onChange={updateFilters}
                        checked={filters.shipping}
                        className="rounded"
                    />
                    <label htmlFor="shipping" className="text-sm">Darmowa wysyłka</label>
                </div>
            </div>

            <button
                type="button"
                onClick={clearFilters}
                className="mt-6 w-full px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
            >
                Wyczyść filtry
            </button>
        </div>
    );
};