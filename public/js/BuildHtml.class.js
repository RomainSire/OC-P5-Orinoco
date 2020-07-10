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

    /**
     * Génère le html de la page produit
     * @param {Object} camera       Objet contenant toutes les infos d'une caméra en particulier
     * @param {Element} targetDiv   Element cible dans lequel les infos du produit seront intégrées
     */
    productDescription(camera, targetDiv) {
        // Create image
        let image = document.createElement("img");
        image.classList.add("product--image");
        image.setAttribute("src", camera.imageUrl);
        image.setAttribute("alt", "Photo de : " + camera.name);
        // Create title, description, and price
        let title = document.createElement("h1");
        title.classList.add("product--title");
        title.textContent = camera.name;
        let description = document.createElement("p");
        description.classList.add("product--description");
        description.textContent = camera.description;
        let price = document.createElement("p");
        price.classList.add("product--price");
        price.textContent = (camera.price / 100) + " €";
        // Create form
            // Lense
        let lenseLabel = document.createElement("label");
        lenseLabel.setAttribute("for", "lense");
        lenseLabel.textContent = "Objectif";
        let lenseSelect = document.createElement("select");
        lenseSelect.setAttribute("name", "lense");
        lenseSelect.setAttribute("id", "lense");
        for (const i in camera.lenses) {
            let option = document.createElement("option");
            option.setAttribute("value", i);
            option.textContent = camera.lenses[i];
            lenseSelect.appendChild(option);
        }
        let lenseFieldset = document.createElement("fieldset");
        lenseFieldset.appendChild(lenseLabel);
        lenseFieldset.appendChild(lenseSelect);
            // Quantity
        let qttLabel = document.createElement("label");
        qttLabel.setAttribute("for", "quantity");
        qttLabel.textContent = "Quantité";
        let qttInput = document.createElement("input");
        qttInput.setAttribute("type", "number");
        qttInput.setAttribute("name", "quantity");
        qttInput.setAttribute("id", "quantity");
        qttInput.setAttribute("min", "1");
        qttInput.setAttribute("max", "10");
        qttInput.setAttribute("value", "1");
        let qttFieldset = document.createElement("fieldset");
        qttFieldset.appendChild(qttLabel);
        qttFieldset.appendChild(qttInput);
            // Hidden input for id
        let idInput = document.createElement("input");
        idInput.setAttribute("type", "hidden");
        idInput.setAttribute("name", "id");
        idInput.setAttribute("id", "id");
        idInput.setAttribute("value", camera._id);
            // Buttons
        let cartButton = document.createElement("button");
        cartButton.classList.add("btn");
        cartButton.classList.add("btn-cart");
        cartButton.setAttribute("type", "submit");
        cartButton.textContent = "Ajouter au panier";
        let homeButton = document.createElement("a");
        homeButton.classList.add("btn");
        homeButton.classList.add("btn-back");
        homeButton.setAttribute("href", "/");
        homeButton.textContent = "Retour à l'accueil";
        let divButtons = document.createElement("div");
        divButtons.classList.add("product--form--buttons");
        divButtons.appendChild(cartButton);
        divButtons.appendChild(homeButton);
            // Form
        let form = document.createElement("form");
        form.classList.add("product--form");
        form.appendChild(lenseFieldset);
        form.appendChild(qttFieldset);
        form.appendChild(idInput);
        form.appendChild(divButtons);
        // Create div Container
        let container = document.createElement("div");
        container.classList.add("container");
        container.appendChild(title);
        container.appendChild(description);
        container.appendChild(price);
        container.appendChild(form);
        // Put everything in target Div
        targetDiv.appendChild(image);
        targetDiv.appendChild(container);
    }

    /**
     * Permet de changer le titre, la description et les metas de réseaux sociaux de la balise head d'une page
     * @param {String} title Nouveau titre de la page
     * @param {String} description Nouvelle description de la page
     * @param {String} socialUrl URL de la page pour les réseaux sociaux
     * @param {String} socialImage URL de l'image d'illustration pour les réseaux sociaux
     */
    changeHeadMetas(title, description, socialUrl, socialImage) {
        document.title = title;
        document.querySelector('meta[name="description"]').setAttribute("content", description);
        document.querySelector('meta[name="twitter:card"]').setAttribute("content", description);
        document.querySelector('meta[property="og:title"]').setAttribute("content", title);
        document.querySelector('meta[property="og:url"]').setAttribute("content", socialUrl);
        document.querySelector('meta[property="og:image"]').setAttribute("content", socialImage);
        document.querySelector('meta[property="og:description"]').setAttribute("content", description);
    }

    /**
     * Crée le tableau de produits présents dans le panier
     * Doit ensuite être intégré dans la page panier
     * @param {Array} products Tableau d'objets chacun représentant un produit à afficher {id, name, lenseName, quantity, price}
     */
    cart(products) {
        let totalPrice = 0;
        let listOfIds = [];
        for (const product of products) {
            // Id
            listOfIds.push(product.id)
            // name
            let nameCell = document.createElement('td');
            nameCell.textContent = product.name;
            // lense
            let lenseCell = document.createElement('td');
            lenseCell.textContent = product.lenseName;
            // Quantity
            let quantityCell = document.createElement('td');
            quantityCell.textContent = product.quantity;
            // Price
            let priceOfLine = (product.price * product.quantity) / 100;
            let priceCell = document.createElement('td');
            priceCell.textContent = priceOfLine + " €";
            totalPrice += priceOfLine;
            // ligne html et intégration dans le document
            let tr = document.createElement('tr');
            tr.appendChild(nameCell);
            tr.appendChild(lenseCell);
            tr.appendChild(quantityCell);
            tr.appendChild(priceCell);
            let tbody = document.getElementById("cartTableBody");
            tbody.appendChild(tr);
        }
        // Ajout du prix total
        let totalPriceCell = document.getElementById("cartTableTotalPrice");
        totalPriceCell.textContent = totalPrice + " €";
        // Ajout de la liste des ID au formulaire
        let listOfIdsCell = document.getElementById("products");
        listOfIdsCell.value = JSON.stringify(listOfIds);
    }
}