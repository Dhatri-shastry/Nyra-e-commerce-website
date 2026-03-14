// app/shop/daily-wear/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

const subCategories = [
  { title: "Maheshwari Daily", img: "/maheshwari-daily.jpg", type: "maheshwari" },
  { title: "Kota Doriya", img: "/kota.jpg", type: "kota-doriya" },
  { title: "Chanderi Daily", img: "/chanderi-daily.jpg", type: "chanderi" },
  { title: "Printed Cotton", img: "/printed.jpg", type: "printed-cotton" },
];

export default function DailyWearPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4 text-amber-900">Daily Wear Sarees</h1>
      <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
        Comfortable and stylish sarees for everyday wear
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {subCategories.map((item) => (
          <Link href={`/shop?type=${item.type}`} key={item.type} className="group">
            <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition">
              <Image
                src={item.img}
                alt={item.title}
                width={400}
                height={600}
                className="object-cover w-full h-96 group-hover:scale-110 transition"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white text-center w-full">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <span className="bg-white/20 backdrop-blur px-6 py-2 rounded-full text-sm">
                  View Collection
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}