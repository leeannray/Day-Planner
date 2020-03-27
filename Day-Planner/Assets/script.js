// assigns element with Id of currentDay (where current date will be displayed) to be filled by current date to variable now
var now = document.getElementById("currentDay");
var currentDate = moment().format("ddd, MMM Do, YYYY hh:mm a");
currentDate = now.textcontent;

//Display current time at top of planner that is updated when page loads
$(document).ready(function () {
    $("#currentDay").text(moment().format('ddd MMM Do, YYYY hh:mm A'));
    });

    //call functions to initiate color changes, local storage retrieval and input text
    colorInputs();
    btnClickEvent();
    getTextAreaValues();


// changes color of time slots based on current time. Current hour assigned to variable using moment.get(hour)
function colorInputs() {
    //retrieve current hour
    let thisHour = moment().get('hour');
    // for each time-block dataset of columns starting at index 0 parsing the integer and comparing with current hour. If less than, class "past" added to the element with class time-block; if greater than class of past, and present are removed and future is added. If hour is same as current hour class of present added to element. See CSS for class effects. **must edit as could not get disabled property to work
    $('.time-block').each(function () {
        let timeDiv = $(this);
        let divHour = timeDiv[0].dataset.columns;
        let blockHouse = parseInt(divHour);
        if (blockHouse < thisHour) {
            $(this).addClass("past");
            $(this).prop('disabled', true);

        }
        else if (blockHouse === thisHour) {
            $(this).removeClass("past");
            $(this).addClass("present");
        }
        else {
            $(this).removeClass("past");
            $(this).removeClass("present");
            $(this).addClass("future");
            $(this).prop('disabled', false);
        }
    });

};

// calls function to save time and user input value when save button pressed by using ID of parent element and value of sibling (description) (specific to each time slot)
function btnClickEvent() {

    $(".saveBtn").on("click", function () {
        // retrieve values for each "sibling" (description or user input) and assigns "id" attribute of "parent" (associated time (ex. 9AM))
        var value = $(this).siblings(".description").val();
        var time = $(this).parent().attr("id");

        // save in localStorage
        localStorage.setItem(time, value);
        alert("SAVED!");
    });


    // clears local storage and any previous user input when delete button pressed by same method as above but instead of storing the information, localstorage is cleared. The getTextAreaValues fxn is then called to clear text area box for each time slot (**must edit as it currently clears all localstorage)

    $(".deleteBtn").on("click", function () {
        var value = $(this).siblings(".description").val();
        var time = $(this).parent().attr("id");

        // clears localStorage
        localStorage.clear();
        getTextAreaValues();
        alert("DELETED!");
    });
};

// call function to retrieve stored input from user and populate text box so when page refreshes, stored event/text is not deleted from textarea; retrieve input value from local storage using ID then populate "value" of textarea specific to time slot

function getTextAreaValues() {

    $("#8AM .description").val(localStorage.getItem("8AM"));
    $("#9AM .description").val(localStorage.getItem("9AM"));
    $("#10AM .description").val(localStorage.getItem("10AM"));
    $("#11AM .description").val(localStorage.getItem("11AM"));
    $("#12PM .description").val(localStorage.getItem("12PM"));
    $("#13PM .description").val(localStorage.getItem("13PM"));
    $("14PM .description").val(localStorage.getItem("14PM"));
    $("15PM .description").val(localStorage.getItem("15PM"));
    $("16PM .description").val(localStorage.getItem("16PM"));
    $("17PM .description").val(localStorage.getItem("17PM"));
}
