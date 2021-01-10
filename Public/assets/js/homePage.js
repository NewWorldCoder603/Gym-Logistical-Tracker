const userName = $("#logUsername");
const password = $("#logPassword");

$("body").on("click", "#loginBtn", function () {
  console.log("click");
  $.ajax({
    url: "/api/login/",
    data: {
      userName: userName.val().trim(),
      password: password.val().trim(),
    },
    method: "POST",
  }).then(function (response) {
    console.log(response);
    //if error, display error
    //if correct login, get request for specific member's id
    $.ajax({
      url: "/api/client-schedule/",
      method: "GET",
    });
  });
});
