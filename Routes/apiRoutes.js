const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const mysql = require("mysql");
const Member = require("../Clients/clients.js");
const Employee = require("../Employee/employee.js")

// Connect to the gym_management_systemdb database using a localhost connection
const connection = mysql.createConnection({
  host: "localhost",

  // Your port, if not 3306
  port: 3306,

  // Your MySQL username
  user: "root",

  // Your MySQL password (leave blank for class demonstration purposes; fill in later)
  password: "SeptemberBC2020!",

  // Name of database
  database: "gym_management_systemdb",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

// GET "/api/classes" responds with all classes from the database
router.get("/classes", (req, res) => {
  connection.query(
    "SELECT *,employee.first_name, employee.last_name FROM class INNER JOIN employee ON class.trainer_id = employee.id",
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});

// POST "api/login" authenticates the member login credentials in the database, and responds with the personal details of the member
router.post("/login", (req, res) => {
  const data = req.body;
  // retrieves the record from database if username and password combination entered by the user matches with the existing records in the database
  connection.query(
    `SELECT * from member WHERE username = "${data.username}" AND password = MD5("${data.password}")`,
    function (err, result) {
      if (err) throw err;
      console.log(result);
      // if the result-set has exactly 1 record, then pass on the member id(database query response) to front-end, else send an error message
      if(result.length === 1){
        const member_id = result[0].id;
        // updates the logged_in column for this member's record in database to 1 to track that the user is logged in
        connection.query(
          "UPDATE member SET ? WHERE ?",
          [
            {
              logged_in: 1
            },
            {
              id: member_id
            }
          ], 
          function(err, result){
            err ? 
              res.json({
                error : "Sorry! Some problem ocurred. Please try again.",
              }): 
              res.json({
                id: member_id
              })
          }
        )
      } else {
          res.status(401).json({
            error : "Username and/or password is incorrect. Please try again.",
          });
      }
    }
  );
});

router.post("/addEmployee", (req, res) => {
  const data = req.body;
  const newEmployee = new Employee(
    data.username,
    data.password,
    data.first_name,
    data.last_name,
    data.gender,
    data.email,
    data.phone,
    data.role,
    data.manager_id
  );
  // SQL query to insert the new employee registration record in the employee table in the database
  connection.query(
    "INSERT INTO employee SET ?",
    newEmployee,
    function (err) {
      if (err) {
        // shows a user friendly message to user
        res.json({
          error:
            "Sorry! Some problem occured. Please try again!",
        });
      } else {
        res.json({
          success: `${data.first_name} ${data.last_name} has been added as ${data.role}`,
        });
      }
    }
  );
});

// POST "api/register" registers a member/adds the member's personal details to the database
router.post("/register", (req, res) => {
  const data = req.body;
  const newMember = new Member(
    data.username,
    data.password,
    data.first_name,
    data.last_name,
    data.gender,
    data.date_of_birth,
    data.email,
    data.phone
  );
  // SQL query to insert the new member registration record in the member table in the database
  connection.query(
    "INSERT INTO member SET ?",
    newMember,
    function (err) {
      if (err) {
        // shows a user friendly message to user
        res.json({
          error:
            "Sorry! Some problem occured. Please try again!",
        });
      } else {
        res.json({
          success: `Welcome ${data.first_name}! You are now a member of Dev Fitness`,
        });
      }
    }
  );
});

router.post("/addToClass", (req, res) => {
  console.log(req.body);
  connection.query(
    `INSERT INTO class_members (class_id, member_id, date) 
    VALUES (
       ${parseInt(user.id)}, 
       ${parseInt(req.body.member_id)}, 
       ${parseInt(req.body.date)}
       )`,
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
  res.send("Added to class!");
});

module.exports = router;
