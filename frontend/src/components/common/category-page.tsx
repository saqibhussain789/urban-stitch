import ProductCard from "@/components/ui/product-card";
import { Product, products } from "@/lib/data";

interface CategoryPageProps {
  title: string;
  description: string;
  filter: (product: Product) => boolean;
}

export default function CategoryPage({ title, description, filter }: CategoryPageProps) {
  const filtered = products.filter(filter);

  return (
    <section className="bg-slate-50">
      <div className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                Curated Collection
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                {title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600">
                {description}
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Available</p>
              <p className="mt-4 text-5xl font-semibold text-slate-900">{filtered.length}</p>
              <p className="mt-2 text-sm text-slate-600">items ready to shop</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        {filtered.length === 0 ? (
          <div className="rounded-[2rem] border border-slate-200 bg-slate-100 p-12 text-center text-slate-600">
            No products found in this collection yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
