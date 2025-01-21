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

/*** Ouvre une modale spécifique, initialise des éléments spécifiques si nécessaire.*/

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

                fileInput.addEventListener('change', handleFileChange);
            }
        } else {
            console.error('uploadSection non trouvé dans le DOM');
        }
    } else {
        backButton.style.display = 'none';
    }
}

/*** Réinitialise le menu déroulant des catégories.*/

function resetCategorySelect() {
    const categorySelect = document.getElementById('photo-category');
    if (categorySelect) {
        categorySelect.value = '';
    }
}

/*** Ferme la modale, réinitialise son contenu et gère l'affichage des boutons.*/

function closeModal() {
    modalContainer.style.opacity = '0';
    setTimeout(() => {
        modalContainer.classList.add('hidden');

        resetModal();

        const submitButton = document.querySelector('.submit-button');
        if (submitButton) {
            submitButton.disabled = true;
        }

        const previewImage = document.querySelector('.upload-image');
        if (previewImage && previewImage.src.startsWith('blob:')) {
            URL.revokeObjectURL(previewImage.src);
            previewImage.src = '';
        }
    }, 300);
}

/*** Change la page affichée dans une modale en fonction de l'ID fourni.*/

function switchModalPage(pageId) {
    const modalPages = document.querySelectorAll('.modal-page');
    modalPages.forEach(page => {
        page.classList.toggle('active', page.id === pageId);
    });
    backButton.style.display = pageId === 'modal-add-photo' ? 'block' : 'none';
}

/*** Remplit le menu déroulant des catégories avec les données fournies.*/

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

/*** Charge les catégories depuis une source principale ou attend leur disponibilité.*/

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

/*** Attend que les catégories soient chargées et retourne une promesse.*/

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

closeModalButton.addEventListener('click', closeModal);
modalContainer.addEventListener('click', (event) => {
    if (event.target === modalContainer) closeModal();
});

addPhotoButton.addEventListener('click', () => {
    resetModal()
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
        imageElement.src = imageUrl;
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

loadCategoriesFromMain();

/*** Valide un fichier en fonction de son type et de sa taille maximale autorisée.*/

function validateFile(file) {
    const allowedTypes = ['image/png', 'image/jpg'];
    const maxSize = 4 * 1024 * 1024;

    if (!file) return false;

    const isValidType = allowedTypes.includes(file.type);
    const isValidSize = file.size <= maxSize;

    return isValidType && isValidSize;
}

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.id = 'photo-file';
fileInput.accept = '.jpg, .png';
fileInput.required = true;
fileInput.style.display = 'none';

const uploadSection = document.getElementById('upload-section');
if (uploadSection) {
    uploadSection.appendChild(fileInput);
} else {
    console.error('uploadSection non trouvé dans le DOM');
}

modalContainer.addEventListener('change', (event) => {
    if (event.target && event.target.id === 'photo-file') {
        const file = event.target.files[0];
        console.log('Changement détecté dans fileInput');

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
    }
});


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

/*** Vérifie si le formulaire est valide et met à jour l'état du bouton de soumission.*/

function checkFormValidity() {
    console.log('Vérification de la validité du formulaire');
    const file = fileToSend;
    console.log('fileInput.files:', fileInput.files); 
    const title = titleInput.value.trim();
    const category = categorySelect.value;

    console.log(`Fichier sélectionné : ${file ? 'Oui' : 'Non'}`);

    const isFileValid = file && validateFile(file);
    const isTitleValid = title.length > 0;
    const isCategoryValid = category !== '';

    console.log(`Fichier valide : ${isFileValid}`);

    submitButton.disabled = !(isFileValid && isTitleValid && isCategoryValid);
    submitButton.classList.toggle('active', !submitButton.disabled);
}

// Ajoute un écouteur pour détecter les changements dans l'entrée du fichier

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    
    fileToSend = file;

    console.log('Fichier sélectionné:', fileToSend);

    if (fileToSend) {
        console.log(`Nom du fichier: ${fileToSend.name}`);
        console.log(`Type de fichier: ${fileToSend.type}`);
        console.log(`Taille du fichier: ${fileToSend.size} octets`);
    }
});

// Ajoute un écouteur pour détecter les changements dans l'entrée du titre

titleInput.addEventListener('input', () => {
    checkFormValidity();
});

// Ajoute un écouteur pour détecter les changements dans la sélection des catégories

categorySelect.addEventListener('change', () => {
    checkFormValidity();
});

/*** Récupère le jeton d'authentification depuis le stockage de session.*/

function getAuthToken() {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
        console.error('Token manquant');
        alert('Vous devez être connecté pour soumettre une photo.');
    }
    return token;
}

/*** Vérifie si le formulaire est valide en fonction du fichier, du titre et de la catégorie.*/

function isFormValid(file, title, category) {
    if (!file || !title || !category) {
        alert('Veuillez remplir tous les champs');
        return false;
    }
    return true;
}

/*** Crée un objet FormData avec les données du fichier, du titre et de la catégorie.*/

function createFormData(file, title, category) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('category', category);
    return formData;
}

/*** Soumet une photo à l'API avec un formulaire et un jeton d'authentification.*/

async function submitPhoto(formData, token) {
    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
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

/*** Traite la réponse de l'API pour vérifier le succès ou l'échec.*/

function handleApiResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        alert('Erreur lors de l\'ajout de la photo.');
        return null;
    }
}

/*** Met à jour la galerie et les données des travaux après une soumission réussie.*/

