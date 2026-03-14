// frontend/lib/products.ts

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];                    // Multiple images
  mainImage: string;                   // Primary image (first in array)
  available: boolean;
  category: string;

  // New detailed fields
  fabric: string;
  weave: string;
  length: string;
  blouse: string;
  washCare: string[];
  highlights: string[];
  occasion?: string;
  type: string; // ← Added for sub-category filtering (e.g., maheshwari, banarasi, kota-doriya)
};

const allProducts: Product[] = [
  {
    id: '1',
    title: 'Maheshwari Silk Cotton Saree',
    description: '(Saree L- 5.50 m, Blouse 85 cm)',
    price: 2950,
    images: ['/saree1.png', '/saree1-2.png', '/saree1-3.png'],
    mainImage: '/saree1.png',
    available: true,
    category: 'SAREES',
    fabric: 'Silk Cotton Blend',
    weave: 'Handwoven Maheshwari',
    length: 'Saree: 5.50 meters',
    blouse: '85 cm (included)',
    washCare: ['Dry clean only', 'Do not bleach', 'Iron on reverse side'],
    highlights: [
      'Lightweight and breathable',
      'Intricate zari border',
      'Soft drape with elegant fall',
      'Perfect for day events and office wear',
    ],
    occasion: 'Casual, Office, Day Events',
    type: 'maheshwari', // ← Added
  },
  {
    id: '2',
    title: 'Kota Doriya Saree',
    description: '(Saree L- 5.40 m, Blouse 80 cm)',
    price: 2650,
    images: ['/saree2.png', '/saree2-2.png'],
    mainImage: '/saree2.png',
    available: true,
    category: 'SAREES',
    fabric: 'Kota Cotton',
    weave: 'Kota Doriya Check Pattern',
    length: 'Saree: 5.40 meters',
    blouse: '80 cm (included)',
    washCare: ['Gentle hand wash', 'Use mild detergent', 'Dry in shade'],
    highlights: [
      'Signature square check pattern',
      'Extremely lightweight and airy',
      'Perfect for summer',
      'Traditional Rajasthani craftsmanship',
    ],
    occasion: 'Summer, Casual, Daily Wear',
    type: 'kota-doriya', // ← Added
  },
  {
    id: '3',
    title: 'Premium Silk Saree',
    description: 'Luxury handwoven silk',
    price: 4500,
    images: ['/saree3.png'],
    mainImage: '/saree3.png',
    available: true,
    category: 'SAREES',
    fabric: 'Pure Silk',
    weave: 'Banarasi Style Handloom',
    length: 'Saree: 5.50 meters',
    blouse: '90 cm (unstitched)',
    washCare: ['Dry clean recommended', 'Store in muslin cloth'],
    highlights: [
      'Rich silk texture with golden zari',
      'Timeless elegance',
      'Ideal for weddings and festivals',
      'Heavy border and pallu',
    ],
    occasion: 'Weddings, Festive, Parties',
    type: 'banarasi', // ← Added
  },
  {
    id: '4',
    title: 'Premium Tissue Silk Saree',
    description: 'Luxury handwoven silk',
    price: 2500,
    images: ['/saree4.png'],
    mainImage: '/saree4.png',
    available: true,
    category: 'SAREES',
    fabric: 'Tissue Silk',
    weave: 'Lightweight Tissue Weave',
    length: 'Saree: 5.50 meters',
    blouse: '80 cm (included)',
    washCare: ['Dry clean only', 'Avoid direct sunlight'],
    highlights: [
      'Shimmery tissue finish',
      'Light as air with metallic glow',
      'Modern yet ethnic look',
      'Crush-resistant fabric',
    ],
    occasion: 'Parties, Evenings, Receptions',
    type: 'tissue', // ← Added
  },
];

export async function getProduct(id: string): Promise<Product | null> {
  return allProducts.find(p => p.id === id) || null;
}

export async function getProducts(): Promise<Product[]> {
  return allProducts;
}