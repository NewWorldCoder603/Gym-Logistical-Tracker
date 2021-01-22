module.exports = function (classes, currentUser, trainers) {
  let classBundle = [];
  console.log(currentUser);
  const userName = currentUser.dataValues.first_name;
  //Loop to match trainer with class and build object for each class
  classes.forEach((unit) => {
    const activeTrainer = trainers.filter(
      (trainer) => trainer.dataValues.id === unit.dataValues.trainer_id
    );

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
    };

    classBundle.push(reqClass);
  });
  return classBundle;
};
