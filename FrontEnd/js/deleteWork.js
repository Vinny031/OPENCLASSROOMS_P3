// Fonction qui supprime un travail par son ID
window.deleteWork = async function(workId) {
    try {
        // Envoie de la requête de suppression vers l'API
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la suppression du travail");
        }

        // Mettre à jour l'affichage après la suppression
        allWorks = allWorks.filter(work => work.id !== workId);

        // Vérification de la disponibilité de la fonction displayWorksInModal
        if (typeof displayWorksInModal === 'function') {
            displayWorksInModal(allWorks);
        } else {
            console.error("displayWorksInModal n'est pas définie");
        }
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
    }
}

// Gérer l'événement de suppression pour chaque icône de suppression avec délégation
document.body.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('trash-icon')) {
        // Vérifie si l'élément a bien la classe trash-icon
        console.log("Icône de suppression cliquée");

        // Récupérer l'ID du travail depuis le dataset
        const workId = event.target.closest('.work-item') ? event.target.closest('.work-item').dataset.workId : null;

        // Afficher l'ID pour vérifier
        console.log("ID du travail à supprimer :", workId);

        if (workId) {
            showConfirmationPopup(workId);
        } else {
            console.error("Aucun ID trouvé pour ce travail.");
        }
    }
});

// Fonction pour créer et ajouter la popup de confirmation de suppression
function createConfirmationPopup() {
    // Création de l'élément popup
    const popup = document.createElement('div');
    popup.id = 'confirmation-popup';
    popup.style.display = 'none';
    document.body.appendChild(popup);

    // Création du contenu de la popup
    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');
    popup.appendChild(popupContent);

    const message = document.createElement('p');
    message.textContent = "Êtes-vous sûr de vouloir supprimer ce travail ?";
    popupContent.appendChild(message);

    // Bouton de confirmation
    const confirmButton = document.createElement('popup-button');
    confirmButton.id = 'confirm-delete';
    confirmButton.classList.add('confirm');
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-circle-check');
    confirmButton.appendChild(icon);
    popupContent.appendChild(confirmButton);


    // Bouton d'annulation
    const cancelButton = document.createElement('popup-button');
    confirmButton.id = 'confirm-delete';
    cancelButton.classList.add('cancel');
    const cancelIcon = document.createElement('i');
    cancelIcon.classList.add('fa-solid', 'fa-circle-xmark');
    cancelButton.appendChild(cancelIcon);
    popupContent.appendChild(cancelButton);
    

    // Ajouter les événements pour les boutons
    cancelButton.addEventListener('click', hideConfirmationPopup);
}

// Fonction pour afficher la popup de confirmation
function showConfirmationPopup(workId) {
    const popup = document.getElementById('confirmation-popup');
    popup.style.display = 'flex';

    // Fonction pour confirmer la suppression
    function handleConfirmDelete() {
        deleteWork(workId);
        hideConfirmationPopup();
    }

    // Ajouter l'événement sur le bouton de confirmation
    const confirmButton = document.getElementById('confirm-delete');
    confirmButton.addEventListener('click', handleConfirmDelete);
}

// Fonction pour masquer la popup
function hideConfirmationPopup() {
    const popup = document.getElementById('confirmation-popup');
    popup.style.display = 'none';
}

createConfirmationPopup();
