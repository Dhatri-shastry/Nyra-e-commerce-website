// frontend/app/track-order/page.tsx
'use client';

import { Package, Truck, CheckCircle } from 'lucide-react';

export default function TrackOrderPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Track Your Order</h1>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <p className="text-2xl font-semibold">Order #NYRA12345</p>
          <p className="text-green-600 text-xl mt-2">Confirmed • Paid</p>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p className="font-semibold">Order Confirmed</p>
              <p className="text-gray-600">December 26, 2025</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-amber-100 p-4 rounded-full">
              <Package className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <p className="font-semibold">Preparing Your Sarees</p>
              <p className="text-gray-600">Expected today</p>
            </div>
          </div>

          <div className="flex items-center gap-6 opacity-50">
            <div className="bg-gray-100 p-4 rounded-full">
              <Truck className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <p className="font-semibold">Out for Delivery</p>
              <p className="text-gray-600">Estimated: Dec 30 - Jan 2</p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-700">
            We'll notify you via WhatsApp when it's shipped!
          </p>
        </div>
      </div>
    </div>
  );
}