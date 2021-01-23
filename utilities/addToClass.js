module.exports = function (selectedClass, memberid) {
  //Pulls class roster and checks if user is already joined
  const oldRoster = selectedClass.dataValues.roster.split(",");
  oldRoster.forEach((member) => {
    if (memberid === member) {
      res.json({ message: "Member already enrolled here." });
    }
  });

  //Adds user to roster and updates class size
  oldRoster.push(memberid);
  const newClassSize = oldRoster.length;
  const newRosterJoined = oldRoster.join(",");

  const classUpdate = {
    roster: newRosterJoined,
    current_size: newClassSize,
  };

  return classUpdate;
};
