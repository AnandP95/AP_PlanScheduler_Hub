
 /* This function is used for display current date and  time . */
$(function () {
  function displayCurrentDay() {
    
    
    var rightNow = dayjs().format('MMM DD, YYYY [at] HH:mm:ss a');
    $("#currentDay").text(rightNow);
  }

  /*Set a function for save Button clicked */ 
  function SaveBtnClick(event) {

/* set a parent time block of the clicked save button. */ 
    var timeBlock = $(event.target).closest(".time-block");

    /* set the hour id time block here */ 
    var hourID = timeBlock.attr("id");

    /* set the description text entered */ 
    var description = timeBlock.find(".description").val();


    /* save a hour and event to the local storage */
    localStorage.setItem(hourID, description);

   /* set a alert message when user edit/modify the data  for specific hours. */
    alert("Your schedule event will be saved for " + hourID);

  }



  /* This  function adds appropriate classes to each time block .for the past, present, or future.*/ 
  function BlockHourClasses() {

/* set a current hour using day.js library*/ 
    var currentHour = dayjs().hour();


    /* set a function for each time element.*/ 
    $(".time-block").each(function () {

/*  Extract the schedule time (hour) from the time block ID */ 
      var scheduleTime = parseInt($(this).attr("id").split("-")[1]);
/* Remove the exciting classes to reset the class list */ 
      $(this).removeClass("past present future");


  if (scheduleTime < currentHour) {
  $(this).addClass("past"); } 
  
  else if (scheduleTime === currentHour) {
        $(this).addClass("present");} 
        
  else {
        $(this).addClass("future");}
    });
  }

  /* set a function for retrieve the data form local storage*/ 
  function restoreSavedData() {
    $(".time-block").each(function () {
      var hourID = $(this).attr("id");

      /*Retrieve the saved  data from the local storage .*/ 
      var savedDescription = localStorage.getItem(hourID);
      if (savedDescription) {
        $(this).find(".description").val(savedDescription);
      }
    });
  }

  /* set a initialize here */
  displayCurrentDay();
  BlockHourClasses();
  restoreSavedData();

  $(".saveBtn").click(SaveBtnClick);
});
