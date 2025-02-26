// Écoute l'événement 'DOMContentLoaded' pour créer et afficher la page de connexion.

document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("login-html");

    const loginPage = document.createElement("div");
    loginPage.className = "login-page";

    const loginTitle = document.createElement("h2");
    loginTitle.className = "login-title";
    loginTitle.textContent = "Log In";

    const loginForm = document.createElement("form");
    loginForm.className = "login-form-container"; 

    const emailDiv = document.createElement("div");
    emailDiv.className = "login-form";

    const emailLabel = document.createElement("label");
    emailLabel.htmlFor = "email";
    emailLabel.className = "form-label";
    emailLabel.textContent = "E-mail";

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.name = "email";
    emailInput.className = "form-input js-email";
    emailInput.required = true;

    emailDiv.appendChild(emailLabel);
    emailDiv.appendChild(emailInput);

    const passwordDiv = document.createElement("div");
    passwordDiv.className = "login-form";

    const passwordLabel = document.createElement("label");
    passwordLabel.htmlFor = "password";
    passwordLabel.className = "form-label";
    passwordLabel.textContent = "Mot de passe";

    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.name = "password";
    passwordInput.className = "form-input js-password";
    passwordInput.required = true;

    passwordDiv.appendChild(passwordLabel);
    passwordDiv.appendChild(passwordInput);

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.className = "btn-submit";
    submitButton.textContent = "Se connecter";

    const forgotPasswordLink = document.createElement("a");
    forgotPasswordLink.href = "#";
    forgotPasswordLink.className = "forgot-password";
    forgotPasswordLink.textContent = "Mot de passe oublié";

    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message js-error-message";
    errorMessage.style.display = "none";

    loginForm.appendChild(emailDiv);
    loginForm.appendChild(passwordDiv);
    loginForm.appendChild(submitButton);
    loginForm.appendChild(forgotPasswordLink);
    loginPage.appendChild(loginTitle);
    loginPage.appendChild(loginForm);
    loginPage.appendChild(errorMessage);

    main.appendChild(loginPage);

    attachLoginHandlers();
});

/*** Fonction qui attache les gestionnaires d'événements au formulaire de connexion.*/

function attachLoginHandlers() {
    const loginForm = document.querySelector(".login-form-container"); 
    const emailInput = document.querySelector(".js-email");
    const passwordInput = document.querySelector(".js-password");
    const errorMessage = document.querySelector(".js-error-message");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem("authToken", data.token);

                window.location.href = "index.html";
            } else {
                afficherMessageErreur("E-mail ou mot de passe incorrect.");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            afficherMessageErreur("Une erreur est survenue. Veuillez réessayer plus tard.");
        }
    });

/*** Affiche un message d'erreur personnalisé dans l'élément dédié.*/
    
    function afficherMessageErreur(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = "block";
    }
}