$(".hireBtn").click(function () {
  $.ajax({
    url: `/api/member/${window.localStorage.getItem("userId")}`,
    method: "GET",
  }).then(function (data) {
    console.log(data);
    console.log("hello");
    localStorage.clear();
    window.location.replace("/");
  });
});

//   //Clear trails list at start of each search so that results don't stack. - SM
//   $('#trailResults').empty();

//   //Set trail information variables for ajax call and create for loop - SM
//   for (let i = 0; i < response.trails.length; i++) {
//     let trailName = response.trails[i].name;
//     let trailLocation = response.trails[i].location;
//     let trailSummary = response.trails[i].summary;
//     let trailDifficulty = response.trails[i].difficulty;

//     console.log(response.trails[i].name);

//     //Populate trail information list on page. -SM and TW
//     $("#trailResults").append(`<div class="trailListResults">
//     <div class="left-align">
//     <a class=" trailButton waves-effect waves-light btn-small">${trailName}</a>
//     </div>
//     <div id="trailLocation" class="left-align trailData">
//       <b>Location:</b> ${trailLocation}
//     </div>

//     <div id="trailSummary" class="left-align trailData">
//       <b>Summary:</b> ${trailSummary}
//     </div>

//     <div id="trailRating" class="left-align trailData">
//       <b>Difficulty:</b> ${trailDifficulty}
//     </div>`);
//   }
