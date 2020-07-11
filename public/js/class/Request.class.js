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
    
}