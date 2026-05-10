# AcademixSuite System Documentation

This document serves as the Single Source of Truth (SSOT) for the AcademixSuite technical architecture.

## 🌍 A. Multi-Tenancy

### Subdomain Architecture
The system uses subdomains to identify institutions. 
- **Central Domain:** `academixsuite.com` (Marketing, Registration, Central Auth).
- **Tenant Domain:** `{slug}.academixsuite.com` (School Dashboard, Admin, Academic modules).

### Tenant Resolution
Resolution happens in `App\Http\Middleware\IdentifyTenant`:
1. Extract host from request.
2. Check if host is central or tenant.
3. If tenant, lookup `School` by `slug`.
4. Bind the `School` model to the `TenantContext` service.

### Global Scoping
Every tenant-aware model MUST use the `TenantAware` trait (or inherit from a base model) that applies a global scope for `school_id`.

## 🔐 B. Authentication

### Dual-Login Flow
1. **Central Login:** Users log in on the main domain. The system finds their memberships and prompts for a school selection if they have multiple.
2. **Tenant Login:** Users log in on a school's subdomain. The system validates their membership for *that specific* school before allowing entry.

### Redirect Logic
- Successful login on a tenant domain → `/dashboard`.
- Success login on central domain with 1 school → `Redirect to subdomain/dashboard`.
- Invalid tenant slug → `404 Not Found`.

## 🏗️ C. Data Model

- **School (Tenant):** The root institution.
- **User:** Global identity (can belong to multiple schools).
- **Membership:** Connects `User` ↔ `School`. Stores `role` and `staff_id`.
- **OnboardingSetting:** Key-value store for institution-specific setup progress.

## 🎭 D. Role System Design (Proposed)

| Role | Responsibility | MVP Access |
| :--- | :--- | :--- |
| **Owner** | Institution head / Owner | Full system access, Billing, Staff Management |
| **Admin** | Operational manager | Student registration, Class config, Financial records |
| **Bursar** | Financial officer | Fee collection, Expense tracking, Financial reports |
| **Teacher** | Academic staff | Attendance, Grading, Subject management |
| **Student** | Learner / Parent | Result viewing, Fee payments (view-only) |

*Implementation: Roles are stored as strings on the `Membership` model. Middleware `RoleGate` handles permission checks.*

## 💳 E. Billing & Plans

### Tiers
- **Free:** 50 students, 1 staff. Core features only.
- **Growth ($):** 500 students, 10 staff. PDF/CSV Exports, Analytics.
- **Enterprise ($$):** Unlimited students, Priority support, API access.

### Gating Strategy
We use **Soft Gating**:
- Show usage banners when approaching limits.
- Render `PlanGate` (overlay lock) on restricted UI components.
- Block actions (e.g., "Add Student") only when hard limits are hit.

## 🔄 F. Request Lifecycle Example: Accessing Dashboard
1. Request hits `{school}.academixsuite.com/dashboard`.
2. `IdentifyTenant` middleware finds the school and binds it.
3. `auth` middleware checks if user is logged in.
4. `TenantAccess` middleware verifies user has a `Membership` in this school.
5. `Onboarded` middleware checks if `school.onboarding_completed` is true.
6. Controller renders `Dashboard/Index` via Inertia.

## ⚠️ G. Technical Debt & Risks
1. **Direct Session Usage:** Some areas use `session()` directly for tenant ID; migration to `TenantContext` service is ongoing.
2. **UI Consistency:** Mix of custom CSS and early shadcn-ui components.
3. **Billing Integration:** Currently WhatsApp-based; needs Stripe/Paystack API implementation.
