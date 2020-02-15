/*
* Contracts Query 
*/
const Sequelize = require('sequelize');

const { Op } = Sequelize;
const { contractInstance } = require('../db/models');

const getcontractInstance = async () => {
  const contract = await contractInstance.findAll();

  return contract;
};

const getContractInstanceByID = async id => {
  const contract = await contractInstance.find({ where: { id } });

  return contract;
};

const getContractInstanceByUserID = async collaboratorsId => {
  const contract = await contractInstance.findAll({
    where: { collaboratorsId: { [Op.like]: collaboratorsId } },
    returning: true,
  });

  return contract;
};

const getContractInstanceByOrganizationID = async organizationId => {
  const contract = await contractInstance.findAll({
    where: { organizationId: { [Op.like]: organizationId } },
    returning: true,
  });

  return contract;
};

const deleteContractInstance = async id => {
  const result = await contractInstance.destroy({ where: { id } });

  return result;
};

module.exports = {
  getcontractInstance,
  getContractInstanceByID,
  getContractInstanceByUserID,
  getContractInstanceByOrganizationID,
  deleteContractInstance,
};
