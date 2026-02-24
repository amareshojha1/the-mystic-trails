import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Auth Setup
  await setupAuth(app);
  registerAuthRoutes(app);

  // === API ROUTES ===

  // Products
  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  // Cart
  // Helper to get session/user context
  const getContext = (req: any) => ({
    sessionId: req.sessionID,
    // @ts-ignore
    userId: req.user ? parseInt(req.user.id) : undefined // Assuming numeric ID for our schema, but Auth uses string UUIDs.
    // For this MVP, let's primarily use session ID for simplicity or map UUID to a numeric ID if needed.
    // Given the schema defines userId as integer but Replit auth uses UUID strings,
    // we might have a mismatch. Let's rely on sessionId for guest cart mostly,
    // or we'd need to migrate the schema to use varchar for userId.
    // For now, let's use sessionId which is always present.
  });

  app.get(api.cart.list.path, async (req, res) => {
    const { sessionId } = getContext(req);
    // @ts-ignore
    const cart = await storage.getCartItems(sessionId);
    res.json(cart);
  });

  app.post(api.cart.addItem.path, async (req, res) => {
    const { sessionId } = getContext(req);
    const input = api.cart.addItem.input.parse(req.body);
    if (req.session) {
      (req.session as any).hasCart = true;
    }
    const item = await storage.addToCart({ ...input, sessionId });
    res.status(201).json(item);
  });

  app.patch(api.cart.updateItem.path, async (req, res) => {
    const input = api.cart.updateItem.input.parse(req.body);
    const item = await storage.updateCartItem(Number(req.params.id), input.quantity);
    res.json(item);
  });

  app.delete(api.cart.removeItem.path, async (req, res) => {
    await storage.removeFromCart(Number(req.params.id));
    res.status(200).send();
  });

  app.post(api.cart.clear.path, async (req, res) => {
    const { sessionId } = getContext(req);
    await storage.clearCart(sessionId);
    res.status(200).send();
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    const input = api.contact.submit.input.parse(req.body);
    const contact = await storage.createContact(input);
    res.json(contact);
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const products = await storage.getProducts();

  const smudgeProduct = products.find(p => p.name === "Smudge Incense Sticks");
  if (smudgeProduct) {
    await storage.updateProduct(smudgeProduct.id, { name: "Chandana Veda", imageUrl: "/images/chandana-veda.png" });
    console.log("Updated 'Smudge Incense Sticks' to 'Chandana Veda'");
  }

  if (products.length === 0) {
    console.log("Seeding products...");
    const seeds = [
      {
        name: "Chandana Veda",
        description: "100% organic sticks handcrafted from recycled temple flowers and natural resins. Infused with temple-grade marigold and rose petals.",
        price: 350,
        category: "Incense",
        imageUrl: "/images/chandana-veda.png",
        stock: 80,
        isFeatured: true,
        rating: 4.9,
        tags: ["organic", "chandana", "temple-flowers"],
      },
      {
        name: "Natural Sambrani Cups",
        description: "Traditional Sambrani experience using charcoal-free flower base. Emits a dense, purifying smoke that clears negative energy.",
        price: 420,
        category: "Incense",
        imageUrl: "https://images.unsplash.com/photo-1621274798547-49842f1b777a?auto=format&fit=crop&q=80&w=800",
        stock: 60,
        isFeatured: true,
        rating: 4.8,
        tags: ["traditional", "purifying"],
      },
      {
        name: "Organic Loban Cones",
        description: "Purifying loban mixed with petal powder for a soulful ritual. Hand-rolled by rural artisans in Karnataka.",
        price: 280,
        category: "Incense",
        imageUrl: "https://images.unsplash.com/photo-1612470030588-517865768565?auto=format&fit=crop&q=80&w=800",
        stock: 100,
        isFeatured: true,
        rating: 4.7,
        tags: ["loban", "ritualistic"],
      },
      {
        name: "Dry Flower Candles",
        description: "Soy wax candles infused with real dried temple flowers and essential oils. Slow-burning and soot-free.",
        price: 650,
        category: "Lifestyle",
        imageUrl: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800",
        stock: 40,
        isFeatured: true,
        rating: 5.0,
        tags: ["decor", "candles", "sustainable"],
      },
      {
        name: "Linen Mists",
        description: "Fragrant mists derived from pure floral extracts. Brings the calming scent of a morning temple visit to your sanctuary.",
        price: 550,
        category: "Lifestyle",
        imageUrl: "https://images.unsplash.com/photo-1616950267475-4c0702d76166?auto=format&fit=crop&q=80&w=800",
        stock: 50,
        rating: 4.6,
        tags: ["fresh", "mist", "floral"],
      },
      {
        name: "The Festive Hamper",
        description: "A complete collection for a grand celebration. Includes all signature scents in an eco-friendly gift box.",
        price: 2000,
        category: "Hampers",
        imageUrl: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800",
        stock: 20,
        isFeatured: true,
        rating: 4.9,
        tags: ["gift", "luxury", "festive"],
      },
      {
        name: "The Premium Hamper",
        description: "A curated selection of our most-loved products for mindful gifting. Perfect for housewarmings and rituals.",
        price: 1400,
        category: "Hampers",
        imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800",
        stock: 25,
        rating: 4.8,
        tags: ["gift", "curated"],
      },
      {
        name: "The Celebration Hamper",
        description: "A thoughtful gesture of appreciation with essential floral products and a handmade ceramic holder.",
        price: 1200,
        category: "Hampers",
        imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
        stock: 30,
        rating: 4.7,
        tags: ["gift", "affordable"],
      },
    ];

    for (const seed of seeds) {
      await storage.createProduct(seed);
    }
    console.log("Seeding complete.");
  }
}
