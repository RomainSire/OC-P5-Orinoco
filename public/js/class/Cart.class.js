/**
 * Classe Cart
 * Permet de gérer le panier
 */
class Cart {
    /**
     * Ajoute un produit au panier
     * @param {Object} event Evènement déclenché lorsque le bouton d'ajout au panier est cliqué
     */
    add(event) {
        event.preventDefault();
        const newItem = {
            id: document.getElementById("id").value,
            lenseId: parseInt(document.getElementById("lense").value),
            quantity: parseInt(document.getElementById("quantity").value)
        }
        /**
         * Validation des infos entrées par l'utilisateur
         */
        try {
            const validation = new Validation();
            validation.checkOptions(newItem.lenseId, newItem.quantity);
        } catch (error) {
            alert(error);
            return;
        }
        /**
         * Ajout du produit : plusieurs cas possible
         */
        let oldCart = JSON.parse(localStorage.getItem('cart'));
        if (!oldCart) {
            // SI le panier était vide
            let itemsList = [];
            itemsList.push(newItem);
            localStorage.setItem('cart', JSON.stringify(itemsList));
        } else {
            // SI il y a déjà qqch dans le panier
            const filteredCart = oldCart.filter(item => item.id === newItem.id && item.lenseId === newItem.lenseId);
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
    displayNumberOfProductsInHeader() {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const targetDiv = document.querySelector(".header--cart--counter");
        if (cart) {
            // Si le panier n'est pas vide
            const count = cart.reduce((sum, item) => sum += item.quantity, 0);
            targetDiv.classList.remove("hidden");
            targetDiv.textContent = count;
        } else {
            // Si le panier est vide
            targetDiv.classList.add("hidden");
        }
    }

    /**
     * Affiche tous les produits du panier sur la page de finalisation de la commande
     */
    displayCart() {
        const productsInCart = JSON.parse(localStorage.getItem('cart'));
        if (productsInCart) {
            // Si le panier n'est pas vide
            let productsToDisplay = [];
            const request = new Request();
            request.getJson("/api/cameras/")
                .then(camerasFromDatabase => {
                    productsInCart.map(product => {
                        // Pour chaque item dans le panier, on cherche la caméra correspondante dans la base de données
                        const matchingCamera = camerasFromDatabase.filter(camera => camera._id == product.id)[0];
                        // On ajoute les bonnes infos à afficher
                        productsToDisplay.push({
                            "id": product.id,
                            "name": matchingCamera.name,
                            "lenseId": product.lenseId,
                            "lenseName": matchingCamera.lenses[product.lenseId],
                            "quantity": product.quantity,
                            "price": matchingCamera.price
                        })
                    })
                    // Construction du tableau html
                    const build = new BuildHtml();
                    build.cart(productsToDisplay);
                    // Ajout de l'event listener pour la suppression de 1 produit
                    const deleteBtns = document.querySelectorAll("#cartTableBody td:last-child");
                    for (const deleteBtn of deleteBtns) {
                        deleteBtn.addEventListener('click', function() {
                            const cart = new Cart();
                            cart.delete1Item(this);
                        });
                    }
                    // Ajout de la liste des id qui sera envoyée pour la commande
                    let idList = []
                    productsToDisplay.map(product => {
                        for (let i = 0; i < product.quantity; i++) {
                            idList.push(product.id) 
                        }
                    })
                    build.addProductListToForm(idList);
                })
                .catch(error => {
                    const build = new BuildHtml();
                    const errorDiv = build.errorMessage();
                    const targetDiv = document.getElementById('cartTable');
                    targetDiv.innerText = "";
                    targetDiv.appendChild(errorDiv);
                })
            document.querySelector(".cart--btn__purchase").disabled = false;

        } else {
            // Si le panier est vide
            document.getElementById("cartTable").innerHTML = '<p class="cart--empty-cart">Votre panier est vide !</p>';
            document.querySelector(".cart--btn__purchase").disabled = true;
        }
    }
    /**
     * Supprimer 1 article du panier
     * @param {Element} deleteBtn Element <td> de suppression d'1 article
     */
    delete1Item(deleteBtn) {
        // Récupération des infos :
        const tr = deleteBtn.parentElement;
        const idToDelete = tr.dataset.id;
        const lenseIdToDelete = tr.dataset.lenseId;
        const productsInCart = JSON.parse(localStorage.getItem('cart'));

        // supression dans le panier
        const newProductsInCart = productsInCart.filter(product => (product.id != idToDelete) || (product.lenseId != lenseIdToDelete));
        if (newProductsInCart.length === 0) {
            // Si panier vide
            localStorage.removeItem('cart');
            // document.location.href = "/"
        } else {
            localStorage.setItem('cart', JSON.stringify(newProductsInCart));
        }

        // Affichage de la page
        this.displayCart();
        this.displayNumberOfProductsInHeader();
        
    }
    /**
     * Supprimer tous les articles du panier
     */
    deleteAll() {
        localStorage.removeItem('cart');
    }

}