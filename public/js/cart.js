// Afficher le nombre de produits du panier dans le header
const cart = new Cart();
cart.displayNumberOfProductsInHeader();

// Afficher le contenu du panier
cart.displayCart();


// Annuler et vider le panier
const cancelBtn = document.querySelector(".cart--btn__cancel");
cancelBtn.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('cart');
    document.location.href = "/"
})


// Passer la commande
const purchaseBtn = document.querySelector(".cart--btn__purchase");
purchaseBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const order = new Order();
    order.purchase();
})