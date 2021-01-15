const path = require("path");

// Handles routing for html requests
module.exports = function (app) {
  // Sends user to landing page
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // Sends user to client schedule page
  app.get("/client-schedule", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/client-schedule.html"));
  });

  // Sends user to member sign-up page
  app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/register.html"));
  });

  // Sends user to manager page
  app.get("/manager", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/manager.html"));
  });

  // Sends user to employee page
  app.get("/employee", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/employee.html"));
  });
};
