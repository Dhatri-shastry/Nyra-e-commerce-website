// frontend/components/ProductDetailClient.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';

import { useCart } from '@/context/Cartcontext';
import { useWishlist } from '@/context/WishlistContext';
import { Product } from '@/lib/products';
import { useAuth } from '@/context/AuthContext';

export default function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const router = useRouter();
  const { user } = useAuth();

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`Added ${quantity} × ${product.title} to cart!`);
  };

 const handleBuyNow = () => {
  addToCart(product, quantity);

  if (!user) {
    // Redirect to login with return URL
    router.push(`/login?redirect=${encodeURIComponent('/checkout')}`);
  } else {
    router.push('/checkout');
  }
};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Image Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-square overflow-hidden rounded-xl shadow-xl">
          <Image
            src={product.mainImage}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
          {product.available && (
            <span className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              Available
            </span>
          )}
        </div>

        {/* Thumbnails */}
        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-lg border-2 border-gray-200 cursor-pointer hover:border-amber-600 transition"
              >
                <Image
                  src={img}
                  alt={`${product.title} - view ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Information & Actions */}
      <div className="flex flex-col justify-start">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>

        <p className="text-3xl font-bold text-amber-600 mb-8">
          ₹{product.price.toLocaleString()}.00
        </p>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* Highlights */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Highlights</h3>
          <ul className="space-y-2">
            {product.highlights.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-600">
                <span className="text-amber-600 mt-1">✦</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-2 gap-4 mb-8 text-gray-700">
          <div><span className="font-medium">Fabric:</span> {product.fabric}</div>
          <div><span className="font-medium">Weave:</span> {product.weave}</div>
          <div><span className="font-medium">Length:</span> {product.length}</div>
          <div><span className="font-medium">Blouse:</span> {product.blouse}</div>
          {product.occasion && (
            <div className="col-span-2">
              <span className="font-medium">Best for:</span> {product.occasion}
            </div>
          )}
        </div>

        {/* Quantity + Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-8 rounded-lg transition flex items-center justify-center gap-3 text-lg"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>

          {/* Buy Now */}
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition text-lg"
          >
            Buy Now
          </button>

          {/* Wishlist */}
          <button
            onClick={() => toggleWishlist(product)}
            className="px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition flex items-center justify-center"
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={24}
              className={inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}
            />
          </button>
        </div>

        {/* Wash Care */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Wash Care</h3>
          <ul className="space-y-1 text-gray-600">
            {product.washCare.map((care, i) => (
              <li key={i}>• {care}</li>
            ))}
          </ul>
        </div>

        {/* Return Policy */}
        <div className="border-t pt-6 mt-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Return Policy</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• 7 days easy return & exchange</li>
            <li>• Free pickup from your doorstep</li>
            <li>• Return for any reason</li>
            <li>• Full refund on return</li>
          </ul>
        </div>
      </div>
    </div>
  );
}