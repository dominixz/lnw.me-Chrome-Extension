//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//	goo.gl URL Shortener is licensed under a Creative Commons Attribution-Noncommercial-No Derivative Works 3.0 License.
//	License (http://creativecommons.org/licenses/by-nc-nd/3.0/)
//
//	You are free:
//		* to Share — to copy, distribute and transmit the work
//
//	Under the following conditions:
//		* Attribution — You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
//		* Noncommercial — You may not use this work for commercial purposes.
//		* No Derivative Works — You may not alter, transform, or build upon this work.
//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function copyToClipboard(text)
{
	var input = document.getElementById('url');
	input.value = text;					
	input.focus();
	input.select();
	document.execCommand('Copy');
}

function shortenUrl(url)
{
	var response;
	
	var	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://goo.gl/api/url?user=toolbar@google.com&url=" + encodeURIComponent(url) + "&auth_token=" + getAuthToken(url), false);
	xmlhttp.onload = function()
	{
		var object = JSON.parse(xmlhttp.responseText);
		
		if(object["short_url"] == undefined)
			response = {status: "error", message: object["error_message"]};
		else	
			response = {status: "success", message: object["short_url"]};
	}
	xmlhttp.send(null);

	return response;
}

chrome.extension.onRequest.addListener(function(request, sender, func) 
{			
	switch(request.type)
	{
		case "shorten":
			var response = shortenUrl(request.url);
			func(response);
		break;
		
		case "copy":
			copyToClipboard(request.url);
		break;
		
		case "shortcut":
			chrome.tabs.getSelected(null, function(tab) 
			{	
				var response = shortenUrl(tab.url);
				tab.shortenedUrl = response.message;
				
				switch(request.shortcut)
				{
					case "copy":
						copyToClipboard(response.message);
					break;
					
					case "blogger":
						blogger(tab);
					break;
					
					case "delicious":
						delicious(tab);
					break;
					
					case "digg":
						digg(tab);
					break;
					
					case "facebook":
						facebook(tab);
					break;
					
					case "gmail":
						gmail(tab);
					break;
					
					case "google_reader":
						google_reader(tab);
					break;
					
					case "mail":
						mail(tab);
					break;
					
					case "myspace":
						myspace(tab);
					break;

					case "twitter":
						twitter(tab);
					break;
				}
			
				func(response);
			});
		break;
		
		case "preferences":	
			var temp = shortcuts;
			temp.shortcuts_enabled = preferences.shortcuts_enabled;
			
			func(temp);	
		break;
	}
});