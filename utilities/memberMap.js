//This function will send a list of all members enrolled in the gym to the manager
module.exports = function (members) {
  const memberList = [];
  members.map((member) => {
    const oneMember = {
      id: member.dataValues.id,
      fullName: `${member.dataValues.first_name} ${member.dataValues.last_name}`,
    };
    memberList.push(oneMember);
  });
  return memberList;
};
