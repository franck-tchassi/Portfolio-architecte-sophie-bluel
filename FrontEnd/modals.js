//se logout pour se déconnecter
const logout = document.querySelector("#logout");
logout.addEventListener("click", function(e){
    e.preventDefault();
	window.location.href="login.html";
	localStorage.removeItem("authToken")
})

// Exécuter le code pour masquer l'élément avec l'ID "filters" si la redirection vers index.html a été effectuée
document.addEventListener("DOMContentLoaded", function() {
    const authToken = localStorage.getItem('authToken');
    if (authToken !== null) {
        document.getElementById("filters").style.display = "none";
		document.getElementById("login").style.display = "none";
		document.getElementById("logout").style.display = "flex";
		document.querySelector(".modifier").style.display = "flex";
        document.querySelector(".adminfeature-edition").style.display = "flex";
    }
});

// ouvrir la modal suprimer lorsque l'on click sur le bouton modifier
const btnModifier = document.querySelector("#icone-modifier");
const modeEdition = document.getElementById("banner-modifier")
btnModifier.addEventListener("click", function(e){
    e.preventDefault();
    const modalOuvert = document.getElementById("deleteView").style.display="flex";
    (modalOuvert == "flex") ? document.querySelector("body").style.backgroundColor="#0000004D" : "" ;
})
modeEdition.addEventListener("click", function(e){
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
    (modalReturn == "flex") ? document.getElementById("addView").style.display="none" : "" ;

    //Réinitialisation de l'affichage de l'image et suppression de l'URL de l'image du localStorage lorsque on click sur le bouton revenir en arrière
    document.getElementById("uploaded-image").style.display = "none";
    document.querySelector(".custom-file-upload").style.display = "flex";
    document.querySelector(".custom p").style.display = "flex";
    document.getElementById("icone-svg").style.display = "flex";
    localStorage.removeItem("imageURL");
    
    //vider le title et option lorsque l'on quitte la modal ajouter
    titleInput.value = "";
    contenuOption.value = "";
    //désactiver le bouton de validation
    verifierRemplissage();
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
    contenuOption.value = "";
    //désactiver le bouton de validation
    verifierRemplissage();
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

/* *****    formulaire pour ajout de project  ****** */
//ajout photo de mon repertoire
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
                        
                         
                        uploadedImage.src = e.target.result;
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
uploadImage()

//function qui ajoute des options dans la modal ajouter
async function ajoutOption(){
    try {
        // Appeler la fonction pour récupérer toutes les catégories
        const reponse = await fetch("http://localhost:5678/api/categories");
        const categories = await reponse.json();

        // Sélectionnez le menu déroulant des catégories
        const categorieSelect = document.getElementById("modal-categorie");

        // Ajouter l'option vide comme première option
        const emptyOption = document.createElement("option");
        emptyOption.id = "modal-option";
        emptyOption.value = ""; // Valeur vide
        emptyOption.textContent = ""; // Texte vide
        categorieSelect.appendChild(emptyOption);

        // Boucle à travers les catégories et créez les options
        categories.forEach(categorie => {
            // Créez une nouvelle option
            const option = document.createElement("option");
            option.id = "modal-option";
            
            // Définissez la valeur et le texte de l'option
            option.value = categorie.id;
            option.innerText = categorie.name;

           
            
            // Ajoutez l'option au menu déroulant
            categorieSelect.appendChild(option);

        });
    } catch (error) {
        console.error("Une erreur s'est produite lors de l'ajout des options de catégorie :", error);
    }
}
// Appeler la fonction pour ajouter les options au chargement de la page
ajoutOption(); 


// Récupérer les éléments nécessaires
const validerButton = document.getElementById("modal-valider");
// Ajoutez un écouteur d'événements pour détecter les changements de valeur
const titleInput = document.getElementById("title");
titleInput.addEventListener("input", function() {
    // Récupérez la valeur saisie dans l'élément input
    const saisie = titleInput.value; 
    console.log(saisie);
    localStorage.setItem("titleSaisir", saisie);
    verifierRemplissage()
});
const contenuOption = document.getElementById("modal-categorie")
contenuOption.addEventListener("change", function(event){
    const option = contenuOption.value
    console.log(contenuOption.value)
    localStorage.setItem("option", option);
    verifierRemplissage()
});

//vérifier que le contenu de la modal ajouter n'est pas vide pour activer le bouton
function verifierRemplissage() {
   // const title = titleInput.value.trim(); // Récupérer la valeur saisie dans le titre
   // const category = contenuOption.value; // Récupérer la catégorie sélectionnée
    const fileInput = document.getElementById("file-upload");
    const title = document.getElementById("title");
    const category = document.getElementById("modal-categorie");
    
    
    // Vérifier si l'image est déjà chargée et si le titre et la catégorie ne sont pas vides
    if ( fileInput.files.length > 0 && title.value !== "" && category.value !== ""){
      // Si tous les champs sont remplis, activer le bouton de validation
      validerButton.style.backgroundColor = "#1D6154";
      validerButton.style.cursor = "pointer";
    }
    else {
        // Sinon, désactiver le bouton de validation
        validerButton.style.backgroundColor = "";
    }
}
verifierRemplissage()

//événement qui permet d'ajouter des travaux
document.querySelector('#modal-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const fileInput = document.getElementById("file-upload");
    const title = document.getElementById("title").value;
    const category = document.getElementById("modal-categorie").value;
   

    const formData = new FormData();
    const fileData = fileInput.files[0];
    
    formData.append("image", fileData, fileData.name);
    formData.append("title", title);
    formData.append("category", category);
    
    const authToken = localStorage.getItem("authToken");

    try {
        const response = await fetch(`http://localhost:5678/api/works/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Accept': 'application/json'
            },
            body: formData
        });

        if (response.ok) {
            alert('Mise à jour réussie');
            // Afficher les travaux dans la galerie après l'ajout
            // afficherTravauxDansGalerie()
        } else {
            alert('Les modifications ne seront pas sauvegardées');
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de l'envoi de la requête :", error);
    }
    
    afficherTravauxDansGalerie();
})




