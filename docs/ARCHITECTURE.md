# System Architecture

**Status:** Current production architecture.

## 1. Architectural Overview

The application is a modern, full-stack personal portfolio and content management system designed around the **"Show Less First" Atelier Deck** philosophy. It unites a React 19 frontend with an Express API backend, backed by an embedded SQLite database (`better-sqlite3`).

```text
Visitor / Recruiter Browser                    Portfolio Owner / Admin
        |                                                 |
        v                                                 v
Public "Atelier Deck" SPA                       Private Admin Dashboard
(React 19 + Tailwind v4 + Lucide)               (In-browser CMS & Management)
        |                                                 |
        +-----------------------+-------------------------+
                                |
                                v
                     Express API Server (server.ts)
                   Mounted with Vite dev middleware
                                |
        +-----------------------+-------------------------+
        |                                                 |
        v                                                 v
SQLite Database (`portfolio.db`)                 Local Media Storage
via better-sqlite3 with WAL                      (/backend/storage/uploads)
```

---

## 2. Directory & Component Layout

```text
portfolio/
├── backend/
│   ├── src/
│   │   ├── config/          # Environment & runtime configuration
│   │   ├── database/        # SQLite schema & database initialization (db.ts)
│   │   ├── middleware/      # Auth, security headers, rate limiters, file upload
│   │   └── routes/          # REST API endpoints (api.ts)
│   └── storage/             # Persistent SQLite database & uploaded media
├── docs/                    # Architecture, API, and development documentation
├── src/
│   ├── admin/               # Administrative dashboard and CRUD components
│   ├── components/          # Atelier Deck frontend presentation components
│   │   ├── About.tsx        # AAU background & biographical overview
│   │   ├── BackToTop.tsx    # Smooth scroll-to-top interaction
│   │   ├── Certificates.tsx # Verified credentials showcase
│   │   ├── Contact.tsx      # The Four Honours interactive playing card contact suite
│   │   ├── Experience.tsx   # Journey deck with dual corner indices
│   │   ├── Footer.tsx       # Editorial colophon and live status badge
│   │   ├── Hero.tsx         # Centered circular avatar & 4-card Atelier Deck
│   │   ├── Navbar.tsx       # Minimal floating top navigation with active-view pill
│   │   ├── Projects.tsx     # Filterable and searchable project catalog
│   │   └── Skills.tsx       # 4-suited technical capabilities (♠, ♥, ♦, ♣)
│   ├── data/                # Initial seeds and fallback portfolio data
│   ├── App.tsx              # Deep-linking view router (#home, #projects, etc.)
│   ├── index.css            # 3D perspective, keyframe animations & typography
│   ├── main.tsx             # React 19 client entry point
│   └── types.ts             # Domain models and TypeScript interfaces
├── index.html               # HTML5 shell, web fonts (Fraunces, Plus Jakarta Sans)
├── metadata.json            # AI Studio applet metadata
├── package.json             # Dependencies and scripts
├── server.ts                # Express backend & Vite dev server integration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite build and server settings
```

---

## 3. Frontend Architecture

### 3.1 "Show Less First" View Routing
Rather than a traditional single-page endless scroll that overwhelms visitors, the portfolio implements a lightweight client-side view router with deep-link hash synchronization:

- `#home` — Hero card deck, identity, and curated highlights.
- `#about` — AAU Computer Science journey, background, and vision.
- `#projects` — Full interactive project catalog with category filtering and modal details.
- `#experience` — Chronological journey deck with dual corner indices.
- `#skills` — 4-suited technical playing cards (♠ Spades, ♥ Hearts, ♦ Diamonds, ♣ Clubs).
- `#certificates` — Verified credentials and ongoing learning tracks.
- `#contact` — The Four Honours interactive contact suite and direct message dispatch.

### 3.2 Design System: The Atelier Deck
- **Typography:** Fraunces (Editorial Display Serif), Plus Jakarta Sans (Clean Modern Sans), and Space Mono (Technical Data).
- **Color Palette:** Warm Charcoal (`#0D0D11`), Warm Cream Parchment (`#F8F6F0`), and Burnt Terracotta Accent (`#C85A32`).
- **Tactile 3D Cards:** CSS 3D perspective transforms (`preserve-3d`, `rotateX`, `rotateY`, `scale`) creating interactive physical card decks.

---

## 4. Backend & Security Architecture

1. **Embedded SQLite with WAL Mode:** Fast, zero-configuration local persistence without requiring external database servers.
2. **Security Middleware:**
   - `helmet`: Secure HTTP response headers.
   - `express-rate-limit`: Rate limiting on public contact form and login attempts.
   - `cors`: Restricted cross-origin resource sharing.
3. **Session Management:** Secure cookie-based administrator authentication with bcrypt password hashing.
4. **File Storage:** Safe multipart file uploads with MIME type verification and path sanitization.
