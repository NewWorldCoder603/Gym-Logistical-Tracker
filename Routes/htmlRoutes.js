const router = require("express").Router();
const path = require("path");

// Handles routing for html requests

// Sends user to landing page
router.get("/", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../public/index.html")
  );
});

// Sends user to client schedule page
router.get("/client-schedule", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../public/client-schedule.html")
  );
});

// Sends user to member sign-up page
router.get("/register", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../public/register.html")
  );
});

// Sends user to manger page
router.get("/manager", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../public/manager.html")
  );
});

// Sends user to employee page
router.get("/employee", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../public/employee.html")
  );
});

module.exports = router;
