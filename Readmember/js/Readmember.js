var users;
var usersArray; 
var userSessions;
var userID;
var user;
var linkedSessions = [];

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
    assignUserSessions();
    setUserInfo();
    postUserSessions();
    readingCompletionChart();
});


function setUserIdentity(){
    //Pull the ID from the webpage -data property
    userID = "recbdvi9JDvVY5ntC";
    
    for(var i = 0; i<users.records.length;i++){
        if(users.records[i]["id"] == userID){
            user = users.records[i];
        }
    }
}

function assignUserSessions(){
    for(var i = 0; i<userSessions.records.length;i++){
        if(userID == userSessions["records"][i]["fields"]["User ID"]){
            linkedSessions.push(userSessions["records"][i]);
        }
    }
}

function setUserInfo(){
    $(userName).text(user["fields"]["Name"]);
    $(userImage).css('img',  user["fields"]["Profile Image"]);
}

function setUserStats(){

    computeTotalReads();
    computeTotalTime();
    computeReadingCompletion();
    computeTopSource();
    
    function computeTotalReads(){
        $(totalReads).text(linkedSessions.length);
    }
    
    function computeTotalTime(){
        var totalTimeNum = 0;
        for(var i=0;i<linkedSessions.length;i++){
            totalTimeNum += linkedSessions["Time Spent (Seconds)"];
        }
        var minutes = Math.floor(totalTimeNum / 60);
        $(totalTime).text(minutes+"m");
    }
    
    function computeReadingCompletion(){
        var totalReadingPercent = 0;
        for(var i=0;i<linkedSessions.length;i++){
            totalReadingPercent += linkedSessions["Progress Percentage"];
        }
        var percentAverage = totalReadingPercent/linkedSessions.length;
        $(readingCompletion).text(percentAverage+"%");
    }
    
    function computeTopSource(){
        var sources = {
            'The New York Times': "www.nytimes.com",
            'MIT Technology Review': "www.technologyreview.com",
            'The Huffington Post': "huffingtonpost.com",
            'Long Reads': "longreads.com",
            'Vox': "vox.com"
        }
        var topSourceDomain;
        var topSourceName;
        
        var dynamicSources;
        
        for(var i=0;i<linkedSessions.length;i++){
            var sourceDomain = extractDomain(linkedSessions["URL"]);
            dynamicSources[sourceDomain] +=1;
        }
        
        var maxValue = 0;
        
        for(var k=0;k<dynamicSources.length;k++){
            var value = parseFloat(dynamicSources[k]);
            maxValue = (value > maxValue) ? value : maxValue;
        }
        topSourceDomain = findKeyByValue(dynamicSources, maxValue);
        topSourceName = findKeyByValue(sources, topSourceDomain);
        $(topSource).text(topSourceName);
        
        function findKeyByValue( obj, value){
        
            for( var key in obj ) {
        
                if( typeof obj[key] === 'object' ){
                    findKeyByValue( obj[key] );
                }
        
                if( obj[key] === value ){
                   return key;
                }
            }
        }
        
        function extractDomain(url) {
            var domain;
            //find & remove protocol (http, ftp, etc.) and get domain
            if (url.indexOf("://") > -1) {
                domain = url.split('/')[2];
            }
            else {
                domain = url.split('/')[0];
            }
            //find & remove port number
            domain = domain.split(':')[0];
            return domain;
        }
    }
    
    function computeTopGenre(){
        
    }
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

function readingCompletionChart() {

    var readingData = [{
        value: 28,
        color: "#FEFBF7"
    }, {
        value: 72,
        color: "#D94F4F"
    }]

    var readingOptions = {
        segmentShowStroke : false,
        animation : true
    }

    var readingChart = document.getElementById("readingCompletionChart").getContext("2d");
    new Chart(readingChart).Pie( readingData, readingOptions );
}