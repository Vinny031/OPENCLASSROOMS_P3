function checkAuth() {
    const token = sessionStorage.getItem("authToken");

    if (token) {
        enableEditMode();
        document.querySelector('header').style.marginTop = '97px';

        const filters = document.getElementById('category-menu');
        if (filters) {
            filters.classList.add('hidden');
        }

        const editIcons = document.querySelectorAll('.fa-pen-to-square');
        const editText = document.querySelector('.edit-text');

        if (editIcons.length > 0) {
            editIcons.forEach(icon => icon.classList.remove('hidden'));
        }
        if (editText) {
            editText.classList.remove('hidden');
        }

        const loginLink = document.querySelector('a[href="login.html"]');
        if (loginLink) {
            loginLink.textContent = "logout";
            loginLink.setAttribute('href', '#');
            loginLink.addEventListener('click', (event) => {
                event.preventDefault();
                showLogoutPopup();
            });
        }
    } else {
        disableEditMode();
        document.querySelector('header').style.marginTop = '50px';

        const filters = document.getElementById('category-menu');
        if (filters) {
            filters.classList.remove('hidden');
        }

        const editIcons = document.querySelectorAll('.fa-pen-to-square');
        const editText = document.querySelector('.edit-text');

        if (editIcons.length > 0) {
            editIcons.forEach(icon => icon.classList.add('hidden'));
        }
        if (editText) {
            editText.classList.add('hidden');
        }

        const loginLink = document.querySelector('a[href="login.html"]');
        if (loginLink) {
            loginLink.textContent = "login";
            loginLink.setAttribute('href', 'login.html');
        }
    }
}

function enableEditMode() {
    const editModeBar = document.querySelector('.edit-mode-bar');
    const editIcon = document.querySelector('.edit-mode-bar i');
    const editText = document.querySelector('.edit-mode-bar span');

    if (editModeBar && editIcon && editText) {
        editModeBar.classList.remove('hidden');
        editIcon.classList.remove('hidden');
        editText.classList.remove('hidden');
    } else {
        console.error("L'un des éléments pour activer le mode édition est manquant.");
    }
}

function disableEditMode() {
    const editModeBar = document.querySelector('.edit-mode-bar');
    const filters = document.getElementById('category-menu');
    const editIcons = document.querySelectorAll('.fa-pen-to-square');
    const editText = document.querySelector('.edit-text');

    if (editModeBar) {
        editModeBar.classList.add('hidden');
    }

    if (filters) {
        filters.classList.remove('hidden');
    }

    if (editIcons.length > 0) {
        editIcons.forEach(icon => icon.classList.add('hidden'));
    }

    if (editText) {
        editText.classList.add('hidden');
    }

    const loginLink = document.querySelector('a[href="login.html"]');
    if (loginLink) {
        loginLink.textContent = "login";
        loginLink.setAttribute('href', 'login.html');
    }
}

function showLogoutPopup() {
    createLogoutPopup();

    const popup = document.getElementById('logout-popup');
    popup.style.display = 'flex';
}

function createLogoutPopup() {
    if (document.getElementById('logout-popup')) return;

    const popup = document.createElement('div');
    popup.id = 'logout-popup';
    popup.style.display = 'none';
    document.body.appendChild(popup);

    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');
    popup.appendChild(popupContent);

    const message = document.createElement('p');
    message.textContent = "Êtes-vous sûr de vouloir vous déconnecter ?";
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

    cancelButton.addEventListener('click', hideLogoutPopup);

    confirmButton.addEventListener('click', () => {
        performLogout();
        hideLogoutPopup();
    });
}

function hideLogoutPopup() {
    const popup = document.getElementById('logout-popup');
    if (popup) {
        popup.style.display = 'none';
    }
}

function performLogout() {
    sessionStorage.removeItem("authToken");
    window.location.href = "login.html";
}
