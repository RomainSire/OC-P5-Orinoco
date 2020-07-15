// Afficher le nombre de produits du panier dans le header
const cart = new Cart();
cart.displayNumberOfProductsInHeader();

// Afficher le contenu du panier
cart.displayCart();


// CLICK annuler => Annuler et vider le panier
const cancelBtn = document.querySelector(".cart--btn__cancel");
cancelBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    localStorage.removeItem('cart');
    document.location.href = "/";
})


// CLICK commander => Passer la commande
const purchaseBtn = document.querySelector(".cart--btn__purchase");
purchaseBtn.addEventListener('click', function(e) {
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

        // Si validation contact ok : on envoie au backend
        const request = new Request();
        request.purchase("/api/cameras/order", contact, products)
            .then(response => {
                console.log(response);
                sessionStorage.setItem('order', JSON.stringify(response));
                document.location.href = "/confirmation.html"
            })

    } catch (error) {
        window.alert(error);
    }
    

    


})