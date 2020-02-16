/*
* Contracts Query 
*/
const Sequelize = require('sequelize');
const { ContractInstance } = require('../db/models');

const { Op } = Sequelize;

/** Create a new Contract Instance */
const createNewContract = async body => {
  const newContract = await ContractInstance.create(body, { returning: true });

  return newContract;
};

const getContractInstance = async () => {
  const contract = await ContractInstance.findAll();

  return contract;
};

const getContractInstanceByID = async id => {
  const contract = await ContractInstance.findOne({ where: { id } });

  return contract;
};

const getContractInstanceByUserID = async collaboratorsId => {
  const contract = await ContractInstance.findAll({
    where: { 
      collaboratorsId: { 
        [Op.like]: collaboratorsId 
      } },
  });

  return contract;
};

const getContractInstanceByOrganizationID = async organizationId => {
  const contract = await ContractInstance.findAll({
    where: { 
      organizationId: { 
        [Op.like]: organizationId 
      } },
    returning: true,
  });

  return contract;
};

const deleteContractInstance = async id => {
  const result = await ContractInstance.destroy({ where: { id } });

  return result;
};

module.exports = {
  createNewContract,
  getContractInstance,
  getContractInstanceByID,
  getContractInstanceByUserID,
  getContractInstanceByOrganizationID,
  deleteContractInstance,
};
