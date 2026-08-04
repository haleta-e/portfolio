const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Temporary database
const projects = [
    {
        id: 1,
        title: "EA Card Game",
        category: "frontend",
        description: "Interactive educational card game for children.",
        image: "https://via.placeholder.com/400x220?text=EA+Card+Game",
        tech: ["HTML", "CSS", "JavaScript"],
        live: "#",
        github: "#"
    },
    {
        id: 2,
        title: "4Kilo Online Shop",
        category: "frontend",
        description: "Campus online shopping system.",
        image: "https://via.placeholder.com/400x220?text=4Kilo+Shop",
        tech: ["HTML", "CSS", "JavaScript"],
        live: "#",
        github: "#"
    },
    {
        id: 3,
        title: "EA Study Flow",
        category: "frontend",
        description: "Student productivity and study planner.",
        image: "https://via.placeholder.com/400x220?text=EA+Study+Flow",
        tech: ["HTML", "CSS", "JavaScript"],
        live: "#",
        github: "#"
    }
];

let profile = {
    name: "Etsegenet Amsalu",
    bio: "Computer Science student and Frontend Developer focused on building responsive, interactive, and user-friendly web applications."
};

let experience = [
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
];

// Profile
app.get("/profile", (req, res) => {
    res.json(profile);
});

app.patch("/profile", (req, res) => {
    if (req.body.name !== undefined) profile.name = req.body.name;
    if (req.body.bio !== undefined) profile.bio = req.body.bio;
    res.json({ message: "Profile updated", profile });
});

// Experience
app.get("/experience", (req, res) => {
    res.json(experience);
});

app.get("/experience/:id", (req, res) => {
    const id = Number(req.params.id);
    const item = experience.find(exp => exp.id === id);
    if (!item) return res.status(404).json({ message: "Experience not found" });
    res.json(item);
});

app.patch("/experience/:id", (req, res) => {
    const id = Number(req.params.id);
    const item = experience.find(exp => exp.id === id);
    if (!item) return res.status(404).json({ message: "Experience not found" });
    
    if (req.body.title !== undefined) item.title = req.body.title;
    if (req.body.subtitle !== undefined) item.subtitle = req.body.subtitle;
    if (req.body.description !== undefined) item.description = req.body.description;
    if (req.body.technologies !== undefined) item.technologies = req.body.technologies;
    if (req.body.responsibilities !== undefined) item.responsibilities = req.body.responsibilities;
    
    res.json({ message: "Experience updated", experience: item });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Portfolio server running on port ${PORT}`);
});