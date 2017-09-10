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
				var companyRating = response["response"].employers[0].overallRating;
				displayRating(companyName, companyRating);
			}
		}
	});
}

function displayRating(companyName, companyRating)
{
	var display = this.createElement("div");
	var rating = this.createTextNode(companyRating);
	display.append(rating);
	display.append("<a href='https://www.glassdoor.com/index.htm'>powered by <img src='https://www.glassdoor.com/static/img/api/glassdoor_logo_80.png' title='Job Search' /></a>");
	this.append(display);
}