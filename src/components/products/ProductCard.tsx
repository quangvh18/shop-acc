import { Product, currency } from "@/data/products";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }: { product: Product }) => {
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  return (
    <article className="group rounded-lg border bg-card p-3 shadow-sm transition hover:shadow-md">
      <Link to={`/product/${product.slug}`} className="block overflow-hidden rounded-md">
        <img src={product.image} alt={product.name} loading="lazy" className="aspect-[2/1] w-full object-cover transition group-hover:scale-105" />
      </Link>
      <div className="mt-3 space-y-1">
        <h3 className="line-clamp-2 text-sm font-thin">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">{currency(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">{currency(product.originalPrice)}</span>
          )}
          {discount > 0 && (
            <span className="ml-auto rounded bg-destructive/10 px-2 py-0.5 text-xs font-bold text-destructive">-{discount}%</span>
          )}
        </div>
        <div className="pt-2">
          <Button variant="soft" asChild>
            <Link to={`/product/${product.slug}`}>Xem chi tiết</Link>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
