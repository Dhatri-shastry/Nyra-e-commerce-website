"use client";

import "./globals.css";
import Header from '@/components/header'; 
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CartProvider } from "@/context/Cartcontext";
import gsap from "gsap";
import { ReactNode } from "react";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from '@/context/AuthContext';

interface User {
  name?: string;
  email?: string;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const mainRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  // Animate main content
  useEffect(() => {
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/sarees/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {/* ONLY THIS HEADER — your full component */}
              <Header />

              {/* REMOVED: The entire manual <header className="siteHeader"> block */}
              {/* Everything (logo, nav, search, welcome) is already inside Header.tsx */}

              <hr className="border-gray-300" /> {/* Optional: keep if you want the line */}

              <main ref={mainRef}>{children}</main>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}