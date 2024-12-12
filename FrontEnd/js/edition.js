/*********** VERIFIE SI LE USER EST CONNECTE VIA LE TOKEN ***********/

function checkAuth() {
    const token = localStorage.getItem("authToken");

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
            loginLink.addEventListener('click', logout);
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
    }
}

/*********** ACTIVE LE MODE EDITION ***********/

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

/*********** DESACTIVE LE MODE EDITION ***********/

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

/*********** DECONNECTION USER ***********/

function logout(event) {
    event.preventDefault();
    localStorage.removeItem("authToken");
    window.location.href = "index.html";
}
