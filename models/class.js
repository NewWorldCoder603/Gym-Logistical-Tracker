// creates the Class module
module.exports = function (sequelize, DataTypes) {
  const Class = sequelize.define("Class", {
    class_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    current_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    max_size: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
      allowNull: false,
      validate: {
        min: 6,
        max: 16,
      },
    },
    trainer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roster: {
      type: DataTypes.STRING,
      validate: {
        len: [8, 800],
      },
    },
  });

  return Class;
};
