/**
 * Afficher le nombre de produits du panier dans le header
 */
const cart = new Cart();
cart.displayNumberOfProductsInHeader();

/**
 * Affichage de touts les produits disponibles
 */
const targetDiv = document.querySelector("#products-list > div");
// Récupération des données
const request = new Request();
request.getJson("/api/cameras")
    .then(cameras => {
        cameras.map(camera => {
            const build = new BuildHtml();
            const card = build.homeCard(camera);
            targetDiv.appendChild(card);
        })
    })
    .catch(error => {
        // Ajout du message d'erreur sur la page :
        const build = new BuildHtml();
        const errorDiv = build.errorMessage("Un petit problème est survenu...");
        targetDiv.appendChild(errorDiv);
    });
