import Link from "next/link";

interface PageSectionProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}

const pageHighlights = [
  {
    title: "Premium Materials",
    description: "High-quality fabrics and elevated finishes built for everyday luxury.",
  },
  {
    title: "Refined Silhouettes",
    description: "Minimal shapes designed for effortless layering and modern styling.",
  },
  {
    title: "Consciously Crafted",
    description: "Thoughtful details with versatile pieces made to last.",
  },
];

export default function PageSection({
  title,
  description,
  buttonText = "Back to shop",
  buttonHref = "/products",
}: PageSectionProps) {
  return (
    <section className="relative bg-white pt-8 md:pt-10 pb-20">
      <div className="absolute inset-x-0 top-0 h-24 bg-[#f5f5f5]" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 rounded-[2rem] border border-[#e5e5e5] bg-white p-10 shadow-[0_20px_60px_rgba(17,17,17,0.08)]">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.36em] text-[#1F7A63] mb-4">Curated Collection</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#111111] leading-tight mb-6">
              {title}
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-[#555555] leading-relaxed">
              {description}
            </p>
            <div className="mt-10">
              <Link
                href={buttonHref}
                className="inline-flex items-center justify-center rounded-full bg-[#1F7A63] px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-[#1f7a63]/20 transition hover:bg-[#196c55]"
              >
                {buttonText}
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {pageHighlights.map((highlight) => (
            <div key={highlight.title} className="rounded-[1.5rem] border border-[#e5e5e5] bg-[#f9faf9] p-6 text-center shadow-sm transition hover:shadow-lg">
              <h2 className="text-xl font-semibold text-[#111111] mb-3">{highlight.title}</h2>
              <p className="text-sm leading-6 text-[#555555]">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
