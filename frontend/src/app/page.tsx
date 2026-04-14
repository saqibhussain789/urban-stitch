import Hero from "@/components/home/hero";
import FeaturedProducts from "@/components/home/featured-products";
import HomeCategories from "@/components/home/categories";
import Newsletter from "@/components/home/newsletter";

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <HomeCategories />
      <FeaturedProducts />
      <Newsletter />
    </div>
  );
}