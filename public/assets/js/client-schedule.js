const $weekDay = $(".week-day");
const $dateOfYear = $(".date-of-year");
const $weekDayDiv = $(".weekday-placeholder");

//grabs 7 days of the week, updates day, date, and classes based on date.
const setUpDivs = () => {
  for (let i = 0; i < $weekDay.length; i++) {
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
setUpDivs();

//grab classes from database, then write a dynamic page.
const getClasses = () => {
  return $.ajax({
    //grabs user id from local storage(set in login page), then ajax calls for data for classes and that user.
    url: `/api/classes/${localStorage.getItem("userId")}`,
    method: "GET",
  }).then(function (classData) {
    
    $weekDayDiv.empty();
    //function displays member info and what classes they are signed up for.

    const displayMemberInfo = () => {
      //grab divs in Member area
      const $memberName = $(".member-name");
      const $numberOfClassesTakenDiv = $(".number-of-classes-taken");
      const $classesTakenDiv = $(".classes-taken");

      //create variables that hold member info
      function writeUserName() {
            //.replace borrowed from https://www.digitalocean.com/community/tutorials/js-capitalizing-strings
        const membersName = `Hello ${classData[0].userName.replace(/^\w/, (c) =>
          c.toUpperCase()
        )}`;
        const numOfClassesTaken = `<b>${classData[0].classJoined.length}</b>`;

        $memberName.html(membersName);
        $numberOfClassesTakenDiv.html(numOfClassesTaken);
      }
      writeUserName();

      //takes each class the user is signed up for, then appends that class info to user info page
      function writeUsersClasses() {
        $classesTakenDiv.empty();
        const numOfClassesTaken = `${classData[0].classJoined.length}`;
        for (let i = 0; i < numOfClassesTaken; i++) {
          const className = classData[i].classJoined[i].class_name;
          const startTime = tConvert(classData[i].start_time);
          const trainerName = classData[i].trainer_name;
          const dayOfClass = classData[i].day;
          const $p = $("<p>");

          $p.html(
            `-${dayOfClass}, ${className} at ${startTime} with ${trainerName}-`
          );
          $classesTakenDiv.append($p);
        }
      }
      writeUsersClasses();

      //if user is signed up for one class, appends "class", else, appends "classes"
      function isClassesPlural() {
        const $classText = $(".sentence-text-classes");
        //empties class text so it doesn't repeat during recursive
        $classText.empty();

        if (classData[0].classJoined.length === 1) {
          $classText.append("class this week");
        } else {
          $classText.append("classes this week");
        }
      }
      isClassesPlural();
    };
    displayMemberInfo();

    const populateSchedule = () => {
      //iterates over each class that comes in from ajax list to populate schedule
      classData.map(function (fitClass) {
        //variable asking is the user enrolled in the current class
        let isEnrolled;

        //if the user is signed up for no classes, assign isEnrolled to False for each class.
        if (fitClass.classJoined.length === 0) {
          isEnrolled = false;
        }

        //check each class fit class id against ClassJoined Ids to see if the user joined this specific class
        for (let i = 0; i < fitClass.classJoined.length; i++) {
          if (fitClass.classJoined[i].id === fitClass.id) {
            isEnrolled = true;
            break;
          } else {
            isEnrolled = false;
          }
        }
        let joinOrRemoveBtn;

        //if class is full and member has not joined, say "class full"
        if (
          isEnrolled === false &&
          fitClass.max_size - fitClass.current_size === 0
        ) {
          joinOrRemoveBtn =
            "<p class= 'align-self-center text-red'>Class Full</p>";
        }
        //if class is not full and member has not joined, create a join button
        else if (isEnrolled === false) {
          joinOrRemoveBtn = `<button
          type="button"
          
          class="btn background-red text-white align-self-center join-btn"
          data-id="${fitClass.id}"
          data-joinedClassList="false"
          >
          Join
          </button>`;

          //if member has joined, regardless of if class is full, create a remove button
        } else {
          joinOrRemoveBtn = `<button
          type="button"
          class="btn background-red text-white align-self-center remove-btn"
          data-id="${fitClass.id}"
          data-joinedClassList="true"
          >
          Remove
          </button>`;
        }

        //if the user is enrolled, button will be a remove Button

        //convert the ajax timestamp into more readable time to display on page.
        const twelveHourTime = tConvert(fitClass.start_time);

        //dynamic template that inserts ajax response fitClasss into html
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
        } slots left </div>
          </div>
          <div class="col border-to-right border-teal d-flex">
          ${joinOrRemoveBtn}
          </div>
        </div>
`;

        //search the divs for one with a class day that matches the classname, and append to that div.
        for (let i = 0; i < $weekDayDiv.length; i++) {
          if ($weekDayDiv[i].className === fitClass.day) {
            $weekDayDiv.eq(i).append(classTemplate);
          }
        }
      });
    };
    populateSchedule();
  });
};

getClasses();

//changes timestamp to readable time.
//https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no
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

//  tells the database the user has signed up for the class, and adds their to 'roster' in backend.
$(document.body).on("click", ".join-btn", function () {
  //grabs classId

  const classId = $(this).attr("data-id");

  //grab classDate from div's class name.
  const classDate = $(this)
    .parent()
    .parent()
    .parent()
    .parent()
    .find("p")
    .attr("data-timestamp");

  //grab memberId from local storage
  const memberId = localStorage.getItem("userId");

  //sends all three to back end to add use to class.
  return $.ajax({
    url: "/api/addToClass",
    method: "POST",
    data: {
      id: classId,
      date: classDate,
      memberid: memberId,
    },
    success: function () {
      console.log("success");
      //repopulates user data, then repopulates schedule data with updated info
      getClasses();
    },
  });
});

//remove user from a particular class when remove button is clicked

$(document.body).on("click", ".remove-btn", function () {
  const classId = $(this).attr("data-id");
  const classDate = $(this)
    .parent()
    .parent()
    .parent()
    .parent()
    .find("p")
    .attr("data-timestamp");

  //grab memberId from local storage
  const memberId = localStorage.getItem("userId");

  return $.ajax({
    url: "/api/removeFromClass",
    method: "POST",

    data: {
      id: classId,
      date: classDate,
      memberid: memberId,
    },
    success: function () {
      console.log("User removed from Class");
      //repopulates user data, then repopulates schedule data with updated info
      getClasses();
    },
  });
});
