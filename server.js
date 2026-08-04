const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const portfolioData = {
    profile: {
        name: "Etsegenet Amsalu",
        bio: "Computer Science student and Frontend Developer focused on building responsive, interactive, and user-friendly web applications."
    },
    projects: [
        {
            id: 1,
            title: "EA Card Game",
            category: "frontend",
            description: "Interactive educational card game for children.",
            image: "image/proj-card.png",
            tech: ["HTML", "CSS", "JavaScript"],
            live: "https://ea-card-game.vercel.app/",
            github: "https://github.com/haleta-e/EA-card-game"
        },
        {
            id: 2,
            title: "4Kilo Online Shop",
            category: "frontend",
            description: "Campus online shopping system.",
            image: "image/proj-shop.png",
            tech: ["HTML", "CSS", "JavaScript"],
            live: "https://haleta-e.github.io/4kilo-shop/",
            github: "https://github.com/haleta-e/4kilo-shop"
        },
        {
            id: 3,
            title: "EA Study Flow",
            category: "frontend",
            description: "Student productivity and study planner.",
            image: "image/proj-study.png",
            tech: ["HTML", "CSS", "JavaScript"],
            live: "https://ea-study-flow.vercel.app/",
            github: "https://github.com/haleta-e/EA-study-flow"
        },
        {
            id: 4,
            title: "Lost & Found Manager",
            category: "cpp",
            description: "C++ console application for managing lost and found items using file handling and sorting features.",
            image: "image/project.jpg",
            tech: ["C++", "File Handling", "Sorting"],
            live: "https://github.com/haleta-e/lost-and-found-manager",
            github: "https://github.com/haleta-e/lost-and-found-manager"
        },
        {
            id: 5,
            title: "HIBRET System",
            category: "java",
            description: "Java Swing desktop app used to manage traditional equb and edir operations with database support.",
            image: "image/project.jpg",
            tech: ["Java", "Swing", "Database"],
            live: "https://github.com/fenet-as/HIBRET-SYSTEM",
            github: "https://github.com/fenet-as/HIBRET-SYSTEM"
        }
    ],
    skills: [
        { id: 1, name: "HTML5", description: "Semantic and accessible web pages." },
        { id: 2, name: "CSS3", description: "Responsive layouts, Flexbox, Grid and animations." },
        { id: 3, name: "JavaScript", description: "Interactive websites and dynamic functionality." },
        { id: 4, name: "DOM Manipulation", description: "Creating interactive interfaces with JavaScript." },
        { id: 5, name: "JSON", description: "Working with structured data in web applications." },
        { id: 6, name: "Responsive Design", description: "Building websites that work on all devices." },
        { id: 7, name: "Git & GitHub", description: "Version control and project management." },
        { id: 8, name: "Java", description: "Object-oriented programming and application development." },
        { id: 9, name: "C++", description: "Algorithms, problem solving and data structures." }
    ],
    certificates: [
        {
            id: 1,
            title: "Android Developer Fundamentals",
            organization: "ECODERS",
            image: "https://i.imgur.com/dKELsFv.png",
            description: "Successfully completed Android Developer Fundamentals."
        },
        {
            id: 2,
            title: "Programming Fundamentals",
            organization: "ECODERS",
            image: "https://i.imgur.com/G5gG6oO.png",
            description: "Successfully completed Programming Fundamentals."
        }
    ],
    learning: [
        { id: 1, title: "JavaScript ES6", progress: 30 },
        { id: 2, title: "DOM Manipulation", progress: 10 },
        { id: 3, title: "JSON", progress: 10 }
    ],
    experience: [
        {
            id: 1,
            title: "INSA Summer Camp Participant",
            subtitle: "",
            description: "Gained hands-on experience in development and team collaboration.",
            technologies: [],
            responsibilities: []
        },
        {
            id: 2,
            title: "Frontend Development Trainee",
            subtitle: "Frontend Development Track | 2026",
            description: "Participated in intensive frontend development training.",
            technologies: ["HTML", "CSS", "JavaScript", "JSON", "Git", "GitHub"],
            responsibilities: ["Developed responsive web interfaces", "Implemented interactive features"]
        },
        {
            id: 3,
            title: "Java Developer",
            subtitle: "HIBRET System Project | 2026",
            description: "Developed a desktop-based management system using Java and MySQL.",
            technologies: ["Java", "Java Swing", "MySQL"],
            responsibilities: ["Designed GUI", "Implemented database operations"]
        }
    ]
};

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/portfolio", (req, res) => {
    res.json(portfolioData);
});

