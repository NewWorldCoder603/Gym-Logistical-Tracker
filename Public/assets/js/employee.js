//global variables
const $weekDay = $(".week-day");
const $dateOfYear = $(".date-of-year");
const $weekDayDiv = $(".weekday-placeholder");

//changes timestamp to readable time.
function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

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

//grabs 7 days of the week, updates day and date for each div.
const displayCurrentDate = () => {
  for (i = 0; i < $weekDay.length; i++) {
    //updates day of the week
    const dayofWeek = dayjs()
      .add([i - 1 + 1], "day")
      .format("dddd");

    //appends day onto page
    $weekDay[i].append(dayofWeek);

    //updates date for each day
    const dayOfYear = dayjs()
      .add([i - 1 + 1], "day")
      .format("MMM D");

    //appends date onto page
    $dateOfYear[i].append(dayOfYear);

    //create a timestamp specifically to send back in ajax in api readable format yyyy-MM-DD
    const timestamp = dayjs()
      .add([i - 1 + 1], "day")
      .format("YYYY MM DD");

    //add ajax as a data-attribute to make it easily grabbable
    $dateOfYear[i].setAttribute("data-timestamp", timestamp);

    //deletes the old class
    $weekDayDiv[i].className = "";

    //adds the current day of the week as the new class name. This is how classes will know which div to append to.
    $weekDayDiv[i].classList.add($weekDay[i].innerHTML);
  }
};
displayCurrentDate();

//grab classes from database, then write a dynamic page.
const populateSchedule = () => {
  return $.ajax({
    //grabs user id from local storage(set in login page), then ajax calls for data for classes and that user.
    url: `/api/classes/${localStorage.getItem("userId")}`,
    method: "GET",
  }).then(function (classData) {
    //iterates over each class that comes in from ajax list to populate schedule
    classData.map(function (fitClass) {
      //if statement only creates a delete button if the current trainer is logged in
      if (fitClass.trainer_id === parseInt(localStorage.getItem("userId"))) {
        deleteBtn = `<button
          type="button"
          onclick="deleteClass()"
          class="btn background-red text-white align-self-center join-btn"
          data-id="${fitClass.id}"
          data-joinedClassList="true"
          >
           Delete 
          </button>`;
      } else deleteBtn = "";

      //convert the ajax timestamp into more readable time to display on page.
      const twelveHourTime = tConvert(fitClass.start_time);

      //] template for class with dynamic information
      const classTemplate = `
        <div class="row m-0 pb-3 pt-3 border-to-bottom-thin font-large">
          <div class="col border-teal pb-3 text-center">
            <h4 class="class-title-${fitClass.day} bold text-red">${
        fitClass.class_name
      }</h4>
            <div class="class-time-${fitClass.day}">${twelveHourTime}</div>
            <div class="class-trainer-${fitClass.day}" >${
        fitClass.trainer_name
      }</div>
            <div class="class-spots-left-${fitClass.day}">${
        fitClass.max_size - fitClass.current_size
      } slots </div>
          </div>
          <div class="col border-to-right border-teal d-flex">
          ${deleteBtn}
          </div>
        </div>
`;

      //search the divs for one with a class day that matches the classname, and append to that div.
      function appendtoWeekday() {
        for (i = 0; i < $weekDayDiv.length; i++) {
          if ($weekDayDiv[i].className === fitClass.day) {
            $weekDayDiv.eq(i).append(classTemplate);
          }
        }
      }
      appendtoWeekday();
    });
  });
};

populateSchedule();

//on logout click, let database know, erase user local storage id, redirect back to login page.
$(".logout-btn").click(function () {
  $.ajax({
    url: `/api/member/${window.localStorage.getItem("userId")}`,
    method: "GET",
  }).then(function (data) {
    localStorage.clear();
    window.location.replace("/");
  });
});

//Trainer Ajax grabs data about which trainer is signed in.
function displayTrainerInfo() {
  $.ajax({
    url: `/api/trainer/${localStorage.getItem("userId")}`,
    method: "GET",
  }).then(function (trainerClassInfo) {
    function displayNameGreeting() {
      $trainerNameDiv = $(".trainer-name");

      //grabs just the first name from the full name
      const fullTrainerName = trainerClassInfo[trainerClassInfo.length - 1];
      const splitName = fullTrainerName.split(" ");
      const trainerFirstName = splitName[0];

      //writes Hello and Trainer first name
      $trainerNameDiv.html(`Hello ${trainerFirstName}`);
    }
    displayNameGreeting();

    function displayHowManyClasses() {
      console.log(trainerClassInfo);
      const $numOfClassesDiv = $(".num-classes-taught");

      //minus 1 because last array item is always just trainers name.
      const classNumTaught = trainerClassInfo.length - 1;

      $numOfClassesDiv.html(`<b>${classNumTaught}</b>`);
    }
    displayHowManyClasses();

    function displayTaughtClasses() {
      const $classesTaughtDiv = $(".classes-taught");

      for (let i = 0; i < trainerClassInfo.length - 1; i++) {
        const viewRosterBtn = `<button
      type="button"
      onclick="viewRoster() "
      class="btn align-self-center deleteClassBtn"
      data-id="${trainerClassInfo[i].id}"
      >
      View Roster
      </button>`;
        const readableTime = tConvert(trainerClassInfo[i].start_time);
        const $p = $("<p>");
        $p.attr("class", "trainerClassesDisplay");
        const className = trainerClassInfo[i].class_name;
        const dayOfWeek = trainerClassInfo[i].day;
        const startTime = trainerClassInfo[i].start_time;

        $p.html(
          `-${dayOfWeek}, ${className} at ${readableTime}-${viewRosterBtn}`
        );
        $classesTaughtDiv.append($p);
      }
    }
    displayTaughtClasses();

    //if user is signed up for one class, appends "class", else, appends "classes"
    function isClassesPlural() {
      const $classText = $(".sentence-text-classes");
      //two because the last element in ajax is the trainer name, not a class.
      if (trainerClassInfo.length === 2) {
        $classText.append("class this week");
      } else {
        $classText.append("classes this week");
      }
    }
    isClassesPlural();
  });
}
displayTrainerInfo();

//Not working properly. Perhaps my and dustins tables named differently? Look into this tonight.
const deleteClass = () => {
  const id = parseInt(event.target.getAttribute("data-id"));
  return $.ajax({
    url: `/api/removeClass/${id}`,
    method: "DELETE",
    success: function () {
      console.log("Delete Request Sent");
    },
  });
};

//on logout click, let database know, erase user local storage id, redirect back to login page.
$(".add-class-btn").click(function () {
  console.log("clicked");
  return $.ajax({
    url: "/api/addClass",
    method: "POST",
    data: {
      class_name: "Barbell",
      day: "Monday",
      start_time: '9:00:00',
      current_size: 0,
      max_size: 10,
      trainer_id: 2,
      roster: '',
    },
    success: function () {
      console.log("User removed from Class");
    },
  });
});

function viewRoster(){
  $.ajax({
    url: `/api/trainer/${localStorage.getItem("userId")}`,
    method: "GET",
  }).then(function (trainerClassInfo) {
    function displayNameGreeting() {
}



