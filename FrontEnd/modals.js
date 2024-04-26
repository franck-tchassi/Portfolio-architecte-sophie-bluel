// ouvrir la modal suprimer lorsque l'on click sur le bouton modifier
const btnModifier = document.querySelector("#icone-modifier");
btnModifier.addEventListener("click", function(e){
    e.preventDefault();
    const modalOuvert = document.getElementById("deleteView").style.display="flex";
    (modalOuvert == "flex") ? document.querySelector("body").style.backgroundColor="#0000004D" : "" ;
    
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

    //Réinitialisation de l'affichage de l'image et suppression de l'URL de l'image du localStorage lorsque on click sur le bouton revenir en arrière
    document.getElementById("uploaded-image").style.display = "none";
    document.querySelector(".custom-file-upload").style.display = "flex";
    document.querySelector(".custom p").style.display = "flex";
    document.getElementById("icone-svg").style.display = "flex";
    localStorage.removeItem("imageURL");
    
    //vider le title et option lorsque l'on quitte la modal ajouter
    titleInput.value = "";
    localStorage.removeItem("titleSaisir")
    contenuOption.value = "";
    localStorage.removeItem("option")
    //désactiver le bouton de validation
    validerButton.style.backgroundColor = "";
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

    //Réinitialisation de l'affichage de l'image et suppression de l'URL de l'image du localStorage lorsque on click sur le bouton de fermeture 
    document.getElementById("uploaded-image").style.display = "none";
    document.querySelector(".custom-file-upload").style.display = "flex";
    document.querySelector(".custom p").style.display = "flex";
    document.getElementById("icone-svg").style.display = "flex";
    localStorage.removeItem("imageURL")

    //vider le title et option lorsque l'on quitte la modal ajouter
    titleInput.value = "";
    localStorage.removeItem("titleSaisir")
    contenuOption.value = "";
    localStorage.removeItem("option")
    //désactiver le bouton de validation
    validerButton.style.backgroundColor = "";
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



//ajout photo de mon repertoire
let imageURL = "";
function uploadImage() {
    const fileInput = document.getElementById("file-upload");
    const uploadedImage = document.getElementById("uploaded-image");

    fileInput.addEventListener("change", function(event) {
        event.preventDefault();
        const file = event.target.files[0];
        
        // Vérifier si un fichier a été sélectionné
        if (file) {
            const extension = file.name.split('.').pop().toLowerCase();
            if (extension === 'png' || extension === 'jpg') {
                const fileSizeInBytes = file.size;
                const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
                if(fileSizeInMegabytes <= 4){
                    const reader = new FileReader();

                    reader.onload = function(e) {
                        
                        imageURL = e.target.result;
                        localStorage.setItem("imageURL", imageURL);
                        uploadedImage.src = imageURL;
                        uploadedImage.style.display = "block"; // Afficher l'image
                        document.querySelector(".custom-file-upload").style.display = "none";
                        document.querySelector(".custom p").style.display = "none";
                        document.getElementById("icone-svg").style.display = "none";
                        verifierRemplissage()
                    };
                    reader.readAsDataURL(file);
                    
                }else{
                 alert('taille du fichier superieur à 4mo');
                 fileInput.value = ''; // Réinitialiser la valeur de l'élément input pour vider la sélection
                 uploadedImage.src = ""; // Réinitialiser l'image
                 uploadedImage.style.display = "none"; // Cacher l'image
               }
               
            } else {
                alert('Veuillez sélectionner un fichier PNG .');
                fileInput.value = ''; // Réinitialiser la valeur de l'élément input pour vider la sélection
                uploadedImage.src = ""; // Réinitialiser l'image
                uploadedImage.style.display = "none"; // Cacher l'image
            }
            
        }
    });
}
window.addEventListener("load", function() {
    uploadImage()
});






