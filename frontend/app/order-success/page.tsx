// frontend/app/order-success/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle2, Package, Truck } from 'lucide-react';
import { useCart } from '@/context/Cartcontext';
import { useEffect } from 'react';

export default function OrderSuccessPage() {
  const { clearCart, cartTotal, cart } = useCart();
  const router = useRouter();

  // Clear cart only once when page loads
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <CheckCircle2 className="w-32 h-32 text-green-600 mx-auto" />
        </div>

        {/* Main Message */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Thank You! Your Order is Confirmed
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          We've received your order and will start preparing your beautiful sarees with love.
        </p>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4 text-left max-w-md mx-auto">
            <div className="flex justify-between text-lg">
              <span>Items</span>
              <span>{cart.length} saree{cart.length > 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total Paid</span>
              <span className="text-amber-600">₹{cartTotal.toLocaleString()}.00</span>
            </div>
            <div className="pt-4 border-t text-sm text-gray-600">
              <p>Estimated delivery: 5-7 business days</p>
              <p className="mt-2">We'll send updates via WhatsApp & Email</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => router.push('/track-order')} // We'll create this next
            className="w-full sm:w-auto inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-10 rounded-xl text-lg shadow-lg transition"
          >
            <Truck size={24} />
            Track Your Order
          </button>

          <div className="pt-4">
            <button
              onClick={() => router.push('/')}
              className="text-amber-800 hover:text-amber-900 font-medium text-lg underline"
            >
              Continue Shopping →
            </button>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-12 text-gray-600">
          <p className="mb-2">Need help? Contact us anytime</p>
          <p className="font-medium">WhatsApp: +91 98765 43210</p>
          <p>Email: support@nyra.com</p>
        </div>
      </div>
    </div>
  );
}