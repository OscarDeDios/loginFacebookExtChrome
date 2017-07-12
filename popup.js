document.addEventListener("DOMContentLoaded", function(event) { 
	document.getElementById("loginFace").addEventListener("click", function(){
		chrome.runtime.sendMessage({loginFace: "login"});
		
		var url = "https://www.facebook.com/dialog/oauth?client_id=730232947181773&response_type=token&redirect_uri=http://www.facebook.com/connect/login_success.html&scope=email";
		window.open(url, 'Facebook Login', "width=900,height=500,left=200,top=150,scrollbars=no");

		chrome.runtime.onMessage.addListener(
	  		function(request, sender, sendResponse) {
			if (request.loginFaceDone)
			{
				var loginAnswer = JSON.parse(request.loginFaceDone);

				console.log(loginAnswer);

				document.getElementById('idFace').innerHTML = loginAnswer.id;
				document.getElementById('nameFace').innerHTML = loginAnswer.name;
				document.getElementById('mailFace').innerHTML = loginAnswer.email;
			}
		});
	});
});


