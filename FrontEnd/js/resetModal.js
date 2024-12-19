window.resetUploadModal = function () {
    console.log('Réinitialisation de la modale commencée.');

    // Réinitialiser le formulaire
    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.reset();
        console.log('Formulaire réinitialisé.');
    }

    // Réinitialiser le champ de fichier
    const fileInput = document.getElementById('photo-file');
    if (fileInput) {
        fileInput.value = '';
        console.log('Champ fichier réinitialisé.');
    }

    // Désactiver le bouton de validation
    const submitButton = document.querySelector('.submit-button');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.classList.remove('active');
        console.log('Bouton de validation désactivé.');
    }

    // Réinitialiser la catégorie
    const categorySelect = document.getElementById('photo-category');
    if (categorySelect) {
        categorySelect.value = '';
        console.log('Sélecteur de catégorie réinitialisé.');
    }

    // Réinitialiser les instructions d'upload dans la section
    const uploadSection = document.getElementById('upload-section');
    if (uploadSection) {
        // Remettre le contenu initial de la section
        uploadSection.innerHTML = `
            <i class="fa-regular fa-image"></i>
            <button id="add-photo-button-form">+ Ajouter photo</button>
            <p>jpg, png : 4mo max</p>
            <img class="upload-image" src="" alt="Aperçu">
        `;

        // Vérifie que la balise <img> est bien ajoutée
        const previewImage = document.querySelector('#upload-section img');
        if (!previewImage) {
            console.error("La balise <img> pour l'aperçu n'a pas été trouvée. Vérifiez votre DOM.");
            return; // Arrête l'exécution si l'image n'est pas trouvée
        }

        // Vérifie et ajoute le champ input file s'il n'existe pas
        if (!document.getElementById('photo-file')) {
            const newFileInput = document.createElement('input');
            newFileInput.type = 'file';
            newFileInput.id = 'photo-file';
            newFileInput.accept = '.jpg, .png';
            newFileInput.required = true;
            newFileInput.style.display = 'none';
            uploadSection.appendChild(newFileInput);

            // Ajoute l'événement "change" pour afficher l'aperçu
            newFileInput.addEventListener('change', function (e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (event) {
                        if (previewImage) {
                            previewImage.src = event.target.result;
                            previewImage.style.display = 'block'; // Affiche l'image d'aperçu
                            console.log('Aperçu mis à jour.');

                            // Masquer les autres éléments de la section upload
                            const icon = uploadSection.querySelector('i');
                            const addPhotoButton = document.getElementById('add-photo-button-form');
                            const instructions = uploadSection.querySelector('p');

                            if (icon) icon.style.display = 'none';
                            if (addPhotoButton) addPhotoButton.style.display = 'none';
                            if (instructions) instructions.style.display = 'none';
                        } else {
                            console.error("Élément d'aperçu non trouvé après lecture du fichier.");
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // Réassigner l'événement "click" au bouton pour ouvrir l'input file
        const addPhotoButton = document.getElementById('add-photo-button-form');
        if (addPhotoButton) {
            addPhotoButton.addEventListener('click', (e) => {
                e.preventDefault();
                const fileInput = document.getElementById('photo-file');
                if (fileInput) fileInput.click();
            });
        }
    }

    console.log('Réinitialisation de la modale terminée.');
};
