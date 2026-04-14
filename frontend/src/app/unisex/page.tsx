import { products } from "@/lib/data";
import CategoryPageTemplate from "@/components/layout/category-page-template";

export default function UnisexPage() {
  const categoryProducts = products.filter((p) => p.gender === "Unisex");

  return (
    <CategoryPageTemplate
      title="Everyday Essentials"
      subtitle="Unisex Collection"
      description="Versatile, perfectly proportioned clothing designed to be worn and styled by anyone."
      products={categoryProducts}
    />
  );
}
