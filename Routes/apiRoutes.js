const db = require("../models");
const md5 = require("md5");

module.exports = function (app) {
  // GET "/api/classes" responds with all classes from the database
  app.get("/api/classes", function (req, res) {
    db.Class.findAll({}).then(function (classes) {
      //need code to find trainer name maybe association

      db.Employee.findAll({}).then(function (trainers) {
        let classBundle = [];
        classes.forEach(async function (unit) {
          const activeTrainer = trainers.filter(
            (trainer) =>
              trainer.dataValues.id ===
              unit.dataValues.trainer_id
          );

          const reqClass = {
            id: unit.dataValues.id,
            class_name: unit.dataValues.class_name,
            day: unit.dataValues.day,
            start_time: unit.dataValues.start_time,
            current_size: unit.dataValues.current_size,
            max_size: unit.dataValues.max_size,
            trainer_name:
              activeTrainer[0].dataValues.first_name,
          };

          classBundle.push(reqClass);
        });


        res.json(classBundle);
      });
    });
  });

  // POST "api/login" authenticates the member login credentials in the database, and responds with the member id
  app.post("/api/login", (req, res) => {
    console.log(req.body);
    // finds if there exists a member with the logged in username and password
    db.Member.findOne({
      where: {
        email: req.body.username,
        password: req.body.password,
      },
    })
      .then(function (dbMember) {
        console.log(dbMember);
        const member_id = dbMember.id;
        // updates the is_logged_in column in member table to true to track the logged in user
        db.Member.update(
          { is_logged_in: true },
          {
            where: {
              id: member_id,
            },
          }
        )
          .then(function () {
            // sends the logged in member's id as response
            res.json({ id: member_id });
          })
          .catch((err) => {
            res
              .status(401)
              .send(
                "Sorry! There was some problem. Please try again."
              );
          });
      })
      .catch((err) => {
        // user-friendly message to user in case of error
        res
          .status(401)
          .send(
            "The email and/or password is incorrect. Please try again."
          );
      });
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
      res.send("Success!");
    });
  });

  // POST API and query to insert the new member registration record in the member table in the database
  app.post("/api/register", (req, res) => {
    db.Member.create({
      email: req.body.userName,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth
        ? parseInt(req.body.date_of_birth)
        : null,
      gender: req.body.gender,
      phone: req.body.phone
        ? parseInt(req.body.phone)
        : null,
      is_logged_in: true,
    })
      .then(function (dbMember) {
        // sends the member id as response
        res.json({ id: dbMember.id });
      })
      .catch((err) => {
        console.log(err);
        let message = err.original.sqlMessage;
        // if email already exists in database, send a user-friendly message as response
        if (err.original.errno === 1062) {
          message =
            "This email is already registered with us.";
        }
        // any other error, send it as a response to be handled at front-end
        res.json({ error: message });
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
