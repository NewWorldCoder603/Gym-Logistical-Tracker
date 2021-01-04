$("#login").click(function () {
  console.log("clicked");
  $.ajax({
    url: "/api/login",
    method: "POST",
  }).then(function (data) {
    console.log(JSON.stringify(data));
  });
});
