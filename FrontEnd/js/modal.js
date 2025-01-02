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

const previewImage = document.createElement('img');
previewImage.style.display = 'none';
previewImage.classList.add('upload-image');

const uploadIcon = document.createElement('i');
uploadIcon.classList.add('fa-regular', 'fa-image');
uploadSectionContainer.appendChild(uploadIcon);

const addNewPhotoButton = document.createElement('button');
addNewPhotoButton.id = 'add-photo-button-form';
addNewPhotoButton.type = 'button'
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
modalAddPhoto.appendChild(separatorLine);

const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.classList.add('submit-button');
submitButton.disabled = true;
submitButton.textContent = 'Valider';
modalAddPhoto.appendChild(submitButton);
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    checkFormValidity();
    if (!submitButton.disabled) {
        uploadForm.requestSubmit();
    }
});

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

        const uploadSection = document.getElementById('upload-section');
        if (uploadSection) {
            let fileInput = document.getElementById('photo-file');
            if (!fileInput) {
                fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.id = 'photo-file';
                fileInput.name = 'photo-file';
                fileInput.accept = '.jpg, .png';
                fileInput.required = true;
                fileInput.style.display = 'none';
                uploadSection.appendChild(fileInput);
            }
        } else {
            console.error('uploadSection non trouvé dans le DOM');
        }
    } else {
        backButton.style.display = 'none';
    }
}

function resetCategorySelect() {
    const categorySelect = document.getElementById('photo-category');
    if (categorySelect) {
        categorySelect.value = '';
    }
}

function closeModal() {
    modalContainer.style.opacity = '0';
    setTimeout(() => {
        modalContainer.classList.add('hidden');

        if (window.resetModal) {
            window.resetModal();
        }

        const submitButton = document.querySelector('.submit-button');
        if (submitButton) {
            submitButton.disabled = true;
        }

        const previewImage = document.querySelector('.upload-image');
        if (previewImage.src) {
            URL.revokeObjectURL(previewImage.src);
        }
    }, 300);
}

function switchModalPage(pageId) {
    const modalPages = document.querySelectorAll('.modal-page');
    modalPages.forEach(page => {
        page.classList.toggle('active', page.id === pageId);
    });
    backButton.style.display = pageId === 'modal-add-photo' ? 'block' : 'none';
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
previewImage.addEventListener('click', () => {
    fileInput.click();
});

async function loadCategoriesFromMain() {
    if (window.allCategories && window.allCategories.length > 0) {
        populateCategories(window.allCategories);
    } else {
        console.log("En attente de catégories...");
        try {
            const categories = await waitForCategories();
            populateCategories(categories);
        } catch (error) {
            console.error("Erreur lors du chargement des catégories:", error);
        }
    }
}

async function waitForCategories() {
    return new Promise((resolve, reject) => {
        let intervalId = null;
        const checkCategories = () => {
            if (window.allCategories && window.allCategories.length > 0) {
                clearInterval(intervalId);
                resolve(window.allCategories);
            }
        };

        intervalId = setInterval(checkCategories, 100);
        setTimeout(() => {
            clearInterval(intervalId);
            reject("Aucune catégorie chargée après 5 secondes.");
        }, 5000);
    });
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
    resetModal();
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

window.displayWorksInModal = function(works) {
    modalWorksContainer.innerHTML = '';

    if (!works || works.length === 0) {
        modalWorksContainer.innerHTML = '<p>Aucun travail à afficher</p>';
        return;
    }

    works.forEach(work => {
        const workElement = document.createElement('div');
        workElement.classList.add('work-item');
        workElement.dataset.workId = work.id;

        const imageElement = document.createElement('img');
        const imageUrl = work.imageUrl.includes('?t=') 
        ? work.imageUrl 
        : `${work.imageUrl}?t=${Date.now()}`;
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;
        workElement.appendChild(imageElement);

        const trashIcon = document.createElement('div');
        trashIcon.classList.add('trash-icon');

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-trash-can');
        trashIcon.appendChild(icon);
        workElement.appendChild(trashIcon);

        trashIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            showConfirmationPopup(work.id);
        });

        modalWorksContainer.appendChild(workElement);
    });
}

/*********** click event des trash icon ***********/

document.body.addEventListener('click', function (event) {
    if (event.target && event.target.classList.contains('trash-icon')) {

        const workId = event.target.closest('.work-item') ? event.target.closest('.work-item').dataset.workId : null;

        if (workId) {
            showConfirmationPopup(workId);
        } else {
            console.error("Aucun ID trouvé pour ce travail.");
        }
    }
});

/*********** Chargement initial ***********/

loadCategoriesFromMain();

/*********** Fonction d'upload ***********/

// Fonction de validation du fichier

function validateFile(file) {
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
        alert('Seuls les fichiers JPG et PNG sont autorisés.');
        return false;
    }

    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
        alert('Le fichier ne doit pas dépasser 4 Mo.');
        return false;
    }

    return true;
}

// Définition du champ input pour le fichier photo

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.id = 'photo-file';
fileInput.accept = '.jpg, .png';
fileInput.required = true;
fileInput.style.display = 'none';

// Ajout du champ file à la section de téléchargement
const uploadSection = document.getElementById('upload-section');
if (uploadSection) {
    uploadSection.appendChild(fileInput);
} else {
    console.error('uploadSection non trouvé dans le DOM');
}

// Attacher un écouteur d'événement pour la validation du fichier
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file && validateFile(file)) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
            const uploadSection = document.getElementById('upload-section');
            uploadSection.innerHTML = '';
            uploadSection.appendChild(previewImage);
            checkFormValidity();
        };
        reader.readAsDataURL(file);
    } else {
        previewImage.style.display = 'none';
        resetModal(); 
    }
    checkFormValidity();
});

