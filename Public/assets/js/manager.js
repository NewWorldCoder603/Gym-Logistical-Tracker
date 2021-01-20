//hire trainer variables
const email = $("#inputEmail");
const password = $("#inputPassword");
const firstName = $("#firstName");
const lastName = $("#lastName");
const birthday = $("#inputBirthday");
const gender = $("#inputGender");
const phone = $("#inputPhone");
const role = $("#inputRole");
//trainer list variables
const trainerList = $(".trainerNameList");

loadTrainers();

//Get trainer list on page load.
function loadTrainers() {
  $.ajax({
    url: `/api/manager/trainers`,
    method: "GET",
  }).then(function (trainerNames) {
    // $(trainerList).empty();
    console.log(trainerNames);
    for (let i = 0; i < trainerNames.length; i++) {
      const firstName = trainerNames[i].first_name;
      const lastName = trainerNames[i].last_name;
      const trainerId = trainerNames[i].id;
      $(trainerList).append(`
        <li class="me-5 d-flex float-left text-white" data-id= ${trainerId}">${firstName} ${lastName} <button type="button" class="btn darkBtn d-flex float-right ms-5 mb-3 viewBtn">View</button></li>`);
    }
  });
}
//View button sends individual trainer's information to the right hand box.
// $("body").on("click", ".viewBtn", function () {
//   $.ajax({
//     url: `/api/manager/trainers`,
//     method: "GET",
//   }).then(function (trainerInfo) {
//     console.log(trainerInfo);
//   });
// });

//submit button listener for hire new trainer
$("body").on("click", "#hireBtn", function () {
  $.ajax({
    url: "/api/manager/addTrainer/",
    data: {
      email: email.val().trim(),
      password: password.val().trim(),
      first_name: firstName.val().trim(),
      last_name: lastName.val().trim(),
      gender: gender.val().trim(),
      phone: phone.val().trim(),
      role: role.val().trim(),
    },
    method: "POST",

    error: function (req, status, err) {
      if (err) alertModal(err);
    },
  }).then(function (response) {
    console.log(response);
    //If sign-up goes through, refresh manager page
    window.location.href = "/manager";
  });
});

//function to display Alert Modal on login error
function alertModal(title, body) {
  // Display error message to the user in a modal
  $("#alert-modal-title").html(title);
  $("#alert-modal-body").html(body);
  $("#alert-modal").modal("show");
}

//Close modal on close button click
$(".modalBtn").click(function () {
  $("#alert-modal").modal("hide");
});
