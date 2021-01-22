const email = $("#inputEmail");
const password = $("#inputPassword");
const firstName = $("#firstName");
const lastName = $("#lastName");
const birthday = $("#inputBirthday");
const gender = $("#inputGender");
const phone = $("#inputPhone");

$("body").on("click", "#submitRegistration", function () {
  const formElem = document.getElementById("register_form");
  // checks for form validation and sends an ajax call only when form fields are valid
  const checkValid = formElem.checkValidity();
  if (checkValid) {
    $.ajax({
      url: "/api/register/",
      data: {
        userName: email.val().trim(),
        password: password.val().trim(),
        first_name: firstName.val().trim(),
        last_name: lastName.val().trim(),
        date_of_birth: birthday.val().trim(),
        gender: gender.val().trim(),
        phone: phone.val().trim(),
      },
      method: "POST",

      error: function (req, status, err) {
        if (err) alertModal("Error", req.responseJSON.error);
      },
    }).then(function (response) {
      //If sign-up goes through, get request for specific member's id
      localStorage.setItem("userId", response.id);
      window.location.assign("/client-schedule");
    });
  } else {
    // when form invalid, prevents submission and focuses into the 1st invalid field
    document.querySelector("input:invalid").reportValidity();
    document.querySelector("input:invalid").focus();
  }
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
