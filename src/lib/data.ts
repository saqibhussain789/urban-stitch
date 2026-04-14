export interface ProductVariant {
  size: string;
  color: string;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  gender: "Men" | "Women" | "Unisex";
  isSale: boolean;
  isNew: boolean;
  featured?: boolean;
  variants: ProductVariant[];
  details: string[];
}

const createProductImage = (
  title: string,
  accent: string,
  background: string,
  textColor = "#FFFFFF"
) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1400" viewBox="0 0 1200 1400">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${background}" />
          <stop offset="100%" stop-color="${accent}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="1400" rx="64" fill="url(#bg)" />
      <circle cx="980" cy="240" r="180" fill="rgba(255,255,255,0.14)" />
      <circle cx="220" cy="1140" r="220" fill="rgba(255,255,255,0.08)" />
      <text x="90" y="180" fill="${textColor}" font-family="Arial, Helvetica, sans-serif" font-size="44" letter-spacing="10">BALOCH THREADS</text>
      <text x="90" y="760" fill="${textColor}" font-family="Arial, Helvetica, sans-serif" font-size="92" font-weight="700">${title}</text>
      <text x="90" y="840" fill="${textColor}" font-family="Arial, Helvetica, sans-serif" font-size="34" opacity="0.78">Premium everyday wear</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "premium-cotton-tee",
    title: "Premium Cotton Tee",
    description:
      "A heavyweight essential tee with a crisp silhouette, smooth finish, and all-day comfort.",
    price: 2500,
    compareAtPrice: 3200,
    images: [
      createProductImage("Cotton Tee", "#1F7A63", "#0F172A"),
      createProductImage("Cotton Tee", "#475569", "#111827"),
    ],
    category: "T-Shirts",
    gender: "Men",
    isSale: false,
    isNew: true,
    featured: true,
    variants: [
      { size: "S", color: "White", stock: 10 },
      { size: "M", color: "White", stock: 15 },
      { size: "L", color: "White", stock: 8 },
      { size: "S", color: "Black", stock: 12 },
      { size: "M", color: "Black", stock: 10 },
      { size: "L", color: "Black", stock: 5 },
    ],
    details: [
      "230 GSM premium cotton jersey",
      "Relaxed fit with reinforced neckline",
      "Built for everyday rotation",
    ],
  },
  {
    id: "2",
    slug: "classic-denim-jacket",
    title: "Classic Denim Jacket",
    description:
      "Structured denim outerwear with a clean wash and versatile layering fit for every season.",
    price: 8500,
    compareAtPrice: 9900,
    images: [
      createProductImage("Denim Jacket", "#2563EB", "#0F172A"),
      createProductImage("Denim Jacket", "#334155", "#1E293B"),
    ],
    category: "Jackets",
    gender: "Unisex",
    isSale: true,
    isNew: true,
    featured: true,
    variants: [
      { size: "M", color: "Blue", stock: 5 },
      { size: "L", color: "Blue", stock: 7 },
      { size: "XL", color: "Blue", stock: 3 },
    ],
    details: [
      "Mid-weight rigid denim",
      "Signature metal hardware",
      "Relaxed silhouette for layering",
    ],
  },
  {
    id: "3",
    slug: "slim-fit-jeans",
    title: "Slim Fit Jeans",
    description:
      "Modern slim-leg jeans designed with stretch comfort and a sharp, everyday wash.",
    price: 5500,
    images: [
      createProductImage("Slim Jeans", "#1D4ED8", "#111827"),
      createProductImage("Slim Jeans", "#111827", "#334155"),
    ],
    category: "Jeans",
    gender: "Men",
    isSale: false,
    isNew: false,
    featured: true,
    variants: [
      { size: "30", color: "Dark Blue", stock: 8 },
      { size: "32", color: "Dark Blue", stock: 10 },
      { size: "34", color: "Dark Blue", stock: 6 },
      { size: "30", color: "Black", stock: 5 },
      { size: "32", color: "Black", stock: 7 },
      { size: "34", color: "Black", stock: 4 },
    ],
    details: [
      "Flexible denim blend",
      "Tailored slim leg",
      "Clean everyday finish",
    ],
  },
  {
    id: "4",
    slug: "hooded-sweatshirt",
    title: "Hooded Sweatshirt",
    description:
      "Soft fleece hoodie with a premium hand feel and an elevated, relaxed fit.",
    price: 4200,
    images: [
      createProductImage("Hoodie", "#64748B", "#0F172A"),
      createProductImage("Hoodie", "#1E40AF", "#111827"),
    ],
    category: "Hoodies",
    gender: "Unisex",
    isSale: false,
    isNew: true,
    featured: true,
    variants: [
      { size: "S", color: "Gray", stock: 12 },
      { size: "M", color: "Gray", stock: 15 },
      { size: "L", color: "Gray", stock: 10 },
      { size: "S", color: "Navy", stock: 8 },
      { size: "M", color: "Navy", stock: 10 },
      { size: "L", color: "Navy", stock: 6 },
    ],
    details: [
      "Brushed inner fleece",
      "Double-lined hood",
      "Relaxed premium fit",
    ],
  },
  {
    id: "5",
    slug: "leather-boots",
    title: "Leather Boots",
    description:
      "Durable leather boots with a strong profile and refined finish for everyday wear.",
    price: 12000,
    compareAtPrice: 14500,
    images: [
      createProductImage("Leather Boots", "#8B5E3C", "#1C1917"),
      createProductImage("Leather Boots", "#292524", "#57534E"),
    ],
    category: "Footwear",
    gender: "Men",
    isSale: true,
    isNew: false,
    variants: [
      { size: "8", color: "Brown", stock: 4 },
      { size: "9", color: "Brown", stock: 6 },
      { size: "10", color: "Brown", stock: 5 },
      { size: "8", color: "Black", stock: 3 },
      { size: "9", color: "Black", stock: 5 },
      { size: "10", color: "Black", stock: 4 },
    ],
    details: [
      "Textured leather upper",
      "Cushioned insole",
      "Strong grip outsole",
    ],
  },
  {
    id: "6",
    slug: "wool-scarf",
    title: "Wool Scarf",
    description:
      "A soft brushed scarf that adds warmth, texture, and polish to winter fits.",
    price: 1800,
    images: [
      createProductImage("Wool Scarf", "#B91C1C", "#7F1D1D"),
      createProductImage("Wool Scarf", "#475569", "#1E293B"),
    ],
    category: "Accessories",
    gender: "Women",
    isSale: false,
    isNew: true,
    variants: [
      { size: "One Size", color: "Red", stock: 20 },
      { size: "One Size", color: "Blue", stock: 15 },
      { size: "One Size", color: "Gray", stock: 18 },
    ],
    details: [
      "Soft brushed wool blend",
      "Oversized for layering",
      "Lightweight winter warmth",
    ],
  },
  {
    id: "7",
    slug: "cropped-zip-jacket",
    title: "Cropped Zip Jacket",
    description:
      "A cropped women’s jacket with a clean zip front and structured shape for elevated layering.",
    price: 6900,
    images: [
      createProductImage("Zip Jacket", "#7C3AED", "#1F2937"),
      createProductImage("Zip Jacket", "#BE185D", "#312E81"),
    ],
    category: "Jackets",
    gender: "Women",
    isSale: false,
    isNew: true,
    variants: [
      { size: "S", color: "Berry", stock: 9 },
      { size: "M", color: "Berry", stock: 7 },
      { size: "L", color: "Berry", stock: 4 },
    ],
    details: [
      "Structured cropped silhouette",
      "Smooth zip-front closure",
      "Premium satin lining",
    ],
  },
  {
    id: "8",
    slug: "relaxed-track-pants",
    title: "Relaxed Track Pants",
    description:
      "Easy straight-leg track pants cut in a premium knit for casual comfort and a polished look.",
    price: 3600,
    images: [
      createProductImage("Track Pants", "#0F766E", "#0F172A"),
      createProductImage("Track Pants", "#374151", "#111827"),
    ],
    category: "Bottoms",
    gender: "Unisex",
    isSale: false,
    isNew: true,
    variants: [
      { size: "S", color: "Forest", stock: 9 },
      { size: "M", color: "Forest", stock: 12 },
      { size: "L", color: "Forest", stock: 8 },
      { size: "M", color: "Black", stock: 10 },
      { size: "L", color: "Black", stock: 8 },
    ],
    details: [
      "Soft premium knit fabric",
      "Relaxed straight-leg cut",
      "Elastic waistband with drawcord",
    ],
  },
];

export const categories = [
  "All",
  "T-Shirts",
  "Jackets",
  "Jeans",
  "Hoodies",
  "Footwear",
  "Accessories",
  "Bottoms",
];

export const getProductById = (id: string) =>
  products.find((product) => product.id === id);

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);
