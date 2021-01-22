module.exports = function (classes, currentUser, trainers) {
  let classesJoined = [];
  let roster = [];
  let classBundle = [];

  const userName = currentUser.dataValues.first_name;
  //Loop to match trainer with class and build object for each class
  classes.forEach((unit) => {
    const activeTrainer = trainers.filter(
      (trainer) => trainer.dataValues.id === unit.dataValues.trainer_id
    );
    //If roster is not empty then split and search for user's id
    if (roster) {
      const roster = unit.dataValues.roster.split(",");

      roster.filter((participant) => {
        if (currentUser.dataValues.id === parseInt(participant)) {
          let thisClass = {
            id: unit.dataValues.id,
            class_name: unit.dataValues.class_name,
          };
          //Add class to user's joined classes to show in UI
          classesJoined.push(thisClass);
        }
      });
    }

    //Object to be sent to UI
    const reqClass = {
      id: unit.dataValues.id,
      class_name: unit.dataValues.class_name,
      day: unit.dataValues.day,
      start_time: unit.dataValues.start_time,
      current_size: unit.dataValues.current_size,
      max_size: unit.dataValues.max_size,
      trainer_id: unit.dataValues.trainer_id,
      trainer_name: activeTrainer[0].dataValues.first_name,
      userName: userName,
      classJoined: classesJoined,
    };

    classBundle.push(reqClass);
  });
  return classBundle;
};
