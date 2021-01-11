// creates the Employee model
module.exports = function (sequelize, DataTypes) {
  const Employee = sequelize.define("Employee", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { 
        isEmail: true 
      }
    },
    password: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 1]
      }
    },
    phone: { 
      type: DataTypes.BIGINT, 
      validate: {
        len: [0, 10]
      }
    },
    role: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    manager_id: DataTypes.INTEGER,
  });

  return Employee;
};
