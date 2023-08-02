$(function () {
  function displayCurrentDay() {
    
    
    var rightNow = dayjs().format('MMM DD, YYYY [at] HH:mm:ss a');
    $("#currentDay").text(rightNow);
  }

  function SaveBtnClick(event) {


    var timeBlock = $(event.target).closest(".time-block");

    var hourID = timeBlock.attr("id");

    var description = timeBlock.find(".description").val();

    localStorage.setItem(hourID, description);


    alert("Your schedule event will be saved for " + hourID);

  }



  function BlockHourClasses() {


    var currentHour = dayjs().hour();

    $(".time-block").each(function () {


      var scheduleTime = parseInt($(this).attr("id").split("-")[1]);

      $(this).removeClass("past present future");

  if (scheduleTime < currentHour) {
  $(this).addClass("past"); } 
  
  else if (scheduleTime === currentHour) {
        $(this).addClass("present");} 
        
  else {
        $(this).addClass("future");}
    });
  }

  function restoreSavedData() {
    $(".time-block").each(function () {
      var hourID = $(this).attr("id");
      var savedDescription = localStorage.getItem(hourID);
      if (savedDescription) {
        $(this).find(".description").val(savedDescription);
      }
    });
  }

  displayCurrentDay();
  BlockHourClasses();
  restoreSavedData();

  $(".saveBtn").click(SaveBtnClick);
});
