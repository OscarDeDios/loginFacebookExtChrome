/*--------------------------- FACEBOOK LOGIN -----------------------------------*/


	chrome.runtime.onMessage.addListener(
  		function(request, sender, sendResponse) {
		if (request.loginFace)
		{
			chrome.tabs.onUpdated.addListener(onFacebookLogin);
		}
	});

var token;
var expires;
function onFacebookLogin(tabid,attachInfo,tab)
{
	if (attachInfo.status == 'loading' && tab.url != undefined && tab.url.indexOf('www.facebook.com/connect/login_success.html') > -1)
	{
		console.log('url facebooklogin: ' + tab.url);
		if (tab.url.indexOf('#access_token') > -1)
		{
			token = tab.url.substring(tab.url.indexOf('#access_token=') + 14, tab.url.indexOf('&expires'));
			if (tab.url.indexOf('&base_domain') > -1)
				expires = tab.url.substring(tab.url.indexOf('&expires_in=') + 12, tab.url.indexOf('&base_domain'));
			else
				expires = tab.url.substring(tab.url.indexOf('&expires_in=') + 12);

			var graphUrl = "https://graph.facebook.com/v2.9/me?fields=id,name,friends,email&access_token=" + token;

			var request = new XMLHttpRequest();
			request.open('GET', graphUrl, true);

			request.onload = function() {
			  if (request.status >= 200 && request.status < 400) {
			    // var data = JSON.parse(request.responseText);
			    console.log(request.responseText);
			    chrome.runtime.sendMessage({loginFaceDone: request.responseText});
			  } else {
			    console.log('Error acceso');
			  }
			};

			request.onerror = function() {
			  console.log('Error acceso');
			};

			request.send();

            chrome.tabs.remove(tabid);
		}
	}
}
