/**
 * Classe Request
 * Permet de recevoir et d'envoyer des données avec le backend
 */
class Request {
    /**
     * Passe une requête GET au serveur
     * @param {String} url  L'url de la requête
     * @return {Promise}    Réponse du serveur sous forme de promesse
     */
    getJson(url) {
        return fetch(url).then(response => response.json())
    }

    /**
     * Passe une commande en POST au serveur
     * @param {Object} contact Coordonnées du client
     * @param {Array} products Liste des id des produits achetés
     */
    purchase(url, contact, products) {
        let data = {
            "contact": contact,
            "products": products
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return fetch(url, options)
            .then(response => response.json())
    }

    
}