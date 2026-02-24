import { useProduct, useProducts } from "@/hooks/use-products";
import { useRoute } from "wouter";
import { useAddToCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag, Truck, ShieldCheck, Leaf, Star } from "lucide-react";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCard } from "@/components/ProductCard";

const scentProfiles: Record<string, { top: string; heart: string; base: string }> = {
  "Chandana Veda": { top: "Marigold, Rose Petal", heart: "Sandalwood, Tulsi", base: "Earth, Warm Resin" },
  "Natural Sambrani Cups": { top: "Camphor, Eucalyptus", heart: "Sambrani, Flower Ash", base: "Deep Wood, Musk" },
  "Organic Loban Cones": { top: "Loban, Frankincense", heart: "Petal Powder, Myrrh", base: "Sacred Ash, Earth" },
  "Dry Flower Candles": { top: "Rose, Jasmine", heart: "Soy Wax, Dried Petals", base: "Vanilla, Warm Amber" },
  "Linen Mists": { top: "Neroli, Bergamot", heart: "Jasmine, Rose Water", base: "White Musk, Cedar" },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" data-testid="display-star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-border"}`}
        />
      ))}
      <span className="text-sm text-muted-foreground ml-2">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ProductDetails() {
  const [match, params] = useRoute("/product/:id");
  const id = parseInt(params?.id || "0");
  const { data: product, isLoading } = useProduct(id);
  const { data: allProducts } = useProducts();
  const addToCart = useAddToCart();
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 container-wide">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 animate-pulse">
          <div className="aspect-[3/4] bg-secondary/30 rounded-md" />
          <div className="space-y-6 pt-8">
            <div className="h-3 bg-secondary/30 rounded w-1/4" />
            <div className="h-8 bg-secondary/30 rounded w-3/4" />
            <div className="h-5 bg-secondary/30 rounded w-1/4" />
          </div>
        </div>
      </div>
    );
  }
  if (!product) return <div className="h-screen flex items-center justify-center text-muted-foreground">Product not found</div>;

  const handleAddToCart = () => {
    addToCart.mutate({ productId: product.id, quantity });
  };

  const scent = scentProfiles[product.name];
  const relatedProducts = allProducts?.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4) || [];

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
        <div>
          <div className="aspect-[3/4] bg-secondary/20 rounded-md overflow-hidden md:sticky md:top-28">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              data-testid="img-product-main"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4 border-b border-border pb-8">
            <div className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]" data-testid="text-product-category">{product.category}</div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading italic" data-testid="text-product-title">{product.name}</h1>
            {product.rating && <StarRating rating={product.rating} />}
            <div className="text-2xl font-semibold text-primary" data-testid="text-product-price">&#8377;{product.price}</div>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-product-description">
              {product.description}
            </p>
          </div>

          {scent && (
            <div className="bg-secondary/30 rounded-md p-6 space-y-4" data-testid="section-scent-profile">
              <h3 className="text-sm uppercase tracking-widest font-bold text-foreground">Scent Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Top Notes</div>
                  <div className="text-sm font-medium text-foreground">{scent.top}</div>
                </div>
                <div className="space-y-2 sm:border-x border-border">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Heart Notes</div>
                  <div className="text-sm font-medium text-foreground">{scent.heart}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Base Notes</div>
                  <div className="text-sm font-medium text-foreground">{scent.base}</div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center border border-border rounded-full p-1 bg-background">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-foreground"
                  data-testid="button-quantity-minus"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center font-medium" data-testid="text-quantity">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-foreground"
                  data-testid="button-quantity-plus"
                >
                  <Plus size={14} />
                </button>
              </div>
              <Button
                size="lg"
                className="flex-1 rounded-none text-[11px] uppercase tracking-[0.2em] font-bold"
                onClick={handleAddToCart}
                disabled={addToCart.isPending}
                data-testid="button-add-to-cart"
              >
                {addToCart.isPending ? "Adding..." : "Add to Satchel"}
                <ShoppingBag className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 py-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-secondary/30 rounded-full flex items-center justify-center text-primary">
                <Leaf size={20} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider">100% Organic</div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-secondary/30 rounded-full flex items-center justify-center text-primary">
                <ShieldCheck size={20} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider">Toxin Free</div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-secondary/30 rounded-full flex items-center justify-center text-primary">
                <Truck size={20} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider">Eco Shipping</div>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="ingredients">
              <AccordionTrigger className="font-heading text-base">Ingredients</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Recycled temple flowers, natural essential oils, wood dust, and organic binding agents. Charcoal-free and sulphur-free.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="usage">
              <AccordionTrigger className="font-heading text-base">How to Use</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Light the coated end of the stick/cone. Allow flame to catch, then gently blow out the flame. Place on a heat-resistant stand and enjoy the sacred fragrance.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="impact">
              <AccordionTrigger className="font-heading text-base">Impact</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Every purchase prevents flower waste from polluting our rivers and provides dignified livelihood to marginalized women artisans in rural India.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="container-wide mt-24">
          <h2 className="text-2xl font-heading italic mb-12">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
