// ouvrir la modal suprimer lorsque l'on click sur le bouton modifier
const btnModifier = document.querySelector("#modal-modifier");

btnModifier.addEventListener("click", function(e){
    e.preventDefault();

    const modalOuvert = document.querySelector(".supprime-photo").style.display="flex";
    (modalOuvert == "flex") ? document.querySelector("body").style.backgroundColor="#0000004D" : "" ;
    openScrool();
    afficheElement();
   
})

 
//fermer la modal suprimer  et le modal ajouter lorsque l'on click sur l'icone croix
const icon1Fermer = document.querySelector(".fa-xmark")
icon1Fermer.addEventListener("click", function(e){
    e.preventDefault();
    const modalFermer = document.querySelector(".supprime-photo").style.display="none";
    (modalFermer == "none") ? document.querySelector("body").style.backgroundColor="white" : "" ;
})

const icon2Fermer = document.querySelector(".icone .fa-xmark")
icon2Fermer.addEventListener("click", function(e){
    e.preventDefault();
    
    document.querySelector(".ajouter-photo").style.display="none";
})

//bouton lorsque je click la modal pour ajouter les photos s'ouvre
const btn_Addpicture = document.getElementById("add-picture");
btn_Addpicture.addEventListener("click", function(e){
    e.preventDefault();

    document.querySelector(".supprime-photo").style.display="none";
    document.querySelector(".ajouter-photo").style.display="flex";
})

//lorsque je click sur la flèche de la modal ajouter elle revien en arrière
const modalPrecedente = document.querySelector(" .icone .fa-arrow-left");
modalPrecedente.addEventListener("click", function(e){
    e.preventDefault();

    document.querySelector(".supprime-photo").style.display="flex";
    document.querySelector(".ajouter-photo").style.display="none";
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