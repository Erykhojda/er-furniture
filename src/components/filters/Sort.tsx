import React from 'react';
import { Grid, List } from 'lucide-react';
import { useApp } from '../../context/useApp';

export const Sort: React.FC = () => {
    const { filteredProducts, gridView, setGridView, sort, updateSort } = useApp();

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-8">
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                    <button
                        onClick={() => setGridView(true)}
                        className={`p-2 border rounded ${gridView ? 'bg-black text-white' : 'border-black'}`}
                    >
                        <Grid className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setGridView(false)}
                        className={`p-2 border rounded ${!gridView ? 'bg-black text-white' : 'border-black'}`}
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>

                <p className="text-gray-700">{filteredProducts.length} znaleziono produktów</p>
            </div>

            <hr className="w-full md:hidden" />

            <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-gray-700">Sortuj według</label>
                <select
                    id="sort"
                    value={sort}
                    onChange={updateSort}
                    className="px-3 py-1 border border-gray-300 rounded focus:outline-none"
                >
                    <option value="price-lowest">cena (rosnąco)</option>
                    <option value="price-highest">cena (malejąco)</option>
                    <option value="name-a">nazwa (A-Z)</option>
                    <option value="name-z">nazwa (Z-A)</option>
                </select>
            </div>
        </div>
    );
};
