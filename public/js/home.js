// Récupération des données
const request = new Request();
request.getJson("/api/cameras")
    .then(cameras => {
        let targetDiv = document.querySelector("#products-list > div");
        // Pour chaque caméra récupérée, on crée une carte html, et on l'ajoute à la div cible :
        for (const camera of cameras) {
            const build = new BuildHtml();
            const card = build.homeCard(camera);
            targetDiv.appendChild(card);
        }
    })
    .catch(error => {
        console.error("Erreur : " + error);
        // Ajout du message d'erreur sur la page :
        const build = new BuildHtml();
        const errorDiv = build.errorMessage("Un petit problème est survenu...");
        let targetDiv = document.querySelector("#products-list > div");
        targetDiv.appendChild(errorDiv);
    });


// Afficher le nombre de produits du panier dans le header
const cart = new Cart();
cart.displayNumberOfProductsInHeader();
