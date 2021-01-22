//This function builds the roster for trainer to see
module.exports = function (members, selectedClass) {
  const classRoster = [];
  const currentRosterIds = selectedClass.dataValues.roster.split(",");
  members.forEach((member) => {
    const isMember = currentRosterIds.includes(`${member.dataValues.id}`);

    if (isMember) {
      const memberName = `${member.dataValues.first_name} ${member.dataValues.last_name}`;

      classRoster.push(memberName);
    }
  });
  classRoster.push(currentRosterIds);
  return classRoster;
};