// Création d'un bouton pour ajouter une photo
const addPhotoButtonForm = document.getElementById('add-photo-button-form');
addPhotoButtonForm.addEventListener('click', (event) => {
    event.preventDefault();
    const file = fileInput.files[0];
    if (file) {
        if (validateFile(file)) {
            previewImage.style.display = 'block';
            previewImage.src = URL.createObjectURL(file);
            checkFormValidity();
        } else {
            console.error('Fichier invalide');
        }
    }
    
    fileInput.click();
});

function checkFormValidity() {
const file = fileInput.files[0];
const title = titleInput.value.trim();
const category = categorySelect.value;

const isFileValid = file && validateFile(file);
const isTitleValid = title.length > 0;
const isCategoryValid = category !== '';

submitButton.disabled = !(isFileValid && isTitleValid && isCategoryValid);
submitButton.classList.toggle('active', !submitButton.disabled);
}

titleInput.addEventListener('input', () => {
    checkFormValidity();
});

categorySelect.addEventListener('change', () => {
    checkFormValidity();
});

function getAuthToken() {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
        console.error('Token manquant');
        alert('Vous devez être connecté pour soumettre une photo.');
    }
    return token;
}

function isFormValid(file, title, category) {
    if (!file || !title || !category) {
        alert('Veuillez remplir tous les champs');
        return false;
    }
    return true;
}

function createFormData(file, title, category) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('category', category);
    return formData;
}

async function submitPhoto(formData, token) {
    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
            },
            body: formData
        });
        return response;
    } catch (error) {
        console.error('Erreur réseau:', error);
        alert('Erreur réseau. Veuillez réessayer plus tard.');
        return null;
    }
}

function handleApiResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        alert('Erreur lors de l\'ajout de la photo.');
        return null;
    }
}

function updateGalleryAndWorks(newWork) {
    newWork.imageUrl = `${newWork.imageUrl}?t=${Date.now()}`;

    alert('Photo ajoutée avec succès !');

    allWorks = allWorks.map(work => {
        if (work.id === newWork.id) {
            return { ...work, imageUrl: newWork.imageUrl };
        }
        return work;
    });

    if (!allWorks.find(w => w.id === newWork.id)) {
        allWorks.push(newWork);
    }

    displayWorksInModal(allWorks);
    displayWorks(allWorks);

    resetModal();
    switchModalPage('modal-gallery');
}

function handleSubmit(event) {
    event.preventDefault();

    const token = getAuthToken();
    if (!token) return;

    const file = fileInput.files[0];
    const title = document.getElementById('photo-title').value;
    const category = document.getElementById('photo-category').value;

    console.log("Fichier: ", file);
    console.log("Titre: ", title);
    console.log("Catégorie: ", category);

    if (!isFormValid(file, title, category)) return;

    const formData = createFormData(file, title, category);

    submitPhoto(formData, token).then(response => {
        if (response) {
            handleApiResponse(response).then(newWork => {
                if (newWork) {
                    updateGalleryAndWorks(newWork);
                }
            });
        }
    });
}

if (uploadForm) {
    uploadForm.addEventListener('submit', handleSubmit);
} else {
    console.error("Formulaire non trouvé.");
}

function handleFileChange(e) { 
    const file = e.target.files[0];
    const previewImage = document.querySelector('.upload-image');
    const fileInput = document.getElementById('photo-file');

    if (previewImage.src) {
        URL.revokeObjectURL(previewImage.src);
    }

    if (!file) {
        console.log("Aucun fichier sélectionné, réinitialisation de l'interface.");
        restoreUploadSection();
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        previewImage.src = event.target.result;
        previewImage.classList.remove('hidden');
        previewImage.style.display = 'block';

        const icon = document.querySelector('.fa-image');
        if (icon) icon.style.display = 'none';

        const addPhotoButton = document.querySelector('#add-photo-button-form');
        if (addPhotoButton) addPhotoButton.style.display = 'none';

        const instructions = document.querySelector('#upload-section p');
        if (instructions) instructions.style.display = 'none';

        fileInput.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function handleAddPhotoClick(e) {
    e.preventDefault();
    const fileInput = document.getElementById('photo-file');
    if (fileInput) {
        fileInput.click();
    }
}

function resetModal() {
    const uploadSection = document.getElementById('upload-section');
    if (!uploadSection) return;

    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.reset();
    }
    const existingFileInput = document.getElementById('photo-file');
    if (existingFileInput) {
        existingFileInput.removeEventListener('change', handleFileChange);
    }

    uploadSection.innerHTML = '';

    const previewImage = document.querySelector('.upload-image');
    if (previewImage && previewImage.src) {
        URL.revokeObjectURL(previewImage.src);
        previewImage.style.display = 'none';
        previewImage.src = ''; 
    }
    setTimeout(() => {
        restoreUploadSection();
    }, 50);
}

function restoreUploadSection() {
    const uploadSection = document.getElementById('upload-section');
    if (!uploadSection) return;

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
    previewImage.classList.add('upload-image', 'hidden');
    previewImage.src = '';
    previewImage.alt = 'Aperçu';
    uploadSection.appendChild(previewImage);

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'photo-file';
    fileInput.accept = '.jpg, .png';
    fileInput.required = true;
    fileInput.style.display = 'none';
    uploadSection.appendChild(fileInput);

    fileInput.value = '';

    fileInput.addEventListener('change', handleFileChange);
    addPhotoButton.addEventListener('click', handleAddPhotoClick);
}
});