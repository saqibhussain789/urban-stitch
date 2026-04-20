import { PrismaClient, Gender } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


const categories = [
  "Wash and Wear",
  "Cotton",
  "Boski",
  "Latha",
  "Khadar",
  "Silk"
];

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
      <text x="90" y="180" fill="${textColor}" font-family="Arial, Helvetica, sans-serif" font-size="44" letter-spacing="10">BALOCH FABRICS</text>
      <text x="90" y="760" fill="${textColor}" font-family="Arial, Helvetica, sans-serif" font-size="92" font-weight="700">${title}</text>
      <text x="90" y="840" fill="${textColor}" font-family="Arial, Helvetica, sans-serif" font-size="34" opacity="0.78">Premium Men's Wear</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

async function main() {
  console.log('Seeding database...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create Categories
  const categoryMap = new Map();
  for (const name of categories) {
    const cat = await prisma.category.create({
      data: { name },
    });
    categoryMap.set(name, cat.id);
  }

  // Create Products
  const products = [
    {
      title: "Premium Wash and Wear Suit",
      description: "A lightweight, wrinkle-resistant wash and wear fabric perfect for formal and everyday use.",
      price: 3500,
      categoryId: categoryMap.get("Wash and Wear"),
      isSale: false,
      isNew: true,
      gender: Gender.MEN,
      images: [
        { url: createProductImage("Wash & Wear", "#475569", "#0F172A") },
      ],
      variants: [
        { size: "S", color: "White", stock: 20, sku: "WW-W-S" },
        { size: "M", color: "White", stock: 20, sku: "WW-W-M" },
        { size: "L", color: "White", stock: 20, sku: "WW-W-L" },
        { size: "M", color: "Navy", stock: 15, sku: "WW-N-M" }
      ]
    },
    {
      title: "Classic Egyptian Cotton",
      description: "100% pure Egyptian cotton offering a crisp look and ultimate breathability in summer.",
      price: 4500,
      categoryId: categoryMap.get("Cotton"),
      isSale: false,
      isNew: true,
      gender: Gender.MEN,
      images: [
        { url: createProductImage("Pure Cotton", "#1F7A63", "#064E3B") },
      ],
      variants: [
        { size: "M", color: "White", stock: 30, sku: "CT-W-M" },
        { size: "L", color: "White", stock: 30, sku: "CT-W-L" },
        { size: "M", color: "Black", stock: 25, sku: "CT-B-M" }
      ]
    },
    {
      title: "Original Boski",
      description: "Authentic, high-grade Boski silk with its signature drape and subtle sheen. Perfect for weddings.",
      price: 12000,
      categoryId: categoryMap.get("Boski"),
      isSale: true,
      isNew: false,
      gender: Gender.MEN,
      images: [
        { url: createProductImage("Original Boski", "#B45309", "#78350F") },
      ],
      variants: [
        { size: "M", color: "Cream", stock: 10, sku: "BO-C-M" },
        { size: "L", color: "Cream", stock: 15, sku: "BO-C-L" }
      ]
    },
    {
      title: "Premium Kamalia Khadar",
      description: "Hand-loomed, genuine Kamalia Khadar providing excellent warmth and durability for winter.",
      price: 2800,
      categoryId: categoryMap.get("Khadar"),
      isSale: false,
      isNew: true,
      gender: Gender.MEN,
      images: [
        { url: createProductImage("Khadar", "#450A0A", "#7F1D1D") },
      ],
      variants: [
        { size: "S", color: "Mustard", stock: 12, sku: "KH-M-S" },
        { size: "M", color: "Mustard", stock: 20, sku: "KH-M-M" },
        { size: "L", color: "Mustard", stock: 18, sku: "KH-M-L" },
        { size: "M", color: "Rust", stock: 15, sku: "KH-R-M" }
      ]
    },
    {
      title: "Latha Shalwar Kameez",
      description: "Stiff and brilliant white Latha fabric, the gold standard for traditional Pakistani menswear.",
      price: 3200,
      categoryId: categoryMap.get("Latha"),
      isSale: false,
      isNew: false,
      gender: Gender.MEN,
      images: [
        { url: createProductImage("Latha", "#E2E8F0", "#94A3B8", "#0F172A") },
      ],
      variants: [
        { size: "S", color: "White", stock: 40, sku: "LA-W-S" },
        { size: "M", color: "White", stock: 45, sku: "LA-W-M" },
        { size: "L", color: "White", stock: 40, sku: "LA-W-L" }
      ]
    }
  ];

  for (const p of products) {
    const { images, variants, ...productData } = p;
    await prisma.product.create({
      data: {
        ...productData,
        images: {
          create: images
        },
        variants: {
          create: variants
        }
      }
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
