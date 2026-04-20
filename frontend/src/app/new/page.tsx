import { fetchProducts, ApiProduct } from "@/lib/api";
import CategoryPageTemplate from "@/components/layout/category-page-template";

export default async function NewArrivalsPage() {
  let categoryProducts: ApiProduct[] = [];
  try {
    const all = await fetchProducts();
    categoryProducts = all.filter((p) => p.isNew);
  } catch {
    categoryProducts = [];
  }

  return (
    <CategoryPageTemplate
      title="New Arrivals"
      subtitle="Latest Drops"
      description="Be the first to experience our latest premium garments. Fresh cuts, new palettes, identical standard of quality."
      products={categoryProducts}
    />
  );
}
