const db = require("../models");
const md5 = require("md5");

module.exports = function (app) {
  // GET object to populate divs with class info
  app.get("/api/classes/:id", function (req, res) {
    db.Class.findAll({}).then((classes) => {
      //Finds user info
      db.Member.findOne({ where: { id: req.params.id } })
        .then((currentUser) => {
          //Call to get class trainer names
          db.Employee.findAll({}).then((trainers) => {
            let classesJoined = [];
            let roster = [];
            let classBundle = [];

            const userName = currentUser.dataValues.first_name;
            //Loop to match trainer with class and build object for each class
            classes.forEach((unit) => {
              const activeTrainer = trainers.filter(
                (trainer) =>
                  trainer.dataValues.id === unit.dataValues.trainer_id
              );
              //If roster is not empty then split and search for user's id
              if (roster) {
                const roster = unit.dataValues.roster.split(",");

                roster.filter((participant) => {
                  if (currentUser.dataValues.id === parseInt(participant)) {
                    let thisClass = {
                      id: unit.dataValues.id,
                      class_name: unit.dataValues.class_name,
                    };
                    //Add class to user's joined classes to show in UI
                    classesJoined.push(thisClass);
                  }
                });
              }
              //Object to be sent to UI
              const reqClass = {
                id: unit.dataValues.id,
                class_name: unit.dataValues.class_name,
                day: unit.dataValues.day,
                start_time: unit.dataValues.start_time,
                current_size: unit.dataValues.current_size,
                max_size: unit.dataValues.max_size,
                trainer_id: unit.dataValues.trainer_id,
                trainer_name: activeTrainer[0].dataValues.first_name,
                userName: userName,
                classJoined: classesJoined,
              };

              classBundle.push(reqClass);
            });

            res.json(classBundle);
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
            res.json({
              id: userEmployee.dataValues.id,
              userName: userEmployee.dataValues.first_name,
              role: userEmployee.dataValues.role,
            });
            // updates the is_logged_in column in employee table to true to track the logged in user
            db.Employee.update(
              { is_logged_in: true },
              { where: { id: userEmployee.dataValues.id } }
            );
          })
          .catch((err) => res.json(err));
      } else {
        // updates the is_logged_in column in member table to true to track the logged in user
        db.Member.update(
          { is_logged_in: true },
          { where: { id: userMember.id } }
        )
          .then((result) => res.json({ result }))
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
      phone: req.body.phone,
      role: req.body.role,
    })
      .then((result) => res.json(result))
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
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  });

  // Query to insert the member into chosen class
  app.post("/api/addToClass", (req, res) => {
    //Finds class to add user to
    db.Class.findOne({ where: { id: req.body.id } }).then((result) => {
      //Pulls class roster and checks if user is already joined
      const oldRoster = result.dataValues.roster.split(",");
      oldRoster.forEach((member) => {
        if (req.body.memberid === member) {
          res.json({ message: "Member already enrolled here." });
        }
      });

      //Adds user to roster and updates class size
      oldRoster.push(req.body.memberid);
      const newClassSize = oldRoster.length;
      const newRoster = oldRoster.join(",");

      db.Class.update(
        { roster: newRoster, current_size: newClassSize },
        { where: { id: req.body.id } }
      )
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
    });
  });

  // API POST route for removing a member/client from a class
  app.post("/api/removeFromClass", (req, res) => {
    //Finds class to remove user from
    db.Class.findOne({ where: { id: req.body.id } }).then((result) => {
      const newRoster = [];
      const oldRoster = result.dataValues.roster.split(",");
      //Rewrites roster to NOT include the user
      oldRoster.forEach(function (member) {
        if (req.body.memberid === member) {
          return;
        } else {
        }

        newRoster.push(member);
      });
      const newClassSize = newRoster.length;
      const newRosterJoined = newRoster.join(",");
      //Updates roster and class size
      db.Class.update(
        {
          roster: newRosterJoined,
          current_size: newClassSize,
        },
        { where: { id: req.body.id } }
      )
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
    });
  });

  // API POST route for adding a class
  app.post("/api/addClass", (req, res) => {
    //Adds a new class to the database
    db.Class.create({
      class_name: req.body.class_name,
      day: req.body.day,
      start_time: req.body.start_time,
      current_size: req.body.current_size,
      max_size: req.body.max_size,
      trainer_id: req.body.trainer_id,
      roster: req.body.roster,
    })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  });

  app.delete("/api/removeClass/:id", (req, res) => {
    //Removes class from the database
    console.log(req.params);
    db.Class.destroy({ where: { id: req.params.id } })
      .then((result) => res.json(result))
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
      role: req.body.role,
    })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  });

  // GET API that allows a manager to delete a trainer
  app.get("/api/manager/deleteTrainer/:id", (req, res) => {
    db.Employee.destroy({ where: { id: req.params.id } })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  });

  // GET API that allows a manager to view all the trainers
  app.get("/api/manager/trainers", (req, res) => {
    db.Employee.findAll({ where: { role: "trainer" } })
      .then((result) => {
        // removing password from the result records for security reasons
        result.forEach((trainer) => {
          delete trainer.dataValues.password;
        });
        res.json(result);
      })
      .catch((err) => res.json(err));
  });

  // POST API that allows a manager to add a member/client to a class
  app.post("/api/manager/addToClass", (req, res) => {
    db.Class.findOne({ where: { id: req.body.class_id } })
      .then(function (result) {
        // Ensures that when adding a member to an existing roster, if the roster is empty, then initialize it to an array.
        const currentRosterArray = result.dataValues.roster
          ? result.dataValues.roster.split(",")
          : [];
        currentRosterArray.push(req.body.member_id);
        const class_size = currentRosterArray.length;
        const updatedRoster = currentRosterArray.join(",");
        db.Class.update(
          { roster: updatedRoster, current_size: class_size },
          { where: { id: req.body.class_id } }
        )
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  });

  // POST API that allows a manager to remove a member/client from a class
  app.post("/api/manager/removeFromClass", (req, res) => {
    db.Class.findOne({ where: { id: req.body.class_id } })
      .then(function (result) {
        const rosterArray = result.dataValues.roster.split(",");
        const index = rosterArray.indexOf(req.body.member_id);
        if (index !== -1) {
          rosterArray.splice(index, 1);
          const class_size = rosterArray.length;
          const updatedRoster = rosterArray.join(",");
          db.Class.update(
            { roster: updatedRoster, current_size: class_size },
            { where: { id: req.body.class_id } }
          )
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
        }
      })
      .catch((err) => res.json(err));
  });

  // GET API that allows a manager to view all the members
  app.get("/api/manager/members", (req, res) => {
    db.Members.findAll({})
      .then((result) => {
        result.forEach((member) => {
          delete member.dataValues.password;
        });
        res.json(result);
      })
      .catch((err) => res.json(err));
  });

  app.get("/api/trainer/:id", (req, res) => {
    db.Class.findAll({ where: { trainer_id: req.params.id } })
      .then((result) => {
        const classBundle = [];
        const classes = result;
        db.Employee.findOne({ where: { id: req.params.id } })
          .then((result) => {
            const trainerName = `${result.dataValues.first_name} ${result.dataValues.last_name}`;

            classes.forEach((unit) => {
              //Object to be sent to UI
              const reqClass = {
                id: unit.dataValues.id,
                class_name: unit.dataValues.class_name,
                day: unit.dataValues.day,
                start_time: unit.dataValues.start_time,
                current_size: unit.dataValues.current_size,
                max_size: unit.dataValues.max_size,
                trainer_id: unit.dataValues.trainer_id,
              };

              classBundle.push(reqClass);
            });
            classBundle.push(trainerName);
            console.log(classBundle);
            res.send(classBundle);
          })
          .catch((err) => res.status(401).json(err));
      })
      .catch((err) => res.status(401).json(err));
  });

  // Query to get class roster
  app.get("/api/roster/:id", (req, res) => {
    //Finds class roster
    db.Class.findOne({ where: { id: req.params.id } })
      .then((result) => {
        //Pulls class roster and checks member is in this class
        const classRoster = [];
        const currentRosterIds = result.dataValues.roster.split(",");
        db.Member.findAll({}).then((members) => {
          members.forEach((member) => {
            const isMember = currentRosterIds.includes(
              `${member.dataValues.id}`
            );

            if (isMember) {
              const memberName = `${member.dataValues.first_name} ${member.dataValues.last_name}`;

              classRoster.push(memberName);
            }
          });
          classRoster.push(currentRosterIds);
          console.log(classRoster);
          res.json(classRoster);
        });
      })
      .catch((err) => res.json(err));
  });
};
