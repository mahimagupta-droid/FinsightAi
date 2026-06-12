# FinSight AI — Personal Finance Tracker

A full-stack personal finance application for tracking income and expenses,
managing category-based budgets, and visualizing spending habits through
interactive charts — all behind secure Clerk authentication.

> _Earn → Track → Analyze → Save → Grow_

**Live:** [finsight-ai-inky.vercel.app](https://finsight-ai-inky.vercel.app) · 
**GitHub:** [github.com/mahimagupta-droid/FinsightAi](https://github.com/mahimagupta-droid/FinsightAi)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS · Radix UI · shadcn/ui |
| Forms & Validation | React Hook Form + Zod |
| Charts | Chart.js · Recharts |
| Auth | Clerk |
| Database | Neon (Serverless PostgreSQL) |
| ORM | Prisma 7 (with Neon adapter) |
| State | Zustand |
| Deployment | Vercel |

---

## Features

- **Authentication** — Clerk sign-up/sign-in with per-user data isolation
- **Dashboard** — Financial overview with total income, expenses, and balance
  cards plus three interactive charts: pie (category breakdown), line (daily
  trends), bar (monthly income vs expenses)
- **Transactions** — Full CRUD for income and expense records with 10 expense
  categories, 5 income categories, payment methods, and essential/recurring flags
- **Budget Management** — Set monthly spending limits per category, track
  spent vs budgeted, visualize with a donut chart
- **User Profile** — Create, edit, and delete profile with monthly income and
  savings goal fields
- **Dark / Light Mode** — Theme toggling via next-themes
- **AI Advisor** — *(In development)* Gemini API integration for personalized
  spending insights and savings recommendations

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- Neon PostgreSQL database
- Clerk application

### Setup

```bash
git clone https://github.com/mahimagupta-droid/FinsightAi.git
cd FinsightAi
npm install
```

Create a `.env` file:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=require
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

```bash
npx prisma generate
npx prisma db push
npm run dev
```

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── budgets/           # Budget CRUD endpoints
│   │   ├── transactions/      # Transaction CRUD endpoints
│   │   └── user-profile/      # User profile endpoints
│   ├── budget/                # Budget management page
│   ├── dashboard/             # Analytics dashboard page
│   ├── transactions/          # Add & manage transactions page
│   ├── user-profile/          # User profile page
│   ├── layout.tsx             # Root layout (Clerk + Theme providers)
│   └── page.tsx               # Landing page
├── components/
│   ├── Budgets/               # Budget-specific components
│   ├── charts/                # Chart components (Pie, Line, Bar)
│   ├── ui/                    # Shared UI primitives
│   ├── TransactionCard.tsx
│   ├── dashboardCard.tsx
│   └── ThemeToggle.tsx
└── lib/
    ├── prisma.ts              # Prisma client singleton
    ├── constants.ts           # Category definitions
    ├── schemas/               # Zod validation schemas
    ├── types/                 # TypeScript type definitions
    └── utils/                 # Helper utilities

prisma/
└── schema.prisma              # Database models (User, Budget, Transaction)
```

---

## Database Schema

**User** — clerkId, email, name, age, monthlyIncome, savingsGoal

**Transaction** — clerkId, amount, type (income/expense), category,
description, date, paymentMethod, isEssential, isRecurring

**Budget** — clerkId, category, monthlyLimit, month, year
