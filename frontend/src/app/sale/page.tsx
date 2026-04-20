import { fetchProducts, ApiProduct } from "@/lib/api";
import CategoryPageTemplate from "@/components/layout/category-page-template";

export default async function SalePage() {
  let categoryProducts: ApiProduct[] = [];
  try {
    const all = await fetchProducts();
    categoryProducts = all.filter((p) => p.isSale);
  } catch {
    categoryProducts = [];
  }

  return (
    <CategoryPageTemplate
      title="Sale Event"
      subtitle="Limited Time Offers"
      description="Enjoy exclusive price drops on our premium collections. High-quality garments, exceptional value."
      products={categoryProducts}
    />
  );
}
