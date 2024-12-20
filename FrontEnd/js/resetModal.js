window.resetModal = function () {
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
        fileInput.value = ''; // Réinitialiser la valeur
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

    // Réinitialiser la section upload
    const uploadSection = document.getElementById('upload-section');
    if (uploadSection) {
        // Vider tout le contenu existant de la section (réinitialiser la section d'upload)
        uploadSection.innerHTML = '';

        // Créer l'élément <i> (icône de l'image)
        const icon = document.createElement('i');
        icon.classList.add('fa-regular', 'fa-image');
        uploadSection.appendChild(icon);

        // Créer le bouton "Ajouter photo"
        const addPhotoButton = document.createElement('button');
        addPhotoButton.id = 'add-photo-button-form';
        addPhotoButton.textContent = '+ Ajouter photo';
        uploadSection.appendChild(addPhotoButton);

        // Créer le paragraphe avec les instructions
        const instructions = document.createElement('p');
        instructions.textContent = 'jpg, png : 4mo max';
        uploadSection.appendChild(instructions);

        // Créer l'image d'aperçu (si elle n'existe pas déjà)
        const previewImage = document.createElement('img');
        previewImage.classList.add('upload-image');
        previewImage.src = '';  // Pas de source initiale
        previewImage.alt = 'Aperçu';
        previewImage.style.display = 'none';  // Masquer l'image d'aperçu au début
        uploadSection.appendChild(previewImage);

        // Créer l'input file si nécessaire
        let fileInput = document.getElementById('photo-file');
        if (!fileInput) {
            fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.id = 'photo-file';
            fileInput.accept = '.jpg, .png';
            fileInput.required = true;
            fileInput.style.display = 'none';
            uploadSection.appendChild(fileInput);
        }

        // Réinitialiser l'événement "change" pour l'aperçu de l'image
        fileInput.removeEventListener('change', handleFileChange); // Supprimer l'ancien événement
        fileInput.addEventListener('change', handleFileChange);

        // Réassigner l'événement "click" pour permettre de sélectionner un fichier via l'aperçu
        previewImage.addEventListener('click', function() {
            // Ouvrir le champ de fichier lorsque l'image d'aperçu est cliquée
            fileInput.click();
        });

        // Réassigner l'événement "click" pour permettre d'ajouter une photo via le bouton
        addPhotoButton.addEventListener('click', handleAddPhotoClick);
    }

    console.log('Réinitialisation de la modale terminée.');
};

// Fonction pour gérer l'événement "change" de l'input file (affichage de l'aperçu)
function handleFileChange(e) {
    const file = e.target.files[0];
    const previewImage = document.querySelector('.upload-image');
    const icon = document.querySelector('.fa-image');
    const addPhotoButton = document.querySelector('#add-photo-button-form');
    const instructions = document.querySelector('#upload-section p');

    if (file && previewImage) {
        const reader = new FileReader();
        reader.onload = function (event) {
            previewImage.src = event.target.result;
            previewImage.style.display = 'block'; // Afficher l'aperçu
            console.log('Aperçu mis à jour.');

            // Masquer les autres éléments de la section upload
            icon.style.display = 'none';
            addPhotoButton.style.display = 'none';
            instructions.style.display = 'none';
        };
        reader.readAsDataURL(file);
    } else {
        console.error("Élément d'aperçu non trouvé après lecture du fichier.");
    }
}

// Fonction pour gérer le clic sur le bouton "Ajouter photo" pour ouvrir l'input file
function handleAddPhotoClick(e) {
    e.preventDefault();
    const fileInput = document.getElementById('photo-file');
    if (fileInput) {
        fileInput.click(); // Ouvre le champ de fichier uniquement si fileInput existe
    } else {
        console.error("Le champ de fichier n'existe pas.");
    }
}
