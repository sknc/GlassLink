// Saikrishna Chandhrasekhar
// September 1, 2017

var cells = document.getElementsByClassName("col-xs-6 col-sm-3");
for(var i = 0; i < cells.length; i++)
{
	if(cells[i].innerText.indexOf("Instructor: ") != -1)
	{
		var display = document.createElement("span");
		display.className = "rating";
		var names = cells[i].innerText.replace("Instructor: ", "");
		if(names != "Staff")
		{
			var profName = names.split(",");
			var firstName = profName[1];
			var lastName = profName[0];
			getProfessorPage(display, firstName, lastName);
		}
		cells[i].appendChild(display);
	}
}


function getProfessorPage(display, firstName, lastName)
{
	chrome.runtime.sendMessage(
	{
		url: "http://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=University+of+California+Santa+Cruz&schoolID=1078&query=" + lastName
	}, function(responseText) {
		var temp1 = document.createElement('div');
		temp1.innerHTML = responseText;
		var profListings = temp1.getElementsByClassName("listing PROFESSOR");
		var loc = 0;
		var found = false;
		for(var i = 0; i < profListings.length; i++)
		{
			var temp2 = document.createElement("div");
			temp2.innerHTML = profListings[i].innerHTML;
			var name = temp2.getElementsByClassName("main")[0].innerText;
			var temp = name.split(",");
			if(temp[0] == lastName && temp[1].charAt(1) == firstName.charAt(0))
			{
				loc = i;
				found = true;
				break;
			}
		}
		if(lastName == "Bhattacharya" || (lastName == "Brooks" && firstName.charAt(0) == 'A'))
			loc++; // edge cases
		if((lastName == "Williams" && firstName.charAt(0) == 'I') || (lastName == "Guha Thakurta" && firstName.charAt(0) == 'P'))
			found = false;
		if(found == true)
		{
			var id = temp1.getElementsByClassName("listing PROFESSOR")[loc].getElementsByTagName("a")[0].getAttribute("href");
			chrome.runtime.sendMessage({url: "http:/www.ratemyprofessors.com" + id}, function(responseText) {
				var temp3 = document.createElement("div");
				temp3.innerHTML = responseText;
				var profRating = temp3.getElementsByClassName("grade")[0].innerText;
				var profPage = "http:/www.ratemyprofessors.com" + id;
				displayRating(display, profRating, profPage);
			});
		}
		else 
		{
			var nbsp = document.createTextNode("\u00A0");
			var notfound = document.createTextNode("N/A");
			display.appendChild(nbsp);
			display.appendChild(notfound);
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