# Architecture

> **Status:** Placeholder — to be completed during the architecture design phase.

## Sections to cover
1. **System overview** — high-level diagram of frontend ↔ backend ↔ database ↔ ML pipeline.
2. **Frontend architecture** — component hierarchy, routing strategy, state management approach.
3. **Backend architecture** — FastAPI layer structure (routes → services → repositories → models).
4. **Database design overview** — entity relationships (see `database-design.md` for details).
5. **ML pipeline** — data ingestion, feature engineering, model training, and inference flow.
6. **RAG pipeline** — document ingestion, embedding storage (pgvector), retrieval, and LLM call.
7. **Authentication & authorization** — JWT flow, role-based access (Admin / Student).
8. **Deployment topology** — intended hosting environment and container strategy.
