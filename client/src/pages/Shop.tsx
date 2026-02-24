import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";

export default function Shop() {
  const { data: products, isLoading } = useProducts();
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialCategory = searchParams.get("category") || "All";

  const [filter, setFilter] = useState(initialCategory);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category") || "All";
    setFilter(cat);
  }, [location]);

  const categories = ["All", "Incense", "Lifestyle", "Hampers"];

  const filteredProducts = products?.filter(p =>
    filter === "All" ? true : p.category === filter
  ) || [];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="bg-secondary/30 py-16 mb-12">
        <div className="container-wide text-center space-y-4">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">Handcrafted with Purpose</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading italic" data-testid="text-shop-title">Shop Our Collection</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Bring the serenity of the temple into your home with our consciously crafted products.
          </p>
        </div>
      </div>

      <div className="container-wide">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              data-testid={`button-filter-${cat.toLowerCase()}`}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                filter === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-background text-muted-foreground border-border hover:border-primary/30"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4 animate-pulse">
                <div className="bg-secondary/50 aspect-[3/4] rounded-md" />
                <div className="h-3 bg-secondary/50 rounded w-1/3" />
                <div className="h-4 bg-secondary/50 rounded w-2/3" />
                <div className="h-3 bg-secondary/50 rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No products found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
