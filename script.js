const words = ["Frontend Developer", "Computer Science Student", "aspiring full-stack developer"];
let wordIndex = 0, letterIndex = 0, deleting = false;
const typingText = document.getElementById("typing-text");
function typeEffect() { const word = words[wordIndex]; typingText.textContent = word.substring(0, letterIndex); if (!deleting) { letterIndex++; if (letterIndex > word.length) { deleting = true; return setTimeout(typeEffect, 1500); } } else { letterIndex--; if (letterIndex < 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; } } setTimeout(typeEffect, deleting ? 50 : 100); }
typeEffect();

let portfolio = { profile: {}, projects: [], skills: [], learning: [], experience: [], certificates: [] };
const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[char]));
function render() {
  const { profile, projects, skills, learning, experience, certificates } = portfolio;
  document.getElementById("name").textContent = profile.name || ""; document.getElementById("bio").textContent = profile.bio || ""; document.getElementById("footer-name").textContent = profile.name || "";
  document.getElementById("email-link").href = `mailto:${profile.email || ""}`; document.getElementById("linkedin-link").href = profile.linkedin || "#"; document.getElementById("github-link").href = profile.github || "#";
  document.getElementById("project-container").innerHTML = projects.map(p => `<div class="project-card ${escapeHtml(p.category)}"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" onerror="this.src='image/project.jpg'"><div class="project-content"><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.description)}</p><div class="tech-stack">${(p.tech || []).map(t => `<span class="tech">${escapeHtml(t)}</span>`).join("")}</div><div class="project-links"><a href="${escapeHtml(p.live || p.github || "#")}" target="_blank" rel="noreferrer">Live Demo</a><a href="${escapeHtml(p.github || "#")}" target="_blank" rel="noreferrer">GitHub</a></div></div></div>`).join("");
  document.getElementById("skills-container").innerHTML = skills.map(s => `<div class="skill-card"><h3>${escapeHtml(s.name)}</h3><p>${escapeHtml(s.description)}</p></div>`).join("");
  document.getElementById("learning-container").innerHTML = learning.map(l => `<div class="learning-card"><h3>${escapeHtml(l.title)}</h3><div class="progress"><div class="progress-bar" style="width:${Number(l.progress)}%"></div></div><span>${Number(l.progress)}% Complete</span></div>`).join("");
  document.getElementById("experience-content").innerHTML = experience.map(e => `<div class="experience-card"><h3>${escapeHtml(e.title)}</h3><h4>${escapeHtml(e.subtitle)}</h4><p>${escapeHtml(e.description)}</p><p><strong>Technologies:</strong> ${escapeHtml((e.technologies || []).join(", ") || "N/A")}</p>${(e.responsibilities || []).length ? `<ul>${e.responsibilities.map(r => `<li>${escapeHtml(r)}</li>`).join("")}</ul>` : ""}</div>`).join("");
  document.getElementById("certificate-container").innerHTML = certificates.map(c => `<div class="certificate-card"><img src="${escapeHtml(c.image)}" alt="${escapeHtml(c.title)}" class="certificate-image" data-certificate="${escapeHtml(c.image)}"><div class="certificate-content"><h3>${escapeHtml(c.title)}</h3><span>${escapeHtml(c.organization)}</span><p>${escapeHtml(c.description)}</p></div></div>`).join("");
  document.querySelectorAll("[data-certificate]").forEach(img => img.addEventListener("click", () => { document.getElementById("modal-image").src = img.dataset.certificate; document.getElementById("certificate-modal").classList.add("active"); }));
}
fetch("/api/portfolio").then(response => response.json()).then(data => { portfolio = data; render(); }).catch(() => console.error("[v0] Could not load portfolio data"));

document.querySelectorAll(".filter-btn").forEach(button => button.addEventListener("click", () => { document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active")); button.classList.add("active"); const filter = button.dataset.filter; document.querySelectorAll(".project-card").forEach(card => { card.style.display = filter === "all" || card.classList.contains(filter) ? "block" : "none"; }); }));
const modal = document.getElementById("certificate-modal"); document.getElementById("close-modal").addEventListener("click", () => modal.classList.remove("active")); modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("active"); });
const topBtn = document.getElementById("topBtn"); window.addEventListener("scroll", () => { topBtn.style.display = window.scrollY > 400 ? "block" : "none"; }); topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
