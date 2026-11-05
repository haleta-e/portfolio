# Etsegenet Amsalu — Developer Portfolio & Atelier Deck

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-success?style=for-the-badge&logo=vercel)](https://portfolio-two-gamma-op2rvuee0r.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Portfolio-181717?style=for-the-badge&logo=github)](https://github.com/haleta-e/portfolio)

**🌐 Live Application URL**: [https://portfolio-two-gamma-op2rvuee0r.vercel.app](https://portfolio-two-gamma-op2rvuee0r.vercel.app)

An editorial, interactive full-stack personal developer portfolio for **Etsegenet Amsalu** — Computer Science student at Addis Ababa University and frontend developer crafting responsive interfaces, clean architectures, and interactive digital experiences.

---

## ✨ Design Concept & UX Philosophy: "The Atelier Deck"

- **Show Less First Architecture**: Rather than overwhelming visitors with an endless single-page scroll, the portfolio introduces a spacious, intentional initial screen with a curated 4-card Atelier Deck. Visitors progressively discover in-depth content through intentional interaction and dedicated view switching.
- **Top-Centered Circular Profile**: Polished circular avatar flanked by warm editorial typography (`Fraunces` editorial serif, `Plus Jakarta Sans`, and `Space Mono`).
- **Interactive Playing Card Motifs**:
  - **Hero Deck**: 4 interactive atelier cards (Computer Science at AAU, Frontend Craft, Full-Stack Stack, Creative Exploration).
  - **Journey Deck (Experience)**: Dual corner card indices (`AAU / 01`, `02 / DEV`) documenting university coursework and internship training.
  - **4-Suited Technical Decks (Skills)**: Categorized into ♠ Spades (Frontend), ♥ Hearts (Languages), ♦ Diamonds (Backend & Database), and ♣ Clubs (Developer Tooling) with interactive suit filtering.
  - **The Four Honours (Contact)**: Ace of Contact, King of Repositories, Queen of AAU Campus, and Jack of Messages with live direct dispatch.
- **Zero-Pill Discipline & Refined Aesthetic**: Deep charcoal (`#0D0D11`), ivory parchment (`#F8F6F0`), and warm copper accent (`#C85A32`) with tactile 3D card perspectives.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**:
  - React 19 + TypeScript
  - Tailwind CSS v4
  - Lucide React iconography
  - Google Fonts: Fraunces (Editorial Display Serif), Plus Jakarta Sans (Geometric Sans), Space Mono (Monospace)
- **Backend & Full-Stack**:
  - Node.js & Express (`server.ts`)
  - SQLite local database via `better-sqlite3`
  - Vite dev server middleware mounted directly in development
  - Security suite: Helmet, CORS, and Express rate limiting
- **Build System**:
  - Vite 6+ with `@vitejs/plugin-react` and `@tailwindcss/vite`
  - Strict TypeScript compilation (`tsconfig.json`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node.js 22 LTS)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/haleta-e/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### Running Locally
```bash
# Start the full-stack development server (Express API + Vite frontend)
npm run dev

# Open in browser:
http://localhost:3000
```

### Production Build
```bash
# Build frontend bundles
npm run build

# Start production server
npm start
```

---

## 📂 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── database/       # SQLite database initialization & migrations
│   │   ├── middleware/     # Security, authentication, and file upload handlers
│   │   └── routes/         # Modular REST API endpoints (/api/*)
│   └── storage/            # Local SQLite database files & upload storage
├── src/
│   ├── admin/              # Comprehensive in-browser administration modules
│   ├── components/         # Interactive Atelier Deck components
│   │   ├── About.tsx       # AAU student profile & background
│   │   ├── BackToTop.tsx   # Smooth scroll-to-top interaction
│   │   ├── Certificates.tsx# Verified credentials showcase
│   │   ├── Contact.tsx     # The Four Honours playing card contact suite
│   │   ├── Experience.tsx  # Journey deck with dual corner indices
│   │   ├── Footer.tsx      # Editorial footer with status badge
│   │   ├── Hero.tsx        # Centered circular avatar & Atelier Deck
│   │   ├── Navbar.tsx      # Minimal navigation with view indicators
│   │   ├── Projects.tsx    # Filterable project catalog
│   │   └── Skills.tsx      # 4-suited technical capabilities
│   ├── data/               # Initial portfolio data & verified records
│   ├── App.tsx             # "Show Less First" view orchestrator & state machine
│   ├── index.css           # 3D card perspectives & Tailwind v4 styling
│   ├── main.tsx            # React 19 application entry point
│   └── types.ts            # TypeScript interfaces & domain models
├── index.html              # HTML shell & font definitions
├── metadata.json           # Application metadata & configuration
├── server.ts               # Express full-stack backend entry
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

---

## 👤 Author

**Etsegenet Amsalu**
- Degree: B.Sc. in Computer Science, Addis Ababa University
- Email: [etsegenetamsalu56@gmail.com](mailto:etsegenetamsalu56@gmail.com)
- GitHub: [@haleta-e](https://github.com/haleta-e)

---

## 📄 License
ISC License
