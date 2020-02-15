/* eslint-disable func-names */
/* eslint-disable strict */
/* eslint-disable lines-around-directive */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: { 
      type: DataTypes.STRING
    },
    phoneNumber: {
      type: DataTypes.STRING
    },
    interests: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    privileges: {
      type: DataTypes.STRING
    },
    walletAddress: {
      type: DataTypes.TEXT
    },
    schoolName: {
      type: DataTypes.TEXT
    },
    degree: {
      type: DataTypes.STRING
    },
    bio: {
      type: DataTypes.TEXT
    },
    pictureUrl:{ 
      type: DataTypes.STRING
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};