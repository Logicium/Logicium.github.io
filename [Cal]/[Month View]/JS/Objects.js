/**
 * Created by Kisora on 2015-10-31.
 */

var CalendarObject = function CalendarObject(){
    var Months = [12];
    var Weeks = [6];
    var Days = [42];
};

var MonthMatrix = function MonthMatrix(contextYear, contextMonth){
    //Whole Day Objects
    MonthMatrix.prototype.week1=[]; //First Few are empty from previous month
    MonthMatrix.prototype.week2=[];
    MonthMatrix.prototype.week3=[];
    MonthMatrix.prototype.week4=[];
    MonthMatrix.prototype.week5=[];
    MonthMatrix.prototype.week6=[];
    MonthMatrix.prototype.Weeks = null;

    MonthMatrix.Weeks = [
        MonthMatrix.prototype.week1,
        MonthMatrix.prototype.week2,
        MonthMatrix.prototype.week3,
        MonthMatrix.prototype.week4,
        MonthMatrix.prototype.week5,
        MonthMatrix.prototype.week6
    ];

    var Days = [];

    function convertToMonthMatrix(){
        var offset = new DayObject(contextYear,contextMonth,1).weekdayNum;

        for(var week = 0 ; week < 5 ; week++){
            for(var day = 0 ; day < numberOfDays(contextYear,contextMonth)+offset; day++){
                MonthMatrix.Weeks[week][offset+day] = new DayObject(contextYear,contextMonth,day);
                var dayObj =  MonthMatrix.Weeks[week][offset+day];
                Days[offset+day] = (dayObj);
                console.log(Days[day]);
            }
        }
    }

    function assignDaysToGrid(){
        var rows = $(".row");
        var count = 0;
        for(var row=0;row<7;row++){
            var rowObject = $(rows[row]);
            var rowObjectUnitCircle = $(rowObject).find(".unitCircle");
            var rowObjectChart = $(rowObject).find(".chart-area");

            for(var col=0;col<7;col++){
                console.log("Count is:"+count);
                if (typeof Days[count] != 'undefined') {
                    $(rowObjectUnitCircle[col]).data('DayObject', JSON.stringify(Days[count]));

                    if(typeof $(rowObjectChart[col]).get(0) != 'undefined'){
                        var ctx = $(rowObjectChart[col]).get(0).getContext("2d");
                        window.myDoughnut = new Chart(ctx).Pie(Days[count].DayData, {responsive : true});
                    }
                    $(rowObjectUnitCircle[col]).text(Days[count].nameNum);
                }
                else{
                    $(rowObjectUnitCircle[col]).text(" ");
                }
                count++;
            }
        }
    }

    function numberOfDays(year, month) {
        var d = new Date(year, month, 0);
        return d.getDate();
    }

    function assignMonthName(monthNumber){
        var monthNames = [
            "J\xa0A\xa0N\xa0U\xa0A\xa0R\xa0Y",
            "F\xa0E\xa0B\xa0R\xa0U\xa0A\xa0R\xa0Y\xa0",
            "M\xa0A\xa0R\xa0C\xa0H",
            "A\xa0P\xa0R\xa0I\xa0L",
            "M\xa0A\xa0Y",
            "J\xa0U\xa0N\xa0E",
            "J\xa0U\xa0L\xa0Y",
            "A\xa0U\xa0G\xa0U\xa0S\xa0T",
            "S\xa0E\xa0P\xa0T\xa0E\xa0M\xa0B\xa0E\xa0R",
            "O\xa0C\xa0T\xa0O\xa0B\xa0E\xa0R",
            "N\xa0O\xa0V\xa0E\xa0M\xa0B\xa0E\xa0R",
            "D\xa0E\xa0C\xa0E\xa0M\xa0B\xa0E\xa0R"
        ];
        $("#monthName").text(monthNames[monthNumber]);
    }

    function assignMonthColors(monthNumber){
        var gradientImages = [
            "CSS/Month-Gradients/1.png", "CSS/Month-Gradients/2.png","CSS/Month-Gradients/3.png",
            "CSS/Month-Gradients/4.png","CSS/Month-Gradients/5.png","CSS/Month-Gradients/6.png",
            "CSS/Month-Gradients/7.png","CSS/Month-Gradients/8.png","CSS/Month-Gradients/9.png",
            "CSS/Month-Gradients/10.png","CSS/Month-Gradients/11.png","CSS/Month-Gradients/12.png"
        ];

        var selectedImage = "url(\""+gradientImages[monthNumber]+"\")";
        $('.unitCircle').css("background-image", selectedImage);

        var monthColors = [
            "linear-gradient(90deg, #43cea2 10%, #185a9d 90%);", "linear-gradient(90deg, #FC354C 10%, #0ABFBC 90%)",
            "linear-gradient(90deg, #fc00ff 10%, #00dbde 90%)", "linear-gradient(90deg, #FF512F 10%, #DD2476 90%)",
            "linear-gradient(90deg, #E55D87 10%, #5FC3E4 90%)", "linear-gradient(90deg, #348F50 10%, #56B4D3 90%)",
            "linear-gradient(90deg, #FF4E50 10%, #F9D423 90%)", "linear-gradient(90deg, #70e1f5 10%, #ffd194 90%)",
            "linear-gradient(90deg, #134E5E 10%, #71B280 90%)", "linear-gradient(90deg, #D38312 10%, #A83279 90%)",
            "linear-gradient(90deg, #360033 10%, #0b8793 90%)","linear-gradient(90deg, #003973 10%, #E5E5BE 90%)"
        ];

        var selectedColors = "\""+monthColors[monthNumber]+"\"";
        $('.unitCircle').fadeTo('slow', 0.3, function()
        {
            $('.monthName').css("background", selectedColors);
        }).delay(1000).fadeTo('slow', 1);

    }

    function assignMonthBackgroundPhoto(monthNumber){

        var backgroundPhotos = [
            "CSS/Month-Images/january-1.jpg","CSS/Month-Images/february-1.jpg","CSS/Month-Images/march-1.jpg",
            "CSS/Month-Images/april-1.jpg", "CSS/Month-Images/may-1.jpg", "CSS/Month-Images/june-1.jpg",
            "CSS/Month-Images/july-1.jpg", "CSS/Month-Images/august-1.jpg", "CSS/Month-Images/september-1.jpg",
            "CSS/Month-Images/october-1.jpg", "CSS/Month-Images/november-1.jpg","CSS/Month-Images/december-2.jpg"
        ];
        var selectedPhoto = "url(\""+backgroundPhotos[monthNumber]+"\")";
        $('#bodyDiv').fadeTo('slow', 0.3, function()
        {
            $('#bodyDiv').css("background-image", selectedPhoto);
        }).delay(1000).fadeTo('slow', 1);


    }


    MonthMatrix.prototype.populateObjectView = function(){
        convertToMonthMatrix();
        assignDaysToGrid();
        assignMonthName(contextMonth);
        assignMonthBackgroundPhoto(contextMonth);
        assignMonthColors(contextMonth);
    };

};

var GoogleCalendarData = [];

var DayObject = function DayObject(contextYear,contextMonth,contextDay){

    contextDay = contextDay+1;
    var dateSource = new Date(contextYear,contextMonth,contextDay);
    console.log("Creating Day Object");
    console.log(contextYear+" "+contextMonth+" "+contextDay);

    this.nameNum = contextDay;
    this.weekdayNum = dateSource.getDay();
    this.dayName = convertToName(this.weekdayNum);
    this.dayInMonthNum = dateSource.getDate();
    //this.DayData = GoogleCalendarData[contextMonth][this.dayInMonthNum];
    this.DayData = doughnutData;

    console.log(this.dayName);
    console.log("dayInMonthNum "+ this.dayInMonthNum);


    function convertToName(weekdayNum){
        switch(weekdayNum){
            case 0: return "Sunday";
            case 1: return "Monday";
            case 2: return "Tuesday";
            case 3: return "Wednesday";
            case 4: return "Thursday";
            case 5: return "Friday";
            case 6: return "Saturday";
        }
    }
};