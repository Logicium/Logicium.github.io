/**
 * Created by Kisora on 2015-10-29.
 */

/******************************************************************************************/
//GLOBAL VARIABLES

var allMonthObjects = [];
var MonthObject = null; //Name, Colors, BackgroundPhoto
var currentMonth = null;
var leftMonth = null;
var rightMonth = null;
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();

/******************************************************************************************/
//SETUP LOGIC

$( document ).ready(function() {
    hideAdjacentMonths();
    displayCurrentDate();
});

function displayCurrentDate(){
    getCurrentDate();
    showCurrentView();
}

function getCurrentDate(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var monthModel = new MonthMatrix(year,month);
    monthModel.populateObjectView();
}

/******************************************************************************************/
//NAVIGATION LOGIC

$(function () {
    $("#leftMonthNavigation").click(function () {
        hideCurrentViewLeft();
        loadLeftViewData();
        showLeftView();
    });
});

$(function () {
    $("#rightMonthNavigation").click(function () {
        hideCurrentViewRight();
        loadRightViewData();
        showRightView();
    });
});

/******************************************************************************************/
//UI LOGIC: Cube Grid Unit Behaviour

//$(function(){
//    $( ".container" ).mouseenter(function() {
//        $( "#cube" ).removeClass("show-front");
//        $( "#cube" ).addClass("show-bottom");
//    });
//});
//
//$(function(){
//    $( ".container" ).mouseleave(function() {
//        $( "#cube" ).removeClass("show-bottom");
//        $( "#cube" ).addClass("show-front");
//    });
//});

/**************************************/
//UI LOGIC: Grid Unit Behaviour


$(function(){
    $( ".gridUnit" ).mouseenter(function() {
        $(this).find(".unitCircle").fadeOut();
        $(this).find(".canvas-holder").removeClass("hidden");
        $(this).find(".canvas-holder").fadeIn();
        $(this).find(".canvas-holder").addClass("visible");

    });
});

$(function(){
    $( ".gridUnit" ).mouseleave(function() {
        $(this).find(".unitCircle").fadeIn();
        $(this).find(".canvas-holder").fadeOut();
    });
});


/**************************************************************************************/
//UI LOGIC: Month View Behaviour


function hideCurrentViewLeft(){
    $('#currentMonthGrid').hide("drop", { direction: "right", easing:"easeInOutCirc" }, 500);
}

function hideCurrentViewRight(){
    $('#currentMonthGrid').hide("drop", { direction: "left", easing:"easeInOutCirc" }, 500);
}


function hideAdjacentMonths(){
    $('#rightMonthGrid').hide();
    $('#leftMonthGrid').hide();
}


function showCurrentView(){
    $('#currentMonthGrid').fadeIn(1000);
}

function loadLeftViewData(){
    month -= 1;
    if(month == -1){
        month = 12;
        year -= 1;
    }
    var monthModel = new MonthMatrix(year,month);
    monthModel.populateObjectView();
}

function showLeftView(){
    $('#currentMonthGrid').show("drop", { direction: "left", easing:"easeInOutCirc" }, 500);
}

function loadRightViewData(){
    month += 1;
    if(month==13){
        month = 1;
        year += 1;
    }
    var monthModel = new MonthMatrix(year,month);
    monthModel.populateObjectView();
}

function showRightView(){
    $('#currentMonthGrid').show("drop", { direction: "right", easing:"easeInOutCirc" }, 500);
}

/*******************************************************************************************/