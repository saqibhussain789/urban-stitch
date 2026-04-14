import { products } from "@/lib/data";
import CategoryPageTemplate from "@/components/layout/category-page-template";

export default function MenPage() {
  const categoryProducts = products.filter((p) => p.gender === "Men");

  return (
    <CategoryPageTemplate
      title="Premium Menswear"
      subtitle="Men's Collection"
      description="Explore new hoodies, tees, and jackets designed for comfort, impact, and timeless everyday wear."
      products={categoryProducts}
    />
  );
}
