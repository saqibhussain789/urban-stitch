import { notFound } from "next/navigation";
import { fetchProductById } from "@/lib/api";
import ProductDetail from "@/components/products/product-detail";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const product = await fetchProductById(id);
    return <ProductDetail product={product} />;
  } catch {
    notFound();
  }
}
