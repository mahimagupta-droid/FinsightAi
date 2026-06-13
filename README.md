# 💰 FinsightAi — Personal Finance Tracker

A full-stack personal finance application built with **Next.js 16**, **Prisma**, and **Neon PostgreSQL**. Track your income and expenses, set category-based budgets, and visualize your spending habits through interactive charts — all behind secure Clerk authentication.

> _Earn → Track → Analyze → Save → Grow_

---

## ✨ Features

- **🔐 Authentication** — Secure sign-up / sign-in powered by [Clerk](https://clerk.com), with per-user data isolation.
- **📊 Dashboard** — At-a-glance financial overview with total income, expenses, and balance cards, plus three interactive charts:
  - **Pie Chart** — Expense breakdown by category
  - **Line Chart** — Daily expense trends over time
  - **Bar Chart** — Monthly income vs. expenses comparison
- **💸 Transactions** — Full CRUD for income and expense records with support for:
  - 10 expense categories (food, transport, shopping, entertainment, utilities, health, education, rent, subscriptions, other)
  - 5 income categories (salary, freelance, business, investment, other)
  - Payment methods (cash, card, UPI, bank transfer, other)
  - Essential & recurring flags
- **📋 Budget Management** — Set monthly spending limits per category, track spent vs. budgeted amounts, and visualize allocation with a donut chart.
- **👤 User Profile** — Create, view, edit, and delete your profile (name, email, age, monthly income, savings goal).
- **🌙 Dark / Light Mode** — Theme toggling via `next-themes` with smooth transitions.
- **📱 Responsive Design** — Mobile-first layout that adapts to all screen sizes.
- **🔔 Toast Notifications** — Real-time feedback on all actions via Sonner.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 · Radix UI · shadcn/ui |
| **State** | Zustand · React Hook Form + Zod |
| **Charts** | Chart.js · react-chartjs-2 · Recharts |
| **Auth** | [Clerk](https://clerk.com) |
| **Database** | [Neon](https://neon.tech/) (Serverless PostgreSQL) |
| **ORM** | [Prisma 7](https://www.prisma.io/) (with Neon adapter) |
| **Fonts** | Lato · Lexend · Playfair Display (Google Fonts) |
| **Notifications** | Sonner |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** or **pnpm**
- A [Neon](https://neon.tech/) PostgreSQL database
- A [Clerk](https://clerk.com) application (publishable + secret keys)

### 1. Clone the repository

```bash
git clone https://github.com/mahimagupta-droid/finance-tracker.git
cd finance-tracker
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=require
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 4. Generate Prisma client & apply migrations

```bash
npx prisma generate
npx prisma db push
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
financial-tracker/
├── prisma/
│   └── schema.prisma          # Database models (User, Budget, Transaction)
├── public/                    # Static assets & images
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── budgets/       # Budget CRUD endpoints
│   │   │   ├── transactions/  # Transaction CRUD endpoints
│   │   │   └── user-profile/  # User profile endpoints
│   │   ├── budget/            # Budget management page
│   │   ├── dashboard/         # Analytics dashboard page
│   │   ├── signin/            # Clerk sign-in page
│   │   ├── transactions/      # Add & manage transactions page
│   │   ├── user-profile/      # User profile page
│   │   ├── components/        # App-level components (Navbar)
│   │   ├── layout.tsx         # Root layout (Clerk + Theme providers)
│   │   ├── page.tsx           # Landing / home page
│   │   └── globals.css        # Global styles & CSS variables
│   ├── components/
│   │   ├── Budgets/           # Budget-specific components
│   │   ├── charts/            # Chart components (Pie, Line, Bar)
│   │   ├── database/          # Static data (testimonials)
│   │   ├── ui/                # Shared UI primitives (Footer, Accordion, Sonner)
│   │   ├── TransactionCard.tsx
│   │   ├── dashboardCard.tsx
│   │   ├── summaryCard.tsx
│   │   └── ThemeToggle.tsx
│   ├── lib/
│   │   ├── constants.ts       # Category definitions
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── schemas/           # Zod validation schemas
│   │   ├── types/             # TypeScript type definitions
│   │   └── utils/             # Helper utilities
│   └── generated/             # Auto-generated Prisma client (gitignored)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## 🗄️ Database Schema

The app uses three core models:

### User
| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Primary key (CUID) |
| `clerkId` | String | Unique Clerk user identifier |
| `email` | String | User email (unique) |
| `name` | String | Display name |
| `age` | Int | User age |
| `monthlyIncome` | Float | Monthly income amount |
| `savingsGoal` | Float | Target savings amount |

### Transaction
| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Primary key (CUID) |
| `clerkId` | String | Owner's Clerk ID |
| `amount` | Float | Transaction amount |
| `type` | String | `"income"` or `"expense"` |
| `category` | String | Category label |
| `description` | String | Brief note |
| `date` | DateTime | Transaction date |
| `paymentMethod` | String? | Cash, Card, UPI, etc. |
| `isEssential` | Boolean | Essential spending flag |
| `isRecurring` | Boolean | Recurring transaction flag |

### Budget
| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Primary key (CUID) |
| `clerkId` | String | Owner's Clerk ID |
| `category` | String | Budget category |
| `monthlyLimit` | Float | Spending cap for the month |
| `month` | Int | Month number (1–12) |
| `year` | Int | Budget year |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/transactions` | Fetch all transactions for the authenticated user |
| `POST` | `/api/transactions` | Create a new transaction |
| `DELETE` | `/api/transactions/:id` | Delete a transaction by ID |
| `GET` | `/api/budgets` | Fetch all budgets for the authenticated user |
| `POST` | `/api/budgets` | Create a new budget |
| `DELETE` | `/api/budgets/:id` | Delete a budget by ID |
| `GET` | `/api/user-profile` | Fetch the authenticated user's profile |
| `POST` | `/api/user-profile` | Create a user profile |
| `PUT` | `/api/user-profile` | Update the user profile |
| `DELETE` | `/api/user-profile` | Delete the user profile |

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

---

## 📄 License

This project is private and not currently published under an open-source license.
