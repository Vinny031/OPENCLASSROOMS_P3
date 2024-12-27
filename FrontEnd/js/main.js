const apiUrl = 'http://localhost:5678/api/works';

/*********** STOCKAGE DES TRAVAUX ET CATEGORIES ***********/
let allWorks = [];
let allCategories = [];

/*********** APPELS API ***********/
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

/*********** RÉCUPÉRER LES CATEGORIES ***********/
async function fetchCategories() {
    try {
        window.allCategories = await apiRequest('categories');
        console.log("Catégories récupérées :", window.allCategories);
        generateCategoryMenu(window.allCategories);
        fetchWorks();
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
    }
}

/*********** RÉCUPÉRER LES TRAVAUX ***********/
async function fetchWorks() {
    try {
        allWorks = await apiRequest('works');
        displayWorks(allWorks);
    } catch (error) {
        console.error("Erreur lors de la récupération des travaux :", error);
    }
}

/*********** GÉNÉRER LE MENU CATEGORIES ***********/
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

    // Ajouter les catégories dynamiquement
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

/*********** AFFICHER LES TRAVAUX DANS LA GALLERIE ***********/
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

    // Affichage des travaux sous forme de cartes
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

/*********** GÉRER LES BOUTONS ACTIFS ***********/
function setActiveButton(button, buttonsSelector = '.category-button') {
    document.querySelectorAll(buttonsSelector).forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

/*********** FORMULAIRE DE CONTACT ***********/
function generateContactForm() {
    const contactSection = document.getElementById("contact");

    // Créer le titre et la description du formulaire
    const contactTitle = document.createElement("h2");
    contactTitle.textContent = "Contact";
    
    const contactDescription = document.createElement("p");
    contactDescription.textContent = "Vous avez un projet ? Discutons-en !";

    // Créer le formulaire
    const contactForm = document.createElement("form");
    contactForm.action = "#";
    contactForm.method = "post";

    // Création des champs du formulaire
    const nameDiv = createInputField("Nom", "text", "name");
    const emailDiv = createInputField("E-mail", "email", "email");
    const messageDiv = createTextareaField("Message", "message");

    const submitDiv = document.createElement("div");
    submitDiv.textContent = "Envoyer";
    submitDiv.className = "contact-button";
    submitDiv.role = "button";

    // Ajouter les éléments du formulaire dans la section de contact
    contactForm.appendChild(nameDiv);
    contactForm.appendChild(emailDiv);
    contactForm.appendChild(messageDiv);
    contactSection.appendChild(contactTitle);
    contactSection.appendChild(contactDescription);
    contactSection.appendChild(contactForm);
    contactSection.appendChild(submitDiv);
}

/*********** CREATION DES CHAMPS DE FORMULAIRE ***********/
function createInputField(labelText, inputType, inputId) {
    const div = document.createElement("div");
    div.className = "contact-form";

    const label = document.createElement("label");
    label.htmlFor = inputId;
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = inputType;
    input.id = inputId;
    input.required = true;

    div.appendChild(label);
    div.appendChild(input);
    return div;
}

function createTextareaField(labelText, textareaId) {
    const div = document.createElement("div");
    div.className = "contact-form";

    const label = document.createElement("label");
    label.htmlFor = textareaId;
    label.textContent = labelText;

    const textarea = document.createElement("textarea");
    textarea.id = textareaId;
    textarea.required = true;

    div.appendChild(label);
    div.appendChild(textarea);
    return div;
}

/*********** GÉRER L'ENVOI DU FORMULAIRE DE CONTACT ***********/
function attachContactFormHandler() {
    const contactForm = document.querySelector("#contact form");
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (name && email && message) {
            console.log("Nom :", name);
            console.log("Email :", email);
            console.log("Message :", message);
            alert("Merci pour votre message ! Nous vous répondrons rapidement.");
        } else {
            alert("Veuillez remplir tous les champs.");
        }
    });
}

/*********** APPEL DES FONCTIONS AU CHARGEMENT ***********/
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    fetchCategories();
    generateContactForm();
    attachContactFormHandler();
});
