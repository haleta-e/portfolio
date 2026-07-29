/* ==========================================
   Typing Animation
========================================== */

const typingText = document.getElementById("typing-text");

const words = [
    "Frontend Developer",
    "Computer Science Student",
    "JavaScript Learner",
    "DOM Manipulation",
    "JSON Enthusiast",
    "UI Designer"
];

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, letterIndex);

        letterIndex++;

        if (letterIndex > currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(0, letterIndex);

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

    }

    else {

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
   Active Navbar
========================================== */

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("#navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/* ==========================================
   Scroll Animation
========================================== */

const hiddenElements = document.querySelectorAll(

    "section,.project-card,.skill-card,.certificate-card,.learning-card"

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

const modal =
document.getElementById("certificate-modal");

const modalImage =
document.getElementById("modal-image");

const closeModal =
document.getElementById("close-modal");

const certificateImages =
document.querySelectorAll(".certificate-image");

certificateImages.forEach(image => {

    image.addEventListener("click", () => {

        modal.classList.add("active");

        modalImage.src = image.src;

    });

});

closeModal.addEventListener("click", () => {

    modal.classList.remove("active");

});

modal.addEventListener("click", e => {

    if (e.target === modal) {

        modal.classList.remove("active");

    }

});
/* ==========================================
   LOAD PROJECTS FROM JSON
========================================== */

const projectContainer =
document.getElementById("project-container");

async function loadProjects() {

    try {

        const response =
        await fetch("data/projects.json");

        const projects =
        await response.json();

        displayProjects(projects);

    }

    catch(error){

        console.log(error);

    }

}

function displayProjects(projects){

    projectContainer.innerHTML="";

    projects.forEach(project=>{

        const tech = project.tech.map(skill =>

            `<span class="tech">${skill}</span>`

        ).join("");

        projectContainer.innerHTML += `

        <div class="project-card ${project.category}">

            <img src="${project.image}" alt="${project.title}">

            <div class="project-content">

                <h3>${project.title}</h3>

                <p>${project.description}</p>

                <div class="tech-stack">

                    ${tech}

                </div>

                <div class="project-links">

                    <a href="${project.live}" target="_blank">

                        Live Demo

                    </a>

                    <a href="${project.github}" target="_blank">

                        GitHub

                    </a>

                </div>

            </div>

        </div>

        `;

    });

}

loadProjects();
/* ==========================================
   PROJECT FILTER
========================================== */

const filterButtons =
document.querySelectorAll(".filter-btn");

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

filterButtons.forEach(btn=>{

btn.classList.remove("active");

});

button.classList.add("active");

const filter =
button.dataset.filter;

const cards =
document.querySelectorAll(".project-card");

cards.forEach(card=>{

if(filter==="all"){

card.style.display="block";

}

else if(card.classList.contains(filter)){

card.style.display="block";

}

else{

card.style.display="none";

}

});

});

});