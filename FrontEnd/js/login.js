// Cibler les éléments avec des classes
const loginForm = document.querySelector(".login-form");
const emailInput = document.querySelector(".js-email");
const passwordInput = document.querySelector(".js-password");
const errorMessage = document.querySelector(".js-error-message");

// Ajouter un gestionnaire d’événement pour le formulaire
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les valeurs des champs
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        // Envoyer une requête POST à l’API d’authentification
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST", // Utilisation de la méthode POST
            headers: {
                "Content-Type": "application/json" // Envoi de données au format JSON
            },
            body: JSON.stringify({ email, password }), // Conversion des données en chaîne JSON
        });

        if (response.ok) {
            // Si connexion réussie, récupérer le token et rediriger
            const data = await response.json();
            localStorage.setItem("authToken", data.token); // Sauvegarder le token dans localStorage

            // Redirection vers la page d'accueil
            window.location.href = "index.html";
        } else {
            // Afficher un message d’erreur si la connexion échoue
            afficherMessageErreur("E-mail ou mot de passe incorrect.");
        }
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        afficherMessageErreur("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
});

// Fonction pour afficher les messages d’erreur
function afficherMessageErreur(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block"; // Afficher le message
}