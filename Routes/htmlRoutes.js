const router = require("express").Router();
const path = require("path");

//Handles routing for html requests

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

module.exports = router;
