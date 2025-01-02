// Fonction qui supprime un travail par son ID
window.deleteWork = async function (workId) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la suppression du travail : ${response.statusText}`);
        }

        allWorks = allWorks.filter(work => work.id !== parseInt(workId, 10));

        displayWorks(allWorks);
        displayWorksInModal(allWorks);
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
    }
};

document.body.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('trash-icon')) {
        const workItem = event.target.closest('.work-item');
        const workId = workItem?.dataset.workId;

        if (workId) {
            showConfirmationPopup(workId);
        } else {
            console.error("Aucun ID trouvé pour ce travail.");
        }
    }
});

function showConfirmationPopup(workId) {
    createConfirmationPopup();

    const popup = document.getElementById('confirmation-popup');
    popup.style.display = 'flex';

    const confirmButton = document.getElementById('popup-confirm');
    confirmButton.dataset.workId = workId;
}

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

    const confirmButton = document.createElement('button');
    confirmButton.id = 'popup-confirm';
    confirmButton.classList.add('confirm');

    const confirmIcon = document.createElement('i');
    confirmIcon.classList.add('fa-solid', 'fa-circle-check');
    confirmButton.appendChild(confirmIcon);

    const confirmText = document.createTextNode(" Confirmer");
    confirmButton.appendChild(confirmText);

    popupContent.appendChild(confirmButton);

    const cancelButton = document.createElement('button');
    cancelButton.id = 'popup-cancel';
    cancelButton.classList.add('cancel');

    const cancelIcon = document.createElement('i');
    cancelIcon.classList.add('fa-solid', 'fa-circle-xmark');
    cancelButton.appendChild(cancelIcon);

    const cancelText = document.createTextNode(" Annuler");
    cancelButton.appendChild(cancelText);

    popupContent.appendChild(cancelButton);

    cancelButton.addEventListener('click', hideConfirmationPopup);

    confirmButton.addEventListener('click', () => {
        const workId = confirmButton.dataset.workId;
        if (workId) {
            deleteWork(workId);
        }
        hideConfirmationPopup();
    });
}

function hideConfirmationPopup() {
    const popup = document.getElementById('confirmation-popup');
    if (popup) {
        popup.style.display = 'none';
    }
}

createConfirmationPopup();
