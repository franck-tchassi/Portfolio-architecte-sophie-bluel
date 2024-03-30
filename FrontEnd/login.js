export function seConnecter(){

	const formulaireLogin = document.querySelector(".formLogin");

	formulaireLogin.addEventListener("submit", function(event){
		event.preventDefault();
        
        //creation d'object login
	    const login = {
		   email:   event.target.querySelector("[name = email]").value,
		   password: event.target.querySelector("[name = pwd]").value
	    };

	    //création charge util en format JSON
	    const chargeUtil = JSON.stringify(login);

	    fetch("http://localhost:5678/api/users/login", function(){
	    	method: "post",
	    	headers: {"Content-Type": "application/json"},
	    	body: chargeUtil
	    })
	})
}
