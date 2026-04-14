import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  price: number;
  image: string;
};

export default function ProductCard({ title, price, image }: Props) {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
      <img
        src={image}
        alt={title}
        className="h-60 w-full object-cover rounded-t-2xl"
      />

      <CardContent className="p-4">
        <h2 className="font-semibold">{title}</h2>
        <p className="text-gray-600">${price}</p>

        <Button className="mt-3 w-full">
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}