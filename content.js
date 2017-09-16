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
		var ratingDiv = document.createElement("div");
		ratingDiv.id = "company_rating";
		$(".job-card-search__company-location-wrapper").mouseenter(function() {
			ratingDiv.innerHTML = "";
			var companyName = this.getElementsByTagName("h4")[0].innerText;
			getData(address, companyName, ratingDiv);
			$(this).append(ratingDiv);
		});
		/*
		$(".job-card-search__company-location-wrapper").mouseleave(function() {
			document.getElementById("company_rating").remove();
		}); */
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
				console.log(companyRating);
				ratingDiv.innerHTML = "<span id = glassdoor_rating>" + companyRating + "</span>" + " " + "<a href='https://www.glassdoor.com/index.htm'>powered by <img src='https://www.glassdoor.com/static/img/api/glassdoor_logo_80.png' title='Job Search' /></a>";
				console.log(ratingDiv.innerHTML);
			}
		}
	});
}
