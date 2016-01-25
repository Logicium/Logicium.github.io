var SessionObject = {
    url : '',
    progress: '',
    timeSpent: '',
    userID: '',
    pageTitle: '',
}


function newArticleTracking(){
    setUser();
    getMetadata();
    startTimer();
    
    
}

function setUser(){
    
    
    
}

var sessionContinue=true;

function startTimer(){
    var timerWorker = new Worker(timerWorker.js);
}


function startSession(){
    startTimer();
    //+Position of the document, therefore the progress.
}

function getMetadata(){


}

function sendToAirtable(){
    var xhttp = new XMLHttpRequest();
    var url = "";
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            personInfo = xhttp.responseText;
            personInfo = JSON.parse(personInfo);
        }
    };
    xhttp.open("GET", "https://randomuser.me/api/", false);
    xhttp.send();
}