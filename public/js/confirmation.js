/**
 * Test : est ce qu'il y a bien eu une commande
 */
if (sessionStorage.getItem('order') === null) {
    // si pas de commande : redirection vers l'accueil
    document.location.href = "/";
} else {
    /**
     * Récupération de la commande du sessionStorage
     */
    const order = JSON.parse(sessionStorage.getItem('order'));
    sessionStorage.removeItem('order');

    /**
     * vider le panier et réaffichage du header
     */
    const cart = new Cart();
    cart.deleteAll();
    cart.displayNumberOfProductsInHeader();

    /**
     * Affichage du récapitulatif de la commande
     */
    const title = document.getElementById("confirmation-title");
    title.textContent = "Merci pour votre commande, " + order.contact.firstName + " !";
    const totalPrice = order.products.reduce((sum, item) => sum += item.price, 0);
    const priceElt = document.getElementById("confirmation-price");
    priceElt.textContent = (totalPrice / 100) + "€";
    const orderIdElt = document.getElementById("confirmation-orderId");
    orderIdElt.textContent = order.orderId;
}



