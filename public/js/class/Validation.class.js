/**
 * Classe Validation
 * Vérification des données entrées par l'utilisateur
 */
class Validation {
    /**
     * Permet de vérifier les coordonnées rentrées par l'utilisateur lors de la finalisation de la commande
     * @param {Object} contact Coordonnées rentrées par l'utilisateur
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
        let email = contact.email.toLowerCase();
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(email)) {
            throw "L'adresse e-mail est incorrecte";
        }
    }
}