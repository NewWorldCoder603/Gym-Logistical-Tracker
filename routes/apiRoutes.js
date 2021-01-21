const db = require("../models");
const md5 = require("md5");
const memberMap = require("../utilities/memberMap");
const buildRoster = require("../utilities/buildRoster");
const trainerSchedule = require("../utilities/trainerSchedule");
const removeClassMember = require("../utilities/removeClassMember");
const addToClass = require("../utilities/addToClass");
const getClassBundle = require("../utilities/classBundle");

module.exports = function (app) {
  // GET object to populate divs with class info
  app.get("/api/classes/:id", function (req, res) {
    db.Class.findAll({ order: [["start_time", "ASC"]] }).then((classes) => {
      db.Member.findOne({ where: { id: req.params.id } })
        .then((currentUser) => {
          db.Employee.findAll({}).then((trainers) => {
            res.json(getClassBundle(classes, currentUser, trainers));
          });
        })
        .catch((err) => res.json(err));
    });
  });

  // POST "api/login" authenticates the member login credentials in the database, and responds with the member id
  app.post("/api/login", (req, res) => {
    // finds if there exists a member with the logged in username and password
    db.Member.findOne({
      where: { email: req.body.username, password: md5(req.body.password) },
    }).then((userMember) => {
      if (!userMember) {
        db.Employee.findOne({
          where: {
            email: req.body.username,
            password: md5(req.body.password),
          },
        })
          .then((userEmployee) => {
            // updates the is_logged_in column in employee table to true to track the logged in user
            db.Employee.update(
              { is_logged_in: true },
              { where: { id: userEmployee.dataValues.id } }
            )
              .then(() => {
                res.json({
                  id: userEmployee.dataValues.id,
                  userName: userEmployee.dataValues.first_name,
                  role: userEmployee.dataValues.role,
                });
              })
              .catch((err) => res.json(err));
          })
          .catch((err) => res.json(err));
      } else {
        const userId = userMember.dataValues.id;
        // updates the is_logged_in column in member table to true to track the logged in user
        db.Member.update({ is_logged_in: true }, { where: { id: userId } })
          .then(() => {
            res.json({
              id: userId,
            });
          })
          .catch((err) => res.json(err));
      }
    });
  });

  // Query to insert the new employee registration record in the employee table in the database
  app.post("/api/addEmployee", (req, res) => {
    db.Employee.create({
      userName: req.body.userName,
      password: md5(req.body.password),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone ? parseInt(req.body.phone) : null,
      role: req.body.role.toLowerCase(),
    })
      .then(() => res.send("Success!"))
      .catch((err) => res.json(err));
  });

  // POST API and query to insert the new member registration record in the member table in the database
  app.post("/api/register", (req, res) => {
    db.Member.create({
      email: req.body.userName,
      // md5 encrypts the password
      password: md5(req.body.password),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth ? req.body.date_of_birth : null,
      gender: req.body.gender,
      phone: req.body.phone ? parseInt(req.body.phone) : null,
      is_logged_in: true,
    }) // sends the member id as response
      .then((dbMember) => res.json({ id: dbMember.id }))
      .catch((err) => {
        let message = err.original.sqlMessage;
        // if email already exists in database, send a user-friendly message as response
        if (err.original.errno === 1062) {
          message = "This email is already registered with us.";
        }
        // any other error, send it as a response to be handled at front-end
        res.status(500).json({ error: message });
      });
  });

  // GET API route for logging out the member
  app.get("/api/member/:id", (req, res) => {
    // updates the is_logged_in column in db to false when member logs out
    db.Member.update({ is_logged_in: false }, { where: { id: req.params.id } })
      // send a logged out message to the user
      .then(() => res.send("Success!"))
      .catch((err) => res.json(err));
  });

  //API to add member into chosen class
  app.post("/api/addToClass", (req, res) => {
    db.Class.findOne({ where: { id: req.body.id } }).then((selectedClass) => {
      const classUpdate = addToClass(selectedClass, req.body.memberid);
      db.Class.update(classUpdate, { where: { id: req.body.id } })
        .then(() => res.send("Success!"))
        .catch((err) => res.json(err));
    });
  });

  // API for removing a member from a class
  app.post("/api/removeFromClass", (req, res) => {
    db.Class.findOne({ where: { id: req.body.id } }).then((selectedClass) => {
      const classUpdate = removeClassMember(selectedClass, req.body.memberid);
      db.Class.update(classUpdate, { where: { id: req.body.id } })
        .then(() => res.send("Success!"))
        .catch((err) => res.json(err));
    });
  });

  // API for adding a class
  app.post("/api/addClass", (req, res) => {
    db.Class.create({
      class_name: req.body.class_name,
      day: req.body.day,
      start_time: req.body.start_time,
      current_size: req.body.current_size,
      max_size: req.body.max_size,
      trainer_id: req.body.trainer_id,
      roster: req.body.roster,
    })
      .then(() => res.send("Success!"))
      .catch((err) => res.json(err));
  });

  //API to remove class from the database
  app.delete("/api/removeClass/:id", (req, res) => {
    db.Class.destroy({ where: { id: req.params.id } })
      .then(() => res.send("Success!"))
      .catch((err) => res.status(500).json(err));
  });

  // POST API that allows a manager to add a trainer/manager to the employee table in the database
  app.post("/api/manager/addTrainer", (req, res) => {
    db.Employee.create({
      email: req.body.email,
      password: md5(req.body.password),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      phone: req.body.phone ? parseInt(req.body.phone) : null,
      role: req.body.role.toLowerCase(),
    })
      .then((result) => {
        delete result.dataValues.password;
        res.json(result);
      })
      .catch((err) => res.json(err));
  });

  // DELETE API that allows a manager to delete a trainer
  app.delete("/api/manager/deleteTrainer/:id", (req, res) => {
    db.Employee.destroy({ where: { id: req.params.id } })
      .then(() => res.send("Success!"))
      .catch((err) => res.json(err));
  });

  // GET API that allows a manager to view all the trainers
  app.get("/api/manager/trainers", (req, res) => {
    db.Employee.findAll({ where: { role: "trainer" } })
      .then((trainers) => {
        // removing password from the result records for security reasons
        trainers.forEach((trainer) => {
          delete trainer.dataValues.password;
        });
        res.json(trainers);
      })
      .catch((err) => res.json(err));
  });

  // POST API that allows a manager to add a member/client to a class
  app.post("/api/manager/addToClass", (req, res) => {
    db.Class.findOne({ where: { id: req.body.id } })
      .then((selectedClass) => {
        const classUpdate = addToClass(selectedClass, req.body.memberid);
        db.Class.update(classUpdate, { where: { id: req.body.id } })
          .then(() => res.send("Success!"))
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  });

  // POST API that allows a manager to remove a member/client from a class
  app.post("/api/manager/removeFromClass", (req, res) => {
    db.Class.findOne({ where: { id: req.body.id } })
      .then((selectedClass) => {
        const classUpdate = removeClassMember(selectedClass, req.body.memberid);
        db.Class.update(classUpdate, { where: { id: req.body.id } })
          .then(() => res.send("Success!"))
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  });

  //API to get trainer schedule
  app.get("/api/trainer/:id", (req, res) => {
    db.Class.findAll({ where: { trainer_id: req.params.id } })
      .then((classes) => {
        db.Employee.findOne({ where: { id: req.params.id } })
          .then((trainer) => res.send(trainerSchedule(trainer, classes)))
          .catch((err) => res.status(401).json(err));
      })
      .catch((err) => res.status(401).json(err));
  });

  // API to get class roster
  app.get("/api/roster/:id", (req, res) => {
    db.Class.findOne({ where: { id: req.params.id } })
      .then((selectedClass) => {
        db.Member.findAll({}).then((members) =>
          res.json(buildRoster(members, selectedClass))
        );
      })
      .catch((err) => res.json(err));
  });

  // GET API that gets list of all member names and ids
  app.get("/api/manager/memberList", (req, res) => {
    db.Member.findAll({})
      .then((members) => res.json(memberMap(members)))
      .catch((err) => res.json(err));
  });
};
