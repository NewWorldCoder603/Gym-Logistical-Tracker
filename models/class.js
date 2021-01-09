// creates the Class module
module.exports = function (sequelize, DataTypes) {
  const Class = sequelize.define("Class", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    class_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: { type: DataTypes.DATE },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    current_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },
    max_size: {
      type: DataTypes.INTEGER,
      min: 6,
      max: 16,
      default: 10,
      allowNull: false,
    },
    trainer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roster: {
      type: DataTypes.STRING,
      validate: { len: [8, 800] },
    },
  });

  return Class;
};
