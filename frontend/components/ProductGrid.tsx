// frontend/components/ProductGrid.tsx
'use client';

import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/Cartcontext';

export default function ProductGrid({ initialProducts }: { initialProducts: any[] }) {
  const router = useRouter();
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {initialProducts.map((product) => (
        <div
          key={product.id}
          className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
          onClick={() => router.push(`/shop/${product.id}`)}
        >
          {/* Image Section */}
          <div className="aspect-square relative bg-gray-50">
            <Image
              src={product.mainImage || product.image} // Fallback for backward compatibility
              alt={product.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Add to wishlist logic later
              }}
              className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition"
              aria-label="Add to wishlist"
            >
              <Heart className="w-5 h-5 text-gray-700 hover:text-red-500 transition" />
            </button>

            {/* Stock Status */}
            {product.available ? (
              <span className="absolute bottom-4 left-4 bg-green-600 text-white px-4 py-1.5 text-sm font-medium rounded-full shadow">
                Available
              </span>
            ) : (
              <span className="absolute bottom-4 left-4 bg-red-600 text-white px-4 py-1.5 text-sm font-medium rounded-full shadow">
                Out of Stock
              </span>
            )}

            {/* Quick Add to Cart Button (on hover) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
                // You can replace alert with toast notification later
                alert('Added to cart!');
              }}
              className="absolute inset-x-0 bottom-4 mx-auto w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-amber-50"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          {/* Product Info */}
          <div className="p-6 text-center">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 min-h-[3.5rem]">
              {product.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
            <p className="text-2xl font-bold text-amber-600 mt-4">
              ₹{product.price.toLocaleString()}.00
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}