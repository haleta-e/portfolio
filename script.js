/* ==========================================
   Typing Animation
========================================== */

const typingText = document.getElementById("typing-text");

const words = [
    "Frontend Developer",
    "Computer Science Student",
    "aspiring full-stack developer",
];

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (!deleting) {
        typingText.textContent = currentWord.substring(0, letterIndex);
        letterIndex++;

        if (letterIndex > currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typingText.textContent = currentWord.substring(0, letterIndex);
        letterIndex--;

        if (letterIndex < 0) {
            deleting = false;
            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();

/* ==========================================
   Back To Top Button
========================================== */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* ==========================================
   Scroll Animation
========================================== */

const hiddenElements = document.querySelectorAll(
    "section, .project-card, .skill-card, .certificate-card, .learning-card"
);

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

hiddenElements.forEach(element => {
    element.classList.add("hidden");
    observer.observe(element);
});

/* ==========================================
   Certificate Modal
========================================== */

const modal = document.getElementById("certificate-modal");
const modalImage = document.getElementById("modal-image");
const closeModal = document.getElementById("close-modal");

function openCertificateModal(src) {
    modal.classList.add("active");
    modalImage.src = src;
}

closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
});

modal.addEventListener("click", e => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});

/* ==========================================
   SAMPLE DATA
========================================== */

let projects = [
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
        image: "image/proj-hibret.jpg",
        tech: ["C++", "File Handling", "Sorting"],
        live: "https://github.com/haleta-e/lost-and-found-manager",
        
    github: "https://github.com/haleta-e/lost-and-found-manager"
    },
    {
        id: 5,
        title: "HIBRET System",
        category: "java",
        description: "Java Swing desktop app used to manage traditional equb and edir operations with database support.",
        image: "image/proj-hibret.jpg",
        tech: ["Java", "Swing", "Database"],
        live: "https://github.com/fenet-as/HIBRET-SYSTEM",
        github: "https://github.com/fenet-as/HIBRET-SYSTEM"
    }
];

let skills = [
    { id: 1, name: "HTML5", description: "Semantic and accessible web pages." },
    { id: 2, name: "CSS3", description: "Responsive layouts, Flexbox, Grid and animations." },
    { id: 3, name: "JavaScript", description: "Interactive websites and dynamic functionality." },
    { id: 4, name: "DOM Manipulation", description: "Creating interactive interfaces with JavaScript." },
    { id: 5, name: "JSON", description: "Working with structured data in web applications." },
    { id: 6, name: "Responsive Design", description: "Building websites that work on all devices." },
    { id: 7, name: "Git & GitHub", description: "Version control and project management." },
    { id: 8, name: "Java", description: "Object-oriented programming and application development." },
    { id: 9, name: "C++", description: "Algorithms, problem solving and data structures." }
];

let certificates = [
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
];

let learning = [
    { id: 1, title: "JavaScript ES6", progress: 30 },
    { id: 2, title: "DOM Manipulation", progress: 10 },
    { id: 3, title: "JSON", progress: 10 }
];

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

let profile = {
    name: "Etsegenet Amsalu",
    bio: "Computer Science student and Frontend Developer focused on building responsive, interactive, and user-friendly web applications."
};

const STORAGE_KEY = "portfolio-data-v1";

function loadPortfolioData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;

        const parsed = JSON.parse(saved);
        if (parsed.projects) projects = parsed.projects;
        if (parsed.skills) skills = parsed.skills;
        if (parsed.certificates) certificates = parsed.certificates;
        if (parsed.learning) learning = parsed.learning;
        if (parsed.experience) experience = parsed.experience;
        if (parsed.profile) profile = parsed.profile;
    } catch (error) {
        console.warn("Could not load saved portfolio data", error);
    }
}

function savePortfolioData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            projects,
            skills,
            certificates,
            learning,
            experience,
            profile
        }));
    } catch (error) {
        console.warn("Could not save portfolio data", error);
    }
}

function initPortfolio() {
    loadPortfolioData();
    displayProjects();
    displaySkills();
    displayLearning();
    displayExperience();
    displayCertificates();

    const nameEl = document.getElementById("name");
    const bioEl = document.getElementById("bio");
    const footerNameEl = document.getElementById("footer-name");

    if (nameEl) nameEl.textContent = profile.name;
    if (bioEl) bioEl.textContent = profile.bio;
    if (footerNameEl) footerNameEl.textContent = profile.name;
}

document.addEventListener("DOMContentLoaded", initPortfolio);

/* ==========================================
   DISPLAY FUNCTIONS
========================================== */

function displayProjects() {
    const projectContainer = document.getElementById("project-container");
    projectContainer.innerHTML = "";

    projects.forEach(project => {
        const tech = project.tech.map(skill => `<span class="tech">${skill}</span>`).join("");
        projectContainer.innerHTML += `
        <div class="project-card ${project.category}">
            <img src="${project.image}" alt="${project.title}" onerror="this.onerror=null; this.src='image/project.jpg';">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${tech}
                </div>
                <div class="project-links">
                    <a href="${project.live}" target="_blank">Live Demo</a>
                    <a href="${project.github}" target="_blank">GitHub</a>
                     <button class="btn" style="width: 100%; margin-top: 10px;" onclick="openEditModal('project', ${project.id})">Edit</button>
                </div>
            </div>
        </div>
        `;
    });
}

