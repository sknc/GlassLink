chrome.runtime.onMessage.addListener(function(request, sender, callback)
{
	var xhr = new XMLHttpRequest();
	xhr.open("GET", request.url, true);
	xhr.onload = function() {
		callback(xhr.responseText)
	}
	xhr.send();
	return true;
});