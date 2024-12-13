document.addEventListener('DOMContentLoaded', function () {

    /*********** GENERATION DE LA MODALE P1 ***********/

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
    closeModalButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    modal.appendChild(closeModalButton);

    const backButton = document.createElement('span');
    backButton.classList.add('back-button');
    backButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    backButton.style.display = 'none'; 
    modal.appendChild(backButton);

    const modalGallery = document.createElement('div');
    modalGallery.id = 'modal-gallery';
    modalGallery.classList.add('modal-page');
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
    modalGallery.appendChild(addPhotoButton);

    /*********** GENERATION DE LA MODALE P2 ***********/

    const modalAddPhoto = document.createElement('div');
    modalAddPhoto.id = 'modal-add-photo';
    modalAddPhoto.classList.add('modal-page');
    modal.appendChild(modalAddPhoto);

    const addPhotoTitle = document.createElement('h3');
    addPhotoTitle.classList.add('modal-title');
    addPhotoTitle.textContent = 'Ajout photo';
    modalAddPhoto.appendChild(addPhotoTitle);

    const uploadForm = document.createElement('form');
    uploadForm.id = 'upload-form';
    modalAddPhoto.appendChild(uploadForm);

    const uploadSectionContainer = document.createElement('div');
    uploadSectionContainer.id = 'upload-section';
    uploadForm.appendChild(uploadSectionContainer);

    const uploadIcon = document.createElement('i');
    uploadIcon.classList.add('fa-regular', 'fa-image');
    uploadSectionContainer.appendChild(uploadIcon);

    const addNewPhotoButton = document.createElement('button');
    addNewPhotoButton.id = 'add-photo-button-form';
    addNewPhotoButton.textContent = '+ Ajouter photo';
    uploadSectionContainer.appendChild(addNewPhotoButton);

    const uploadDescription = document.createElement('p');
    uploadDescription.textContent = 'jpg, png : 4mo max';
    uploadSectionContainer.appendChild(uploadDescription);

    const titleField = document.createElement('div');
    titleField.classList.add('form-field');
    uploadForm.appendChild(titleField);

    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'photo-title');
    titleLabel.textContent = 'Titre';
    titleField.appendChild(titleLabel);

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'photo-title';
    titleInput.placeholder = '';
    titleInput.required = true;
    titleField.appendChild(titleInput);

    const categoryField = document.createElement('div');
    categoryField.classList.add('form-field');
    uploadForm.appendChild(categoryField);

    const categoryLabel = document.createElement('label');
    categoryLabel.setAttribute('for', 'photo-category');
    categoryLabel.textContent = 'Catégorie';
    categoryField.appendChild(categoryLabel);

    const categorySelect = document.createElement('select');
    categorySelect.id = 'photo-category';
    categorySelect.required = true;
    categoryField.appendChild(categorySelect);

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Sélectionner une catégorie';
    categorySelect.appendChild(defaultOption);

    const separatorLine = document.createElement('div');
    separatorLine.classList.add('line');
    uploadForm.appendChild(separatorLine);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.classList.add('submit-button');
    submitButton.disabled = true;
    submitButton.textContent = 'Valider';
    uploadForm.appendChild(submitButton);

    modalAddPhoto.appendChild(uploadForm);

    /*********** Fonctions génériques ***********/

    function openModal(pageId) {
        modalContainer.classList.remove('hidden');
        setTimeout(() => {
            modalContainer.style.opacity = '1';
        }, 10);

        if (pageId) {
            switchModalPage(pageId);
        }

        if (pageId === 'modal-add-photo') {
            backButton.style.display = 'block';
        } else {
            backButton.style.display = 'none';
        }
    }

    function resetCategorySelect() {
        const categorySelect = document.getElementById('photo-category');
        categorySelect.value = '';
    }

    function closeModal() {
        modalContainer.style.opacity = '0';
        setTimeout(() => {
            modalContainer.classList.add('hidden');

            // Réinitialiser le formulaire

            const uploadForm = document.getElementById('upload-form');
            if (uploadForm) {
                uploadForm.reset();
            }
    
            // Réinitialiser le champ de fichier

            const fileInput = document.getElementById('photo-file');
            if (fileInput) {
                fileInput.value = '';
            }

            // Désactiver le bouton de validation

            const submitButton = document.querySelector('.submit-button');
            if (submitButton) {
                submitButton.disabled = true;
            }
        }, 300);
    }

    function switchModalPage(pageId) {
        const modalPages = document.querySelectorAll('.modal-page');
        modalPages.forEach(page => {
            page.classList.toggle('active', page.id === pageId);
        });

        if (pageId === 'modal-add-photo') {
            backButton.style.display = 'block';
        } else {
            backButton.style.display = 'none';
        }
    }

    function populateCategories(categories) {
        const categorySelect = document.getElementById('photo-category');
        categorySelect.innerHTML = '';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    }

    function loadCategoriesFromMain() {
        if (window.allCategories && window.allCategories.length > 0) {
            populateCategories(window.allCategories);
        } else {
            console.error("Aucune catégorie disponible.");
            const checkCategories = setInterval(() => {
                if (window.allCategories && window.allCategories.length > 0) {
                    clearInterval(checkCategories);
                    populateCategories(window.allCategories);
                } else {
                    console.log("En attente de catégories...");
                }
            }, 100);
        }
    }

    /*********** Gestion des événements ***********/

    closeModalButton.addEventListener('click', closeModal);
    modalContainer.addEventListener('click', (event) => {
        if (event.target === modalContainer) closeModal();
    });

    addPhotoButton.addEventListener('click', () => {
        openModal('modal-add-photo');
    });

    backButton.addEventListener('click', () => {
        switchModalPage('modal-gallery');
    });

    const editText = document.querySelector('.edit-container .edit-text');
    if (editText) {
        editText.addEventListener('click', () => {
            openModal('modal-gallery');
            displayWorksInModal(allWorks);
        });
    }

    /*********** Afficher les travaux ***********/

    function displayWorksInModal(works) {
        modalWorksContainer.innerHTML = '';
        if (!works || works.length === 0) {
            modalWorksContainer.innerHTML = '<p>Aucun travail à afficher</p>';
            return;
        }
        works.forEach(work => {
            const workElement = document.createElement('div');
            workElement.classList.add('work-item');

            const imageElement = document.createElement('img');
            imageElement.src = work.imageUrl;
            imageElement.alt = work.title;
            workElement.appendChild(imageElement);

            const trashIcon = document.createElement('div');
            trashIcon.classList.add('trash-icon');

            const icon = document.createElement('i');
            icon.classList.add('fa-solid', 'fa-trash-can');
            trashIcon.appendChild(icon);
            workElement.appendChild(trashIcon);

            trashIcon.addEventListener('click', () => {
                deleteWork(work.id);
            });

            modalWorksContainer.appendChild(workElement);
        });
    }

    /*********** Supprimer un travail ***********/

    async function deleteWork(workId) {
        try {
            const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la suppression du travail");
            }

            allWorks = allWorks.filter(work => work.id !== workId);
            displayWorksInModal(allWorks);
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    }

    /*********** Chargement initial ***********/

    loadCategoriesFromMain();

    /*********** Fonction d'upload ***********/

    // Ajout du champ input pour le fichier (caché initialement)

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'photo-file';
    fileInput.accept = '.jpg, .png';
    fileInput.required = true;
    fileInput.style.display = 'none';

    // Ajout du champ input à la section de téléchargement

    const uploadSection = document.getElementById('upload-section');
    uploadSection.appendChild(fileInput);

    // Lorsque l'utilisateur clique sur "Ajouter photo", on déclenche l'input

    const addPhotoButtonForm = document.getElementById('add-photo-button-form');
    addPhotoButtonForm.addEventListener('click', (event) => {
        event.preventDefault();
        fileInput.click();
    });

    // Fonction pour valider l'upload

    function validateFile(file) {

        // Vérifier le type de fichier

        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            alert('Seuls les fichiers JPG et PNG sont autorisés.');
            return false;
        }

        // Vérifier la taille du fichier

        const maxSize = 4 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('Le fichier ne doit pas dépasser 4 Mo.');
            return false;
        }

        return true;
    }

    // Écouter l'événement de changement sur l'input fichier

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
            if (validateFile(file)) {
                const submitButton = document.querySelector('.submit-button');
                submitButton.disabled = false;
            } else {
                const submitButton = document.querySelector('.submit-button');
                submitButton.disabled = true;
            }
        }
    });

    // Lors de la soumission du formulaire (ajouter photo)

    uploadForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const file = fileInput.files[0];
        const title = document.getElementById('photo-title').value;
        const category = document.getElementById('photo-category').value;

        if (!file || !title || !category) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);
        formData.append('category', category);

        try {
            const response = await fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: formData
            });

            if (response.ok) {
                const newWork = await response.json();
                allWorks.push(newWork);
                displayWorksInModal(allWorks);
                closeModal();
            } else {
                console.error("Erreur lors de l'upload de la photo");
            }
        } catch (error) {
            console.error('Erreur lors de l\'upload:', error);
        }
    });
});