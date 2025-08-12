import { Product, currency } from "@/data/products";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const ProductCard = ({ product }: { product: Product }) => {
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  
  return (
    <Card className="group overflow-hidden card-hover shadow-soft h-full">
      <CardContent className="p-0">
        {/* Product Image - Tỉ lệ 920×430 (≈2.14:1) */}
        <Link to={`/product/${product.slug}`} className="block relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy" 
            className="w-full h-32 sm:h-36 lg:h-40 object-cover transition-transform duration-300 group-hover:scale-105 aspect-product" 
          />
          {discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-medium">
              -{discount}%
            </Badge>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </Link>
        
        {/* Product Info */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-sm sm:text-base leading-tight text-balance line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg sm:text-xl font-bold gradient-text">
              {currency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {currency(product.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Action Button */}
          <div className="pt-2">
            <Button variant="soft" asChild className="w-full btn-soft">
              <Link to={`/product/${product.slug}`}>
                Xem chi tiết
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
