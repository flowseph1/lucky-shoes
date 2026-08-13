# Lucky Shoes 👟

A modern e-commerce platform for exclusive sneakers, built with TanStack Start, Nitro, and Supabase. Originally an Instagram page, now transformed into a full-featured online store offering the latest trends in sneaker culture.

## ✨ Features

### Customer Features
- **Sneaker Catalog**: Browse exclusive sneakers with detailed product pages
- **Advanced Filtering**: Filter by brand, color, price, and availability
- **Product Details**: Comprehensive sneaker information including images, descriptions, and specifications
- **Favorites System**: Save and manage favorite sneakers
- **Quote Requests**: Contact form for custom inquiries
- **Responsive Design**: Optimized for all devices

### Admin Features
- **Dashboard**: Overview of store statistics and management
- **Brand Management**: Add, edit, and manage sneaker brands
- **Product Management**: Full CRUD operations for sneaker inventory
- **Image Management**: Handle multiple product images
- **Inventory Control**: Track availability and stock status

## 🛠️ Tech Stack

- **Framework**: TanStack Start with TanStack Router and Vite
- **Server runtime**: Nitro (Node.js)
- **Database**: Supabase (PostgreSQL)
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom component library
- **Forms**: React Hook Form with Zod validation
- **State Management**: Redux Toolkit
- **Icons**: React Icons
- **Animations**: Framer Motion
- **Code Quality**: Biome (linting & formatting)

## Development

This project uses [Bun](https://bun.sh/) for package management and scripts.

```bash
bun install
bun run dev
```

## Environment and admin setup

Set `DATABASE_URL`, `SUPABASE_URL`, and `SUPABASE_ANON_KEY` for local and production builds. Run the Supabase migrations, then create a Supabase email/password user and promote it with:

```sql
insert into public.profiles (id, role)
select id, 'admin' from auth.users where email = 'admin@example.com'
on conflict (id) do update set role = 'admin';
```

The admin area is available at `/admin/login`. Catalog records marked `inactive` remain visible to administrators but are excluded from public catalog and product routes.
