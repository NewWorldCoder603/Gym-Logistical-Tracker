const email = $("#inputEmail");
const password = $("#inputPassword");
const firstName = $("#firstName");
const lastName = $("#lastName");
const birthday = $("#inputBirthday");
const gender = $("#inputGender");
const phone = $("#inputPhone");

$("body").on("click", "#submitRegistration", function () {
  $.ajax({
    url: "/api/register/",
    data: {
      userName: email.val().trim(),
      password: password.val().trim(),
      first_name: firstName.val().trim(),
      last_name: lastName.val().trim(),
      date_of_birth: birthday.val().trim(),
      gender: gender.val().trim(),
      //do I still need email if it's already the username?
      phone: phone.val().trim(),
    },
    method: "POST",

    error: function (req, status, err) {
      if (err) alertModal(err);
    },
  }).then(function (response) {
    console.log(response);
    //If sign-up goes through, get request for specific member's id
    localStorage.setItem("userId", response.id);
    window.location.replace("/client-schedule");
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
// $("body").on("click", ".modalBtn, function() {
//   ")
