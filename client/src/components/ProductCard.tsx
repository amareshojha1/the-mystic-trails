import { Link } from "wouter";
import { type Product } from "@shared/schema";
import { useAddToCart } from "@/hooks/use-cart";
import { ShoppingBag, Star } from "lucide-react";
import { Button } from "./ui/button";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3 h-3 ${star <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-border"}`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const addToCart = useAddToCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart.mutate({ productId: product.id, quantity: 1 });
  };

  return (
    <Link href={`/product/${product.id}`} className="group block" data-testid={`card-product-${product.id}`}>
      <div className="relative">
        <div className="aspect-[3/4] overflow-hidden bg-secondary/30 rounded-md">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.isFeatured && (
            <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Bestseller
            </span>
          )}
          <div className="absolute bottom-4 right-4 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              size="icon"
              className="rounded-full shadow-lg"
              onClick={handleAdd}
              disabled={addToCart.isPending}
              data-testid={`button-add-cart-${product.id}`}
            >
              <ShoppingBag className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="mt-4 space-y-1">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">{product.category}</p>
          <h3 className="font-heading font-medium text-base text-foreground line-clamp-1" data-testid={`text-product-name-${product.id}`}>{product.name}</h3>
          {product.rating && <StarRating rating={product.rating} />}
          <p className="text-sm font-semibold text-primary" data-testid={`text-product-price-${product.id}`}>&#8377;{product.price}</p>
        </div>
      </div>
    </Link>
  );
}
