# API Contracts

> **Status:** Placeholder — to be completed once backend routes are implemented.

## Conventions
- Base URL: `/api/v1`
- All responses return JSON.
- Authentication: Bearer JWT in `Authorization` header.
- Errors follow RFC 7807 Problem Details format.

## Sections to cover
1. **Auth** — `POST /auth/login`, `POST /auth/register`, `POST /auth/refresh`.
2. **Food Items** — CRUD endpoints for food item management (Admin only).
3. **Inventory** — stock level read/write endpoints.
4. **Sales** — record and query daily sales transactions.
5. **Waste Records** — log and retrieve waste entries.
6. **Predictions** — trigger and fetch demand/waste forecasts.
7. **Analytics** — aggregated revenue, profit, and waste reports.
8. **Ask AI** — RAG-based question-answering endpoint.
9. **Student** — read-only menu and availability endpoints.
