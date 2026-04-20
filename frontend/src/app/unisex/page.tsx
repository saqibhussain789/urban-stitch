import { fetchProducts, ApiProduct } from "@/lib/api";
import CategoryPageTemplate from "@/components/layout/category-page-template";

export default async function UnisexPage() {
  let categoryProducts: ApiProduct[] = [];
  try {
    const all = await fetchProducts();
    categoryProducts = all.filter((p) => p.gender === "UNISEX");
  } catch {
    categoryProducts = [];
  }

  return (
    <CategoryPageTemplate
      title="Everyday Essentials"
      subtitle="Unisex Collection"
      description="Versatile, perfectly proportioned clothing designed to be worn and styled by anyone."
      products={categoryProducts}
    />
  );
}
