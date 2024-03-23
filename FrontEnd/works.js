// Fonction pour afficher les catégories
function afficheCategories(categories){
    // Sélectionner l'élément parent
    const filtersSelector = document.querySelector(".les-filters");

    // Boucle for pour créer et ajouter les boutons
    for(let i = 0; i < categories.length; i++) {
        // Créer un bouton pour chaque catégorie
        const bouton = document.createElement("button");
        bouton.classList.add("filter");
        bouton.id = `filter-${i + 2}`; // Utiliser un ID unique pour chaque bouton
        bouton.innerText = categories[i].name;

        //ajout évernement pour filtrer bouton
        bouton.addEventListener("click", function(){
            filtrerEtAfficherWorks(categories[i].name);
        })

        // Ajouter le bouton à l'élément parent
        filtersSelector.appendChild(bouton);
    }
}

// Fonction pour récupérer et afficher toutes les catégories par défaut
async function afficheTousCategories() {
    try {
        // Lancer une requête sur le backend pour obtenir toutes les catégories
        const reponse = await fetch("http://localhost:5678/api/categories");
        const categories = await reponse.json();
        

        // Appeler la fonction pour afficher les catégories
        afficheCategories(categories);
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des catégories :", error);
    }
}

//  récupérer et afficher toutes les catégories par défaut
afficheTousCategories();










// Fonction pour afficher les travaux
function afficheWorks(works) {
    const parentSelector = document.querySelector('.gallery');
    parentSelector.innerHTML = ""; // Efface le contenu actuel de la galerie

    for (let i = 0; i < works.length; i++) {
        
        const workElement = document.createElement("figure");
        
        const imageElement = document.createElement("img");
        imageElement.src = works[i].imageUrl;

        const titleElement = document.createElement("figcaption");
        titleElement.innerText = works[i].title;

        parentSelector.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(titleElement);
    }
}

// Fonction pour filtrer les travaux par catégorie et les afficher
async function filtrerEtAfficherWorks(categorie) {
    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();
    const worksFiltres = works.filter(work => work.category.name === categorie);
    afficheWorks(worksFiltres);
}

 //Lancer une requête sur le backend pour obtenir tous les travaux
async function afficherTousLesTravaux() {
    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();
    afficheWorks(works);
}

// Afficher tous les travaux par défaut
afficherTousLesTravaux();

// Filtrer et afficher les travaux lorsque les boutons de filtrage sont cliqués
document.querySelector("#filter-1").addEventListener("click", afficherTousLesTravaux);
document.querySelector("#filter-2").addEventListener("click", () => filtrerEtAfficherWorks("Objets"));
document.querySelector("#filter-3").addEventListener("click", () => filtrerEtAfficherWorks("Appartements"));
document.querySelector("#filter-4").addEventListener("click", () => filtrerEtAfficherWorks("Hotels & restaurants"));


