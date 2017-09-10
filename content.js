// Saikrishna Chandhrasekhar
// September 8, 2017

function getIP()
{
	chrome.runtime.sendMessage({url: "ipinfo.io"}, function(responseText) {
		var temp = document.createElement("div");
		temp.innerHTML = responseText;
		var address = temp.getElementsByTagName("h1")[0].innerText;
		getCompanyName(address);
	});
}

function getCompanyName(address)
{
	$(document).ready(function() {
		$("div").mouseenter(function() {
			var companyid = this.getElementsById("h4")[0];
			var companyName = companyid.innerText;
			getData(address, companyName);
		});
	});
}

function getData(address, companyName)
{
	chrome.runtime.sendMessage({url: "http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=177556&t.k=kvtUQd0ashS&userip=" + address 
	+ "&actions=employers&q=" + companyName + "&userAgent=" + navigator.userAgent}, function(responseText) {
		var response = JSON.parse(responseText || null);
		if(response != null)
		{
			if(response["status"] == true)
			{
				
			}
		}
	});
}

function displayRating(display, profRating, profPage)
{
	var link = document.createElement("a");
	var node = document.createTextNode(profRating);
	var nbsp = document.createTextNode("\u00A0");
	if(profRating < 2.5)
		link.style.color = "#FF0000";
	else if(profRating >= 2.5 && profRating < 3.5)
		link.style.color = "#FFA500";
	else if(profRating >= 3.5)
		link.style.color = "#00FF00";
	link.href = profPage;
	link.appendChild(nbsp);
	link.appendChild(node);
	display.appendChild(link);
}