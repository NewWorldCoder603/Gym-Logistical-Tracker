// creates the Member model
module.exports = function (sequelize, DataTypes) {
  const Member = sequelize.define("Member", {
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
    date_of_birth: DataTypes.DATE,
    gender: DataTypes.STRING,
    phone: { 
      type: DataTypes.INTEGER,   
      validate: {
        len: [10, 10]
      }
     },
    is_logged_in: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  });

  return Member;
};
