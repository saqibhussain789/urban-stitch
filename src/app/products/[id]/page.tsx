import { notFound } from "next/navigation";
import { getProductById } from "@/lib/data";
import ProductDetail from "@/components/products/product-detail";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
