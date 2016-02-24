$(window).load(function() {
    $("body").removeClass("preload");


    showDefaultPanel();
});

var RemainingTimeCoin = 100;
var TemporalWorth;
var hourlyWage;
var dailyHours;
var weeklyDays;
var dailyWage;
var weeklyWage;

$(document).ready(function(){

    //hideAllPanels();

    $('.description').height($(window).height() - $('.header-image').height());

    $(window).resize(function(){
        $('.description').height($(window).height() - $('.header-image').height());
    });

    $('.get-started-button').click(function(){
        fadeOutHomePanel(showCalcPanel);
    });

    $('.submit-calculator').click(function(){
        hourlyWage = $('.hourly-wage').val();
        dailyHours = $('.daily-hours').val();
        weeklyDays = $('.weekly-days').val();

        dailyWage = dailyHours * hourlyWage;
        weeklyWage = (dailyWage * weeklyDays)/7;
        TemporalWorth = "100 TimeCoin = $"+weeklyWage.toFixed(2);


        $('.hourly-wage').addClass('animated fadeOutDown')
            .one('mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).hide();
            });
        $('.daily-hours').addClass('animated fadeOutDown')
            .one('mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).hide();
            });
        $('.weekly-days').addClass('animated fadeOutDown')
            .one('mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).hide();
            });
        $('.submit-calculator').addClass('animated fadeOutDown')
            .one('mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).hide();
                $('.calculator').hide();
                $('.temporal-worth').text(TemporalWorth);
                $('.results').addClass('animated fadeInUp').show();
            });
    });

    $('.calculation-panel .next').click(function(){

        $('.worth-calculation-container').addClass('animated fadeOutLeft')
            .one('mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).hide();
                $('.results').hide();
                $('.goods-calculation-container').addClass('animated fadeInRight').show();
            });
    });


    $('.calculation-panel .back').click(function(){


    });


    $('.submit-goods-calculator').click(function(){
        var priceOfGood = $('.price-of-good').val();
        var normalizedHourlyWage  = weeklyWage/24;
        var priceInTime = priceOfGood/hourlyWage;
        var normalizedDailyHours = (dailyHours*weeklyDays)/7;
        var timeCoinCost = ((priceOfGood/hourlyWage)/weeklyDays)*100; //Needs to be normalized
        RemainingTimeCoin -= timeCoinCost;

        $('.temporal-cost').text("Price of Good in Work Hours: "+priceInTime.toFixed(2)+"hrs");
        $('.timecoin-cost').text("Cost of Good in Timecoin: "+timeCoinCost.toFixed(2)+" TimeCoin");
        $('.timecoin-remaining').text("TimeCoin Remaining in the day: "+RemainingTimeCoin.toFixed(2)+" TimeCoin");

        $('.price-of-good').addClass('animated fadeOutDown delay-1')
            .one('mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).hide();
            });
        $('.submit-goods-calculator').addClass('animated fadeOutDown delay-2')
            .one('mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).hide();
                $('.goods-calculator').hide();
                $('.results').addClass('animated fadeInUp').show();
            });
    });


    $('.goods-calculation-panel .new-good').click(function(){



    });



});

function hideAllPanels(){
    $('.home-panel').hide();
    $('.calculation-panel').hide();
}

function fadeOutHomePanel(animationComplete){
    $('.home-panel').addClass('animated fadeOutDown')
        .one('mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).hide();
            animationComplete();
    });
}

function showDefaultPanel(){
    $('.home-panel').show();
}

function showCalcPanel(){
    $('.results').hide();
    $('.calculation-panel').removeClass('fadeOutDown');
    $('.calculation-panel').addClass('animated fadeInUp').show();
}
