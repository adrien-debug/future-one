# Future One — Qatar National Digital Core

Codebase + knowledge base for the **Qatar National Digital Core** project: a 1 GW sovereign AI hyperscale data center to be developed in Qatar (Umm Alhoul Free Zone) by HEARST AI.

This repository hosts both:
- the **public-facing landing site** (Next.js + Express + Supabase) currently deployed
- the **structured knowledge base** of the underlying physical infrastructure project (briefings, datasets, Notion workspace specs)

---

## Project Context

| Item | Value |
|---|---|
| **Public name** | Qatar National Digital Core |
| **Executing entity** | HEARST AI |
| **Local JV** | Earth Qatar (HEARST AI + Al Thani) |
| **Host country** | 🇶🇦 Qatar |
| **Site** | Umm Alhoul Free Zone (QFZA) |
| **Capacity target** | 1 GW IT (5 phases × 200 MW) |
| **Total CAPEX (median)** | ~7.7 Bn USD (range 5.4–10.0 Bn USD) |
| **Timeline** | 60 months · first revenue at M24 |
| **Designer** | Lord Norman Foster |
| **Construction** | Pastor Construction (Monaco) |
| **Local architects (shortlist)** | AEB · CEG International · QDC |
| **Light design trinôme** | Artec Studio · Arup Lighting · BMLD |
| **Governing law** | English Law (via QFC Civil & Commercial Regulations) |
| **Dispute resolution** | LCIA arbitration |

---

## Repository Layout

```
.
├── frontend/                     # Next.js 16 landing site (Vercel)
├── backend/                      # Express.js 5 API (Railway)
├── supabase/                     # Database migrations
├── docs/                         # Briefings & structured documentation
│   └── qatar-digital-core-briefing.html  # Executive HTML briefing (v1.1)
├── generate-images.mjs           # Image generation script
└── README.md
```

---

## Documentation & Knowledge Base

### 1. Executive HTML briefing
Location: `docs/qatar-digital-core-briefing.html`

Standalone single-file HTML (67 KB, no dependencies). Open with `open docs/qatar-digital-core-briefing.html` or any modern browser.

Sections:
- Hero KPIs · What · Where (Umm Alhoul map) · Power & Energy Mix
- Flows (Energy / Water / Data) · CAPEX (13 blocks) · Timeline (60 months)
- Corporate Structure (5 entities Qatar QFC + QFZ) · Partners · Compliance

### 2. Source dataset
10 source documents (`*.docx`) in `~/Downloads/`:

| # | Document | Purpose |
|---|---|---|
| 1 | `Qatar_Sovereign_AI_Ultra_Premium.docx` | Project pitch & vision |
| 2 | `HEARST_AI_Deal_A_Premium.docx` | Deal Option A — Operator Model (EPCM + O&M) |
| 3 | `HEARST_AI_Deal_B_Premium.docx` | Deal Option B — Strategic JV |
| 4 | `03_Term_Sheet_UK.docx` | UK common law term sheet |
| 5 | `04_Strategic_Model.docx` | Strategic positioning |
| 6 | `02_Market_Commercial.docx` | Pricing tiers & market structure |
| 7 | `01_Financial_Projections.docx` | Revenue projections |
| 8 | `DataCenter 1GW CAPEX Dubai IA Tier3 2.docx` | Full CAPEX/OPEX breakdown |
| 9 | `DataCenter 1GW Cartographie Prestataires.docx` | 80+ vendors mapping (12 themes) |
| 10 | `DataCenter 1GW Guide Complet.docx` | 16 trade categories + light design |

### 3. Notion workspace
Root page: [Qatar National Digital Core — Project Documentation](https://www.notion.so/3473b50cf49b81c19245d54f17c0957b)

Target architecture (in progress):
- `📐 Truth Tree & Agent Manual` — agent-first manual & axioms protocol
- `🔒 truth_axioms` — 31 immutable atomic facts (verified)
- `🎯 Programme National` — vision, strategy, roadmap
- `💻 Plateforme Digitale` — public site (this codebase)
- `🏭 Programme 1 GW` — physical datacenter (12 functional domains F1–F12)
- `🗂️ Operational Databases` — 26 databases (entities, deals, CAPEX, vendors, etc.)

---

## Codebase (landing site)

### Architecture

| Layer    | Tech       | Hosting  |
|----------|------------|----------|
| Frontend | Next.js 16 | Vercel   |
| Backend  | Express.js | Railway  |
| Database | PostgreSQL | Supabase |

### Setup

**Frontend**
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

**Backend**
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

**Supabase** — run in SQL Editor:
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

### API

- `GET /api/health` — Health check
- `POST /api/contact` — Submit contact form `{ name, email, message }`

### Environment variables

**Frontend** (`.env.local`)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_API_URL`

**Backend** (`.env`)
- `PORT`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `FRONTEND_URL`

---

## Status & Roadmap

### Done
- [x] Public landing site deployed (Vercel + Railway + Supabase)
- [x] Dataset of 10 source docs ingested & analyzed
- [x] Executive briefing v1.1 generated & audited (`docs/qatar-digital-core-briefing.html`)
- [x] Corporate structure defined (HoldCo + AssetCo + OpCo + IPCo + ServiceCo, all Qatar QFC/QFZ)
- [x] Truth tree architecture designed (12 functional domains, 26 databases, 31 axioms)

### In progress
- [ ] Notion workspace ingestion (Phase A→H)
- [ ] Term Sheet enrichment (1.5–2 pages, English law) — *deferred to end of classification*
- [ ] Energy mix research (prompt prepared for Sonnet 4.5 agent)

### Open decisions (to resolve before financial close)
- [ ] AssetCo Free Zone : Umm Alhoul *(default)* vs Ras Bufontas
- [ ] IPCo jurisdiction : Qatar QFC *(recommended)* vs Luxembourg
- [ ] Tier visé : Tier III *(default)* vs Tier IV
- [ ] Anchor tenant signature (Microsoft / Google / Oracle / G42)
- [ ] NVIDIA GPU allocation LOI
- [ ] Foster + Pastor contractual confirmation

---

## Conventions

- **Language**: code & commits in English; project documentation may mix EN/FR
- **Commits**: descriptive, semantic style (no enforced format yet)
- **Branches**: `main` = production
- **Secrets**: never commit `.env` files; always use `.env.example` templates
- **Notion writes**: agents must read `📐 Truth Tree & Agent Manual` before any modification (10-interactions review cycle protocol)

---

## License & Confidentiality

Internal & strategic partners only. Pre-financial close. © HEARST AI 2026.
