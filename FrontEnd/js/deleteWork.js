// Fonction qui supprime un travail par son ID
window.deleteWork = async function (workId) {
    try {
        console.log(`Suppression du travail avec ID : ${workId}`);

        // Envoi de la requête de suppression vers l'API
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la suppression du travail : ${response.statusText}`);
        }

        // Mettre à jour la liste locale des travaux
        allWorks = allWorks.filter(work => work.id !== parseInt(workId, 10));

        displayWorks(allWorks);
        displayWorksInModal(allWorks);
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
    }
};

// Gérer l'événement de suppression pour chaque icône de suppression avec délégation
document.body.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('trash-icon')) {
        const workItem = event.target.closest('.work-item');
        const workId = workItem?.dataset.workId;

        if (workId) {
            console.log(`ID du travail trouvé : ${workId}`);
            showConfirmationPopup(workId);
        } else {
            console.error("Aucun ID trouvé pour ce travail.");
        }
    }
});

// Fonction pour afficher la popup de confirmation
function showConfirmationPopup(workId) {
    createConfirmationPopup();

    const popup = document.getElementById('confirmation-popup');
    popup.style.display = 'flex';

    // Enregistrer l'ID du travail dans le bouton de confirmation
    const confirmButton = document.getElementById('popup-confirm');
    confirmButton.dataset.workId = workId;

    console.log(`Popup affichée pour le travail ID : ${workId}`);
}

// Fonction pour créer et ajouter la popup de confirmation de suppression
function createConfirmationPopup() {
    if (document.getElementById('confirmation-popup')) return;

    const popup = document.createElement('div');
    popup.id = 'confirmation-popup';
    popup.style.display = 'none';
    document.body.appendChild(popup);

    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');
    popup.appendChild(popupContent);

    const message = document.createElement('p');
    message.textContent = "Êtes-vous sûr de vouloir supprimer ce travail ?";
    popupContent.appendChild(message);

    // Bouton de confirmation
    const confirmButton = document.createElement('button');
    confirmButton.id = 'popup-confirm';
    confirmButton.classList.add('confirm');

    const confirmIcon = document.createElement('i');
    confirmIcon.classList.add('fa-solid', 'fa-circle-check'); // Ajout de l'icône
    confirmButton.appendChild(confirmIcon);

    const confirmText = document.createTextNode(" Confirmer");
    confirmButton.appendChild(confirmText);

    popupContent.appendChild(confirmButton);

    // Bouton d'annulation
    const cancelButton = document.createElement('button');
    cancelButton.id = 'popup-cancel';
    cancelButton.classList.add('cancel');

    const cancelIcon = document.createElement('i');
    cancelIcon.classList.add('fa-solid', 'fa-circle-xmark'); // Ajout de l'icône
    cancelButton.appendChild(cancelIcon);

    const cancelText = document.createTextNode(" Annuler");
    cancelButton.appendChild(cancelText);

    popupContent.appendChild(cancelButton);

    // Gestion des événements
    cancelButton.addEventListener('click', hideConfirmationPopup);

    confirmButton.addEventListener('click', () => {
        const workId = confirmButton.dataset.workId;
        if (workId) {
            deleteWork(workId);
        }
        hideConfirmationPopup();
    });
}


// Fonction pour masquer la popup
function hideConfirmationPopup() {
    const popup = document.getElementById('confirmation-popup');
    if (popup) {
        popup.style.display = 'none';
    }
}

// Créer la popup au chargement initial
createConfirmationPopup();
