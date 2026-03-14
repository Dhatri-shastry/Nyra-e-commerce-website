// app/page.tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./home.module.css";
import { useRouter } from "next/navigation";

// Firebase
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

// Components
import HeroSlider from "@/components/HeroSlider";
import TrendingCollections from "@/components/TrendingCollections";

interface Category {
  title: string;
  img: string;
  link: string;
}

export default function Home() {
  const mandalaRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();

  const [userName, setUserName] = useState<string | null>(null);

    // ← ADD THIS NEW useEffect to safely collect refs
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, categories.length); // Reset
    document.querySelectorAll(`.${styles.categoryCard}`).forEach((el, index) => {
      cardRefs.current[index] = el as HTMLDivElement;
    });
  }, []);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName) {
        setUserName(user.displayName);
      } else {
        setUserName(null);
      }
    });

    const ctx = gsap.context(() => {
      if (mandalaRef.current) {
        gsap.to(mandalaRef.current, {
          rotate: 360,
          duration: 60,
          repeat: -1,
          ease: "linear",
          transformOrigin: "50% 50%",
        });
      }

      // Animate cards once they are mounted
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
          }
        );
      }
    });

    return () => {
      unsubscribe();
      ctx.revert();
    };
  }, []);

 // In app/page.tsx - update categories array
const categories: Category[] = [
  {
    title: "Cotton Sarees",
    img: "/cotton-main.jpg",
    link: "/shop/cotton",
  },
  {
    title: "Silk Sarees",
    img: "/silk-main.jpg",
    link: "/shop/silk",
  },
  {
    title: "Designer Sarees",
    img: "/designer-main.jpg",
    link: "/shop/designer",
  },
  {
    title: "Daily Wear",
    img: "/daily-main.jpg",
    link: "/shop/daily-wear",
  },
];

  return (
    <>
      <HeroSlider />

      {userName && (
        <div className="text-center py-4 text-xl font-medium text-gray-800">
          Welcome, {userName}
        </div>
      )}

      <section className={styles.hero}>
        <div className={styles.mandala} ref={mandalaRef} />

        <div className={styles.content}>
          <p className={styles.tagline}>
            Timeless elegance in every drape
          </p>

          <div className={styles.sarees}>
            {categories.map((item, i) => (
              <div
                key={i}
                // ← FIXED: Use data-index instead of direct i in ref
                data-index={i}
                className={styles.categoryCard}
                onClick={() => router.push(item.link)}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                />

                <div className={styles.cardOverlay}>
                  <h3>{item.title}</h3>
                  <span>Shop Now</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrendingCollections />
    </>
  );
}