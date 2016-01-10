var users;
var usersArray; 
var userSessions;
var userID;
var user;

//User Info
var userName = $('userName');
var userImage = $('userImage');

//User Stats
var totalReads = $('totalReads');
var totalTime = $('totalTime');
var readingCompletion = $('readingCompletion');
var topSource = $('topSource');
var topGenre = $('topGenre');

//User Sessions


$(document).ready(function(){
    loadUser();
    loadUserSessions();
    setUserIdentity();
    setUserInfo();
    postUserSessions();
});

var userIndex;

function setUserIdentity(){
    //Pull the ID from the webpage -data property
    userID = "recbdvi9JDvVY5ntC";
    
    for(var i = 0; i<users.length;i++){
        if(users.records[i]["id"] == userID){
            user = users.records[i];
            userIndex = i;
        }
    }
}

function setUserInfo(){
    $(userName).text = users.records[userIndex]["fields"]["Name"];
}

function postUserSessions(){
    var sessionTemplate = 
    ("<div class=\"feed-item\">")+
		("<div class=\"share\">")+
			("<span class=\"twitter fa fa-twitter\"></span>")+
			("<span class=\"facebook fa fa-facebook\"></span>")+
			("<span class=\"wordpress fa fa-wordpress\"></span>")+
		("</div>")+
		("<a class=\"url\" href=\"\">")+
			("<h2 class=\"title\">Item Name</h2>")+
			("<a href=\"#\" class=\"source\">The New York Times</a>")+
		("</a>")+
		("<div class=\"time-percent\">")+
			("<span class=\"time fa fa-clock-o\">1m 20s</span>")+
			("<span class=\"percent fa fa-pie-chart\">70% Read</span>")+
		("</div>")+
	("</div>");
	
	//Loop Through User's Sessions
	//for(var i=0;i<user.fields)
	
	
	//Add one session to the template Copy
	
	//Add the copy to the Feed
	
	
}

function loadUser() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            users = xhttp.responseText;
            users = JSON.parse(users);
        }
    };
    xhttp.open("GET", "https://api.airtable.com/v0/appmOYXlT9Xpr8VLG/Users?api_key=keyNb38YSpAFdx34A", false);
    xhttp.send();
}

function loadUserSessions(){
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            userSessions = xhttp.responseText;
            userSessions = JSON.parse(userSessions);
        }
    };
    xhttp.open("GET", "https://api.airtable.com/v0/appmOYXlT9Xpr8VLG/Sessions?api_key=keyNb38YSpAFdx34A", false);
    xhttp.send();
}