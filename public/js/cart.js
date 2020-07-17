/**
 * Afficher le nombre de produits du panier dans le header
 */
const cart = new Cart();
cart.displayNumberOfProductsInHeader();

/**
 * Afficher le contenu du panier sous forme de tableau
 */
cart.displayCart();

/**
 * Gestion du clic sur le bouton ANNULER
 * => vider le panier, et retour sur home
 */
const cancelBtn = document.querySelector(".cart--btn__cancel");
cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cart.deleteAll();
    document.location.href = "/";
})

/**
 * Gestion du clic sur le bouton COMMANDER
 * => Passer la commande
 */
const purchaseBtn = document.querySelector(".cart--btn__purchase");
purchaseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const contact = {
        "firstName": document.getElementById('firstname').value,
        "lastName": document.getElementById('lastname').value,
        "address": document.getElementById('address').value,
        "city": document.getElementById('city').value,
        "email": document.getElementById('email').value
    };
    const products = JSON.parse(document.getElementById('products').value);
    const validation = new Validation();
    try {
        validation.checkOrder(contact);
        // Si validation contact ok : on envoie au backend, puis on va à la page de confirmation
        const request = new Request();
        request.purchase("/api/cameras/order", contact, products)
            .then(response => {
                sessionStorage.setItem('order', JSON.stringify(response));
                document.location.href = "/confirmation.html"
            })
            .catch(error => {
                const build = new BuildHtml();
                const errorDiv = build.errorMessage("Désolé, une erreur s'est produite... Veuillez réessayer plus tard.");
                const targetDiv = document.getElementById('cart');
                targetDiv.textContent = "";
                targetDiv.appendChild(errorDiv);
            })
    } catch (error) {
        // Si la validation n'est pas bonne (= pb de saisie de l'utilisateur), on affiche l'erreur à l'utilisateur
        window.alert(error);
    }
})