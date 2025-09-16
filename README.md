# Xeno FDE Internship Assignment – Backend

This backend service is part of the multi-tenant Shopify Data Ingestion & Insights Service for the Xeno FDE Internship Assignment 2025. It handles ingesting data from Shopify stores, storing it in a multi-tenant database, and providing APIs for the frontend dashboard. Features include multi-tenant support, ingestion of Customers, Orders, Products, and optional custom events like cart abandoned and checkout started, storing data in PostgreSQL/MySQL using Prisma ORM, scheduler or webhooks to sync Shopify data automatically, authentication for tenant onboarding, and APIs for dashboard metrics like total customers, orders, revenue, and top customers. The high-level architecture is: Shopify Store sends data through Webhooks or API requests to the Backend, which processes and stores it in a multi-tenant Database. The Frontend Dashboard fetches metrics and visualizations from the backend. A scheduler or cron job ensures periodic synchronization of Shopify data.

Tech stack includes Node.js + Express.js for the backend, PostgreSQL/MySQL as the database, Prisma ORM for cleaner multi-tenant handling, optional Redis/RabbitMQ for async ingestion, and deployment via Render, Heroku, or Railway.

Setup instructions: Clone the repository using `git clone <backend-repo-link>` and `cd backend`. Install dependencies with `npm install`. Configure environment variables in a `.env` file as follows: `DATABASE_URL=<your-database-url>`, `SHOPIFY_API_KEY=<your-shopify-api-key>`, `SHOPIFY_API_SECRET=<your-shopify-api-secret>`, `JWT_SECRET=<your-jwt-secret>`, `PORT=5000`. Run database migrations using `npx prisma migrate deploy`. Start the server with `npm run dev`. Optionally, configure cron jobs or Shopify webhooks to keep data in sync.

API endpoints include Authentication: `POST /auth/register` for tenant registration, `POST /auth/login` for tenant login; Data Ingestion: `POST /webhooks/customers` to ingest customers, `POST /webhooks/orders` to ingest orders, `POST /webhooks/products` to ingest products; Dashboard: `GET /dashboard/metrics` for total customers, orders, and revenue, `GET /dashboard/orders-by-date` to fetch orders filtered by date range, `GET /dashboard/top-customers` for top 5 customers by spend.

Database schema consists of Tenant (id, name, email, api_key), Customer (id, tenant_id, name, email, created_at), Order (id, tenant_id, customer_id, total_amount, created_at), Product (id, tenant_id, name, price, stock), and Event (optional: id, tenant_id, type, metadata, created_at).

Assumptions and limitations: Shopify data sync currently supports only customers, orders, and products. Multi-tenancy is handled via a `tenant_id` in all tables. Custom events ingestion is optional and requires additional Shopify webhooks. No advanced caching or rate-limiting is implemented yet.

Next steps for production: Add robust error handling and logging, implement Redis caching for faster analytics queries, add rate-limiting and API security, and set up CI/CD for automatic deployments.

High-Level Architecture:  
