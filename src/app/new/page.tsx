import { products } from "@/lib/data";
import CategoryPageTemplate from "@/components/layout/category-page-template";

export default function NewArrivalsPage() {
  const categoryProducts = products.filter((p) => p.isNew);

  return (
    <CategoryPageTemplate
      title="New Arrivals"
      subtitle="Latest Drops"
      description="Be the first to experience our latest premium garments. Fresh cuts, new palettes, identical standard of quality."
      products={categoryProducts}
    />
  );
}
