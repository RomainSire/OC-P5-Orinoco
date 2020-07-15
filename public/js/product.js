/**
 * Afficher le nombre de produits du panier dans le header
 */
const cart = new Cart();
cart.displayNumberOfProductsInHeader();

/**
 * Récupération dans l'url de l'id du produit à afficher
 */
const url_string = window.location.href;
const url = new URL(url_string);
const id = url.searchParams.get("id");

/**
 * Récupération et affichage du produit demandé
 */
const request = new Request();
request.getJson("/api/cameras/" + id)
    .then(camera => {
        /**
         * Si l'ID du produit demandé n'existe pas dans la BDD, une erreur est lancée
         */
        if (Object.keys(camera).length === 0 && camera.constructor === Object) {
            throw "Le produit demandé est introuvable";
        }
        /**
         * Si le produit existe dans la BDD :
         */
        // Afficher le produit
        const targetDiv = document.getElementById('product');
        const build = new BuildHtml();
        build.productDescription(camera, targetDiv);
        // Changer titre, description & meta sociaux de la page :
        build.changeHeadMetas(
            camera.name + " - Le meilleur de la photo vintage : Oricam",
            "Découvrez l'appareil photo vintage " + camera.name + ", spécialement pensé pour les passionnés des négatifs argentiques et de la chambre noire.",
            url_string,
            camera.imageUrl
            );
        // Gestion de l'évènement : Ajout du produit au panier
        const addToCartButton = document.querySelector(".btn-cart");
        addToCartButton.addEventListener('click', (event) => cart.add(event));
    })
    .catch((error) => {
        const targetDiv = document.getElementById('product');
        const build = new BuildHtml();
        const errorDiv = build.errorMessage(error)
        targetDiv.appendChild(errorDiv);
    })