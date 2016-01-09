var startTime = new Date().getTime();
    var endTime;
    var totalTime;
    
    function updateTime(startTime){
        while(sessionContinue){
            if(chrome.active){
                endTime = new Date().getTime();
                totalTime = endTime - startTime;
                SessionObject.timeSpent = totalTime;
            }
            if(chrome.idle){
                sendToAirtable();
            }
        }
        close();
    }