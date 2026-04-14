"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useUiStore } from "@/store/uiStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { setCartOpen } = useUiStore();
  const firstVariant = product.variants[0];

  const handleQuickAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!firstVariant) {
      toast.error("This product is currently unavailable.");
      return;
    }

    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: firstVariant.size,
      color: firstVariant.color,
      quantity: 1,
    });

    toast.success("Added to cart");
    setCartOpen(true);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <CardContent className="p-0">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute left-3 top-3 flex flex-col gap-2">
              {product.isSale && (
                <span className="bg-destructive text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-full shadow-sm tracking-wider">
                  Sale
                </span>
              )}
              {product.isNew && (
                <span className="bg-primary text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-full shadow-sm tracking-wider">
                  New
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={handleQuickAdd}
              className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label={`Quick add ${product.title}`}
            >
              <div className="rounded-full bg-white p-3 shadow-lg">
                <Plus className="w-5 h-5 text-gray-900" />
              </div>
            </button>
          </div>
        </Link>

        <div className="p-4">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
              {product.title}
            </h3>
          </Link>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              PKR {product.price.toLocaleString()}
            </span>

            <Button asChild size="sm">
              <Link href={`/products/${product.id}`}>
                View
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
