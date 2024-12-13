const apiUrl = 'http://localhost:5678/api/works';

/*********** STOCKAGE DES TRAVAUX ***********/

let allWorks = [];
let allCategories = [];

/*********** APPELS DE L'API ***********/

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

/*********** RECUPERER LES CATEGORIES ***********/

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

// Fonction pour exposer les catégories

function getAllCategories() {
    return allCategories;
}

/*********** RECUPERER LES TRAVAUX ***********/

async function fetchWorks() {
    try {
        allWorks = await apiRequest('works');
        displayWorks(allWorks);
    } catch (error) {
        console.error("Erreur lors de la récupération des travaux :", error);
    }
}

/*********** GENERER LE MENU CATEGORIES ***********/

function generateCategoryMenu(categories) {
    const menuContainer = document.querySelector('#category-menu');
    menuContainer.innerHTML = '';

    // Ajouter l'option "Tous"

    const allOption = document.createElement('button');
    allOption.textContent = 'Tous';
    allOption.classList.add('category-button', 'active');
    allOption.addEventListener('click', () => {
        displayWorks(allWorks);
        setActiveButton(allOption);
    });
    menuContainer.appendChild(allOption);

    // Ajouter les catégories

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

    if (works.length === 0) {
        gallery.innerHTML = `
        <div class="error">
            <div class="error-icon">
                <i class="fa-solid fa-circle-info"></i>
            </div>
            <div class="error-category-text">Pas de travaux dans cette catégorie.</div>
        </div>
        `;
        return;
    }

    works.forEach(work => {
        const workElement = document.createElement('div');
        workElement.classList.add('work');
        workElement.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}" />
            <h4>${work.title}</h4>
        `;
        gallery.appendChild(workElement);
    });
}

/*********** GERER LES BOUTONS ACTIFS ***********/

function setActiveButton(button, buttonsSelector = '.category-button') {
    document.querySelectorAll(buttonsSelector).forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

/*********** CONTACT FORM ***********/

    // Générer dynamiquement la section contact

    const contactSection = document.getElementById("contact");
    contactSection.innerHTML = `
        <h2>Contact</h2>
        <p>Vous avez un projet ? Discutons-en !</p>
        <form action="#" method="post">
            <div class="contact-form">
                <label for="name">Nom</label>
                <input type="text" id="name" placeholder="" required>
            </div>
            <div class="contact-form">
                <label for="email">E-mail</label>
                <input type="email" id="email" placeholder="" required>
            </div>
            <div class="contact-form">
                <label for="message">Message</label>
                <textarea id="message" placeholder="" required></textarea>
            </div>
        </form>
            <button type="submit">Envoyer</button>

    `;

    // Fonction pour ajouter un comportement au formulaire

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
});
