import { Link } from "wouter";
import { Facebook, Instagram, Twitter } from "lucide-react";
import logoImg from "@assets/logo-transparent.png";

export function Footer() {
  return (
    <footer className="bg-secondary/30 pt-16 pb-8 border-t border-border">
      <div className="container-wide grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
        <div className="space-y-4 col-span-2 md:col-span-1">
          <img src={logoImg} alt="The Mystic Trails" className="h-20 sm:h-24 w-auto" />
          <p className="text-muted-foreground text-sm leading-relaxed">
            From Temple to Soul. Conscious, Upcycled, Pure. We convert temple floral waste into premium, toxin-free products.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-primary mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/shop" className="hover:text-primary transition-colors">All Products</Link></li>
            <li><Link href="/shop?category=Incense" className="hover:text-primary transition-colors">Incense</Link></li>
            <li><Link href="/shop?category=Lifestyle" className="hover:text-primary transition-colors">Lifestyle</Link></li>
            <li><Link href="/shop?category=Hampers" className="hover:text-primary transition-colors">Gift Hampers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-primary mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
            <li><Link href="/impact" className="hover:text-primary transition-colors">Impact</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-primary mb-4">Stay Connected</h4>
          <div className="flex space-x-4 mb-6">
            <a href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-white transition-all"><Instagram size={18} /></a>
            <a href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-white transition-all"><Facebook size={18} /></a>
            <a href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-white transition-all"><Twitter size={18} /></a>
          </div>
          <p className="text-xs text-muted-foreground">
            Subscribe to our newsletter for mindful updates.
          </p>
        </div>
      </div>
      
      <div className="container-wide pt-8 border-t border-border/50 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} The Mystic Trails. All rights reserved.
      </div>
    </footer>
  );
}
