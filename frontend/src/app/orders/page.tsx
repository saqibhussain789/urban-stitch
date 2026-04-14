import Link from "next/link";

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-white pt-10 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Received</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your order! Your cash on delivery order is being processed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-3 text-white hover:bg-gray-800 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
