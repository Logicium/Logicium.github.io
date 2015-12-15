/**
 * Created by kithomas on 11/17/2015.
 */
var NaviButtonClicked = false;

$(function () {
    $(".menuButton").click(function () {
        if(NaviButtonClicked == false) {
            $("#menu").addClass("revealMenu");
            $(".movableView").addClass("pushAsideContents");
            revealEachDelayed();
            NaviButtonClicked = true;
        }
        else{
            $("#menu").removeClass("revealMenu");
            $(".movableView").removeClass("pushAsideContents");
            $('.itemContainer').removeClass("animated fadeInLeft");
            NaviButtonClicked = false;
        }
    });
});

function revealEachDelayed(){
    $('.itemContainer').hide().each(function(i) {
        console.log("Go!"+this.title);
        $(this).delay((i++) * 100).queue(function(next){
            $(this).addClass("animated fadeInLeft").show();
            next();
        });
    });
}
