const apiUrl = 'http://localhost:5678/api/works';

// Variable globale pour stocker les travaux
let allWorks = [];

// Fonction utilitaire pour les appels API
async function apiRequest(endpoint, options = {}) {
    try {
        // Note : Ne pas répéter '/works' dans l'URL, juste utiliser l'endpoint
        const response = await fetch(`http://localhost:5678/api/${endpoint}`, options);
        if (!response.ok) throw new Error("Erreur API");
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de l'appel à l'API :", error);
        throw error;
    }
}

// Vérifie si l'utilisateur est connecté
function checkAuth() {
    const token = localStorage.getItem("authToken");

    // Si l'utilisateur est connecté
    if (token) {
        // Afficher la barre de mode édition
        enableEditMode();
         // Modifier la marge du header
         document.querySelector('header').style.marginTop = '97px';

        // Masquer les filtres
        const filters = document.getElementById('category-menu');
        if (filters) {
            filters.classList.add('hidden');
        }

        // Afficher les icônes d'édition
        const editIcons = document.querySelectorAll('.fa-pen-to-square');
        const editText = document.querySelector('.edit-text');

        if (editIcons.length > 0) {
            editIcons.forEach(icon => icon.classList.remove('hidden'));
        }
        if (editText) {
            editText.classList.remove('hidden');
        }

        // Mettre à jour le texte du bouton de la nav pour déconnexion
        const loginLink = document.querySelector('a[href="login.html"]');
        if (loginLink) {
            loginLink.textContent = "Logout";
            loginLink.setAttribute('href', '#');
            loginLink.addEventListener('click', logout);
        }
    } else {
        // Si l'utilisateur n'est pas connecté, réinitialiser l'interface
        disableEditMode();
        // Si l'utilisateur n'est pas connecté, revenir à la valeur par défaut
        document.querySelector('header').style.marginTop = '50px';
        // Afficher les filtres si l'utilisateur n'est pas connecté
        const filters = document.getElementById('category-menu');
        if (filters) {
            filters.classList.remove('hidden');
        }

        // Masquer les icônes d'édition
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

// Active le mode édition
function enableEditMode() {
    const editModeBar = document.querySelector('.edit-mode-bar');
    const editIcon = document.querySelector('.edit-mode-bar i');
    const editText = document.querySelector('.edit-mode-bar span');

    // Vérifie si l'élément existe avant de modifier son contenu
    if (editModeBar && editIcon && editText) {
        editModeBar.classList.remove('hidden');
        editIcon.classList.remove('hidden');
        editText.classList.remove('hidden');
    } else {
        console.error("L'un des éléments pour activer le mode édition est manquant.");
    }
}

// Désactive le mode édition
function disableEditMode() {
    const editModeBar = document.querySelector('.edit-mode-bar');
    const filters = document.getElementById('category-menu');
    const editIcons = document.querySelectorAll('.fa-pen-to-square');
    const editText = document.querySelector('.edit-text');

    // Masquer la barre de mode édition
    if (editModeBar) {
        editModeBar.classList.add('hidden');
    }

    // Afficher les filtres
    if (filters) {
        filters.classList.remove('hidden');
    }

    // Masquer les icônes de modification
    if (editIcons.length > 0) {
        editIcons.forEach(icon => icon.classList.add('hidden'));
    }

    // Masquer le texte Modifier
    if (editText) {
        editText.classList.add('hidden');
    }

    // Remettre le lien Login
    const loginLink = document.querySelector('a[href="login.html"]');
    if (loginLink) {
        loginLink.textContent = "Login";
        loginLink.setAttribute('href', 'login.html');
    }
}

// Fonction pour récupérer et afficher les travaux
async function fetchWorks() {
    try {
        allWorks = await apiRequest('works');
        displayWorks(allWorks);
        generateCategoryMenu(extractCategories(allWorks));
    } catch (error) {
        console.error("Erreur lors de la récupération des travaux :", error);
    }
}

// Fonction pour générer le menu de catégories
function generateCategoryMenu(categories) {
    const menuContainer = document.querySelector('#category-menu');
    menuContainer.innerHTML = '';
    const allOption = document.createElement('button');
    allOption.textContent = 'Tous';
    allOption.classList.add('category-button', 'active');
    allOption.addEventListener('click', () => {
        filterWorksByCategory(null);
        setActiveButton(allOption);
    });
    menuContainer.appendChild(allOption);

    categories.forEach(({ id, name }) => {
        const categoryOption = document.createElement('button');
        categoryOption.textContent = name;
        categoryOption.classList.add('category-button');
        categoryOption.addEventListener('click', () => {
            filterWorksByCategory(id);
            setActiveButton(categoryOption);
        });
        menuContainer.appendChild(categoryOption);
    });
}

// Fonction pour extraire les catégories uniques
function extractCategories(works) {
    const categories = new Map();
    works.forEach(work => {
        if (work.category) {
            categories.set(work.category.id, work.category.name);
        }
    });
    return Array.from(categories, ([id, name]) => ({ id, name }));
}

// Fonction pour filtrer les travaux
function filterWorksByCategory(categoryId) {
    const filteredWorks = categoryId
        ? allWorks.filter(work => work.category && work.category.id === categoryId)
        : allWorks;
    displayWorks(filteredWorks);
}

// Fonction pour afficher les travaux dans la galerie
function displayWorks(works) {
    const gallery = document.querySelector('#gallery');
    gallery.innerHTML = '';
    works.forEach(work => {
        const workElement = document.createElement('div');
        workElement.classList.add('work');
        workElement.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}" />
            <h3>${work.title}</h3>
            <p>${work.description}</p>
        `;
        gallery.appendChild(workElement);
    });
}

// Fonction utilitaire pour gérer les boutons actifs
function setActiveButton(button, buttonsSelector = '.category-button') {
    document.querySelectorAll(buttonsSelector).forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

// Fonction pour déconnecter l'utilisateur
function logout(event) {
    event.preventDefault();
    localStorage.removeItem("authToken");
    window.location.href = "index.html";
}

// Appeler les fonctions au chargement
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    fetchWorks();
});