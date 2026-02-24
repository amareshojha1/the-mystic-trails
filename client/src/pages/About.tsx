import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      <div className="relative min-h-[50vh] sm:h-[60vh] flex items-center justify-center overflow-hidden bg-[#1A2421]">
        <img
          src="/images/about-hero.jpg"
          alt="Temple flower garland offerings"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2421] via-transparent to-transparent" />
        <div className="relative z-10 text-center container-wide">
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Our Story</span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-heading text-white italic mb-6" data-testid="text-about-title">A Quiet Truth</h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-300 font-light italic">
            Where devotion meets sustainability.
          </p>
        </div>
      </div>

      <div className="container-wide py-16 sm:py-24 space-y-16 sm:space-y-32">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div className="space-y-6">
            <span className="text-primary font-bold tracking-[0.3em] text-[10px] uppercase">The Beginning</span>
            <h2 className="text-3xl sm:text-4xl font-heading italic">What Happens After the Prayer?</h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
              <p>
                The Mystic Trails began with one quiet, unsettling truth: <span className="text-foreground font-medium">What happens to the temple flowers we offer to God with so much devotion?</span>
              </p>
              <p>
                Every day, tons of sacred flowers end up in landfills, rotting and leaching chemicals into the soil and groundwater. The very offerings meant to purify our spirits were polluting our earth.
              </p>
              <p>
                From this painful realization, a brand was born -- a brand of spiritual regeneration, mindful living, and a gentle rebellion against waste.
              </p>
            </div>
          </div>
          <div className="aspect-[4/5] rounded-md overflow-hidden transform rotate-1">
             <img
               src="/images/about-flowers.jpg"
               alt="Sacred marigold temple flowers"
               className="w-full h-full object-cover"
             />
          </div>
        </div>

        <div className="bg-secondary/30 rounded-md p-6 sm:p-12 md:p-20 text-center space-y-12 sm:space-y-16">
          <div className="space-y-6 max-w-3xl mx-auto">
            <span className="text-primary font-bold tracking-[0.3em] text-[10px] uppercase">Our Mission</span>
            <p className="text-xl md:text-2xl text-foreground font-heading italic leading-relaxed" data-testid="text-mission">
              "To build a regenerative supply chain that converts temple floral waste into premium, toxin-free, and planet-safe products."
            </p>
          </div>

          <div className="w-20 h-[2px] bg-primary/20 mx-auto" />

          <div className="space-y-6 max-w-3xl mx-auto">
            <span className="text-primary font-bold tracking-[0.3em] text-[10px] uppercase">Our Vision</span>
            <p className="text-xl md:text-2xl text-foreground font-heading italic leading-relaxed" data-testid="text-vision">
              "We envision a future where prayers no longer end in landfills, devotion leaves no pollution, and sacred rituals are as gentle to the planet as they are to the soul."
            </p>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl font-heading italic">Join the Journey</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Every product you choose from The Mystic Trails is a small act of reverence -- for the flowers, the artisans, and the earth we all share.
          </p>
          <Button size="lg" className="rounded-none px-8 sm:px-12 py-5 sm:py-6 text-[11px] uppercase tracking-[0.2em] font-bold" asChild>
            <Link href="/shop" data-testid="link-shop-about">Explore Our Collections</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
