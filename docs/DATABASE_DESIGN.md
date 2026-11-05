# Database Design & Schema

**Status:** Live Production SQLite Schema  
**Engine:** SQLite 3 via `better-sqlite3` with Foreign Keys enabled  
**Storage Location:** `/backend/storage/portfolio.db`

---

## 1. Design Rationale

SQLite was selected for its high performance, zero-network latency, and ACID compliance in embedded environments. Foreign key constraints are enforced (`PRAGMA foreign_keys = ON;`).

---

## 2. Table Schemas

### `admins`
Stores authenticated dashboard administrators.
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `email` TEXT UNIQUE NOT NULL
- `password_hash` TEXT NOT NULL
- `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
- `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP
- `last_login_at` DATETIME
- `is_active` INTEGER DEFAULT 1

### `projects`
Stores portfolio projects and case studies.
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `title` TEXT NOT NULL
- `slug` TEXT UNIQUE NOT NULL
- `short_description` TEXT NOT NULL
- `description` TEXT NOT NULL
- `category` TEXT NOT NULL DEFAULT 'frontend'
- `status` TEXT NOT NULL DEFAULT 'completed'
- `publication_status` TEXT NOT NULL DEFAULT 'published' ('draft' | 'published')
- `is_featured` INTEGER DEFAULT 0
- `display_order` INTEGER DEFAULT 0
- `role_and_contribution` TEXT
- `key_features` TEXT (JSON or markdown list)
- `challenges_and_solutions` TEXT
- `github_url` TEXT
- `live_demo_url` TEXT
- `image` TEXT
- `start_date` TEXT
- `completion_date` TEXT
- `published_at` DATETIME DEFAULT CURRENT_TIMESTAMP
- `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
- `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP

### `technologies` & `project_technologies`
Relational mapping between projects and technical stacks.
- `technologies`: `id`, `name` (UNIQUE), `category`
- `project_technologies`: `project_id`, `technology_id` (Composite Primary Key with CASCADE deletion)

### `skills`
Categorized skills for the 4-Suited Playing Card decks (Frontend, Languages, Backend/DB, Developer Tools).
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `name` TEXT NOT NULL
- `category` TEXT NOT NULL
- `level` TEXT NOT NULL DEFAULT 'Intermediate'
- `progress` INTEGER DEFAULT 80
- `is_visible` INTEGER DEFAULT 1
- `display_order` INTEGER DEFAULT 0

### `experiences`
Journey timeline entries (AAU student studies, internships, engineering projects).
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `title` TEXT NOT NULL (Role title)
- `company` TEXT NOT NULL (Organization/University)
- `location` TEXT
- `start_date` TEXT NOT NULL
- `end_date` TEXT
- `is_current` INTEGER DEFAULT 0
- `description` TEXT NOT NULL
- `achievements` TEXT
- `publication_status` TEXT NOT NULL DEFAULT 'published'
- `display_order` INTEGER DEFAULT 0

### `certificates`
Verified credentials, honors, and continuous learning tracks.
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `title` TEXT NOT NULL
- `issuer` TEXT NOT NULL
- `issue_date` TEXT NOT NULL
- `credential_id` TEXT
- `credential_url` TEXT
- `image` TEXT
- `publication_status` TEXT NOT NULL DEFAULT 'published'
- `display_order` INTEGER DEFAULT 0

### `education`
Academic history at Addis Ababa University and prior coursework.
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `degree` TEXT NOT NULL
- `institution` TEXT NOT NULL
- `field_of_study` TEXT NOT NULL
- `start_year` TEXT NOT NULL
- `end_year` TEXT
- `description` TEXT
- `publication_status` TEXT NOT NULL DEFAULT 'published'

### `messages`
Contact messages submitted through "The Four Honours" contact experience.
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `name` TEXT NOT NULL
- `email` TEXT NOT NULL
- `subject` TEXT NOT NULL
- `message` TEXT NOT NULL
- `is_read` INTEGER DEFAULT 0
- `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
