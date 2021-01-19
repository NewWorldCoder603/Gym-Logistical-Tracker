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

//Get trainer list on page load.
$("body").on("click", "#testBtn", function () {
  $.ajax({
    url: `/api/manager/trainers`,
    method: "GET",
  }).then(function (trainerNames) {
    // $(trainerList).empty();
    console.log(trainerNames);
    function loadTrainers() {
      for (let i = 0; i < trainerNames.length; i++) {
        console.log(trainerNames.first_name);
        const firstName = trainerNames.first_name;
        const lastName = trainerNames.last_name;
        $(trainerList).append(`<ul style="list-style-type:none;">
    <li class="me-5 float-left text-white">${firstName}${lastName} </li>
    <button type="button" class="btn darkBtn d-flex float-right ms-5 mb-3">View</button>
    </ul>  `);
      }
    }
    loadTrainers();
  });
});

//submit button listener for hire new trainer
$("body").on("click", "#hireBtn", function () {
  $.ajax({
    url: "/api/manager/addTrainer/",
    data: {
      email: email.val().trim(),
      password: password.val().trim(),
      first_name: firstName.val().trim(),
      last_name: lastName.val().trim(),
      date_of_birth: birthday.val().trim(),
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
    window.location.href("/manager");
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