function displaySkills() {
    const skillsContainer = document.getElementById("skills-container");
    skillsContainer.innerHTML = "";

    skills.forEach(skill => {
        skillsContainer.innerHTML += `
        <div class="skill-card">
            <h3>${skill.name}</h3>
            <p>${skill.description}</p>
          <button class="btn" onclick="openEditModal('skill', ${skill.id})" style="width: 100%; margin-top: 10px;">Edit</button> 
        </div>
        `;
    });
}

function displayLearning() {
    const learningContainer = document.getElementById("learning-container");
    learningContainer.innerHTML = "";

    learning.forEach(item => {
        learningContainer.innerHTML += `
        <div class="learning-card">
            <h3>${item.title}</h3>
            <div class="progress">
                <div class="progress-bar" style="width: ${item.progress}%"></div>
            </div>
            <span>${item.progress}% Complete</span>
            <button class="btn" onclick="openEditModal('learning', ${item.id})" style="width: 100%; margin-top: 10px;">Edit</button>
        </div>
        `;
    });
}

function displayExperience() {
    const experienceContainer = document.getElementById("experience-content");
    experienceContainer.innerHTML = "";

    experience.forEach(exp => {
        const card = document.createElement("div");
        card.className = "experience-card";
        card.innerHTML = `
            <h3>${exp.title}</h3>
            <h4>${exp.subtitle}</h4>
            <p>${exp.description}</p>
            <p><strong>Technologies:</strong> ${exp.technologies.join(", ") || "N/A"}</p>
            ${exp.responsibilities.length > 0 ? `
            <ul>
                ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join("")}
            </ul>
            ` : ""}
            <button class="btn" onclick="openEditModal('experience', ${exp.id})" style="width: auto; margin-top: 10px;">Edit</button>
        `;
        experienceContainer.appendChild(card);
    });
}

function displayCertificates() {
    const certificateContainer = document.getElementById("certificate-container");
    certificateContainer.innerHTML = "";

    certificates.forEach(cert => {
        certificateContainer.innerHTML += `
        <div class="certificate-card">
            <img src="${cert.image}" alt="${cert.title}" class="certificate-image" onclick="openCertificateModal('${cert.image}')" onerror="this.onerror=null; this.src='image/project.jpg';">
            <div class="certificate-content">
                <h3>${cert.title}</h3>
                <span>${cert.organization}</span>
                <p>${cert.description}</p>
              <button class="btn" onclick="openEditModal('certificate', ${cert.id})" style="width: 100%; margin-top: 10px;">Edit</button>  
            </div>
        </div>
        `;
    });
}

/* ==========================================
   universal edit modal
========================================== */

let currentEditItem = { type: null, id: null };

function openEditModal(type, id) {
    const modal = document.getElementById("edit-modal");
    const formFields = document.getElementById("form-fields");
    const modalTitle = document.getElementById("modal-title");
    currentEditItem = { type, id };

    formFields.innerHTML = "";
    let fields = [];

    if (type === "project") {
        const project = projects.find(p => p.id === id);
        modalTitle.textContent = `Edit Project: ${project.title}`;
        fields = [
            { name: "title", label: "Project Title", value: project.title, type: "text" },
            { name: "description", label: "Description", value: project.description, type: "textarea" },
            { name: "tech", label: "Technologies (comma separated)", value: project.tech.join(", "), type: "text" },
            { name: "live", label: "Live Demo URL", value: project.live, type: "url" },
            { name: "github", label: "GitHub URL", value: project.github, type: "url" }
        ];
    } else if (type === "skill") {
        const skill = skills.find(s => s.id === id);
        modalTitle.textContent = `Edit Skill: ${skill.name}`;
        fields = [
            { name: "name", label: "Skill Name", value: skill.name, type: "text" },
            { name: "description", label: "Description", value: skill.description, type: "textarea" }
        ];
    } else if (type === "learning") {
        const item = learning.find(l => l.id === id);
        modalTitle.textContent = `Edit: ${item.title}`;
        fields = [
            { name: "title", label: "Topic", value: item.title, type: "text" },
            { name: "progress", label: "Progress (0-100)", value: item.progress, type: "number" }
        ];
    } else if (type === "experience") {
        const exp = experience.find(e => e.id === id);
        modalTitle.textContent = `Edit Experience: ${exp.title}`;
        fields = [
            { name: "title", label: "Title", value: exp.title, type: "text" },
            { name: "subtitle", label: "Subtitle", value: exp.subtitle, type: "text" },
            { name: "description", label: "Description", value: exp.description, type: "textarea" },
            { name: "technologies", label: "Technologies (comma separated)", value: exp.technologies.join(", "), type: "text" }
        ];
    } else if (type === "certificate") {
        const cert = certificates.find(c => c.id === id);
        modalTitle.textContent = `Edit Certificate: ${cert.title}`;
        fields = [
            { name: "title", label: "Certificate Title", value: cert.title, type: "text" },
            { name: "organization", label: "Organization", value: cert.organization, type: "text" },
            { name: "description", label: "Description", value: cert.description, type: "textarea" }
        ];
    } else if (type === "profile") {
        modalTitle.textContent = "Edit Profile";
        fields = [
            { name: "name", label: "Your Name", value: profile.name, type: "text" },
            { name: "bio", label: "Your Bio", value: profile.bio, type: "textarea" }
        ];
    }

   fields.forEach(field => {
        const div = document.createElement("div");
        div.style.marginBottom = "15px";
        
        if (field.type === "textarea") {
            div.innerHTML = `
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">${field.label}</label>
                <textarea id="${field.name}" style="width: 100%; padding: 10px; border: 2px solid #3a5670; border-radius: 8px; background: #2d4556; color: #e2e8f0; min-height: 80px; font-family: Poppins;">${field.value}</textarea>
            `;
        } else {
            div.innerHTML = `
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">${field.label}</label>
                <input type="${field.type}" id="${field.name}" value="${field.value}" style="width: 100%; padding: 10px; border: 2px solid #3a5670; border-radius: 8px; background: #2d4556; color: #e2e8f0; font-family: Poppins;" />
            `;
        }
        formFields.appendChild(div);
    });

    modal.classList.add("active");
}
function closeEditModal() {
    document.getElementById("edit-modal").classList.remove("active");
    currentEditItem = { type: null, id: null };
}

