// ouvrir la modal suprimer lorsque l'on click sur le bouton modifier
const btnModifier = document.querySelector("#icone-modifier");
btnModifier.addEventListener("click", function(e){
    e.preventDefault();
    const modalOuvert = document.getElementById("deleteView").style.display="flex";
    (modalOuvert == "flex") ? document.querySelector("body").style.backgroundColor="#0000004D" : "" ;
    openScrool();
})



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