app.patch("/api/portfolio/:section/:id", (req, res) => {
    const { section, id } = req.params;
    const listName = {
        project: "projects",
        skill: "skills",
        learning: "learning",
        certificate: "certificates",
        experience: "experience",
        profile: "profile"
    }[section];

    if (!listName) return res.status(400).json({ error: "Unsupported section" });

    if (section === "profile") {
        portfolioData.profile = { ...portfolioData.profile, ...req.body };
        return res.json({ profile: portfolioData.profile });
    }

    const list = portfolioData[listName];
    const item = list.find(entry => entry.id === Number(id));

    if (!item) return res.status(404).json({ error: "Item not found" });

    if (section === "project") {
        if (req.body.title !== undefined) item.title = req.body.title;
        if (req.body.description !== undefined) item.description = req.body.description;
        if (req.body.tech !== undefined) item.tech = Array.isArray(req.body.tech) ? req.body.tech : req.body.tech.split(",").map(value => value.trim()).filter(Boolean);
        if (req.body.live !== undefined) item.live = req.body.live;
        if (req.body.github !== undefined) item.github = req.body.github;
    } else if (section === "skill") {
        if (req.body.name !== undefined) item.name = req.body.name;
        if (req.body.description !== undefined) item.description = req.body.description;
    } else if (section === "learning") {
        if (req.body.title !== undefined) item.title = req.body.title;
        if (req.body.progress !== undefined) item.progress = Math.min(100, Math.max(0, Number(req.body.progress)));
    } else if (section === "certificate") {
        if (req.body.title !== undefined) item.title = req.body.title;
        if (req.body.organization !== undefined) item.organization = req.body.organization;
        if (req.body.description !== undefined) item.description = req.body.description;
    } else if (section === "experience") {
        if (req.body.title !== undefined) item.title = req.body.title;
        if (req.body.subtitle !== undefined) item.subtitle = req.body.subtitle;
        if (req.body.description !== undefined) item.description = req.body.description;
        if (req.body.technologies !== undefined) item.technologies = Array.isArray(req.body.technologies) ? req.body.technologies : req.body.technologies.split(",").map(value => value.trim()).filter(Boolean);
        if (req.body.responsibilities !== undefined) item.responsibilities = Array.isArray(req.body.responsibilities) ? req.body.responsibilities : req.body.responsibilities.split(",").map(value => value.trim()).filter(Boolean);
    }

    return res.json({ [listName]: list });
});

app.get("/profile", (req, res) => res.json(portfolioData.profile));
app.patch("/profile", (req, res) => {
    if (req.body.name !== undefined) portfolioData.profile.name = req.body.name;
    if (req.body.bio !== undefined) portfolioData.profile.bio = req.body.bio;
    res.json({ message: "Profile updated", profile: portfolioData.profile });
});

