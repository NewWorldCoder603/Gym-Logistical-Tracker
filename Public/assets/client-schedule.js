$weekDay = document.querySelectorAll(".week-day");
$dateOfYear = document.querySelectorAll(".date-of-year");
date = dayjs().format("dddd");

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
