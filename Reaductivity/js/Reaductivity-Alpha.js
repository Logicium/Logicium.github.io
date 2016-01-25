$(document).ready(function(){
    assignEventHandlers();
    showDefaultPanel();
});

function assignEventHandlers(){

    $('#activity-nav-button').click(function(){
        hideAllPanels();
        $('.activity-panel').fadeIn();

    });

    $('#members-nav-button').click(function(){
        hideAllPanels();
        $('.members-panel').fadeIn();

    });

    $('#about-nav-button').click(function(){
        hideAllPanels();
        $('.about-panel').fadeIn();

    });

    $('#log-in-nav-button').click(function(){
        hideAllPanels();
        $('.log-in-panel').fadeIn();

    });

    $('#profile-nav-button').click(function(){
        hideAllPanels();
        $('.profile-panel').fadeIn();

    });
}

function showDefaultPanel(){
    hideAllPanels();
    $('.activity-panel').fadeIn(1000);
}

function hideAllPanels(){
    $('.activity-panel').hide();
    $('.members-panel').hide();
    $('.about-panel').hide();
    $('.log-in-panel').hide();
    $('.profile-panel').hide();
}