"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { useUiStore } from "@/store/uiStore";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.size ?? "");
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color ?? "");
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCartStore();
  const { setCartOpen } = useUiStore();

  const sizes = [...new Set(product.variants.map((variant) => variant.size))];

  const availableColors = useMemo(() => {
    if (!selectedSize) {
      return [...new Set(product.variants.map((variant) => variant.color))];
    }

    return [
      ...new Set(
        product.variants
          .filter((variant) => variant.size === selectedSize)
          .map((variant) => variant.color)
      ),
    ];
  }, [product.variants, selectedSize]);

  const selectedVariant = product.variants.find(
    (variant) => variant.size === selectedSize && variant.color === selectedColor
  );

  const relatedProducts = products
    .filter(
      (item) =>
        item.id !== product.id &&
        (item.category === product.category || item.gender === product.gender)
    )
    .slice(0, 3);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);

    const matchingVariant = product.variants.find(
      (variant) => variant.size === size && variant.color === selectedColor
    );

    if (!matchingVariant) {
      const fallbackVariant = product.variants.find((variant) => variant.size === size);
      setSelectedColor(fallbackVariant?.color ?? "");
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }

    if (!selectedVariant || selectedVariant.stock < quantity) {
      toast.error("Selected variant is out of stock");
      return;
    }

    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
    });

    toast.success("Added to cart!");
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <Link href="/products" className="transition hover:text-slate-900">
            Products
          </Link>
          <span>/</span>
          <span>{product.category}</span>
        </div>

        <Card className="overflow-hidden border-slate-200 bg-white p-0 shadow-sm">
          <CardContent className="grid grid-cols-1 gap-10 p-6 lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
            <div className="space-y-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-100">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition ${
                      selectedImage === index
                        ? "border-slate-900"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  {product.isNew ? <Badge>New Arrival</Badge> : null}
                  {product.isSale ? <Badge variant="outline">Sale</Badge> : null}
                </div>

                <div>
                  <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                    {product.title}
                  </h1>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-end gap-3">
                  <p className="text-3xl font-semibold text-slate-900">
                    PKR {product.price.toLocaleString()}
                  </p>
                  {product.compareAtPrice ? (
                    <p className="pb-1 text-base text-slate-400 line-through">
                      PKR {product.compareAtPrice.toLocaleString()}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Variant</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {selectedVariant
                        ? `${selectedVariant.stock} pieces in stock`
                        : "Select size and color"}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-[#1F7A63]">
                    COD available
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-medium text-slate-900">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSizeSelect(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="mb-3 text-sm font-medium text-slate-900">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableColors.map((color) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="mb-3 text-sm font-medium text-slate-900">Quantity</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="inline-flex min-w-12 justify-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-900">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setQuantity(
                          Math.min(selectedVariant?.stock ?? quantity + 1, quantity + 1)
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full py-6 text-base"
                    size="lg"
                  >
                    Add to Cart
                  </Button>
                  <Button asChild variant="outline" className="w-full py-6 text-base">
                    <Link href="/checkout">Buy Now</Link>
                  </Button>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
                <h2 className="text-lg font-semibold text-slate-900">
                  Product details
                </h2>
                <div className="mt-4 space-y-3">
                  {product.details.map((detail) => (
                    <div key={detail} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#1F7A63]" />
                      <p className="text-sm leading-6 text-slate-600">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {relatedProducts.length > 0 ? (
          <div className="mt-14">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  You may also like
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  Related products
                </h2>
              </div>
              <Link
                href="/products"
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                View all
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.id}`}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-100">
                    <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                      {item.category}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      PKR {item.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
