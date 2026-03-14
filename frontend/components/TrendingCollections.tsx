// frontend/components/TrendingCollections.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/products'; // ← Import the async function
import { useState, useEffect } from 'react';

export default function TrendingCollections() {
  const [trending, setTrending] = useState<any[]>([]); // ← Use state

  useEffect(() => {
    async function loadProducts() {
      const allProducts = await getProducts(); // ← Await the promise
      setTrending(allProducts.slice(0, 4));
    }
    loadProducts();
  }, []);

  if (trending.length === 0) return null; // Optional: loading state

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-amber-900">
        Trending Collections
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {trending.map((product) => (
          <Link
            href={`/shop/${product.id}`}
            key={product.id}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition"
          >
            <div className="relative h-96">
              <Image
                src={product.mainImage}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-110 transition"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
              <p className="text-lg font-medium">₹{product.price.toLocaleString()}.00</p>
              <span className="mt-4 inline-block bg-white/20 backdrop-blur px-6 py-2 rounded-full text-sm">
                View Details
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/shop"
          className="bg-amber-900 hover:bg-amber-800 text-white px-10 py-4 rounded-lg font-bold text-lg transition"
        >
          View All Collections
        </Link>
      </div>
    </section>
  );
}