# REST API Documentation

**Status:** Live Production API Reference.  
**Base Path:** `/api`

All write operations validate incoming request payloads with Zod schemas. Administrative endpoints require an active administrator session.

---

## 1. Public Endpoints

| Method | Endpoint | Query Parameters | Description |
|---|---|---|---|
| `GET` | `/api/public/portfolio` | None | Returns aggregated portfolio payload (profile, published projects, skills, experiences, certificates, education). |
| `GET` | `/api/public/projects` | `category`, `search` | Returns filtered and searched published projects. |
| `GET` | `/api/public/projects/:slug` | None | Returns a single published project by slug. |
| `POST` | `/api/contact` | Body: `{ name, email, subject, message }` | Submits a visitor message. Rate-limited (max 5 per 15 min). |

---

## 2. Authentication Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Authenticates administrator with email & password. Rate-limited. |
| `POST` | `/api/auth/logout` | Terminates active administrator session. |
| `GET` | `/api/auth/me` | Returns current admin user profile if authenticated. |

---

## 3. Administrative Management Endpoints

All admin endpoints require an authenticated session (`requireAdmin` middleware).

### Projects (`/api/admin/projects`)
- `GET /api/admin/projects` — List all projects (including drafts).
- `POST /api/admin/projects` — Create a new project.
- `GET /api/admin/projects/:id` — Get full project record.
- `PATCH /api/admin/projects/:id` — Update project fields.
- `DELETE /api/admin/projects/:id` — Remove project.

### Skills & Categories (`/api/admin/skills`)
- `GET /api/admin/skills` — List all technical skills.
- `POST /api/admin/skills` — Add new skill.
- `PATCH /api/admin/skills/:id` — Update skill progress, visibility, or order.
- `DELETE /api/admin/skills/:id` — Delete skill.

### Experiences (`/api/admin/experiences`)
- `GET /api/admin/experiences` — List journey timeline entries.
- `POST /api/admin/experiences` — Create experience entry.
- `PATCH /api/admin/experiences/:id` — Update experience.
- `DELETE /api/admin/experiences/:id` — Remove experience.

### Certificates & Learning (`/api/admin/certificates`)
- `GET /api/admin/certificates` — List all certificates and credentials.
- `POST /api/admin/certificates` — Add credential.
- `PATCH /api/admin/certificates/:id` — Update credential.
- `DELETE /api/admin/certificates/:id` — Delete credential.

### Education (`/api/admin/education`)
- `GET /api/admin/education` — List educational background.
- `POST /api/admin/education` — Add education record.
- `PATCH /api/admin/education/:id` — Update record.
- `DELETE /api/admin/education/:id` — Delete record.

### Contact Messages (`/api/admin/messages`)
- `GET /api/admin/messages` — Review received contact messages.
- `PATCH /api/admin/messages/:id` — Mark message as read/replied.
- `DELETE /api/admin/messages/:id` — Delete message record.

### Media & Uploads (`/api/admin/upload`)
- `POST /api/admin/upload` — Multipart form-data upload for screenshots, avatars, and documents.
