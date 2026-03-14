// frontend/components/Header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, User } from 'lucide-react';
import { useCart } from '@/context/Cartcontext';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Cart', href: '/cart' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar - Hidden on mobile */}
        <div className="hidden md:flex justify-between items-center text-sm text-gray-700 py-3 border-b">
          <div className="flex gap-4">
            <Link href="/orders" className="hover:text-amber-600">Orders</Link>
            <span>•</span>
            <Link href="/returns" className="hover:text-amber-600">Returns</Link>
            <span>•</span>
            <Link href="/support" className="hover:text-amber-600">Support</Link>
          </div>
          <p className="font-medium">Welcome to NYRA</p>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                <User size={18} />
                <span className="hidden sm:inline">Hi, {user.displayName || user.email?.split('@')[0]}</span>
                <button onClick={logout} className="text-red-600 text-sm hover:underline">Logout</button>
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-2 hover:text-amber-600">
                <User size={18} />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
          </div>
        </div>

        {/* Main Header */}
        <div className="py-4">
          {/* Mobile Layout */}
          <div className="flex flex-col gap-4 md:hidden">
            {/* Top Row: Menu + Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 flex-shrink-0"
              >
                <Menu size={28} className="text-gray-800" />
              </button>
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-3xl font-bold text-amber-900 tracking-wider">NYRA</h1>
              </Link>
            </div>

            {/* Search Bar - Adjusted sizes */}
            <form className="flex gap-3">
              {/* Reduced search input width */}
              <input
                type="text"
                placeholder="Search by saree code or type"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 min-w-0 max-w-md"
              />
              {/* Increased Search button size */}
              <button
                type="submit"
                className="bg-amber-900 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-medium text-base flex-shrink-0"
              >
                Search
              </button>
            </form>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between gap-8">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-4xl font-bold text-amber-900 tracking-wider">NYRA</h1>
            </Link>

            <nav className="flex items-center gap-8 flex-1 justify-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href === '/shop' && pathname.startsWith('/shop'));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-lg font-medium ${isActive ? 'text-amber-600 font-bold' : 'text-gray-800 hover:text-amber-600'}`}
                  >
                    {link.name}
                    {link.name === 'Cart' && cartCount > 0 && (
                      <span className="absolute -top-2 -right-5 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                    {isActive && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-600"></span>}
                  </Link>
                );
              })}
            </nav>

            <form className="max-w-md flex gap-2">
              <input
                type="text"
                placeholder="Search by saree code or type"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 min-w-0"
              />
              <button className="bg-amber-900 hover:bg-amber-800 text-white px-6 py-2 rounded-lg font-medium text-sm">
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === '/shop' && pathname.startsWith('/shop'));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 text-lg ${isActive ? 'text-amber-600 font-bold' : 'text-gray-800'}`}
                >
                  {link.name}
                  {link.name === 'Cart' && cartCount > 0 && (
                    <span className="ml-2 bg-amber-600 text-white text-xs rounded-full px-2 py-1">
                      {cartCount}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="mt-4 pt-4 border-t">
              {user ? (
                <div className="py-2">
                  <p className="text-sm">Hi, {user.displayName || user.email?.split('@')[0]}</p>
                  <button onClick={logout} className="text-sm text-red-600 mt-1">Logout</button>
                </div>
              ) : (
                <Link href="/login" className="block py-2 text-lg">Login</Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}