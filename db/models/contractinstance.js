/* eslint-disable func-names */
const { Organizations } = require('./organization');
const { Users } = require('./user')

module.exports = (sequelize, DataTypes) => {
  const contractInstance = sequelize.define(
    'contractInstance', 
    {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Organizations,
        key: 'id',
      },
    },
    collaboratorsId: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      references: {
        model: Users,
        key: 'id',
      },
    },
    smartContractId: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING
    }
  }, {});
  contractInstance.associate = function(models) {
    // associations can be defined here
    contractInstance.belongsTo(models.Organizations, { foreignKey: 'organizationId' });
    contractInstance.hasMany(models.Users, { foreignKey: 'userId' });
  };
  return contractInstance;
};