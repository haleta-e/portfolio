# Development & Milestone Log

This log chronicles all milestones, architectural transitions, and development progress for Etsegenet Amsalu's developer portfolio.

---

## 2026-11-04 — Full-Stack Integration, Atelier Playing Cards & Multi-Page Architecture

### Milestone 1: Multi-Page "Show Less First" Architecture
- **Decision:** Shift from a monolithic, cluttered single-page scroll to a spacious, intentional multi-page view router with URL hash synchronization (`#home`, `#about`, `#projects`, `#experience`, `#skills`, `#certificates`, `#contact`).
- **Rationale:** Prevents cognitive fatigue, allows users to explore intentionally, and provides deep-linking for direct sharing.

### Milestone 2: The Atelier Deck Playing Card Design System
- **Decision:** Implement interactive physical card decks inspired by atelier playing cards.
  - **Hero Deck:** 4 interactive cards presenting AAU Computer Science identity and frontend craft.
  - **Journey Deck (Experience):** Dual-corner card indices (`AAU / 01`, `02 / DEV`) documenting university coursework and internship training.
  - **4-Suited Technical Decks (Skills):** Categorized into ♠ Spades (Frontend), ♥ Hearts (Languages), ♦ Diamonds (Backend & Database), and ♣ Clubs (Developer Tooling) with interactive suit filtering.
  - **The Four Honours (Contact):** Ace of Contact, King of Repositories, Queen of AAU Campus, and Jack of Direct Messages with interactive flip cards and live dispatch.
- **Typography & Aesthetics:** Replaced default modern blue with editorial typography (`Fraunces` display serif, `Plus Jakarta Sans`, and `Space Mono`) over warm charcoal (`#0D0D11`) and cream parchment (`#F8F6F0`).

### Milestone 3: Full-Stack Backend & SQLite Persistence
- **Decision:** Transition from purely static JSON to a full-stack Node.js + Express backend (`server.ts`) with an embedded SQLite database (`better-sqlite3`).
- **Security:** Integrated Helmet, CORS, and Express rate limiting on contact form submissions and authentication endpoints.
- **Media:** Modular file upload pipeline for project screenshots and avatars.

### Milestone 4: Conventional Git History & GitHub Synchronization
- **Decision:** Structure the entire rewrite into 31 atomic conventional commits documenting every architectural, styling, and backend decision.
- **Status:** All 31 commits successfully pushed to `main` on [github.com/haleta-e/portfolio](https://github.com/haleta-e/portfolio).

---

## 2026-11-03 — Initial Planning & Exploration
- Evaluated existing static frontend and established modular monorepo target.
- Defined requirements for owner dashboard, verified credentials, and responsive layouts.
