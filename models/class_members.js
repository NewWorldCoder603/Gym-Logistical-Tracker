// creates the Class_Members model
module.exports = function (sequelize, DataTypes) {
    const Class_Members = sequelize.define("Class_Members", {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
    });
  
    return Class_Members;
};
  
