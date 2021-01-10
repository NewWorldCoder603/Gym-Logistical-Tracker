// creates the Member module
module.exports = function (sequelize, DataTypes) {
  const Member = sequelize.define("Member", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: { type: DataTypes.STRING, allowNull: false },
    date_of_birth: DataTypes.DATE,
    gender: DataTypes.STRING,
    phone: { type: DataTypes.INTEGER, min: 4, max: 12 },
    is_logged_in: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  });

  return Member;
};
