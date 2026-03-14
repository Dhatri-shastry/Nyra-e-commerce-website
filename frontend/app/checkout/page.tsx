// frontend/app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/context/Cartcontext';
import { useAuth } from '@/context/AuthContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    pincode: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');

  if (!user) {
    // Should not happen due to Buy Now guard, but safe fallback
    router.push('/login?redirect=/checkout');
    return null;
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Your Cart is Empty</h1>
        <button
          onClick={() => router.push('/shop')}
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-bold"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
  if (!user) {
    alert('Please login to place order');
    router.push('/login');
    return;
  }

  try {
    // Save order to Firestore
    await addDoc(collection(db, 'orders'), {
      userId: user.uid,
      userEmail: user.email,
      userName: user.displayName || 'Guest',
      items: cart.map(item => ({
        productId: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.mainImage,
      })),
      totalAmount: cartTotal,
      shipping: 'Free',
      address: address, // Your address state object
      paymentMethod: paymentMethod,
      status: 'confirmed',
      createdAt: serverTimestamp(),
    });

    // Clear cart and redirect
    clearCart();
    router.push('/order-success');
  } catch (error) {
    console.error('Error saving order:', error);
    alert('Order failed. Please try again.');
  }
};

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Product + Address + Payment */}
        <div className="lg:col-span-2 space-y-8">
          {/* Product Summary */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6">Order Items ({cartCount})</h2>
            {cart.map((item) => (
              <div key={item.product.id} className="flex gap-6 py-6 border-b last:border-0">
                <div className="relative w-28 h-36 flex-shrink-0">
                  <Image
                    src={item.product.mainImage}
                    alt={item.product.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{item.product.title}</h3>
                  <p className="text-gray-600 mt-1">Quantity: {item.quantity}</p>
                  <p className="text-amber-600 font-bold text-xl mt-4">
                    ₹{(item.product.price * item.quantity).toLocaleString()}.00
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Address */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6">Delivery Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={address.fullName}
                onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
              />
              <input
                type="text"
                placeholder="Pincode"
                required
                value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
              />
              <input
                type="text"
                placeholder="Address Line 1"
                required
                value={address.addressLine1}
                onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 md:col-span-2"
              />
              <input
                type="text"
                placeholder="Address Line 2 (optional)"
                value={address.addressLine2}
                onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 md:col-span-2"
              />
              <input
                type="text"
                placeholder="City"
                required
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
              />
              <input
                type="text"
                placeholder="State"
                required
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-amber-600"
                />
                <span className="font-medium">Cash on Delivery (COD)</span>
              </label>
              <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-amber-600"
                />
                <span className="font-medium">UPI / QR Code</span>
              </label>
              <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-amber-600"
                />
                <span className="font-medium">Credit/Debit Card (Coming Soon)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-amber-50 p-8 rounded-xl h-fit shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>
          <div className="space-y-4 text-lg">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString()}.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-bold">Free</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-2xl font-bold text-gray-900">
                <span>Total</span>
                <span>₹{cartTotal.toLocaleString()}.00</span>
              </div>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-5 rounded-lg mt-8 text-xl transition shadow-lg"
          >
            Place Order
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Secured by NYRA | 100% Safe
          </p>
        </div>
      </div>
    </div>
  );
}