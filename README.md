# Xeno FDE Internship Assignment – Backend

This backend service is part of the multi-tenant Shopify Data Ingestion & Insights Service for the Xeno FDE Internship Assignment 2025. It handles ingesting data from Shopify stores, storing it in a multi-tenant database, and providing APIs for the frontend dashboard.

**Features:**
- Multi-tenant support for multiple Shopify stores.
- Ingests Customers, Orders, Products, and optional custom events like cart abandoned and checkout started.
- Stores data in PostgreSQL/MySQL using Prisma ORM.
- Scheduler or webhooks to sync Shopify data automatically.
- Authentication for tenant onboarding.
- APIs for dashboard metrics like total customers, orders, revenue, and top customers.

---

## Tech Stack
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL / MySQL
- **ORM:** Prisma
- **Optional:** Redis / RabbitMQ for async ingestion
- **Deployment:** Render / Heroku / Railway

---

## Setup Instructions

1. **Clone the repository**
```bash
git clone <backend-repo-link>
cd backend
Install dependencies

bash
Copy code
npm install
Configure environment variables
Create a .env file:

env
Copy code
DATABASE_URL=<your-database-url>
SHOPIFY_API_KEY=<your-shopify-api-key>
SHOPIFY_API_SECRET=<your-shopify-api-secret>
JWT_SECRET=<your-jwt-secret>
PORT=5000
Run database migrations

bash
Copy code
npx prisma migrate deploy
Start the server

bash
Copy code
npm run dev
Optional: Configure cron jobs or Shopify webhooks to keep data in sync.

API Endpoints
Authentication

POST /auth/register – Register a tenant

POST /auth/login – Tenant login

Data Ingestion

POST /webhooks/customers – Ingest customers

POST /webhooks/orders – Ingest orders

POST /webhooks/products – Ingest products

Dashboard

GET /dashboard/metrics – Total customers, orders, revenue

GET /dashboard/orders-by-date – Orders filtered by date range

GET /dashboard/top-customers – Top 5 customers by spend

Database Schema
Tenant: id, name, email, api_key

Customer: id, tenant_id, name, email, created_at

Order: id, tenant_id, customer_id, total_amount, created_at

Product: id, tenant_id, name, price, stock

Event (optional): id, tenant_id, type, metadata, created_at

High-Level Architecture
mermaid
Copy code
graph LR
    Shopify[Shopify Store] --> Backend[Backend APIs / Webhooks]
    Backend --> DB[Database (Multi-Tenant)]
    DB --> Frontend[Frontend Dashboard]
    Shopify --> Scheduler[Scheduler / Cron]
    Scheduler --> Backend
Assumptions & Limitations
Shopify data sync supports only customers, orders, and products.

Multi-tenancy is handled via tenant_id in all tables.

Custom events ingestion is optional and requires additional Shopify webhooks.

No advanced caching or rate-limiting implemented yet.

Next Steps for Production
Add robust error handling and logging.

Implement Redis caching for faster analytics queries.

Add rate-limiting and API security.

Set up CI/CD for automatic deployments.

References
Shopify API Documentation

Shopify App Template Remix

Prisma ORM

yaml
