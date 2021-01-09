const userName = $("#logUsername");
const password = $("#logPassword");

let userId = 0
$("#loginBtn").click(function () {
  //post request
  $.ajax({
    url: "/api/login",
    data: {
      userName: userName.val().trim(),
      password: password.val().trim(),
    },
    method: "POST",
  }).then(function (response) {
    console.log(response) // parse to get id 
    //id will be in the response. Save it to local storage. 

    //if error, display error
    //if correct login, get request for specific member's id



    $.ajax({
      url: "/client-schedule",
      method: "GET"
    })
  });
});
