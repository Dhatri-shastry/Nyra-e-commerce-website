// frontend/app/shop/[id]/page.tsx

import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/products';
import ProductDetailClient from '@/components/ProductDetailClient';

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Await params because it's a Promise in dynamic routes
  const { id } = await params;

  const product = await getProduct(id);

  // If product doesn't exist → show Next.js 404 page
  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <ProductDetailClient product={product} />
    </div>
  );
}