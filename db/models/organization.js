/* eslint-disable func-names */
/* eslint-disable strict */
/* eslint-disable lines-around-directive */
module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
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
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    walletAddress: {
      type: DataTypes.TEXT
    },
    bio: {
      type: DataTypes.TEXT
    },
    phoneNumber: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    pictureUrl: {
      type: DataTypes.TEXT
    },
    bannerUrl: {
      type: DataTypes.TEXT
    },
    missionStatement: {
      type: DataTypes.TEXT
    }
  }, {});
  Organization.associate = function(models) {
    // associations can be defined here
  };
  return Organization;
};