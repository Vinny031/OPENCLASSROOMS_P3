document.addEventListener("DOMContentLoaded", () => {

    const main = document.getElementById("login-html");
    main.innerHTML = `
        <div class="login-page">
            <h2 class="login-title">Log In</h2>
            <form class="login-form">
                <label for="email" class="form-label">E-mail</label>
                <input type="email" name="email" class="form-input js-email" required>
                <label for="password" class="form-label">Mot de passe</label>
                <input type="password" name="password" class="form-input js-password" required>
                <button type="submit" class="btn-submit">Se connecter</button>
                <a href="#" class="forgot-password">Mot de passe oublié</a>
            </form>
            <div class="error-message js-error-message" style="display: none;"></div>
        </div>
    `;

    attachLoginHandlers();
});

// Fonction pour attacher les gestionnaires d’événements

function attachLoginHandlers() {
    const loginForm = document.querySelector(".login-form");
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
                localStorage.setItem("authToken", data.token);
                window.location.href = "index.html";
            } else {
                afficherMessageErreur("E-mail ou mot de passe incorrect.");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            afficherMessageErreur("Une erreur est survenue. Veuillez réessayer plus tard.");
        }
    });

    function afficherMessageErreur(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = "block";
    }
}