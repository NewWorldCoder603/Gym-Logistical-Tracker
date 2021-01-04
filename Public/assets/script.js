const userName = $("#username");
const password = $("#password");

$("#login").click(function () {
  $.ajax({
    url: "/api/login",
    data: {
      userName: userName.val(),
      password: password.val(),
    },
    method: "POST",
  }).then(function (response) {
    console.log(response);
  });
});
