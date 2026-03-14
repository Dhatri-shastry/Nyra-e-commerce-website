// frontend/components/HeroSlider.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const categories = [
  {
    title: 'Cotton Sarees',
    img: '/saree1.png',
    link: '/shop/cotton',
  },
  {
    title: 'Daily Wear',
    img: '/saree2.png',
    link: '/shop/daily-wear',
  },
  {
    title: 'Silk Sarees',
    img: '/saree3.png',
    link: '/shop/silk',
  },
  {
    title: 'Designer Sarees',
    img: '/saree4.png',
    link: '/shop/designer',
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const total = categories.length;

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  // Get visible categories based on current index
  const getVisibleCategories = () => {
    const visible = [];
    visible.push(categories[currentIndex]);
    const nextIndex = (currentIndex + 1) % total;
    visible.push(categories[nextIndex]);
    return visible;
  };

  const visibleCategories = getVisibleCategories();

  return (
    <div className="relative w-full bg-white py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          {/* Grid: 1 column on mobile, 2 on lg+ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* First card */}
            <div
              className="cursor-pointer group text-center"
              onClick={() => router.push(visibleCategories[0].link)}
            >
              <div className="relative aspect-[3/4] w-full max-w-sm mx-auto overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={visibleCategories[0].img}
                  alt={visibleCategories[0].title}
                  fill
                  className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
              <h2 className="mt-6 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                {visibleCategories[0].title}
              </h2>
            </div>

            {/* Second card - hidden on mobile */}
            <div
              className="hidden lg:block cursor-pointer group text-center"
              onClick={() => router.push(visibleCategories[1].link)}
            >
              <div className="relative aspect-[3/4] w-full max-w-sm mx-auto overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={visibleCategories[1].img}
                  alt={visibleCategories[1].title}
                  fill
                  className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
              <h2 className="mt-6 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                {visibleCategories[1].title}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Smaller Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* Smaller Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {categories.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(i);
            }}
            className={`rounded-full transition-all ${
              i === currentIndex
                ? 'bg-gray-800 w-8 h-2'
                : 'bg-gray-400 w-2 h-2 hover:bg-gray-600'
            }`}
          />
        ))}
      </div>

      <div className="text-center mt-6 lg:hidden">
        <p className="text-sm text-gray-600">Swipe to see more collections</p>
      </div>
    </div>
  );
}