import { fetchProducts, ApiProduct } from "@/lib/api";
import CategoryPageTemplate from "@/components/layout/category-page-template";

export default async function MenPage() {
  let categoryProducts: ApiProduct[] = [];
  try {
    const all = await fetchProducts();
    categoryProducts = all.filter((p) => p.gender === "MEN");
  } catch {
    categoryProducts = [];
  }

  return (
    <CategoryPageTemplate
      title="Premium Menswear"
      subtitle="Men's Collection"
      description="Explore our curated collection of premium Pakistani fabrics – Wash and Wear, Boski, Khadar, and more, for everyday elegance."
      products={categoryProducts}
    />
  );
}
