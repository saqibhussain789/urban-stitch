import { products } from "@/lib/data";
import CategoryPageTemplate from "@/components/layout/category-page-template";

export default function SalePage() {
  const categoryProducts = products.filter((p) => p.isSale);

  return (
    <CategoryPageTemplate
      title="Sale Event"
      subtitle="Limited Time Offers"
      description="Enjoy exclusive price drops on our premium collections. High-quality garments, exceptional value."
      products={categoryProducts}
    />
  );
}
