# 🏕️ CampBnB

**Find your Wild.** The ultimate platform for discovering and booking unique outdoor accommodations across Canada.

CampBnB is a modern, full-stack Progressive Web App (PWA) built for outdoor enthusiasts. From A-frame cabins in Banff to glamping domes in Jasper, CampBnB makes it easy to find your next adventure.

![App Screenshot](public/icons/icon-512x512.png)

## 🚀 Features

* **Progressive Web App (PWA)**: Installable on iOS and Android with offline capabilities.
* **Search & Discovery**: Filter by category (Cabin, Yurts, Treehouses) and search by location.
* **Booking System**: Full booking flow with date selection, guest management, and price breakdowns.
* **User Accounts**: Secure authentication, profile management, and "Saved" listings.
* **Host Dashboard**: Tools for hosts to create and manage their listings and bookings.
* **Responsive Design**: Mobile-first UI built with Tailwind CSS, featuring dark mode support.

## 🛠️ Tech Stack

### Frontend

* **Framework**: React (Vite)
* **Styling**: Tailwind CSS, Material Symbols
* **Routing**: Custom Hash Router
* **PWA**: Vite PWA Plugin

### Backend

* **Runtime**: Node.js & Express
* **Database**: PostgreSQL (Supabase)
* **ORM**: Prisma
* **Authentication**: JSON Web Tokens (JWT)

## 📦 Installation & Setup

### Prerequisites

* Node.js (v18+)
* Deepmind/Google Cloud environment (or local machine)

### 1. Clone the Repository

```bash
git clone https://github.com/Endsi3g/CampBnb-Redo.git
cd CampBnb-Redo
```

### 2. Frontend Setup

```bash
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`.

### 3. Backend Setup

```bash
cd server
npm install
```

### 4. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Update `.env` with your Supabase credentials.

### 5. Database Migration

```bash
npx prisma migrate dev
npx prisma db seed
```

### 6. Run the Server

```bash
npm run dev
```

The backend will run on `http://localhost:3001`.

## 🚀 Deployment

### Backend (Google Cloud Run)

1. Build the Docker image.
2. Deploy to Cloud Run.
3. Set environment variables (`DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL`).

### Frontend (Netlify/Vercel)

1. Build the app (`npm run build`).
2. Deploy the `dist` folder.
3. Set `VITE_API_URL` to your Cloud Run backend URL.

## 🔒 Security

* **Input Validation**: Strict validation on all API endpoints.
* **XSS Protection**: Content Sanitization in frontend router.
* **Secure Headers**: Helmet.js configured on backend.
* **Cors**: Strict Origin policies.

## 📄 License

MIT
