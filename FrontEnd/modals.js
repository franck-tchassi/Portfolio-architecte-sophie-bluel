// ouvrir la modal suprimer lorsque l'on click sur le bouton modifier
const btnModifier = document.querySelector("#icone-modifier");
btnModifier.addEventListener("click", function(e){
    e.preventDefault();
    const modalOuvert = document.getElementById("deleteView").style.display="flex";
    (modalOuvert == "flex") ? document.querySelector("body").style.backgroundColor="#0000004D" : "" ;
    openScrool();
})

// Sélectionnez le bouton de fermeture de la modal
const closeButton = document.querySelector(".close-view");
// Ajoutez un écouteur d'événements au bouton de fermeture
closeButton.addEventListener("click", function(e) {
    e.preventDefault();
    // Supprimez la classe "flex" de l'élément deleteView
    document.querySelector(".closing").style.display="none";
    // Réinitialisez les styles du corps
    document.body.style.backgroundColor = "initial";
    // Exécutez d'autres actions nécessaires
});

// Fonction pour afficher les travaux dans la galerie de photos à supprimer
async function afficherTravauxDansGalerie() {
    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();

    const modalGallery = document.querySelector(".modal-gallery");
    modalGallery.innerHTML = ""; // Effacer le contenu actuel de la galerie

    works.forEach(travail => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = travail.imageUrl;

        const figcaption = document.createElement("figcaption");
        figcaption.innerText = travail.title;

        const buttonIcone = document.createElement("button");
        buttonIcone.classList.add("supprimer-work")
        const iconeElement = document.createElement("i");
        iconeElement.classList.add("fa-solid", "fa-trash-can");
        
        //recuperer les id du works
        const travail_id =  travail.id ;
        //stocker les id des elements
        figure.setAttribute("data-travail-id", travail_id)


        buttonIcone.appendChild(iconeElement )
        figure.appendChild(buttonIcone);
        figure.appendChild(image);
        figure.appendChild(figcaption);
        modalGallery.appendChild(figure);
       
    });
   
}
// Appel de la fonction pour afficher les travaux dans la galerie
afficherTravauxDansGalerie();



function openScrool(){
    const scroll = document.querySelector(".supprime-photo .gallery-supprimer");
    // Récupérer la hauteur de l'élément scroll en tant que nombre entier
    const hauteur = parseInt(window.getComputedStyle(scroll).height);

    // Vérifier si la hauteur est supérieure à 385px
    if (hauteur > 385) {
        // Si la hauteur est supérieure à 385px, ajouter la propriété overflow: scroll
        document.querySelector(".supprime-photo").style.overflow = "scroll";
    }
}


//ajouter les photos de mon backend au modal supprimer-photo

function createElement(works){

    const  parentElement = document.querySelector(".supprime-photo .gallery-supprimer");


    for(let i=0; i< works.length ; i++){

        const figureElement = document.createElement("figure")
        const buttonElement = document.createElement("button")
        const iconElement = document.createElement("i");

        const imageElement = document.createElement("img");
        imageElement.src =  works[i].imageUrl;

        
        parentElement.appendChild(figureElement);
        figureElement.appendChild(buttonElement);
        figureElement.appendChild(imageElement);
        iconElement.classList.add("fa-regular", "fa-trash-can");
        buttonElement.appendChild(iconElement);
    
    }

}
// function affiche element créer

async function afficheElement(){
    try{
        const reponse = await fetch("http://localhost:5678/api/works");
        const works = await reponse.json();

        createElement(works);
    }catch(err){
        console.log("problemme de connexion  au donnée works", err)
    }
}
