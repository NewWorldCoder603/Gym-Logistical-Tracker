const email = $("#inputEmail");
const password = $("#inputPassword");
const firstName = $("#firstName"); 
const lastName = $("#lastName");
const gender = $("#inputGender");
const birthday = $("#inputBirthday"); 
const phone = $("#inputPhone");

$("body").on("click", "submitRegistration", function () {
    $.ajax({
        url: "/api/register/",
        data: {
          userName: email.val().trim(),
          password: password.val().trim(),
          first_name: firstName.val().trim(),
          last_name: lastName.val().trim(),
          date_of_birth: birthday.val().trim(),
          gender: gender.val().trim(),
          //do I still need email if it's already the username?
          phone: phone.val().trim(),
        },
        method: "POST",
    
        error: function (req, status, err) {
          if (err) throw err;
        },
      }).then(function (response) {
        console.log(response);
        //If sign-up goes through, get request for specific member's id
        localStorage.setItem("userId", response.id);
        
        $.ajax({
          url: "/api/client-schedule/",
          method: "GET",
        });
    });
});
    