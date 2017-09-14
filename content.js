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
		$(".job-card-search__company-location-wrapper").hover(function() {
			var companyName = this.getElementsByTagName("h4")[0].innerText;
			var ratingDiv = document.createElement("div");
			getData(address, companyName, ratingDiv);
			$(this).append(ratingDiv);
			$(this).append("<a href='https://www.glassdoor.com/index.htm'>powered by <img src='https://www.glassdoor.com/static/img/api/glassdoor_logo_80.png' title='Job Search' /></a>");
		});
	});
}

function getData(address, companyName, ratingDiv)
{
	var searchURL = "http://api.glassdoor.com/api/api.htm?t.p=194337&t.k=kenIlW2Q28g&format=json&v=1&action=employers&q=" + companyName + "&userip=" + address;
	chrome.runtime.sendMessage({url: searchURL}, function(responseText) {
		var response = JSON.parse(responseText || null);
		if(response != null)
		{
			if(response["success"] == true)
			{
				var companyRating = response["response"].employers[0].overallRating;
				ratingDiv.innerHTML = "<span id = glassdoor_rating>" + companyRating + "</span>";
			}
		}
	});
}
