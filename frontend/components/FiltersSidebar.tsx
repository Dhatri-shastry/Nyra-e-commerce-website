// frontend/components/FiltersSidebar.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const categories = [
  'SAREES',
  'FASHION JEWELLERY',
];

interface FiltersSidebarProps {
  currentFilters: {
    categories: string[];
    minPrice: number;
    maxPrice: number;
    stockFilter: string;
  };
  onFilterChange?: (filters: any) => void; // New
}

export default function FiltersSidebar({ currentFilters, onFilterChange }: FiltersSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(currentFilters.categories);
  const [priceRange, setPriceRange] = useState([currentFilters.minPrice, currentFilters.maxPrice]);
  const [stockStatus, setStockStatus] = useState(currentFilters.stockFilter);

  // Sync with URL on mount
  useEffect(() => {
    setSelectedCategories(currentFilters.categories);
    setPriceRange([currentFilters.minPrice, currentFilters.maxPrice]);
    setStockStatus(currentFilters.stockFilter);
  }, [currentFilters]);

 const applyFilters = () => {
  onFilterChange?.({
    categories: selectedCategories,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    stockFilter: stockStatus,
  });
};

  return (
    <div className="space-y-10 bg-white p-6 rounded-lg shadow-sm">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold text-blue-900 uppercase mb-4">Product Categories</h3>
        <div className="space-y-3">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories([...selectedCategories, cat]);
                  } else {
                    setSelectedCategories(selectedCategories.filter((c) => c !== cat));
                  }
                }}
                className="mr-3 h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
              />
              <span className="text-gray-700">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      // In the price section
<input
  type="range"
  min="500"
  max="5000"
  value={priceRange[1]}
  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
/>
<div className="flex justify-between text-sm text-gray-600 mt-3">
  <span>₹500</span>
  <span>₹5000</span>
</div>
<div className="text-center mt-2 font-medium text-gray-800">
  ₹{priceRange[0]} - ₹{priceRange[1]}
</div>

      {/* Stock Status */}
      <div>
        <h3 className="text-lg font-semibold text-blue-900 uppercase mb-4">Stock Status</h3>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="stock"
              checked={stockStatus === 'all'}
              onChange={() => setStockStatus('all')}
              className="mr-3"
            />
            <span>All</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="stock"
              checked={stockStatus === 'in'}
              onChange={() => setStockStatus('in')}
              className="mr-3"
            />
            <span>In Stock</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="stock"
              checked={stockStatus === 'out'}
              onChange={() => setStockStatus('out')}
              className="mr-3"
            />
            <span>Out of Stock</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input type="radio" name="stock" disabled className="mr-3" />
            <span className="text-gray-400">Pre Order</span>
          </label>
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-amber-600 text-white font-medium py-3 rounded hover:bg-amber-700 transition"
      >
        Apply Filters
      </button>
    </div>
  );
}