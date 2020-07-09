// Récupération de l'url :
const url_string = window.location.href;
const url = new URL(url_string);
const id = url.searchParams.get("id");

// Récupération de la liste des Id existantes
const request = new Request();
request.getJson("/api/cameras/")
    .then (cameras => {
        let ids = [];
        for (const camera of cameras) {
            ids.push(camera._id);
        }
        // Test si l'id existe dans la BDD
        if (ids.includes(id)) {
            // Produit existe
            request.getJson("/api/cameras/" + id)
                .then(camera => {
                    let targetDiv = document.getElementById('product');
                    const build = new BuildHtml();
                    build.productDescription(camera, targetDiv);
                })
        } else {
            // Produit inexistant        
            let targetDiv = document.getElementById('product');
            const build = new BuildHtml();
            const errorDiv = build.errorMessage("Désolé, ce produit est introuvable...")
            targetDiv.appendChild(errorDiv);
        }
        
        
    })







// TODO:
// Penser à changer le titre de la page & description + social