app.get("/experience", (req, res) => res.json(portfolioData.experience));
app.get("/experience/:id", (req, res) => {
    const item = portfolioData.experience.find(exp => exp.id === Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Experience not found" });
    res.json(item);
});
app.patch("/experience/:id", (req, res) => {
    const item = portfolioData.experience.find(exp => exp.id === Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Experience not found" });
    if (req.body.title !== undefined) item.title = req.body.title;
    if (req.body.subtitle !== undefined) item.subtitle = req.body.subtitle;
    if (req.body.description !== undefined) item.description = req.body.description;
    if (req.body.technologies !== undefined) item.technologies = Array.isArray(req.body.technologies) ? req.body.technologies : req.body.technologies.split(",").map(value => value.trim()).filter(Boolean);
    if (req.body.responsibilities !== undefined) item.responsibilities = Array.isArray(req.body.responsibilities) ? req.body.responsibilities : req.body.responsibilities.split(",").map(value => value.trim()).filter(Boolean);
    res.json({ message: "Experience updated", experience: item });
});

app.patch("/project/:id", (req, res) => {
    const item = portfolioData.projects.find(project => project.id === Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Project not found" });
    if (req.body.title !== undefined) item.title = req.body.title;
    if (req.body.description !== undefined) item.description = req.body.description;
    if (req.body.tech !== undefined) item.tech = Array.isArray(req.body.tech) ? req.body.tech : req.body.tech.split(",").map(value => value.trim()).filter(Boolean);
    if (req.body.live !== undefined) item.live = req.body.live;
    if (req.body.github !== undefined) item.github = req.body.github;
    res.json({ message: "Project updated", project: item });
});

app.patch("/skill/:id", (req, res) => {
    const item = portfolioData.skills.find(skill => skill.id === Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Skill not found" });
    if (req.body.name !== undefined) item.name = req.body.name;
    if (req.body.description !== undefined) item.description = req.body.description;
    res.json({ message: "Skill updated", skill: item });
});

app.patch("/learning/:id", (req, res) => {
    const item = portfolioData.learning.find(entry => entry.id === Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Learning item not found" });
    if (req.body.title !== undefined) item.title = req.body.title;
    if (req.body.progress !== undefined) item.progress = Math.min(100, Math.max(0, Number(req.body.progress)));
    res.json({ message: "Learning updated", learning: item });
});

app.patch("/certificate/:id", (req, res) => {
    const item = portfolioData.certificates.find(entry => entry.id === Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Certificate not found" });
    if (req.body.title !== undefined) item.title = req.body.title;
    if (req.body.organization !== undefined) item.organization = req.body.organization;
    if (req.body.description !== undefined) item.description = req.body.description;
    res.json({ message: "Certificate updated", certificate: item });
});

// GET all certificates
app.get("/certificate", (req, res) => {
    res.json(portfolioData.certificates);
});

// GET single certificate
app.get("/certificate/:id", (req, res) => {
    const item = portfolioData.certificates.find(entry => entry.id === Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Certificate not found" });
    res.json(item);
});

// POST new certificate
app.post("/certificate", (req, res) => {
    const newId = Math.max(...portfolioData.certificates.map(c => c.id), 0) + 1;
    const newCert = { id: newId, ...req.body };
    portfolioData.certificates.push(newCert);
    res.status(201).json({ message: "Certificate created", certificate: newCert });
});

// DELETE certificate
app.delete("/certificate/:id", (req, res) => {
    const index = portfolioData.certificates.findIndex(entry => entry.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Certificate not found" });
    const deleted = portfolioData.certificates.splice(index, 1);
    res.json({ message: "Certificate deleted", certificate: deleted[0] });
});

// GET all skills
app.get("/skill", (req, res) => {
    res.json(portfolioData.skills);
});

// GET single skill
app.get("/skill/:id", (req, res) => {
    const item = portfolioData.skills.find(skill => skill.id === Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Skill not found" });
    res.json(item);
});

// POST new skill
app.post("/skill", (req, res) => {
    const newId = Math.max(...portfolioData.skills.map(s => s.id), 0) + 1;
    const newSkill = { id: newId, ...req.body };
    portfolioData.skills.push(newSkill);
    res.status(201).json({ message: "Skill created", skill: newSkill });
});

// DELETE skill
app.delete("/skill/:id", (req, res) => {
    const index = portfolioData.skills.findIndex(skill => skill.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Skill not found" });
    const deleted = portfolioData.skills.splice(index, 1);
    res.json({ message: "Skill deleted", skill: deleted[0] });
});

// GET all learning
app.get("/learning", (req, res) => {
    res.json(portfolioData.learning);
});

// GET single learning item
app.get("/learning/:id", (req, res) => {
    const item = portfolioData.learning.find(entry => entry.id === Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Learning item not found" });
    res.json(item);
});

// POST new learning item
app.post("/learning", (req, res) => {
    const newId = Math.max(...portfolioData.learning.map(l => l.id), 0) + 1;
    const newLearning = { id: newId, ...req.body };
    portfolioData.learning.push(newLearning);
    res.status(201).json({ message: "Learning item created", learning: newLearning });
});

// DELETE learning item
app.delete("/learning/:id", (req, res) => {
    const index = portfolioData.learning.findIndex(entry => entry.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Learning item not found" });
    const deleted = portfolioData.learning.splice(index, 1);
    res.json({ message: "Learning item deleted", learning: deleted[0] });
});

// GET all projects
app.get("/project", (req, res) => {
    res.json(portfolioData.projects);
});

// GET single project
app.get("/project/:id", (req, res) => {
    const item = portfolioData.projects.find(project => project.id === Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Project not found" });
    res.json(item);
});

// POST new project
app.post("/project", (req, res) => {
    const newId = Math.max(...portfolioData.projects.map(p => p.id), 0) + 1;
    const newProject = { id: newId, ...req.body };
    portfolioData.projects.push(newProject);
    res.status(201).json({ message: "Project created", project: newProject });
});

// DELETE project
app.delete("/project/:id", (req, res) => {
    const index = portfolioData.projects.findIndex(project => project.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Project not found" });
    const deleted = portfolioData.projects.splice(index, 1);
    res.json({ message: "Project deleted", project: deleted[0] });
});

// PUT methods (full update)
app.put("/project/:id", (req, res) => {
    const item = portfolioData.projects.find(project => project.id === Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Project not found" });
    Object.assign(item, req.body);
    res.json({ message: "Project updated", project: item });
});

app.put("/skill/:id", (req, res) => {
    const item = portfolioData.skills.find(skill => skill.id === Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Skill not found" });
    Object.assign(item, req.body);
    res.json({ message: "Skill updated", skill: item });
});

app.put("/learning/:id", (req, res) => {
    const item = portfolioData.learning.find(entry => entry.id === Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Learning item not found" });
    Object.assign(item, req.body);
    res.json({ message: "Learning item updated", learning: item });
});

app.put("/certificate/:id", (req, res) => {
    const item = portfolioData.certificates.find(entry => entry.id === Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Certificate not found" });
    Object.assign(item, req.body);
    res.json({ message: "Certificate updated", certificate: item });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Portfolio running on http://localhost:${PORT}`);
});
