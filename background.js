chrome.runtime.onMessage.addListener(function(request, sender, callback)
{
	var xhr = new XMLHttpRequest();
	xhr.open("GET", request.url, true);
	console.log("Requesting url:" + request.url);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) 
			document.getElementById("h1").innerText = xhr.responseText;
	}
	xhr.send();
	return true;
});