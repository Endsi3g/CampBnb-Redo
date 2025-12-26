# CampBnB Server

Node.js/Express backend API for CampBnB camping rental platform.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your DATABASE_URL

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed sample data
npm run db:seed

# Start development server
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Current user

### Listings

- `GET /api/listings` - Search listings
- `GET /api/listings/:id` - Listing details
- `POST /api/listings` - Create (host only)

### Bookings

- `GET /api/bookings` - User's bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id/cancel` - Cancel

### Reviews & Favorites

- `GET /api/reviews/listing/:id` - Listing reviews
- `POST /api/reviews/listing/:id` - Add review
- `GET /api/favorites` - User favorites
- `POST/DELETE /api/favorites/:id` - Add/remove

## Test Accounts (after seed)

- Guest: `alex@example.com` / `password123`
- Host: `host@example.com` / `password123`
