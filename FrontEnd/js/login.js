// URL de l'API pour l'authentification
const loginApiUrl = "http://localhost:5678/api/auth/login";

// Gestion de la soumission du formulaire
const loginForm = document.querySelector("#login-form");
const errorMessage = document.querySelector("#error-message");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
        const response = await fetch(loginApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();

            // Stocker le token dans le localStorage
            localStorage.setItem("authToken", data.token);

            // Rediriger vers la page d'accueil
            window.location.href = "index.html";
        } else {
            // Afficher un message d'erreur
            errorMessage.textContent = "Erreur : Email ou mot de passe incorrect.";
            errorMessage.style.display = "block";
        }
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        errorMessage.textContent = "Erreur serveur. Veuillez réessayer plus tard.";
        errorMessage.style.display = "block";
    }
});