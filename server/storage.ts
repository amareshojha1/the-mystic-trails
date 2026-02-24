import { db } from "./db";
import {
  products,
  cartItems,
  contacts,
  type Product,
  type InsertProduct,
  type CartItem,
  type InsertCartItem,
  type InsertContact,
  type Contact,
} from "@shared/schema";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product>;

  // Cart
  getCartItems(sessionId: string, userId?: number): Promise<(CartItem & { product: Product })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem>;
  removeFromCart(id: number): Promise<void>;
  clearCart(sessionId: string, userId?: number): Promise<void>;

  // Contact
  createContact(contact: InsertContact): Promise<Contact>;
}

export class DatabaseStorage implements IStorage {
  // Products
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product> {
    const [updated] = await db.update(products).set(data).where(eq(products.id, id)).returning();
    return updated;
  }

  // Cart
  async getCartItems(sessionId: string, userId?: number): Promise<(CartItem & { product: Product })[]> {
    const whereClause = userId
      ? eq(cartItems.userId, userId)
      : eq(cartItems.sessionId, sessionId);

    const items = await db
      .select({
        // Expand cart items properties to avoid '...' spread issues if any
        id: cartItems.id,
        userId: cartItems.userId,
        sessionId: cartItems.sessionId,
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        product: products, // Select full product object
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(whereClause);

    return items;
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    // Check if item already exists
    const whereClause = and(
        item.userId ? eq(cartItems.userId, item.userId) : eq(cartItems.sessionId, item.sessionId!),
        eq(cartItems.productId, item.productId)
    );

    const [existing] = await db.select().from(cartItems).where(whereClause);

    if (existing) {
      const [updated] = await db
        .update(cartItems)
        .set({ quantity: existing.quantity + (item.quantity || 1) })
        .where(eq(cartItems.id, existing.id))
        .returning();
      return updated;
    }

    const [newItem] = await db.insert(cartItems).values(item).returning();
    return newItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem> {
    const [updated] = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, id))
      .returning();
    return updated;
  }

  async removeFromCart(id: number): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }

  async clearCart(sessionId: string, userId?: number): Promise<void> {
    const whereClause = userId
      ? eq(cartItems.userId, userId)
      : eq(cartItems.sessionId, sessionId);
    await db.delete(cartItems).where(whereClause);
  }

  // Contact
  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db.insert(contacts).values(contact).returning();
    return newContact;
  }
}

export const storage = new DatabaseStorage();
