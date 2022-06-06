
//creating a function to display whether the hour be pm or am 
function hoursFormat(hour) {
    var timeOfDay= "";
    if (hour > 11) { // anything past 12 will be considered to be pm 
        if (hour == 12) {
            hour = 12; 
            timeOfDay = "pm";
        } else { // converts military time 13 - 24 into pm times 1-12
            hour -= 12; // subtracts 12 from anything after the 13 hour 
            timeOfDay = "pm";
        } }else{ // anything else with be converted to be am 
        timeOfDay = "am";
    } 
    hour = hour + timeOfDay; 
    return hour; 
}
// this is the start of the main function for the time-blocks 
let tDate = $("#currentDay");
let container = $(".container");

function block() {
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
        var saveIcon = document.createElement("img") 
        saveIcon.setAttribute("src", "./images/saveicon.png") // image for save button 
        btnEl.append(saveIcon); // pasting the image onto the save button 
        // append the items into the blocks in the correct order 
        rowEl.append(hourEl); // creating the hour element in the row 
        rowEl.append(descriptionEl); // making the text box area for the planner 
        rowEl.append(btnEl); // creating the save button on the row 
        container.append(rowEl); // getting the row onto the container to be displayed 
    }
        return; 
    }
    var loadTasks = function () { // function to call on saved tasks and get them to stay 
        let tasks = JSON.parse(localStorage,getItem("tasks")); // get item function 
        // if nothing is in local storage yet 
        if (!tasks) { // if no tasks then create an empty array 
            tasks = [{ // variables for the empty array 
                dayOfYear: moment().dayOfYear(),
                eventTime: event.target.parentElement.firstChild.textContent,
                eventDescription: event.target.parentElement.children[1].value,
            }];
        }else {
            tasks = JSON.parse(localStorage.getItem("tasks"));
        }
        newArr = {
            dayOfYear:moment().dayOfYear(),
            eventTime: event.target.parentElement.firstChild.textContent,
            eventDescription: event.target.parentElement.children[1].value,
        }
    var saveTasks = function() { // function to save input tasks on the screen 
        localStorage.setItem("tasks", JSON.stringify(tasks)); // set item function 
        tasks.push(newArr); 
    }; 
    function execute() { // function for button click to save to the page 
    $(".saveBtn").click (function() { // calling on the save button to be clicked 
        saveTasks(); // call on the save tasks function from before 
        alert("clicked me"); 
    })
    }
    execute(); // saving the content 
}
block(); // displaying the rows on time 







