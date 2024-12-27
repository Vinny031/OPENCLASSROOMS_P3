window.resetModal = function () {
    console.log('Réinitialisation de la modale commencée.');

    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.reset();
        console.log('Formulaire réinitialisé.');
    }

    const fileInput = document.getElementById('photo-file');
    if (fileInput) {
        fileInput.value = '';
    }

    const submitButton = document.querySelector('.submit-button');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.classList.remove('active');
        console.log('Bouton de validation désactivé.');
    }

    const categorySelect = document.getElementById('photo-category');
    if (categorySelect) {
        categorySelect.value = '';
        console.log('Sélecteur de catégorie réinitialisé.');
    }

    const uploadSection = document.getElementById('upload-section');
    if (uploadSection) {

        uploadSection.innerHTML = '';

        const icon = document.createElement('i');
        icon.classList.add('fa-regular', 'fa-image');
        uploadSection.appendChild(icon);

        const addPhotoButton = document.createElement('button');
        addPhotoButton.id = 'add-photo-button-form';
        addPhotoButton.textContent = '+ Ajouter photo';
        uploadSection.appendChild(addPhotoButton);

        const instructions = document.createElement('p');
        instructions.textContent = 'jpg, png : 4mo max';
        uploadSection.appendChild(instructions);

        const previewImage = document.createElement('img');
        previewImage.classList.add('upload-image');
        previewImage.src = '';
        previewImage.alt = 'Aperçu';
        previewImage.style.display = 'none';
        uploadSection.appendChild(previewImage);

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

        fileInput.removeEventListener('change', handleFileChange);
        fileInput.addEventListener('change', handleFileChange);

        previewImage.addEventListener('click', function() {
            fileInput.click();
        });

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
            previewImage.style.display = 'block';
            console.log('Aperçu mis à jour.');

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
        fileInput.click();
    } else {
        console.error("Le champ de fichier n'existe pas.");
    }
}
