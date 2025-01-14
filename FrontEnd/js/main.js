const apiUrl = 'http://localhost:5678/api/works';

let allWorks = [];
let allCategories = [];

async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`http://localhost:5678/api/${endpoint}`, options);
        if (!response.ok) throw new Error("Erreur API");
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de l'appel à l'API :", error);
        throw error;
    }
}

async function fetchCategories() {
    try {
        window.allCategories = await apiRequest('categories');
        generateCategoryMenu(window.allCategories);
        fetchWorks();
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
    }
}

async function fetchWorks() {
    try {
        allWorks = await apiRequest('works');
        displayWorks(allWorks);
    } catch (error) {
        console.error("Erreur lors de la récupération des travaux :", error);
    }
}

function generateCategoryMenu(categories) {
    const menuContainer = document.querySelector('#category-menu');

    menuContainer.innerHTML = '';

    const allOption = document.createElement('button');
    allOption.textContent = 'Tous';
    allOption.classList.add('category-button', 'active');
    allOption.addEventListener('click', () => {
        displayWorks(allWorks);
        setActiveButton(allOption);
    });
    menuContainer.appendChild(allOption);

    categories.forEach(category => {
        const categoryOption = document.createElement('button');
        categoryOption.textContent = category.name;
        categoryOption.classList.add('category-button');
        categoryOption.addEventListener('click', () => {
            const filteredWorks = allWorks.filter(work => work.category && work.category.id === category.id);
            displayWorks(filteredWorks);
            setActiveButton(categoryOption);
        });
        menuContainer.appendChild(categoryOption);
    });
}

function displayWorks(works) {
    const gallery = document.querySelector('#gallery');
    gallery.innerHTML = '';

    if (!works || works.length === 0) {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error');
        const errorIcon = document.createElement('div');
        errorIcon.classList.add('error-icon');
        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-circle-info');
        errorIcon.appendChild(icon);
        errorDiv.appendChild(errorIcon);

        const errorText = document.createElement('div');
        errorText.classList.add('error-category-text');
        errorText.textContent = 'Pas de travaux dans cette catégorie.';
        errorDiv.appendChild(errorText);

        gallery.appendChild(errorDiv);
        return;
    }

    works.forEach(work => {
        const workElement = document.createElement('div');
        workElement.classList.add('work');
        workElement.dataset.workId = work.id;

        const imageElement = document.createElement('img');
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;
        workElement.appendChild(imageElement);

        const titleElement = document.createElement('h4');
        titleElement.textContent = work.title;
        workElement.appendChild(titleElement);

        gallery.appendChild(workElement);
    });
}

function setActiveButton(button, buttonsSelector = '.category-button') {
    document.querySelectorAll(buttonsSelector).forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

function generateContactForm() {
    const contactSection = document.getElementById("contact");

    const contactDescription = document.createElement("p");
    contactDescription.textContent = "Vous avez un projet ? Discutons-en !";

    const contactForm = document.createElement("form");
    contactForm.action = "#";
    contactForm.method = "post";

    const nameDiv = document.createElement("div");
    nameDiv.className = "contact-form";
    const nameLabel = document.createElement("label");
    nameLabel.htmlFor = "name";
    nameLabel.textContent = "Nom";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "name";
    nameInput.required = true;

    const emailDiv = document.createElement("div");
    emailDiv.className = "contact-form";
    const emailLabel = document.createElement("label");
    emailLabel.htmlFor = "email";
    emailLabel.textContent = "E-mail";
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.id = "email";
    emailInput.required = true;

    const messageDiv = document.createElement("div");
    messageDiv.className = "contact-form";
    const messageLabel = document.createElement("label");
    messageLabel.htmlFor = "message";
    messageLabel.textContent = "Message";
    const messageTextarea = document.createElement("textarea");
    messageTextarea.id = "message";
    messageTextarea.required = true;

    const submitDiv = document.createElement("div");
    submitDiv.textContent = "Envoyer";
    submitDiv.className = "contact-button";
    submitDiv.role = "button";

    nameDiv.appendChild(nameLabel);
    nameDiv.appendChild(nameInput);
    emailDiv.appendChild(emailLabel);
    emailDiv.appendChild(emailInput);
    messageDiv.appendChild(messageLabel);
    messageDiv.appendChild(messageTextarea);
    contactForm.appendChild(nameDiv);
    contactForm.appendChild(emailDiv);
    contactForm.appendChild(messageDiv);
    contactSection.appendChild(contactDescription);
    contactSection.appendChild(contactForm);
    contactSection.appendChild(submitDiv);
}

function attachContactFormHandler() {
    const contactForm = document.querySelector("#contact form");
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (name && email && message) {
            alert("Merci pour votre message ! Nous vous répondrons rapidement.");
        } else {
            alert("Veuillez remplir tous les champs.");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const sectionToScroll = window.location.hash.substring(1);
    if (sectionToScroll) {
      setTimeout(function () {
        const targetSection = document.getElementById(sectionToScroll);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop,
          });
        }
      }, 100);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    fetchCategories();
    generateContactForm();
    attachContactFormHandler();
});