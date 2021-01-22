//This function will send an object with just the classes being taught by the trainer user
module.exports = function (trainer, classes) {
  const classBundle = [];
  const trainerName = `${trainer.dataValues.first_name} ${trainer.dataValues.last_name}`;

  classes.forEach((unit) => {
    //Object to be sent to UI
    const reqClass = {
      id: unit.dataValues.id,
      class_name: unit.dataValues.class_name,
      day: unit.dataValues.day,
      start_time: unit.dataValues.start_time,
      current_size: unit.dataValues.current_size,
      max_size: unit.dataValues.max_size,
      trainer_id: unit.dataValues.trainer_id,
    };

    classBundle.push(reqClass);
  });
  classBundle.push(trainerName);
  return classBundle;
};
