document.addEventListener("DOMContentLoaded", function(){
    const formulaireLogin = document.getElementById("formLogin");

    formulaireLogin.addEventListener("submit", function(event){
        event.preventDefault(); 
        
        // Création de l'objet login
        const login = {
            email: event.target.querySelector('input[name = "email"]').value,
            password: event.target.querySelector('input[name = "pwd"]').value
        };

        // Création de la charge utile au format JSON
        const chargeUtil = JSON.stringify(login);

        fetch("http://localhost:5678/api/users/login", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: chargeUtil
        })
        .then(res => {
            if(res.ok){
                return res.json(); // Convertir la réponse en JSON
            } else {
                throw new Error('Invalid credentials');
            }
        })
        .then(data => {
            // Récupérer le token d'authentification à partir des données de la réponse
            const authToken = data.token;

            // Stocker le token dans localStorage
            localStorage.setItem('authToken', authToken);

            // Rediriger vers la page index.html
            window.location.href = "index.html";

            
        })
        .catch(err => {
            console.log("Erreur lors de la connexion:", err);
            document.getElementById("errEmailAndPwd").style.display = "flex";
        });
    });
});




