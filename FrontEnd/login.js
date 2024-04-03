document.addEventListener("DOMContentLoaded", function(){

	const formulaireLogin = document.getElementById("formLogin");

	formulaireLogin.addEventListener("submit", function(event){

	   event.preventDefault(); 
        
           //creation d'object login
	    const login = {
		   email:   event.target.querySelector('input[name = "email"]').value,
		   password: event.target.querySelector('input[name = "pwd"]').value
	    };

	    //convertir le login en format JSON
	    const chargeUtil = JSON.stringify(login);

	    fetch("http://localhost:5678/api/users/login", {
	    	method: "post",
	    	headers: {"Content-Type": "application/json"},
	    	body: chargeUtil
	    })
	    .then(res =>{
		if(res.ok){
			window.location.href = "index.html"
		}
		else{
			document.getElementById("errEmailAndPwd").style.display = "flex"
		}
		})
	     .catch(err =>{
                        console.log("erreur de server", err)
		})
	})
})
