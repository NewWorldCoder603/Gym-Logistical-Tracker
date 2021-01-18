$(document).ready(function () {
  const userId = localStorage.getItem("userId");

  $.ajax({
    url: `/api/trainer/${userId}`,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
});
