# Contributing to MealWise

## Branching Strategy
- `main` — production-ready code only, protected branch.
- `develop` — integration branch; all feature branches merge here first.
- `feature/<scope>` — individual feature work (e.g. `feature/auth`, `feature/food-management`).
- `fix/<scope>` — bug fixes.
- `docs/<scope>` — documentation-only changes.

## Pull Request Process
1. Branch from `develop`.
2. Keep PRs focused on a single feature or fix.
3. Ensure all tests pass before requesting review.
4. Require at least one peer review before merging.

## Commit Message Format
```
<type>(<scope>): <short description>

Types: feat | fix | docs | style | refactor | test | chore
```

## Code Style
- Frontend: follow ESLint + Prettier config (to be added).
- Backend: follow PEP 8; use `ruff` for linting (to be added).

## Shared Modules
- **UI components** → `frontend/src/components/`
- **CSS design tokens** → `frontend/src/styles/`
- **API contracts** → `docs/api-contracts.md`
- **DB config & models** → `backend/app/db/` and `backend/app/models/`