function updateGalleryAndWorks(newWork) {
    newWork.imageUrl = `${newWork.imageUrl}?t=${Date.now()}`;
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

    showValidationPopup();

    resetModal();
    switchModalPage('modal-gallery');
}

/*** Gère la soumission du formulaire de téléchargement de photos.*/

function handleSubmit(event) {
    event.preventDefault();

    const token = getAuthToken();
    if (!token) return;

    const file = fileToSend; 
    const title = document.getElementById('photo-title').value;
    const category = document.getElementById('photo-category').value;

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

/*** Affiche une popup de validation après un ajout réussi.*/

function showValidationPopup() {
    createValidationPopup();

    const popup = document.getElementById('validation-popup');
    popup.style.display = 'flex';
}

/*** Crée une popup de validation si elle n'existe pas encore.*/

function createValidationPopup() {
    if (document.getElementById('validation-popup')) return;

    const popup = document.createElement('div');
    popup.id = 'validation-popup';
    popup.style.display = 'none';
    document.body.appendChild(popup);

    const popupContent = document.createElement('div');
    popupContent.classList.add('validation-popup-content');
    popup.appendChild(popupContent);

    const message = document.createElement('p');
    message.textContent = "Travail ajouté avec succès !";
    popupContent.appendChild(message);

    const closeButton = document.createElement('button');
    closeButton.id = 'validation-popup-close';
    closeButton.classList.add('close');

    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fa-solid', 'fa-circle-check');
    closeButton.appendChild(closeIcon);

    popupContent.appendChild(closeButton);

    closeButton.addEventListener('click', hideValidationPopup);
}

/*** Cache la popup de validation lorsqu'elle est fermée.*/

function hideValidationPopup() {
    const popup = document.getElementById('validation-popup');
    if (popup) {
        popup.style.display = 'none';
    }
}


if (uploadForm) {
    uploadForm.addEventListener('submit', handleSubmit);
} else {
    console.error("Formulaire non trouvé.");
}

let fileToSend = null;

/*** Gère le changement de fichier et met à jour l'aperçu.*/

function handleFileChange(event) {
    const file = event.target.files[0];
    const previewImage = document.querySelector('.upload-image');
    const fileInput = document.getElementById('photo-file');
    const uploadSection = document.getElementById('upload-section');

    if (fileInput) {
        fileInput.addEventListener('change', (event) => {

            const file = event.target.files[0];
            if (file) {
                fileToSend = file;
            } else {
                console.log('Aucun fichier sélectionné!');
            }
        });
    } else {
        console.log('fileInput non trouvé!');
    }

    if (!file) {
        resetModal();
        return;
    }

    fileToSend = file;
    
    let previewImageToUse = previewImage;
    if (!previewImageToUse) {
        previewImageToUse = document.createElement('img');
        previewImageToUse.classList.add('upload-image');
        previewImageToUse.style.display = 'none';
        uploadSection.appendChild(previewImageToUse);
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        previewImageToUse.src = e.target.result;
        previewImageToUse.style.display = 'block';

        const icon = document.querySelector('.fa-image');
        if (icon) icon.style.display = 'none';

        const addPhotoButton = document.querySelector('#add-photo-button-form');
        if (addPhotoButton) addPhotoButton.style.display = 'none';

        const instructions = document.querySelector('#upload-section p');
        if (instructions) instructions.style.display = 'none';

        fileInput.style.display = 'none';
        fileInput.files = event.target.files;
    };

    reader.readAsDataURL(file);
}

/*** Simule un clic sur l'entrée de fichier lorsque le bouton d'ajout est cliqué.*/

function handleAddPhotoClick(e) {
    e.preventDefault();
    const fileInput = document.getElementById('photo-file');
    if (fileInput) {
        fileInput.click();
    }
}

/*** Réinitialise les éléments de la modale de téléchargement.*/

function resetModal() {
    const fileInput = document.getElementById('photo-file');
    const previewImage = document.querySelector('.upload-image');
    const uploadSection = document.getElementById('upload-section');
    const addPhotoButton = document.querySelector('#add-photo-button-form');
    const instructions = document.querySelector('#upload-section p');

    if (fileInput) {
        fileInput.value = '';
        fileToSend = null; 
    }

    if (previewImage) {
        if (previewImage.src.startsWith('blob:')) {
            URL.revokeObjectURL(previewImage.src);
        }
        previewImage.src = '';
        previewImage.style.display = 'none';
    }

    if (uploadSection) {
        if (!uploadSection.querySelector('i.fa-image')) {
            const icon = document.createElement('i');
            icon.classList.add('fa-regular', 'fa-image');
            uploadSection.appendChild(icon);
        }

        if (!uploadSection.querySelector('#add-photo-button-form')) {
            const newAddPhotoButton = document.createElement('button');
            newAddPhotoButton.id = 'add-photo-button-form';
            newAddPhotoButton.textContent = '+ Ajouter photo';
            uploadSection.appendChild(newAddPhotoButton);
        }

        if (!uploadSection.querySelector('p')) {
            const newInstructions = document.createElement('p');
            newInstructions.textContent = 'jpg, png : 4mo max';
            uploadSection.appendChild(newInstructions);
        }
    }

    if (fileInput && !fileInput.hasAttribute('data-event-attached')) {
        fileInput.addEventListener('change', handleFileChange);
        fileInput.setAttribute('data-event-attached', 'true');
    }

    if (addPhotoButton && !addPhotoButton.hasAttribute('data-event-attached')) {
        addPhotoButton.addEventListener('click', handleAddPhotoClick);
        addPhotoButton.setAttribute('data-event-attached', 'true');
    }

    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.reset();
    }

    checkFormValidity();
}
});