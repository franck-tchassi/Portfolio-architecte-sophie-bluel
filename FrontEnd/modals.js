// ouvrir la modal suprimer lorsque l'on click sur le bouton modifier
const btnModifier = document.querySelector("#icone-modifier");
btnModifier.addEventListener("click", function(e){
    e.preventDefault();
    const modalOuvert = document.getElementById("deleteView").style.display="flex";
    (modalOuvert == "flex") ? document.querySelector("body").style.backgroundColor="#0000004D" : "" ;
    openScrool();
})
// ouvrir la modal ajouter element lorsque l'on click sur le bouton du modal supprimer
const btnModal1 = document.querySelector("#add-picture");
btnModal1.addEventListener("click", function(e){
    e.preventDefault();
    const modalOpen = document.getElementById("addView").style.display="flex";
    (modalOpen == "flex") ? document.querySelector("body").style.backgroundColor="#0000004D" : "" ;
    (modalOpen == "flex") ? document.getElementById("deleteView").style.display="none" : "" ;
})
// clicker pour faire une marche en arrière sur la modal supprimer
const btnModal2 = document.querySelector(".return-view");
btnModal2.addEventListener("click", function(e){
    e.preventDefault();
    const modalReturn = document.getElementById("deleteView").style.display="flex";
   // (modalOpen == "flex") ? document.querySelector("body").style.backgroundColor="#0000004D" : "" ;
    (modalReturn == "flex") ? document.getElementById("addView").style.display="none" : "" ;
})
// Sélectionnez le bouton de fermeture de la modal supprimer
const deleteCloseButton = document.querySelector(".close-view1");
deleteCloseButton.addEventListener("click", function(e) {
    e.preventDefault();
    // fermer la modal supprimer
    document.getElementById("deleteView").style.display = "none";
    // Réinitialisez les styles du corps
    document.body.style.backgroundColor = "initial";
});

// Sélectionnez le bouton de fermeture de la modal ajouter
const addCloseButton = document.querySelector(".close-view2");
addCloseButton.addEventListener("click", function(e) {
    e.preventDefault();
    // fermer la modal ajouter
    document.getElementById("addView").style.display = "none";
    // Réinitialisez les styles du corps
    document.body.style.backgroundColor = "initial";
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


        //ajout un click sur l'élement pour le supprimer
        buttonIcone.addEventListener("click", async () => { 
            const travailTrouve = works.find(travail => travail.id === travail_id);
            const authToken = localStorage.getItem("authToken")
            if (travailTrouve) {
                try {
                    // Envoyer une requête DELETE à l'API avec l'ID du travail à supprimer
                    await fetch(`http://localhost:5678/api/works/${travail_id}`, {
                        method: "DELETE",
                        headers:{
                            Authorization:`Bearer ${authToken}`,
                            'Accept': 'application/json'
                        }
                    });
                    // Actualiser la galerie après la suppression
                   afficherTravauxDansGalerie();
                    console.log("travail supprimer:", travailTrouve)
                } catch (err) {
                    console.log("Erreur lors de la suppression du travail :", err);
                }
            } 
            else {
                console.log("Travail non trouvé dans la liste.");
            }
        });
       
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
