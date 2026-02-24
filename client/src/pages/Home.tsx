import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Leaf, Heart, Sparkles, RefreshCw, Droplets } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: products, isLoading } = useProducts();
  const featuredProducts = products?.filter(p => p.isFeatured) || [];
  const allProducts = products || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:h-[90vh] flex items-center overflow-hidden bg-[#1A2421]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/home-hero.jpg"
            alt="Sacred incense burning"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A2421] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container-wide w-full text-left pt-24 pb-12 md:pt-20 md:pb-0">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-accent/20 border border-accent/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-6 sm:mb-8"
            >
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent" data-testid="text-hero-badge">
                India's Spiritual Regenerative Brand
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-heading text-white mb-6 sm:mb-8 leading-[1.1] tracking-tight"
              data-testid="text-hero-title"
            >
              Where Flowers <br />Find a <span className="italic text-accent">Second Life.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-base sm:text-lg md:text-xl font-light mb-8 sm:mb-12 max-w-xl leading-relaxed italic"
              data-testid="text-hero-subtitle"
            >
              "We rescue temple flowers from landfills and transform them into soulful, 100% organic fragrances for your sanctuary."
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <Button size="lg" className="rounded-none px-8 sm:px-12 py-5 sm:py-6 text-[11px] uppercase tracking-[0.2em] font-bold shadow-2xl" asChild>
                <Link href="/shop" data-testid="link-shop-hero">Shop Organic</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-none px-8 sm:px-12 py-5 sm:py-6 text-[11px] uppercase tracking-[0.2em] font-bold bg-white/5 backdrop-blur-xl text-white border-white/20" asChild>
                <Link href="/about" data-testid="link-story-hero">The Mission</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Section - "The Unseen Journey" */}
      <section className="py-16 sm:py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">The Problem</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading italic mb-8 leading-tight" data-testid="text-impact-title">
                The Unseen Journey of a Million Prayers
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                <p>
                  India is home to over <span className="text-primary font-bold">61,000 temples</span> where every morning begins with lakhs of devotees offering fresh flowers.
                </p>
                <p className="bg-accent/10 border-l-4 border-accent p-6 italic text-foreground font-medium rounded-r-md">
                  "But once the prayers are over, these flowers are swept into garbage bags, rotting in landfills and contaminating our groundwater."
                </p>
                <p>
                  The Mystic Trails gives these blessings a new beginning by rescuing them from the waste stream. Every marigold and rose you smell in our sticks was once a part of someone's sacred offering.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/5 rounded-[40px] transform rotate-3 group-hover:rotate-0 transition-transform duration-700" />
              <img
                src="/images/about-flowers.jpg"
                alt="Sacred temple flower offerings"
                className="relative z-10 rounded-[32px] shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-1000 w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - "From Petal to Product" */}
      <section className="py-16 sm:py-24 bg-background border-y border-border">
        <div className="container-wide">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl font-heading italic" data-testid="text-process-title">From Petal to Product</h2>
            <div className="w-20 h-[2px] bg-primary/20 mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            {[
              { icon: <RefreshCw />, title: "Collect", desc: "Temple flowers rescued from 20+ temples daily." },
              { icon: <Droplets />, title: "Sort & Dry", desc: "Innovative solar drying techniques." },
              { icon: <Leaf />, title: "Grind", desc: "Pure floral powder mixed with natural resins." },
              { icon: <Sparkles />, title: "Create", desc: "Soulful, handcrafted lifestyle products." }
            ].map((step, i) => (
              <div key={i} className="text-center flex flex-col items-center group" data-testid={`card-process-${i}`}>
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  {step.icon}
                </div>
                <h3 className="text-sm uppercase tracking-widest font-bold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm italic leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products / "The Collections" */}
      <section className="py-16 sm:py-24 lg:py-32 bg-secondary/20">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 sm:mb-20">
            <div className="max-w-xl">
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Handcrafted with Purpose</span>
              <h2 className="text-3xl sm:text-4xl font-heading italic" data-testid="text-collections-title">The Collections</h2>
            </div>
            <Button variant="ghost" className="text-primary hover:bg-transparent hover:underline underline-offset-4" asChild>
              <Link href="/shop" data-testid="link-view-all">View All Products <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {(featuredProducts.length > 0 ? featuredProducts : allProducts.slice(0, 4)).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-20 bg-primary text-primary-foreground">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-primary-foreground/20">
            <div className="p-6 space-y-4">
              <Leaf className="w-10 h-10 mx-auto text-accent" />
              <div className="text-3xl sm:text-4xl font-heading">1,200+ kg</div>
              <div className="text-sm uppercase tracking-widest opacity-80">Flowers Saved</div>
            </div>
            <div className="p-6 space-y-4">
              <Heart className="w-10 h-10 mx-auto text-accent" />
              <div className="text-3xl sm:text-4xl font-heading">45+</div>
              <div className="text-sm uppercase tracking-widest opacity-80">Women Empowered</div>
            </div>
            <div className="p-6 space-y-4">
              <Sparkles className="w-10 h-10 mx-auto text-accent" />
              <div className="text-3xl sm:text-4xl font-heading">0%</div>
              <div className="text-sm uppercase tracking-widest opacity-80">Chemicals Used</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
