// URL de l'API pour récupérer les travaux de l'architecte
const apiUrl = 'http://localhost:5678/api/works'; // Remplacez par l'URL correcte

// Fonction pour récupérer les données
async function fetchWorks() {
  try {
    const response = await fetch(apiUrl); // Envoie la requête GET
    const works = await response.json(); // Convertit la réponse en JSON

    // Créer un Set pour extraire les catégories uniques
    const categories = new Set();
    works.forEach(work => {
      if (work.category) {
        categories.add(work.category.name); // Ajoute le nom de la catégorie au Set
      }
    });

    // Convertir le Set en tableau et générer le menu
    const menuCategories = [...categories];
    generateCategoryMenu(menuCategories); // Génère le menu avec les catégories
    displayWorks(works); // Affiche les travaux dans la galerie
  } catch (error) {
    console.error('Erreur lors de la récupération des travaux :', error);
  }
}

// Fonction pour générer le menu de catégories dynamiquement
function generateCategoryMenu(categories) {
  const menuContainer = document.querySelector('#category-menu'); // Assurez-vous que cet élément existe

  // Supprimer les anciens boutons s'il y en a déjà
  menuContainer.innerHTML = '';

  // Créer un bouton "Tous" pour afficher tous les travaux par défaut (seulement une fois)
  const allOption = document.createElement('button');
  allOption.textContent = 'Tous';
  allOption.classList.add('category-button'); // Ajoute la classe de base
  allOption.classList.add('active'); // On met "Tous" actif par défaut

  // Ajouter un événement au clic pour afficher tous les travaux
  allOption.addEventListener('click', () => {
    fetchWorks(); // Recharge tous les travaux
    removeActiveClassFromOtherButtons(allOption); // Retirer l'active des autres
    allOption.classList.add('active'); // Ajouter la classe active au bouton "Tous"
  });

  menuContainer.appendChild(allOption);

  // Créer un bouton pour chaque catégorie
  categories.forEach(category => {
    const categoryOption = document.createElement('button');
    categoryOption.textContent = category;
    categoryOption.classList.add('category-button'); // Ajoute la classe de base

    // Ajouter un événement au clic pour filtrer les travaux
    categoryOption.addEventListener('click', () => {
      filterWorksByCategory(category); // Filtre les travaux par catégorie
      removeActiveClassFromOtherButtons(categoryOption); // Retirer l'active des autres
      categoryOption.classList.add('active'); // Ajouter la classe active au bouton cliqué
    });

    menuContainer.appendChild(categoryOption);
  });
}

// Fonction pour filtrer les travaux par catégorie
function filterWorksByCategory(category) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(works => {
      // Filtrer les travaux en fonction de la catégorie
      const filteredWorks = works.filter(work => work.category && work.category.name === category);

      // Afficher les travaux filtrés
      displayWorks(filteredWorks); 
    })
    .catch(error => console.error('Erreur lors du filtrage des travaux :', error));
}

// Fonction pour afficher les travaux dans la galerie
function displayWorks(works) {
  const gallery = document.querySelector('#gallery'); // Assurez-vous que l'élément existe
  gallery.innerHTML = ''; // Vide la galerie avant d'ajouter les nouveaux éléments
  works.forEach(work => {
    const workElement = document.createElement('div');
    workElement.classList.add('work');
    workElement.innerHTML = `
      <img src="${work.imageUrl}" alt="${work.title}" />
      <h3>${work.title}</h3>
      <p>${work.description}</p>
    `;
    gallery.appendChild(workElement); // Ajoute le travail à la galerie
  });
}

// Fonction pour retirer la classe active des autres boutons
function removeActiveClassFromOtherButtons(currentButton) {
  const allButtons = document.querySelectorAll('.category-button'); // Sélectionner tous les boutons
  allButtons.forEach(button => {
    // Retirer la classe active des boutons sauf celui qui a été cliqué
    if (button !== currentButton) {
      button.classList.remove('active');
    }
  });
}
// Appeler la fonction pour récupérer et afficher les travaux au démarrage
fetchWorks();