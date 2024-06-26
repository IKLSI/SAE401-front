class VerifLogin {

	// Déclaration du constructeur

	constructor() {
		this.token = localStorage.getItem('token');
		if (this.token == null || this.token == undefined ) {
			window.location.href = 'http://localhost:8080/login';
		}
		if ((location.pathname === '/import' || location.pathname === '/import/') && localStorage.getItem('isadmin') === 'false') {
			window.location.href = 'http://localhost:8080/home';
		}
		this.request();
	}

	// Méthode pour vérifier le token

	request() {
		$.ajax({
			url: 'http://localhost:8000/api/verifyUser',
			type: 'POST',
			dataType: 'text',
			success: function(data){
				const jsData = JSON.parse(data);
				if (!jsData.token ) {
					window.location.href = 'http://localhost:8080/login';
				}
			},
			headers: {
				'Authorization': this.token
			},
			xhrFields: {
				withCredentials: true
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log(jqXHR, textStatus, errorThrown);
			}
		});
	}
}

// Instanciation de la classe VerifLogin

new VerifLogin();