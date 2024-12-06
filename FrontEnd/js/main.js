const apiUrl = 'http://localhost:5678/api/works';

/*********** Variable globale pour stocker les travaux ***********/

let allWorks = [];
let allCategories = [];

/*********** Fonction utilitaire pour les appels API ***********/

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

/*********** Vérifie si l'utilisateur est connecté ***********/

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
            loginLink.textContent = "Logout";
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

// Active le mode édition
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

// Désactive le mode édition
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

// Fonction pour récupérer les catégories
async function fetchCategories() {
    try {
        allCategories = await apiRequest('categories');
        generateCategoryMenu(allCategories);
        fetchWorks();
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
    }
}

// Fonction pour récupérer les travaux
async function fetchWorks() {
    try {
        allWorks = await apiRequest('works');
        displayWorks(allWorks);
    } catch (error) {
        console.error("Erreur lors de la récupération des travaux :", error);
    }
}

// Fonction pour générer le menu de catégories
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

// Fonction pour afficher les travaux dans la galerie
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
            <h3>${work.title}</h3>
            <p>${work.description}</p>
        `;
        gallery.appendChild(workElement);
    });
}

/*********** Activation de la modale ***********/

document.addEventListener('DOMContentLoaded', function () {

    /*********** Sélectionner le texte "modifier" ***********/

    const editText = document.querySelector('.edit-container .edit-text');
    const modalContainer = document.getElementById('modal-container');
    const closeModalButton = document.getElementById('close-modal');

    /*********** Vérifier si les éléments existent ***********/

    if (editText && modalContainer && closeModalButton) {

        /*********** Ouvrir la modale au clic sur le texte "modifier" ***********/

        editText.addEventListener('click', () => {
            modalContainer.classList.remove('hidden');
            displayWorksInModal(allWorks);
        });

        /*********** Fermer la modale au clic sur le bouton de fermeture ***********/

        closeModalButton.addEventListener('click', () => {
            modalContainer.classList.add('hidden');
        });

        /*********** Fermer la modale en cliquant à l'extérieur de la fenêtre modale ***********/

        modalContainer.addEventListener('click', (event) => {
            if (event.target === modalContainer) {
                modalContainer.classList.add('hidden');
            }
        });
    } else {
        console.error("Un ou plusieurs éléments nécessaires sont manquants.");
    }
});

/*********** Fonction pour afficher les travaux dans la modale ***********/

function displayWorksInModal(works) {
    const modalWorksContainer = document.getElementById('modal-works');
    modalWorksContainer.innerHTML = '';  // Réinitialiser le contenu à chaque fois

    works.forEach(work => {
        const workElement = document.createElement('div');
        workElement.classList.add('work-item');
        
        // Créer une balise <img> pour afficher l'image
        const imageElement = document.createElement('img');
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;

        // Ajouter l'image à l'élément workItem
        workElement.appendChild(imageElement);

        // Créer le carré noir avec l'icône de la poubelle
        const trashIcon = document.createElement('div');
        trashIcon.classList.add('trash-icon');

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-trash-can');
        trashIcon.appendChild(icon);
        workElement.appendChild(trashIcon);
        modalWorksContainer.appendChild(workElement);
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
    fetchCategories();
});
