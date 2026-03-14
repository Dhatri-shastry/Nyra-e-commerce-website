// frontend/app/shop/page.tsx
'use client';

import { useState, useEffect } from 'react';
import FiltersSidebar from '@/components/FiltersSidebar';
import ProductGrid from '@/components/ProductGrid';
import { useSearchParams } from 'next/navigation';
import { Filter, ArrowUpDown } from 'lucide-react';

const allProducts = [
  {
    id: '1',
    title: 'Maheshwari Silk Cotton Saree',
    description: '(Saree L- 5.50 m, Blouse 85 cm)',
    price: 2950,
    image: '/saree1.png',
    available: true,
    category: 'SAREES',
    type: 'maheshwari',
  },
  {
    id: '2',
    title: 'Kota Doriya Saree',
    description: '(Saree L- 5.40 m, Blouse 80 cm)',
    price: 2650,
    image: '/saree2.png',
    available: true,
    category: 'SAREES',
    type: 'kota-doriya',
  },
  {
    id: '3',
    title: 'Premium Banarasi Silk Saree',
    description: 'Luxury handwoven silk',
    price: 4500,
    image: '/saree3.png',
    available: true,
    category: 'SAREES',
    type: 'banarasi',
  },
  {
    id: '4',
    title: 'Premium Tissue Silk Saree',
    description: 'Luxury handwoven silk',
    price: 2500,
    image: '/saree4.png',
    available: true,
    category: 'SAREES',
    type: 'tissue',
  },
];

export default function ShopPage() {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  const [filters, setFilters] = useState({
    categories: [] as string[],
    minPrice: 500,
    maxPrice: 5000,
    stockFilter: 'all' as 'all' | 'in' | 'out',
  });

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');

  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const searchParams = useSearchParams();
  const typeFilter = searchParams.get('type');

  useEffect(() => {
    let result = allProducts;

    if (typeFilter) {
      result = result.filter((p) =>
        p.type?.toLowerCase() === typeFilter.toLowerCase() ||
        p.title.toLowerCase().includes(typeFilter.toLowerCase())
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    result = result.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice);

    if (filters.stockFilter !== 'all') {
      result = result.filter((p) =>
        filters.stockFilter === 'in' ? p.available : !p.available
      );
    }

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProducts(result);
  }, [filters, typeFilter, sortBy]);

  return (
    <div className="relative min-h-screen">
      {/* Main Content - with bottom padding so bar doesn't cover content */}
      <div className="pb-24 lg:pb-12">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Our Collections
          </h1>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-10">
            <aside className="lg:col-span-1 lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-6 text-blue-900">Filters</h2>
                <FiltersSidebar currentFilters={filters} onFilterChange={setFilters} />
              </div>
            </aside>

            <section className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-2xl text-gray-500">No products found</p>
                  <p className="mt-4 text-gray-400">Try adjusting your filters</p>
                </div>
              ) : (
                <ProductGrid initialProducts={filteredProducts} />
              )}
            </section>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-500">No products found</p>
                <p className="mt-4 text-gray-400">Try adjusting your filters</p>
              </div>
            ) : (
              <ProductGrid initialProducts={filteredProducts} />
            )}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar - Always visible on mobile */}
      <div className="fixed inset-x-0 bottom-0 bg-white border-t-2 border-gray-300 shadow-2xl z-50 lg:hidden">
        <div className="flex h-16 items-center justify-around">
          <button
            onClick={() => setShowSortModal(true)}
            className="flex-1 flex flex-col items-center justify-center h-full text-gray-700 hover:text-amber-900 hover:bg-gray-50 transition"
          >
            <ArrowUpDown size={24} />
            <span className="text-xs mt-1 font-medium">Sort</span>
          </button>

          <div className="w-px h-10 bg-gray-300" />

          <button
            onClick={() => setShowFilterModal(true)}
            className="flex-1 flex flex-col items-center justify-center h-full text-gray-700 hover:text-amber-900 hover:bg-gray-50 transition"
          >
            <Filter size={24} />
            <span className="text-xs mt-1 font-medium">Filter</span>
          </button>
        </div>
      </div>

      {/* Sort Modal */}
      {showSortModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowSortModal(false)}>
          <div className="bg-white w-full rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Sort By</h2>
              <button onClick={() => setShowSortModal(false)} className="text-3xl">&times;</button>
            </div>
            <div className="space-y-2">
              {[
                { value: 'featured', label: 'Recommended' },
                { value: 'price-low', label: 'Price: Low to High' },
                { value: 'price-high', label: 'Price: High to Low' },
                { value: 'name', label: 'Name (A-Z)' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value as any);
                    setShowSortModal(false);
                  }}
                  className={`w-full text-left py-4 px-6 rounded-lg transition ${
                    sortBy === option.value ? 'bg-amber-100 font-medium' : 'hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowFilterModal(false)}>
          <div className="bg-white w-full rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Filters</h2>
              <button onClick={() => setShowFilterModal(false)} className="text-3xl">&times;</button>
            </div>
            <FiltersSidebar currentFilters={filters} onFilterChange={setFilters} />
            <button
              onClick={() => setShowFilterModal(false)}
              className="w-full mt-8 bg-amber-900 hover:bg-amber-800 text-white py-4 rounded-lg font-bold transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}