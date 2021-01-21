module.exports = function (selectedClass, memberid) {
  const newRoster = [];
  const oldRoster = selectedClass.dataValues.roster.split(",");
  //Rewrites roster to NOT include the user
  oldRoster.forEach(function (member) {
    if (memberid === member) {
      return;
    } else {
      newRoster.push(member);
    }
  });
  const newClassSize = newRoster.length;
  const newRosterJoined = newRoster.join(",");
  const classUpdate = {
    roster: newRosterJoined,
    current_size: newClassSize,
  };

  return classUpdate;
};
