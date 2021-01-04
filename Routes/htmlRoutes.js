const router = require("express").Router();
const path = require("path");

//Handles routing for html requests

// GET request for landing page
router.get("/", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../public/index.html")
  );
});

router.get("/client-schedule", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../public/client-schedule.html")
  );
});

// GET request for member sign-up page
router.get("/register", function(req, res){
  res.sendFile(
    path.join(__dirname, "../public/register.html"));
});

module.exports = router;
