import { products } from "@/lib/data";
import CategoryPageTemplate from "@/components/layout/category-page-template";

export default function WomenPage() {
  const categoryProducts = products.filter((p) => p.gender === "Women");

  return (
    <CategoryPageTemplate
      title="Effortless Elegance"
      subtitle="Women's Collection"
      description="Discover our premium womenswear offering clean silhouettes, rich textures, and bold modern styling."
      products={categoryProducts}
    />
  );
}
