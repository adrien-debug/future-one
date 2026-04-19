# Future One

Full-stack application with a Next.js frontend, Express.js backend, and Supabase database.

## Architecture

| Layer    | Tech       | Hosting  |
|----------|------------|----------|
| Frontend | Next.js 16 | Vercel   |
| Backend  | Express.js | Railway  |
| Database | PostgreSQL | Supabase |

## Structure

```
frontend/   → Next.js app (landing page + contact form)
backend/    → Express API (health + contact endpoints)
```

## Setup

### 1. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

### 2. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 3. Supabase

Run this SQL in the Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS public.contacts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert" ON public.contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow service role select" ON public.contacts
  FOR SELECT USING (true);
```

## API Endpoints

- `GET /api/health` — Health check
- `POST /api/contact` — Submit contact form (`{ name, email, message }`)

## Environment Variables

### Frontend (`.env.local`)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_API_URL`

### Backend (`.env`)
- `PORT`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `FRONTEND_URL`
