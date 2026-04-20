import { fetchProducts, ApiProduct } from "@/lib/api";
import CategoryPageTemplate from "@/components/layout/category-page-template";

export default async function WomenPage() {
  let categoryProducts: ApiProduct[] = [];
  try {
    const all = await fetchProducts();
    categoryProducts = all.filter((p) => p.gender === "WOMEN");
  } catch {
    categoryProducts = [];
  }

  return (
    <CategoryPageTemplate
      title="Effortless Elegance"
      subtitle="Women's Collection"
      description="Discover our premium womenswear offering clean silhouettes, rich textures, and bold modern styling."
      products={categoryProducts}
    />
  );
}
