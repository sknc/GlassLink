// Saikrishna Chandhrasekhar
// September 8, 2017

chrome.runtime.sendMessage({url: "https://ipinfo.io/"}, function(responseText) {
	var temp = document.createElement("div");
	temp.innerHTML = responseText;
	var address = temp.getElementsByTagName("h1")[0].innerText;
	getCompanyName(address);
});


function getCompanyName(address)
{
	$(document).ready(function() {
		$(".job-card-search__title-line").each(function() {
			
		});
	});
}

function getData(address, companyName)
{
	var searchURL = "http://api.glassdoor.com/api/api.htm?t.p=194337&t.k=kenIlW2Q28g&format=json&v=1&action=employers&q=" + companyName + "&userip=" + address;
	chrome.runtime.sendMessage({url: searchURL}, function(responseText) {
		var response = JSON.parse(responseText || null);
		if(response != null)
		{
			if(response["success"] == true)
			{
				var companyRating = response["response"].employers[0].overallRating;
				console.log(companyRating);
				displayRating(companyRating);
			}
		}
	});
}

function displayRating(companyRating)
{
	
	var test = document.getElementById("gd_rating");
	console.log(test);
}