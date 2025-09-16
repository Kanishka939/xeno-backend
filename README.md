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