function saveEditChanges() {
    const { type, id } = currentEditItem;
    const formFields = document.querySelectorAll("#form-fields input, #form-fields textarea");
    const data = {};
    
    formFields.forEach(field => {
        data[field.id] = field.value;
    });

    if (type === "project") {
        const project = projects.find(p => p.id === id);
        project.title = data.title;
        project.description = data.description;
        project.tech = data.tech.split(",").map(t => t.trim());
        project.live = data.live;
        project.github = data.github;
        displayProjects();
    } else if (type === "skill") {
        const skill = skills.find(s => s.id === id);
        skill.name = data.name;
        skill.description = data.description;
        displaySkills();
    } else if (type === "learning") {
        const item = learning.find(l => l.id === id);
        item.title = data.title;
        item.progress = Math.min(100, Math.max(0, parseInt(data.progress) || 0));
        displayLearning();
    } else if (type === "experience") {
        const exp = experience.find(e => e.id === id);
        exp.title = data.title;
        exp.subtitle = data.subtitle;
        exp.description = data.description;
        exp.technologies = data.technologies.split(",").map(t => t.trim());
        displayExperience();
    } else if (type === "certificate") {
        const cert = certificates.find(c => c.id === id);
        cert.title = data.title;
        cert.organization = data.organization;
        cert.description = data.description;
        displayCertificates();
    } else if (type === "profile") {
        profile.name = data.name;
        profile.bio = data.bio;
        document.getElementById("name").textContent = data.name;
        document.getElementById("bio").textContent = data.bio;
        document.getElementById("footer-name").textContent = data.name;
    }

    savePortfolioData();
    closeEditModal();
    alert("✅ Changes saved!");
}


/* ==========================================
   EDIT ALL FUNCTIONS
========================================== */

function editAllProjects() {
    alert("📝 Edit All Projects:\n\nClick the 'Edit' button on each project card to edit individually.");
}

function editAllSkills() {
    alert("📝 Edit All Skills:\n\nClick the 'Edit' button on each skill card to edit individually.");
}

function editAllLearning() {
    alert("📝 Edit Learning Progress:\n\nClick the 'Edit' button on each learning item to update progress.");
}

function editAllExperience() {
    alert("📝 Edit All Experience:\n\nClick the 'Edit' button on each experience card to edit individually.");
}

function editAllCertificates() {
    alert("📝 Edit All Certificates:\n\nClick the 'Edit' button on each certificate to edit individually.");
}

function editProject(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    const newTitle = prompt("Project Title:", project.title);
    if (newTitle === null) return;
    const newDescription = prompt("Description:", project.description);
    if (newDescription === null) return;
    project.title = newTitle;
    project.description = newDescription;
    displayProjects();
    savePortfolioData();
    alert("✅ Project updated!");
}


function editPortfolio() {
   openEditModal('profile', 0);
}
document.getElementById("edit-form").addEventListener("submit", (e) => {
    e.preventDefault();
    saveEditChanges();
});

/* ==========================================
   PROJECT FILTER
========================================== */

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        const filter = button.dataset.filter;
        const cards = document.querySelectorAll(".project-card");

        cards.forEach(card => {
            if (filter === "all") {
                card.style.display = "block";
            } else if (card.classList.contains(filter)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

/* ==========================================
   INITIALIZE ON PAGE LOAD
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    displayProjects();
    displaySkills();
    displayLearning();
    displayExperience();
    displayCertificates();
});