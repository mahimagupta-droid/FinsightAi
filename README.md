# FinsightAI 💰

### AI-Powered Personal Finance Tracker
**[Live Demo](https://finsight-ai-inky.vercel.app/) · Built with Next.js · TypeScript · PostgreSQL · Clerk**

---

FinsightAI is a full-stack personal finance platform that helps users track income and expenses, analyze spending behavior, and make smarter financial decisions — going beyond simple expense tracking to provide real behavioral insights and growth guidance.

> **Earn → Track → Analyze → Save → Grow**

---

## The Problem

Most expense trackers tell you *what* you spent. They don't tell you *why* you're overspending, *where* to cut, or *what to do* with the money you save. FinsightAI addresses all three.

---

## What's Built

### Authentication & Onboarding
- Clerk-powered authentication — email, Google, GitHub login
- Webhook-based user provisioning — DB record created automatically on signup, no manual setup required
- First-login onboarding modal — collects age, income, and savings goal before the user touches anything else

### Transaction Tracking
- Add income and expense transactions with category, payment method, date, description
- Mark transactions as essential or recurring
- Inline edit and delete from the transaction list

### Analytics Dashboard
- **Pie chart** — category-wise expense breakdown
- **Line chart** — daily expense trends
- **Bar chart** — monthly income vs expense comparison
- Summary cards showing total income, total expenses, and current balance

### Budget Management
- Set monthly budgets per spending category
- Real-time progress bars showing spent vs limit
- Donut chart showing budget distribution
- Color-coded status — on track, warning, exceeded

### Spending Intelligence
- **Recurring expense detection** — automatically identifies subscriptions and repeat expenses by tracking merchant/description consistency across 3+ months
- **Spending spike detection** — statistical anomaly detection using mean and standard deviation; flags categories where current spend exceeds 2 standard deviations from the historical average
- **Server-side aggregation** — category-wise spending computed via Prisma `groupBy` directly in PostgreSQL instead of client-side JavaScript, keeping the app fast as transaction volume grows
- **DateRangePicker** — filter all dashboard data by This Week, This Month, or Last 3 Months

### User Profile
- Full CRUD for profile — age, monthly income, savings goal
- Edit and delete account

### Global State
- Zustand store shares transactions and budgets across Dashboard and Budget pages — eliminates duplicate API calls and keeps data in sync across the app

---

## Technical Decisions

**Why Next.js API Routes over Express?**
The app is deployed on Vercel — Next.js API routes are serverless functions that deploy instantly with zero configuration. A separate Express server would require additional hosting, CORS setup, and a split deployment pipeline with no meaningful benefit for this project's scale.

**Why PostgreSQL + Prisma over MongoDB?**
Financial data is deeply relational — budgets belong to users, transactions belong to categories, patterns are detected via GROUP BY queries. SQL handles these aggregations cleanly and efficiently. Prisma adds type-safety on top, catching schema mismatches at compile time rather than runtime.

**Why Clerk over custom auth?**
Auth is a solved problem. Clerk handles sessions, OAuth providers, JWTs, and webhook events out of the box. Building custom auth would cost weeks and introduce security risk with no user-facing benefit.

**Why webhook-based user provisioning?**
The alternative — a manual "Create Profile" form — creates a broken state where authenticated users have no DB record. The webhook approach guarantees the DB record exists before the user ever lands on the app.

**Why server-side aggregation (Prisma `groupBy`) over client-side JavaScript?**
Initially, category spending was computed by fetching all transactions and reducing them in the browser. This doesn't scale — every transaction has to travel over the network just to compute a handful of totals. Moving the aggregation into PostgreSQL via `groupBy` means the database (built specifically for this) does the work, and only the final totals are sent to the client.

**Why mean + standard deviation for spike detection instead of a fixed threshold?**
A fixed threshold (e.g., "flag anything over ₹5000") doesn't account for the fact that spending baselines differ wildly between categories and between users. Using each category's own historical mean and standard deviation makes spike detection personalized — what counts as unusual for one person's grocery spend may be completely normal for another's.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS · Radix UI · shadcn/ui |
| Auth | Clerk |
| Database | PostgreSQL via Neon (serverless) |
| ORM | Prisma 7 |
| State Management | Zustand |
| Charts | Recharts · Chart.js |
| Forms | React Hook Form + Zod |
| Deployment | Vercel |

---

## In Progress — Phase 2 (AI Insight Layer)

- [ ] Persona-based onboarding (student / professional / freelancer)
- [ ] AI insight cards via Gemini / GPT-4o-mini
- [ ] Ask FinsightAI — streaming financial chat

## Planned

- [ ] Emergency fund + SIP calculators (Phase 3)
- [ ] Investment guides & decision flow (Phase 3)
- [ ] Redis caching, Jest tests, Docker (Phase 4)

---

## Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/finsight-ai.git
cd finsight-ai

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in: DATABASE_URL, CLERK keys, CLERK_WEBHOOK_SECRET

# 4. Run migrations
npx prisma migrate dev

# 5. Start the dev server
npm run dev
```

---

## Database Schema

```prisma
model User {
  id            String   @id @default(cuid())
  clerkId       String   @unique
  email         String   @unique
  name          String
  age           Int?
  monthlyIncome Float?
  savingsGoal   Float?
  onboarded     Boolean  @default(false)
}

model Transaction {
  id            String   @id @default(cuid())
  clerkId       String
  amount        Float
  type          String
  category      String
  description   String
  date          DateTime @default(now())
  paymentMethod String?
  isEssential   Boolean  @default(false)
  isRecurring   Boolean  @default(false)
}

model Budget {
  id           String   @id @default(cuid())
  clerkId      String
  category     String
  monthlyLimit Float
  month        Int
  year         Int
  @@unique([clerkId, category, month, year])
}
```

---

*Built by Mahima Gupta*
