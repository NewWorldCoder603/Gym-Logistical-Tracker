$weekDay = document.querySelectorAll(".week-day");
$dateOfYear = document.querySelectorAll(".date-of-year");
date = dayjs().format("dddd");

  //dynamic template



//Dynamically inserts day of week from today to 4 days out
for (i = 0; i < $weekDay.length; i++) {
  dayOfYear = dayjs()
    .add([i + 1], "day")
    .format("dddd");
  $weekDay[i].append(dayOfYear);
}
//Dynamically inserts date from today to 4 days out
for (i = 0; i < $weekDay.length; i++) {
  dayOfYear = dayjs()
    .add([i + 1], "day")
    .format("MMM D");
  $dateOfYear[i].append(dayOfYear);
}

//starter ajax request that populates page with data

// const queryURLSchedule = //insert schedule get endpoint here
const getClasses = () => {
  return $.ajax({
    url: "/api/classes",
    method: "GET",
  }).then(function (data) {
    //grabs the schedule columns for each day of the week to append class template in writePage function
    $mondayDiv = $('.monday-place-holder')
    $tuesdayDiv = $('.tuesday-place-holder')
    $wednesdayDiv = $('.wendesday-place-holder')
    $thursdayDiv = $('.thursday-place-holder')
    $fridayDiv = $('.friday-place-holder')
    $saturdayDiv = $('.saturday-place-holder')
    $sundayDiv = $('.sunday-place-holder')

//forEach that iterates over classes array using writePage function
data.forEach(writePage)

function writePage(item, index){
  console.log(item)
//dynamic template 
  const classTemplate =
`
            <div class="row m-0 pb-3 pt-3 border-to-bottom-thin font-large">
              <div class="col border-teal pb-3 text-center">
                <h4 class="class-title-${item.day} bold text-red">${item.name}</h4>
                <div class="class-time-${item.day}">${item.time}</div>
                <div class="class-trainer-${item.day}">${item.trainer_id} Dave</div>
                <div class="class-spots-left-${item.day}">${item.max_size} </div>
              </div>

              <div class="col border-to-right border-teal d-flex">
                <button
                  type="button"
                  class="btn background-red text-white align-self-center"
                >
                  Join
                </button>
              </div>
            </div>
`
  console.log(item.day)
  switch(item.day) {
    case 'Monday':
      $mondayDiv.append(classTemplate)
      break;
    case 'Tuesday':
      $tuesdayDiv.append(classTemplate)
      break;
      case 'Wednesday':
        $wednesdayDiv.append(classTemplate)
      break;
      case 'Thursday':
        $thursdayDiv.append(classTemplate)
      break;
      case 'Friday':
        $fridayDiv.append(classTemplate)
      break;
      case 'Saturday':
        $saturdayDiv.append(classTemplate)
      break;
      case 'Sunday':
      $sundayDiv.append(classTemplate)
      break;
  }
}
    
  });
};

getClasses()



// /* Ajax to do
// 1. This ajax is set up for a single object, but will actually need to loop an array of objects.
// 2. Add an append statement based off item.day for each object
// 3. Logic that populates organizes/populates schedule by time
// 4. Apply the convert Time function below to change the time that populates on screen
// 5. Logic that exchanges the traienr Id for the trainer's name
// 6. query url schedule needs endpoint added to definition

//from stack overflow at https://stackoverflow.com/questions/4898574/converting-24-hour-time-to-12-hour-time-w-am-pm-using-javascript
// (convertTime) => {
//   //it is pm if hours from 12 onwards
//   suffix = hours >= 12 ? "pm" : "am";

//   //only -12 from hours if it is greater than 12 (if not back at mid night)
//   hours = hours > 12 ? hours - 12 : hours;

//   //if 00 then it is 12 am
//   hours = hours == "00" ? 12 : hours;
