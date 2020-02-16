/* eslint-disable func-names */
// const { Organization } = require('./organization');
// const { User } = require('./user')

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
      type: DataTypes.STRING,
      allowNull: false,
    },
    collaboratorsId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    smartContractId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING
    }
  }, {});
  contractInstance.associate = function(models) {
    // associations can be defined here
    
    // contractInstance.belongsTo(models.Organization, { foreignKey: 'organizationId' });
    // contractInstance.hasMany(models.User, { foreignKey: 'collaboratorsId' });
  };
  return contractInstance;
};