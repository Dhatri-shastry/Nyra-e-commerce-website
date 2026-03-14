// frontend/app/cart/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/Cartcontext'; // ← Fixed typo

export default function CartPage() {
  const { cart, cartTotal, cartCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <ShoppingBag size={80} className="mx-auto text-gray-300 mb-8" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
        <p className="text-lg text-gray-600 mb-8">
          Looks like you haven&apos;t added any beautiful sarees yet.
        </p>
        <button
          onClick={() => router.push('/shop')}
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-bold text-lg"
        >
          Explore Collections
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center sm:text-left">
        My Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md border hover:shadow-lg transition"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Image */}
                <div className="relative w-full sm:w-32 h-64 sm:h-40 flex-shrink-0">
                  <Image
                    src={item.product.mainImage}
                    alt={item.product.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {item.product.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mt-1">
                    {item.product.description}
                  </p>

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Quantity & Remove */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="px-6 py-2 font-semibold text-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-4 py-2 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-600 hover:text-red-700 flex items-center gap-2 text-sm sm:text-base font-medium"
                      >
                        <Trash2 size={18} />
                        Remove
                      </button>
                    </div>

                    {/* Item Total - Moves below on mobile */}
                    <div className="text-right sm:text-left">
                      <p className="text-xl sm:text-2xl font-bold text-amber-600">
                        ₹{(item.product.price * item.quantity).toLocaleString()}.00
                      </p>
                      <p className="text-sm text-gray-500 mt-1 hidden sm:block">
                        ₹{item.product.price.toLocaleString()}.00 each
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary & Checkout Button */}
        <div className="bg-amber-50 p-6 sm:p-8 rounded-xl h-fit shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-4 text-base sm:text-lg">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">₹{cartTotal.toLocaleString()}.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-bold">Free</span>
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between text-xl sm:text-2xl font-bold">
                <span>Total</span>
                <span>₹{cartTotal.toLocaleString()}.00</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push('/checkout')}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 sm:py-5 rounded-lg mt-8 text-lg sm:text-xl transition shadow-md"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={() => router.push('/shop')}
            className="w-full border border-gray-400 text-gray-700 py-3 rounded-lg mt-4 hover:bg-gray-100 transition text-sm sm:text-base"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}