const username = $("#logUsername");
const password = $("#logPassword");

$("#loginBtn").click(function () {
  //post request
  $.ajax({
    url: "/api/login",
    data: {
      username: username.val().trim(),
      password: password.val().trim(),
    },
    method: "POST",

    error: function(req, status, err){
      if(err) throw err
    }
  }).then(function (response) {
    
    console.log(response);

    localStorage.setItem("userId", response.id);
    //if correct login, get request for specific member's id



    $.ajax({
      url: "/client-schedule",
      method: "GET"
    })
  });
});
