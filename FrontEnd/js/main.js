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

/*********** VERIFIE SI LE USER EST CONNECTE VIA LE TOKEN ***********/

function checkAuth() {
    const token = localStorage.getItem("authToken");

    if (token) {
        enableEditMode();
        document.querySelector('header').style.marginTop = '97px';

        const filters = document.getElementById('category-menu');
        if (filters) {
            filters.classList.add('hidden');
        }

        const editIcons = document.querySelectorAll('.fa-pen-to-square');
        const editText = document.querySelector('.edit-text');

        if (editIcons.length > 0) {
            editIcons.forEach(icon => icon.classList.remove('hidden'));
        }
        if (editText) {
            editText.classList.remove('hidden');
        }

        const loginLink = document.querySelector('a[href="login.html"]');
        if (loginLink) {
            loginLink.textContent = "logout";
            loginLink.setAttribute('href', '#');
            loginLink.addEventListener('click', logout);
        }
    } else {
        disableEditMode();
        document.querySelector('header').style.marginTop = '50px';

        const filters = document.getElementById('category-menu');
        if (filters) {
            filters.classList.remove('hidden');
        }

        const editIcons = document.querySelectorAll('.fa-pen-to-square');
        const editText = document.querySelector('.edit-text');

        if (editIcons.length > 0) {
            editIcons.forEach(icon => icon.classList.add('hidden'));
        }
        if (editText) {
            editText.classList.add('hidden');
        }
    }
}

/*********** ACTIVE LE MODE EDITION ***********/

function enableEditMode() {
    const editModeBar = document.querySelector('.edit-mode-bar');
    const editIcon = document.querySelector('.edit-mode-bar i');
    const editText = document.querySelector('.edit-mode-bar span');

    if (editModeBar && editIcon && editText) {
        editModeBar.classList.remove('hidden');
        editIcon.classList.remove('hidden');
        editText.classList.remove('hidden');
    } else {
        console.error("L'un des éléments pour activer le mode édition est manquant.");
    }
}

/*********** DESACTIVE LE MODE EDITION ***********/

function disableEditMode() {
    const editModeBar = document.querySelector('.edit-mode-bar');
    const filters = document.getElementById('category-menu');
    const editIcons = document.querySelectorAll('.fa-pen-to-square');
    const editText = document.querySelector('.edit-text');

    if (editModeBar) {
        editModeBar.classList.add('hidden');
    }

    if (filters) {
        filters.classList.remove('hidden');
    }

    if (editIcons.length > 0) {
        editIcons.forEach(icon => icon.classList.add('hidden'));
    }

    if (editText) {
        editText.classList.add('hidden');
    }

    const loginLink = document.querySelector('a[href="login.html"]');
    if (loginLink) {
        loginLink.textContent = "login";
        loginLink.setAttribute('href', 'login.html');
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
        gallery.innerHTML = '<p>Aucun élément à afficher dans cette catégorie.</p>';
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

/*********** DECONNECTION USER ***********/

function logout(event) {
    event.preventDefault();
    localStorage.removeItem("authToken");
    window.location.href = "index.html";
}

/*********** APPEL DES FONCTIONS AU CHARGEMENT ***********/

document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    fetchCategories();
});
