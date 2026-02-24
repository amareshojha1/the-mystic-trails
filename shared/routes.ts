import { z } from 'zod';
import { insertProductSchema, insertCartItemSchema, insertContactSchema, products, cartItems, contacts } from './schema';

export const api = {
  products: {
    list: {
      method: 'GET' as const,
      path: '/api/products' as const,
      responses: {
        200: z.array(z.custom<typeof products.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/products/:id' as const,
      responses: {
        200: z.custom<typeof products.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
  cart: {
    list: {
      method: 'GET' as const,
      path: '/api/cart' as const, // Uses session/user from context
      responses: {
        200: z.array(z.custom<typeof cartItems.$inferSelect & { product: typeof products.$inferSelect }>()),
      },
    },
    addItem: {
      method: 'POST' as const,
      path: '/api/cart' as const,
      input: z.object({ productId: z.number(), quantity: z.number() }),
      responses: {
        200: z.custom<typeof cartItems.$inferSelect>(),
        201: z.custom<typeof cartItems.$inferSelect>(),
      },
    },
    updateItem: {
      method: 'PATCH' as const,
      path: '/api/cart/:id' as const,
      input: z.object({ quantity: z.number() }),
      responses: {
        200: z.custom<typeof cartItems.$inferSelect>(),
      },
    },
    removeItem: {
      method: 'DELETE' as const,
      path: '/api/cart/:id' as const,
      responses: {
        200: z.void(),
      },
    },
    clear: {
      method: 'POST' as const,
      path: '/api/cart/clear' as const,
      responses: {
        200: z.void(),
      },
    },
  },
  contact: {
    submit: {
      method: 'POST' as const,
      path: '/api/contact' as const,
      input: insertContactSchema,
      responses: {
        200: z.custom<typeof contacts.$inferSelect>(),
      },
    },
  }
};
