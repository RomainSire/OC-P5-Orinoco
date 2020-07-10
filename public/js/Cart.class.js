/**
 * Classe Cart
 * Permet de gérer le panier
 */
class Cart {
    /**
     * Ajouter un produit au panier
     * @param {String} id Id du produit à ajouter
     * @param {String} lenseId Id de l'option du produit à ajouter
     * @param {String} quantity Quantité du produit à ajouter
     */
    add(id, lenseId, quantity) {
        const newItem = {
            id: id,
            lenseId: parseInt(lenseId),
            quantity: parseInt(quantity)
        }
        
        let oldCart = JSON.parse(localStorage.getItem('cart'));

        if (!oldCart) {
            // SI le panier était vide
            let itemsList = [];
            itemsList.push(newItem);
            localStorage.setItem('cart', JSON.stringify(itemsList));

        } else {
            // SI il y a déjà qqch dans le panier
            let filteredCart = oldCart.filter(item => item.id === newItem.id && item.lenseId === newItem.lenseId);

            if (filteredCart.length === 0) {
                // SI on a ajouté un NOUVEL article = on ajoute l'article à la liste
                oldCart.push(newItem);
                localStorage.setItem('cart', JSON.stringify(oldCart));

            } else {
                // SI on a ajouté un article déjà existant dans le panier = on incrémente la quantité
                oldCart.map(item => {
                    if (item === filteredCart[0]) {
                        item.quantity += newItem.quantity;  
                    }
                })
                localStorage.setItem('cart', JSON.stringify(oldCart));
            }
        }
        // Mise à jour du header de la page
        this.displayNumberOfProductsInHeader()
    }

    /**
     * Afficher le nombre de produits du panier dans le header de la page
     */
    displayNumberOfProductsInHeader () {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let targetDiv = document.querySelector(".header--cart--counter");
        if (cart) {
            // Si le panier n'est pas vide
            let count = cart.reduce((sum, item) => sum += item.quantity, 0);
            targetDiv.classList.remove("hidden");
            targetDiv.textContent = count;
        } else {
            // Si le panier est vide
            targetDiv.classList.add("hidden");
        }
    }

    displayCart() {
        let productsInCart = JSON.parse(localStorage.getItem('cart'));
        if (productsInCart) {
            // Si le panier n'est pas vide
            let productsToDisplay = [];
            const request = new Request();
            request.getJson("/api/cameras/")
                .then(camerasFromDatabase => {
                    for (const product of productsInCart) {
                        // Pour chaque item dans le panier, on cherche la caméra correspondante dans la base de données
                        let matchingCamera = camerasFromDatabase.filter(camera => camera._id == product.id)[0];
                        // On ajoute les bonnes infos à afficher
                        productsToDisplay.push({
                            "id": product.id,
                            "name": matchingCamera.name,
                            "lenseName": matchingCamera.lenses[product.lenseId],
                            "quantity": product.quantity,
                            "price": matchingCamera.price
                        })
                    }
                    const build = new BuildHtml();
                    build.cart(productsToDisplay);

                })
            document.querySelector(".cart--btn__purchase").disabled = false;

        } else {
            // Si le panier est vide
            document.getElementById("cartTable").innerHTML = '<p class="cart--empty-cart">Votre panier est vide !</p>';
            document.querySelector(".cart--btn__purchase").disabled = true;
        }
    }
}