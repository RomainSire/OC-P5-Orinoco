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
                    // Afficher le produit
                    let targetDiv = document.getElementById('product');
                    const build = new BuildHtml();
                    build.productDescription(camera, targetDiv);
                    // Changer titre, description & meta sociaux de la page :
                    build.changeHeadMetas(
                        camera.name + " - Le meilleur de la photo vintage : Oricam",
                        "Découvrez l'appareil photo vintage " + camera.name + ", spécialement pensé pour les passionnés des négatifs argentiques et de la chambre noire.",
                        url_string,
                        camera.imageUrl
                        )
                })
        } else {
            // Produit inexistant        
            let targetDiv = document.getElementById('product');
            const build = new BuildHtml();
            const errorDiv = build.errorMessage("Désolé, ce produit est introuvable...")
            targetDiv.appendChild(errorDiv);
        }
        
        
    })
