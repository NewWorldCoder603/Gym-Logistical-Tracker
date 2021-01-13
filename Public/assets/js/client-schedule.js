$(document).ready(function () {
  $weekDay = $(".week-day");
  $dateOfYear = $(".date-of-year");
  date = dayjs().format("dddd");
  $weekDayPlaceholder = $(".weekday-placeholder");

  //grabs class data from database, then dynamically writes schedule page

  //revisit this at some later date
  const getClasses = () => {
    for (i = 0; i < $weekDay.length; i++) {
      //updates day of the week
      dayofWeek = dayjs()
        .add([i - 1 + 1], "day")
        .format("dddd");
      $weekDay[i].append(dayofWeek);

      //updates date for each day
      dayOfYear = dayjs()
        .add([i - 1 + 1], "day")
        .format("MMM D");
      $dateOfYear[i].append(dayOfYear);

      //erases old classNames and adds current day of week as div classname. This will be used as a
      //reference later on to know which div to add each class to.
      $weekDayPlaceholder[i].className = "";
      $weekDayPlaceholder[i].classList.add($weekDay[i].innerHTML);
    }

    return $.ajax({
      url: `/api/classes/${window.localStorage.getItem("userId")}`,
      data: {
        id: localStorage.getItem("userId"),
      },
      method: "GET",
    }).then(function (classData) {
      //gras every class from ajax request and iterates over it
      classData.map(function (item) {
        //changes the incoming ajax timestamp to readable 12 hour time.
        const twelveHourTime = tConvert(item.start_time);

        //dynamic template that inserts ajax response items into html
        const classTemplate = `
        <div class="row m-0 pb-3 pt-3 border-to-bottom-thin font-large">
          <div class="col border-teal pb-3 text-center">
            <h4 class="class-title-${item.day} bold text-red">${item.class_name}</h4>
            <div class="class-time-${item.day}">${twelveHourTime}</div>
            <div class="class-trainer-${item.day}" style="font-size:.9em;">${item.trainer_name}</div>
            <div class="class-spots-left-${item.day}">${item.max_size} slots </div>
          </div>

          <div class="col border-to-right border-teal d-flex">
            <button
              type="button"
              class="btn background-red text-white align-self-center">
              Join
            </button>
          </div>
        </div>
`;

        //Above, each weekday div had its class matched to the dayjs() day of the week. If the ajax gym classes "day" matches
        //the day of the week, then the class is appended into that div.

        for (i = 0; i < $weekDayPlaceholder.length; i++) {
          if ($weekDayPlaceholder[i].className === item.day) {
            $weekDayPlaceholder.eq(i).append(classTemplate);
          }
        }
      });
    });
  };

  getClasses();

  //changes timestamp to readable time.
  //altered from https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no
  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    //my added part to get rid of last two 00's (Ethan W)
    time.splice(1, 3);
    time.splice(2, 0, " ");
    // return adjusted time or original string
    return time.join("");
  }

  // SECTION  for updating classes

  //Adds the current user's Id to the selected class roster
  const addToClass = () => {
    return $.ajax({
      url: "/api/addToClass",
      method: "POST",
      //We will need to send the data like this.
      // data:{
      //   id:class-id,
      //   date:date,
      //   memberid
      // }
    });
  };

  //SECTION for user log in

  //add removeFromClass ajax here

  //add logout ajax here

  //when the logout button is clicked,
  //send an ajax to tell the database they are logged out,
  //erase their local storage id,
  //redirect user back to login page
  $(".logout-btn").click(function () {
    $.ajax({
      url: `/api/member/${window.localStorage.getItem("userId")}`,
      method: "GET",
    }).then(function () {
      localStorage.clear();
      window.location.replace("/");
    });
  });
});
