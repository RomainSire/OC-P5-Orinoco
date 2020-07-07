// get infos of all the cameras & display it
fetch("http://localhost:3000/api/cameras")
    .then(response => response.json())
    .then(cameras => {
        let targetDiv = document.querySelector("#products-list > div");
        for (const camera of cameras) {
            // card's text
            let div = document.createElement("div");
            div.classList.add("products-list--content");
            let h3 = document.createElement("h3");
            h3.textContent = camera.name;
            let p1 = document.createElement("p");
            p1.classList.add("products-list--price");
            p1.textContent = (camera.price / 100) + " €";
            let p2 = document.createElement("p");
            p2.classList.add("products-list--link");
            p2.textContent = "Voir le produit";
            // card's image
            let img = document.createElement("img");
            img.classList.add("products-list--image");
            img.setAttribute("src", camera.imageUrl);
            img.setAttribute("alt", "Photo de : " + camera.name);
            // card
            let a = document.createElement("a");
            a.classList.add("products-list--card");
            a.setAttribute("href", "#")
            // combine the elements and add it to the page
            div.appendChild(h3);
            div.appendChild(p1);
            div.appendChild(p2);
            a.appendChild(img);
            a.appendChild(div);
            targetDiv.appendChild(a);
        }
    })
    .catch(error => console.log("Erreur : " + error));
