import { Leaf, Users, Droplets, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Impact() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">Making a Difference</span>
          <h1 className="text-3xl sm:text-5xl font-heading italic" data-testid="text-impact-page-title">Our Impact</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Every stick of incense you light tells a story of waste recovered, rivers saved, and lives empowered.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-24">
          <div className="bg-secondary/30 rounded-md p-8 text-center space-y-6 hover-elevate" data-testid="card-impact-env">
            <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center text-primary">
              <Leaf size={28} />
            </div>
            <h3 className="text-lg font-heading italic">Environmental</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              By collecting floral waste, we prevent pesticides and chemical fertilizers from entering our rivers and landfills.
            </p>
            <div className="text-4xl font-heading text-primary pt-4">1,200+ kg</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Flowers Saved from Landfills</div>
          </div>

          <div className="bg-secondary/30 rounded-md p-8 text-center space-y-6 hover-elevate" data-testid="card-impact-social">
            <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center text-primary">
              <Users size={28} />
            </div>
            <h3 className="text-lg font-heading italic">Social</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We empower marginalized women by providing them with safe, dignified employment and financial independence.
            </p>
            <div className="text-4xl font-heading text-primary pt-4">45+</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Women Artisans Empowered</div>
          </div>

          <div className="bg-secondary/30 rounded-md p-8 text-center space-y-6 hover-elevate" data-testid="card-impact-health">
            <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center text-primary">
              <Heart size={28} />
            </div>
            <h3 className="text-lg font-heading italic">Health</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Our products are 100% charcoal-free and sulphur-free, ensuring a clean burn that is safe for you and your family.
            </p>
            <div className="text-4xl font-heading text-primary pt-4">0%</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Chemicals or Toxins</div>
          </div>
        </div>

        <div className="bg-primary text-primary-foreground rounded-md p-8 sm:p-12 md:p-20 text-center space-y-6 sm:space-y-8">
          <Sparkles className="w-10 h-10 mx-auto text-accent" />
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-heading italic max-w-3xl mx-auto leading-relaxed" data-testid="text-impact-quote">
            "When we heal the earth, we heal ourselves."
          </blockquote>
          <p className="text-primary-foreground/70 text-sm max-w-xl mx-auto">
            Every product from The Mystic Trails carries the essence of a million prayers, the livelihood of rural artisans, and the hope for a cleaner planet.
          </p>
          <Button variant="outline" className="rounded-none px-8 sm:px-12 py-5 sm:py-6 text-[11px] uppercase tracking-[0.2em] font-bold bg-white/5 text-white border-white/20" asChild>
            <Link href="/shop" data-testid="link-shop-impact">Shop with Purpose</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
