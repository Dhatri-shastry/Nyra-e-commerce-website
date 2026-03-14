// frontend/components/ProductGridWrapper.tsx
'use client';

import ProductGrid from './ProductGrid';
import { useCart } from '@/context/CartContext'; // Adjust path if needed

export default function ProductGridWrapper({ products }: { products: Product[] }) {
  const { addToCart } = useCart(); // Now safe – inside client + provider

  return <ProductGrid initialProducts={products} addToCart={addToCart} />;
}