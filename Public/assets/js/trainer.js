$.ajax({
  url: "/api/trainer",
  method: "GET",
  error: function (req, status, err) {
    if (err) console.log(status);
  },
}).then(function (response) {
  console.log(response);
});
