const username = $("#logUsername");
const password = $("#logPassword");

$("#loginBtn").click(function () {
  $.ajax({
    url: "/api/login",
    data: {
      username: username.val().trim(),
      password: password.val().trim(),
    },
    method: "POST",
  }).then(function (response) {
    console.log(response)
    //if error, display error
    //if correct login, get request for specific member's id
    $.ajax({
      url: "/client-schedule",
      method: "GET"
    })
  });
});
