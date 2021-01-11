const username = $("#logUsername");
const password = $("#logPassword");

$("body").on("click", "#loginBtn", function () {
  $.ajax({
    url: "/api/login/",
    data: {
      username: username.val().trim(),
      password: password.val().trim(),
    },
    method: "POST",

    error: function (req, status, err) {
      if (err) throw err;
    },
  }).then(function (response) {
    console.log(response);
    // if (!err) {
    //if correct login, set user id to local storage, and redirect to client schedule page.
    localStorage.setItem("userId", response.id);
    window.location.replace("/client-schedule");
    // } else if (response.is_logged_in === false) {
    //   return "Username / Password combination does not match our records.";
    // }
  });
});

$("body").on("click", "#getStartedBtn", function () {
  window.location.replace("/register");
});
