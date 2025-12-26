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
* **Supabase Native**: Serverless backend with robust security policies.

## 🛠️ Tech Stack

### Frontend

* **Framework**: React (Vite)
* **Styling**: Tailwind CSS, Material Symbols
* **Routing**: Custom Hash Router
* **PWA**: Vite PWA Plugin

### Backend

* **Database**: PostgreSQL (Supabase)
* **Authentication**: Supabase Auth
* **API**: Direct Database Access via Supabase Client (Serverless)

## 📦 Installation & Setup

### Prerequisites

* Node.js (v18+)

### 1. Clone the Repository

```bash
git clone https://github.com/Endsi3g/CampBnb-Redo.git
cd CampBnb-Redo
```

### 2. Frontend Setup

```bash
npm install
```

### 3. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

Update `.env.local` with your Supabase URL and Anon Key.

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run the App

```bash
npm run dev
```

The app will run on `http://localhost:3000`.

## 🚀 Deployment

### Frontend (Netlify/Vercel)

1. Build the app (`npm run build`).
2. Deploy the `dist` folder.
3. Set environment variables:
    * `VITE_SUPABASE_URL`
    * `VITE_SUPABASE_ANON_KEY`

## 🔒 Security

* **Row Level Security (RLS)**: Database policies restrict access to data based on user/owner.
* **Input Validation**: Strict validation on all API endpoints.
* **XSS Protection**: Content Sanitization in frontend router.

## 📄 License

MIT
