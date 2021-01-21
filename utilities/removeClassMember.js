module.exports = function (selectedClass, memberid) {
  const newRoster = [];
  const oldRoster = selectedClass.dataValues.roster.split(",");
  //Rewrites roster to NOT include the user
  oldRoster.map((member) => {
    if (member !== `${memberid}`) {
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
