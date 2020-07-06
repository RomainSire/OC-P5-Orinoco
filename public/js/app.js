// // Méthode XMLHttpRequest
// var req = new XMLHttpRequest();
// req.onreadystatechange = function() {
//     if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//         var response = JSON.parse(this.responseText);
//         console.log(response);
//     }
// };
// req.open("GET", "http://localhost:3000/api/cameras");
// req.send();


// Méthode fetch
fetch("http://localhost:3000/api/cameras")
    .then(response => response.json())
    .then(response => console.log((response)))
    .catch(error => console.log("Erreur : " + error));

    