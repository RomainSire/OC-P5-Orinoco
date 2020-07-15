/**
 * Classe Validation
 * Vérification des données entrées par l'utilisateur
 */
class Validation {
    /**
     * Validation des coordonnées rentrées par l'utilisateur lors de la finalisation de la commande
     * @param {Object} contact Coordonnées rentrées par l'utilisateur
     * @throws  Lance une erreur si les coordonnées ne sont pas valides
     */
    checkOrder(contact) {
        if (!contact.firstName) {
            throw "Merci de renseigner un prénom";
        }
        if (!contact.lastName) {
            throw "Merci de renseigner un nom";
        }
        if (!contact.address) {
            throw "Merci de renseigner une adresse";
        }
        if (!contact.city) {
            throw "Merci de renseigner une ville";
        }
        const email = contact.email.toLowerCase();
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(email)) {
            throw "L'adresse e-mail est incorrecte";
        }
    }
    /**
     * Validation du formulaire lors de l'ajout d'un produit au panier
     * @param {String} lenseId L'id de l'objectif choisi (sous forme de string)
     * @param {String} quantity La quantité choisie (sous forme de string)
     * @throws Lance une erreur si les options du produit ne sont pas valides
     */
    checkOptions(lenseId, quantity) {
        const lenseRegex = /^[0-9]$/;
        if (!lenseRegex.test(lenseId)) {
            throw "Merci de sélectionner un objectif dans la liste";
        }
        const qttRegex = /^(?:[1-9]|0[1-9]|10)$/;
        if (!qttRegex.test(quantity)) {
            throw "Merci de choisir une quantité entre 1 et 10";
        }
    }
}