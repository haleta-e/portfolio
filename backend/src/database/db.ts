import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const storageDir = path.join(process.cwd(), 'backend', 'storage');
if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir, { recursive: true });
}

const uploadsDir = path.join(storageDir, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const dbPath = path.join(storageDir, 'portfolio.db');
export const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login_at DATETIME,
      is_active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      short_description TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'frontend',
      status TEXT NOT NULL DEFAULT 'completed',
      publication_status TEXT NOT NULL DEFAULT 'published',
      is_featured INTEGER DEFAULT 0,
      display_order INTEGER DEFAULT 0,
      role_and_contribution TEXT,
      key_features TEXT,
      challenges_and_solutions TEXT,
      github_url TEXT,
      live_demo_url TEXT,
      image TEXT,
      start_date TEXT,
      completion_date TEXT,
      published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS technologies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      category TEXT
    );

    CREATE TABLE IF NOT EXISTS project_technologies (
      project_id INTEGER NOT NULL,
      technology_id INTEGER NOT NULL,
      PRIMARY KEY (project_id, technology_id),
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
      FOREIGN KEY (technology_id) REFERENCES technologies(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      original_filename TEXT NOT NULL,
      storage_key TEXT UNIQUE NOT NULL,
      public_url TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size_bytes INTEGER NOT NULL,
      width INTEGER,
      height INTEGER,
      visibility TEXT NOT NULL DEFAULT 'public',
      uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS project_images (
      project_id INTEGER NOT NULL,
      media_id INTEGER NOT NULL,
      alt_text TEXT,
      display_order INTEGER DEFAULT 0,
      is_cover INTEGER DEFAULT 0,
      PRIMARY KEY (project_id, media_id),
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
      FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT DEFAULT 'Frontend',
      description TEXT NOT NULL,
      proficiency_label TEXT DEFAULT 'Advanced',
      display_order INTEGER DEFAULT 0,
      is_visible INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS experiences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      subtitle TEXT,
      organization TEXT DEFAULT 'Self',
      role TEXT,
      description TEXT NOT NULL,
      location TEXT,
      technologies TEXT,
      responsibilities TEXT,
      start_date TEXT,
      end_date TEXT,
      is_current INTEGER DEFAULT 0,
      display_order INTEGER DEFAULT 0,
      publication_status TEXT DEFAULT 'published'
    );

    CREATE TABLE IF NOT EXISTS certificates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      issuing_organization TEXT NOT NULL,
      issue_date TEXT,
      credential_url TEXT,
      description TEXT NOT NULL,
      image TEXT,
      media_id INTEGER,
      publication_status TEXT DEFAULT 'published',
      display_order INTEGER DEFAULT 0,
      FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS education (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      institution TEXT NOT NULL,
      qualification TEXT NOT NULL,
      field_of_study TEXT NOT NULL,
      start_date TEXT,
      end_date TEXT,
      description TEXT,
      display_order INTEGER DEFAULT 0,
      publication_status TEXT DEFAULT 'published'
    );

    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      full_name TEXT NOT NULL,
      professional_title TEXT NOT NULL,
      biography TEXT NOT NULL,
      email TEXT NOT NULL,
      location TEXT DEFAULT 'Addis Ababa, Ethiopia',
      avatar_url TEXT,
      cv_media_id INTEGER,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (cv_media_id) REFERENCES media(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sender_name TEXT NOT NULL,
      sender_email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'unread',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      reviewed_at DATETIME
    );
  `);

  // Seed default Admin user if none exists (email: etsegenetamsalu56@gmail.com / pass: Admin123!)
  const adminCount = (db.prepare('SELECT COUNT(*) as count FROM admins').get() as any).count;
  if (adminCount === 0) {
    const defaultPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
    const passwordHash = bcrypt.hashSync(defaultPassword, 10);
    db.prepare(`
      INSERT INTO admins (email, password_hash, is_active)
      VALUES (?, ?, 1)
    `).run('etsegenetamsalu56@gmail.com', passwordHash);
    console.log('✅ Default admin account created: etsegenetamsalu56@gmail.com');
  }

  // Seed default Profile if none exists
  const profileCount = (db.prepare('SELECT COUNT(*) as count FROM profile').get() as any).count;
  if (profileCount === 0) {
    db.prepare(`
      INSERT INTO profile (id, full_name, professional_title, biography, email, avatar_url)
      VALUES (1, ?, ?, ?, ?, ?)
    `).run(
      'Etsegenet Amsalu',
      'Computer Science Student & Frontend Developer',
      'Computer Science student and Frontend Developer focused on building responsive, interactive, and user-friendly web applications.',
      'etsegenetamsalu56@gmail.com',
      'image/6003481707438345603_120.jpg'
    );
  }

  // Seed default Projects if empty
  const projectCount = (db.prepare('SELECT COUNT(*) as count FROM projects').get() as any).count;
  if (projectCount === 0) {
    const initialProjects = [
      {
        title: "EA Card Game",
        slug: "ea-card-game",
        short_description: "Interactive educational card game for children.",
        description: "An engaging web-based card game designed for educational interactive learning for kids.",
        category: "frontend",
        is_featured: 1,
        github_url: "https://github.com/haleta-e/EA-card-game",
        live_demo_url: "https://ea-card-game.vercel.app/",
        image: "image/proj-card.png"
      },
      {
        title: "4Kilo Online Shop",
        slug: "4kilo-online-shop",
        short_description: "Campus online shopping system.",
        description: "A complete campus-focused online marketplace platform for goods and services.",
        category: "frontend",
        is_featured: 1,
        github_url: "https://github.com/haleta-e/4kilo-shop",
        live_demo_url: "https://haleta-e.github.io/4kilo-shop/",
        image: "image/proj-shop.png"
      },
      {
        title: "EA Study Flow",
        slug: "ea-study-flow",
        short_description: "Student productivity and study planner.",
        description: "A productivity tracking suite helping students organize study sessions, schedules, and tasks.",
        category: "frontend",
        is_featured: 1,
        github_url: "https://github.com/haleta-e/EA-study-flow",
        live_demo_url: "https://ea-study-flow.vercel.app/",
        image: "image/proj-study.png"
      },
      {
        title: "Lost & Found Manager",
        slug: "lost-and-found-manager",
        short_description: "C++ console application for managing lost items.",
        description: "C++ console application for managing lost and found items using file handling and sorting features.",
        category: "cpp",
        is_featured: 0,
        github_url: "https://github.com/haleta-e/lost-and-found-manager",
        live_demo_url: "https://github.com/haleta-e/lost-and-found-manager",
        image: "image/proj-hibret.jpg"
      },
      {
        title: "HIBRET System",
        slug: "hibret-system",
        short_description: "Java Swing desktop app for equb & edir management.",
        description: "Java Swing desktop app used to manage traditional equb and edir operations with database support.",
        category: "java",
        is_featured: 0,
        github_url: "https://github.com/fenet-as/HIBRET-SYSTEM",
        live_demo_url: "https://github.com/fenet-as/HIBRET-SYSTEM",
        image: "image/proj-hibret.jpg"
      }
    ];

    const insertProj = db.prepare(`
      INSERT INTO projects (title, slug, short_description, description, category, is_featured, github_url, live_demo_url, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    initialProjects.forEach(p => {
      insertProj.run(p.title, p.slug, p.short_description, p.description, p.category, p.is_featured, p.github_url, p.live_demo_url, p.image);
    });
  }

  // Seed Skills if empty
  const skillCount = (db.prepare('SELECT COUNT(*) as count FROM skills').get() as any).count;
  if (skillCount === 0) {
    const initialSkills = [
      { name: "HTML5", description: "Semantic and accessible web pages.", category: "Frontend" },
      { name: "CSS3", description: "Responsive layouts, Flexbox, Grid and animations.", category: "Frontend" },
      { name: "JavaScript", description: "Interactive websites and dynamic functionality.", category: "Languages" },
      { name: "DOM Manipulation", description: "Creating interactive interfaces with JavaScript.", category: "Frontend" },
      { name: "JSON", description: "Working with structured data in web applications.", category: "Data" },
      { name: "Responsive Design", description: "Building websites that work on all devices.", category: "Frontend" },
      { name: "Git & GitHub", description: "Version control and project management.", category: "Tools" },
      { name: "Java", description: "Object-oriented programming and application development.", category: "Languages" },
      { name: "C++", description: "Algorithms, problem solving and data structures.", category: "Languages" }
    ];

    const insertSkill = db.prepare(`
      INSERT INTO skills (name, description, category) VALUES (?, ?, ?)
    `);
    initialSkills.forEach(s => insertSkill.run(s.name, s.description, s.category));
  }

  // Seed Experiences if empty
  const expCount = (db.prepare('SELECT COUNT(*) as count FROM experiences').get() as any).count;
  if (expCount === 0) {
    const initialExperiences = [
      {
        title: "INSA Summer Camp Participant",
        subtitle: "INSA | 2025",
        organization: "INSA",
        description: "Gained hands-on experience in development and team collaboration.",
        technologies: "Git, Teamwork, Problem Solving",
        responsibilities: "Collaborated with team members on software fundamentals\nParticipated in daily standups and coding exercises"
      },
      {
        title: "Frontend Development Trainee",
        subtitle: "Frontend Development Track | 2026",
        organization: "Frontend Track",
        description: "Participated in intensive frontend development training.",
        technologies: "HTML, CSS, JavaScript, JSON, Git, GitHub",
        responsibilities: "Developed responsive web interfaces\nImplemented interactive features"
      },
      {
        title: "Java Developer",
        subtitle: "HIBRET System Project | 2026",
        organization: "HIBRET Project",
        description: "Developed a desktop-based management system using Java and MySQL.",
        technologies: "Java, Java Swing, MySQL",
        responsibilities: "Designed GUI\nImplemented database operations"
      }
    ];

    const insertExp = db.prepare(`
      INSERT INTO experiences (title, subtitle, organization, description, technologies, responsibilities)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    initialExperiences.forEach(e => insertExp.run(e.title, e.subtitle, e.organization, e.description, e.technologies, e.responsibilities));
  }

  // Seed Certificates if empty
  const certCount = (db.prepare('SELECT COUNT(*) as count FROM certificates').get() as any).count;
  if (certCount === 0) {
    const initialCertificates = [
      {
        title: "Android Developer Fundamentals",
        issuing_organization: "ECODERS",
        image: "image/cer-programing.png",
        description: "Successfully completed Android Developer Fundamentals."
      },
      {
        title: "Programming Fundamentals",
        issuing_organization: "ECODERS",
        image: "image/cer-development.png",
        description: "Successfully completed Programming Fundamentals."
      }
    ];

    const insertCert = db.prepare(`
      INSERT INTO certificates (title, issuing_organization, image, description)
      VALUES (?, ?, ?, ?)
    `);
    initialCertificates.forEach(c => insertCert.run(c.title, c.issuing_organization, c.image, c.description));
  }

  // Seed Education if empty
  const eduCount = (db.prepare('SELECT COUNT(*) as count FROM education').get() as any).count;
  if (eduCount === 0) {
    db.prepare(`
      INSERT INTO education (institution, qualification, field_of_study, start_date, end_date, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      "Addis Ababa University",
      "Bachelor of Science (B.Sc.)",
      "Computer Science",
      "2023",
      "2027",
      "Focusing on software engineering, algorithms, databases, web development, and object-oriented architecture."
    );
  }
}
