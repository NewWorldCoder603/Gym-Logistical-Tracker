
const db = require("../models");


module.exports = function (app) {
  // GET "/api/classes" responds with all classes from the database
  app.get("/api/classes", function (req, res) {
    db.Class.findOne({
      where: {
        id: req.body.class_id,
      },
    }).then(function (results) {
      //need code to find trainer name maybe association

      const reqClass = {
        class_id: results.id,
        class_name: results.class_name,
        start_time: results.start_time,
        duration: results.duration,
        current_size: results.curent_size,
        max_size: results.max_size,
        trainer_name: results.trainer_name,
        class_name: results.name,
      };


      res.json(reqClass);
    });
  });

  // POST "api/login" authenticates the member login credentials in the database, and responds with the personal details of the member
  app.post("/api/login", (req, res) => {
    console.log(req.body);
      db.Member.findAll({
        where: {
          email: req.body.username,
          password: md5(req.body.password),
        },
      }).then(function (err, result) {
        if (err || result.length !== 1) {
          res.status(401).send(
            "The email and/or password is incorrect. Please try again."
          );
        } else {
          db.Member.update({
            is_logged_in:true
          }, {
            where: {
              id: result[0].id,
            },
          }).then(function (err, result){
            // if the result-set has exactly 1 record, then pass on the member details(database query response) to front-end, else send an error message
            if (!result.is_logged_in) {
              res.json(result);
            } else {
              alert("This account is currently logged in!");
            }
          });
        };
       }).catch (function(err) {
          console.log("The email or password is incorrect.");
       })
  });
  
  // Query to insert the new employee registration record in the employee table in the database
  app.post("/api/addEmployee", (req, res) => {
    db.Employee.create({
      userName: req.body.userName,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
      manager_id: req.body.manager_id,
    }).then(function (result) {
      res.send(result);
    });
  });



  // Query to insert the new member registration record in the member table in the database
  app.post("/api/register", (req, res) => {
    db.Member.create({
      email: req.body.userName,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth,
      gender: req.body.gender,
      phone: req.body.phone,
    }).then(function (result) {
      res.send(result);
    });
  });

  // Query to insert the member into chosen class
  app.post("/api/addToClass", (req, res) => {
    db.Class.update({
      where: {
        class_id: parseInt(req.body.class_id),
        member_id: parseInt(req.body.member_id),
      },
    }).then(function (result) {
      res.send("Added to class!");
    });
  });
};
