# The Mystic Trails - D2C Ecommerce

## Overview
Premium D2C ecommerce website for "The Mystic Trails," a spiritual brand that upcycles temple flower waste into organic incense, candles, and wellness products. Earthy, minimalist, spiritual aesthetic.

## Tech Stack
- **Frontend**: React + Vite, TailwindCSS, shadcn/ui, framer-motion, wouter (routing), TanStack Query
- **Backend**: Express.js, Drizzle ORM, PostgreSQL (Neon)
- **Auth**: Replit Auth (OIDC)
- **Port**: 5000 (Express serves both API and Vite frontend)

## Architecture
- `shared/schema.ts` - Drizzle schema (users, products, cartItems, contacts) + Zod schemas
- `shared/routes.ts` - Typed API route definitions
- `server/routes.ts` - Express API routes + seed data
- `server/storage.ts` - Storage interface (CRUD operations)
- `client/src/pages/` - Home, Shop, ProductDetails, About, Impact, Contact, Cart, Faq
- `client/src/components/` - Navbar, Footer, ProductCard, ScrollToTop

## Key Design Decisions
- **Color palette**: Primary = mystic-green (hsl 135 38% 25%), Accent = mystic-pink (hsl 345 40% 75%), Background = cream (hsl 40 33% 98%)
- **Fonts**: Playfair Display (headings), DM Sans (body)
- **Products**: 8 items across 3 categories (Incense, Lifestyle, Hampers), priced in whole INR
- **Cart**: Session-based for guests, user-linked for authenticated users
- **Dark mode**: Supported via CSS variables in :root and .dark

## Recent Changes (Feb 2026)
- Merged best elements from two design versions
- Added product ratings (real) and tags (text array) to schema
- Re-seeded 8 products with INR pricing
- Enhanced Home page with hero, impact narrative, process section
- Added scent profiles to ProductDetails
- Updated Shop with reactive URL-based category filtering
