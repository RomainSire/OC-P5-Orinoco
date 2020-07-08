// Récupération de l'url :
const url_string = window.location.href;
const url = new URL(url_string);
const id = url.searchParams.get("id");


if (/^([a-z]|[0-9]){24}$/m.test(id)) {
    // Produit existe (= id correspond à ce qui est attendu)
    console.log("Id du produit : " + id);
} else {
    // Produit inexistant
    console.log("404 : Article introuvable"); 
}




// TODO:
// Penser à changer le titre de la page & description + social
