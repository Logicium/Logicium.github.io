var users;
var usersArray; 
var userSessions;
var userID;
var user;
var linkedSessions = [];

//User Info
var userName = $('#userName');
var userImage = $('#userImage');

//User Stats
var totalReads = $('#totalReads');
var totalTime = $('#totalTime');
var readingCompletion = $('#readingCompletion');
var topSource = $('#topSource');
var topGenre = $('#topGenre');

//User Sessions


$(document).ready(function(){
    console.log("Readmember html loaded")
    loadUser();
    loadUserSessions();
    setUserIdentity();
    assignUserSessions();
    setUserInfo();
    setUserStats();
    postUserSessions();
    readingCompletionChart();
});


function setUserIdentity(){
    //Pull the ID from the webpage -data property
    console.log("Setting user identity");
    userID = "recbdvi9JDvVY5ntC";
    
    for(var i = 0; i<users.records.length;i++){
        if(users.records[i]["id"] == userID){
            user = users.records[i];
        }
    }
}

function assignUserSessions(){
    console.log("Assigning user Sessions");
    for(var i = 0; i<userSessions.records.length;i++){
        if(userID == userSessions["records"][i]["fields"]["User ID"]){
            linkedSessions.push(userSessions["records"][i]);
        }
    }
}

function setUserInfo(){
    console.log("Setting user info");
    $('#userName').text(user["fields"]["Name"]);
    $('#userImage').attr('src', user["fields"]["Profile Image"]);
}

function setUserStats(){
    console.log("Setting user stats");
    computeTotalReads();
    computeTotalTime();
    computeReadingCompletion();
    computeTopSource();
    
    function computeTotalReads(){
        $('#totalReads').text(linkedSessions.length);
    }
    
    function computeTotalTime(){
        var totalTimeNum = 0;
        for(var i=0;i<linkedSessions.length;i++){
            totalTimeNum += linkedSessions[i]["fields"]["Time Spent (Seconds)"];
        }
        var hours = secondsToTime(totalTimeNum).h;
        console.log(hours);
        $('#totalTime').text(parseInt(hours,10));
        
        function secondsToTime(secs){
            var hours = Math.floor(secs / (60 * 60));
           
            var divisor_for_minutes = secs % (60 * 60);
            var minutes = Math.floor(divisor_for_minutes / 60);
         
            var divisor_for_seconds = divisor_for_minutes % 60;
            var seconds = Math.ceil(divisor_for_seconds);
           
            var obj = {
                "h": hours,
                "m": minutes,
                "s": seconds
            };
            return obj;
        }
    }
    
    function computeReadingCompletion(){
        var totalReadingPercent = 0;
        for(var i=0;i<linkedSessions.length;i++){
            totalReadingPercent += linkedSessions[i]["fields"]["Progress Percentage"];
        }
        var percentAverage = Math.round(totalReadingPercent/linkedSessions.length);
        readingData[1].value = percentAverage;
        readingData[0].value = 100-percentAverage;
        $('#readingCompletion').text(percentAverage+"%");
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
        var dynamicSources ={};
        var maxValue = 0;
        
        for(var i=0;i<linkedSessions.length;i++){
            var sourceDomain = extractDomain(linkedSessions[i]["fields"]["URL"]);
            dynamicSources[String(sourceDomain)] += 1;
        }
        for(var k=0;k<dynamicSources.length;k++){
            var value = parseFloat(dynamicSources[k]);
            maxValue = (value > maxValue) ? value : maxValue;
        }
        
        
        topSourceDomain = findKeyByValue(dynamicSources, maxValue);
        topSourceName = findKeyByValue(sources, topSourceDomain);
        $('#topSource').text(topSourceName);
        
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
    console.log("Posting user sessions");
    
    var sessionTemplate = 
    ("<div id=\"\" class=\"feed-item\">")+
		("<div class=\"share\">")+
			("<span href=\"\" class=\"twitter fa fa-twitter\"></span>")+
			("<span href=\"\" class=\"facebook fa fa-facebook\"></span>")+
			("<span href=\"\" class=\"wordpress fa fa-wordpress\"></span>")+
		("</div>")+
		("<a class=\"url\" href=\"\">")+
			("<h2 class=\"title\"></h2>")+
			("<a href=\"#\" class=\"source\"></a>")+
		("</a>")+
		("<div class=\"time-percent\">")+
			("<span class=\"time fa fa-clock-o\"></span>")+
			("<span class=\"percent fa fa-pie-chart\"></span>")+
		("</div>")+
	("</div>");
	
	//Loop Through User's Sessions
	for(var i=0;i<linkedSessions.length;i++){
	    var templateCopy = $(sessionTemplate);
        templateCopy.attr('id',linkedSessions[i]["id"]);
        
        //Time Set
        var time = linkedSessions[i]["fields"]["Time Spent (Seconds)"];
        var minutes = Math.floor( time / 60);
        var secondsRemaining = time - minutes * 60;
        templateCopy.find('.time').text(minutes+"m "+secondsRemaining+"s");
        
        //Percent Set
        var percent = linkedSessions[i]["fields"]["Progress Percentage"];
        templateCopy.find('.percent').text(percent+"% Read");
        
        //Article Name Set
        var title  = linkedSessions[i]["fields"]["Page Name"];
        templateCopy.find('.title').text(title);
        
        //Functional Links
        var articleLink = linkedSessions[i]["fields"]["URL"];
        templateCopy.find('.url').attr('href', articleLink);
        
        //SUBMIT
        $('.feed').append(templateCopy);
        
	}
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

var readingData = [{
        value: 28,
        color: "#FEFBF7"
    }, {
        value: 72,
        color: "#D94F4F"
    }];

function readingCompletionChart() {

    var readingOptions = {
        segmentShowStroke : false,
        animation : true
    }

    var readingChart = document.getElementById("readingCompletionChart").getContext("2d");
    new Chart(readingChart).Pie( readingData, readingOptions );
}