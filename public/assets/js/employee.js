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
  $weekDayDiv.empty();
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
          onclick="deleteClass(), populateSchedule()"
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
    url: `/api/employee/logout/${window.localStorage.getItem("userId")}`,
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
$(".add-class-form-btn").click(function () {
  const rosterOrClassDiv = $(".roster-or-addClass");
  rosterOrClassDiv.empty();

  addClassTemplate = `<div class = "card p-3 mt-5 mb-5">
  <div class="card-header"> Add Class</div>
  <form id="class_form" class="row g-3">
      <div class="row g-3">
          <div class="col">
          <label for="inputClassName" class="form-label">Class Name*</label>
          <input type="text" id="inputClassName" class="form-control" placeholder="Class Name" aria-label="Class name" required>
          </div>
          <div class="col">
          <label for="inputWeekday" class="form-label">Weekday</label>
          <select id="inputWeekDay" class="form-select">
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
          </select>
          </div>
      </div>
      <div class="row g-3">
          <div class="col">
          <label for="inputStartTime" class="form-label">Class Start Time</label>
          <select id="inputStartTime" class="form-select">
              <option>06:00:00</option>
              <option>07:00:00</option>
              <option>08:00:00</option>
              <option>09:00:00</option>
              <option>10:00:00</option>
              <option>11:00:00</option>
              <option>12:00:00</option>
              <option>13:00:00</option>
              <option>14:00:00</option>
              <option>15:00:00</option>
              <option>16:00:00</option>
              <option>17:00:00</option>
              <option>18:00:00</option>
          </select>
          </div>
          <div class="col">
          <label for="inputMaxSize" class="form-label">Max Class Size</label>
          <select id="inputMaxSize" class="form-select">
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
              <option>16</option>
              <option>17</option>
              <option>18</option>
              <option>19</option>
              <option>20</option>
          </select>
          </div>
      </div>
      <div class="col-8"></div>
      <div class="col-4">
          <button onclick= "createClass()" type="button" class="btn btn-danger mt-3">Create Class</button>
      </div>
  </form>
</div>
</div>`;
  rosterOrClassDiv.append(addClassTemplate);
});


function createClass() {
  const formElem = document.getElementById("class_form");
  // checks for form validation and sends an ajax call only when form fields are valid
  const checkValid = formElem.checkValidity();
  if(checkValid){
    const $inputClassName = $('#inputClassName').val()
    const $inputWeekDay = $('#inputWeekDay').val()
    const $inputStartTime = $('#inputStartTime').val()
    const $inputMaxSize = $('#inputMaxSize').val()
    const userId = localStorage.getItem('userId')

    return $.ajax({
      url: "/api/addClass",
      method: "POST",
      data: {
        class_name: $inputClassName,
        day: $inputWeekDay,
        start_time: $inputStartTime,
        current_size: 0,
        max_size: $inputMaxSize,
        trainer_id: userId,
        roster: "",
      },
      success: function () {
        console.log("class added");
        populateSchedule()
      },
    });
  } else{
  // when form invalid, prevents submission and focuses into the 1st invalid field
  document.querySelector('input:invalid').reportValidity();
  document.querySelector('input:invalid').focus();
  };
};

function viewRoster() {
  const classId = event.target.getAttribute("data-id");
  $.ajax({
    url: `/api/roster/${classId}`,
    method: "GET",
  }).then(function (classRoster) {
    function writeRoster() {
      $rosterList = $(".displayPage");

      //empty out any previous list items
      $rosterList.empty();

      //if the class is empty, display no one has signed up for the class
      if (classRoster.length === 1) {
        listItemTeamplate = `<li class="list-group-item">No members signed up yet </li>`;
        $rosterList.append(listItemTeamplate);
      }
      //otherwise, display each member who signed up for the class
      else {
        for (let i = 0; i < classRoster.length - 1; i++) {
          console.log(i);
          listItemTeamplate = `<li class="list-group-item">${i + 1}.   ${
            classRoster[i]
          } </li>`;
          $rosterList.append(listItemTeamplate);
        }
      }
    }
    writeRoster();
  });
}
