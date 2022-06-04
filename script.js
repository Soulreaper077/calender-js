// this is the start of the main function for the time-blocks 
function block() {
let tDate = $("#currentDay");
let container = $(".container");

    tDate.text(moment().format("dddd, MMMM Do")); // moment.js format to get weekday, month and date
    var workHours = 8; // max number of hours to format for the work day scheduler 
    var startDay = 9; // the workday will start at 9 am 
    // trying to create times 
    for (var hour = startDay; hour <= workHours + startDay; hour ++) {
        var rowEl = document.createElement('div'); // creating an html div element to contain the row 
        rowEl.setAttribute("class", "row time-block"); // row element for time-blocks 
        var hourEl = document.createElement("div"); // div element to contain the hours 
        hourEl.setAttribute("class", "col-sm-1 hour"); 
        var descriptionEl = document.createElement("textarea"); // text area for the hours elements 
        var btnEl = document.createElement("button"); // save button 
        btnEl.setAttribute("class", "col-sm-1 saveBtn");
        //format the times to be from 9 am to 5 pm 
        var timeIndex = hoursFormat(hour); // formatting the hours to be displayed correctly onto the page 
        hourEl.textContent = timeIndex; // format the hours to display in the row 
        console.log(timeIndex);
        if (hour < moment().hour()) { // if less than the current time then it would be in the past 
            descriptionEl.setAttribute("class", "col-sm-10 description past"); // sets the past to white 
        } else if (hour == moment().hour()) { // if equal to that of the current time, than it is in the present 
            descriptionEl.setAttribute("class", "col-sm-10 description present"); // sets the present to red 
        } else { // if neither in the past of the present thn=an it will be future times 
            descriptionEl.setAttribute("class", "col-sm-10 description future"); // sets future times to green 
        } // displaying the the save image on the save button 
        var iconSave = document.createElement("img") 
        iconSave.setAttribute("src", "./images/saveicon.png") // image for save button 
        btnEl.append(iconSave); // pasting the image onto the save button 
        var tempArr = JSON.parse(localStorage.getItem("events"));
        if (tempArr != null) {
            for (let index = 0; index < tempArr.length; index++) {
                if ((hourEl.textContent == tempArr[index].eventTime) && (moment().dayOfYear() == tempArr[index].dayOfYear)) {
                    descriptionEl.textContent = tempArr[index].eventDescription;
                    descriptionEl.setAttribute("id", "saved-item");
                }
            }
        }
        // append the items into the blocks in the correct order 
        rowEl.append(hourEl); // creating the hour element in the row 
        rowEl.append(descriptionEl); // making the text box area for the planner 
        rowEl.append(btnEl); // creating the save button on the row 
        container.append(rowEl); // getting the row onto the container to be displayed 
    }
    return;
}

block(); 