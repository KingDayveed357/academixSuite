# AcademixSuite

AcademixSuite is a premium, multi-tenant school management SaaS designed for high-performance institutional administration. Built with Laravel 13, Inertia.js, and React, it provides a seamless, "Stripe-level" experience for school owners and administrators.

## 🚀 Tech Stack

- **Backend:** Laravel 13 (PHP 8.2+)
- **Frontend:** React 18 + TypeScript
- **Bridge:** Inertia.js (The "Classic Monolith" feel with SPA performance)
- **Styling:** Tailwind CSS + Vanilla CSS (Premium Custom Design System)
- **Database:** MySQL 8.0+
- **Tenancy:** Subdomain-based isolation (Custom resolution logic)

## 🛠️ Local Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd academixsuite
   ```

2. **Backend Installation:**
   ```bash
   composer install
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database Setup:**
   Create a database and update `.env` credentials.
   ```bash
   php artisan migrate --seed
   ```

4. **Frontend Installation:**
   ```bash
   npm install
   npm run dev
   ```

5. **Local Domain Configuration:**
   To test multi-tenancy locally, use `nip.io` or update your `hosts` file:
   - Central: `http://127.0.0.1.nip.io:8000`
   - Tenant: `http://school-slug.127.0.0.1.nip.io:8000`

## 🏗️ Architecture Note

AcademixSuite uses a **Shared Database, Isolated Scope** tenancy model. 
- All data resides in one database.
- `school_id` is applied via global scopes in Eloquent.
- Tenant resolution happens via `TenantResolver` service in the request middleware.

For deep architectural details, see [SYSTEM.md](./SYSTEM.md).

## 🤝 Contribution Guidelines

1. **Branching:** Use `feat/`, `fix/`, or `refactor/` prefixes.
2. **Pull Requests:** All changes must be peer-reviewed via PR.
3. **Coding Standards:** Follow PSR-12 for PHP and ESLint/Prettier for React.
4. **Thin Controllers:** Keep business logic in `App\Services`.
