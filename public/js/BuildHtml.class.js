/**
 * Classe BuildHtml
 * Classe utilitaire qui permet de créer certains éléments ou ensemble d'éléments html qui pourront ensuite être intégré sur les différentes pages
 */
class BuildHtml {
    /**
     * Génère une carte html correspondant à une caméra
     * Doit être ensuite intégrée dans la page d'accueil
     * @param {Object} camera   Objet contenant toutes les infos d'une caméra en particulier
     * @return {Element}        "Carte" html avec les infos de la caméra mise en page
     */
    homeCard(camera) {
        // card's text
        let div = document.createElement("div");
        div.classList.add("products-list--content");
        let h3 = document.createElement("h3");
        h3.textContent = camera.name;
        let p1 = document.createElement("p");
        p1.classList.add("products-list--price");
        p1.textContent = (camera.price / 100) + " €";
        let p2 = document.createElement("p");
        p2.classList.add("products-list--link");
        p2.textContent = "Voir le produit";
        // card's image
        let img = document.createElement("img");
        img.classList.add("products-list--image");
        img.setAttribute("src", camera.imageUrl);
        img.setAttribute("alt", "Photo de : " + camera.name);
        // card
        let card = document.createElement("a");
        card.classList.add("products-list--card");
        card.setAttribute("href", "/product.html?id=" + camera._id)
        // combine the elements & return
        div.appendChild(h3);
        div.appendChild(p1);
        div.appendChild(p2);
        card.appendChild(img);
        card.appendChild(div);
        return card;
    }

    /**
     * Génère une div qui informe l'utilisateur qu'une erreur s'est produite.
     * Peut être intégrée sur n'importe quelle page.
     * @param {String} message  Message d'erreur à afficher
     * @returns {Element}       element div d'erreur
     */
    errorMessage(message = "Une erreur s'est produite") {
        // image
        let img = document.createElement("img");
        img.setAttribute("src", "./img/error.png");
        img.setAttribute("alt", "Illustration d'un petit panda triste qui fait tomber la glace de son cornet");
        // message
        let msg = document.createElement("p");
        msg.textContent = message;
        // div container
        let div = document.createElement("div");
        div.classList.add("error");
        // combine elements & return
        div.appendChild(img);
        div.appendChild(msg);
        return div;
    }
}