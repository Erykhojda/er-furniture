import React from 'react';
import { Check } from 'lucide-react';
import { useApp } from '../../context/useApp';
import { formatPrice, getUniqueValues } from '../../utils';

export const Filters: React.FC = () => {
    const { filters, updateFilters, clearFilters, products } = useApp();
    const { searchText, designer, color, price } = filters;

    const designers = getUniqueValues(products, 'designer');
    const colors = getUniqueValues(products, 'colors');

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-6">
                {/* Search */}
                <div>
                    <input
                        type="text"
                        name="searchText"
                        placeholder="Search"
                        value={searchText}
                        onChange={updateFilters}
                        className="w-full px-3 py-2 bg-gray-100 border border-transparent rounded focus:outline-none focus:border-red-500"
                    />
                </div>

                {/* Designer */}
                <div>
                    <h5 className="font-medium mb-2">Designer</h5>
                    <div className="space-y-1">
                        {designers.map((des, index) => (
                            <button
                                key={index}
                                onClick={updateFilters}
                                name="designer"
                                type="button"
                                className={`block w-full text-left py-1 border-b border-transparent hover:border-gray-300 transition-colors capitalize ${designer === des ? 'border-gray-500' : ''
                                    }`}
                            >
                                {des}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Colors */}
                <div>
                    <h5 className="font-medium mb-2">Colors</h5>
                    <div className="flex flex-wrap gap-2">
                        {colors.map((c, index) => {
                            if (c === 'all') {
                                return (
                                    <button
                                        key={index}
                                        name="color"
                                        onClick={updateFilters}
                                        data-color="all"
                                        className={`px-3 py-1 text-sm border rounded ${color === 'all' ? 'border-gray-500 bg-gray-100' : 'border-gray-300'
                                            }`}
                                    >
                                        All
                                    </button>
                                );
                            }

                            return (
                                <button
                                    key={index}
                                    name="color"
                                    style={{ backgroundColor: c }}
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${color === c ? 'border-gray-800' : 'border-gray-300'
                                        }`}
                                    data-color={c}
                                    onClick={updateFilters}
                                >
                                    {color === c && <Check className="w-3 h-3 text-white" />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Price */}
                <div>
                    <h5 className="font-medium mb-2">Price</h5>
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
                </div>

                {/* Free Shipping */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="shipping"
                        id="shipping"
                        onChange={updateFilters}
                        checked={filters.shipping}
                        className="rounded"
                    />
                    <label htmlFor="shipping" className="text-sm">Free shipping</label>
                </div>
            </div>

            <button
                type="button"
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
            >
                Clear Filters
            </button>
        </div>
    );
};