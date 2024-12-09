document.addEventListener('DOMContentLoaded', function () {

        // Créer et insérer dynamiquement la modale
        const modalContainer = document.createElement('div');
        modalContainer.id = 'modal-container';
        modalContainer.classList.add('hidden');
        document.body.appendChild(modalContainer);
    
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modalContainer.appendChild(modal);
    
        const closeModalButton = document.createElement('span');
        closeModalButton.id = 'close-modal';
        closeModalButton.classList.add('close-button');
        closeModalButton.innerHTML = '&times;';
        modal.appendChild(closeModalButton);
    
        const modalGallery = document.createElement('div');
        modalGallery.classList.add('modal-gallery');
        modal.appendChild(modalGallery);
    
        const modalTitle = document.createElement('h3');
        modalTitle.classList.add('modal-title');
        modalTitle.textContent = 'Galerie photo';
        modalGallery.appendChild(modalTitle);
    
        const modalWorksContainer = document.createElement('div');
        modalWorksContainer.id = 'modal-works';
        modalWorksContainer.classList.add('modal-works');
        modalGallery.appendChild(modalWorksContainer);
    
        const line = document.createElement('div');
        line.classList.add('line');
        modalGallery.appendChild(line);
    
        const addPhotoButton = document.createElement('button');
        addPhotoButton.id = 'add-photo-button';
        addPhotoButton.classList.add('add-photo-button');
        addPhotoButton.textContent = 'Ajouter une photo';
        modal.appendChild(addPhotoButton);
    
        /*********** Sélectionner le texte "modifier" ***********/
        const editText = document.querySelector('.edit-container .edit-text');
    
        /*********** Vérifier si les éléments existent ***********/
        if (editText && modalContainer && closeModalButton) {
    
            /*********** Ouvrir la modale au clic sur le texte "modifier" ***********/
            editText.addEventListener('click', () => {
                modalContainer.classList.remove('hidden');
                displayWorksInModal(allWorks); // Assure-toi que "allWorks" est bien défini
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