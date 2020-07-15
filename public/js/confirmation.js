// Récupération de la commande du sessionStorage, et nettoyage!
const order = JSON.parse(sessionStorage.getItem('order'));
sessionStorage.removeItem('order');

// vider le panier et réaffichage du header
localStorage.removeItem('cart');
const cart = new Cart();
cart.displayNumberOfProductsInHeader();

// Affichage dynamique sur la page
const title = document.getElementById("confirmation-title");
title.textContent = "Merci pour votre commande, " + order.contact.firstName + " !";
const totalPrice = order.products.reduce((sum, item) => sum += item.price, 0);
const priceElt = document.getElementById("confirmation-price");
priceElt.textContent = (totalPrice / 100) + "€";
const orderIdElt = document.getElementById("confirmation-orderId");
orderIdElt.textContent = order.orderId;


