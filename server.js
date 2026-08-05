const express = require("express");
const session = require("express-session");
const fs = require("fs");
const path = require("path");

const app = express();
const dataPath = path.join(__dirname, "data", "portfolio.json");
const adminUser = process.env.ADMIN_USERNAME || "admin";
const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
let portfolioData = JSON.parse(fs.readFileSync(dataPath, "utf8"));

app.use(express.json({ limit: "1mb" }));
app.use(session({ secret: process.env.SESSION_SECRET || "change-this-session-secret", resave: false, saveUninitialized: false, cookie: { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 8 * 60 * 60 * 1000 } }));
app.use(express.static(__dirname));

function saveData() {
  const tempPath = `${dataPath}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(portfolioData, null, 2));
  fs.renameSync(tempPath, dataPath);
}
function requireAdmin(req, res, next) { if (!req.session.isAdmin) return res.status(401).json({ error: "Admin login required" }); next(); }
function sectionName(value) { return { project: "projects", projects: "projects", skill: "skills", skills: "skills", learning: "learning", certificate: "certificates", certificates: "certificates", experience: "experience" }[value]; }
function cleanArray(value) { return Array.isArray(value) ? value.map(String).map(v => v.trim()).filter(Boolean) : String(value || "").split(",").map(v => v.trim()).filter(Boolean); }
function validate(section, body) { if (["projects", "skills", "learning", "certificates", "experience"].includes(section) && !String(body.title || body.name || "").trim()) return "A title or name is required"; if (section === "learning" && (!Number.isInteger(Number(body.progress)) || Number(body.progress) < 0 || Number(body.progress) > 100)) return "Progress must be a whole number from 0 to 100"; return null; }
function normalize(section, body, existing = {}) {
  const item = { ...existing, ...body };
  if (section === "projects") item.tech = cleanArray(body.tech ?? existing.tech);
  if (section === "experience") { item.technologies = cleanArray(body.technologies ?? existing.technologies); item.responsibilities = cleanArray(body.responsibilities ?? existing.responsibilities); }
  if (section === "learning") item.progress = Number(body.progress ?? existing.progress ?? 0);
  return item;
}

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/admin", (req, res) => res.sendFile(path.join(__dirname, "admin.html")));
app.get("/api/portfolio", (req, res) => res.json(portfolioData));
app.get("/api/admin/session", (req, res) => res.json({ authenticated: Boolean(req.session.isAdmin), username: req.session.username || null }));
app.post("/api/admin/login", (req, res) => { const { username, password } = req.body || {}; if (username !== adminUser || password !== adminPassword) return res.status(401).json({ error: "Incorrect username or password" }); req.session.isAdmin = true; req.session.username = username; res.json({ ok: true }); });
app.post("/api/admin/logout", requireAdmin, (req, res) => req.session.destroy(() => res.json({ ok: true })));
app.get("/api/admin/portfolio", requireAdmin, (req, res) => res.json(portfolioData));
app.patch("/api/admin/profile", requireAdmin, (req, res) => { const { name, bio, email, linkedin, github } = req.body || {}; if (!String(name || "").trim() || !String(bio || "").trim()) return res.status(400).json({ error: "Name and bio are required" }); portfolioData.profile = { ...portfolioData.profile, name: String(name).trim(), bio: String(bio).trim(), email: String(email || "").trim(), linkedin: String(linkedin || "").trim(), github: String(github || "").trim() }; saveData(); res.json(portfolioData.profile); });
app.post("/api/admin/:section", requireAdmin, (req, res) => { const section = sectionName(req.params.section); if (!section) return res.status(400).json({ error: "Unsupported section" }); const error = validate(section, req.body); if (error) return res.status(400).json({ error }); const list = portfolioData[section]; const id = list.length ? Math.max(...list.map(item => Number(item.id) || 0)) + 1 : 1; const item = normalize(section, req.body, { id }); item.id = id; list.push(item); saveData(); res.status(201).json(item); });
app.patch("/api/admin/:section/:id", requireAdmin, (req, res) => { const section = sectionName(req.params.section); const list = portfolioData[section]; if (!list) return res.status(400).json({ error: "Unsupported section" }); const index = list.findIndex(item => item.id === Number(req.params.id)); if (index < 0) return res.status(404).json({ error: "Item not found" }); const error = validate(section, { ...list[index], ...req.body }); if (error) return res.status(400).json({ error }); list[index] = normalize(section, req.body, list[index]); saveData(); res.json(list[index]); });
app.delete("/api/admin/:section/:id", requireAdmin, (req, res) => { const section = sectionName(req.params.section); const list = portfolioData[section]; if (!list) return res.status(400).json({ error: "Unsupported section" }); const index = list.findIndex(item => item.id === Number(req.params.id)); if (index < 0) return res.status(404).json({ error: "Item not found" }); list.splice(index, 1); saveData(); res.json({ ok: true }); });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Portfolio running on http://localhost:${PORT}`));
