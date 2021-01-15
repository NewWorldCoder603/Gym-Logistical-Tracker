const username = $("#logUsername");
const password = $("#logPassword");

//Send username and password as a post request to check if it matches what is on file in database.
$("body").on("click", "#loginBtn", function () {
  $.ajax({
    url: "/api/login/",
    data: {
      username: username.val().trim(),
      password: password.val().trim(),
    },
    method: "POST",
    //Show alert modal on login failure
    error: function (req, status, err) {
      if (err) alertModal();
    },
  }).then(function (response) {
    console.log(response);

    //if correct login, set user id to local storage, and redirect to client schedule page.
    localStorage.setItem("userId", response.id);
    window.location.replace("/client-schedule");
  });
});

//Send user to registration page on click of Get Started button
$("body").on("click", "#getStartedBtn", function () {
  window.location.replace("/register");
});

//function to display Alert Modal on login error - Code credit:  https://gist.github.com/billmei/2e9d11ff732b1ea6916f (lines 31-37)
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
