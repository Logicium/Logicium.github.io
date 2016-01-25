$(document).ready(function(){
    //localStorage.setItem('userObject',null);
    attachClicks();
    checkLoginStatus();

});

var userObject = JSON.parse(localStorage.getItem('userObject'));
var users;
var userID;

function checkLoginStatus(){
    if( userObject === null ){
        setLoggedOutScreen();
    }
    else{
        console.log("User object detected in Storage");
        setLoggedInScreen();
    }
}

function setLoggedOutScreen(){
    $('.logged-out').show();
    $('.logged-in').hide();
}

function setLoggedInScreen(){
    $('.logged-out').hide();
    populateLoggedInScreen();
    $('.logged-in').removeClass("hidden");
    $('.logged-in').fadeIn(1000);
    //chrome.storage.sync.set({userObject: userObject}, function() {
    //    console.log("Chrome storage user logged in");
    //});
    //chrome.runtime.sendMessage({message: "acceptUserObject", userObject: userObject}, function(response) {
    //    console.log("User object passed to background page.");
    //});
}

function populateLoggedInScreen(){
    $('.user-name').text(userObject["fields"]["Name"]);
    $('.user-image').attr('src',userObject["fields"]["Profile Image"]);
    $('.status-text').text("Tracking your reading productivity");
    userID = userObject["id"];
}

function attachClicks() {
    $('.sign-up i').click(function () {
        console.log("Sign up button clicked");
        hideButtons();
        revealSignUpForm();
    });

    $('.log-in').click(function () {
        hideButtons();
        revealSignInForm();
        downloadUsers();
    });

    $('button.fadeInUp').one('focus', function(){
        $(this).removeClass('fadeInUp');
    });

    $('.sign-in-form button').click(function(){
        retrieveSignInValues();
    });


    $('.sign-up-form button').click(function(){
        retrieveSignUpValues();
        $('.sign-up-form').addClass("animated").addClass("fadeOutDown");
        $('.sign-up-form').one('mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).hide();
        });
        setLoggedInScreen();
    });

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            sendResponse({userObject: userObject});
        }
    );
}


function retrieveSignInValues(){
    var userEmail = String($('#input-4').val()).trim().toLowerCase();
    var userPassword = String($('#input-5').val());

    if(!(users === null)){
        for(var i = 0;i<users.length;i++){
            if(
                (users[i]["fields"]["Username Email"] == userEmail) &&
                (users[i]["fields"]["Password"] == userPassword)
            ){
                console.log("Login successful.");
                userObject = users[i];
                localStorage.setItem('userObject', JSON.stringify(userObject));
                $('.sign-in-form').addClass("animated").addClass("fadeOutDown");
                $('.sign-in-form').one('mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).hide();
                });
                setLoggedInScreen();
                chrome.storage.sync.set({userObject: userObject}, function() {
                    console.log("Chrome storage user added");
                });
                return;
            }
        }
        $('.sign-in-status-text').text("Credentials not found.");
    }
    else{
        $('.sign-in-status-text').text("Users not loaded yet.");
    }
}


function retrieveSignUpValues(){
    var newUser = {
        "fields": {
            "Name": "Empty",
            "Username Email":"",
            "Profile Image": "http://i.imgur.com/O6jseUC.png",
            "Sessions": [ ],
            "Facebook URL":"",
            "Twitter URL": "",
            "Wordpress URL": "",
            "Password": ""
        }
    };

    newUser["fields"]["Name"] = $('#input-1').val();
    newUser["fields"]["Username Email"] = $('#input-2').val();
    newUser["fields"]["Password"] = $('#input-3').val();

    var mypostrequest = new XMLHttpRequest();
    mypostrequest.onreadystatechange = function(){
        if (mypostrequest.readyState===4){
            if (mypostrequest.status===200 || window.location.href.indexOf('http')===-1){
                newUser = JSON.parse(mypostrequest.responseText);
                localStorage.setItem("userObject",JSON.stringify(newUser));
                userID = newUser["id"];
                console.log("New User: "+userID+" successfully created");
            }
        }
    };
    mypostrequest.open('POST', 'https://api.airtable.com/v0/appmOYXlT9Xpr8VLG/Users?api_key=keyNb38YSpAFdx34A', true);
    mypostrequest.setRequestHeader('Content-type', 'application/json');
    mypostrequest.send(JSON.stringify(newUser));
}


function hideButtons(){
    $('.sign-up').addClass("animated").addClass("fadeOutRight");
    $('.sign-up').one('mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).hide();
    });
    $('.log-in').addClass("animated").addClass("fadeOutLeft");
}

function revealSignInForm(){
    $('.sign-in-form').removeClass("hidden");
}

function revealSignUpForm(){
    $('.sign-up-form').removeClass("hidden");
}

function downloadUsers() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            users = xhttp.responseText;
            users = JSON.parse(users)["records"];
            console.log("Users download complete.");
        }
    };
    xhttp.open("GET", "https://api.airtable.com/v0/appmOYXlT9Xpr8VLG/Users?api_key=keyNb38YSpAFdx34A", false);
    xhttp.send();
}