$weekDay = document.querySelectorAll(".week-day");
$dateOfYear = document.querySelectorAll(".date-of-year");
date = dayjs().format("dddd");

//uses day.js to write in day of week and date for each column
for (i = 0; i < $weekDay.length; i++) {
  //updates day of the week
  dayOfYear = dayjs()
    .add([i + 1], "day")
    .format("dddd");
  $weekDay[i].append(dayOfYear);

  //updates date for each day
  dayOfYear = dayjs()
    .add([i + 1], "day")
    .format("MMM D");
  $dateOfYear[i].append(dayOfYear);
}

//grabs class data from database, then dynamically writes schedule page
const getClasses = () => {
  return $.ajax({
    url: `/api/classes/${window.localStorage.getItem(
      "userId"
    )}`,
    method: "GET",
  }).then(function (data) {
    //forEach that iterates over database data and populates page with each instance
    data.forEach(writeSchedule);
    console.log(data);
  });
};

function writeSchedule(item) {
  //changes format of the 24 hour time to 12 hour time from database to 12 hour time displayed on schedules
  const twelveHourTime = tConvert(item.time);
  //dynamic template
  const classTemplate = `
            <div class="row m-0 pb-3 pt-3 border-to-bottom-thin font-large border-to-right mb-3">
              <div class="col border-teal pb-3 text-center">
                <h4 class="class-title-${item.day} text-red">${item.name}</h4>
                <div class="class-time-${item.day}">${twelveHourTime}</div>
                <div class="class-trainer-${item.day}">${item.trainer_id} Dave</div>
                <div class="class-spots-left-${item.day}">${item.max_size} </div>
              </div>

              <div class="col border-teal d-flex">
                <button
                  type="button"
                  class="btn background-red text-white align-self-center"
                >
                  Join
                </button>
              </div>
            </div>
`;
  //switch statement checks each class instance for which day it should appear in then appends it to schedule page
  switch (item.day) {
    case "Monday":
      $mondayDiv.append(classTemplate);
      break;
    case "Tuesday":
      $tuesdayDiv.append(classTemplate);
      break;
    case "Wednesday":
      $wednesdayDiv.append(classTemplate);
      break;
    case "Thursday":
      $thursdayDiv.append(classTemplate);
      break;
    case "Friday":
      $fridayDiv.append(classTemplate);
      break;
    case "Saturday":
      $saturdayDiv.append(classTemplate);
      break;
    case "Sunday":
      $sundayDiv.append(classTemplate);
      break;
  }
}

getClasses();

//this function grabs data from api, formats it, then appends it to the page as the schedule
function writeSchedule(item) {
  //grabs the schedule columns for each day of the week to append class template in writeSchedule function
  $mondayDiv = $(".monday-place-holder");
  $tuesdayDiv = $(".tuesday-place-holder");
  $wednesdayDiv = $(".wendesday-place-holder");
  $thursdayDiv = $(".thursday-place-holder");
  $fridayDiv = $(".friday-place-holder");
  $saturdayDiv = $(".saturday-place-holder");
  $sundayDiv = $(".sunday-place-holder");

  //changes format of the 24 hour time to 12 hour time from database to 12 hour time displayed on schedules
  const twelveHourTime = tConvert(item.time);

  //dynamic template
  const classTemplate = `
        <div class="row m-0 pb-3 pt-3 border-to-bottom-thin font-large">
          <div class="col border-teal pb-3 text-center">
            <h4 class="class-title-${item.day} bold text-red">${item.name}</h4>
            <div class="class-time-${item.day}">${twelveHourTime}</div>
            <div class="class-trainer-${item.day}" style="font-size:.9em;">${item.first_name} ${item.last_name}</div>
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

  //switch statement checks each class instance for which day it should appear in then appends it to schedule page
  switch (item.day) {
    case "Monday":
      $mondayDiv.append(classTemplate);
      break;
    case "Tuesday":
      $tuesdayDiv.append(classTemplate);
      break;
    case "Wednesday":
      $wednesdayDiv.append(classTemplate);
      break;
    case "Thursday":
      $thursdayDiv.append(classTemplate);
      break;
    case "Friday":
      $fridayDiv.append(classTemplate);
      break;
    case "Saturday":
      $saturdayDiv.append(classTemplate);
      break;
    case "Sunday":
      $sundayDiv.append(classTemplate);
      break;
  }
}

//function that changes 24 hour time to 12 hour time. (DB time is 24 hour but we want 12 hour population of page.)
//altered from https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no
function tConvert(time) {
  // Check correct time format and split into components
  time = time
    .toString()
    .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
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

  return time.join(""); // return adjusted time or original string
}

// SECTION  for updating classes

//Adds the current user's Id to the selected class roster
const addToClass = () => {
  return $.ajax({
    url: "/api/addToClass",
    data: {
      member_id: window.localStorage.getItem("userId"),
      class_id: variableNeeded, //Variable from button clicked should be the class id
    },
    method: "POST",
  }).then(function (results) {
    console.log(results);
  });
};

//SECTION for user log in

const removeFromClass = (classId) => {
  return $.ajax({
    url: "/api/removeFromClass",
    data: {
      member_id: window.localStorage.getItem("userId"),
      class_id: variableNeeded, //Variable from button clicked should be the class id
    },
    method: "POST",
  }).then(function (results) {
    console.log(results);
  });
};

//add logout ajax here
